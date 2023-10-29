<script>
import { subscribeToChatMessages } from "../services/chat.js";
import BaseLoader from "../components/BaseLoader.vue";
export default {
  name: "ChatMessageList",
  components: { BaseLoader },
  data() {
    return {
      messages: [],
      loadingMessages: true,
      chatUnsubscribe: () => {},
    };
  },

  mounted() {
    this.loadingMessages = true;
    this.chatUnsubscribe = subscribeToChatMessages((messages) => {
      this.messages = messages;
      this.loadingMessages = false;
    });
  },
  unmounted() {
    this.chatUnsubscribe();
  },
};
</script>

<template>
  <template v-if="!loadingMessages">
    <div v-for="message in messages" class="mb-2">
      <div>
        <b>Tienes un mensaje de :</b>
        <router-link
          :to="`/usuario/${message.userId}`"
          class="ml-1 text-blue-600 underline"
          >{{ message.user }}</router-link
        >
      </div>
    </div>
  </template>
  <template v-else>
    <BaseLoader />
  </template>
</template>
