// todo.js
const KEY = "todos:v1";

// refs
const $form   = document.getElementById("todo-form");
const $input  = document.getElementById("todo-input");
const $add    = document.getElementById("add-btn");
const $list   = document.getElementById("list");
const $search = document.getElementById("search");
const $filter = document.getElementById("filter");

// state
let todos = JSON.parse(localStorage.getItem(KEY) || "[]"); // [{text,done}]
const save = () => localStorage.setItem(KEY, JSON.stringify(todos));

// render one source of truth
function render() {
  const q = ($search?.value || "").toLowerCase();
  const f = $filter?.value || "all";

  $list.innerHTML = "";
  todos
    .filter(t => t.text.toLowerCase().includes(q))
    .filter(t => f === "all" ? true : f === "active" ? !t.done : t.done)
    .forEach((item, idx) => {
      const li = document.createElement("li");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = item.done;
      cb.onchange = () => { todos[idx].done = cb.checked; save(); render(); };

      const del = document.createElement("button");
      del.textContent = "ลบ";
      del.onclick = () => { todos.splice(idx, 1); save(); render(); };

      li.append(cb, document.createTextNode(" " + item.text + " "), del);
      $list.append(li);
    });
}

// events
$form.onsubmit = (e) => {
  e.preventDefault();
  const text = $input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  save();
  $input.value = "";
  render();
};
$search.oninput = render;
$filter.onchange = render;

// first paint
render();
