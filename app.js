// app.js
const KEY="site:theme";
const root=document.documentElement;
const btn=document.getElementById("toggle-theme");

// โหลดธีมที่เคยเลือก
if(localStorage.getItem(KEY)==="dark") root.classList.add("dark");

// คลิกสลับและบันทึก
btn?.addEventListener("click",()=>{
  const isDark=root.classList.toggle("dark");
  localStorage.setItem(KEY, isDark ? "dark" : "light");
});