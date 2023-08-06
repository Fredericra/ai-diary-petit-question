<template>
    <div>
        <div class="media">
            <div class="col-span-4"></div>
            <div class="col-span-4">
                <div class="mt-10 px-8">
                    <div class="">
                        <p class="font-bold">
                            <span class="text-gray-400 px-4" :class="penTi ? 'diary' : ''">{{ titres }} <span
                                    class="fas fa-pen-alt" v-if="penTi"></span></span>
                            <span class="text-blue-400 comic px-1">{{ diary }} <span class="fas fa-pen-alt text-violet-400"
                                    v-if="penDi"></span></span>
                        </p>
                    </div>
                    <div class="text-left mt-5 font-bold">
                        <ul class="space-y-3 px-10">
                            <li class="space-x-4">
                                <span class="fas fa-check-circle text-green-400"></span>
                                <span class="text-gray-400">Jeux</span>
                            </li>
                            <li class="space-x-4">
                                <span class="fas fa-check-circle text-green-400"></span>
                                <span class="text-gray-400">Conaissance géneral</span>
                            </li>
                        </ul>
                        <div class="py-2 flex justify-center items-center" v-if="mipoitra">
                            <button @click="changement"
                                class="px-4 rounded-sm py-1 bg-gray-400 text-white hover:bg-blue-500 hover:rounded-full">Jouer</button>
                        </div>
                        <div class="py-2 m-4 flex justify-center h-[12px]" v-if="hasard">
                            <span class="text-gray-400 animate-bounce text-2xl">{{ nombre }} </span>
                        </div>
                        <div class="py-2 rounded-2xl bg-gray-200 px-4 mt-2" v-if="!hasard && question.length>0">
                            <p class="text-sm text-blue-400"><span class="fas fa-warning px-2"></span> {{ question }} </p>
                        </div>
                        <div class="py-2 rounded-2xl px-4 mt-2" v-if="vrai">
                            <div class="bg-red-100 py-2 rounded-sm text-center mt-2">
                                <span class="text-red-600">Faux reponse <span class="fas fa-warning"></span></span>
                            </div>
                            <div class="bg-sky-100 py-2 rounded-sm text-center mt-2">
                                <p class="text-sm text-blue-400">Reponse: <span class="fas fa-smile px-2"></span> {{ reponse }} </p>
                            </div>
                        </div>
                        <div class="py-4">
                            <div class="bg-gray-200 rounded-sm shadow-sm hover:shadow-lg relative"
                                :class="form ? '' : 'hidden'">
                                <span @click="ferme"
                                    class="fas fa-window-close text-gray-400 absolute right-0 cursor-pointer -top-2"></span>
                                <p class="text-sm indent-8 text-gray-400 font-bold px-2 py-1 text-center">Veuillez entre
                                    votre reponse
                                </p>

                                <form class="py-2 px-4" @submit.prevent="responsing">
                                    <div class="relative">
                                        <input v-model="text" type="text" class="input bg-gray-300 w-full"
                                            placeholder="entre votre question">
                                        <i class="fas fa-user-circle absolute top-2 left-2 text-gray-400"></i>
                                    </div>
                                    <div class="flex justify-center items-center h-[50px] space-x-4">
                                        <button v-if="menu"
                                            class="rounded-full text-blue-400 hover:text-gray-400 font-bold hover:bg-white border-gray-400 border-2 px-2 py-[2px]">Entre</button>
                                        <button v-else @click.prevent="ressaye" :class="block ? '' : 'hidden'"
                                            class="rounded-full text-blue-400 hover:text-gray-400 font-bold hover:bg-white border-gray-400 border-2 px-2 py-[2px]">Annuler</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="py-4" :class="form?'hidden':''">
                            <div class="py-2 flex justify-center space-x-4">
                                <button
                                @click="oui"
                                 class="px-4 rounded-sm py-1 bg-gray-400 text-white hover:bg-gray-600">OUI</button>
                                <button
                                @click="faux"
                                 class="px-4 rounded-sm py-1 bg-gray-400 text-white hover:bg-red-500">NON</button>
                            </div>
                        </div>
                        <div class="flex justify-center h-[50px]">
                            <div class="text-center">
                            <p class="text-gray-400 font-bold">Scoore</p>
                            <p class="text-amber-400 font-bold">{{ score }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4"></div>
        </div>
    </div>
</template>
<script setup></script>
<script>
import jeux from "./Jeux.json";
import Swal from "sweetalert2"
export default {
    data() {
        return {
            form: true,
            menu: true,
            nombre: "",
            titres: "",
            text:"",
            diary: "",
            mipoitra: false,
            penTi: false,
            penDi: false,
            hasard: false,
            question: "",
            score:0,
            vrai:false,
            reponse:"",
            interval:"",
            stocker:[]
        }
    },
    methods: {
        responsing()
        {
            clearInterval(this.interval)
            const reply = jeux.find(item=>this.nombre===jeux.indexOf(item));
            const reponse = reply.reponse.toLowerCase().split(' ');
            const text = this.text.toLowerCase();
          const trouve = text.match(reponse);
            if(trouve)
            {
                this.score = this.score+1;
                this.changement();

            }
            else{
                this.vrai = true;
                this.reponse =reply.reponse
                this.changement()
            }
        },
        oui()
        {
            clearInterval(this.interval)
            const reply = jeux.find(item=>this.nombre===jeux.indexOf(item));
            if(reply.reponse==="oui")
            {
                this.score = this.score+1 
                this.changement()
            }
            else{
                this.vrai = true;
                this.reponse =reply.reponse
                this.changement()
            }
        },
        faux()
        {
            clearInterval(this.interval)
            const reply = jeux.find(item=>this.nombre===jeux.indexOf(item));
            if(reply.reponse==="non")
            {
                this.score = this.score+1 
                this.changement()
            }
            else{
                this.vrai = true;
                this.reponse =reply.reponse
                this.changement()
            }
        },
        changement() {
            this.text="";
            this.hasard = true
            this.mipoitra = false
            let time = 20;
            const Hasard = Math.floor(Math.random() * jeux.length);
            this.interval = setInterval(() => {
                time += time;
                if (time >= 4000) {
                    this.stocker.push({"index":this.nombre})
                    this.vrai = false;
                    this.reponse="";
                    this.nombre = Hasard;
                    clearInterval(this.interval);
                    this.hasard = false;
                    const playing = jeux.find(item => jeux.indexOf(item) === Hasard);
                    this.question = playing.question;
                    
                    if(playing.type==="click")
                    {
                        this.form = false;
                       
                    }
                    else{
                        
                        this.form = true;
                    }
                }
                else {
                    this.nombre = Math.floor(Math.random() * jeux.length);
                }
            }, 120);
        },
        titre() {
            const titre = "Hey, jouer jeux avec ";
            const diary = "DIARY";
            let index = -1;
            const interval = setInterval(() => {
                index++;
                if (index >= titre.length) {
                    this.titres = titre;
                    clearInterval(interval);
                    this.penTi = false;
                }
                else {
                    this.titres += titre[index];
                    this.penTi = true;
                }
            }, 150);
            const timer = setTimeout(() => {
                let indextimer = -1;
                const interval = setInterval(() => {
                    indextimer++;
                    if (indextimer >= diary.length) {
                        this.diary = diary;
                        clearInterval(interval);
                        clearTimeout(timer);
                        this.penDi = false
                    }
                    else {
                        this.diary += diary[indextimer];
                        this.penDi = true
                    }
                }, 150);
            }, titre.length * 150 + 600);
            const timerout = setTimeout(() => {
                this.mipoitra = true;
                this.nombre = "4";
                clearTimeout(timerout);
            }, (titre.length * 150) + (diary.length * 150) + 2000);
        }
    },
    mounted() {
        this.titre();
    },
}
</script>
