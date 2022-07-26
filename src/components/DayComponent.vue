<template>
    
    <v-container>
        
        <v-card>
            <v-card-title>{{available.day.slice(8,10)}} / {{available.day.slice(5,7)}}</v-card-title>
        </v-card>
        
        
    </v-container>
    

</template>




<script>
    import API from '../api';
    export default{
        props: ['available'],
        
        
    }
    

</script>