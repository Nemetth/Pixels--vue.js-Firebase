<script>
import { saveChatMessage } from "../services/chat.js";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseLoader from "../components/BaseLoader.vue";
import { subscribeToAuth } from "../services/auth";
export default {
  name: "ChatMessageForm",
  components: { BaseButton, BaseLabel, BaseInput, BaseLoader },
  data() {
    return {
      sendingMessage: false,
      newMessage: {
        message: "",
      },
      user: {
        id: null,
        email: null,
        rol: null,
      },
      authUnsubscribe: () => {},
    };
  },
  methods: {
    sendMessage() {
      this.sendingMessage = true;
      saveChatMessage({
        userId: this.user.id,
        user: this.user.email,
        message: this.newMessage.message,
      }).then(() => {
        this.newMessage.message = "";
        this.sendingMessage = false;
      });
    },
  },
  mounted() {
    this.authUnsubscribe = subscribeToAuth((newUser) => (this.user = newUser));
  },
  unmounted() {
    this.authUnsubscribe();
  },
};
</script>

<template>
  <form action="#" @submit.prevent="sendMessage">
    <div class="mb-3">
      <BaseLabel for="user">Usuario</BaseLabel>
      <div>{{ user.email }}</div>
    </div>
    <div class="mb-3">
      <BaseLabel for="message">Mensaje</BaseLabel>
      <textarea
        class="w-full p-2 border border-gray-400 rounded"
        id="message"
        v-model="newMessage.message"
        @keyup.ctrl.enter="sendMessage"
      ></textarea>
    </div>
    <BaseButton :loading="sendingMessage" />
  </form>
</template>
