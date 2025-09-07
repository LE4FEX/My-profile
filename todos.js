const KEY = "yodos:v1"
let todos = JSON.parse(localStorage.getItem(KEY) || '[]');
const save = () => localStorage.setItem(KEY, JSON.stringify(todos));

// ----- dom refs -----
const $list  = document.getElementById("list");
const $input = document.getElementById("todo-input");
const $add   = document.getElementById("add-btn");

// ----- render (state -> DOM) -----
function render() {
  $list.innerHTML = "";
  todos.forEach((text, idx) => {
    const li  = document.createElement("li");
    const del = document.createElement("button");
    li.textContent = text + " ";
    del.textContent = "ลบ";

    del.onclick = () => {
      todos.splice(idx, 1);   // อัปเดต state
      render();               // sync DOM
    };

    li.appendChild(del);
    $list.appendChild(li);
  });
}

// ----- events -----
$add.onclick = () => {
  const text = $input.value.trim();
  if (!text) return;
  todos.push(text);  // อัปเดต state
  $input.value = "";
  render();          // sync DOM
};

// first paint
render();