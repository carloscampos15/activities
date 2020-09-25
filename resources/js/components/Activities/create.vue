<template>
  <div>
    <myNavigationDrawer></myNavigationDrawer>

    <myNavbar></myNavbar>

    <v-container fluid>
      <v-card class="elevation-5 mt-7 mb-15">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Crear calendario</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field label="Nombre" type="text" outlined dense required></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn block color="success" class="text-capitalize">Guardar</v-btn>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn block color="primary" class="text-capitalize" to="/activities">Cancelar</v-btn>
              </v-col>
            </v-row>

            <v-sheet>
              <v-calendar
                :weekdays="weekday"
                :weekday-format="myDayFormat"
                :short-weekdays="false"
                ref="calendar"
                color="primary"
                type="week"
              ></v-calendar>
            </v-sheet>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

    <myFooter></myFooter>
  </div>
</template>

<script>
import { USER_REQUEST } from "./../../store/actions/user";
import myFooter from "./../Layouts/Footer";
import myNavbar from "./../Layouts/NavBar";
import myNavigationDrawer from "./../Layouts/NavigationDrawer";

export default {
  name: "Activities.create",
  props: {},
  components: { myFooter, myNavbar, myNavigationDrawer },
  data: () => ({
    weekday: [1, 2, 3, 4, 5, 6, 0],
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
  }),
  methods: {
    myDayFormat(i) {
    //   console.log(i);
      return(this.days[i.weekday])
    },
  },
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

<style>
.v-calendar-daily__head {
  margin-right: 0 !important;
}

.v-calendar-daily__scroll-area {
  overflow-y: hidden !important;
}

.v-calendar-daily_head-day-label {
  display: none;
}
</style>