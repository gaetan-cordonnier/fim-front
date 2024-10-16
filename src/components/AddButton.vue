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

<script setup>
const props = defineProps({
  label: String,
  icon: String,
});
</script>
<style scoped>
.button {
  border-radius: 0.5em;
}
</style>
