<template>
  <div id="quiz">
    <div>
      <h1>Welcome to test editing</h1>
      <p>Some kind of text here. Blah blah.</p>
      <v-btn color="accent" large @click.stop="showScheduleForm=true">new test</v-btn>   
      <Popup :visible="showScheduleForm" @close="showScheduleForm=false" />
    </div>

   
  </div>
</template>

<script>
import Popup from '@/components/Popup'
export default {
  components: { Popup },

  data() {
    return {
      introStage: false,
      questionStage: false,
      resultsStage: false,
      //title:'',
      savollar: [],
      currentQuestion: 0,
      answers: [],
      correct: 0,
      perc: null,
       showScheduleForm: false,

    };
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
  methods: {
    startQuiz() {
      console.log("1");
     
      //console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    submit() {
      console.log("1111");

     
    },
    handleAnswer(e) {
      console.log("answer event ftw", e);

     
    },
    handleResults() {
      console.log("handle results");
     
    },
  },
};
</script>
