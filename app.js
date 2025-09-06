const KEY = "site:theme";
const root = document.documentElement;
const btn  = document.getElementById("toggle-theme");

function applyThemeFromStorage(){
  const theme = localStorage.getItem(KEY);
  const isDark = theme === "dark";
  const isLight = theme === "light";
  root.classList.remove("dark", "light");
  if (isDark) root.classList.add("dark");
  if (isLight) root.classList.add("light");
  if (btn) btn.setAttribute("aria-pressed", String(isDark));
}

// โหลดครั้งแรก
applyThemeFromStorage();

// คลิกสลับ + บันทึก + apply
btn?.addEventListener("click", () => {
  const nextIsDark = !root.classList.contains("dark");
  localStorage.setItem(KEY, nextIsDark ? "dark" : "light");
  applyThemeFromStorage();
});

// รองรับเปลี่ยนค่าในแท็บอื่นหรือเปลี่ยนผ่าน Console
window.addEventListener("storage", (e) => {
  if (e.key === KEY) applyThemeFromStorage();
});

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");

addBtn.onclick = () => {
  const text = input.value.trim();
  if(text){
    todos.push(text);   // เพิ่มลง state
    input.value = "";   // เคลียร์ช่อง
    render();           // sync DOM
  }
};