(() => {
  // GoatCounter supplies private aggregate location reports. Busuanzi supplies
  // the public visitor and page-view totals shown in the footer.
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

  const publicCounter = document.createElement("script");
  publicCounter.async = true;
  publicCounter.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  document.head.append(publicCounter);
})();
