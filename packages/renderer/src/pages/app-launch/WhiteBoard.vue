<script setup>
// import { fabric } from "fabric";
// import { onMounted } from "vue";

// onMounted(() => {
//   var canvas = new fabric.Canvas("canvas-fabric");
//   let box = document.querySelector(".whiteboard");
//   let width = box.offsetWidth;
//   let height = box.offsetHeight;

//   canvas.setWidth(width);
//   canvas.setHeight(height);

//   window.addEventListener("resize", function (event) {
//     let box = document.querySelector(".whiteboard");
//     let width = box.offsetWidth;
//     let height = box.offsetHeight;

//     canvas.setWidth(width);
//     canvas.setHeight(height);
//   });

//   fabric.Image.fromURL(
//     "https://www.positivethinking.tech/wp-content/uploads/2021/01/Logo-Vuejs.png",
//     function (img) {
//       img.scale(0.5).set({
//         left: 150,
//         top: 150,
//         angle: -15,
//         srcFromAttribute: true,
//       });
//       canvas.add(img).setActiveObject(img);
//     }
//   );
// });

import interact from "interactjs";
var angle = 0;

var angleScale = {
  angle: 0,
  scale: 1,
};

var scaleElement = document.getElementById("scale-element");
var resetTimeout = 0;

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

function reset() {
  scaleElement.style.transform = "scale(1)";

  angleScale.angle = 0;
  angleScale.scale = 1;
}

interact("#gesture-area")
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
        // uses the dragMoveListener from the draggable demo above
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

interact("#rotate-area").gesturable({
  onmove: function (event) {
    var arrow = document.getElementById("arrow");

    angle += event.da;

    arrow.style.transform = "rotate(" + angle + "deg)";

    document.getElementById("angle-info").textContent =
      angle.toFixed(2) + "\u00b0";
  },
});
</script>

<template>
  <!-- <div class="whiteboard">
    <canvas id="canvas-fabric" style="border: 1px solid #ccc"></canvas>
  </div> -->
  <div class="whiteboard">
    <div id="rotate-area">
      <div id="angle-info">0&deg;</div>
      <svg id="arrow" viewbox="0 0 100 100">
        <polygon
          points="50,0 75,25 62.5,25 62.5,100 37.5,100 37.5,25 25,25"
          fill="#29e"
        ></polygon>
      </svg>
    </div>
    <div id="gesture-area">
      <img src="https://www.positivethinking.tech/wp-content/uploads/2021/01/Logo-Vuejs.png" alt="sample image" id="scale-element" />
    </div>
  </div>
</template>

<style></style>
