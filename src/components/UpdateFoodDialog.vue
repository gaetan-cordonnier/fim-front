<template>
  <q-dialog persistent>
    <q-card class="dialog full-width">
      <q-card-section class="row justify-between">
        <div class="text-h6 text-primary">Modifier un ingrédient</div>
        <q-icon
          name="delete"
          size="md"
          color="grey-7"
          @click="deleteIngredient()"
        />
      </q-card-section>

      <q-card-section class="row q-col-gutter-sm">
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
        <q-btn flat label="Annuler" v-close-popup color="grey-6" />
        <q-btn flat label="Modifier" @click="updateIngredient" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onUpdated, ref } from "vue";

const props = defineProps({ food: Object });

const emits = defineEmits(["update-ingredient", "delete-ingredient"]);

const foodName = ref("");
const quantity = ref(1);
const unitOptions = ref(["kg", "g", "mg", "l", "dl", "cl", "ml", "pièce"]);
const unitType = ref("g");

function updateIngredient() {
  const ingredient = {
    id: food.value.id,
    name: food.value.name,
    quantity: quantity.value,
    unit: unitType.value,
    img: food.value.img,
  };
  emits("update-ingredient", ingredient);
}

function deleteIngredient() {
  emits("delete-ingredient");
}

onUpdated(() => {
  foodName.value = props.food.name;
});
</script>
<style scoped>
.dialog {
  background-color: #fefcde;
}
</style>
