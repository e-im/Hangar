<script setup lang="ts">
import { useSettingsStore } from "~/store/settings";
import { useHead } from "@vueuse/head";
import { settingsLog } from "~/lib/composables/useLog";
import { useAuthStore } from "~/store/auth";

// eslint-disable-next-line import/no-unresolved
import "virtual:windi-devtools";

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
settingsStore.loadSettingsClient();
settingsLog("render for user", authStore.user?.name, "with darkmode", settingsStore.darkMode);
useHead({
  htmlAttrs: {
    class: settingsStore.darkMode ? "dark" : "light",
  },
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
      <template #fallback> Loading... </template>
    </Suspense>
  </router-view>
</template>
