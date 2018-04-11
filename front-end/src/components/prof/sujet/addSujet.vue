<template>
 <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex md8 sm8 offset-md2 offset-sm2 color="white" >
          <v-card>
              <v-card-title><h1> Ajouter Un nouveau Sujet : </h1></v-card-title>

                <v-card-text>

          <v-form  v-model="valid" ref="form" lazy-validation>
            
            <v-text-field
            label="Titre"
            v-model="titre"
            :rules="titreRules"
            required
            ></v-text-field><br><br>

            <v-text-field
            label="Description"
            multi-line
            v-model="description"
            :rules="descriptionRules"
            required
            ></v-text-field><br><br>

            <v-select
            v-model="selectedTech"
            label="Technologies"
            :rules="[v => !!v || 'item required']"
            chips
            tags
            deletable-chips
            autocomplete
            required
            ></v-select><br><br>

            <v-select
            v-model="selectedFiliere"
            label="Filiere"
            :rules="[v => !!v || 'item required']"
            :items="itemsFiliere"
            required
            return-object
            item-text="libelle"
            ></v-select><br><br>

            
            <v-btn 
            @click="clear"
            dark
            color="blue"
            >
            Annuler
            </v-btn>

             <v-btn
            @click="submit"
            :disabled="!validsend"
            color="success"
            >
            Ajouter
            </v-btn>

        </v-form>

                </v-card-text>
          </v-card>

      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="350">
      <v-card   >
        <v-card-title class="headline" style="color: green;" >
            
                     <v-icon size="40px" color="success" >check_circle</v-icon>{{ mMessage.title }}
               
             <!-- {{ mMessage.title }} -->
        </v-card-title>
        <v-card-text>
            <v-flex style="background:#4caf50; width:100% " >
                
            </v-flex>  
        </v-card-text>  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn   flat="flat" @click.native="redirecto()">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 </v-container>
</template>

<script>

import axios from 'axios';

export default {

    data: () => ({
        dialog : false,
        mMessage: {title: '', body:''},
        itemsTechnologies: ['Programming','Design','Vue','Vuetify'],
        selectedTech:[],
        itemsFiliere: [],
        selectedFiliere: {},
        valid: true,
        titre:'',
        titreRules: [
            v => !!v || 'Titre obligatoire',
            v => (v && v.length >= 6) || 'le Titre doit contenir plus de 5 characters'
        ],
        description :'',
        descriptionRules: [
            v => !!v || 'Titre obligatoire',
            v => (v && v.length >= 10) || 'la description doit contenir plus de 10 characters'
        ],
        technologies: ''
    
    }),

    created () {
      this.initialize()
    },
    computed: {
        validsend(){
            
            if (this.valid && this.selectedFiliere._id !== "" 
                && this.selectedFiliere._id !== null 
                && typeof(this.selectedFiliere._id) !== 'undefined')
                
                return true
            
            else return false
            
        }
    },

    methods: {

        initialize() {
            axios.get('http://localhost:9000/api/filiere/').then((res) => {
              res.data.forEach(element => {
                  this.itemsFiliere.push(element)
              });
            })
        },

        redirecto(){
            this.$router.push('/sujets') 
        },

        submit () {
            if (this.$refs.form.validate()) {
                axios.post('http://localhost:9000/api/sujets/', {
                    titre: this.titre ,
                    description: this.description ,
                    technologies  : this.selectedTech.toString() ,
                    filiere_id:  this.selectedFiliere._id ,
                    professor_id: this.$store.getters.authUser
                }).then((response)=>{
                    this.mMessage.title = 'Sujet Ajouté Avec Succée'
                    this.dialog = true
                }).catch((error)=>{
                    console.log('no')
                })
            }
        },

        clear () {
            this.$refs.form.reset()
        }
    }
  
}
</script>
