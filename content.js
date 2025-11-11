(() => {
  const isGoogleHost = (h) => h === "google.com" || /\.google\.[^./]+$/.test(h);

  const isSearchPath = () => location.pathname === "/search";

  const normalizeQuery = (q) => {
    if (!q) return q;
    const cleaned = q
      .replace(/\s*-ai\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return cleaned ? `${cleaned} -ai` : cleaned;
  };

  let lastApplied = "";

  const rewriteUrlIfNeeded = () => {
    if (!isGoogleHost(location.hostname) || !isSearchPath()) return;
    const url = new URL(location.href);
    const q = url.searchParams.get("q");
    if (!q) return;

    const normalized = normalizeQuery(q);
    if (normalized !== q) {
      url.searchParams.set("q", normalized);
      const next = url.toString();
      if (next !== lastApplied) {
        lastApplied = next;
        location.replace(next);
      }
    }
  };

  const interceptForms = () => {
    const handler = (evt) => {
      const form = evt.target.closest("form");
      if (!form) return;
      const qInput =
        form.querySelector('input[name="q"]') ||
        form.querySelector('textarea[name="q"]');
      if (!qInput || !qInput.value) return;
      const normalized = normalizeQuery(qInput.value);
      if (normalized !== qInput.value) qInput.value = normalized;
    };
    document.addEventListener("submit", handler, true);
  };

  rewriteUrlIfNeeded();
  interceptForms();

  const push = history.pushState;
  history.pushState = function (...args) {
    push.apply(this, args);
    queueMicrotask(rewriteUrlIfNeeded);
  };
  window.addEventListener("popstate", rewriteUrlIfNeeded);
})();
