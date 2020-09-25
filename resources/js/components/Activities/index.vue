<template>
  <div>
    <myNavigationDrawer></myNavigationDrawer>

    <myNavbar></myNavbar>

    <v-container>
      <v-card class="elevation-5 mt-10">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Mis calendarios de actividades</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn :to="{ name: 'Activities.create' }" v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Crear</span>
          </v-tooltip>
        </v-toolbar>
        <v-data-table></v-data-table>
      </v-card>
    </v-container>

    <myFooter></myFooter>
  </div>
</template>

<script>
import { USER_REQUEST } from "./../../store/actions/user";
import { mapGetters, mapState } from "vuex";
import myFooter from "./../Layouts/Footer";
import myNavbar from "./../Layouts/NavBar";
import myNavigationDrawer from "./../Layouts/NavigationDrawer";

export default {
  name: "Home",
  props: {},
  components: { myFooter, myNavbar, myNavigationDrawer },
  data: () => ({}),
  methods: {},
  computed: {},
  beforeMount() {
    var that = this;
    that.$store
      .dispatch(USER_REQUEST)
      .then(() => {})
      .catch((err) => {
        that.$router.push("/");
      });
  },
};
</script>

<style scoped>
</style>