<script lang="ts" setup>
import Button from "~/lib/components/design/Button.vue";
import { useI18n } from "vue-i18n";
import { HangarProject, HangarVersion, PinnedVersion } from "hangar-internal";
import { computed, ref } from "vue";
import { Platform } from "~/types/enums";
import DropdownButton from "~/lib/components/design/DropdownButton.vue";
import { useBackendDataStore } from "~/store/backendData";
import DropdownItem from "~/lib/components/design/DropdownItem.vue";
import PlatformLogo from "~/components/logos/PlatformLogo.vue";

const i18n = useI18n();
const backendData = useBackendDataStore();

interface DownloadableVersion {
  name: string;
  externalUrl: string | null;
}

const props = withDefaults(
  defineProps<{
    project: HangarProject;
    small?: boolean;
    // Define either version and platform or pinnedVersion, or neither to use main channel versions
    platform?: Platform;
    version?: DownloadableVersion;
    pinnedVersion?: PinnedVersion;
  }>(),
  {
    small: false,
  }
);

function downloadLink(platform: Platform, version: DownloadableVersion) {
  if (version && version.externalUrl) {
    return version.externalUrl;
  }

  const versionString = version.name;
  const path = `/api/v1/projects/${props.project.namespace.owner}/${props.project.namespace.slug}/versions/${versionString}/${platform.toLowerCase()}/download`;
  return import.meta.env.SSR ? path : `${window.location.protocol}//${window.location.host}${path}`;
}

const external = computed(() => false);
</script>

<template>
  <div class="flex items-center">
    <DropdownButton v-if="pinnedVersion" :button-size="small ? 'medium' : 'large'">
      <template #button-label>
        <span class="items-center inline-flex">
          <IconMdiDownloadOutline />
          <span v-if="!small" class="ml-1">{{ external ? i18n.t("version.page.downloadExternal") : i18n.t("version.page.download") }}</span>
        </span>
      </template>
      <DropdownItem
        v-for="platform in pinnedVersion.platforms"
        :key="platform"
        class="flex items-center"
        :href="downloadLink(platform, pinnedVersion)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlatformLogo :platform="platform" :size="24" class="mr-1" />
        {{ backendData.platforms?.get(platform).name }}
      </DropdownItem>
    </DropdownButton>

    <a v-else-if="platform && version" :href="downloadLink(platform, version)" target="_blank" rel="noopener noreferrer">
      <Button :size="small ? 'medium' : 'large'">
        <IconMdiDownloadOutline />
        <span v-if="!small" class="ml-1">{{ external ? i18n.t("version.page.downloadExternal") : i18n.t("version.page.download") }}</span>
      </Button>
    </a>

    <DropdownButton v-else :button-size="small ? 'medium' : 'large'">
      <template #button-label>
        <span class="items-center inline-flex">
          <IconMdiDownloadOutline />
          <span v-if="!small" class="ml-1">{{ i18n.t("version.page.download") }}</span>
        </span>
      </template>
      <DropdownItem
        v-for="(v, p) in project.mainChannelVersions"
        :key="p"
        class="flex items-center"
        :href="downloadLink(p, v)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlatformLogo :platform="p" :size="24" class="mr-1" />
        {{ backendData.platforms?.get(p).name }}
      </DropdownItem>
    </DropdownButton>
  </div>
</template>
