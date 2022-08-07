<template>
    <v-container>
        <NavComponent />
        <v-container>
            <h4>Disponibilités</h4>
            <DayNameComponent v-for="available in availablesPreview" :key="available._id" :available="available" />
        </v-container>
    
        <v-container id="buttons">
            <v-btn id="more" elevation="2" :to="{ name: 'more', params: {availables: finalAvailable }}" > Voir plus</v-btn>
            <v-btn id="dispos" elevation="2" :to="{ name: 'names'}">Mes disponibilités</v-btn>
        </v-container>
        
        
        
        <!-- <ComingComponent/> -->
        
    </v-container>
</template>


<script>
    import API from '../api';
    import DayNameComponent from '../components/DayNameComponent.vue';
    import ComingComponent from '../components/ComingComponent.vue';
    import NavComponent from '../components/NavComponent.vue';

    
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

            
            let corectedDays = [];
            this.availables.forEach(element => {
                let a = element.slice(0,8);
                let b = element.slice(13,23);
                console.log(element.slice(0,10));
                let tempDay;
                if(element.slice(0,10) == "2022-08-31"){
                    corectedDays.push("2022-09-01T00:00:00.000");
                }

                //TO DO : Find a solution to fix this problem !!!
                else if(element.slice(0,10) == "2022-09-30"){
                    corectedDays.push("2022-10-01T00:00:00.000");
                }
                else if(element.slice(0,10) == "2022-10-31"){
                    corectedDays.push("2022-11-01T00:00:00.000");
                }
                else if(element.slice(0,10) == "2022-11-30"){
                    corectedDays.push("2022-12-01T00:00:00.000");
                }
                else{
                    tempDay = parseInt(element.slice(8,10));
                    corectedDays.push(a +tempDay+ "T00"+ b);
                }
                
            });

            


            
            console.log(corectedDays);   
            //If two people are available on the same day            
            await corectedDays.forEach((element) => {
                API.getPeopleByDay(element)
                .then((res) => {
                    let idTemp = [];
                    console.log(res);
                    res.forEach((element) => {    
                        idTemp.push(element.peopleId);
                    });
                    //Get the right date, don't know why but planetscale return a date one day earlier than the one we want
                    let day = res[0].day;
                    let date = new Date(day);
                    let dayTemp = date.toLocaleString().slice(0,10);
                    let people = {
                        day: dayTemp,
                        peopleId: idTemp,
                    }
                
                    if(this.finalAvailable.length < 3){
                        this.availablesPreview.push(people);
                    }
                    this.finalAvailable.push(people);
                });
            });

                        
        },
        components: { DayNameComponent, ComingComponent, NavComponent }
    };
  
</script>


<style>
    #buttons{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #more{
        margin-top: 20px;
        width: 50%;
        background-color: #CBF3F0;
    }

    #dispos{
        margin-top: 20px;
        width: 50%;
        background-color: #2EC4B6;
    }
</style>