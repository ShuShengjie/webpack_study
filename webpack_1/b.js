function b() {
  var div = document.createElement("div");
  div.setAttribute("id", "number1");
  div.innerHTML = 1000;
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  }
  document.body.appendChild(div);
}

export default b;