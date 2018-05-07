<template>
    <v-container grid-list-xl text-xs-center>
        <v-card> 
            <v-card-title>
                <v-flex md10  sm10  xs12  >
                    <h1>Sujet : {{ sujet.titre }} </h1><br>
                </v-flex>
            </v-card-title>

            <v-card-text>
                <v-tabs icons-and-text centered dark color="cyan">
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    
                    <v-tab href="#tab-tech">
                    Technologies
                    <v-icon>fas fa-cogs</v-icon>
                    </v-tab>
                    
                    <v-tab href="#tab-desc">
                    Description
                    <v-icon>fas fa-align-left</v-icon>
                    </v-tab>
                    
                    <v-tab href="#tab-flir">
                    Filiere
                    <v-icon>fas fa-archive</v-icon>
                    </v-tab>
                    
                    <v-tab-item id="tab-tech">
                        <v-card flat>
                            <v-card-text>
                                <v-chip  text-color="white" v-for="tech in sujet.technologies" :key="tech" v-bind:class="randomColor" >
                                    <h3>{{ tech }}</h3>
                                </v-chip>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item id="tab-desc">
                        <v-card flat>
                            <v-card-text>
                                <h3>{{ sujet.description }}</h3>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item id="tab-flir">
                        <v-card flat>
                            <v-card-text>
                                <h3>{{ sujet.filiere.libelle }}</h3>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions></v-card-actions>
        </v-card><br><br>

        <v-card >
            <v-card-title> 
                <h2>Liste des Candidats </h2><br>
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
                class="elevation-1"
                item-key="_id"
            >
                <template slot="items" slot-scope="props">
                    
                    <tr @click="props.expanded = !props.expanded" >
                        <td class="text-xs-left">{{ props.item.order }}</td>
                        <td class="text-xs-left">{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.cne }}</td>
                        <td class="text-xs-left">
                            <v-btn color="teal" dark @click="attribute(props.item._id)" >
                                <v-icon >fas fa-handshake</v-icon>&nbsp; Attribuer
                            </v-btn>
                        </td>
                    </tr>
                </template>

                <template slot="expand" slot-scope="props">
                    <v-card flat>
                        <v-card-text>
                            N° CIN : <b> {{ props.item.cni }} </b> <br>
                            Email : <b> {{ props.item.mail }} </b> <br>
                        </v-card-text>
                    </v-card>
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

        <v-dialog v-model="modalert"  max-width="350">
            <v-card>
                <v-card-title class="headline" style="color: blue;">
                    <v-icon size="40px" color="info" >help</v-icon>{{ mMessage.title }}
                </v-card-title>
                <v-card-text>
                    <v-flex style="background:#4caf50;" ></v-flex>  
                </v-card-text>  
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   flat="flat" @click.native="modalert=false">annuler</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

    import axios from 'axios';

    export default {
        
        data: ()=>({
            pagination: {},
            headers: [
                {text: 'N° Choix', value: 'order'},
                {text: 'NOM', value: 'nom'},
                {text: 'CNE', value: 'cne' },
                {text: 'Actions', value: 'name', sortable: false }
            ],
            search: '',
            colors:['light-blue', 'teal', 'blue', 'indigo', 'lime', 'green', 'light-green', 'amber', 'orange', 'deep-orange'],
            mMessage: {title:''},
            modalert: false,
            items: [],
            sujet:{
                titre: '',
                description: '',
                technologies: [],
                filiere: {} 
            },

        }),

        computed:{

            randomColor(){
            
                return this.colors[Math.floor(Math.random() * this.colors.length)] 
            
            },

        },

        watch:{

        },

        created () {

            this.initialize()
        
        },

        methods: {

            attribute(id){
                console.log(id)
                this.$store.commit('setAttrUser',id)
                this.$router.push('/sujets/attr/'+ this.$route.params.idSujet)

            },
           
            initialize() {

                var itemsFiliere = [], idSujet = undefined

                axios.get('http://localhost:9000/api/filiere/').then((res) => {
                    
                    itemsFiliere = res.data
                    
                })

                axios.get('http://localhost:9000/api/sujet/'+ this.$route.params.idSujet).then((res) => {
    
                    this.sujetall = res.data
                    this.sujet._id = res.data._id
                    this.sujet.titre = res.data.titre
                    this.sujet.description = res.data.description
                    this.sujet.technologies = res.data.technologies.split(',')
			        this.sujet.filiere = itemsFiliere.find(o => o._id === res.data.filiere_id );
                
                    axios.get('http://localhost:9000/api/choixs/'+res.data._id).then((resp) => {
                        
                        var listChoix = resp.data
                        var item = {}
                        listChoix.forEach(element => {

                            item.order = element.order
                            axios.get('http://localhost:9000/api/student/'+element.student_id).then((respo) => {
                    
                                item.cne = respo.data.cne
                                item.cni = respo.data.cni
                                item._id = respo.data._id
                                
                                axios.get('http://localhost:9000/api/user/'+respo.data.user_id).then((respon) => {
                                
                                    item.name = respon.data.nom + " " +respon.data.prenom
                                    item.mail =  respon.data.email
                                    
                                    this.items.push(item)
                                
                                })

                            })

                        });    
                    
                    })
                
                })

            }

        }

    }

</script>
