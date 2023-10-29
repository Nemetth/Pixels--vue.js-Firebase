<script>
import { logout, subscribeToAuth } from "./services/auth.js";
import { getUserProfileById } from "./services/user.js";
import BaseButton from "./components/BaseButton.vue";

export default {
  name: "App",
  data() {
    return {
      user: {
        id: null,
        email: null,
      },
      userProfile: {
        id: null,
        email: null,
        rol: null
      }
    };
  }, 
  computed: {
    shoutingName() {
      return this.name.toUpperCase();
    },
  },
  components: {
    BaseButton
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push({
        path: "/iniciar-sesion",
      });
    },
  },
  async mounted() {
    subscribeToAuth(async (newUser) => {
      this.user = newUser;
      
      if(newUser.id !== null) {
        this.userProfile = await getUserProfileById(newUser.id)
      } else {
        this.userProfile = {
          id: null,
          email: null,
          rol: null
        }
      }
    });
  },
};


</script>

<template>
  <header>
    <nav class="p-6 flex justify-between items-center bg-indigo-950 h-full text-white">
      <div class="pl-6 logo text-3xl"><h1>PIXELS</h1></div>
      <div>
        <ul class="flex gap-4">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/servicio">Servicios</router-link></li>
          <li v-show="user.id !== null"><router-link to="/perfil">Mi Perfil</router-link></li>
          <li v-show="userProfile.rol===1"><router-link to="/panel">Panel</router-link></li>
        </ul>
      </div>
        <template v-if="user.id === null">
          <div class="mr-6 flex items-center">
            <button class="mr-4 rounded p-2 border border-indigo-700"><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></button>
            <button class="bg-indigo-500 p-2 rounded"><router-link to="/registro">Registro</router-link></button>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center">
            <p class="pr-4">{{ userProfile.email }}</p>
            <div class="flex gap-4 items-center justify-center mr-5 p-2 rounded border border-indigo-700" v-show="userProfile.rol!==1">
              <button>
                <!-- Link directo al chat con el administrador -->
                <router-link to="/usuario/on1lQglB3meDPsEg0QR39j9dhnI3/chat">
                  <div class="flex items-center">
                    <img src="/img/chat-icon.svg" alt="chat"/>
                    Asistencia
                  </div>
                </router-link>
              </button>
            </div>
          <form @submit.prevent="handleLogout">
                <button class="bg-indigo-500 p-2 rounded" type="submit">Cerrar Sesión</button>
          </form>
          </div>
        </template>
       
      
      <!-- <div class="flex pr-6"></div> -->
    </nav>
  </header>
  <main class="container h-full m-auto p-4">
    <router-view></router-view>
  </main>
  <footer
    class="bottom-0 flex justify-center items-center h-[100px] bg-indigo-950 w-full border-t-4 border-indigo-500"
  >
    <p class="text-white">Tomas Cahue, Florencia Vélez - DWN4AP 2023</p>
  </footer>
</template>
