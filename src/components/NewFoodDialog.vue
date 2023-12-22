<template>
  <q-dialog persistent>
    <q-card class="dialog full-width">
      <q-card-section>
        <div class="text-h6 text-primary">Ajouter un ingrédient</div>
      </q-card-section>

      <q-card-section v-if="!food" class="q-pt-none">
        <search-food v-model="food" />
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm" v-else>
        <div class="col-12">
          <q-input v-model="foodName" filled readonly />
        </div>
        <div class="col-6">
          <q-input
            v-model="quantity"
            filled
            label="Quantité"
            input-style="text-align: right"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="unitType"
            label="Unité"
            :options="unitOptions"
            filled
            input-style="text-align: right;"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Annuler"
          v-close-popup
          color="grey-6"
          @click="food = null"
        />
        <q-btn
          flat
          label="Ajouter"
          @click="addIngredient"
          v-close-popup="closeDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import SearchFood from "./SearchFood.vue";

const emits = defineEmits(["new-ingredient"]);

const food = ref(null);
const foodName = ref("");
const quantity = ref(1);
const unitOptions = ref(["kg", "g", "mg", "l", "dl", "cl", "ml", "pièce"]);
const unitType = ref("g");
const closeDialog = ref(false);

watch(food, (val) => {
  val ? (foodName.value = val.label) : false;
});

function addIngredient() {
  if (food.value) {
    const { id, label, img } = food.value;
    const newIngredient = {
      id: id,
      name: label,
      quantity: quantity.value,
      unit: unitType.value,
      img: img,
    };
    food.value ? emits("new-ingredient", newIngredient) : false;
    food.value = null;
    foodName.value = "";
    closeDialog.value = true;
  }
}
</script>
<style scoped>
.dialog {
  background-color: #fefcde;
}
</style>
