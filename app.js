const KEY = "site:theme";
const $html = document.documentElement;
const $btn = document.getElementById("toggle-theme");

function loadTheme(){
  const v = localStorage.getItem(KEY);
  if(v === "dark") $html.classList.add("dark");
}
function saveTheme(){
  const isDark = $html.classList.toggle("dark");
  localStorage.setItem(KEY, isDark ? "dark" : "light");
}

loadTheme();
$btn?.addEventListener("click", saveTheme);

console.log("app.js loaded");
console.log({
  h1: document.querySelector("h1")?.textContent?.trim(),
  headOK: !!document.querySelector('meta[charset]') && !!document.querySelector('meta[name="viewport"]'),
  cssOK: [...document.styleSheets].some(s => String(s.href||'').includes('styles.css')),
  cardsOK: document.querySelectorAll(".cards .card").length >= 2,
});

