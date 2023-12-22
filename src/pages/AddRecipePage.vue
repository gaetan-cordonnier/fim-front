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

<script setup>
import { ref, watch } from "vue";
import InputTime from "src/components/InputTime.vue";
import AddButton from "src/components/AddButton.vue";
import ValidateButton from "src/components/ValidateButton.vue";
import AlertDialog from "src/components/AlertDialog.vue";
import NewFoodDialog from "src/components/NewFoodDialog.vue";
import UpdateFoodDialog from "src/components/UpdateFoodDialog.vue";
import NewStepDialog from "src/components/NewStepDialog.vue";
import UpdateStepDialog from "src/components/UpdateStepDialog.vue";
import { errorMessage } from "src/utils/Notify";
import { useRecipeStore } from "src/stores/recipeStore";

const store = useRecipeStore();
const title = ref("");
const nbPerson = ref(4);
const nbPersonOptions = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]);
const type = ref("Plat");
const typeOptions = ref([
  "Plat",
  "Dessert",
  "Entrée",
  "Apéro",
  "Boisson",
  "Autre",
]);
const preparationTime = ref(15);
const restTime = ref(0);
const cookingTime = ref(15);
const newFoodDialogIsOpen = ref(false);
const updateFoodDialogIsOpen = ref(false);
const newStepDialogIsOpen = ref(false);
const updateStepDialogIsOpen = ref(false);
const ingredientsIdList = ref([]);
const ingredients = ref([]);
const ingredientSelected = ref(null);
const ingredientSelectedId = ref(0);
const steps = ref([{ id: 1, description: "" }]);
const stepSelected = ref({});
const stepSelectedId = ref(0);
const alert = ref(false);
const alertTitle = ref("Information");
const alertText = ref("Vous avez déjà ajouté cet ingrédient.");
const alertIcon = ref("info");

watch(preparationTime, (val) => {
  val !== "" ? (preparationTime.value = parseInt(val)) : false;
});

watch(restTime, (val) => {
  val !== "" ? (restTime.value = parseInt(val)) : false;
});

watch(cookingTime, (val) => {
  val !== "" ? (cookingTime.value = parseInt(val)) : false;
});

function openNewFoodDialog() {
  newFoodDialogIsOpen.value = true;
}

function openUpdateDialog() {
  updateFoodDialogIsOpen.value = true;
}

function openNewStepDialog() {
  newStepDialogIsOpen.value = true;
}

function addIngredient(ingredient) {
  const ingredientList = [...ingredients.value];
  if (ingredientList.length === 0) {
    ingredientsIdList.value.push(ingredient.id);
    ingredients.value.push(ingredient);
  } else if (ingredientsIdList.value.includes(ingredient.id)) {
    alert.value = true;
  } else {
    ingredientsIdList.value.push(ingredient.id);
    ingredients.value.push(ingredient);
  }
}

function showIngredient(ingredient, index) {
  ingredientSelected.value = ingredient;
  ingredientSelectedId.value = index;
  updateFoodDialogIsOpen.value = true;
}

function updateIngredient(ingredient) {
  ingredients.value[ingredientSelectedId.value] = ingredient;
}

function deleteIngredient() {
  const ingredientsList = [...ingredients.value];
  let newIngredientsIdList = [...ingredientsIdList.value];
  const id = [ingredientsList[ingredientSelectedId.value].id];
  newIngredientsIdList = newIngredientsIdList.filter(
    (element) => !id.includes(element)
  );
  ingredientsList.splice(ingredientSelectedId.value, 1);
  ingredients.value = ingredientsList;
  ingredientsIdList.value = newIngredientsIdList;
  updateFoodDialogIsOpen.value = false;
}

function addStep(newStep, index) {
  steps.value[0].description === ""
    ? (steps.value = [{ id: 1, description: newStep }])
    : steps.value.push({ id: index + 1, description: newStep });
}

function showStep(step, index) {
  if (index === 0 && step.description === "") {
    newStepDialogIsOpen.value = true;
  } else {
    stepSelected.value = step;
    stepSelectedId.value = index;
    updateStepDialogIsOpen.value = true;
  }
}

function updateStep(step) {
  steps.value[stepSelectedId.value] = step;
}

function deleteStep() {
  steps.value.splice(stepSelectedId.value, 1);
}

function saveRecipe() {
  if (title.value.length == 0) {
    errorMessage("Veuillez renseigner le titre");
  } else if (preparationTime.value === 0 || preparationTime.value === "") {
    errorMessage("Veuillez renseigner le temps de préparation");
  } else if (preparationTime.value === 0 || preparationTime.value === null) {
    errorMessage("Veuillez renseigner le temps de préparation");
  } else if (ingredients.value.length <= 1) {
    errorMessage("Veuillez ajouter au moins 2 ingrédients");
  } else if (steps.value[0].description === "") {
    errorMessage("Veuillez ajouter au moins 1 étape");
  } else {
    const recipe = {
      type: type.value,
      title: title.value,
      nbPerson: nbPerson.value,
      preparationTime: preparationTime.value,
      restTime: restTime.value,
      cookingTime: cookingTime.value,
      ingredients: ingredients.value,
      steps: steps.value,
    };
    store.addRecipe(recipe);
  }
}
</script>
<style lang="scss" scoped></style>
