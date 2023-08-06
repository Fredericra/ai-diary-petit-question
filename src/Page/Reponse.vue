<template>
    <div>
        <div class="media">
            <div class="col-span-4"></div>
            <div class="col-span-4">
                <div class="px-12">
                    <h3 class="text-gray-400 font-bold roman">{{ titres }} <span
                            class="fas fa-pen-alt text-gray-400 animate-bounce" :class="titresPen ? '' : 'hidden'"></span>
                        <span class="text-blue-600 font-bold"> {{ diary }} <span
                                class="fas fa-pen-alt text-blue-400 animate-bounce"
                                :class="diaryPen ? '' : 'hidden'"></span>
                        </span></h3>
                </div>
                <div class="text-left mt-5 font-bold">
                    <ul class="space-y-3 px-10">
                        <li class="space-x-4">
                            <span class="fas fa-check-circle text-green-400"></span>
                            <span class="text-gray-400">Petit reponse</span>
                        </li>
                        <li class="space-x-4">
                            <span class="fas fa-check-circle text-green-400"></span>
                            <span class="text-gray-400">Aide</span>
                        </li>
                    </ul>
                </div>
                <div class="py-2 px-10 mt-6">
                <div class="bg-gray-200 rounded-sm shadow-sm hover:shadow-lg relative" :class="form ? '' : 'hidden'">
                    <span @click="ferme"
                        class="fas fa-window-close text-gray-400 absolute right-0 cursor-pointer -top-2"></span>
                    <p class="text-sm indent-8 text-gray-400 font-bold px-2 py-1">Veuillez entre votre question </p>
                    <form class="py-2 px-4" @submit.prevent="responsing">
                        <div class="relative">
                            <input v-model="text" type="text" class="input bg-gray-300 w-full"
                                placeholder="entre votre question">
                            <i class="fas fa-user-circle absolute top-2 left-2 text-gray-400"></i>
                        </div>
                        <div class="flex justify-center items-center h-[50px] space-x-4">
                            <button v-if="menu"
                                class="rounded-full text-blue-400 hover:text-gray-400 font-bold hover:bg-white border-gray-400 border-2 px-2 py-[2px]">Entre</button>
                            <button v-else  @click.prevent="ressaye" :class="block?'':'hidden'"
                                class="rounded-full text-blue-400 hover:text-gray-400 font-bold hover:bg-white border-gray-400 border-2 px-2 py-[2px]">Annuler</button>
                        </div>
                    </form>
                </div>
                <div class="v" :class="form ? 'hidden' : ''">
                    <div class="flex justify-center items-center h-[80px]">
                        <button @click="ouvre" 
                            class="px-2 py-1 rounded-full font-bold text-gray-400 border-2 border-gray-400 hover:bg-white">Navigée</button>
                    </div>
                </div>
                <div class="py-4 px-4">
                    <div class="bg-gray-300 px-2 py-2 rounded" v-if="reponse.length>0">
                        <span class="text-gray-400 comic font-bold">{{ reponse }} 
                        <span class="fas fa-pen-alt animate-bounce" v-if="repPen"></span> </span>
                    </div>
                    <div class="" v-else-if="erreur.length>0">
                        <p class="text-sm text-gray-400 font-bold">{{ erreur }} </p>
                        <p class="text-blue-400 font-bold text-sm ">
                        {{ example }} <span class="fas fa-pen animate-bounce text-gray-400" v-if="penEx"></span>
                        </p>
                    </div>
                </div>
                <div  class="flex justify-center items-center h-[50px] bg-gray-300 shadow-sm hover:shadow-md" :class="reponse.length>0 || erreur.length>0?'hidden':''">
                    <p class="text-gray-400 font-bold text-sm">Aucun donnée reponse , ajouter question</p>
                </div>
            </div>
            </div>
            <div class="col-span-4">
                <div  class="px-5 bg-gray-100 shadow-sm hover:shadow-md" v-if="vide.length>0">
                    <div class="flex justify-center px-4 py-2">
                    <button
                    @click="revale" 
                    class="px-10 py-2 rounded-sm bg-gray-400 text-white font-bold hover:bg-sky-400 hover:rounded-full">
                    Vide liste
                    <span class="fas fa-list px-4"></span>
                    </button>
                    </div>
                    <div class="mt-4 px-5 py-1">
                        <div class="bg-white rounded mt-5" v-for="(value,cle) in vide" :key="cle">
                            <div class="flex justify-start">
                                <button
                                @click="fermer(cle)" 
                                class="fas fa-window-close fa-lg text-gray-400"></button>
                            </div>
                            <div class="flex justify-end">
                                <button class="fas fa-paste fa-lg text-gray-400"></button>
                            </div>
                            <div class="flex justify-between px-4 py-3">
                                <div class="">
                                    <p class="font-bold text-gray-600 comic">{{ value.name }}
                                     <span class="text-sm text-blue-400">{{ value.text }}</span> </p>
                                </div>
                                <div class=""></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="px-10 flex justify-center items-center h-[50px] bg-gray-300 shadow-sm hover:shadow-md" v-else>
                    <p class="text-gray-400 font-bold text-sm">Aucun de liste veuillez entre votre question</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<script>
import Cdn from "./Cdn.json"
export default {
    data() {
        return {
            form:true,
            anuler:true,
            menu:false,
            titres:"",
            diary:"",
            reponse:"",
            repPen:false,
            titresPen:false,
            diaryPen:false,
            text:"",
            vide:[],
            erreur:"",
            example:"",
            penEx:"",
            block:true,

        }
    },
    methods: {
        fermer(id)
        {
            this.vide.splice(id,1);
            this.ressaye();
        },
        revale()
        {
            this.vide = [];
        },
        ressaye()
        {
            this.reponse ="";
            this.text="";
            this.menu=true;
            this.erreur = "";
            this.erreur ="";
            this.example = "";
            this.example="";
        },
        responsing()
        {
           const menu = this.text.toLowerCase().split(' ');
           const bien = [];
           const resultat = Cdn.forEach((item)=>{
                const regex = new RegExp("\\b(" + menu.join("|") +")\\b","gi");
               const tous = item.cle.match(regex);
               if(item && item.cle.match(regex))
               {
                item = {...item};
                bien.push(item)
               }

           });
           const tous =[];
           bien.forEach((Element)=>{
               const text = Element.text;
               Element = {...text}
                return tous.push(text);
           })
           if(tous.length>0 && this.text.length>0){
            this.erreur="";
           const text = tous.toString();
           let index= -1;
           const interval = setInterval(() => {
            index++
                if(index>=text.length)
                {
                   this.reponse = text;
                   this.vide.push({"text":text,"name":this.text})
                   this.repPen =false;
                   this.block = true
                    clearInterval(interval);
                }
                else{
                 this.reponse +=text[index] 
                 this.repPen=true;
                 this.menu = false
                 this.block = false

                }
           }, 180);
            }
            else{
                this.menu = false;
                const text = "je suis desole , je ne comprends bien que vous dits , veuillez reformule bien votre phase !!!";
                const expample= "dis mois , mois simplemenet qui etez vous?...quel langage vous prefére?... merci";
                let index  = -1;
                const interval = setInterval(() => {
                    index++;
                    if(index>=text.length)
                    {
                        this.erreur=text;
                        clearInterval(interval);
                    }
                    else{
                        this.erreur +=text[index];
                    }
                }, 180);
                const timer = setTimeout(() => {
                    let index = -1;
                   const interval = setInterval(() => {
                    index++;
                    if(index>=expample.length)
                    {
                        this.example = expample;
                        clearInterval(interval);
                        clearTimeout(timer);
                        this.penEx=false;
                    }
                    else{
                        this.example += expample[index];
                        this.penEx=true;
                    }
                   }, 180);
                }, (text.length*180)+600);
            }
        },
        titre()
        {
            const venue = "Hey ,vous petit reponse sur ";
            const diary ="DIARY";
            let index = -1;
            const interval = setInterval(() => {
                index++;
                if(index>=venue.length)
                {
                    this.titres = venue
                    clearInterval(interval);
                    this.titresPen=false;
                }
                else{
                  this.titres+=venue[index];
                  this.titresPen=true;
                }
            }, 180);
            const timeout = setTimeout(() => {
                let index = -1;
                const inter = setInterval(() => {
                    index++;
                    if(index>=diary.length)
                    {
                        this.diary = diary;
                        clearInterval(inter);
                        clearTimeout(timeout);
                        this.diaryPen=false;

                    }
                    else{
                        this.diary+=diary[index];
                        this.diaryPen=true;

                    }
                }, 180);
            }, venue.length*180+200);
            const time = setTimeout(()=>{
                this.menu = true;
                clearTimeout(time);
            },(diary.length*180 + (venue.length * 180)+300) )
            
        }
    },
  mounted() {
    this.titre()
  },
}
</script>