const KEY = "todos:v1";
const $form = document.getElementById("todo-form");
$form.onsubmit = (e) => { e.preventDefault(); $add.click(); };
let todos = JSON.parse(localStorage.getItem(KEY) || "[]");
const save = () => localStorage.setItem(KEY, JSON.stringify(todos));
// หลัง push หรือลบ ให้เรียก save()
$add.onclick = () => {
  const text = $input.value.trim();
  if (!text) return;
  todos.push({ text, done:false });
  save(); render(); $input.value = "";
};
function removeAt(idx){
  todos.splice(idx,1);
  save(); render();
}
const $list  = document.getElementById("list");
const $input = document.getElementById("todo-input");
const $add   = document.getElementById("add-btn");
function render(){
  $list.innerHTML = "";
  todos.forEach((item, idx) => {
    const li = document.createElement("li");
    const cb = document.createElement("input"); cb.type="checkbox"; cb.checked=item.done;
    const del = document.createElement("button"); del.textContent="ลบ";
    cb.onchange = () => { todos[idx].done = cb.checked; save(); render(); };
    del.onclick  = () => removeAt(idx);
    li.append(cb, document.createTextNode(" "+item.text+" "), del);
    $list.append(li);
  });
}
$add.onclick = () => {
  const text = $input.value.trim();
  if (!text) return;
  todos.push(text);
  $input.value = "";
  render();
};
render()

const $search = document.getElementById("search");
const $filter = document.getElementById("filter");

function render(){
  const q = ($search.value||"").toLowerCase();
  const f = $filter.value || "all";

  $list.innerHTML = "";
  todos
    .filter(t => t.text.toLowerCase().includes(q))
    .filter(t => f==="all" ? true : f==="active" ? !t.done : t.done)
    .forEach((item, idx) => {
      const li = document.createElement("li");
      const cb = document.createElement("input"); cb.type="checkbox"; cb.checked=item.done;
      const del = document.createElement("button"); del.textContent="ลบ";
      cb.onchange = () => { todos[idx].done = cb.checked; save(); render(); };
      del.onclick  = () => removeAt(idx);
      li.append(cb, document.createTextNode(" "+item.text+" "), del);
      $list.append(li);
    });
}
$search.oninput = render;
$filter.onchange = render;
