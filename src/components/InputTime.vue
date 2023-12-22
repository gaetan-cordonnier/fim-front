<template>
  <q-input
    filled
    :label="label"
    suffix="min"
    maxlength="3"
    type="number"
    class="input-number"
    input-style="text-align: right"
    ><template v-slot:prepend> <q-icon :name="icon" /> </template
  ></q-input>
</template>

<script setup>
const props = defineProps({ label: String, icon: String });
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  appearance: textfield;
}
</style>
