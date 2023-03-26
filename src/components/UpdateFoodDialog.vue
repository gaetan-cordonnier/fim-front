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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NewFoodDialog",

  props: ["food"],

  emits: ["update-ingredient", "delete-ingredient"],

  setup() {
    return {
      foodName: ref(""),
      quantity: ref(1),
      unitOptions: ref(["kg", "g", "mg", "l", "dl", "cl", "ml", "pièce"]),
      unitType: ref("g"),
    };
  },

  methods: {
    updateIngredient() {
      const ingredient = {
        id: this.food.id,
        name: this.food.name,
        quantity: this.quantity,
        unit: this.unitType,
        img: this.food.img,
      };
      this.$emit("update-ingredient", ingredient);
    },
    deleteIngredient() {
      this.$emit("delete-ingredient");
    },
  },

  updated() {
    this.foodName = this.food.name;
  },
});
</script>
<style scoped>
.dialog {
  background-color: #fefcde;
}
</style>
