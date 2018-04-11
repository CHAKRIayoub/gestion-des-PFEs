<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 sm8 offset-md2 offset-sm2 color="white" >
                <v-card>
                    <v-card-title><h1> Modifier un Sujet : </h1></v-card-title>
                    <v-card-text>
                        <v-form  v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                            label="Titre"
                            v-model="sujet.titre"
                            :rules="titreRules"
                            required
                            ></v-text-field><br><br>

                            <v-text-field
                            label="Description"
                            multi-line
                            v-model="sujet.description"
                            :rules="descriptionRules"
                            required
                            ></v-text-field><br><br>

                            <v-select
                            label="Technologies"
                            :rules="[v => !!v || 'item required']"
                            v-model="sujet.technologies"
                            chips
                            tags
                            deletable-chips
                            autocomplete
                            required
                            ></v-select><br><br>

                            <v-select
                            label="Filiere"
                            :rules="[v => !!v || 'item required']"
                            :items="itemsFiliere"
                            v-model="sujet.filiere"
                            required
                            return-object
                            item-text="libelle"
                            ></v-select><br><br>

                    
                            <v-btn 
                            @click="$router.push('/sujets')"
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
                            Modifier
                            </v-btn>

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
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
                    <v-btn   flat="flat" @click.native="modItem=!modItem">modifier</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

    import axios from 'axios';

    export default {
        
        data: ()=>({
            modItem: true,
            mMessage: {title:''},
            modalert: false,
            sujet:{
                titre: '',
                description: '',
                technologies: [],
                filiere: {} 
            },
            itemsFiliere: [],
            titreRules: [
                v => !!v || 'Titre obligatoire',
                v => (v && v.length >= 6) || 'le Titre doit contenir plus de 5 characters'
            ],
            descriptionRules: [
                v => !!v || 'Titre obligatoire',
                v => (v && v.length >= 10) || 'la description doit contenir plus de 10 characters'
            ],
            valid: true,

        }),

        computed:{

            validsend(){
            
                if (this.valid && this.sujet.filiere._id !== "" 
                    && this.sujet.filiere._id !== null 
                    && typeof(this.sujet.filiere._id) !== 'undefined')
                    
                    return true
                
                else return false
            
            }
        },

        watch:{

            modItem(query){

                this.modalert = false;
                axios.put('http://localhost:9000/api/sujets/'+ this.$route.params.idSujet, {
                    titre: this.sujet.titre ,
                    description: this.sujet.description ,
                    technologies  : this.sujet.technologies.toString() ,
                    filiere_id:  this.sujet.filiere._id ,
                }).then((response)=>{
                    this.$router.push('/sujets') 
                }).catch((error)=>{
                    console.log('no')
                })
            }
        },

        created () {
            this.initialize()
        },

        methods: {

            initialize() {

                axios.get('http://localhost:9000/api/filiere/').then((res) => {
                    
                        this.itemsFiliere = res.data
                    
                })

                axios.get('http://localhost:9000/api/sujet/'+ this.$route.params.idSujet).then((res) => {
                    this.sujet.titre = res.data.titre
                    this.sujet.description = res.data.description
                    this.sujet.technologies = res.data.technologies.split(',')
			        this.sujet.filiere = this.itemsFiliere.find(o => o._id === res.data.filiere_id );
                })
            },

            redirecto(){
                this.$router.push('/sujets')
            },

            clear () {
                this.$refs.form.reset()
            },

            submit () {
                if (this.$refs.form.validate()) {
                    this.modalert = true
                    this.mMessage.title = "Voulez vous vraiment modifier ce Sujet ?"
                }
            }

        }

    }
</script>
