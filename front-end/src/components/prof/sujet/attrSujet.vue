<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md8 sm8 offset-md2 offset-sm2 color="white" >
                <v-card>
                    <v-card-title><h1> Ajouter les Information du projet : </h1></v-card-title>
                    <v-card-text>
                        <v-form  v-model="valid" ref="form" lazy-validation>
                            
                            <v-dialog
                            ref="dialog"
                            persistent
                            v-model="modal"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="date">
                                <v-text-field
                                slot="activator"
                                :rules="[v => !!v || 'Date Obligatoire']"
                                label="date de soutenance"
                                v-model="date"
                                prepend-icon="event"
                                readonly
                                ></v-text-field>
                                <v-date-picker 
                                    v-bind:min="minDate()"
                                    v-bind:max="minDate('m')"
                                    color="green" 
                                    v-model="date" 
                                    scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog><br><br>

                            <v-menu
                                ref="menu"
                                lazy
                                :close-on-content-click="false"
                                v-model="menu2"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                max-width="290px"
                                min-width="290px"
                                :return-value.sync="time"
                            >
                                <v-text-field
                                :rules="[v => !!v || 'Date Obligatoire']"
                                slot="activator"
                                label="Picker in menu"
                                v-model="time"
                                prepend-icon="access_time"
                                readonly
                                ></v-text-field>
                                <v-time-picker v-model="time" @change="$refs.menu.save(time)"></v-time-picker>
                            </v-menu><br><br>



                            <v-select
                            v-model="jury"
                            label="jury"
                            :rules="[v => !!v || 'Obligatoire']"
                            chips
                            deletable-chips
                            tags
                            autocomplete
                            required
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
                                Attribuer
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import axios from 'axios';

    export default {

        data: () => ({
            
            modal: false,
            menu2: false,
            date: null,
            time: null,
            valid: '',
            jury: []
        
        }),

        created () {
        
        
        
        },
    
        computed: {
    
            validsend(){
                
                if (this.valid && this.time !== null && this.date !== null)
                    
                    return true
                
                else return false
                
            }

        },

        methods: {

            submit () {
            
                if (this.$refs.form.validate()) {

                    axios.post('http://localhost:9000/api/addprojet/'+ this.$route.params.idSujet, {
                        student_id:  this.$store.getters.getAttrUser ,
                    }).then((response)=>{
                        axios.post('http://localhost:9000/api/soutenance/',{
                            sujet_id: this.$route.params.idSujet,
                            date: this.date + ' ' + this.time,
                            jury: this.jury.toString()
                        }).then(()=>{
                            console.log('yes')
                            this.$router.push('/sujets');
                        }).catch((error)=>{
                            console.log('no s')
                        })
                                 
                    }).catch((error)=>{
                        console.log('no sujet')
                    })

                }
            
            },

            clear () {

                this.$refs.form.reset()

            },

            minDate (m){

                var d = new Date()
                var mx = 0
                if(m === 'm') mx = 1 

                var str = (d.getFullYear()+mx)+'-'
                var s = ''+(d.getMonth()+1)
                str += (s.length == 1) ? '0'+s+'-' : +s+'-';
                s = d.getDate()
                str += (s.length == 1) ? '0'+s : s
                return str
                
            }
    
        }
    
    }

</script>