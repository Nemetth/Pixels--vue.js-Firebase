<script>
import { getPrivateChat } from "../services/private-chat-list.js";
import { getUsers } from "../services/user.js";
import BaseLoader from "../components/BaseLoader.vue";
import ServiceForm from "../components/AgregarServicios.vue";

export default {
  name: "PrivateChatsList",
  components: { BaseLoader, ServiceForm },
  data() {
    return {
      messages: [],
      loadingMessages: true,
      users: [],
    };
  },
  methods: {
    userEmail(message) {
      const userId =  message.users.find((id) => id !== 'on1lQglB3meDPsEg0QR39j9dhnI3');
      const user = this.users.find((id) => id.id === userId)
      if(user) {
        return user.user.email;
      }
    },
    getUrl(message) {
      const otherUserId = message.users.find((userId) => userId !== 'on1lQglB3meDPsEg0QR39j9dhnI3');
      return `/usuario/${otherUserId}/chat`;
    },
  },
  async mounted() {
  this.loadingMessages = true;
  this.messages = await getPrivateChat();
  this.loadingMessages = false;

  this.loadingUser = true;
  this.users = await getUsers();
  this.loadingUser = false;
  this.userId =this.users.id
  // console.log(this.users)
  console.log(this.messages)
},
}

</script>

<template>
  <div class="flex">
    <div class="w-1/2"> 
      <ServiceForm></ServiceForm>
    </div>
    <div class="w-1/2">
      <div v-if="!loadingMessages">
        <div v-for="message in messages" class="mb-2">
          <div>
            <b>Tienes un mensaje del usuario:</b>
            <router-link
              :to="getUrl(message)"
              class="ml-1 text-blue-600 underline"
            >{{ userEmail(message) }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
