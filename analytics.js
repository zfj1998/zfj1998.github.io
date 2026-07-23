(() => {
  // GoatCounter supplies private aggregate location reports. Busuanzi.cc
  // supplies the public visitor and page-view totals shown in the footer.
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

  const publicStats = document.querySelector("[data-public-counter]");
  const publicCounts = publicStats
    ? Array.from(publicStats.querySelectorAll("[data-visitor-count]"))
    : [];

  if (publicStats && publicCounts.length) {
    const revealPublicStats = () => {
      const countsAreReady = publicCounts.every((count) => {
        const value = count.textContent.trim().replaceAll(",", "");
        return value !== "" && Number.isFinite(Number(value));
      });

      if (!countsAreReady) return;
      publicStats.style.removeProperty("display");
      observer.disconnect();
    };

    const observer = new MutationObserver(revealPublicStats);
    publicCounts.forEach((count) => {
      observer.observe(count, { childList: true, characterData: true, subtree: true });
    });
  }

  const publicCounter = document.createElement("script");
  publicCounter.async = true;
  publicCounter.src = "https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js";
  document.head.append(publicCounter);
})();
