<script setup>
import { onMounted, ref } from "vue";
var draw;
let history = ref([]);
let color = ref("#13c5f7");
let popups = ref({
  showColor: false,
  showSize: false,
  showSave: false,
  showOptions: false,
});
let size = ref(12);
let colors = ref([
  "#d4f713",
  "#13f7ab",
  "#13f3f7",
  "#13c5f7",
  "#138cf7",
  "#1353f7",
  "#2d13f7",
  "#7513f7",
  "#a713f7",
  "#d413f7",
  "#f713e0",
  "#f71397",
  "#f7135b",
  "#f71313",
  "#f76213",
  "#f79413",
  "#f7e013",
]);
const sizes = ref([6, 12, 24, 48]);

function removeAllHistory() {
  history.value = [];
  draw.redraw();
}

onMounted(() => {
  class Draw {
    constructor() {
      this.c = document.getElementById("canvas");
      this.ctx = this.c.getContext("2d");

      this.mouseDown = false;
      this.mouseX = 0;
      this.mouseY = 0;

      this.tempHistory = [];

      this.setSize();

      this.listen();

      this.redraw();
    }

    listen() {
      this.c.addEventListener("mousedown", (e) => {
        this.mouseDown = true;
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        this.setDummyPoint();
      });

      this.c.addEventListener("mouseup", () => {
        if (this.mouseDown) {
          this.setDummyPoint();
        }
        this.mouseDown = false;
      });

      this.c.addEventListener("mouseleave", () => {
        if (this.mouseDown) {
          this.setDummyPoint();
        }
        this.mouseDown = false;
      });

      this.c.addEventListener("mousemove", (e) => {
        this.moveMouse(e);

        if (this.mouseDown) {
          this.mouseX = this.mouseX;
          this.mouseY = this.mouseY;

          this.mouseX = e.offsetX;

          this.mouseY = e.offsetY;

          var item = {
            isDummy: false,
            x: this.mouseX,
            y: this.mouseY,
            c: color.value,
            r: size.value,
          };

          history.value.push(item);
          this.draw(item, history.value.length);
        }
      });

      window.addEventListener("resize", () => {
        this.setSize();
        this.redraw();
      });
    }

    setSize() {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight - 60;
    }

    moveMouse(e) {
      let x = e.offsetX;
      let y = e.offsetY;

      var cursor = document.getElementById("cursor");

      cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
    }

    getDummyItem() {
      var lastPoint = history.value[history.value.length - 1];

      return {
        isDummy: true,
        x: lastPoint.x,
        y: lastPoint.y,
        c: null,
        r: null,
      };
    }

    setDummyPoint() {
      var item = this.getDummyItem();
      history.value.push(item);
      this.draw(item, history.value.length);
    }

    redraw() {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);

      if (!history.value.length) {
        return true;
      }

      history.value.forEach((item, i) => {
        this.draw(item, i);
      });
    }

    draw(item, i) {
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";

      var prevItem = history.value[i - 2];

      if (i < 2) {
        return false;
      }

      if (!item.isDummy && !history.value[i - 1].isDummy && !prevItem.isDummy) {
        this.ctx.strokeStyle = item.c;
        this.ctx.lineWidth = item.r;

        this.ctx.beginPath();
        this.ctx.moveTo(prevItem.x, prevItem.y);
        this.ctx.lineTo(item.x, item.y);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (!item.isDummy) {
        this.ctx.strokeStyle = item.c;
        this.ctx.lineWidth = item.r;

        this.ctx.beginPath();
        this.ctx.moveTo(item.x, item.y);
        this.ctx.lineTo(item.x, item.y);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  draw = new Draw();
});
</script>

<template>
  <div class="app-wrapper">
    <canvas id="canvas"> </canvas>
    <div class="cursor" id="cursor"></div>
    <div class="controls">
      <div class="btn-row">
        <!-- <div class="history" title="history">
          {{ history.length }}
        </div> -->
      </div>
      <div class="btn-row">
        <button
          type="button"
          v-on:click="removeAllHistory"
          v-bind:class="{ disabled: !history.length }"
          title="Clear all"
        >
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
            ></path>
          </svg>
        </button>
      </div>

      <div class="btn-row">
        <button
          title="Pick a brush size"
          v-on:click="popups.showSize = !popups.showSize"
          v-bind:class="{ active: popups.showSize }"
        >
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"
            ></path>
          </svg>
          <span class="size-icon">
            {{ size }}
          </span>
        </button>

        <div class="popup" v-if="popups.showSize">
          <div class="popup-title">Brush size</div>
          <label v-for="sizeItem in sizes" class="size-item">
            <input
              type="radio"
              name="size"
              v-model="size"
              v-bind:value="sizeItem"
            />
            <span
              class="size"
              v-bind:style="{ width: sizeItem + 'px', height: sizeItem + 'px' }"
            ></span>
          </label>
        </div>
      </div>

      <div class="btn-row">
        <button
          title="Pick a color"
          v-on:click="popups.showColor = !popups.showColor"
          v-bind:class="{ active: popups.showColor }"
        >
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M6.176,7.241V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.221,0-0.403,0.181-0.403,0.402v0.461C4.79,7.416,4.365,7.955,4.365,8.591c0,0.636,0.424,1.175,1.006,1.35v3.278c0,0.222,0.182,0.402,0.403,0.402c0.222,0,0.402-0.181,0.402-0.402V9.941c0.582-0.175,1.006-0.714,1.006-1.35C7.183,7.955,6.758,7.416,6.176,7.241 M5.774,9.195c-0.332,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C6.377,8.923,6.105,9.195,5.774,9.195 M10.402,10.058V6.78c0-0.221-0.181-0.402-0.402-0.402c-0.222,0-0.402,0.181-0.402,0.402v3.278c-0.582,0.175-1.006,0.714-1.006,1.35c0,0.637,0.424,1.175,1.006,1.351v0.461c0,0.222,0.181,0.402,0.402,0.402c0.221,0,0.402-0.181,0.402-0.402v-0.461c0.582-0.176,1.006-0.714,1.006-1.351C11.408,10.772,10.984,10.233,10.402,10.058M10,12.013c-0.333,0-0.604-0.272-0.604-0.604S9.667,10.805,10,10.805c0.332,0,0.604,0.271,0.604,0.604S10.332,12.013,10,12.013M14.629,8.448V6.78c0-0.221-0.182-0.402-0.403-0.402c-0.221,0-0.402,0.181-0.402,0.402v1.668c-0.581,0.175-1.006,0.714-1.006,1.35c0,0.636,0.425,1.176,1.006,1.351v2.07c0,0.222,0.182,0.402,0.402,0.402c0.222,0,0.403-0.181,0.403-0.402v-2.07c0.581-0.175,1.006-0.715,1.006-1.351C15.635,9.163,15.21,8.624,14.629,8.448 M14.226,10.402c-0.331,0-0.604-0.272-0.604-0.604c0-0.332,0.272-0.604,0.604-0.604c0.332,0,0.604,0.272,0.604,0.604C14.83,10.13,14.558,10.402,14.226,10.402 M17.647,3.962H2.353c-0.221,0-0.402,0.181-0.402,0.402v11.27c0,0.222,0.181,0.402,0.402,0.402h15.295c0.222,0,0.402-0.181,0.402-0.402V4.365C18.05,4.144,17.869,3.962,17.647,3.962 M17.245,15.232H2.755V4.768h14.49V15.232z"
            ></path>
          </svg>
          <span class="color-icon" v-bind:style="{ backgroundColor: color }">
          </span>
        </button>

        <div class="popup" v-if="popups.showColor">
          <div class="popup-title">Brush color</div>
          <label v-for="colorItem in colors" class="color-item">
            <input
              type="radio"
              name="color"
              v-model="color"
              v-bind:value="colorItem"
            />
            <span
              v-bind:class="'color color-' + colorItem"
              v-bind:style="{ backgroundColor: colorItem }"
            ></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  opacity: 1;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #4691f6;
}

button:disabled .svg-icon {
  opacity: 0.5;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
.app-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
}
button,
input {
  font-size: 14px;
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 500;
}

.text-faded {
  opacity: 0.5;
}

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid rgb(30, 30, 30);
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 1s;
  display: none;
}

canvas {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: transparent;
  /* cursor: none; */
}

canvas:hover + .cursor {
  opacity: 1;
}
canvas:active + .cursor {
  border-color: rgb(60, 60, 60);
}

.controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(10, 10, 10);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.stat {
  font-size: 20px;
  margin-bottom: 15px;
}

.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}

.popup {
  position: absolute;
  width: 300px;
  bottom: 80px;
  padding: 30px;
  left: calc(50% - 150px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  color: rgb(30, 30, 30);
  border-radius: 10px 10px 0 0;
  border: 1px solid rgb(220, 220, 220);
  border-bottom-width: 0;
  opacity: 0;
  animation: popup 0.5s forwards cubic-bezier(0.2, 2, 0.4, 1);
  z-index: 2;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
}

.popup .popup-title {
  flex: 0 0 100%;
  text-align: center;
  font-size: 16px;
  color: black;
  opacity: 0.5;
  margin-bottom: 10px;
}

button {
  height: 80px;
  width: 80px;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}

button i {
  display: block;
  font-size: 30px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.2);
}

button.disabled {
  color: rgba(0, 0, 0, 0.2);
}

button.disabled i {
  color: rgba(0, 0, 0, 0.1);
}

button.active,
button:active {
  color: rgba(0, 0, 0, 0.4);
}

button.active i,
button:active i {
  color: rgb(0, 149, 255);
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.welcome-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgb(0, 149, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-up {
  opacity: 0;
  animation: fade-up 1s forwards cubic-bezier(0.2, 2, 0.4, 1);
}

.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 4px;
  background-color: rgb(0, 149, 255);
  color: white;
  animation-delay: 1s;
  transition: all 0.15s;
  cursor: pointer;
}

.btn:hover {
  background-color: lighten(rgb(0, 149, 255), 10%);
}

.welcome {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.welcome h1.fade-up {
  font-weight: 300;
  font-size: 40px;
  animation-delay: 0.25s;
}

.welcome h2.fade-up {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  animation-delay: 0.5s;
}

.welcome a.fade-up {
  color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  animation-delay: 0.75s;
}

.welcome .btn.fade-up {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  margin-top: 60px;
}
.welcome .btn.fade-up:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

@keyframes fade-up {
  from {
    transform: translateY(80px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.form {
  flex: 0 0 100%;
}

.form input {
  display: block;
  appearance: none;
  border: 0;
  box-shadow: 0;
  outline: 0;
  background-color: rgb(240, 240, 240);
  border-radius: 4px;
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 4px;
}

button {
  appearance: none;
  border: 0;
  border-radius: 0;
  box-shadow: 0;
  width: 40px;
  height: 60px;
  display: inline-block;
  background-color: transparent;
  color: rgb(140, 140, 140);
  font-size: 22px;
  transition: all 0.15s;
  cursor: pointer;
  outline: 0;
  position: relative;
}

button .size-icon,
button .color-icon {
  position: absolute;
  top: 10px;
  right: 0;
}

button .color-icon {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

button .size-icon {
  font-size: 6px;
  text-align: right;
}

button:hover {
  opacity: 0.8;
}

button:active,
button.active {
  color: white;
}

button.disabled {
  color: rgb(50, 50, 50);
  cursor: not-allowed;
}

.history {
  width: 30px;
  height: 30px;
  background-color: rgb(30, 30, 30);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  color: rgb(140, 140, 140);
}

.color-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-item input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.color-item input:checked + .color {
  opacity: 1;
  border: 2px solid rgb(0, 149, 255);
}

.color-item .color {
  display: block;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
}

.color-item .color:hover {
  opacity: 0.8;
}

@keyframes pulsate {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale(1.15);
  }
}

.size-item {
  width: 40px;
  height: 60px;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  cursor: pointer;
}

.size-item input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.size-item .size {
  background-color: rgb(140, 140, 140);
  display: inline-block;
  border-radius: 50%;
  transition: all 0.15s;
  transform: translate(-50%, -50%) scale(0.6);
  position: absolute;
  top: 50%;
  left: 50%;
}

.size-item .size:hover {
  opacity: 0.8;
}

.size-item input:checked + .size {
  background-color: rgb(0, 149, 255);
}

.saves {
  flex: 0 0 calc(100% + 60px);
  margin: 30px -30px -30px;
  padding: 30px;
  background-color: rgb(240, 240, 240);
  max-height: 250px;
  overflow-y: auto;
}
.saves .save-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
