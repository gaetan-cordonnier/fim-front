<template>
  <auth-container>
    <q-card-section>
      <div class="text-h6 text-center">
        {{ $t("text.accountCreated") }}
      </div>
      <div class="text-subtitle2 text-grey-6 q-pt-md">
        <p>
          Un e-mail vient de vous être envoyé à l'adresse saisie lors de
          l'inscription.
        </p>
        <p>Veuillez valider votre compte pour vous connecter.</p>
        <p>Une fois validé, vous pourrez modifier votre mot de passe.</p>
        <p>A bientot.</p>
      </div>
    </q-card-section>

    <q-card-section class="q-gutter-y-md">
      <validate-button
        class="full-width"
        :label="$t('component.connection')"
        color="secondary"
        to="/login"
      />
    </q-card-section>
  </auth-container>
</template>

<script setup>
import { ref, computed } from "vue";
import ValidateButton from "src/components/ValidateButton.vue";
import AuthContainer from "./containers/AuthContainer.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

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
