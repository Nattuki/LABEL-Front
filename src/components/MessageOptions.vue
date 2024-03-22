<template>
  <v-btn variant="plain" :ripple="false">
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu
      activator="parent"
      transition="scroll-y-transition"
      location="bottom"
    >
      <v-btn
        variant="flat"
        elevation="0"
        :ripple="false"
        @click="checkIfLogin()"
        height="30"
      >
        ラベルを作成
      </v-btn>
      <v-btn
        elevation="0"
        variant="flat"
        :ripple="false"
        height="30"
        @click="copyToClipBoard()"
      >
        リンクをコピー
      </v-btn>
      <v-btn
        v-if="ableToDelete"
        variant="flat"
        elevation="0"
        :ripple="false"
        @click="confirmDialog = true"
        height="30"
      >
        削除
      </v-btn>
    </v-menu>
    <v-dialog v-model="confirmDialog" maxWidth="300px">
      <confirm-modal
        @confirm="toDelete()"
        @cancel="confirmDialog = false"
        :text="'このメッセージを削除しますか'"
      />
    </v-dialog>
    <v-dialog v-model="addLabelDialog" maxWidth="500px">
      <add-label
        @toReRender="toReRender()"
        @cancel="addLabelDialog = false"
        :messageId="props.messageId"
      />
    </v-dialog>
    <v-dialog v-model="pleaseLogin" maxWidth="250px">
      <remind-login-modal @close="pleaseLogin = false" />
    </v-dialog>
  </v-btn>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRenderKeyStore } from "@/store/renderKey";
import { storeToRefs } from "pinia";
import AddLabel from "@/components/AddLabel.vue";
import { useLoginStatusStore } from "@/store/loginStatus";
import { useSnackBarStore } from "@/store/snackbar";
import ConfirmModal from "@/components/ConfirmModal.vue";

const props = withDefaults(
  defineProps<{
    creatorName: string;
    messageId: string;
    disabledOption?: boolean;
  }>(),
  {
    disabledOption: false,
  },
);

const emit = defineEmits(["toReRender"]);

const { viewRenderKey } = storeToRefs(useRenderKeyStore());
const { myName, isVisitor } = storeToRefs(useLoginStatusStore());
const { snackBar, snackText } = storeToRefs(useSnackBarStore());

const addLabelDialog = ref<boolean>(false);
const confirmDialog = ref<boolean>(false);
const ableToDelete = computed(
  () => myName.value === props.creatorName && !props.disabledOption,
);
const pleaseLogin = ref<boolean>(false);

const toDelete = async () => {
  const res = await fetch(`/api/message/${props.messageId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    snackText.value = "メッセージを削除しました";
    snackBar.value = true;
    viewRenderKey.value++;
  } else {
    snackText.value = "メッセージの削除は失敗しました";
    snackBar.value = true;
  }
};

const toReRender = () => {
  emit("toReRender");
  addLabelDialog.value = false;
};

const copyToClipBoard = async () => {
  const text: string = `https://label.trap.show/api/message/share/${props.messageId}`;
  await navigator.clipboard.writeText(text);
  snackText.value = "リンクはコピーしました";
  snackBar.value = true;
};

const checkIfLogin = () => {
  if (isVisitor.value) {
    pleaseLogin.value = true;
  } else {
    addLabelDialog.value = true;
  }
};
</script>
