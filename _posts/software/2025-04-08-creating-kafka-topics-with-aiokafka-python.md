---
layout: post
title:  "Creating Kafka Topics Asynchronously with aiokafka in Python: A Practical Guide"
date:   2025-04-07 13:42:26 -0500
category: software
image: /assets/img/kafka-async-python.jpg?v=2
image_twitter: /assets/img/kafka-async-python-twitter.png?new=true
description: "Discover how to create Kafka topics using pure async Python with aiokafka. Learn the correct way to initialize the admin client and avoid common pitfalls with async Kafka operations."
published: true
---
# Introduction

In this article, I'll share a pure asynchronous approach to creating Kafka topics using [aiokafka](https://github.com/aio-libs/aiokafka){:target="_blank"}. This solution is particularly valuable for applications that already use aiokafka for other operations and want to maintain a consistent asynchronous programming model without introducing additional dependencies. While not groundbreaking, this clean approach might save future-me (and perhaps you) some time searching for solutions.

While working on my [Yubarta](https://github.com/dfrojas/yubarta){:target="_blank"} project, I needed to create Kafka topics programmatically within an asynchronous Python application. Most examples I found followed a hybrid approach: using the synchronous [kafka-python](https://github.com/dpkp/kafka-python){:target="_blank"} library's [KafkaAdminClient](https://kafka-python.readthedocs.io/en/master/apidoc/KafkaAdminClient.html){:target="_blank"} for administrative operations, then switching to aiokafka for message processing.

This approach, while functional, breaks the asynchronous pattern and introduces an unnecessary dependency on two separate libraries. What's particularly frustrating is that the official aiokafka documentation doesn't clearly demonstrate how to create topics directly using its own asynchronous API, despite having this capability.

After some investigation, I discovered a more elegant solution: creating Kafka topics using purely asynchronous methods within aiokafka itself, maintaining a consistent programming model throughout the application.

<div style="margin-top: 40px;"></div>

# Common Approach

If you follow the same approach as the synchronous library, you'd have something like this:

{% highlight python %}
admin_client = AIOKafkaAdminClient(bootstrap_servers="kafka:9092")

topic_list = []
topic_list.append(NewTopic(name="alarms", num_partitions=1, replication_factor=1))
admin_client.create_topics(new_topics=topic_list)
{% endhighlight %}

However, you'll encounter an `IncompatibleBrokerVersion` error:

```shell
2025-04-08 07:22:16   File "/usr/local/lib/python3.12/site-packages/aiokafka/admin/client.py", line 177, in _matching_api_version
2025-04-08 07:22:16     raise IncompatibleBrokerVersion(
2025-04-08 07:22:16 aiokafka.errors.IncompatibleBrokerVersion: IncompatibleBrokerVersion: Kafka broker does not support the 'CreateTopicsRequest_v0' Kafka protocol.
```

<div style="margin-top: 40px;"></div>

# Why This Happens and the Solution

This approach doesn't work with the asynchronous library because the synchronous library (kafka-python) assigns the [Kafka API version when the class is instantiated](https://github.com/dpkp/kafka-python/blob/3962d67bf8fc83d7e0a48ae9215563093cbe74a3/kafka/admin/client.py#L222-L223){:target="_blank"}.

With the asynchronous library, we need to assign the Kafka API version manually. I discovered that the [AIOKafkaAdminClient class](https://github.com/aio-libs/aiokafka/blob/29b58dbcacc75a62b430ce5243ac684ccf16a7f8/aiokafka/admin/client.py#L43){:target="_blank"} has a [start method](https://github.com/aio-libs/aiokafka/blob/29b58dbcacc75a62b430ce5243ac684ccf16a7f8/aiokafka/admin/client.py#L155-L161){:target="_blank"} that assigns the API version. It essentially performs the same function as the synchronous version but in a separate call.

The solution is simple: we need to call `start()` after instantiating the client class. See line 14 in the following snippet:

{% highlight python linenos %}
import asyncio
from aiokafka.admin import AIOKafkaAdminClient, NewTopic
import logging
from contextlib import asynccontextmanager

logger = logging.getLogger(__name__)

@asynccontextmanager
async def kafka_admin_client():
    client = AIOKafkaAdminClient(
        bootstrap_servers="kafka:9092"
    )
    try:
        await client.start()  # This is the line that makes all the difference
        yield client
    finally:
        await client.close()


async def create_topics():
    async with kafka_admin_client() as client:
        try:
            # Create topics with proper configuration
            topics = [
                NewTopic(
                    name="alarms",
                    num_partitions=3,  # Start with 3 partitions for parallelism
                    replication_factor=1  # Single replica for dev, increase for prod
                )
            ]

            await client.create_topics(topics)
            logger.info(f"Successfully created topic: {settings.KAFKA_ALERT_TOPIC}")
        except Exception as e:
            if "already exists" in str(e):
                logger.info(f"Topic {settings.KAFKA_ALERT_TOPIC} already exists")
            else:
                logger.error(f"Failed to create Kafka topics: {str(e)}")
                raise
        finally:
            await client.close()

if __name__ == "__main__":
    asyncio.run(create_topics()) 
{% endhighlight %}

<div style="margin-top: 40px;"></div>

# Conclusion

In this article, we've explored how to create Kafka topics programmatically using aiokafka's asynchronous API. The key insight was understanding that we need to explicitly call the `start()` method on the `AIOKafkaAdminClient` to properly initialize the Kafka API version before creating topics.

This approach offers several benefits:
- Maintains a consistent asynchronous programming model throughout your application
- Eliminates the need for additional dependencies
- Provides a clean and maintainable solution for managing Kafka topics

The example code demonstrates a practical implementation using Python's `asynccontextmanager` to properly handle client lifecycle and error cases. You can adapt this pattern to your specific needs, adjusting the topic configuration parameters like partition count and replication factor based on your requirements.

Remember that while this solution works well for development and testing environments, you should carefully consider your production configuration, particularly the replication factor and partition count, based on your specific use case and performance requirements.
