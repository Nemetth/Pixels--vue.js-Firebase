<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<template>
  <input
    class="w-3/4 p-2 border border-indigo-900 rounded"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
