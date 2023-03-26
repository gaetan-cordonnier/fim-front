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

    <q-page-container class="container mobile-only">
      <router-view />
    </q-page-container>

    <q-page-container class="column desktop-only bg-dark" style="height: 100vh">
      <div class="col q-mt-md self-center">
        <div class="bg-primary mini-header">
          <q-toolbar>
            <router-link to="/" class="title"
              ><q-icon name="restaurant" size="sm" color="white"
            /></router-link>

            <q-toolbar-title class="title"
              ><router-link to="/" class="title"
                >FIM</router-link
              ></q-toolbar-title
            >
            <div class="title">Food Inventory Management</div>
          </q-toolbar>
        </div>
        <div class="container middle-area col-auto scroll hide-scrollbar">
          <router-view />
        </div>
      </div>
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
  background-color: #fffcd5;
}

.title {
  font-family: "fredoka";
  text-decoration: none;
  color: white;
}

.mini-header {
  height: 60px;
  border-radius: 30px 30px 0 0;
  border-top: 9px solid $grey-9;
  border-left: 9px solid $grey-9;
  border-right: 9px solid $grey-9;
}

.middle-area {
  border-radius: 0 0 30px 30px;
  height: 85vh;
  width: 25vw;
  min-width: 400px;
  border-bottom: 9px solid $grey-9;
  border-left: 9px solid $grey-9;
  border-right: 9px solid $grey-9;
}
</style>
