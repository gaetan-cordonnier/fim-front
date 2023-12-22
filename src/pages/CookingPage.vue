<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md">
      <div class="q-gutter-y-md" style="max-width: 350px">
        <q-option-group
          v-model="panel"
          inline
          :options="[
            { label: 'Plats', value: 'Plat' },
            { label: 'Desserts', value: 'Dessert' },
            { label: 'Entrées', value: 'Entrée' },
            { label: 'Apéros', value: 'Apéros' },
            { label: 'Boissons', value: 'Boissons' },
            { label: 'Autres', value: 'Autres' },
          ]"
        />

        <q-tab-panels
          v-for="recipe in allRecipes"
          :key="recipe"
          v-model="panel"
          animated
          class="shadow-2 rounded-borders"
        >
          <q-tab-panel :name="recipe.type">
            <div class="text-h6">{{ recipe.type }}</div>
            {{ recipe.title }}
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRecipeStore } from "src/stores/recipeStore";

const store = useRecipeStore();
const { allRecipes } = store;
const plats = ref([]);
const desserts = ref([]);
const entrees = ref([]);
const aperos = ref([]);
const boissons = ref([]);
const autres = ref([]);
const panel = ref({});

onMounted(() => {
  console.log(allRecipes);
});

allRecipes.forEach((recipe) => {
  const recipeType = recipe.type;
  switch (recipeType) {
    case "Plat":
      plats.value.push(recipe);
      break;
    case "Dessert":
      desserts.value.push(recipe);
      break;
    case "Entrée":
      entrees.value.push(recipe);
      break;
    case "Apéro":
      aperos.value.push(recipe);
      break;
    case "Boisson":
      boissons.value.push(recipe);
      break;
    case "Autres":
      autres.value.push(recipe);
      break;
    default:
      false;
  }
});
</script>
