<script setup>
import { onMounted, ref, computed } from "vue";
import gsap from "gsap";
import { pollStore } from "../../stores/pollStore";
import themes from "../../backups/themes.json";
import { storeToRefs } from "pinia";
import { themeStore } from "../../stores/themeStore";

const themesStore = themeStore();
const { themeSelected } = storeToRefs(themesStore);

themesStore.importThemes(themes);
//hard coded for now, but this would be a prop passed in from pre-launch
themesStore.changeTheme(themes[0]);

const graphBar = ref(null);
const showBars = ref(false);
const store = pollStore();

const pollData = computed(() => store.pollData);

const eases = [
  "elastic.out(1, 0.3)",
  "power4.out",
  "bounce.out",
  "back.out(1.7)",
];

function changePick(index) {
  if (showBars.value) {
    const newPercent = Math.floor(Math.random() * (100 - 1 + 1) + 1);

    store.updatePollData(index, newPercent);
  } else {
    showBars.value = true;
  }
}

function beforeBarEnter(el) {
  let bar = el.getElementsByClassName("bar")[0];

  bar.style.width = 0;
}

function barEnter(el, done) {
  const percentHolder = el.getElementsByClassName("barPercentHolder")[0];
  let containerWidth = el.offsetWidth;
  const text = el.getElementsByClassName("barLabel")[0];
  let textWidth = text.offsetWidth;

  textWidth = ((textWidth / containerWidth) * 100).toFixed(2);

  let bar = el.getElementsByClassName("bar")[0];
  let counter = {
    value: 0,
  };
  let percentLeft;

  if (parseInt(bar.dataset.barwidth) > textWidth) {
    percentLeft = bar.dataset.barwidth;
  } else {
    percentLeft = parseFloat(textWidth) + 4;
  }

  gsap.to(bar, {
    width: bar.dataset.barwidth + "%",
    ease: "power4.out",
    duration: 2,
    // delay: bar.dataset.index * 0.3,
    onComplete: done,
  });

  gsap.to(percentHolder, {
    left: percentLeft + "%",
    ease: "power4.out",
    duration: 2,
    // delay: bar.dataset.index * 0.3,
    onComplete: done,
  });

  gsap.to(counter, {
    value: bar.dataset.barwidth,
    onUpdate: () => (percentHolder.innerText = Math.round(counter.value) + "%"),
    // delay: bar.dataset.index * 0.3,
    duration: 2,
  });
}

onMounted(() => {
  const apiCallResult = [
    {
      title: "Yes",
      color: "red",
      percent: 15,
    },
    {
      title: "No",
      color: "red",
      percent: 2,
    },
    {
      title: "Meh",
      color: "red",
      percent: 13,
    },
    {
      title: "That's a spicy meatball!",
      color: "red",
      percent: 70,
    },
  ];

  store.setPollData(apiCallResult);
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
  <div class="pollsPage">
    <div class="banner"></div>
    <div class="bannerTitle">
      <h1 class="bannerTitle-text">News Poll</h1>
    </div>
    <h2 class="pollMainTitle">Do you like spaghetti?</h2>
    <div class="pollContent">
      <div class="chartBackground">
        <div class="chartLabels">
          <div
            v-for="(bar, index) in pollData"
            :key="index"
            class="labelContainer"
          >
            <input :id="'radio' + index" type="radio" name="chartRadios" />
            <label @click="changePick(index)" :for="'radio' + index">
              <span>
                <svg
                  width="70"
                  height="70"
                  viewBox="0 0 26.458333 26.458333"
                  id="svg5"
                >
                  <path
                    class="mark"
                    style="
                      fill: none;
                      stroke: red;
                      stroke-width: 2.665;
                      stroke-opacity: 1;
                    "
                    d="M 6.6145832,11.1125 11.707811,16.734896 20.902082,6.6807291"
                    id="path2458"
                  />
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div class="chartBars">
          <transition-group name="list" appear v-if="!showBars">
            <div
              class="barOuter"
              v-for="(bar, index) in pollData"
              :key="bar.percent"
            >
              <span>{{ bar.title }}</span>
            </div>
          </transition-group>
          <transition-group
            appear
            @before-enter="beforeBarEnter"
            @enter="barEnter"
            name="list"
            v-else
          >
            <div
              class="barOuter"
              style="border: none"
              v-for="(bar, index) in pollData"
              :key="bar.percent"
            >
              <div class="showBar">
                <div
                  ref="graphBar"
                  class="bar"
                  :data-barwidth="bar.percent"
                  :data-index="index"
                  :style="{
                    background: `linear-gradient(to right, transparent 50%, ${bar.color})`,
                  }"
                >
                  <span class="barLabel">{{ bar.title }}</span>
                </div>
                <span class="barPercentHolder"></span>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
