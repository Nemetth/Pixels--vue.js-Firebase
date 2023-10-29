<script>
import BaseLoader from "./BaseLoader.vue";

export default {
  name: "BaseButton",
  components: { BaseLoader },
  props: {
    color: {
      type: String,
      default: "blue",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgColor() {
      switch (this.color) {
        case "green":
          return "bg-green-600 text-white hover:bg-green-500";

        case "red":
          return "bg-red-600 text-white hover:bg-red-500";

        default:
          return "bg-blue-600 text-white hover:bg-indigo-400";
      }
    },
  },
};
</script>

<template>
  <button :class="`transition w-1/4 p-2 rounded bg-indigo-500 ${bgColor}`" type="submit">
    <template v-if="!loading">
      <slot>Enviar</slot>
    </template>
    <template v-else>
      <BaseLoader />
    </template>
  </button>
</template>
