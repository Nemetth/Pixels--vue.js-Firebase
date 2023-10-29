<script>
import BaseHeader from "../components/BaseHeader.vue";
import { subscribeToServices } from "../services/services.js"

export default {
    data() {
        return {
            services: [], // Se almacenan los datos del servicio.
        };
    },
    mounted() {
        subscribeToServices((data) => {
          //Consultamos a firebase y pasamos los datos al array creado en data para luego poder acceder a cada valor.
            this.services = data;
        });
    },
    components: { BaseHeader }
};
</script>

<template>
  <!-- Ahora que tenemos los datos en el array service podemos mostrarlos sin problemas -->
  <div>
    <BaseHeader>Planes y precios</BaseHeader>
    <div class="flex flex-wrap justify-center mt-6">
      <div v-for="service in services" :key="service.serviceId" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="bg-indigo-700 text-white p-2 rounded-lg">
            <h2 class="font-bold text-sm">{{ service.name }}</h2>
          </div>
          <div class="p-2">
            <p class="text-gray-700 text-sm">{{ service.description }}</p>
            <p class="text-indigo-700 font-bold mt-2">Precio: $ {{ service.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
