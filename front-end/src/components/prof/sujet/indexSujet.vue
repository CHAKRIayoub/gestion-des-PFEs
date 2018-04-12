<template>
    <div style="margin-top:50px" >
        <v-flex md5 offset-md5 sm5 offset-sm5 xs12  >
            <h1  >Liste des Sujets </h1><br>
        </v-flex>
        
        <v-spacer></v-spacer> 
                        
		<v-btn color="success" dark to="/sujets/add" ><v-icon>add</v-icon> Ajouter Un Sujet </v-btn>


      <br><br>
     <v-card >
    <v-card-title> 
    	<v-spacer></v-spacer>
        <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      	></v-text-field>
    </v-card-title>

    <v-data-table 
	:headers="headers"
	:items="items"
	:search="search"
	hide-actions
	class="elevation-1"
    >
		<template slot="items" slot-scope="props">
			<td class="text-xs-left">{{ props.item.titre }}</td>
			<td class="text-xs-left">{{ props.item.description }}</td>
			<!-- <td class="text-xs-left">{{ props.item.technologies }}</td> -->
      <td>
        <v-chip  text-color="white" v-for="tech in props.item.technologies" :key="tech" v-bind:class="randomColor" >
          {{ tech }}
        </v-chip>
      </td>
			<td class="text-xs-left">{{ getF(props.item.filiere_id) }}</td>
			<td class="justify-center layout px-0">
			<v-btn  icon class="mx-0" @click="editItem(props.item)">
				<v-icon color="primary">edit</v-icon>
			</v-btn>
			<v-btn  icon  class="mx-0" @click="showconfirmDel(props.item)">
				<v-icon color="error">delete</v-icon>
			</v-btn>
			</td>
		</template>

		<template slot="no-data">
			<v-alert :value="true" color="error" icon="warning">
				Sorry, nothing to display here :(
			</v-alert>
		</template>

		<v-alert slot="no-results" :value="true" color="error" icon="warning">
			Your search for "{{ search }}" found no results.
		</v-alert>
            
        </v-data-table>
     </v-card>

     <v-dialog v-model="delalert"  max-width="350">
      <v-card   >
        <v-card-title class="headline" style="color: red;" >
            
                     <v-icon size="40px" color="error" >delete</v-icon>{{ mMessage.title }}
               
             <!-- {{ mMessage.title }} -->
        </v-card-title>
        <v-card-text>
            <v-flex style="background:#4caf50; width:100% " >
                
            </v-flex>  
        </v-card-text>  
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn   flat="flat" @click.native="delalert=false">annuler</v-btn>
          <v-btn   flat="flat" @click.native="deleteItem=!deleteItem">supprimer</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import axios from 'axios';

export default {

    data: () => ({
      colors:['light-blue', 'teal', 'blue', 'indigo', 'lime', 'green', 'light-green', 'amber', 'orange', 'deep-orange'],
      deleteItem: true,
      mMessage: {title: '', body:''},
      delalert: false,
	    str: '',
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Titre',
          sortable: false,
          value: 'titre'
        },
        { text: 'Description', value: 'description' },
        { text: 'Technologies', value: 'technologies' },
        { text: 'Filiere', value: 'filiere' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      delItem: {
        _id: '',
        titre: '',
        description: '',
        technologies: '',
        filiere: '',
      }
    }),

    watch:{ 
      deleteItem(query){
          
          axios.delete('http://localhost:9000/api/sujets/'+ this.delItem._id ).then((res)=>{
              console.log(res)
          }).catch((error)=>{
              console.log(error)
          })

          const index = this.items.indexOf(this.delItem )
          this.items.splice(index, 1)  
          this.delalert = false;
      }
    },

    computed: {
     randomColor(){
       return this.colors[Math.floor(Math.random() * this.colors.length)] 
     }
    },

    created () {
      this.initialize()
    },

    methods: {

      getF(id){
          axios.get('http://localhost:9000/api/filiere/'+id).then((res) => {
			      this.str = res.data.libelle
          })
		  return this.str;

      },
       
      initialize () {
        axios.get('http://localhost:9000/api/sujets/'+this.$store.getters.authUser._id).then((res) => {
            this.items = res.data;
            this.items.forEach(element => {
              element.technologies = element.technologies.split(',')
            });
        });
      },

      showconfirmDel(item){
          this.mMessage.title = "voulez vous vraiment supprimer ce Sujet ?"
          this.delalert = true
          this.delItem = item
      },

	  editItem (item) {
		  this.$router.push('sujets/edit/'+item._id);
      }
    }
  
}
</script>
