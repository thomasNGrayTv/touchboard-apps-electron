<script setup>
import UniqueId from "../features/UniqueID";

const uuid = UniqueId().getID();
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
  error: {
    type: [String, Object],
    default: "",
  },
});
</script>

<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    :id="uuid"
    v-bind="$attrs"
    :value="modelValue"
    class="field"
    :class="{ errorBorder: error }"
    @input="$emit('update:modelValue', $event.target.value)"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  />
  <p
    aria-live="assertive"
    v-if="error"
    :id="`${uuid}-error`"
    class="errorMessage"
  >
    {{ error }}
  </p>
</template>

<style></style>
