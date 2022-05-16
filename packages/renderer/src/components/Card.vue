<script setup>
import interact from "interactjs";
import { mainStore } from "../stores/mainStore";

const store = mainStore();
let dynamicTargets = [];

defineProps({
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

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
</script>

<template>
  <div
    class="card p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-500 flex flex-col justify-center"
  >
    <h3
      class="cardTitle mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      "{{ card.content }}"
    </h3>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      - {{ card.author }}
    </p>
  </div>
</template>

<style scoped>
.card {
  min-width: 25em;
  touch-action: none;
  background: blue;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 1em 2em;
  color: white;
  border-radius: 10px;
  opacity: 0;
  z-index: -1;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card.showCard,
.card.placedCard {
  opacity: 1;
  z-index: 20;
}

.card.bg-green-200 {
  background-color: rgb(43 200 43);
}

.card.bg-red-300 {
  background-color: rgb(213, 8, 8);
}
</style>
