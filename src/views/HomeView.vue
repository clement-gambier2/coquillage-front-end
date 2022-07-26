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
                users: [],
                availables: [],
                availablesPreview: [],
                oldAvailables: [],
                today: '',
            };
        },
        async created() {
            this.users = await API.getAllUser();
            let allAvailable = await API.getAllAvailable();
            this.today = new Date().toLocaleString().slice(0,10);
            console.log(allAvailable.length);
        
            
            allAvailable.forEach(element => {
                console.log(element.day);
                if(element.day.slice(0,4) <= this.today.slice(6,10)){
                    
                    if(element.day.slice(5,7) >= this.today.slice(3,5)){
                        if(element.day.slice(8,10) >= this.today.slice(0,2)){
                            this.availables.push(element);
                        }
                        else{
                            this.oldAvailables.push(element);
                        }
                    }
                    else{
                        this.oldAvailables.push(element);
                    }
                }
                else{
                    this.oldAvailables.push(element);
                }
                
                



                // if(element.day < this.today){
                    
                //     
                // }
                // else{
                
                // }
            });
            this.availablesPreview = this.availables.slice(0,3);
        },
        components: { DayNameComponent, ComingComponent }
    };
  
</script>