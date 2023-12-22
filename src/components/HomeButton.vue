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

<script setup>
const props = defineProps({ label: String, icon: String });
</script>
<style scoped>
.button {
  border-radius: 0.5em;
}
</style>
