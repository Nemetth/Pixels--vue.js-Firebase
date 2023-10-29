<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseButton from "../components/BaseButton.vue";
import {
  changePassword,
} from "../services/auth";

export default {
  components: {BaseHeader, BaseInput, BaseLabel, BaseButton},
  data() {
    return {
      user: {
        id: null,
        password: null,
        passwordConfirm: null,
      },
      userAuth: {
        id: null,
        email: null
      },
      validPass: null, // Variable para rastrear si las contraseñas coinciden
      error: null, // Variable para rastrear errores
      authUnsubscribe: () => {},
    };
  },
  methods: {
    async handleSubmit() {
      this.validPass = null; // Restablecer validPass
      this.error = null; // Restablecer error

      if (this.user.password === this.user.confirmPassword) {
        try {
          await changePassword(this.user.password);
          this.validPass = true; // Contraseña modificada con éxito
        } catch (error) {
          console.error("Error al cambiar la contraseña:", error);
          this.error = error.message || "Error desconocido al cambiar la contraseña";
        }
      } else {
        this.validPass = false; // Las contraseñas no coinciden
      }
    }
  },
};
</script>

 <template>
  <BaseHeader>Mi perfil</BaseHeader>
  <div class="flex p-6 items-center justify-center">
    <div class="max-w-md w-full p-6 bg-white shadow-md rounded-md">
      <h2 class="text-2xl font-semibold mb-4">Cambio de Contraseña</h2>

      <!-- Formulario de cambio de contraseña -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <BaseLabel for="newPassword">Nueva contraseña</BaseLabel>
          <BaseInput
            type="password"
            id="newPassword"
            v-model="user.password"
          ></BaseInput>
        </div>
        <div>
          <BaseLabel for="confirmPassword">Confirmar contraseña</BaseLabel>
          <BaseInput
            type="password"
            id="confirmPassword"
            v-model="user.confirmPassword"
          ></BaseInput>
        </div>
        <BaseButton>Modificar</BaseButton>
      </form>

      <p v-if="validPass" class="text-green-500 pt-2">Contraseña modificada con éxito</p>
      <p v-if="validPass === false" class="text-red-500 pt-2">Las contraseñas no coinciden</p>
      <p v-if="error" class="text-red-500 pt-2">Error al cambiar la contraseña: {{ error }}</p>
    </div>
  </div>
</template>
