<template>
  <div>
    <strong>Question {{ questionNumber }}:</strong><br />
    <strong>{{ question.Savoltext }} </strong>

      <div v-for="(mcanswer, index) in question.Javoblar" :key="index" class="divjavob">
        <div class="divjavobcheck">
          <input type="checkbox" value="Daniel" v-model="namesThatRhyme"/>
        </div>
        <div class="divjavobtext">
          {{mcanswer.Javobnum}}
          {{mcanswer.Javobtext}}
        </div>
      </div>

  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Savol",
  data() {
    return {
      answer: "",
      defaultColumns: [
        {
          value: "column1",
          text: "Column 1",
        },
        {
          value: "column2",
          text: "Column 2",
        },
        {
          value: "column3",
          text: "Column 3",
        },
      ],
      selectedColumns: [
        {
          value: "column2",
          text: "Column 2",
        },
      ],
    };
  },
  props: ["question", "question-number"],
  methods: {
    submitAnswer: function () {
      this.$emit("answer", { answer: this.answer });
      this.answer = null;
    },
  },
};
</script>

<style >
.finished {
  text-decoration: line-through;
}
.v-list::-webkit-scrollbar-thumb {
  background-color: coral;
}
.divjavob {
  position: relative;
  display: block;
  width: 100%;
  border-bottom: 1px solid rgb(202, 202, 202);
  cursor: pointer;
}
.divjavobcheck {
  position: absolute;
}
.divjavobtext{
  text-align: left;
      margin: 0 0 10px 30px;
}
</style>