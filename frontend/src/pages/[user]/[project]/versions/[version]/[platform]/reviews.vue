<script lang="ts" setup>
import { useHead } from "@vueuse/head";
import { useSeo } from "~/composables/useSeo";
import { useRoute } from "vue-router";
import { Platform, ReviewAction, ReviewState } from "~/types/enums";
import { HangarProject, HangarReview, HangarReviewMessage, HangarVersion, IPlatform } from "hangar-internal";
import { projectIconUrl } from "~/composables/useUrlHelper";
import Button from "~/lib/components/design/Button.vue";
import { useI18n } from "vue-i18n";
import InputCheckbox from "~/lib/components/ui/InputCheckbox.vue";
import InputTextarea from "~/lib/components/ui/InputTextarea.vue";
import Alert from "~/lib/components/design/Alert.vue";
import { computed, reactive, ref } from "vue";
import { useInternalApi } from "~/composables/useApi";
import { useAuthStore } from "~/store/auth";
import { prettyDateTime, prettyDate } from "~/lib/composables/useDate";
import { useBackendDataStore } from "~/store/backendData";
import { handleRequestError } from "~/composables/useErrorHandling";
import { useContext } from "vite-ssr/vue";
import { required } from "~/lib/composables/useValidationHelpers";
import { useVuelidate } from "@vuelidate/core";
import Tag from "~/components/Tag.vue";
import Accordeon from "~/lib/components/design/Accordeon.vue";
import TextAreaModal from "~/components/modals/TextAreaModal.vue";

const route = useRoute();
const authStore = useAuthStore();
const backendDataStore = useBackendDataStore();
const i18n = useI18n();
const t = i18n.t;
const ctx = useContext();
const v = useVuelidate();

const props = defineProps<{
  versions: Map<Platform, HangarVersion>;
  project: HangarProject;
  versionPlatforms: Set<Platform>;
}>();

const reviews = ref<HangarReview[]>([]);
const hideClosed = ref<boolean>(false);
const message = ref<string>("");
const loadingValues = reactive({
  start: false,
  send: false,
  reopen: false,
  approve: false,
  approvePartial: false,
  undoApproval: false,
});

const currentUser = computed(() => authStore.user!);

const currentUserReview = computed<HangarReview | undefined>(() => {
  if (!currentUser.value) return;
  return reviews.value.find((r) => r.userId === currentUser.value.id);
});

const isCurrentReviewOpen = computed<boolean>(() => {
  return !currentUserReview.value?.endedAt;
});

const currentReviewLastAction = computed<ReviewAction>(() => {
  const lastMsg: HangarReviewMessage = currentUserReview.value!.messages[currentUserReview.value!.messages.length - 1];
  return lastMsg.action;
});

const filteredReviews = computed<HangarReview[]>(() => {
  if (hideClosed.value) {
    return reviews.value.filter((r) => !r.endedAt);
  }
  return reviews.value;
});

const platformEnum = computed<Platform>(() => ((route.params.platform as string) || "").toUpperCase() as Platform);

const projectVersion = computed<HangarVersion>(() => {
  return props.versions.get(platformEnum.value)!;
});

const platform = computed<IPlatform | undefined>(() => {
  return backendDataStore.platforms?.get(platformEnum.value);
});

const isReviewStateChecked = computed<boolean>(() => {
  return projectVersion.value.reviewState === ReviewState.PARTIALLY_REVIEWED || projectVersion.value.reviewState === ReviewState.REVIEWED;
});

if (projectVersion.value) {
  reviews.value = await useInternalApi<HangarReview[]>(`reviews/${projectVersion.value.id}/reviews`);
}

async function refresh() {
  reviews.value = await useInternalApi<HangarReview[]>(`reviews/${projectVersion.value.id}/reviews`);
}

function getReviewStateString(review: HangarReview): string {
  if (!review.messages) return "error";
  const lastMsg = review.messages.at(-1);
  switch (lastMsg!.action) {
    case ReviewAction.START:
    case ReviewAction.MESSAGE:
    case ReviewAction.REOPEN:
    case ReviewAction.UNDO_APPROVAL:
      return "ongoing";
    case ReviewAction.STOP:
      return "stopped";
    case ReviewAction.APPROVE:
      return "approved";
    case ReviewAction.PARTIALLY_APPROVE:
      return "partiallyApproved";
  }
}

function getReviewStateColor(review: HangarReview): string {
  if (!review.messages) return "#D50000";
  const lastMsg = review.messages.at(-1);
  switch (lastMsg!.action) {
    case ReviewAction.START:
    case ReviewAction.MESSAGE:
    case ReviewAction.REOPEN:
    case ReviewAction.UNDO_APPROVAL:
      return "#ffc801";
    case ReviewAction.STOP:
      return "#D50000";
    case ReviewAction.APPROVE:
      return "#69F0AE";
    case ReviewAction.PARTIALLY_APPROVE:
      return "#4CAF50";
  }
}

function getReviewMessageColor(msg: HangarReviewMessage): string {
  switch (msg.action) {
    case ReviewAction.START:
    case ReviewAction.REOPEN:
      return "#ffc801";
    case ReviewAction.MESSAGE:
      return "";
    case ReviewAction.STOP:
      return "#FF5252";
    case ReviewAction.APPROVE:
    case ReviewAction.PARTIALLY_APPROVE:
      return "#69F0AE";
    case ReviewAction.UNDO_APPROVAL:
      return "#ff9100";
  }
}

function getLastUpdateDate(review: HangarReview): string {
  if (!review.messages) return "error";
  const lastMsg = review.messages.at(-1);
  return prettyDateTime(lastMsg!.createdAt);
}

function startReview() {
  const args = {
    name: currentUser.value.name,
  };
  loadingValues.start = true;
  sendReviewRequest(
    "start",
    { name: currentUser.value.name },
    ReviewAction.START,
    () => {
      reviews.value.push({
        userName: currentUser.value.name,
        userId: currentUser.value.id,
        createdAt: new Date().toISOString(),
        endedAt: null,
        messages: [
          {
            message: "reviews.presets.start",
            args,
            action: ReviewAction.START,
            createdAt: new Date().toISOString(),
          },
        ],
      });
    },
    () => {
      loadingValues.start = false;
    }
  );
}

function sendMessage() {
  if (!isCurrentReviewOpen.value) return;
  loadingValues.send = true;
  sendReviewRequest(
    "message",
    { msg: message.value },
    ReviewAction.MESSAGE,
    () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        v.value.$reset();
      }
      message.value = "";
    },
    () => {
      loadingValues.send = false;
    }
  );
}

function stopReview(userMsg: string) {
  if (!isCurrentReviewOpen.value || currentUserReview.value) return;
  const args = {
    name: currentUserReview.value!.userName,
    msg: userMsg,
  };
  return sendReviewRequest("stop", args, ReviewAction.STOP, () => {
    currentUserReview.value!.endedAt = new Date().toISOString();
  });
}

function reopenReview() {
  if (isCurrentReviewOpen.value) return;
  loadingValues.reopen = true;
  sendReviewRequest(
    "reopen",
    { name: currentUserReview.value!.userName },
    ReviewAction.REOPEN,
    () => {
      currentUserReview.value!.endedAt = null;
    },
    () => {
      loadingValues.reopen = false;
    }
  );
}

function approve() {
  if (!isCurrentReviewOpen.value) return;
  loadingValues.approve = true;
  sendReviewRequest(
    "approve",
    { name: currentUserReview.value!.userName },
    ReviewAction.APPROVE,
    () => (currentUserReview.value!.endedAt = new Date().toISOString()),
    () => (loadingValues.approve = false)
  );
}

function approvePartial() {
  if (!isCurrentReviewOpen.value) return;
  loadingValues.approvePartial = true;
  sendReviewRequest(
    "approvePartial",
    { name: currentUserReview.value!.userName },
    ReviewAction.PARTIALLY_APPROVE,
    () => (currentUserReview.value!.endedAt = new Date().toISOString()),
    () => (loadingValues.approvePartial = false)
  );
}

function undoApproval() {
  if (isCurrentReviewOpen.value) return;
  loadingValues.undoApproval = true;
  sendReviewRequest(
    "undoApproval",
    { name: currentUser.value.name },
    ReviewAction.UNDO_APPROVAL,
    () => (reviews.value.find((r) => r.userId === currentUser.value.id)!.endedAt = null),
    () => (loadingValues.undoApproval = false)
  );
}

function sendReviewRequest(
  urlPath: string,
  args: Record<string, string>,
  action: ReviewAction,
  then: () => void,
  final: () => void = () => {
    /* empty */
  }
): Promise<void> {
  const msg = `reviews.presets.${urlPath}`;
  return useInternalApi(`reviews/${projectVersion.value.id}/reviews/${urlPath}`, true, "post", { message: msg, args })
    .then(() => {
      if (currentUserReview.value) {
        currentUserReview.value.messages.push({
          action,
          createdAt: new Date().toISOString(),
          message: msg,
          args,
        });
      }
      then();
      refresh();
    })
    .catch((e) => handleRequestError(e, ctx, i18n))
    .finally(final);
}

useHead(
  useSeo("Reviews | " + props.project.name, props.project.description, route, projectIconUrl(props.project.namespace.owner, props.project.namespace.slug))
);
</script>

<template>
  <div v-if="projectVersion" class="mt-4">
    <div class="float-left">
      {{ t("reviews.headline", [projectVersion.author, prettyDate(projectVersion.createdAt)]) }}
    </div>
    <div class="float-right">
      <template v-if="!isReviewStateChecked">
        <Button size="small" :to="{ name: 'user-project', params: route.params }" exact>
          <IconMdiHome />
          {{ t("reviews.projectPage") }}
        </Button>
        <Button size="small" :to="'/' + route.params.user + '/' + route.params.project + '/versions/' + route.params.version + '/jar'" class="ml-4">
          <IconMdiDownload />
          {{ t("reviews.downloadFile") }}
        </Button>
      </template>
    </div>
    <div style="clear: both" class="mb-4" />
    <hr />

    <h2 class="my-3 text-2xl">
      {{ t("reviews.title") }}
    </h2>
    <div class="my-1 flex">
      <div class="flex-grow-0">
        <Button button-type="primary" @click="refresh">
          <IconMdiRefresh />
          {{ t("general.refresh") }}
        </Button>
      </div>
      <div v-if="!currentUserReview" class="flex-grow-0 ml-2">
        <Button color="success" :loading="loadingValues.start" @click="startReview">
          <IconMdiPlay />
          {{ t("reviews.startReview") }}
        </Button>
      </div>
      <div class="flex items-center ml-2">
        <InputCheckbox v-model="hideClosed" :label="t('reviews.hideClosed')" />
      </div>
    </div>

    <Accordeon :values="filteredReviews" class="mt-4">
      <template #header="{ entry: review }">
        <div class="flex">
          <div class="flex-grow">
            {{ t("reviews.presets.reviewTitle", { name: review.userName }) }}
            <Tag :name="t(`reviews.state.${getReviewStateString(review)}`)" :color="{ background: getReviewStateColor(review) }" />
            <span class="text-xs ml-4 text-gray-400">
              {{ t("reviews.state.lastUpdate", [getLastUpdateDate(review)]) }}
            </span>
          </div>
          <div v-if="isCurrentReviewOpen && currentUserReview === review">
            <TextAreaModal :title="t('reviews.stopReview')" :label="t('general.message')" :submit="stopReview">
              <template #activator="slotProps">
                <Button size="small" color="error" v-bind="slotProps.attrs" v-on="slotProps.on">
                  <IconMdiStop />
                  {{ t("reviews.stopReview") }}
                </Button>
              </template>
            </TextAreaModal>

            <Button size="small" class="ml-2" :loading="loadingValues.approvePartial" @click="approvePartial">
              <IconMdiCheckDecagramOutline />
              {{ t("reviews.approvePartial") }}
            </Button>
            <Button size="small" class="ml-2" :loading="loadingValues.approve" @click="approve">
              <IconMdiCheckDecagram />
              {{ t("reviews.approve") }}
            </Button>
          </div>
          <div v-else-if="currentUserReview === review" class="text-right">
            <Button v-if="currentReviewLastAction === 'STOP'" size="small" button-type="secondary" :loading="loadingValues.reopen" @click="reopenReview">
              <IconMdiRefresh />
              {{ t("reviews.reopenReview") }}
            </Button>
            <Button
              v-else-if="currentReviewLastAction === 'APPROVE' || currentReviewLastAction === 'PARTIALLY_APPROVE'"
              size="small"
              color="error"
              :loading="loadingValues.undoApproval"
              @click="undoApproval"
            >
              <IconMdiUndo />
              {{ t("reviews.undoApproval") }}
            </Button>
          </div>
        </div>
      </template>
      <template #entry="{ entry: review, index }">
        <ul>
          <li v-for="(msg, mIndex) in review.messages" :key="`review-${index}-msg-${mIndex}`">
            <div :style="'color: ' + getReviewMessageColor(msg)" :class="{ 'ml-4': msg.action === ReviewAction.MESSAGE }">
              <span>{{ t(msg.message, msg.args) }}</span>
              <span class="text-xs ml-4 text-gray-400"> {{ prettyDateTime(msg.createdAt) }}</span>
            </div>
          </li>
          <li v-if="isCurrentReviewOpen && currentUserReview === review">
            <div class="w-full">
              <InputTextarea
                v-model.trim="message"
                class="mt-2"
                :label="t('reviews.reviewMessage')"
                :rows="3"
                :rules="[required(t('general.message'))]"
                @keydown.enter.prevent=""
              />
              <Button color="primary" :loading="loadingValues.send" class="mt-2 block w-full" :disabled="v.$invalid" @click="sendMessage">
                <IconMdiSend />
                {{ t("general.send") }}
              </Button>
            </div>
          </li>
        </ul>
      </template>
    </Accordeon>

    <Alert v-if="!reviews.length" type="info" class="mt-2">
      {{ t("reviews.notUnderReview") }}
    </Alert>
  </div>
</template>

<route lang="yaml">
meta:
  requireGlobalPerm: ["REVIEWER"]
</route>
