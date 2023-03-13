<template>
  <q-input
    filled
    dense
    :label="label"
    suffix="min"
    maxlength="3"
    type="number"
    class="input-number"
    input-style="text-align: right"
    ><template v-slot:prepend> <q-icon :name="icon" /> </template
  ></q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputTime",

  props: ["label", "icon"],
});
</script>
<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
