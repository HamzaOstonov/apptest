<template>
  <div id="quiz">
    <div v-if="introStage">
      <h1>Welcome to the Quiz: {{ title }}</h1>
      <p>Some kind of text here. Blah blah.</p>

      <button @click="startQuiz">START!</button>
    </div>

    <div v-if="questionStage">
      <div
        v-for="(item, index) in savollar"
        v-bind:key="item.id"
        v-bind:index="index"
      >
        <Savol
          :question="item"
          :question-number="item.Savolnum"
          v-on:answer="handleAnswer"
        ></Savol>
      </div>
      <v-btn @click="submit" class="success mx-0 mt-3">Finish test!</v-btn>
    </div>
    <!-- https://abt.uz/ru/training/start -->
    <div v-if="resultsStage">
      You got {{ correct }} right out of {{ savollar.length }} questions. Your
      percentage is {{ perc }}%.
    </div>
  </div>
</template>

<script>
const quizData = "http://localhost:3000/GetKattaTest";
import myjson from "@/json/myjson.json";
import Savol from "@/components/Savol";
import { serverget } from "@/const";
import bcrypt from "bcryptjs";

export default {
  components: { Savol },
  data() {
    return {
      introStage: false,
      questionStage: false,
      resultsStage: false,
      //title:'',
      title: myjson.title,
      savollar: [],
      questions: myjson.questions,
      currentQuestion: 0,
      answers: [],
      correct: 0,
      perc: null,
    };
  },
  async created() {
    await serverget(quizData).then((res) => {
      if (res.Mavzu) {
        //normal
        if (res.Savollar != null) {
          //this.$store.commit("setclients", res.data);
          console.log(res.Savollar);
          this.savollar = res.Savollar;
        } else {
          console.log("Savollar bo`sh");
        }
      } else {
        //bo`sh
        console.log("ma`lumot kelmadi");
      }
    });
    //fetch(quizData)
    //fetch('/'+'myjson2.json',  {
    //  fetch(myjson2,  {
    //  headers : {
    //    'Content-Type': 'application/json',
    //    'Accept': 'application/json'
    //   }
    //
    //})
    //.then(res => res.json())
    //.then(res => res.text())
    //.then(res => {
    //  console.log("hamza "+res);
    console.log("12345");
    console.log(this.questions);
    //  this.title = res.title;
    //  this.questions = res.questions;
    this.introStage = true;
    //})
  },
  methods: {
    startQuiz() {
      console.log("1");
      this.introStage = false;
      this.questionStage = true;
      //console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    submit() {
      console.log("1111");

      let ar2 = this.savollar.filter((x) => x.Jav1 === "Ok");
      this.correct = ar2.length;

      this.questionStage = false;
      this.resultsStage = true;
    },
    handleAnswer(e) {
      console.log("answer event ftw", e);

      //let tjavob = this.savollar.find((x) => x.Savolnum === e.savol).Tugrijavob;
      let ar1 = this.savollar.find((x) => x.Savolnum === e.savol);
      //bcrypt.compare(req.body.password, user.password, function (err, res) {
      //bcrypt.compare("123", "$2a$10$HruD4Z5M65FNiJ.ypckxA..2FDGZG/h9wdyHNXQNZAE/yVJLzOjLO", function (err, res) { //ishladi
      bcrypt.compare(e.javob, ar1.Tugrijavob, function (err, res) {
        if (err) {
          console.log("handle error");
        }
        if (res) {
          // Send JWT
          console.log("javob tugri topildi");
          ar1.Jav1 = "Ok";
        } else {
          // response is OutgoingMessage object that server response http request
          console.log(" message: 'javoblar do not match'");
          ar1.Jav1 = "Xato";
        }
      });
    },
    handleResults() {
      console.log("handle results");
      this.questions.forEach((a, index) => {
        if (this.answers[index] === a.answer) this.correct++;
      });
      this.perc = ((this.correct / this.questions.length) * 100).toFixed(2);
      console.log(this.correct + " " + this.perc);
    },
  },
};
</script>
