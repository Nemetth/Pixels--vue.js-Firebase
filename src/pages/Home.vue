<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "Home",
  components: { BaseHeader, BaseButton },
};
</script>

<template>   
<div class="flex items-center justify-center">
  <div class="w-1/2 m-6">
    <div><BaseHeader>Únete a nuestra comunidad de jugadores</BaseHeader></div>
    <div><p>Mejora tus habilidades y domina tus juegos favoritos en PIXELS. Contenido exclusivo, trucos y estrategias te esperan. ¡Únete para llevar tus juegos al siguiente nivel!</p></div>
    <BaseButton class="mt-4"><router-link to="/registro">Hacete miembro</router-link></BaseButton>
  </div>             
  <div class="w-1/2"><img src="img/home-img.png" alt="home-img-games"></div>    
</div>                          
</template>
