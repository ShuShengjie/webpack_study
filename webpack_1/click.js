function handleClick() {
  const div = document.createElement("div");
  div.innerHTML = "welcome to webpack";
  document.body.appendChild(div);
}

module.exports = handleClick;