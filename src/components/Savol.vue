<template>
  <div>
    <strong>Question {{ questionNumber }}:</strong><br />
    <strong>{{ question.Savoltext }} </strong>

    <div v-for="(mcanswer, index) in question.Javoblar" :key="index">
      <div>
        <label>{{ mcanswer.Javobtext }}</label>
      </div>
      <button @click="submitAnswer">{{ mcanswer.Javobnum }}</button>
      <br />
    </div>

    <v-list>
      <div v-for="(mcanswer, index) in question.Javoblar" :key="index">
        <v-list-item>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="mcanswer.Javobtext" />
        </v-list-item>
      </div>
    </v-list>

     <v-card
    max-width="400"
  >

    <v-list
    >
      <v-subheader>Shoping List:</v-subheader>

      <v-list-item-group multiple v-model="settings" >
        <v-list-item
          v-for="(item, index) in question.Javoblar"
          :key="index"
          v-model="item.finished"
        >
          <template v-slot:default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{ finished: item.finished }">{{
                item.Javobtext
              }}</v-list-item-title>
              <v-list-item-subtitle :class="{ finished: item.finished }">{{
                item.Javobnum
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-card>
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
</style>