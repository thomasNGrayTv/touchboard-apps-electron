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
  <div class="draw-app-wrapper">
    <canvas id="canvas"> </canvas>
    <div class="cursor" id="cursor"></div>
    <div class="controls">
      <div class="btn-row"></div>
      <div class="btn-row">
        <button
          type="button"
          @touchstart.prevent="removeAllHistory"
          v-on:click.prevent="removeAllHistory"
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
          @touchstart.prevent="popups.showSize = !popups.showSize"
          v-on:click.prevent="popups.showSize = !popups.showSize"
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
          @touchstart.prevent="popups.showColor = !popups.showColor"
          v-on:click.prevent="popups.showColor = !popups.showColor"
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

<style></style>
