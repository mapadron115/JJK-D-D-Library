/* Shared dossier behavior: click-to-declassify for SCP [REDACTED] flavor bars. */
document.addEventListener('click', function (e) {
  var t = e.target.closest ? e.target.closest('.redacted') : null;
  if (t) t.classList.toggle('revealed');
});
