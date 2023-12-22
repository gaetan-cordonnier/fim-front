const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/add-food",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AddFoodPage.vue") }],
  },
  {
    path: "/remove-food",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RemoveFoodPage.vue") },
    ],
  },
  {
    path: "/add-recipe",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AddRecipePage.vue") },
    ],
  },
  {
    path: "/cooking",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CookingPage.vue") }],
  },
  {
    path: "/menu",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MenuPage.vue") }],
  },
  {
    path: "/shopping-list",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ShoppingListPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
