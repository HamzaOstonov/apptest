<template>
 <div id="quiz">
  <div v-if="introStage">
    <h1>Welcome to the Quiz: {{title}}</h1>
    <p>
      Some kind of text here. Blah blah.
    </p>
    
    <button @click="startQuiz">START!</button>
  </div>
  
  <div v-if="questionStage">
    <Question 
              :question="questions[currentQuestion]"
              v-on:answer="handleAnswer"
              :question-number="currentQuestion+1"
    ></Question>
  </div>
  
  <div v-if="resultsStage">
    You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
  </div>
  
</div>
</template>

<script>
//const quizData = 'https://api.myjson.com/bins/ahn1p';
import myjson from "@/json/myjson.json";
import Question from "@/components/Question";
export default {
  components: { Question },
 data() {
    return {
      introStage:false,
      questionStage:false,
      resultsStage:false,
      //title:'',
      title:myjson.title,
      //questions:[],
      questions:myjson.questions,
      currentQuestion:0,
      answers:[],
      correct:0,
      perc:null
    }
  },
  created() {
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
  methods:{
    startQuiz() {
      console.log("1");
      this.introStage = false;
      this.questionStage = true;
      //console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    handleAnswer(e) {
      console.log('answer event ftw',e);
      this.answers[this.currentQuestion]=e.answer;
      if((this.currentQuestion+1) === this.questions.length) {
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      console.log('handle results');
      this.questions.forEach((a, index) => {
        if(this.answers[index] === a.answer) this.correct++;        
      });
      this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
      console.log(this.correct+' '+this.perc);
    }
  }
};
</script>
