<template>
  <q-dialog>
    <q-card class="dialog">
      <q-card-section class="row">
        <q-icon :name="icon" size="md" class="q-mr-md" />
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ text }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({ title: String, text: String, icon: String });
</script>

<style scoped>
.dialog {
  background-color: #fefcde;
}
</style>
