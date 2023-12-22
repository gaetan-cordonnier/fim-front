<template>
  <q-dialog persistent @hide="resetDialog()">
    <q-card class="dialog full-width">
      <q-card-section>
        <div class="text-h6 text-primary">
          {{ stepIndex }}{{ stepIndex == 1 ? "ère" : "ème" }} étape
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="step"
          autogrow
          autofocus
          :rules="[
            (val) => !!val || 'Veuillez remplir ce champ pour pouvoir valider',
          ]"
        ></q-input>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Annuler"
          v-close-popup
          color="grey-6"
          @click="food = null"
        />
        <q-btn
          flat
          label="Ajouter"
          @click="addStep(step)"
          v-close-popup="closeDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ stepIndex: Number });

const emits = defineEmits(["new-step"]);

const step = ref("");
const closeDialog = ref(false);

function resetDialog() {
  closeDialog.value = false;
  step.value = "";
}

function addStep(step) {
  console.log(step);
  step.length === 0
    ? false
    : (emits("new-step", step), (closeDialog.value = true));
}
</script>
<style lang="scss" scoped>
.dialog {
  background-color: #fefcde;
}
</style>
