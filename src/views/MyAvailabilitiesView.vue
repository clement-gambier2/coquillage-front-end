<template>
    <v-main>
        
        <v-btn :to="{ name: 'names'}"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-container v-if="hasDate">
            <h3>{{name.name}}</h3>
            <h4>Mes disponibilités</h4>    
            <DayComponent v-for="available in availables" :key="available._id" :available="available" />
            
        </v-container>
        <v-container v-else>
            <h3>{{name.name}}</h3>
            <h4>Mes disponibilités</h4>    
            <p>Aucune disponibillités</p>
        </v-container>
        

        <v-divider></v-divider>

        <v-container>
            <h4>Ajouter une disponibilité</h4>

            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            <input type="date" v-model="available.day" />
            <v-btn type="submit" class="mt-3" color="primary">Ajouter une disponibilité</v-btn>
           </v-form>

          
              
          

        </v-container> 

    </v-main>
    
    
</template>


<script>
    import API from '../api';
    import DayComponent from '../components/DayComponent.vue';
    export default {
        name: "MyAvailabilitiesView",
        data() {
            return {
                availables: [],
                name:'',
                hasDate : false,
                available: {
                    day: '',
                    peopleId: ''
                }
            };
        },
        async created() {
            this.user = await this.$route.params.user
            let days = await API.getAvailableByPeopleId(this.user);
            if(days.length > 0){                
                this.hasDate = true;
                days.forEach(element => {
                    let a = element.day.slice(0,8);
                    let b = element.day.slice(13,23);
                    if(element.day.slice(0,10) == "2022-08-31"){
                        let date = {
                            id: element.id,
                            day: "2022-09-01T00:00:00.000",
                        }
                        this.availables.push(date);
                    }

                    //TO DO : Find a solution to fix this problem !!!
                    else if(element.day.slice(0,10) == "2022-09-30"){
                        let date = {
                            id: element.id,
                            day: "2022-10-01T00:00:00.000",
                        }
                        this.availables.push(date);
                    }
                    else if(element.day.slice(0,10) == "2022-10-31"){
                        let date = {
                            id: element.id,
                            day: "2022-11-01T00:00:00.000",
                        }
                        this.availables.push(date);
                    }
                    else if(element.day.slice(0,10) == "2022-11-30"){
                        let date = {
                            id: element.id,
                            day: "2022-12-01T00:00:00.000",
                        }
                        this.availables.push(date);
                    }
                    else{
                        let tempDay = parseInt(element.day.slice(8,10));
                        tempDay = a +tempDay+ "T00"+ b;
                        let date = {
                            id: element.id,
                            day: tempDay,
                        }
                        this.availables.push(date);
                    }
                });
                console.log(this.availables);
            }
            this.name = await API.getUserByID(this.user);
            
            
        },
        methods:{
            async submitForm(){                
                this.available.day = this.available.day + 'T00:00:00.000';
                console.log(this.available);
                this.available.peopleId = await this.$route.params.user;
                const response = await API.addAvailable(this.available);
                this.$router.push({name: 'names', params:{message: response.message}});
            }
        },
        components: { DayComponent }
    };

</script>