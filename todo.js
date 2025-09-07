let todos = ["อ่านหนังสือ", "ทำการบ้าน"];

const $list  = document.getElementById("list");
const $input = document.getElementById("todo-input");
const $add   = document.getElementById("add-btn");

function render() {
  $list.innerHTML = "";
  todos.forEach((text, idx) => {
    const li  = document.createElement("li");
    const del = document.createElement("button");
    li.textContent = text + " ";
    del.textContent = "ลบ";
    del.onclick = () => {
      todos.splice(idx, 1);
      render();
    };
    li.appendChild(del);
    $list.appendChild(li);
  });
}

$add.onclick = () => {
  const text = $input.value.trim();
  if (!text) return;
  todos.push(text);
  $input.value = "";
  render();
};

render();