<template>
    <v-container>
        <p>Just print the data from the API</p>
        <div>
        <h4>Users</h4>
        <li v-for="user in users" :key="user._id">{{user.name}}</li>
        </div>
        <v-container>
        <h4>Available</h4>
        <DayNameComponent v-for="available in availablesPreview" :key="available._id" :available="available" />
        </v-container>
    
        <v-container>
        <v-btn color="#F2F2F2" elevation="2" :to="{ name: 'more'}" > Voir plus</v-btn>
        <v-btn color="" elevation="2">Mes disponibilités</v-btn>
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
        };
    },
    async created() {
        this.users = await API.getAllUser();
        this.availables = await API.getAllAvailable();
        this.availablesPreview = this.availables.slice(0,3);
    },
    components: { DayNameComponent, ComingComponent }
};
  
</script>