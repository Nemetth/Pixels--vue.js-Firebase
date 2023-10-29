<script>
import { saveService } from "../services/services.js";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseLoader from "../components/BaseLoader.vue";
export default {
  name: "ServiceForm",
  components: { BaseButton, BaseLabel, BaseInput, BaseLoader },
  data() {
    return {
      //Preparamos la data que va a almacenar la información del nuevo servicio a publicar.
      sendingService: false,
      serviceAdded: false,
      services : [],
      service: {
        id: null,
        name: null,
        price: null,
        description: null
      },
    };
    
  },
  methods: {
    sendService() {
      this.sendingService = true;
      //Guardamos el servicio.
    saveService({
      serviceId: this.service.id,
      name: this.service.name,
      description: this.service.description,
      price: this.service.price,
    }).then(() => { //Una vez que se envía el formulario reseteamos los campos.
        this.service.name = "";
        this.service.price = "";
        this.service.description = "";
        this.sendingService = false;
        this.serviceAdded = true;
      });
  },
  computed: {
    isNameValid() {
      return this.service.name !== null && this.service.name !== '';
    },
    isDescriptionValid() {
      return this.service.description !== null && this.service.description !== '';
    },
    isPriceValid() {
      return this.service.price !== null && !isNaN(this.service.price);
    },
  }


  },
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Agregar Servicio</h2>
    <form @submit.prevent="sendService" class="max-w-md space-y-4">
      <div>
        <BaseLabel>Nombre del Servicio</BaseLabel>
        <BaseInput id="name" v-model="service.name" @input="isNameValid"></BaseInput>
        <p v-if="!isNameValid" class="text-indigo-500">Nombre del servicio es requerido</p>
      </div>

      <div>
        <BaseLabel>Descripción</BaseLabel>
        <textarea id="description" v-model="service.description" @input="isDescriptionValid" class="mt-1 p-2 w-3/4 rounded border border-indigo-900"></textarea>
        <p v-if="!isDescriptionValid" class="text-indigo-500">Descripción es requerida</p>
      </div>

      <div>
        <BaseLabel>Precio</BaseLabel>
        <BaseInput id="price" @input="isPriceValid" v-model="service.price"></BaseInput>
        <p v-if="!isPriceValid" class="text-indigo-500">Precio es requerido</p>
      </div>

      <p v-if="serviceAdded" class="text-green-500">Servicio agregado correctamente</p>
    <BaseButton>Agregar</BaseButton>
    </form>
  </div>
</template>
