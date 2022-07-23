<template>
    <v-main>
        <h2>More</h2>
        <DayNameComponent v-for="available in availables" :key="available._id" :available="available" />
    </v-main>
</template>



<script>
    import API from "../api";
    import DayNameComponent from "../components/DayNameComponent.vue";
    export default {
        name:"MoreView",
        data(){
            return{
                availables: [],
            };
        },
        async created(){
            this.availables = await API.getAllAvailable();
        },
        components: { DayNameComponent }
        
    }
</script>