<template>
  <q-page>
    <q-card class="bg-transparent" unelevated flat>
      <q-card-section class="row q-col-gutter-sm full-width">
        <div class="under-title full-width text-overline">
          - Nouvelle recette -
        </div>
        <div class="col-12 q-pt-none">
          <q-input
            filled
            v-model="title"
            label="Titre"
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
          />
        </div>
        <div class="col-4">
          <q-select filled v-model="nbPerson" :options="nbPersonOptions">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-select>
        </div>
        <div class="col-8">
          <q-select
            filled
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
          <q-input
            filled
            v-model="step.description"
            autogrow
            readonly
            @click="showStep(steps[index], index)"
          ></q-input>
        </div>

        <div class="flex justify-center col-12">
          <add-button
            label="Ajouter une étape"
            icon="add_circle"
            @click="openNewStepDialog"
          />
        </div>
      </q-card-section>

      <new-step-dialog
        v-model="newStepDialogIsOpen"
        :stepIndex="
          steps[0].description === '' ? steps.length : steps.length + 1
        "
        @new-step="addStep($event, steps.length)"
      />

      <update-step-dialog
        v-model="updateStepDialogIsOpen"
        :stepSelected="stepSelected"
        :stepIndex="stepSelectedId"
        @update-step="updateStep($event)"
        @delete-step="deleteStep()"
      />

      <q-card-actions class="justify-center"
        ><validate-button
          label="Sauvegarder la recette"
          class="q-mb-lg"
          @click="saveRecipe"
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
import NewStepDialog from "src/components/NewStepDialog.vue";
import UpdateStepDialog from "src/components/UpdateStepDialog.vue";
import { defineComponent, ref } from "vue";
import { errorMessage } from "src/utils/Notify";
import { useRecipeStore } from "src/stores/recipeStore";

export default defineComponent({
  name: "AddRecipePage",
  components: {
    InputTime,
    AddButton,
    AlertDialog,
    NewFoodDialog,
    UpdateFoodDialog,
    NewStepDialog,
    UpdateStepDialog,
    ValidateButton,
  },

  setup() {
    const store = useRecipeStore();
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
      newStepDialogIsOpen: ref(false),
      updateStepDialogIsOpen: ref(false),
      ingredientsIdList: ref([]),
      ingredients: ref([]),
      ingredientSelected: ref(null),
      ingredientSelectedId: ref(0),
      steps: ref([{ id: 1, description: "" }]),
      stepSelected: ref(null),
      stepSelectedId: ref(0),
      description: ref(""),
      alert: ref(false),
      alertTitle: ref("Information"),
      alertText: ref("Vous avez déjà ajouté cet ingrédient."),
      alertIcon: ref("info"),
      store,
    };
  },

  methods: {
    openNewFoodDialog() {
      this.newFoodDialogIsOpen = true;
    },
    openUpdateDialog() {
      this.updateFoodDialogIsOpen = true;
    },
    openNewStepDialog() {
      this.newStepDialogIsOpen = true;
    },
    addIngredient(ingredient) {
      const ingredientList = [...this.ingredients];
      if (ingredientList.length === 0) {
        this.ingredientsIdList.push(ingredient.id);
        this.ingredients.push(ingredient);
      } else if (this.ingredientsIdList.includes(ingredient.id)) {
        this.alert = true;
      } else {
        this.ingredientsIdList.push(ingredient.id);
        this.ingredients.push(ingredient);
      }
    },
    showIngredient(ingredient, index) {
      this.ingredientSelected = ingredient;
      this.ingredientSelectedId = index;
      this.updateFoodDialogIsOpen = true;
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
    addStep(newStep, index) {
      this.steps[0].description === ""
        ? (this.steps = [{ id: 1, description: newStep }])
        : this.steps.push({ id: index + 1, description: newStep });
    },
    showStep(step, index) {
      if (index === 0 && step.description === "") {
        this.newStepDialogIsOpen = true;
      } else {
        this.stepSelected = step;
        this.stepSelectedId = index;
        this.updateStepDialogIsOpen = true;
      }
    },
    updateStep(step) {
      this.steps[this.stepSelectedId] = step;
    },
    deleteStep() {
      this.steps.splice(this.stepSelectedId, 1);
    },
    saveRecipe() {
      if (this.title.length == 0) {
        errorMessage("Veuillez renseigner le titre");
      } else if (this.preparationTime === 0 || this.preparationTime === "") {
        errorMessage("Veuillez renseigner le temps de préparation");
      } else if (this.preparationTime === 0 || this.preparationTime === null) {
        errorMessage("Veuillez renseigner le temps de préparation");
      } else if (this.ingredients.length <= 1) {
        errorMessage("Veuillez ajouter au moins 2 ingrédients");
      } else if (this.steps[0].description === "") {
        errorMessage("Veuillez ajouter au moins 1 étape");
      } else {
        const recipe = {
          type: this.type,
          title: this.title,
          nbPerson: this.nbPerson,
          preparationTime: this.preparationTime,
          restTime: this.restTime,
          cookingTime: this.cookingTime,
          ingredients: this.ingredients,
          steps: this.steps,
        };
        this.store.addRecipe(recipe);
      }
    },
  },

  watch: {
    preparationTime(val) {
      val !== "" ? (this.preparationTime = parseInt(val)) : false;
    },
    restTime(val) {
      val !== "" ? (this.restTime = parseInt(val)) : false;
    },
    cookingTime(val) {
      val !== "" ? (this.cookingTime = parseInt(val)) : false;
    },
  },
});
</script>
<style lang="scss" scoped></style>
