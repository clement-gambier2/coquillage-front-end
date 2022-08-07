<template>
    
    <v-container>
        
        <v-card id="card">
            <v-card-title>{{available.day.slice(0,5)}}</v-card-title>
            
            <p v-for="username in user">{{username}}</p>
        </v-card>
        
        
    </v-container>
    

</template>




<script>
    import API from '../api';
    export default{
        props: ['available'],
        data() {
            return {
                user: []
                
            };
        },
        async created() {
            await this.available.peopleId.forEach((element) => {
                API.getUserByID(element)
                .then((res) => {
                    
                    this.user.push(res.name);
                })
            });
        },
    }
    

</script>


<style>
    #card{
        
    }
</style>