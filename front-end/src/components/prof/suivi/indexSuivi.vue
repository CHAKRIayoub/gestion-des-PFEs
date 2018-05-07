<template>
  
  <div style="margin-top:50px" >
    
    <v-card class="transparent" >
      <v-card-title> 
        <h2>Liste des Sujet Attribué:</h2>
    	  <v-spacer></v-spacer>
          <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
          ></v-text-field>
      </v-card-title>
      <v-layout v-for="sujet in sujets" :key="sujet._id"><br>
        <v-flex offset-md1 offset-xs1 offset-sm1 offset-lg1 xs10 sm10 md10 lg10 xl10><br>
          <v-card> 
            <v-card-title primary-title>
              <v-flex md5 >
                <h3 class="headline mb-0">{{ sujet.titre }}</h3><br>
                <p>{{ sujet.description }}</p>
              </v-flex>
              <v-flex offset-md1 md5>
                Technologies : <br>
                <v-chip  text-color="white" v-for="tech in sujet.techs" :key="tech" v-bind:class="randomColor" >
                  {{ tech }}
                </v-chip>
              </v-flex> 
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap>
                <v-flex md3 lg3 mb-2> <v-icon>fas fa-user-circle</v-icon> {{sujet.name}} </v-flex>
                <v-flex md9 lg9><v-icon>fas fa-at</v-icon> {{sujet.mail}}  </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="suivi(sujet._id)" class="primary" >
                <v-icon>fas fa-clipboard-check</v-icon> &nbsp; suiver  
              </v-btn>           
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout><br>
    </v-card><br><br>   

      
   
  </div>
</template>

<script>

  import axios from 'axios';

  export default {

    data: () => ({

      colors:['green darken-1','light-green darken-1','lime darken-1','teal darken-1','cyan darken-1','light-blue darken-1','blue darken-1','indigo darken-1','deep-purple darken-1','blue-grey darken-1','brown darken-1'],
      search: '',
      allitems: [],
      
    }),

    watch:{ 
     
    },

    computed: {

      randomColor(){

        return this.colors[Math.floor(Math.random() * this.colors.length)] 
      
      },

      sujets(){

          var self = this
          return this.allitems.filter(function(sujet){
            return (sujet.titre.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.description.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.name.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.mail.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.technologies.toLowerCase().match(self.search.toLowerCase())
            )
              
          })

      }

    },

    created () {
      
      this.initialize()
    
    },

    methods: {

      suivi(id){
        this.$router.push('/sujets/suivi/'+ id)
      },
  
      initialize () {
       
        axios.get('http://localhost:9000/api/sujetAtt/'+this.$store.getters.authUser._id).then((resp) => {
            

                resp.data.forEach(element => {
                  
                  var item = {

                    _id: element._id,
                    titre: element.titre,
                    description: element.description ,
                    technologies:element.technologies ,
                    filiere_id:element.filiere_id ,  
                    professor_id:element.professor_id ,
                    student_id:element.student_id

                  }

                item.techs = element.technologies.split(',')
                axios.get('http://localhost:9000/api/studentById/'+element.student_id).then((respo) => {
                  axios.get('http://localhost:9000/api/user/'+respo.data.user_id).then((respon) => {
                    item.name = respon.data.nom + " " +respon.data.prenom
                    item.mail =  respon.data.email
                    this.allitems.push(item)
                  })
                })
            });
            

        });
            
      }
      
    }
  
  }
</script>
