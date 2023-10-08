---
layout: post
title:  "Building a simple C extension with Python."
date:   2022-09-29 13:42:26 -0500
category: software
---

Back in 2013, when I realized that it is possible to wrap C code into Python blew my mind. Luego, me puse a explorar librerias como Numpy y me di cuenta que usan extensiones en C engrapadas en Python. Me llamó la atención como hacerlo y como hacer un proceso computacional mas rápido para ahorrar costos en procesamiento de CPU. Por lo que hice un pequeño experimento para aprender a hacerlo a pequeña escala: Elegí un problema sencillo de algortimos de HacerRank y lo resolví con Python puro y con C llamandolo desde Python, en este artículo describiré un paso a paso de como desarrollar una extensión en C para Python y cuáles fueron los resultados obtenidos.

El algoritmo a resolver que elegí fue compare the triples https://www.hackerrank.com/challenges/compare-the-triplets/problem

Para resolver este algoritmo en Python, es bastante sencillo _Este artículo no es sobre como resolver el algortimo, solo pondré el código sin la explicarlo._

RECORDATORIO: Linkear Numpy y otras librerías a la línea python.h

{% highlight python %}
def alice_and_bob_python(alice, bob):
    alice_points = 0
    bob_points = 0
    if len(alice) == len(bob):
        for a in alice:
          index_a = alice.index(a)
          if a > bob[index_a]:
            alice_points = alice_points + 1
          else:
            bob_points = bob_points + 1

    return alice_points, bob_points
{% endhighlight %}

Teniendo ahora el algoritmo en Python, explicaré brevemente como resolver este mismo algoritmo en C.

Lo primero es crear un archivo con el nombre que quieras con extensión .c en mi caso, yo lo llamé alice_and_bob.c e importar las cabeceras de Python, esta debe ser siempre la primera línea:

{% highlight c %}
#include <Python.h>
{% endhighlight %}

Luego, escribiremos la lógica del algoritmo en C, haciendo uso de las APIs de Python. _nuevamente, este no es un tutorial de C ni de resolución de algoritmos, este artículo no tratará sobre la lógica del algoritmo pero si explicaré un poco lo que sucede detrás de este código_. Por ahora, no te preocupes por los objetos `Py...` que verás a continuación, los explicaré mas adelante, básicamente este es el código que maneja la lógica del algoritmo:

{% highlight c %}
static PyObject *alice_bob(PyObject* self, PyObject* args)
{

    PyObject *alice, *bob;

    if (!PyArg_ParseTuple(args, "OO", &alice, &bob)) {
        return NULL;
    }

    int alice_points = 0;
    int bob_points = 0;

    int n = PyObject_Length(alice);
    if (n < 0) {
        return NULL;
    }

    for (int i = 0; i < n; i++) {
        PyObject *item_alice = PyList_GetItem(alice, i);
        int num_alice = PyLong_AsLong(item_alice); // check inputs.

        PyObject *item_bob = PyList_GetItem(bob, i);
        int num_bob = PyLong_AsLong(item_bob);

        if (num_alice > num_bob){
            alice_points++;
        }
        else{
            bob_points++;
        }
    }

    return Py_BuildValue("i", Alice_and_Bob(alice_points, bob_points));
}
{% endhighlight %}

Durante este experimento, encontré que existen cientos de objetos en la API de Python que vienen desde Python.h, trataré de explicar según mi entendimiento, solo los objetos usados en este algoritmo, sin embargo, mas abajo te pongo el link si quieres ahondar en este tópico:

[PyObject](https://docs.python.org/3/c-api/structures.html#c.PyObject){:target="_blank"}: Se refiere a cualquier tipo de objeto en Python pero a nivel de C (listas, diccionarios, tuplas, etc son objetos Python por lo cuál, a su misma vez son objetos `PyObject` pero a nivel de C). En la definición de la función, le estamos diciendo al programa que el objeto `alice_bob` será un objeto en Python cuando lo llamemos.
