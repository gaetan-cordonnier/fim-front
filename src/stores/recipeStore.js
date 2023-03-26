import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipe: [],
  }),
  getters: {
    getRecipe: (state) => state.recipe,
  },
  actions: {
    addRecipe(newRecipe) {
      console.log(newRecipe)
      this.recipe.push(newRecipe);
    },
  },
});
