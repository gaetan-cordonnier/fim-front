<template>
  <StreamBarcodeReader class="scanner" />
</template>

<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";
</script>

<style scoped>
.scanner {
  border-radius: 1em;
}
</style>
