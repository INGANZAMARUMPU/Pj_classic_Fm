<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <div class="head">
          <ion-title>Pj classic FM</ion-title>

          <ion-icon :icon="chatbox"></ion-icon>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="back_image">
        <img src="../asset/pj_classic.jpg" alt="" width="200px" />
        <h3>Pj classic FM</h3>
      </div>
      <div class="img_bg">
        <div class="center">
          <div class="slt">
            <h2>{{ heureMessage }}</h2>
            <p>Vous écoutez Pj classic Fm</p>
          </div>

          <div class="play">
            <div class="btn">
              <ion-button @click="slickPlay" v-if="!playing"
                ><ion-icon :icon="play"></ion-icon
              ></ion-button>
              <ion-button v-else @click="slickPause"
                ><ion-icon :icon="pause"> </ion-icon>
              </ion-button>

              <audio
                src="http://streaming.shoutcast.com/pj-classic-fm"
                ref="radio"
              ></audio>
              <ion-button
                class="btn-record"
                @click="stopRecording()"
                v-if="isRecording"
              >
                <ion-icon :icon="stop"></ion-icon>
              </ion-button>
              <ion-button class="btn-record" @click="startRecording()" v-else>
                <ion-icon :icon="mic"></ion-icon>
              </ion-button>
            </div>

            <ion-range
              aria-label="Volume"
              :value="volume"
              @ionChange="onVolumeChange"
              :pin="false"
              :pin-formatter="pinFormatter"
            >
              <ion-icon :icon="volumeLow" slot="start"></ion-icon>
              <ion-icon :icon="volumeHigh" slot="end"></ion-icon>
            </ion-range>
          </div>
          <!-- <div class="payment">
            <form
              action="https://afripay.africa/checkout/index.php"
              method="post"
              id="afripayform"
              @submit.prevent="submitForm"
            >
              <input
                type="number"
                id="prix"
                v-model="montant"
                v-if="showInput"
              />
              <input type="hidden" name="amount" v-bind:value="montant" />
              <input type="hidden" name="currency" value="BIF" />
              <input type="hidden" name="comment" value="Order 122" />
              <input
                type="hidden"
                name="client_token"
                value="361348bf09eae0a84730d324d78051ea"
              />
              <input type="hidden" name="return_url" value="https://hogi.bi/" />
              <input
                type="hidden"
                name="app_id"
                value="361348bf09eae0a84730d324d78051ea"
              />
              <input type="hidden" name="app_secret" value="JDJ5JDEwJHdpWi5G" />
              <button v-if="!showInput" @click="showInput = true">
                Contribution
              </button>
              <button v-else type="submit">Payer</button>
            </form>
          </div> -->
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <img src="../asset/banner_hogi.jpeg" alt="" />
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import * as icons from "ionicons/icons";
import { MediaRecorder } from "@capacitor/core";
import axios from "axios";

export default {
  data() {
    return {
      message: "Bonjour!!!",
      playing: false,
      isRecording: false,
      volume: 50,
      recorder: null,
      audioChunks: [],
      encoding: "audio/ogg; codecs=opus",
      contactLink: "",
      montant: 500,
      showInput: false,
    };
  },
  setup() {
    return { ...icons, pinFormatter: null };
  },
  computed: {
    heureMessage() {
      const date = new Date();
      const heure = date.getHours();
      if (heure < 12) {
        return "Bonjour!!!";
      } else if (heure < 18) {
        return "Bon après-midi!";
      } else {
        return "Bonsoir!!!";
      }
    },
  },
  methods: {
    slickPause() {
      this.$refs.radio.pause();
      this.playing = false;
    },
    slickPlay() {
      this.$refs.radio.play();
      this.playing = true;
    },
    onVolumeChange(event) {
      this.volume = event.detail.value;
      this.$refs.radio.volume = this.volume / 100;
    },

    async startRecording() {
      this.isRecording = true;
      const constraints = { audio: true };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.mediaRecorder = new MediaRecorder(this.stream);

      this.mediaRecorder.ondataavailable = (e) => {
        this.chunks.push(e.data);
      };

      this.mediaRecorder.stop = () => {
        const audioBlob = new Blob(this.chunks, {
          type: "audio/ogg; codecs=opus",
        });
        this.chunks = [];
        const audioURL = URL.createObjectURL(audioBlob);
        const clipName = prompt("Enter a name for your sound clip");
        this.clips.push({ audioURL, name: clipName });
      };

      this.mediaRecorder.start();
      console.log("Recording started", this.isRecording);
    },
    stopRecording() {
      try {
        if (this.mediaRecorder && this.isRecording) {
          this.mediaRecorder.stop();
          this.isRecording = false; // Mettre à jour l'état d'enregistrement
          console.log("Recording stopped");
        } else {
          console.log("No recording to stop");
        }
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    },
    contact() {
      axios
        .get("http://192.168.1.46:8000/api/Radio/")
        .then((response) => {
          this.contactLink = response.data.results;
          console.log(response.data.results);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    },
    postAfripay() {
      let data = { subcategory: this.subcategory.id };
      axios
        .post(this.url + /subscriptions/, data, this.headers)
        .then((response) => {
          if (response.data.validated_by != null) {
            this.makeToast(
              "Success",
              "Votre inscription a été effectuée. Merci!"
            );
            this.$store.state.subscriptions.push(response.data);
            this.close();
          } else {
            afripayform.elements["client_token"].value = response.data.id;
            afripayform.elements[
              "return_url"
            ].value = `${this.$store.state.url}/subscriptions/${response.data.id}/validate/`;
            //afripayform.submit()
          }
        })
        .catch((error) => {
          this.displayErrorOrRefreshToken(error, this.askSubscription);
          this.is_sending = false;
        });
    },
    submitForm() {
      document.getElementById("afripayform").submit();
    },
  },

  mounted() {
    this.contact();
  },
};
</script>

<style scoped>
ion-toolbar {
  --padding: O;
  --background: #fff;
  color: #000;
}
ion-title {
  padding-left: 65px;
 
}
.list-md {
  --padding: 0;
}
ion-toolbar img {
  width: max-content;
  height: max-content;
}

.img_bg {
  width: 100%;
  position: fixed;
  background-image: linear-gradient(#fffbfbd5 0%, rgba(247, 246, 246, 0.9) 0%),
    url(../asset/background_radio.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  box-shadow: 10px 5px 5px black;
  height: 100vh;
}

ion-range {
  width: 300px;
  --bar-background: #c9caca;
  --bar-background-active: rgb(238, 31, 31);
  --bar-height: 4px;
  --bar-border-radius: 8px;
  --knob-background: rgb(238, 31, 31);
  --knob-size: 25px;
  --pin-background: #e4dada;
  --pin-color: rgb(238, 31, 31);
}
ion-range ion-icon {
  color: #494848;
}
.head {
  display: flex;
  margin-right: 5px;
}
.head ion-icon {
  width: 20px;
  color: #474747;
}
.back_image {
  height: 180px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), transparent),
    url("../asset/pj_classic.jpg");
  background-size: cover;
  /* background-attachment: fixed; */
  background-position: center;
  text-align: center;
}
.back_image img {
  width: 70px;
  margin-top: 20px;
  opacity: 1;
}
h3 {
  color: #fff;
  font-size: 25px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: none;
}
.slt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 30px;

  filter: none;
}
.play {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  filter: none;
}
.btn {
  display: flex;
  filter: none;
  margin-bottom: 20px;
}
.btn-record {
  margin-left: 80px;
  filter: none;
}
ion-button {
  --color: #fff;
  --background: rgb(238, 31, 31);
}
.btn ion-button {
  height: 50px;
  --border-radius: 90%;
  --color: #fff;
  --background: rgb(238, 31, 31);
}
input[type="number"] {
  width: 180px;
  background: #fff;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-right: 10px;
}

button {
  text-transform: uppercase;
  padding: 10px 20px;
  background-color: #eb445a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #eb445a;
}
</style>
