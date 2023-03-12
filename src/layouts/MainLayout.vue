<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated>
      <q-toolbar>
        <router-link to="/" class="title"
          ><q-icon name="restaurant" size="sm" color="white"
        /></router-link>

        <q-toolbar-title class="title"
          ><router-link to="/" class="title">FIM</router-link></q-toolbar-title
        >
        <div class="title">Food Inventory Management</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<style lang="scss" scoped>
.container {
  background-color: #fffbc9;
}

.title {
  font-family: "fredoka";
  text-decoration: none;
  color: white;
}
</style>
