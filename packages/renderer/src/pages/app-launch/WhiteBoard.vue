<script setup>
import interact from "interactjs";
import { onMounted } from "vue";
import themes from "../../backups/themes.json";
import { storeToRefs } from "pinia";
import { themeStore } from "../../stores/themeStore";
import * as Hammer from "hammerjs";

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

onMounted(() => {
  var angle = 0;

  var angleScale = {
    angle: 0,
    scale: 1,
  };

  var scaleElement = document.getElementById("scale-element");
  var resetTimeout;
  var gestureArea = document.getElementById("gesture-area");

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

  // hammer js
  var reqAnimationFrame = (function () {
    return (
      window[Hammer.prefixed(window, "requestAnimationFrame")] ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var log = document.querySelector("#log");
  var el = document.querySelector("#hit");

  var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
  var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);

  var ticking = false;
  var transform;
  var timer;

  var mc = new Hammer.Manager(el);

  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

  mc.add(new Hammer.Swipe()).recognizeWith(mc.get("pan"));
  mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get("pan"));
  mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([
    mc.get("pan"),
    mc.get("rotate"),
  ]);

  mc.add(new Hammer.Tap({ event: "doubletap", taps: 2 }));
  mc.add(new Hammer.Tap());

  mc.on("panstart panmove", onPan);
  mc.on("rotatestart rotatemove", onRotate);
  mc.on("pinchstart pinchmove", onPinch);
  mc.on("swipe", onSwipe);
  mc.on("tap", onTap);
  mc.on("doubletap", onDoubleTap);

  mc.on("hammer.input", function (ev) {
    if (ev.isFinal) {
      resetElement();
    }
  });

  function resetElement() {
    el.className = "animate";
    transform = {
      translate: { x: START_X, y: START_Y },
      scale: 1,
      angle: 0,
      rx: 0,
      ry: 0,
      rz: 0,
    };

    requestElementUpdate();

    if (log.textContent.length > 2000) {
      log.textContent = log.textContent.substring(0, 2000) + "...";
    }
  }

  function updateElementTransform() {
    var value = [
      "translate3d(" +
        transform.translate.x +
        "px, " +
        transform.translate.y +
        "px, 0)",
      "scale(" + transform.scale + ", " + transform.scale + ")",
      "rotate3d(" +
        transform.rx +
        "," +
        transform.ry +
        "," +
        transform.rz +
        "," +
        transform.angle +
        "deg)",
    ];

    value = value.join(" ");
    el.textContent = value;
    el.style.webkitTransform = value;
    el.style.mozTransform = value;
    el.style.transform = value;
    ticking = false;
  }

  function requestElementUpdate() {
    if (!ticking) {
      reqAnimationFrame(updateElementTransform);
      ticking = true;
    }
  }

  function logEvent(str) {
    //log.insertBefore(document.createTextNode(str +"\n"), log.firstChild);
  }

  function onPan(ev) {
    el.className = "";
    transform.translate = {
      x: START_X + ev.deltaX,
      y: START_Y + ev.deltaY,
    };

    requestElementUpdate();
    logEvent(ev.type);
  }

  var initScale = 1;
  function onPinch(ev) {
    if (ev.type == "pinchstart") {
      initScale = transform.scale || 1;
    }

    el.className = "";
    transform.scale = initScale * ev.scale;

    requestElementUpdate();
    logEvent(ev.type);
  }

  var initAngle = 0;
  function onRotate(ev) {
    if (ev.type == "rotatestart") {
      initAngle = transform.angle || 0;
    }

    el.className = "";
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;
    requestElementUpdate();
    logEvent(ev.type);
  }

  function onSwipe(ev) {
    var angle = 50;
    transform.ry = ev.direction & Hammer.DIRECTION_HORIZONTAL ? 1 : 0;
    transform.rx = ev.direction & Hammer.DIRECTION_VERTICAL ? 1 : 0;
    transform.angle =
      ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)
        ? angle
        : -angle;

    clearTimeout(timer);
    timer = setTimeout(function () {
      resetElement();
    }, 300);
    requestElementUpdate();
    logEvent(ev.type);
  }

  function onTap(ev) {
    transform.rx = 1;
    transform.angle = 25;

    clearTimeout(timer);
    timer = setTimeout(function () {
      resetElement();
    }, 200);
    requestElementUpdate();
    logEvent(ev.type);
  }

  function onDoubleTap(ev) {
    transform.rx = 1;
    transform.angle = 80;

    clearTimeout(timer);
    timer = setTimeout(function () {
      resetElement();
    }, 500);
    requestElementUpdate();
    logEvent(ev.type);
  }

  resetElement();
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
    <div class="hammerContainer">
      <div id="log"></div>
      <div id="hit"></div>
    </div>
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
      <img
        src="https://www.positivethinking.tech/wp-content/uploads/2021/01/Logo-Vuejs.png"
        alt="sample image"
        id="scale-element"
      />
    </div>
  </div>
</template>

<style></style>
