<template>
  <auth-container>
    <q-card-actions align="left" class="absolute-top"
      ><q-btn
        v-if="isChecked()"
        dense
        round
        flat
        icon="arrow_back"
        @click="back()"
    /></q-card-actions>
    <q-card-section>
      <div class="text-h6 text-center">
        {{ $t("text.accountRecovery") }}
      </div>
      <div v-if="isChecked()" class="text-subtitle2 text-center text-grey-6">
        Un email contennat le code d'identification vient d'être envoyé à
        l'adresse
        {{ email }}.
      </div>
      <div
        v-if="!isChecked() && userNotFound"
        class="text-subtitle2 text-center text-negative"
      >
        {{ $t("text.incorrectEmail") }}
      </div>
    </q-card-section>

    <q-form class="q-gutter-md" @submit="checkCode()" autocomplete>
      <q-card-section class="q-gutter-y-md" align="center">
        <form-input
          v-if="!isChecked()"
          type="email"
          v-model="email"
          label="Adresse e-mail"
          maxlength="150"
          autocomplete="email"
          lazy-rules
          :rules="[required, noSpace, emailCharacters]"
          counter
        />
        <code-input v-else :digit-count="4" @update:otp="code = $event" />
      </q-card-section>

      <q-card-actions align="between" class="q-px-md">
        <link-button
          v-if="!isChecked()"
          :label="$t('text.signIn')"
          to="/login"
        />
        <link-button v-else label="Renvoyer le code" @click="back()" />
        <validate-button
          v-if="!isChecked()"
          label="Suivant"
          color="secondary"
          @Click="next()"
          :loading="loading"
          :disable="!emailRulesOk"
        />
        <validate-button
          v-else
          label="Connexion"
          type="submit"
          color="secondary"
          :disabled="!codeIsOk()"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </auth-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import ValidateButton from "src/components/ValidateButton.vue";
import LinkButton from "src/components/LinkButton.vue";
import AuthContainer from "./containers/AuthContainer.vue";
import { forgotPassword, getEmailExist, login } from "src/api/auth";
import FormInput from "src/components/FormInput.vue";
import CodeInput from "src/components/CodeInput.vue";
import { required, emailCharacters, noSpace } from "src/utils/rules";
import { errorMessage } from "src/utils/notify";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const email = ref("");
const code = ref("");
const emailRulesOk = ref(false);
const userIsChecked = ref(false);
const userIsLogged = ref(false);
const loading = ref(false);
const userNotFound = ref(false);

const isChecked = computed(() => {
  return () => userIsChecked.value;
});

const isLogged = computed(() => {
  return () => userIsLogged.value;
});

const codeIsOk = computed(() => {
  return () => (code.value.length === 4 ? true : false);
});

watch(email, (newValue) => {
  if (newValue) {
    email.value = newValue.toLowerCase();
    required(email.value) == true &&
    emailCharacters(email.value) == true &&
    noSpace(email.value) == true
      ? (emailRulesOk.value = true)
      : (emailRulesOk.value = false);
  }
});

watch(code, (newValue, oldValue) => {
  console.log("code:", oldValue, "à", newValue);
});

function next() {
  if (emailRulesOk.value == true) {
    loading.value = true;
    getEmailExist(email.value)
      .then((resolve) => {
        if (resolve.emailExist == true) {
          forgotPassword(email.value)
            .then(() => {
              userIsChecked.value = true;
            })
            .catch((error) => {
              errorMessage(t("error.sendingVerificationError"));
            })
            .finally(() => {
              loading.value = false;
            });
        } else userNotFound.value = true;
      })
      .catch((error) => {
        console.log(error);
        errorMessage(t("error.checkUserError"));
      })
      .finally(() => {});
  }
}

function back() {
  userNotFound.value = false;
  userIsChecked.value = false;
}

function checkCode() {
  if (code.value) {
    loading.value = true;
    login(email.value, password.value)
      .then((resolve) => {
        if (resolve) {
          userIsLogged.value = true;
        } else errorMessage(t("error.loginError"));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
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
