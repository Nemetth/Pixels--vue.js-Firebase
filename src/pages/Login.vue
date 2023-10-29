<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import { login } from "../services/auth.js";

export default {
  name: "Login",
  components: { BaseHeader, BaseButton, BaseLabel, BaseInput },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  computed: {
    isEmailValid() {
      // Validar el formato del correo electrónico
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.form.email);
    },
  },
  methods: {
    doLogin() {
      if (this.isEmailValid) {
        login({
          ...this.form,
        })
          .then((user) => {
            if(user) {
              this.$router.push({ path: "/" });
            } 
          })
          .catch((error) => {
            this.error = 'Contraseña incorrecta'
          });
      }
    },
  },
};
</script>

<template>
  <BaseHeader>Bienvenido a PIXELS</BaseHeader>
  <div class="flex items-center justify-center">
    <div class="w-1/2"><img src="/img/img_login.png" alt="login"></div>
    <div class="w-1/2">
      <form action="#" @submit.prevent="doLogin">
        <div class="mb-3">
          <BaseLabel for="email">Email</BaseLabel>
          <BaseInput type="email" id="email" v-model="form.email" />
          <p v-if="!isEmailValid" class="text-indigo-700">Ingrese un correo electrónico válido</p>
        </div>
        <div class="mb-3">
          <BaseLabel for="password">Contraseña</BaseLabel>
          <BaseInput type="password" id="password" v-model="form.password" />
          <p v-if="error" class="text-indigo-700">{{ error }}</p>
        </div>
        <BaseButton>Ingresar</BaseButton>
        <p class="pt-4">¿No tienes cuenta? <span class="text-indigo-900 font-bold"><router-link to="/registro">Regístrate aquí</router-link></span></p>
      </form>
    </div>
  </div>
</template>

