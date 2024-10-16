const routes = [
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthLoginPage.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthRegisterPage.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/registered",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthRegisteredPage.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthForgotPasswordPage.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-food",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AddFoodPage.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/remove-food",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RemoveFoodPage.vue") },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-recipe",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AddRecipePage.vue") },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/cooking",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CookingPage.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/menu",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MenuPage.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shopping-list",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ShoppingListPage.vue") },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
