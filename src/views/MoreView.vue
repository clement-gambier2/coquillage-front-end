<template>
    <v-main>
        <h2>More</h2>
        <DayNameComponent v-for="available in finalAvailable" :key="available._id" :available="available" />
        
    </v-main>
</template>



<script>
    import API from '../api';
    import DayNameComponent from '../components/DayNameComponent.vue';
    
    export default {
        name: "HomeView",
        data() {
            return {
                availables: [],
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
                this.finalAvailable.push(people);
                });
            });


                        
        },
        components: { DayNameComponent }
    };
  
</script>