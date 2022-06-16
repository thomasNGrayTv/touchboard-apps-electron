<script setup>
import { useField, useForm } from "vee-validate";
import { object, string, number, boolean } from "yup";
import BaseInput from "./BaseInput.vue";

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
});
</script>

<template>
  <div class="mainPageContainer">
    <h2>Station Login:</h2>
    <form @submit.prevent="submit()">
      <p>
        <BaseInput
          :modelValue="stationName"
          @change="handleChange($event, 'stationName')"
          :error="errors.stationName"
          label="Station Name"
          type="text"
        ></BaseInput>
      </p>
      <p>
        <BaseInput
          :modelValue="apiKey"
          @change="handleChange($event, 'apiKey')"
          :error="errors.apiKey"
          label="API Key"
          type="password"
        ></BaseInput>
      </p>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style></style>
