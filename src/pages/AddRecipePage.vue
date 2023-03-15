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
            <q-item
              clickable
              dense
              class="q-pl-none q-ml-none"
              @click="showIngredient(ingredient, index)"
            >
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
            @click="openNewFoodDialog"
          />
        </div>

        <new-food-dialog
          v-model="newFoodDialogIsOpen"
          @new-ingredient="addIngredient($event)"
        />

        <update-food-dialog
          v-model="updateFoodDialogIsOpen"
          :food="ingredientSelected"
          @update-ingredient="updateIngredient($event)"
          @delete-ingredient="deleteIngredient()"
        />

        <alert-dialog
          :title="alertTitle"
          :text="alertText"
          :icon="alertIcon"
          v-model="alert"
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
          <q-input filled v-model="step.description" type="textarea"></q-input>
        </div>

        <div class="flex justify-center col-12">
          <add-button
            label="Ajouter une étape"
            icon="add_circle"
            @click="addStep(index)"
          />
        </div>
      </q-card-section>

      <q-card-actions class="justify-center"
        ><validate-button label="Sauvegarder la recette" class="q-mb-lg"
      /></q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import InputTime from "src/components/InputTime.vue";
import AddButton from "src/components/AddButton.vue";
import ValidateButton from "src/components/ValidateButton.vue";
import AlertDialog from "src/components/AlertDialog.vue";
import NewFoodDialog from "src/components/NewFoodDialog.vue";
import UpdateFoodDialog from "src/components/UpdateFoodDialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddRecipePage",
  components: {
    InputTime,
    AddButton,
    AlertDialog,
    NewFoodDialog,
    UpdateFoodDialog,
    ValidateButton,
  },

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
      newFoodDialogIsOpen: ref(false),
      updateFoodDialogIsOpen: ref(false),
      ingredientsIdList: ref([]),
      ingredients: ref([]),
      ingredientSelected: ref(null),
      ingredientSelectedId: ref(0),
      steps: ref([{ id: 1, description: "" }]),
      description: ref(""),
      alert: ref(false),
      alertTitle: ref("Information"),
      alertText: ref("Vous avez déjà ajouté cet ingrédient."),
      alertIcon: ref("info"),
    };
  },

  methods: {
    openNewFoodDialog() {
      this.newFoodDialogIsOpen = true;
    },
    openUpdateDialog() {
      this.updateFoodDialogIsOpen = true;
    },
    addIngredient(ingredient) {
      const ingredientList = [...this.ingredients];
      if (ingredientList.length === 0) {
        this.ingredientsIdList.push(ingredient.id);
        this.ingredients.push(ingredient);
      } else if (this.ingredientsIdList.includes(ingredient.id)) {
        console.log(this.ingredientsIdList, ingredient.id);
        this.alert = true;
      } else {
        this.ingredientsIdList.push(ingredient.id);
        this.ingredients.push(ingredient);
      }
    },
    showIngredient(ingredient, index) {
      this.ingredientSelected = ingredient;
      this.updateFoodDialogIsOpen = true;
      this.ingredientSelectedId = index;
    },
    updateIngredient(ingredient) {
      this.ingredients[this.ingredientSelectedId] = ingredient;
    },
    deleteIngredient() {
      const ingredientsList = [...this.ingredients];
      let newIngredientsIdList = [...this.ingredientsIdList];
      const id = [ingredientsList[this.ingredientSelectedId].id];
      newIngredientsIdList = newIngredientsIdList.filter(
        (element) => !id.includes(element)
      );
      ingredientsList.splice(this.ingredientSelectedId, 1);
      this.ingredients = ingredientsList;
      this.ingredientsIdList = newIngredientsIdList;
      this.updateFoodDialogIsOpen = false;
    },

    addStep(index) {
      this.steps.push({ id: index + 1, description: "" });
      this.description = "";
    },
  },
});
</script>
<style lang="scss" scoped></style>
