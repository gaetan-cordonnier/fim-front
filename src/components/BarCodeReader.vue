<template>
  <StreamBarcodeReader class="scanner" />
</template>

<script>
import { defineComponent } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default defineComponent({
  name: "BarCodeReader",

  components: { StreamBarcodeReader },
});
</script>

<style scoped>
.scanner {
  border-radius: 1em;
}
</style>
