<template>
  <q-btn
    :label="label"
    flat
    padding="none"
    size="md"
    no-caps
    color="secondary"
  />
</template>

<script setup>
const props = defineProps({
  label: String,
});
</script>
<style scoped></style>
