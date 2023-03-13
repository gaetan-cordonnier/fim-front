<template>
  <q-page>
    <q-card class="bg-transparent" unelevated flat>
      <q-card-section class="row q-col-gutter-sm full-width">
        <div class="under-title full-width text-overline">
          - Nouvelle recette -
        </div>
        <div class="col-12 q-pt-none">
          <q-input filled v-model="title" label="Titre" />
        </div>
        <div class="col-4">
          <q-select filled dense v-model="nbPerson" :options="nbPersonOptions">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-select>
        </div>
        <div class="col-8">
          <q-select
            filled
            dense
            v-model="type"
            label="Type de recette"
            :options="typeOptions"
          >
          </q-select></div
      ></q-card-section>

      <q-card-section class="row q-col-gutter-sm full-width">
        <div class="under-title full-width text-overline">
          - Temps de réalisation -
        </div>
        <div class="col-4 q-pt-none">
          <input-time
            v-model="preparationTime"
            label="Préparation"
            icon="timelapse"
          />
        </div>
        <div class="col-4 q-pt-none">
          <input-time v-model="restTime" label="Repos" icon="hourglass_top" />
        </div>
        <div class="col-4 q-pt-none">
          <input-time v-model="cookingTime" label="Cuisson" icon="timer" />
        </div>
      </q-card-section>

      <q-card-section class="full-width">
        <div class="under-title full-width text-overline">- Ingrédients -</div>
        <div v-if="ingredients.length > 0" class="row q-pt-none q-mb-md">
          <q-list v-for="(ingredient, index) in ingredients" :key="index">
            <q-item dense class="q-pl-none q-ml-none">
              <q-item-section top avatar>
                <q-avatar color="secondary" text-color="white" icon="nutrition">
                  <!-- <img :src="ingredient.img" /> -->
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ ingredient.name }}</q-item-label>
                <q-item-label caption
                  >{{ ingredient.quantity }}
                  {{
                    ingredient.unit == "pièce" ? "" : ingredient.unit
                  }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="flex justify-center col-12">
          <add-button
            label="Ajouter un ingrédient"
            icon="add_circle"
            @click="openDialog"
          />
        </div>

        <new-food-dialog
          v-model="dialogIsOpen"
          @new-ingredient="addIngredient($event)"
        />
      </q-card-section>

      <q-card-section class="full-width"
        ><div class="under-title full-width text-overline">- Étapes -</div>
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="bg-transparent full-width q-mb-md"
          unelevated
          flat
        >
          <div class="full-widthc text-secondary">
            {{ index + 1 }}{{ index == 0 ? "ère" : "ème" }} étape
          </div>
          <q-input filled v-model="description" type="textarea"></q-input>
        </div>
        <div class="flex justify-center col-12">
          <add-button
            label="Ajouter une étape"
            icon="add_circle"
            @click="addStep(index, description)"
          />
        </div>
      </q-card-section>

      <q-card-actions
        ><validate-button label="Valider la recette" class="q-mb-lg"
      /></q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import InputTime from "src/components/InputTime.vue";
import AddButton from "src/components/AddButton.vue";
import ValidateButton from "src/components/ValidateButton.vue";
import NewFoodDialog from "src/components/NewFoodDialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddRecipePage",
  components: { InputTime, AddButton, NewFoodDialog, ValidateButton },

  setup() {
    return {
      title: ref(""),
      nbPerson: ref(4),
      nbPersonOptions: ref([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ]),
      type: ref("Plat"),
      typeOptions: ref([
        "Plat",
        "Dessert",
        "Entrée",
        "Apéro",
        "Boisson",
        "Autre",
      ]),
      preparationTime: ref(15),
      restTime: ref(0),
      cookingTime: ref(15),
      dialogIsOpen: ref(false),
      ingredientsIdList: ref([]),
      ingredients: ref([]),
      steps: ref([{ id: 1, description: "" }]),
      description: ref(""),
    };
  },

  methods: {
    openDialog() {
      this.dialogIsOpen = !this.dialogIsOpen;
    },
    addIngredient(val) {
      const ingredientList = [...this.ingredients];
      if (ingredientList.length === 0) {
        console.log("if");
        this.ingredientsIdList.push(val.id);
        this.ingredients.push(val);
      } else if (this.ingredientsIdList.includes(val.id)) {
        console.log("else if");
        console.log("ingrédient déjà ajouté");
      } else {
        console.log("else");
        this.ingredientsIdList.push(val.id);
        this.ingredients.push(val);
      }
    },
    addStep(index, description) {
      this.steps.push({ id: index + 1, description: description });
    },
  },
});
</script>
<style lang="scss" scoped></style>
