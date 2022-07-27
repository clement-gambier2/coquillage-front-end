<template>
    <v-container>
       
        <v-container>
        <h4>Available</h4>
        <DayNameComponent v-for="available in availablesPreview" :key="available._id" :available="available" />
        </v-container>
    
        <v-container>
        <v-btn color="#F2F2F2" elevation="2" :to="{ name: 'more'}" > Voir plus</v-btn>
        <v-btn color="" elevation="2" :to="{ name: 'names'}">Mes disponibilités</v-btn>
        </v-container>
        
        
        
        <ComingComponent/>
        
    </v-container>
</template>


<script>
    import API from '../api';
    import DayNameComponent from '../components/DayNameComponent.vue';
    import ComingComponent from '../components/ComingComponent.vue';

    
    export default {
        name: "HomeView",
        data() {
            return {
                availables: [],
                availablesPreview: [],
                uniqueDays: [],
                finalAvailable: [],
            };
        },
        async created() {
            let allAvailable = await API.getAllAvailable();
            let today = new Date().toLocaleString().slice(0,10);

            //Get all days
            let days = [];
            allAvailable.forEach((element) => {
                days.push(element.day);
            });

            //delete duplicate days
            days.forEach((element) => {
                if (!this.uniqueDays.includes(element)) {
                    this.uniqueDays.push(element);
                }
            });

            //Remove all the availables that are older than today
            this.uniqueDays.forEach(element => {
                if(element.slice(0,4) <= today.slice(6,10)){
                    if(element.slice(5,7) > today.slice(3,5)){ 
                        this.availables.push(element);
                    }
                    else if(element.slice(5,7) == today.slice(3,5)){
                        if(element.slice(8,10) >= today.slice(0,2)){
                            this.availables.push(element);
                        }   
                       
                    }
                }
            }); 

            //If two people are available on the same day            
            await this.availables.forEach((element) => {
                API.getPeopleByDay(element)
                .then((res) => {
                    let idTemp = [];
                    res.forEach((element) => {
                        idTemp.push(element.peopleId);
                    }); 
                let people = {
                    day: res[0].day,
                    peopleId: idTemp,
                }
                
                if(this.finalAvailable.length < 3){
                    this.availablesPreview.push(people);
                }
                this.finalAvailable.push(people);
                });
            });


                        
        },
        components: { DayNameComponent, ComingComponent }
    };
  
</script>