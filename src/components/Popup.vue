<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>
        <h2>Add a New Question-Yangi test savoli kiritish</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-textarea
            auto-grow
            v-model="content"
            label="Savol matni"
            prepend-icon="edit"
            :rules="inputRules"
          ></v-textarea>

          <v-textarea
            auto-grow
            v-model="javob"
            label="javob varianti"
            prepend-icon="edit"
            rows="2"
            :rules="inputRules"
          ></v-textarea>

          <v-btn tile small color="success">
            <v-icon dark> mdi-plus </v-icon>
            Javobni qushib quyish
          </v-btn>

          <v-radio-group label="" v-model="active">
            <v-radio
              v-for="(mcanswer, index) in javoblar"
              :key="index"
              name="active"
              :label="mcanswer.Javobtext"
              :value="mcanswer.Javobnum"
              @change="getValue(questionNumber, mcanswer.Javobnum)"
            >
            </v-radio>
          </v-radio-group>

          <v-spacer></v-spacer>

          <v-btn
            flat
            @click="submit"
            class="success mx-0 mt-3"
            :loading="loading"
            >Testni bazaga qushib quyish</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click.stop="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      javoblar: [{ Javobtext: "Javob number bir" }],
      javobnum: 1,
    };
  },
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>