<template>

 <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex md4 sm6 offset-md4 offset-sm3 color="white" >
          <v-form  v-model="valid" ref="form" lazy-validation>
            
            <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
            ></v-text-field>

            <v-text-field
            v-model="password"
            required
            :rules="passwordRules"
            :append-icon="e3 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e3 = !e3)"
            class="input-group--focused"
            :type="e3 ? 'password' : 'text'"
            ></v-text-field>
            
            <v-btn 
            @click="clear"
            dark
            color="blue"
            >
            rest
            </v-btn>

             <v-btn
            @click="submit"
            :disabled="!valid"
            color="success"
            >
            login
            </v-btn>

        </v-form>

        <v-alert type="error" dismissible v-model="alert" transition="slide-y-transition" >
            Email ou Mot de passe incorrecte  
        </v-alert>


      </v-flex>
    </v-layout>
 </v-container>

</template>

<script>
import axios from 'axios';

export default {

    data: () => ({
      alert: false,
      valid: true,
      password: '',
      e3: true,
      passwordRules: [
        v => !!v || 'mot de passe obligatoire',
        v => (v && v.length >= 6) || 'le mot de passe doit contenir plus de 5 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || ' E-mail obligatoire',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail invalide'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('http://localhost:9000/api/users/checkuser', {
            password: this.password,
            email: this.email,
          }).then((response) => {
            var user = response.data;
            var menu = []
            if(user){
                var id_menu = (user.role == "professor")?1:2;
                var to = (id_menu==1)?"/student":"/professor"

                axios.get('http://localhost:9000/api/menu/'+id_menu).then((res) => {
                    menu = res.data
                    var menu_str = "["
                    menu.forEach(item => {
                        menu_str += JSON.stringify(item) +",";
                    });
                    menu_str = menu_str.slice(0, -1)
                    menu_str += "]"

                    // var jsn =  JSON.parse(menu_str);
                    // console.log(jsn[0])

                    this.$store.commit('setUser',user)
                    this.$store.commit('setMenu',menu_str)
                    this.$router.push(to)

                })

                

              
            }else{
              this.alert = true;
            }
            
          })
          .catch((error) => {
            console.log(error);
          });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  
}
</script>
