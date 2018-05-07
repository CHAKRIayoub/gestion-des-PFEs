<template>
    <v-container >
    <v-layout row wrap>
    <v-flex pa-1 md6 xs12>
        <v-card>
            <v-card-title>Conversation</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div v-on:scroll="scrollFunction" id="myDiv" ref="myDiv" class="scrll" style="overflow: auto; max-height: 400px;" >
                <v-flex v-for="msg in items" :key="msg._id" >
                    <div v-bind:class="{'right' :msg.who}" >
                        <v-chip  v-bind:class="{'light-blue lighten-1' :msg.who}" >{{msg.message}}</v-chip>
                    </div><br><br>
                </v-flex>
                </div>
            </v-card-text>
            <v-card-actions>

                <v-text-field
                    solo label="Message"
                    v-model="message"
                ></v-text-field>
                <v-btn @click="send" fab color="success">
                    <v-icon>send</v-icon>
                </v-btn>
            
            </v-card-actions>
        </v-card>
        
    </v-flex>
    <v-flex pa-1 md6 xs12>
        <v-card>
            <v-card-title>Fichiers partagé</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list dense>

                    <v-list-tile v-for="file in filesc" :key="file._id" @click="redirectToFile(file.path)">
                        <v-list-tile-action>
                            <v-icon medium color="success" >far fa-file</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                            {{ file.path }} télechargé par {{ file.author }} 
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset ></v-divider>

                </v-list>

            </v-card-text>
            <v-card-actions>

                    <v-btn block color="success" @click="onClickUp" >
                    Upload file
                    <v-icon right dark>
                    cloud_upload
                    </v-icon>
                </v-btn>
                
                <input @change="onFileChanged" type="file" style="display:none" ref="file" >

            </v-card-actions>
        </v-card>
            </v-flex>
        </v-layout>
        
    </v-container>
</template>

<script> 

    import axios from 'axios';

    export default {
        
        data: ()=>({
            
            message: '',
            messages: [],
            chat:{},
            scrll: true, 
            len: 0,
            files:[]
           
        }), 

        computed:{

            filesc(){

                axios.get('http://localhost:9000/api/files/'+this.$route.params.idSujet).then((resp) => {

                    this.files = resp.data
                    
                }) 

                return this.files;

            },

            items(){

                axios.get('http://localhost:9000/api/messages/'+this.$route.params.idSujet).then((resp) => {
                    this.messages = resp.data
                })

                 if(this.messages.length !== this.len){
                    this.scrll = true
                    this.len = this.messages.length
                }

                return this.messages;
            }

        },

        watch:{

            messages(){
                if(this.scrll)
                    this.$refs.myDiv.scrollTop = this.$refs.myDiv.scrollHeight
            },

        },

        created () {

           
        
        },

        methods: {

            onFileChanged(event){

                var fl = this.$refs.file.files[0];
                let formData = new FormData();
                formData.append('sharedfile', fl);
                formData.append('sujet_id',this.$route.params.idSujet)
                formData.append('author',this.$store.getters.authUser.nom+' '+this.$store.getters.authUser.prenom)
                formData.append('who',true)
                axios.post( 'http://localhost:9000/api/uploadfile/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    ).then(function(resp){
                        console.log(resp.data)
                    })
                    .catch(function(){
                        console.log('FAILURE!!');
                    });

                console.log(fl) 
            },

            onClickUp(){
                this.$refs.file.click()
            },

            redirectToFile(str){

                window.open("http://localhost:9000/uploads/"+str); 

            },

            scrollFunction(){
                this.scrll = false
            },
           
            initialize() {

            },
            send(){

                axios.post('http://localhost:9000/api/messages/', {
                    sujet_id:  this.$route.params.idSujet,
                    message: this.message ,
                    who  : true ,
                }).then((response)=>{
                    console.log('yes')
                }).catch((error)=>{
                    console.log('no')
                })
            }

        }

    }

</script>

<style>



div.scrll::-webkit-scrollbar {
    width: 0.7em;
}
 
div.scrll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 1px rgba(0,0,0,0.3);

}
 
div.scrll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

</style>


