<template>
  <q-btn
    :label="label"
    :icon="icon"
    no-caps
    unelevated
    class="button"
    color="secondary"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddButton",

  props: ["label", "icon"],
});
</script>
<style scoped>
.button {
  border-radius: 0.5em;
}
</style>
