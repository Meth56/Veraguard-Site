/* Runs before the first paint (kept as a file so the Content-Security-Policy needs no inline script).
   m-enter: the hero's words wait for motion.js; the 700ms mark shows them if the script is late.
   mo-js / mo-safe: the moments' guard (assets/moments). */
(function () {
  var c = document.documentElement.classList;
  c.add('m-enter', 'mo-js');
  setTimeout(function () { c.add('m-enter-done'); }, 700);
  setTimeout(function () { c.add('mo-safe'); }, 2500);
})();
