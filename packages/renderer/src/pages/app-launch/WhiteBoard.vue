<script setup>
import interact from "interactjs";
import { onMounted } from "vue";
import themes from "../../backups/themes.json";
import { storeToRefs } from "pinia";
import { themeStore } from "../../stores/themeStore";

const themesStore = themeStore();
const { themeSelected } = storeToRefs(themesStore);

themesStore.importThemes(themes);
//hard coded for now, but this would be a prop passed in from pre-launch
themesStore.changeTheme(themes[0]);

function reset() {
  scaleElement.style.transform = "scale(1)";

  angleScale.angle = 0;
  angleScale.scale = 1;
}

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

function gestureIt(e) {
  var el = e.target;
  var gestureArea = el.closest(".gesture-area");
  var scaleElement = gestureArea.firstChild;
  var resetTimeout;
  var angleScale = {
    angle: 0,
    scale: 1,
  };
  interact(gestureArea)
    .gesturable({
      listeners: {
        start(event) {
          angleScale.angle -= event.angle;
          clearTimeout(resetTimeout);
          scaleElement.classList.remove("reset");
        },
        move(event) {
          // document.body.appendChild(new Text(event.scale))
          var currentAngle = event.angle + angleScale.angle;
          var currentScale = event.scale * angleScale.scale;
          scaleElement.style.transform =
            "rotate(" + currentAngle + "deg)" + "scale(" + currentScale + ")";

          document.getElementById("angle-info").textContent =
            currentAngle.toFixed(2) + "\u00b0";
          // uses the dragMoveListener function above
          dragMoveListener(event);
        },
        end(event) {
          angleScale.angle = angleScale.angle + event.angle;
          angleScale.scale = angleScale.scale * event.scale;
          resetTimeout = setTimeout(reset, 1000);
          scaleElement.classList.add("reset");
        },
      },
    })
    .draggable({
      listeners: { move: dragMoveListener },
    });
}

onMounted(() => {
  var arrowArea = document.getElementById("arrowArea");
  var imageArea = document.getElementById("imageArea");

  arrowArea.dispatchEvent(new Event("mousedown"));
  imageArea.dispatchEvent(new Event("mousedown"));
});
</script>

<template>
  <component is="style">
    .pollsPage { --primary-color: {{ themeSelected.primaryColor }};
    --secondary-color: {{ themeSelected.secondaryColor }}; --accent-color:
    {{ themeSelected.accent }}; }
  </component>
  <div
    class="background"
    :style="{ backgroundColor: themeSelected.background }"
  ></div>
  <div class="whiteboard">
    <div id="angle-info">0&deg;</div>
    <div
      @touchstart="gestureIt"
      @mousedown="gestureIt"
      id="arrowArea"
      class="gesture-area rotate-area"
    >
      <svg class="scale-element" id="arrow" viewbox="0 0 100 100">
        <polygon
          points="50,0 75,25 62.5,25 62.5,100 37.5,100 37.5,25 25,25"
          fill="#29e"
        ></polygon>
      </svg>
    </div>
    <div
      id="imageArea"
      @touchstart="gestureIt"
      @mousedown="gestureIt"
      class="gesture-area"
    >
      <img
        src="https://www.positivethinking.tech/wp-content/uploads/2021/01/Logo-Vuejs.png"
        alt="sample image"
        class="scale-element"
      />
    </div>
  </div>
</template>

<style></style>
