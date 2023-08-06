<template>
    <div class="media bg-gradient-to-r h-screen to-sky-50 from-orange-100">
        <div class="col-span-4">
            <div class="py-4 px-20">
                <div class="bg-gray-400 py-2 px-4 text-center rounded-b-2xl">
                    <p class="font-bold text-gray-600"> Liste d'invite
                        <span class="" v-if="resultat.length > 0">{{ resultat.length }}</span>
                    </p>
                </div>
                <div>
                    <ul class="space-y-3 py-2" v-if="resultat.length > 0" v-for="(result, index) in resultat" :key="index">
                        <li class="space-x-2 font-bold flex justify-between items-center">
                            <div class="space-x-4">
                                <span class="fas fa-check-circle text-green-400"></span>
                                <span class="underline uppercase">{{ result.name }} </span>
                            </div>
                            <div>
                                <button
                                @click="espace(index)"
                                 class="fas fa-window-close text-gray-400"></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-span-4 px-5">
            <div class="">
                <h3 class="text-gray-400 font-bold roman">{{ titres }} <span
                        class="fas fa-pen-alt text-gray-400 animate-bounce" :class="titresPen ? '' : 'hidden'"></span> <span
                        class="text-blue-600 font-bold">{{ diary }} <span
                            class="fas fa-pen-alt text-blue-400 animate-bounce" :class="diaryPen ? '' : 'hidden'"></span>
                    </span></h3>
            </div>
            <div class="text-left mt-5 font-bold">
                <ul class="space-y-3 px-10">
                    <li class="space-x-4">
                        <span class="fas fa-check-circle text-green-400"></span>
                        <span class="text-gray-400">Horoscope Ajourd'hui</span>
                    </li>
                    <li class="space-x-4">
                        <span class="fas fa-check-circle text-green-400"></span>
                        <span class="text-gray-400">Citation et motivation</span>
                    </li>
                    <li class="space-x-4">
                        <span class="fas fa-check-circle text-green-400"></span>
                        <span class="text-gray-400">Petit reponse</span>
                    </li>
                </ul>
            </div>
            <!-- formulaire -->
            <div class="py-2 px-4 mt-6">
                <div class="bg-gray-200 rounded-sm shadow-sm hover:shadow-lg relative" :class="form ? '' : 'hidden'">
                    <span @click="ferme"
                        class="fas fa-window-close text-gray-400 absolute right-0 cursor-pointer -top-2"></span>
                    <p class="text-sm indent-8 text-gray-400 font-bold px-2 py-1">Veuillez entre votre nom </p>
                    <form class="py-2 px-4">
                        <div class="relative">
                            <input v-model="user" type="text" class="input bg-gray-300 w-full"
                                placeholder="entre votre nom">
                            <i class="fas fa-user-circle absolute top-2 left-2 text-gray-400"></i>
                        </div>
                        <div class="flex justify-center items-center h-[50px] space-x-4">
                            <button v-if="anuler" @click.prevent="ajouter"
                                class="rounded-full text-blue-400 hover:text-gray-400 font-bold hover:bg-white border-gray-400 border-2 px-2 py-[2px]">Entre</button>
                            <button v-else @click.prevent="ressaye" :class="block?'':'hidden'"
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
            </div>
            <!-- formulaire -->
        </div>
        <div class="col-span-4 px-10">
            <div class="py-3 px-4" v-if="textAffiche">
                <div class="px-5 py-2 mt-5 bg-gray-200 rounded-md  shadow-sm hover:shadow-lg">
                    <div class="flex justify-end translate-x-5 -translate-y-2" title="copie">
                        <button class="fas fa-paste fa-lg "></button>
                    </div>
                    <div class="flex justify-start -translate-x-5 -translate-y-2" title="copie">
                        <button 
                        @click="close"
                        class="fas fa-window-close text-amber-400 fa-lg " :class="block?'':'hidden'"></button>
                    </div>
                    <div class="px-5">
                        <p class="text-gray-400 font-bold space-x-2">
                            <i class="fas fas fa-user-circle"></i>
                            <span class="text-blue-400"><span class="comic text-gray-400">{{ venue }}</span>
                                <span class="text-slate-400 underline serif"> {{ prendUser }} <span
                                        class="fas fa-hands-clapping animate-bounce" v-if="!userPen"></span></span> <span
                                    class="fas fa-pen-alt text-gray-400 fa-sm animate-pulse" v-if="userPen"></span></span>
                        </p>
                        <p class="text-sm py-2 font-bold" v-if="chance.length > 0">
                            <span class="fas fa-quote-left font-bold text-slate-800"></span>
                            {{ chance }}
                            <span class="fas fa-pencil fa-sm text-gray-400 animate-ping" v-if="penChance"></span>
                            <span class="fas fa-quote-right"></span>
                            <span class="underline text-blue-400 px-2">{{ auteur }} </span>
                            <span class="fas fa-pencil fa-sm text-gray-400 animate-ping" v-if="penAuteur"></span>
                        </p>
                        <div class="py-3 text-center" v-if="TitreHors.length > 0">
                            <p class="font-bold underline text-sky-400">{{ TitreHors }} </p>
                        </div>
                        <div class="" v-if="zodiac.length > 0">
                            <p class="indent-4 py-1 font-bold text-sm ">
                                {{ zodiac }}
                                <span class="fas fa-pencil fa-sm text-gray-400 animate-bounce" v-if="zoPen"></span>
                            </p>
                        </div>
                        <div class="py-2 " v-if="coleur.length>0">
                            <div class="text-left text-sm">
                                <div class="space-x-4">
                                    <span class="font-bold text-gray-400 underline">Travail</span>
                                    <span class="font-bold text-blue-400">{{ coleur[0].travail }} </span>
                                </div>
                                <div class="space-x-4">
                                    <span class="font-bold text-gray-400 underline">Amour</span>
                                    <span class="font-bold text-blue-400">{{ coleur[0].amour }} </span>
                                </div>
                                <div class="space-x-4">
                                    <span class="font-bold text-gray-400 underline">Sante</span>
                                    <span class="font-bold text-blue-400">{{ coleur[0].sante }} </span>
                                </div>
                                <div class="space-x-4">
                                    <span class="font-bold text-gray-400 underline">Amour</span>
                                    <span class="text-blue-400 font-bold">{{ coleur[0].amour }} </span>
                                </div>
                                <div class="space-x-4">
                                    <span class="font-bold text-gray-400 underline">Coleur</span>
                                    <span class=" text-blue-400 font-bold">{{ coleur[0].ravina }} </span>
                                </div>
                            </div>
                        </div>
                        <div class="py-2">
                            <p class="text-gray-400 font-bold comic text-sm" v-if="fine.length>0">
                                {{ fine }}
                                <span class="fas fa-pen-to-square fa-sm text-gray-400 animate-ping" v-if="penfine"></span>
                                <span class="fas fa-hands-praying fa-sm text-gray-400 animate-bounce" v-if="retro"></span>
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center items-center h-[50px] bg-gray-300 shadow-sm hover:shadow-md">
                <p class="text-gray-400 font-bold text-sm">Aucun donnée pour vous</p>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<script>
import Citation from "./Citation.json";
import Jour from "./Jour.json";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            titres: "",
            titresPen: false,
            diaryPen: false,
            diary: "",
            user: "",
            form: true,
            user: "",
            name: "",
            userPen: false,
            prendUser: "",
            anuler: true,
            textAffiche: false,
            venue: "",
            resultat: [],
            chance: "",
            penChance: false,
            auteur: "",
            penAuteur: false,
            TitreHors: "",
            zodiac: "",
            zoPen: false,
            coleur:[],
            fine:"",
            penfine:false,
            retro:false,
            outUser:"",
            outCite:"",
            outTitre:"",
            horout:"",
            zodi:"",
            finout:"",
            interUser:"",
            refac:"",
            interLine:"",
            interAuteur:"",
            interTime:"",
            interLong:"",
            interFin:"",
            block:false,
            amour:"",
            sante:"",


        }
    },
    methods: {
        espace(index)
        {
            this.resultat.splice(index,1);
        },
        close(event)
        {
            this.ressaye();
        },
        ressaye(event) {
            this.block=false;
            this.prendUser=""
            this.menu=""
            this.textAffiche = false;
            this.anuler = true;
            this.venue = "";
            this.chance = "";
            this.auteur = "";
            this.zodiac = "";
            this.TitreHors = "";
            this.coleur = [];
            this.fine="";
            clearTimeout(this.outUser);
            clearInterval(this.interUser);
            clearInterval(this.interFin);
            clearInterval(this.refac);
            clearInterval(this.interTime);
            clearInterval(this.interLong)
            clearInterval(this.interAuteur);
            clearInterval(this.interLine)
            clearTimeout(this.outCite);
            clearTimeout(this.outTitre);
            clearTimeout(this.horout);
            clearTimeout(this.finout);
        },
        ajouter(event) {
            const resultat = [];
            if (this.user.length > 0) {
                if (this.prendUser > 0) {
                    this.anuler = true;

                }
                else {

                    this.anuler = false;
                    let nombre = Math.floor(Math.random() * (Citation.length))
                    const cite = Citation.find(item => Citation.indexOf(item) === nombre);
                    let horIndex = Math.floor(Math.random() * (Jour.length) + 0);
                    const horoscope = Jour.find(item => Jour.indexOf(item) === horIndex);
                    this.textAffiche = true;
                    const relique = Citation;
                    const name = this.user;
                    let regex = this.user.toLowerCase();
                    const mahita  = this.resultat.find(item=>item.name.toLowerCase()===regex);
                    if(mahita)
                    {
                        Swal.fire({
                            title:"Nom déja pris mais, donne autre",
                            toast:true,
                            timerProgressBar:true,
                            position:"top-start",
                            showConfirmButton:false,
                            timer:600,
                        })

                    }else{
                    this.resultat.push({ name: name });
                    }
                    this.user = "";
                   
                    this.anuler = false;
                    const tonga = "Bienvenue a vous , Cher ..";
                    let indexBien = -1;
                    this.interUser = setInterval(() => {
                        indexBien++;
                        if (indexBien >= tonga.length) {
                            this.venue = tonga
                            clearInterval(this.interUser);
                            this.userPen = false;
                        }
                        else {
                            this.venue += tonga[indexBien];
                            this.userPen = true;
                        }
                    }, 150);
                    this.outUser = setTimeout(() => {
                        let IndexUser = -1;
                        this.refac = setInterval(() => {
                            IndexUser++;
                            if (IndexUser >= name.length) {
                                this.prendUser = name;
                                clearInterval(this.refac)
                                clearTimeout(this.outUser);
                                this.userPen = false;
                            }
                            else {
                                this.prendUser += name[IndexUser];
                                this.userPen = true;
                            }
                        }, 150);
                    }, (tonga.length * 150) + 100);
                    const text = cite.text;
                  
                    this.outCite = setTimeout(() => {
                        let indexText = -1;
                        this.interLine = setInterval(() => {
                            indexText++;
                            if (indexText >= text.length) {
                                this.chance = text;
                                clearInterval(this.interLine);
                                clearTimeout(this.outCite);
                                this.penChance = false;
                            }
                            else {
                                this.chance += text[indexText];
                                this.penChance = true;
                            }
                        }, 150);
                    }, (tonga.length * 150) + (name.length * 150) + 600);
                    const auteur = cite.auteur;
                   
                    this.outTitre = setTimeout(() => {
                        let indexAuteur = -1;
                        this.interAuteur = setInterval(() => {
                            indexAuteur++;
                            if (indexAuteur >= auteur.length) {
                                this.auteur = auteur;
                                clearTimeout(this.outTitre);
                                clearInterval(this.interAuteur);
                                this.penAuteur = false;
                            }
                            else {
                                this.auteur += auteur[indexAuteur];
                                this.penAuteur = true;
                            }
                        }, 150)
                    }, (tonga.length * 150) + (name.length * 150) + (cite.text.length * 150) + 600);
                    const time = "Votre Horscope a jourd'hui " + this.prendUser;
                    this.horout = setTimeout(() => {
                        let index = -1;
                        this.interTime = setInterval(() => {
                            index++;
                            if (index > time.length) {
                                this.TitreHors = time;
                                clearInterval(this.interTime);
                                clearTimeout(this.horout);
                            }
                            else {
                                this.TitreHors += time[index];
                            }
                        }, 150);
                    }, (tonga.length * 150) + (name.length * 150) + (cite.text.length * 150) + (auteur.length * 150) + 600);
                    let logeurText = (tonga.length * 150) + (name.length * 150) + (cite.text.length * 150) + (auteur.length * 150) + (time.length * 150) + 600;
                    const zodiac = horoscope.text;
                   
                    this.zodi = setTimeout(() => {
                        let zodiacIndex = -1
                        this.interLong = setInterval(() => {
                            zodiacIndex++;
                            if (zodiacIndex >= zodiac.length) {
                                this.zodiac = zodiac;
                                clearInterval(this.interLong);
                                clearTimeout(this.zodi);
                                this.zoPen = false;
                                this.retro=true;
                            }
                            else {
                                this.zodiac += zodiac[zodiacIndex];
                                this.zoPen = true;
                            }
                        }, 150);
                    }, logeurText);
                    const reset = setTimeout(() => {
                      
                       return this.coleur.push({ravina:horoscope.coleur,amour:horoscope.Amour,travail:horoscope.Travail,sante:horoscope.Sante});
                    }, logeurText + (zodiac.length*150)-600);
                    console.log(this.coleur);
                    const fin = "J'espere que vous besoin ça , a la prochaine !!";
                    this.finout = setTimeout(() => {
                        this.block = true;
                        let index = -1;
                        this.interFin = setInterval(() => {
                            index++;
                            if(index>=fin.length)
                            {
                                this.fine = fin;
                                clearInterval(this.interFin);
                                clearTimeout(this.finout);
                                this.penfine=false;
                            }
                            else{
                                this.fine +=fin[index];
                                this.penfine=true;
                            }
                        }, 150);
                    }, logeurText+(zodiac.length*160));
                   
                }
            }
            else {
                Swal.fire({
                    toast: true,
                    showConfirmButton: false,
                    title: "entre votre nom",
                    timerProgressBar: true,
                    timer: 800,
                    position: "top-end",
                    icon: "warning"
                })
                this.textAffiche = false;
            }
            event.stopPropagation();
        },
        ouvre() {
            setTimeout(() => {
                this.form = true;
            }, 1000)
        },
        ferme() {
            this.form = false;
        },
        titre() {

            let index = -1;
            let nombre = -1;
            const diary = " DIARY ";
            const bienvenue = "Bienvenue a vous sur ";
            const isany = bienvenue.split("");
            if (index >= bienvenue) {
                this.titres = bienvenue;
            }
            else {
                const interBien = setInterval(() => {
                    index++;
                    if (index >= bienvenue.length) {
                        this.titres = bienvenue;
                        this.titresPen = false;
                        clearInterval(interBien);
                    }
                    else {
                        const logo = this.titres += bienvenue[index];
                        this.titresPen = true;
                        this.anuler = false;
                        return { logo, index }
                    }
                }, 150)
            }
            if (nombre >= diary.length) {
                this.diary = diary;
            }
            else {
                setTimeout(() => {
                    const interDiar = setInterval(() => {
                        nombre++
                        if (nombre >= diary.length) {
                            this.diary = diary;
                            this.diaryPen = false;
                            this.anuler = true;
                            clearInterval(interDiar);
                        }
                        else {
                            this.diary += diary[nombre];
                            this.diaryPen = true;
                            this.anuler = false;
                            return { nombre }
                        }
                    }, 150);

                }, (bienvenue.length * 180) + 100)

            }


        },

    },
    mounted() {
        this.titre();
    }
}
</script>