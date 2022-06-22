<script setup>
import { useField, useForm } from "vee-validate";
import { object, string, number, boolean } from "yup";
import BaseInput from "./BaseInput.vue";
import gsap from "gsap";

const emit = defineEmits(["loginStation"]);

const validationSchema = object({
  stationName: string().required("Station is required"),
  apiKey: string()
    .required("Key is required")
    .min(3, "Key must be at least 3 characters"),
});
const { handleSubmit, setFieldValue, errors } = useForm({ validationSchema });
const { value: stationName } = useField("stationName");
const { value: apiKey } = useField("apiKey");
const handleChange = (event, field) => {
  setFieldValue(field, event.target.value);
};
const submit = handleSubmit((values) => {
  console.log("Form Values: ", values);
  emit("loginStation");
});

function beforeEnter(el) {
  el.style.transform = "scale(0)";
}

function enter(el, done) {
  gsap.to(el, {
    scale: 1,
    ease: "elastic.out(1, 0.7)",
    duration: 0.7,
    onComplete: done,
  });
}
</script>

<template>
  <transition appear @beforeEnter="beforeEnter" @enter="enter">
    <div class="loginContainer">
      <form @submit.prevent="submit()">
        <p class="flexIt">
          <BaseInput
            :modelValue="stationName"
            @change="handleChange($event, 'stationName')"
            @input="
              errors.stationName ? handleChange($event, 'stationName') : null
            "
            :error="errors.stationName"
            label="Call Letters"
            type="text"
          ></BaseInput>
        </p>
        <p class="flexIt">
          <BaseInput
            :modelValue="apiKey"
            @change="handleChange($event, 'apiKey')"
            @input="errors.apiKey ? handleChange($event, 'apiKey') : null"
            :error="errors.apiKey"
            label="API Key"
            type="password"
          ></BaseInput>
        </p>
        <button class="submitBtn" type="submit">Authenticate</button>
      </form>
    </div>
  </transition>
</template>

<style></style>
