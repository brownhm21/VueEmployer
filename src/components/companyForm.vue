
<template>
    <v-app>
        <Sidebar :drawer="drawer" />
        <Topbar @drawerEvent="drawer = !drawer" />
        <v-container class="py-8 px-6" fluid>

          
                <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent
                    src="https://picsum.photos/1920/1080?random" fade-img-on-scroll
                    scroll-target="#scrolling-techniques-4"
                    
                    >
                    <template v-slot:img="{ props }">
                        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
                    </template>

                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Company Infos</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>

                    <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon color="yellow" v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        
                    </v-menu>

                    <template v-slot:extension>
                        <v-tabs align-with-title>
                            <v-tab href="#Infos">Infos</v-tab>

                            <v-tab-item value="Infos">
                                <CompanyAdd />
                            </v-tab-item>

                            <v-tab href="#Edit">Edit</v-tab>

                            <v-tab-item value="Edit">
                                <CompanyAdd />
                            </v-tab-item>

                            
                        </v-tabs>
                    </template>
                </v-app-bar>
                <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" max-height="600">
                    <v-container style="height: 1000px;"></v-container>
                </v-sheet>
          



        </v-container>

    </v-app>

</template>
  


<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import CompanyAdd from "@/components/CompanyAdd.vue";

export default {
    name: 'companyForm',
    data() {
        return {
            drawer: null,

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },


    components: {
        Topbar,
        Sidebar,
        CompanyAdd
    }
};
</script>