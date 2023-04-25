<template>
  <q-page class="flex flex-center">
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

<script>
import { defineComponent, ref } from "vue";
import { useRecipeStore } from "src/stores/recipeStore";

export default defineComponent({
  name: "CookingPage",

  setup() {
    const store = useRecipeStore();
    const { allRecipes } = store;
    const plats = [];
    const desserts = [];
    const entrees = [];
    const aperos = [];
    const boissons = [];
    const autres = [];

    allRecipes.forEach((recipe) => {
      const recipeType = recipe.type;
      switch (recipeType) {
        case "Plat":
          plats.push(recipe);
          break;
        case "Dessert":
          desserts.push(recipe);
          break;
        case "Entrée":
          entrees.push(recipe);
          break;
        case "Apéro":
          aperos.push(recipe);
          break;
        case "Boisson":
          boissons.push(recipe);
          break;
        case "Autres":
          autres.push(recipe);
          break;
        default:
          false;
      }
    });
    return { allRecipes, panel: ref("Plat") };
  },
});
</script>
