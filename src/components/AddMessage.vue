<template>
  <v-dialog v-model="isShowed" maxWidth="500px">
    <v-card class="pa-3">
      <v-card-title> メッセージを作成します </v-card-title>
      <v-form
        ref="messageForm"
        v-model="isValid"
        @submit.prevent="sendMessage()"
      >
        <v-card-text class="pb-0">
          <v-text-field
            variant="outlined"
            v-model="titleToSend"
            label="title"
            density="comfortable"
            :rules="[rules.required, rules.countTitle]"
            clearable
          ></v-text-field>
          <v-textarea
            rows="2"
            variant="outlined"
            v-model="commentToSend"
            label="comment"
            density="comfortable"
            :rules="[rules.required, rules.countComment]"
          ></v-textarea>
          <v-text-field
            variant="outlined"
            v-model="urlToSend"
            :label="urlType + ' url'"
            density="comfortable"
            :rules="[rules.required, rules.formatted]"
            clearable
          ></v-text-field>
        </v-card-text>
        <v-radio-group inline v-model="urlType">
          <v-radio value="YouTube"> </v-radio>
          <span class="mr-4 text-h4 mdi mdi-youtube align-center d-flex">
          </span>
          <v-radio value="Spotify"> </v-radio>
          <span class="mr-4 text-h4 mdi mdi-spotify align-center d-flex">
          </span>
        </v-radio-group>
        <v-card-actions class="justify-end pt-0 mt-0">
          <v-btn variant="plain" :ripple="false" @click="isShowed = false">
            CANCEL
          </v-btn>
          <v-btn
            icon="mdi-send"
            type="submit"
            variant="plain"
            color="blue"
            :ripple="false"
            :disabled="!isValid"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog v-model="pleaseLogin" maxWidth="250px">
    <remind-login-modal @close="pleaseLogin = false" />
  </v-dialog>
  <v-btn
    elevation="24"
    icon="mdi-plus"
    @click="toShowTheForm"
    :class="$style.addButton"
    :color="isVisitor ? 'grey' : 'black'"
    :ripple="false"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { useSnackBarStore } from "@/store/snackbar"
import { useLoginStatusStore } from "@/store/loginStatus"
import { useLoadingStatusStore } from "@/store/loadingstatus"
import { storeToRefs } from "pinia"
import RemindLoginModal from "@/components/RemindLoginModal.vue"
import type { UrlType } from "@/types/messages"

const { isVisitor } = storeToRefs(useLoginStatusStore())
const { isLoading } = storeToRefs(useLoadingStatusStore())
const { snackBar, snackText } = storeToRefs(useSnackBarStore())

const isValid = ref<boolean>(false)
const isShowed = ref<boolean>(false)
const pleaseLogin = ref<boolean>(false)
const urlType = ref<UrlType>("YouTube")
const urlToSend = ref<string>("")
const titleToSend = ref<string>("")
const commentToSend = ref<string>("")

const emit = defineEmits(["isSent"])

const toShowTheForm = () => {
  if (isVisitor.value) {
    pleaseLogin.value = true
  } else {
    isShowed.value = true
  }
}

watch(urlType, () => {
  urlToSend.value = ""
})

const sendMessage = async () => {
  isLoading.value = true
  const data = {
    title: titleToSend.value,
    comment: commentToSend.value,
    url: urlToSend.value,
    urlType: urlType.value,
  }
  const res = await fetch("/api/message/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  isLoading.value = false
  if (res.ok) {
    snackText.value = "メッセージを作成しました"
    snackBar.value = true
    emit("isSent")
    isShowed.value = false
    clear()
  } else {
    snackText.value = "メッセージを作成しました"
    snackBar.value = true
  }
}

const rules = {
  required: (value: string) => !!value || "入力内容が必要です",
  countTitle: (value: string) => value.length <= 20 || "文字数制限を超えます",
  countComment: (value: string) => value.length <= 50 || "文字数制限を超えます",
  formatted: (value: string) =>
    isFormatted(value, urlType.value) || "正しくないurl形式",
}

const clear = () => {
  titleToSend.value = ""
  commentToSend.value = ""
  urlToSend.value = ""
}

const isFormatted = (url: string, urlType: UrlType): boolean => {
  var re: RegExp
  if (urlType === "YouTube") {
    re = RegExp("^https://www.youtube.com/watch[?]v=.+")
  } else {
    re = RegExp("^https://open.spotify.com/.+")
  }
  return re.test(url)
}
</script>

<style lang="scss" module>
.addButton {
  position: fixed;
  left: 90%;
  top: 90%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10;
}
</style>
