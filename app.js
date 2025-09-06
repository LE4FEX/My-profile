// app.js
const KEY="site:theme";
const root=document.documentElement;
const btn=document.getElementById("toggle-theme");

// โหลดธีมที่เคยเลือก
if(localStorage.getItem(KEY)==="dark") root.classList.add("dark");

// คลิกสลับและบันทึก
btn?.addEventListener("click", ()=>{
  const isDark = root.classList.toggle("dark");
  localStorage.setItem(KEY, isDark ? "dark" : "light");
  btn.setAttribute("aria-pressed", String(isDark));
});

async function loadRepos(){
  const box = document.getElementById("projects");
  box.innerHTML = "Loading…";
  try{
    const res = await fetch("https://api.github.com/users/LE4FEX/repos?sort=updated&per_page=6");
    if(!res.ok) throw new Error(res.status);
    const repos = (await res.json())
      .filter(r => !r.fork)
      .slice(0,6);
    box.innerHTML = "";
    for(const r of repos){
      const el = document.createElement("article");
      el.className = "card";
      el.innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.description ?? "No description"}</p>
        <a href="${r.homepage || r.html_url}" target="_blank" rel="noopener">Open project</a>
      `;
      box.appendChild(el);
    }
    if(!repos.length) box.textContent = "No repos found.";
  }catch(e){
    box.textContent = "Failed to load projects.";
    console.error(e);
  }
}
loadRepos();
