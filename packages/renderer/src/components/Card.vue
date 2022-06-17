<script setup>
import interact from "interactjs";
import { factStore } from "../stores/factStore";

const store = factStore();
let dynamicTargets = [];

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

interact(".card")
  .on("dragstart", function (event) {
    store.incrementZ();

    event.target.style.zIndex = store.currentZ;
  })
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      // interact.modifiers.snap({
      //   targets: dynamicTargets,
      //   relativePoints: [
      //     {
      //       x: 0,
      //       y: 0,
      //     },
      //   ],
      // }),
    ],

    onstart: function (event) {},

    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        dynamicTargets.length = 0;
        // var textEl = event.target.querySelector("p");
        // textEl &&
        //   (textEl.textContent =
        //     "moved a distance of " +
        //     Math.sqrt(
        //       (Math.pow(event.pageX - event.x0, 2) +
        //         Math.pow(event.pageY - event.y0, 2)) |
        //         0
        //     ).toFixed(2) +
        //     "px");
      },
    },
  });

interact(".dropzone").dropzone({
  overlap: 0.75,
  ondropactivate: function (event) {
    // event.target.classList.add("border-dashed");
    // event.target.classList.add("border-2");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;

    // feedback the possibility of a drop

    draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    // remove the drop feedback style

    if (event.target.classList.contains("saveDropZone")) {
      event.target.classList.remove("bg-green-200");
    } else {
      event.target.classList.remove("bg-red-300");
    }

    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function (event) {
    event.stopImmediatePropagation();
    var card = JSON.parse(event.relatedTarget.getAttribute("data-card"));

    if (
      event.target.classList.contains("saveDropZone") &&
      !event.relatedTarget.classList.contains("bg-green-200")
    ) {
      store.addToSavedCards(card);
      event.relatedTarget.classList.remove("bg-red-300");
      event.relatedTarget.classList.add("bg-green-200");
    } else if (event.target.classList.contains("cardContainer")) {
      store.addToCards(card);
      event.relatedTarget.classList.remove("bg-green-200");
      event.relatedTarget.classList.remove("bg-red-300");
    } else if (
      event.target.classList.contains("trashDropZone") &&
      !event.relatedTarget.classList.contains("bg-red-300")
    ) {
      store.removeFromCards(card);
      event.relatedTarget.classList.remove("bg-green-200");
      event.relatedTarget.classList.add("bg-red-300");
    }
  },
  ondropdeactivate: function (event) {
    // event.target.classList.remove("border-dashed");
    // event.target.classList.remove("border-2");
  },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

window.dragMoveListener = dragMoveListener;
</script>

<template>
  <div class="card">
    <h3 class="cardTitle">"{{ props.card.content }}"</h3>
    <p>- {{ props.card.author }}</p>
  </div>
</template>

<style></style>
