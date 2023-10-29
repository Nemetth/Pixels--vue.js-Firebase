<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import { register } from "../services/auth";

export default {
  name: "Register",
  components: { BaseHeader, BaseButton, BaseLabel, BaseInput },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    isEmailValid() {
      // Validar el formato del correo electrónico
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(this.form.email);
    },
    isPasswordValid() {
      // Validar que la contraseña tenga al menos 6 caracteres
      return this.form.password.length >= 6;
    },
  },
  methods: {
    async handleSubmit() {
      // Validar el formulario antes de enviar
      if (this.isEmailValid && this.isPasswordValid) {
        try {
          await register({
            ...this.form,
          });
          this.$router.push("/");
        } catch (error) {
        }
      }
    },
  },
};
</script>

<template>
  <BaseHeader>Crear Cuenta</BaseHeader>
  <div class="flex items-center justify-center">
    <div class="w-1/2"><img src="/img/img_login.png" alt="register"></div>
    <div class="w-1/2">
      <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <BaseLabel for="email">Email</BaseLabel>
          <BaseInput type="email" id="email" v-model="form.email" />
          <p v-if="!isEmailValid" class="text-indigo-700">Ingrese un correo electrónico válido</p>
        </div>
        <div class="mb-3">
          <BaseLabel for="password">Contraseña</BaseLabel>
          <BaseInput type="password" id="password" v-model="form.password" />
          <p v-if="!isPasswordValid" class="text-indigo-700">La contraseña debe tener al menos 6 caracteres</p>
        </div>
        <BaseButton>Crear Cuenta</BaseButton>
        <p class="pt-4">Si ya eres miembro, <span class="text-indigo-900 font-bold"><router-link to="/iniciar-sesion">puedes iniciar sesión aquí.</router-link></span></p>
      </form>
    </div>
  </div>
</template>

