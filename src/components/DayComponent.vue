<template>
    
    <v-container>
        
        <v-card>
            <v-card-title>{{available.day.slice(8,10)}} / {{available.day.slice(5,7)}}</v-card-title>
            <v-btn @click="deleteAvailable(available.id)">Delete</v-btn>
        </v-card>
        
        
    </v-container>
    

</template>




<script>
    import API from '../api';
    export default{
        props: ['available'],
        methods:{
            async created() {
                console.log(this.available);
            },
            async deleteAvailable(id){
                const response = await API.deleteAvailable(id);
                this.$router.push({name: 'home', params:{message: response.message}});
            }
        }
        
        
    }
    

</script>