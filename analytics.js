(() => {
  // GoatCounter site codes are public configuration, not credentials. Create the
  // site manually, then place its short code here (for example: "zfj1998").
  const GOATCOUNTER_SITE_CODE = "zfj1998";
  const PRODUCTION_HOSTS = new Set(["zfj1998.github.io"]);

  if (
    !GOATCOUNTER_SITE_CODE ||
    !/^[a-z0-9-]+$/.test(GOATCOUNTER_SITE_CODE) ||
    !PRODUCTION_HOSTS.has(window.location.hostname)
  ) {
    return;
  }

  const analyticsOrigin = `https://${GOATCOUNTER_SITE_CODE}.goatcounter.com`;
  const tracker = document.createElement("script");
  tracker.async = true;
  tracker.src = "https://gc.zgo.at/count.v3.js";
  tracker.dataset.goatcounter = `${analyticsOrigin}/count`;
  tracker.crossOrigin = "anonymous";
  tracker.integrity = "sha384-QGgNMMRFTi8ul5kHJ+vXysPe8gySvSA/Y3rpXZiRLzKPIw8CWY+a3ObKmQsyDr+a";
  document.head.append(tracker);

  const visitorStats = document.querySelector("[data-visitor-stats]");
  const visitorCount = visitorStats?.querySelector("[data-visitor-count]");
  if (!visitorStats || !visitorCount) return;

  fetch(`${analyticsOrigin}/counter/TOTAL.json`, {
    credentials: "omit",
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Visitor count request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (typeof data.count !== "string" || !data.count.trim()) return;
      visitorCount.textContent = data.count;
      visitorStats.hidden = false;
    })
    .catch(() => {
      // Analytics must never make the homepage feel broken.
    });
})();
