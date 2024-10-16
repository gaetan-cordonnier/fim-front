<template>
  <auth-container>
    <q-card-actions align="left" class="absolute-top"
      ><q-btn
        v-if="emailIsSaved()"
        dense
        round
        flat
        icon="arrow_back"
        @click="back()"
    /></q-card-actions>
    <q-card-section>
      <div class="text-h6 text-center">
        {{ $t("text.register") }}
      </div>
      <div v-if="emailIsSaved()" class="text-subtitle2 text-center text-grey-6">
        {{ $t("text.passwordRecommendation") }}
      </div>
      <div v-else class="text-subtitle2 text-center text-grey-6">
        {{ $t("text.registerEmail") }}
      </div>
      <div v-if="userExist" class="text-subtitle2 text-center text-negative">
        {{ $t("text.emailAlreadyExist") }}
      </div>
    </q-card-section>

    <q-form class="q-gutter-md" @submit="registerUser()" autocomplete>
      <q-card-section v-if="!emailIsSaved()" class="q-gutter-y-lg">
        <form-input
          type="text"
          v-model="firstName"
          :label="$t('component.firstName')"
          maxlength="35"
          autocomplete="firstName"
          lazy-rules
          :rules="[required, noSpace, textOnly, minCharacters(3)]"
          required
          counter
        />
        <form-input
          type="email"
          v-model="email"
          :label="$t('component.addressMail')"
          maxlength="150"
          autocomplete="email"
          lazy-rules
          :rules="[required, noSpace, emailCharacters]"
          counter
        />
      </q-card-section>

      <q-card-section v-if="emailIsSaved()" class="q-gutter-y-lg">
        <form-input
          type="password"
          v-model="password"
          :label="$t('component.password')"
          maxlength="150"
          lazy-rules
          :rules="[required, noSpace, minCharacters(8), passwordCharacters]"
          counter
        />
        <form-input
          type="password"
          v-model="passwordConfirmation"
          :label="$t('component.confirm')"
          lazy-rules
          :rules="[passwordCheck(password)]"
        />
      </q-card-section>

      <q-card-actions align="between" class="q-px-md">
        <link-button :label="$t('text.signIn')" to="/login" />
        <validate-button
          v-if="!emailIsSaved()"
          :label="$t('component.next')"
          color="secondary"
          @Click="next()"
          :loading="loading"
          :disable="!(emailRulesOk && firstNameRulesOk)"
        />
        <validate-button
          v-else
          :label="$t('component.next')"
          type="submit"
          color="secondary"
          :disabled="!passwordRulesOk"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </auth-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import ValidateButton from "src/components/ValidateButton.vue";
import LinkButton from "src/components/LinkButton.vue";
import AuthContainer from "./containers/AuthContainer.vue";
import { getEmailExist, createUser } from "src/api/auth";
import FormInput from "src/components/FormInput.vue";
import {
  required,
  textOnly,
  minCharacters,
  emailCharacters,
  noSpace,
  passwordCharacters,
  passwordCheck,
} from "src/utils/rules";
import { errorMessage } from "src/utils/notify";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const firstName = ref("");
const email = ref("");
const password = ref(null);
const passwordConfirmation = ref(null);
const firstNameRulesOk = ref(false);
const emailRulesOk = ref(false);
const passwordRulesOk = ref(false);
const emailSaved = ref(false);
const userExist = ref(false);
const userIsLogged = ref(false);
const loading = ref(false);

const emailIsSaved = computed(() => {
  return () => emailSaved.value;
});

const isLogged = computed(() => {
  return () => userIsLogged.value;
});

watch(
  [firstName, email, password, passwordConfirmation],
  (newValues, oldValues) => {
    const [newFirstName, newEmail, newPassword, newPasswordConfirmation] =
      newValues;
    const [oldFirstName, oldEmail, oldPassword, oldPasswordConfirmation] =
      oldValues;

    if (newFirstName !== oldFirstName) {
      if (newFirstName) {
        checkFirstNameRules();
      }
    }

    if (newEmail !== oldEmail) {
      if (userExist.value) userExist.value = false;
      if (newEmail) {
        email.value = newEmail.toLocaleLowerCase();
        checkEmailRules();
      }
    }

    if (
      newPassword !== oldPassword ||
      newPasswordConfirmation !== oldPasswordConfirmation
    ) {
      if (newPassword || newPasswordConfirmation) {
        checkPasswordRules();
      }
    }
  }
);

function checkFirstNameRules() {
  if (firstName.value) {
    required(firstName.value) == true &&
    minCharacters(3)(firstName.value) == true &&
    textOnly(firstName.value) == true &&
    noSpace(firstName.value) == true
      ? (firstNameRulesOk.value = true)
      : (firstNameRulesOk.value = false);
  }
}

function checkEmailRules() {
  if (email.value) {
    required(email.value) == true &&
    emailCharacters(email.value) == true &&
    noSpace(email.value) == true
      ? (emailRulesOk.value = true)
      : (emailRulesOk.value = false);
  }
}

function checkPasswordRules() {
  if (password.value || passwordConfirmation.value) {
    console.log("here");
    required(password.value) == true &&
    noSpace(password.value) == true &&
    minCharacters(8)(password.value) == true &&
    (password.value === passwordConfirmation.value) == true
      ? (passwordRulesOk.value = true)
      : (passwordRulesOk.value = false);
  }
}

function next() {
  if (firstNameRulesOk.value == true && emailRulesOk.value == true) {
    loading.value = true;
    getEmailExist(email.value)
      .then((resolve) => {
        if (resolve.emailExist) {
          userExist.value = true;
        } else {
          emailSaved.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
        errorMessage(t("error.checkUserError"));
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

function back() {
  emailSaved.value = false;
}

function registerUser() {
  if (passwordRulesOk.value == true) {
    loading.value = true;
    createUser(firstName.value, email.value, password.value)
      .then((resolve) => {
        router.push({ path: "/registered" });
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
