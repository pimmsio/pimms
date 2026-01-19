(function () {
  try {
    if (!location.pathname.startsWith("/thanks/")) return;

    var s = document.currentScript;
    if (!s || !s.src) return;

    var url = new URL(s.src).searchParams.get("url");
    if (!url) return;

    var key = "pimms_podia_fired_" + location.pathname;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    fetch(url, {
      method: "GET",
      mode: "no-cors",
      credentials: "include",
      keepalive: true
    });
  } catch (e) { }
})();
