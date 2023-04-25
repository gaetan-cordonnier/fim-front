import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [{
      id:1,
      type: "Plat",
      title: "Recette 1",
      nbPerson: 4,
      preparationTime: 15,
      restTime: 0,
      cookingTime: 15,
      ingredients: [
          {
              id: 2,
              name: "Lait",
              quantity: 1,
              unit: "g",
              img: "water_full"
          },
          {
              id: 4,
              name: "Beurre",
              quantity: 1,
              unit: "g",
              img: "nutrition"
          },
          {
              id: 5,
              name: "Carottes",
              quantity: 1,
              unit: "ml",
              img: "nutrition"
          }
      ],
      steps: [
          {
              id: 1,
              description: "Eplucher..."
          },
          {
              id: 2,
              description: "Faire cuire"
          }
      ]
  },{
    id:2,
    type: "Plat",
    title: "Recette 2",
    nbPerson: 4,
    preparationTime: 15,
    restTime: 0,
    cookingTime: 15,
    ingredients: [
        {
            id: 2,
            name: "Lait",
            quantity: 1,
            unit: "g",
            img: "water_full"
        },
        {
            id: 4,
            name: "Beurre",
            quantity: 1,
            unit: "g",
            img: "nutrition"
        },
        {
            id: 5,
            name: "Carottes",
            quantity: 1,
            unit: "ml",
            img: "nutrition"
        }
    ],
    steps: [
        {
            id: 1,
            description: "Eplucher..."
        },
        {
            id: 2,
            description: "Faire cuire"
        }
    ]
},{
  id:3,
  type: "Plat",
  title: "Recette 3",
  nbPerson: 4,
  preparationTime: 15,
  restTime: 0,
  cookingTime: 15,
  ingredients: [
      {
          id: 2,
          name: "Lait",
          quantity: 1,
          unit: "g",
          img: "water_full"
      },
      {
          id: 4,
          name: "Beurre",
          quantity: 1,
          unit: "g",
          img: "nutrition"
      },
      {
          id: 5,
          name: "Carottes",
          quantity: 1,
          unit: "ml",
          img: "nutrition"
      }
  ],
  steps: [
      {
          id: 1,
          description: "Eplucher..."
      },
      {
          id: 2,
          description: "Faire cuire"
      }
  ]
}],
  }),
  getters: {
    allRecipes: (state) => state.recipes,
  },
  actions: {
    addRecipe(newRecipe) {
      console.log(newRecipe)
      this.recipes.push(newRecipe);
    },
  },
  persist: {
    enabled: true,
  },
});
