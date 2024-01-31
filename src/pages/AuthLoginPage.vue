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
        {{ $t("text.connection") }}
      </div>
      <div v-if="isChecked()" class="text-subtitle2 text-center text-grey-6">
        {{ email }}
      </div>
      <div
        v-if="!isChecked() && userNotFound"
        class="text-subtitle2 text-center text-negative"
      >
        {{ $t("text.incorrectEmail") }}
      </div>
    </q-card-section>

    <q-form class="q-gutter-md" @submit="loginUser()" autocomplete>
      <q-card-section class="q-gutter-y-md">
        <form-input
          v-if="!isChecked()"
          type="email"
          v-model="email"
          :label="$t('component.addressMail')"
          maxlength="150"
          autocomplete="email"
          lazy-rules
          :rules="[required, noSpace, emailCharacters]"
        />
        <form-input
          v-else
          type="password"
          v-model="password"
          :label="$t('component.enterPassword')"
          lazy-rules
          :rules="[required, noSpace, minCharacters(8)]"
        />
      </q-card-section>

      <q-card-actions align="between" class="q-px-md">
        <link-button
          v-if="!isChecked()"
          :label="$t('component.register')"
          to="/register"
        />
        <link-button
          v-else
          :label="$t('component.forgotPassword')"
          to="/forgot-password"
        />
        <validate-button
          v-if="!isChecked()"
          :label="$t('component.next')"
          color="secondary"
          @Click="next()"
          :loading="loading"
          :disable="!emailRulesOk"
        />
        <validate-button
          v-else
          :label="$t('component.connection')"
          type="submit"
          color="secondary"
          :disabled="!password"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </auth-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { resetToken } from "src/boot/axios";
import ValidateButton from "src/components/ValidateButton.vue";
import LinkButton from "src/components/LinkButton.vue";
import AuthContainer from "./containers/AuthContainer.vue";
import { getEmailExist, login } from "src/api/auth";
import FormInput from "src/components/FormInput.vue";
import {
  required,
  emailCharacters,
  noSpace,
  minCharacters,
} from "src/utils/rules";
import { errorMessage } from "src/utils/notify";
import { useI18n } from "vue-i18n";
import { route } from "quasar/wrappers";

const router = useRouter();
const { t } = useI18n();
const email = ref("");
const password = ref(null);
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

watch(email, (value) => {
  if (value) {
    email.value = value.toLowerCase();
    required(email.value) == true &&
    emailCharacters(email.value) == true &&
    noSpace(email.value) == true
      ? (emailRulesOk.value = true)
      : (emailRulesOk.value = false);
  }
});

function next() {
  if (emailRulesOk.value == true) {
    loading.value = true;
    getEmailExist(email.value)
      .then((resolve) => {
        if (resolve.emailExist) {
          userIsChecked.value = true;
        } else userNotFound.value = true;
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
  userNotFound.value = false;
  userIsChecked.value = false;
}

function loginUser() {
  if (email.value && password.value) {
    loading.value = true;
    login(email.value, password.value)
      .then((resolve) => {
        if (resolve) {
          localStorage.setItem("token", resolve.token);
          userIsLogged.value = true;
          resetToken();
          router.push({ path: "/" });
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
