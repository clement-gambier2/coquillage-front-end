<template>
    <v-main>
        <!-- If we use the global variable when there will be the account system. -->
        <!-- <p>{{this.$name}}</p> -->
        <v-container>
            <p>Mes disponibilités</p>    
            <DayComponent v-for="available in availables" :key="available._id" :available="available" />
            
        </v-container>

        <v-divider></v-divider>

        <v-container>
            <h4>Ajouter une disponibilité</h4>

            <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
            
            <!-- <v-date-picker color="green lighten-1" v-model="available.day"></v-date-picker> -->
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
                available: {
                    day: '',
                    peopleId: ''
                }
            };
        },
        async created() {
            this.user = await this.$route.params.user
            this.availables = await API.getAvailableByPeopleId(this.user);
            
        },
        methods:{
            async submitForm(){                
                this.available.day = this.available.day + 'T00:00:00.000Z';
                this.available.peopleId = await this.$route.params.user;
                    
                const response = await API.addAvailable(this.available);
                this.$router.push({name: 'home', params:{message: response.message}});
                
            }
        },
        components: { DayComponent }
    };

</script>