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

    // Force udm=14 parameter for classic results
    if (url.searchParams.get("udm") !== "14") {
      url.searchParams.set("udm", "14");
    }

    if (!q) {
      const next = url.toString();
      if (next !== lastApplied && next !== location.href) {
        lastApplied = next;
        location.replace(next);
      }
      return;
    }

    const normalized = normalizeQuery(q);
    if (normalized !== q) {
      url.searchParams.set("q", normalized);
      const next = url.toString();
      if (next !== lastApplied) {
        lastApplied = next;
        location.replace(next);
      }
      return;
    }

    // Apply URL changes if udm was added
    const next = url.toString();
    if (next !== lastApplied && next !== location.href) {
      lastApplied = next;
      location.replace(next);
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

  // Enhanced URL monitoring for Safari
  const monitorUrlChanges = () => {
    let currentUrl = location.href;

    const checkUrl = () => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        setTimeout(rewriteUrlIfNeeded, 100); // Small delay for page load
      }
    };

    // Multiple monitoring approaches
    setInterval(checkUrl, 1000); // Fallback polling

    // Monitor navigation
    const push = history.pushState;
    const replace = history.replaceState;

    history.pushState = function (...args) {
      push.apply(this, args);
      setTimeout(rewriteUrlIfNeeded, 50);
    };

    history.replaceState = function (...args) {
      replace.apply(this, args);
      setTimeout(rewriteUrlIfNeeded, 50);
    };

    window.addEventListener("popstate", () => {
      setTimeout(rewriteUrlIfNeeded, 50);
    });
  };

  // Initial execution
  rewriteUrlIfNeeded();
  interceptForms();
  monitorUrlChanges();

  // Handle dynamic content loading
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rewriteUrlIfNeeded);
  }
})();
