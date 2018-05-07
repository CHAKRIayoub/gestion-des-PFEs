<template>
    <div style="margin-top:50px" >
        <v-flex md5 offset-md5 sm5 offset-sm5 xs12  >
            <h1>Liste des Sujets </h1><br>
        </v-flex>
        
        <v-spacer></v-spacer> 
                        
		<v-btn color="success" dark to="/sujets/add" ><v-icon>fas fa-plus-circle</v-icon> &nbsp; Ajouter Un Sujet </v-btn>


      <br><br>
     <v-card >
    <v-card-title> 
    	<v-spacer></v-spacer>
        <v-text-field
        append-icon="fas fa-search"
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
  rows-per-page-text="sujets par page"
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
         &nbsp; 
			<v-btn  icon class="mx-0" @click="editItem(props.item)">
				<v-icon color="primary">fas fa-pencil-alt</v-icon>
			</v-btn> &nbsp; 
			<v-btn  icon  class="mx-0" @click="showconfirmDel(props.item)">
				<v-icon color="error">fas fa-trash-alt</v-icon>
			</v-btn> &nbsp; 
      <v-btn  icon  class="mx-0" @click="showSujet(props.item._id)" >
				<v-icon color="success">fas fa-users</v-icon>
			</v-btn> &nbsp; 
			</td>
		</template>

		<template slot="no-data">
      <v-flex offset-md6>
				<v-icon>fas fa-spinner fa-spin</v-icon>
      </v-flex>
		</template>

		<v-alert slot="no-results" :value="true" color="error" icon="warning">
			Your search for "{{ search }}" found no results.
		</v-alert>
            
  </v-data-table>

  
</v-card>




     <v-dialog v-model="delalert"  max-width="350">
      <v-card>
        <v-card-title class="headline" style="color: red;" >
          <v-icon size="40px" color="error" >fas fa-trash-alt</v-icon>{{ mMessage.title }}               
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
      pagination: {},
      chargement: true,
      colors:['light-blue', 'teal', 'blue', 'indigo', 'lime', 'green', 'light-green', 'amber', 'orange', 'deep-orange'],
      deleteItem: true,
      mMessage: {title: '', body:''},
      delalert: false,
	    str: '',
      search: '',
      dialog: false,
      headers: [
        {text: 'Titre', value: 'titre'},
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

      showSujet(id){
        this.$router.push('sujets/show/'+id);
      },

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
