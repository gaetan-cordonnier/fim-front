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

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NewStepDialog",

  props: ["stepSelected", "stepIndex"],

  emits: ["update-step", "delete-step"],

  setup() {
    return {
      step: ref(""),
      stepId: ref(1),
      errorMessage: ref("Vous devez remplir ce champ"),
      closeDialog: ref(false),
    };
  },

  methods: {
    resetDialog() {
      this.closeDialog = false;
    },
    updateStep(step) {
      step.length === 0
        ? false
        : (this.$emit("update-step", {
            id: this.stepId,
            description: step,
          }),
          (this.closeDialog = true));
    },
    deleteStep() {
      this.$emit("delete-step");
    },
  },

  watch: {
    stepSelected(val) {
      this.step = val.description;
      this.stepId = val.id;
    },
  },
});
</script>
<style lang="scss" scoped>
.dialog {
  background-color: #fefcde;
}
</style>
