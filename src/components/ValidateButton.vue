<template>
  <q-btn
    :label="label"
    no-caps
    unelevated
    class="button full-width"
    color="primary"
  />
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
}
</style>
