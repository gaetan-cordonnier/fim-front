<template>
  <q-input filled :label="label" spellcheck="false"
    ><q-icon v-if="icon" :name="icon"
  /></q-input>
</template>

<script setup>
const props = defineProps({
  label: String,
  icon: String,
});
</script>
<style lang="scss"></style>
