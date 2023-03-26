<template>
  <q-page class="q-pa-sm">
    <q-card
      class="flex row q-col-gutter-md bg-transparent q-mb-md"
      unelevated
      flat
    >
      <span class="welcome-text col-12 text-center">
        <p>Bienvenue {{ firstname }}, nous sommes ravis de vous revoir !</p>
      </span>
      <div class="col-6">
        <home-button icon="do_not_disturb_on" label="Aliment" />
      </div>
      <div class="col-6">
        <home-button icon="add_circle" label="Aliment" @click="openScanner" />
      </div>
      <div class="col-6">
        <home-button icon="restaurant_menu" label="Cuisiner" />
      </div>
      <div class="col-6">
        <home-button icon="edit_note" label="Recette" to="/add-recipe" />
      </div>
      <div class="col-6">
        <home-button icon="shopping_cart" label="Courses" />
      </div>
      <div class="col-6">
        <home-button icon="menu_book" label="Menu" />
      </div>
    </q-card>

    <q-card
      v-if="scannerIsOpen"
      class="scanner-card bg-transparent"
      flat
      unelevated
      ><bar-code-reader @decode="onDecode" @loaded="onLoaded" /><q-btn
        icon="close"
        text-color="white"
        class="close-button"
        @click="closeScanner"
        flat
    /></q-card>
  </q-page>
</template>

<script>
import BarCodeReader from "src/components/BarCodeReader.vue";
import HomeButton from "src/components/HomeButton.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { BarCodeReader, HomeButton },
  setup() {
    return {
      firstname: ref("Gaëtan"),
      scannerIsOpen: ref(false),
      barCode: ref(""),
    };
  },

  methods: {
    openScanner() {
      this.scannerIsOpen = true;
    },
    closeScanner() {
      this.scannerIsOpen = false;
    },
    onDecode(barCode) {
      this.barCode = barCode;
      console.log(barCode);
      this.scannerIsOpen = this.scannerIsOpen = false;
    },
    onLoaded() {
      console.log("loaded");
    },
  },
});
</script>
<style lang="scss" scoped>
.welcome-text {
  font-style: italic;
  color: $primary;
}
.scanner-card {
  border-radius: 1em;
}
.close-button {
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: 1em;
}
</style>
