<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            slot="start"
            fill="clear"
            @click="$router.go(-1)"
            v-if="$route.path !== '/accueil'"
          >
            <ion-icon :icon="arrowBack"></ion-icon
          ></ion-button>
        </ion-buttons>
        <div class="head">
          <ion-title>A propos de nous</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
     
      <ion-card>
        <h2>
          Ijwi ririmba
        </h2>
        <p>
           Bienvenue sur les ondes enchanteresses de PJClassic F.M,
          la station qui donne vie à vos souvenirs musicaux les plus chers.
          Plongez dans l'atmosphère rétro où chaque chanson raconte une histoire
          et chaque note réveille des émotions intemporelles. PJClassic F.M est
          votre passage direct vers l'âge d'or de la musique, avec une sélection
          exquise des plus grands classiques qui ont résisté à l'épreuve du
          temps. Que vous soyez un passionné de rock des années 70, un amoureux
          de la soul des années 60, ou un nostalgique des ballades intemporelles
          des années 80, nous avons ce qu'il vous faut
        </p>
       
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import * as icons from "ionicons/icons";
export default {
  setup() {
    return { ...icons };
  },
};
</script>

<style scoped>
ion-toolbar{
--background: rgb(238, 31, 31);
}
ion-card {
   display: flex; 
   flex-direction: column;
   align-items: center; 
   justify-content: center; 
   margin: 10px 5px 10px 5px;  
  text-align: center;
  padding: 5px;
}


</style>
