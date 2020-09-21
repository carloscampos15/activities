<template>
  <div>
    <myNavigationDrawer></myNavigationDrawer>

    <myNavbar></myNavbar>

    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col class="text-center">hola mundo</v-col>
      </v-row>
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
      .then(() => {
      })
      .catch((err) => {
        that.$router.push("/");
      });
  },
};
</script>

<style scoped>
</style>