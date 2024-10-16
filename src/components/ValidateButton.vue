<template>
  <q-btn :label="label" no-caps unelevated class="button" color="primary" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ValidateButton",

  props: ["label"],
});
</script>
<style scoped>
.button {
  border-radius: 0.5em;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
