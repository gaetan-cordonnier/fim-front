<template>
  <q-btn
    :label="label"
    :icon-right="icon"
    no-caps
    unelevated
    class="button full-width"
    color="secondary"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeButton",

  props: ["label", "icon"],
});
</script>
<style scoped>
.button {
  border-radius: 0.5em;
}
</style>
