<template>
  
  <div style="margin-top:50px" >
    
    <v-card class="transparent" >
      <v-card-title> 
        <h2>selectionez 3 sujet parmi ces sujets :</h2>
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
          
          <v-card v-bind:class="{'green accent-3' : sujet.selected, 'white' : !sujet.selected }" > 
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-bind:class="{'success' : sujet.selected}" @click="addSelcted(sujet)">
                <v-icon>check_circle</v-icon>Selectionner
              </v-btn>           
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout><br>
    </v-card><br><br>   

      <v-card pa-2 >
      <v-card-title> 
        <v-flex md5 sm5 xs12  >
          <h2>votre choix:</h2><br>
        </v-flex>
      </v-card-title>
      
      <v-flex ma-3  xl12 lg12 md12 sm12 xs12 v-for="sjt in selectedItemscomp" :key="sjt._id">
        <v-alert @input="delSelected(sjt)" dismissible  color="success" icon="check_circle" :value="true">
          {{sjt.titre}} 
        </v-alert> 
      </v-flex>
      <br> <br>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="send_choix" color="info" :disabled="!send_choix_btn" >
          <v-icon>send</v-icon>Ennvoyer les choix
        </v-btn>           
      </v-card-actions>
    </v-card>

<v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
       
      </v-card>
    </v-dialog>

      
    <v-dialog v-model="alert"  max-width="350">
      <v-card>
        <v-card-title class="headline"  >
          <v-icon size="40px" color="info" >help</v-icon>{{ mMessage.title }}               
        </v-card-title>
        <v-card-text>
              
        </v-card-text>  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="hideAlert()">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {

    data: () => ({

      colors:['green darken-1','light-green darken-1','lime darken-1','teal darken-1','cyan darken-1','light-blue darken-1','blue darken-1','indigo darken-1','deep-purple darken-1','blue-grey darken-1','brown darken-1'],
      dialog:true,
      search: '',
      mMessage: {title: '', body:''},
      dialog: false,
      alert: false,

      items: [],
      selectedItems: [],
      allitems: []
      
    }),

    watch:{ 
     
    },

    computed: {

      send_choix_btn(){

        if(this.selectedItems.length < 3 ) return false
        else return true

      },

      selectedItemscomp(){

        return this.selectedItems

      },

      randomColor(){

        return this.colors[Math.floor(Math.random() * this.colors.length)] 
      
      },

      sujets(){

          var self = this
          return this.allitems.filter(function(sujet){
            return (sujet.titre.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.description.toLowerCase().match(self.search.toLowerCase()) ||
              sujet.technologies.toLowerCase().match(self.search.toLowerCase())
            )
              
          })

      }

    },

    created () {
      
      this.initialize()
    
    },

    methods: {

      send_choix(){

        var schoices = []
        this.selectedItems.forEach((element,index) => {
          schoices.push(
            {sujet_id:element._id, order:index+1 }
          )
        });

        axios.post('http://localhost:9000/api/choix/'+this.$store.getters.authUser._id, {
          choices: schoices
        }).then((response)=>{
          this.mMessage.title = 'votre choix est enregistrer avec succée'
          this.alert = true
        }).catch((error)=>{
          this.mMessage.title = 'erreur'
          this.alert = true 
        })

      },

      hideAlert(){
        this.alert=false 
      },

      delSelected(item){ 

        this.selectedItems.splice(this.selectedItems.indexOf(item),1)
        this.allitems.find(x => x._id === item._id).selected = false
        
      },

      addSelcted(item){
        
        if(this.selectedItems.includes(item)){  

          this.selectedItems.splice(this.selectedItems.indexOf(item),1)
          this.allitems.find(x => x._id === item._id).selected = false

        }else{

          if(this.selectedItems.length < 3 ){ 

            item.i = this.selectedItems.length + 1
            this.selectedItems.push(item);
            this.allitems.find(x => x._id === item._id).selected = true

          }
          
          else{
            this.mMessage.title = 'vous avez depasser 3 choix'
            this.alert=true
          }
        
        }

      },
       
      initialize () {
        var choixs = []
        
        axios.get('http://localhost:9000/api/choix/'+this.$store.getters.authUser._id).then((res) => {

          choixs = res.data
         
        });
        
        axios.get('http://localhost:9000/api/student/'+this.$store.getters.authUser._id).then((res) => {
          
          
          
          axios.get('http://localhost:9000/api/sujetbyf/'+res.data.filiere_id).then((resp) => {
            

            
            resp.data.forEach(element=>{
              element.selected = false
            })

            resp.data.forEach(element => {
              
              choixs.forEach(item=>{
                if(item.sujet_id === element._id){
                  element.selected = true
                  this.selectedItems.push(element)
                }
                  
              })
              element.techs = element.technologies.split(',')
            });
            this.allitems = this.items = resp.data;
                        console.log(this.allitems)

          });
        });


        this.dialog = true

       
            
      }
      
    }
  
  }
</script>
