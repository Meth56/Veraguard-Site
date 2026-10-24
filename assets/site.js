/* VeraGuard site script.
 * - Analytics (Google Analytics 4) loads ONLY after the visitor accepts.
 * - Set GA_MEASUREMENT_ID below once the owner has created the GA property.
 *   A measurement ID is public, not a secret.
 */
(function () {
  "use strict";

  var GA_MEASUREMENT_ID = ""; // e.g. "G-XXXXXXXXXX" — owner provides
  var KEY = "vg_consent";

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: ask again next visit */ }
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  var gaLoaded = false;

  function loadGA() {
    if (gaLoaded || !GA_MEASUREMENT_ID) return;
    gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function track(name, params) {
    if (gaLoaded) gtag("event", name, params || {});
  }

  // Custom events: email click, phone click, quote form submit.
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("mailto:") === 0) track("email_click", { link_url: href.split("?")[0] });
    else if (href.indexOf("tel:") === 0) track("phone_click", { link_url: href });
  });
  var form = document.getElementById("quote-form");
  if (form) form.addEventListener("submit", function () { track("quote_submit", { form_id: "quote-form" }); });

  // Consent banner
  var banner = document.getElementById("consent");
  var state = read();
  if (state === "yes") {
    loadGA();
  } else if (state !== "no" && banner) {
    banner.hidden = false;
  }
  if (banner) {
    var yes = document.getElementById("consent-yes");
    var no = document.getElementById("consent-no");
    if (yes) yes.addEventListener("click", function () { write("yes"); banner.hidden = true; loadGA(); });
    if (no) no.addEventListener("click", function () { write("no"); banner.hidden = true; });
  }
  var reset = document.getElementById("consent-reset");
  if (reset) reset.addEventListener("click", function (e) { e.preventDefault(); write(""); if (banner) banner.hidden = false; });

  // Quote form: opens the visitor's email app with the details filled in.
  // No server, no third-party form service, no stored data.
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      function v(n) { return (f[n] && f[n].value || "").trim(); }
      var lines = [
        "Name: " + v("name"),
        "Company: " + v("company"),
        "Email: " + v("email"),
        "Phone: " + v("phone"),
        "Type of work: " + v("work"),
        "Rolls needed: " + v("rolls"),
        "Job site city or postal code: " + v("site"),
        "Needed by: " + v("date"),
        "",
        "Details:",
        v("message")
      ];
      var subject = "Quote request: " + (v("company") || v("name"));
      window.location.href = "mailto:sales@veraguard.ca?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var done = document.getElementById("form-done");
      if (done) done.hidden = false;
    });
  }
})();
