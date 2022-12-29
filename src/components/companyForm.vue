
   <template>
    <v-app>
        <Sidebar :drawer="drawer" />
        <Topbar @drawerEvent="drawer = !drawer" />
        <v-container class="py-8 px-6" fluid>
           
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-4"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
  
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Company Infos</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
       
  
        
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab>Infos</v-tab>
  
            <v-tab>Edit</v-tab>
  
          </v-tabs>
        </template>
      </v-app-bar>
      
 

        </v-container>

    </v-app>

</template>
  


<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";

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
  }
};
</script>