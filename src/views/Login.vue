<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit" @click="handleSubmit">Login</button>
      </div>

      <div v-if="err_log != ''">
        <input id="input_err" type="text" v-model="err_log" />
      </div>
    </form>
  </div>
</template>

<script>
import {
  //  serverget,
  //  deletes,
  serverpost, //,
  //serverput,
  //serverdel //hamza test git
} from "@/const";

export default {
  data() {
    return {
      email: "",
      password: "",
      err_log: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        /*this.$http
          .post("http://localhost:3000/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin == 1) {
                  this.$router.push("admin");
                } else {
                  this.$router.push("dashboard");
                }
              }
            }
          })
          .catch(function (error) {
            console.error(error.response);
          });*/

        serverpost("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        })
          .then((res) => {
            if (!res.error) {
              let is_admin = res.user.is_admin;
              sessionStorage.setItem("user", JSON.stringify(res.user));
              sessionStorage.setItem("jwt", res.token);
              if (sessionStorage.getItem("jwt") != null) {
                this.$store.commit("retrieveToken", res.token);
                this.$store.commit("forceReLoadMenu");
                this.$emit("loggedIn");
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  if (is_admin == 1) {
                    this.$router.push("admin");
                  } else {
                    this.$router.push("home");
                  }
                }
              }
            } else {
              console.error(res.error);
              this.err_log = res.error;
            }
          })
          .catch((error) => {
            console.error(error);
            this.err_log = error;
          });
      }
    },
  },
};
</script>
