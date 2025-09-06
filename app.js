const KEY = "site:theme";
const root = document.documentElement;
const btn  = document.getElementById("toggle-theme");

function applyThemeFromStorage(){
  const isDark = localStorage.getItem(KEY) === "dark";
  root.classList.toggle("dark", isDark);
  if (btn) btn.setAttribute("aria-pressed", String(isDark));
}

// โหลดครั้งแรก
applyThemeFromStorage();

// คลิกสลับ + บันทึก + apply
btn?.addEventListener("click", () => {
  const next = !(root.classList.contains("dark"));
  localStorage.setItem(KEY, next ? "dark" : "light");
  applyThemeFromStorage();
});

// รองรับเปลี่ยนค่าในแท็บอื่นหรือเปลี่ยนผ่าน Console
window.addEventListener("storage", (e) => {
  if (e.key === KEY) applyThemeFromStorage();
});
