<template>
  <ion-app>
    <ion-router-outlet id="main-content" />
    <ion-menu content-id="main-content">
   <div class="container" @click="closemenus">
    <div class="profile">
      <div class="img">
        <img src="./asset/pj_classic.jpg" alt="">
      </div>
      <div class="title">
        <h4>Pj Classic FM</h4>
        <!-- <p>Hi!!</p> -->
      </div>
    </div>
    
    <div class="menu" @click="closemenus" >
      <ion-list lines="none">
        <hr>
        <h4>Contact</h4>
        <ion-item button routerLink="">
          <ion-icon :icon="call"></ion-icon>
          <!-- <ion-label><a :href="contactLink.whatsapp_link">Contact Us</a></ion-label> -->
          <ion-label>Contact Us</ion-label>
        </ion-item>
      </ion-list>
     <!-- </div> -->
      <ion-list lines="none">
        <hr>
        <h4>We are social</h4>
        <ion-item button routerLink="">
          <ion-icon :icon="logoFacebook">{{  }}</ion-icon>
          <!-- <ion-label><a :href="contactLink.facebook_link">Facebook</a></ion-label> -->
          <ion-label><a href="https://web.facebook.com/pjclassicfm/?_rdc=1&_rdr">Facebook</a></ion-label>
        </ion-item>
        <ion-item button routerLink="">
          <ion-icon :icon="logoYoutube"></ion-icon>
          <ion-label><a href="https://www.youtube.com/@pjclassicmedia150">Youtube</a></ion-label>
        </ion-item>
        <ion-item button routerLink="">
          <ion-icon :icon="logoInstagram"></ion-icon>
          <!-- <ion-label><a :href="contactLink.instagram_link">Instagram</a></ion-label> -->
          <ion-label><a href="https://www.instagram.com/pjclassicfm/">Instagram</a></ion-label>
        </ion-item>
        <ion-item button routerLink="">
          <ion-icon :icon="globe"></ion-icon>
          <!-- <ion-label><a :href="contactLink.youtube_link" -->
    <!-- onclick="window.open(this.href, '_blank'); return false;">Website</a></ion-label> -->
          <ion-label><a href="https://www.pjclassic.com/">Website</a></ion-label>
        </ion-item>
      </ion-list>
      
      <ion-list lines="none">
        <hr>
        <ion-item button routerLink="/Propos">
          <ion-icon :icon="people"></ion-icon>
          <ion-label>About Us</ion-label>
        </ion-item>
      </ion-list>
    </div>
   </div>
    </ion-menu>
    
  </ion-app>
</template>

<script>

import * as icons from "ionicons/icons";
import { menuController } from '@ionic/vue';
import axios from "axios";



export default{
  name:'app',
  components:{
     
  },
  setup() {
    return { ...icons,};
  },
  data(){
    return{
      show: false,
      contactLink: []
    }
  },
  methods:{
    closemenus(event){
      console.log('change')
      menuController.close();
    },
    contact() {
      axios.get("http://192.168.1.46:8000/api/Radio/").then((response) => {
        this.contactLink = response.data[0]
        console.log('contact results', this.contactLink)
      }).catch((error)=>{
        console.log("error:",error);
      });
    }, 
},
mounted() {
    this.contact();
  },
}
</script>
<style scoped>
 ion-modal {
    --height: 50%;
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: rgb(14 116 144);
    --color: white;
  }
ion-item-divider{
  --min-height: 0;
}
ion-item{
  --min-height: 0;
  margin-bottom: 5px;
}
.profile{
  margin: 20px 15px 5px 20px ;
  display: flex;
  justify-content: space-evenly;
  color: #000; 
}
.img {
  width: 150px; /* Ajustez la taille en fonction de vos besoins */
  /* Assurez-vous que l'image occupe pleinement son espace */
  object-fit: cover;
  /* Si nécessaire, arrondissez les bords pour un meilleur rendu */
  border-radius: 50%;
}
.img img{
  width: 100%; /* L'image prendra toute la largeur de son conteneur */
  height: auto;
  
}
.menu h4{
  margin-left: 23px;
  margin-bottom: 10px;
  color: #ccc;
}
ion-list {
  padding: 0;
}
hr{
  color: #807c7c;
  border-width: 0.5px;
}
ion-icon{
/* display: flex; */
margin-right: 30px;
/* color: #e9e3e3; */
}
ion-label a{
  text-decoration: none;
  color: #222222;
}
</style>
