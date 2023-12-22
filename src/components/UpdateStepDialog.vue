<template>
  <q-dialog persistent @hide="resetDialog()">
    <q-card class="dialog full-width">
      <q-card-section class="row justify-between">
        <div class="text-h6 text-primary">
          {{ stepIndex + 1 }}{{ stepIndex + 1 == 1 ? "ère" : "ème" }} étape
        </div>
        <q-icon
          name="delete"
          size="md"
          color="grey-7"
          @click="deleteStep()"
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="step"
          autogrow
          :rules="[(val) => !!val || 'Ce champ est obligatoire']"
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
          label="Modifier"
          @click="updateStep(step)"
          v-close-popup="closeDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({ stepSelected: Object, stepIndex: Number });

const emits = defineEmits(["update-step", "delete-step"]);

const step = ref("");
const stepId = ref(1);
const closeDialog = ref(false);

watch(props.stepSelected, (val) => {
  if (val) {
    step.value = val.description;
    stepId.value = val.id;
  }
});

function resetDialog() {
  closeDialog.value = false;
}

function updateStep(step) {
  step.length === 0
    ? false
    : (emits("update-step", {
        id: stepId.value,
        description: step,
      }),
      (closeDialog.value = true));
}

function deleteStep() {
  emits("delete-step");
}
</script>
<style lang="scss" scoped>
.dialog {
  background-color: #fefcde;
}
</style>
