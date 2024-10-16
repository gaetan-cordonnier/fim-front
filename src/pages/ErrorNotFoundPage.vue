<template>
  <div
    class="fullscreen bg-secondary text-dark text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ $t("text.pageNotFound") }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        :label="$t('component.returnHome')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup></script>
