(() => {
  const toc = document.querySelector('.post-toc');
  if (!toc) return;

  const details = toc.querySelector('details');
  const desktop = window.matchMedia('(min-width: 1100px)');
  const entries = Array.from(toc.querySelectorAll('a[href^="#"]'))
    .map(link => ({
      link,
      heading: document.getElementById(decodeURIComponent(link.hash.slice(1)))
    }))
    .filter(entry => entry.heading);
  if (!entries.length) return;

  let current;
  let scheduled = false;
  let navigationTarget;
  let navigationTimer;

  function updateCurrentSection() {
    scheduled = false;
    if (navigationTarget) return;
    const offset = parseFloat(getComputedStyle(entries[0].heading).scrollMarginTop) || 0;
    let active = entries[0];
    for (const entry of entries) {
      if (entry.heading.getBoundingClientRect().top <= offset + 8) active = entry;
      else break;
    }

    // The final heading may not reach the top when the page cannot scroll farther.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      active = entries[entries.length - 1];
    }
    setCurrentSection(active);
  }

  function setCurrentSection(active) {
    if (active === current) return;
    if (current) current.link.removeAttribute('aria-current');
    active.link.setAttribute('aria-current', 'location');
    current = active;

    // Keep the active entry visible without scrolling the article or interrupting keyboard use.
    if (desktop.matches && !toc.matches(':focus-within')) {
      const linkRect = active.link.getBoundingClientRect();
      const tocRect = toc.getBoundingClientRect();
      if (linkRect.top < tocRect.top) toc.scrollTop += linkRect.top - tocRect.top - 4;
      else if (linkRect.bottom > tocRect.bottom) toc.scrollTop += linkRect.bottom - tocRect.bottom + 4;
    }
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateCurrentSection);
    }
  }

  function updateLayout() {
    details.open = desktop.matches;
    toc.scrollTop = 0;
    scheduleUpdate();
  }

  function finishNavigation() {
    if (!navigationTarget) return;
    navigationTarget = null;
    window.clearTimeout(navigationTimer);
    // Retain the selected link until the next scroll, even when the destination
    // is near the end of the article and cannot reach the top of the viewport.
  }

  function waitForNavigationEnd() {
    window.clearTimeout(navigationTimer);
    // Fallback for browsers without scrollend, and links already at their destination.
    navigationTimer = window.setTimeout(finishNavigation, 200);
  }

  for (const entry of entries) {
    const { link, heading } = entry;
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // Hold the clicked section active while smooth scrolling passes other headings.
      navigationTarget = entry;
      setCurrentSection(entry);
      waitForNavigationEnd();
      // Native fragment navigation handles scrolling and history; focus follows the destination.
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      scheduleUpdate();
    });
  }

  desktop.addEventListener('change', updateLayout);
  window.addEventListener('scroll', () => {
    if (navigationTarget) waitForNavigationEnd();
    else scheduleUpdate();
  }, { passive: true });
  window.addEventListener('scrollend', finishNavigation);
  window.addEventListener('wheel', finishNavigation, { passive: true });
  window.addEventListener('touchstart', finishNavigation, { passive: true });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      finishNavigation();
    }
  });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  details.addEventListener('toggle', scheduleUpdate);
  updateLayout();
})();
