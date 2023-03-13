<template>
  <q-dialog persistent>
    <q-card class="dialog full-width">
      <q-card-section>
        <div class="text-h6">Rechercher un ingrédient</div>
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
          v-if="foodName !== ''"
          flat
          label="Ajouter"
          @click="addIngredient"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import SearchFood from "./SearchFood.vue";

export default defineComponent({
  components: { SearchFood },
  name: "NewFoodDialog",

  emits: ["new-ingredient"],

  setup() {
    return {
      food: ref(null),
      foodName: ref(""),
      quantity: ref(1),
      unitOptions: ref(["kg", "g", "mg", "l", "dl", "cl", "ml", "pièce"]),
      unitType: ref("g"),
      ingredients: ref([]),
    };
  },

  methods: {
    addIngredient() {
      const { id, label, img } = this.food;
      const newIngredient = {
        id: id,
        name: label,
        quantity: this.quantity,
        unit: this.unitType,
        img: img,
      };
      this.food ? this.$emit("new-ingredient", newIngredient) : false;
      this.food = null;
    },
  },

  watch: {
    food(val) {
      val ? (this.foodName = val.label) : false;
    },
  },
});
</script>
<style scoped>
.dialog {
  background-color: #fefcde;
}
</style>
