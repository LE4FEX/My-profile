const KEY = "todo:v1"
let todo = JSON.parse(localStorage.getItem(KEY) || '[]');
const save = () => localStorage.setItem(KEY, JSON.stringify(todo));

// ----- dom refs -----
const $list  = document.getElementById("list");
const $input = document.getElementById("todo-input");
const $add   = document.getElementById("add-btn");

// ----- render (state -> DOM) -----
function render() {
  $list.innerHTML = "";
  todo.forEach((text, idx) => {
    const li  = document.createElement("li");
    const del = document.createElement("button");
    li.textContent = text + " ";
    del.textContent = "ลบ";

    del.onclick = () => {
      todo.splice(idx, 1);   // อัปเดต state
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
  todo.push(text);  // อัปเดต state
  $input.value = "";
  render();          // sync DOM
};

// first paint
render();