<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRecipeStore } from "src/stores/recipeStore";

export default defineComponent({
  name: "CookingPage",

  setup() {
    const store = useRecipeStore();
    const recipeList = store.getRecipe;
    console.log(recipeList);
    return { recipeList };
  },
});
</script>
