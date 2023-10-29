<script>
import BaseButton from "../components/BaseButton.vue";
import BaseHeader from "../components/BaseHeader.vue";
import BaseLoader from "../components/BaseLoader.vue";
import { getUserProfileById } from "../services/user";
import {
  sendPrivateChatMessage,
  subscribeToPrivateChat,
} from "../services/private-chat-list.js";
import { subscribeToAuth } from "../services/auth";

export default {
  name: "PrivateChat",
  components: { BaseHeader, BaseLoader, BaseButton },
  data() {
    return {
      authUser: {
        id: null,
        email: null,
      },
      authUnsubscribe: () => {},
      user: {
        id: null,
        email: null,
      },
      loadingUser: true,
      newMessage: {
        message: "",
      },
      sendingMessage: false,
      loadingMessages: true,
      messages: [],
      messagesUnsubscribe: () => {},
    };
  },
  methods: {
    handleSubmit() {
      sendPrivateChatMessage(this.authUser.id, this.user.id, {
        user: this.authUser.email,
        message: this.newMessage.message,
      });
      this.newMessage.message = "";
    },
  },
  async mounted() {
    this.loadingMessages = true;
    this.loadingUser = true;
    this.user = await getUserProfileById(this.$route.params.id);
    this.authUnsubscribe = subscribeToAuth(
      (userData) => (this.authUser = userData)
    );
    this.loadingUser = false;

    this.messagesUnsubscribe = await subscribeToPrivateChat(
      this.authUser.id,
      this.user.id,
      (newMessages) => (this.messages = newMessages)
    );
    this.loadingMessages = false;
  },
  unmounted() {
    this.authUnsubscribe();
    this.messagesUnsubscribe();
  },
};
</script>

<template>
  <BaseLoader v-if="loadingUser" />
  <template v-else>
    <BaseHeader>Conversación privada con {{ user.email }}</BaseHeader>

    <h2 class="sr-only">Mensajes</h2>
    <div
      class="flex flex-col items-start min-h-[300px] p-4 border border-gray-300 rounded mb-2"
    >
      <template v-if="!loadingMessages">
        <div
          v-for="message in messages"
          class="max-w-[70%] p-2 rounded mb-2 bg-gray-100"
          :class="{
            'bg-indigo-300': message.senderId == authUser.id,
            'self-end': message.senderId == authUser.id,
          }"
        >
          <div>{{ message.message }}</div>
          <div>{{ message.created_at || "Enviando..." }}</div>
        </div>
      </template>
      <template v-else>
        <BaseLoader />
      </template>
    </div>

    <form class="flex gap-2" action="" @submit.prevent="handleSubmit">
      <label for="message" class="sr-only">Mensaje</label>
      <textarea
        class="w-11/12 p-2 border border-gray-400 rounded"
        id="message"
        v-model="newMessage.message"
      ></textarea>
      <BaseButton class="w-1/12">Enviar</BaseButton>
    </form>
  </template>
</template>
