let dragged;
let swapItem;

function createDraggableElement() {
  const element = document.createElement("div");
  element.setAttribute("class", "draggable-item");
  element.setAttribute("draggable", "true");
  return element;
}

for (let i = 0; i < 10; i++) {
  let element = createDraggableElement();
  element.innerText = `Draggable-item-${i}`;
  document.getElementById("draggable-column").appendChild(element);
}

const wrapper = document.getElementById("content-wrapper");
wrapper.addEventListener("dragstart", dragstart_handler, false);
wrapper.addEventListener("dragend", dragend_handler, false);
wrapper.addEventListener("dragover", dragover_handler, false);
wrapper.addEventListener("drop", drop_handler, false);

function dragstart_handler(e) {
  if (e.target.className == "draggable-item") {
    dragged = e.target;
    // dont add or remove style here, it cause bug on your clone dragged
  }
}

function dragover_handler(e) {
  e.preventDefault();
  e.stopPropagation();
  const x = e.clientX;
  const y = e.clientY;
  dragged.classList.add("active");
  // Reordering is working underground when you move dragged on target
  swapItem =
    document.elementFromPoint(x, y) === null
      ? dragged
      : document.elementFromPoint(x, y);
  if (dragged.parentNode == swapItem.parentNode) {
    // this is a trick, reorder process is working inside a loops until dragged next sibling match the position of swapItem!!!!
    console.log("Reordering inside a droppable");
    swapItem =
      swapItem !== dragged.nextSibling ? swapItem : swapItem.nextSibling;
    dragged.parentNode.insertBefore(dragged, swapItem);
  }
}

function dragend_handler(e) {
  //caveat: remove style here, when drag fail does not cause change style permanently
  dragged.classList.remove("active");
}

function drop_handler(e) {
  e.preventDefault();
  //   both draggable and droppable can receive element
  if (
    e.target.className === "draggable-column" ||
    e.target.className === "droppable-column"
  ) {
    dragged.parentNode.removeChild(dragged);
    e.target.appendChild(dragged);
  }
}
