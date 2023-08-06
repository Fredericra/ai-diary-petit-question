<template>
  <div class="bg-gradient-to-r h-[1580px] to-sky-50 from-orange-100">
    <div class="media">
      <div class="col-span-4">
        <div class="flex justify-center items-center px-1 py-2 space-x-4">
            <router-link to="/" class="link">
              <span class="fas fa-globe"></span>
              Acceuil</router-link>
            <router-link to="/reponse" class="link">
              <span class="fas fa-quote-left"></span>
              Reponse</router-link>
              <router-link to="/jeux" class="link">
              <i class="fas fa-gamepad"></i>Jeux
              </router-link>
            <router-link  to="/about" class="link">
              About
              <i class="fas fa-info"></i>
            </router-link>
        </div>
        <div class="">
          {{ resultat }}
        </div>
      </div>
      <div class="col-span-4">
          <div class="px-10 mt-20">
              <div>
                  
              </div>
          </div>
      </div>
      <div class="col-span-4"></div>
    </div>
    <div class="">
    </div>
    <div>
      <router-view v-on:plus="reste"></router-view>
    </div>
  </div>
</template>
<script setup>
import { IndexOutOfBoundsError } from 'pdf-lib';
import { setTransitionHooks } from 'vue';
</script>
<script>
export default {
  methods: {
    data() {
      return {
        resultat:"",
        nombre:"",
      }
    },
    methods: {
      reste(nombre)
      {
        this.nombre = nombre;
        console.log(nombre)
      },
      home(plus)
      {
        this.resultat=plus
      }
    },
  },
}
</script>
