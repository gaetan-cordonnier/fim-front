<template>
  <q-page
    class="bg-primary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row items-center justify-center">
        <q-icon name="restaurant" size="md" color="white" />
        <h4 class="q-ml-md title">FIM</h4>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg shadow-1">
          <slot />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style>
.title {
  font-family: "fredoka";
  text-decoration: none;
  color: white;
}

.q-card {
  width: 360px;
}
</style>
