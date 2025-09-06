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
