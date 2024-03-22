<template>
  <v-slide-group show-arrows>
    <v-slide-group-item v-for="label in labels" :key="label.labelId">
      <message-label
        :labelId="label.labelId"
        :messageId="label.messageId"
        :content="label.content"
        :creatorName="label.creatorName"
        :jumpTime="label.jumpTime"
        :labelColor="label.labelColor"
        @toReRender="toReRender()"
        @toSeek="(jumpTime) => toSeek(jumpTime)"
      />
    </v-slide-group-item>
    <v-card
      class="mx-3 mb-4"
      color="grey-lighten-1"
      height="100"
      width="150"
      @click="checkIfLogin()"
    >
      <div class="d-flex fill-height align-center justify-center">
        <v-icon icon="mdi-plus-circle-outline" color="white" size="48" />
      </div>
    </v-card>
  </v-slide-group>
  <v-dialog v-model="dialogIsShowed" maxWidth="500px">
    <add-label
      @toReRender="toReRender()"
      @cancel="dialogIsShowed = false"
      :messageId="props.messageId"
    />
  </v-dialog>
  <v-dialog v-model="pleaseLogin" maxWidth="250px">
    <remind-login-modal @close="pleaseLogin = false" />
  </v-dialog>
</template>

<script lang="ts" setup>
import MessageLabel from "@/components/MessageLabel.vue";
import AddLabel from "@/components/AddLabel.vue";
import RemindLoginModal from "@/components/RemindLoginModal.vue";
import { useLoadingStatusStore } from "@/store/loadingstatus";
import { useLoginStatusStore } from "@/store/loginStatus";
import { ref, onMounted } from "vue";
import type { Label } from "@/types/messages";
import { storeToRefs } from "pinia";

const { isVisitor } = storeToRefs(useLoginStatusStore());
const { isLoading } = storeToRefs(useLoadingStatusStore());

const props = defineProps<{
  messageId: string;
}>();

const labels = ref<Label[]>();
const dialogIsShowed = ref<boolean>(false);
const pleaseLogin = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  const res = await fetch(`/api/label/get/${props.messageId}`);
  isLoading.value = false;
  if (res.ok) {
    labels.value = await res.json();
  }
});

const emit = defineEmits(["toReRender", "toSeek"]);
const toReRender = () => emit("toReRender");
const toSeek = (jumpTime: number) => emit("toSeek", jumpTime);

const checkIfLogin = () => {
  if (isVisitor.value) {
    pleaseLogin.value = true;
  } else {
    dialogIsShowed.value = true;
  }
};
</script>
