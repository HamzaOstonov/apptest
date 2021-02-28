<template>
  <div>
    <h4>Register</h4>
    <v-form>
      <v-text-field
        label="Name"
        v-model="name"
        required 
        autofocus                       
        ></v-text-field>

      <v-text-field
        label="E-Mail Address"
        v-model="email"
        required 
        ></v-text-field>

 <v-text-field
        label="Password"
        v-model="password"
        type="password"
        required 
        ></v-text-field>
     
      <v-text-field
        label="Confirm Password"
        v-model="password_confirmation"
        type="password"
        required 
        ></v-text-field>


      <v-select
          v-model="is_admin"
          :items="is_admin_items"
          menu-props="auto"
          hide-details
          label="Is this an administrator account?"
          single-line
        ></v-select>
<v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="handleSubmit"
    >
      Register
    </v-btn>

     

      <div v-if="err_log != ''">
        <input id="input_err" type="text" v-model="err_log" />
      </div>
    </v-form>
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
  props: ["nextUrl"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
      err_log: "",
      is_admin_items: ['No', 'Yes'],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let url = "http://localhost:3000/register";
        if (this.is_admin != null || this.is_admin == 1)
          url = "http://localhost:3000/register-admin";

        /*this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                    .then(response => {
                        sessionStorage.setItem('user',JSON.stringify(response.data.user))
                        sessionStorage.setItem('jwt',response.data.token)

                        if (sessionStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
*/
        serverpost(url, {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin,
          nickname: this.email,
        })
          .then((res) => {
              console.log("res");
             
             console.log(res);

            if (!res) {
              console.log(res);
            if (!res.error) {
              sessionStorage.setItem("user", JSON.stringify(res.user));
              sessionStorage.setItem("jwt", res.token);
              if (sessionStorage.getItem("jwt") != null) {
                this.$store.commit("retrieveToken", res.token);
                this.$store.commit("forceReLoadMenu");
                this.$emit("loggedIn");
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  this.$router.push("/");
                }
              }
            } else {
              console.log(res.error);
              this.err_log = res.error;
            }
            } else {
              console.log("serverdan javob bush keldi");
              this.err_log="serverdan javob bush keldi";
            }
          })
          .catch((error) => {
            console.log(error);
            this.err_log = error;
          });
      } else {
        this.password = "";
        this.passwordConfirm = "";

        return alert("Passwords do not match");
      }
    },
  },
};
</script>
