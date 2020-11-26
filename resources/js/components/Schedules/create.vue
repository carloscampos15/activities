<template>
  <div>
    <myNavigationDrawer></myNavigationDrawer>

    <myNavbar></myNavbar>

    <v-container fluid>
      <v-card class="elevation-5 mt-7">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Crear calendario</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="dialog = true" v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Crear tarea</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-row no-gutters>
              <v-col class="content-calendar" cols="12" sm="9">
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
              </v-col>

              <v-col cols="12" sm="3" class="pr-3 pl-3">
                <div class="content-tasks">
                  <Activity
                    v-for="(activity, i) in activities"
                    v-bind:key="i"
                    :activity="activity"
                    v-on:editActivity="editActivity"
                    v-on:deleteActivity="deleteActivity"
                    v-on:addToCalendar="addToCalendar"
                  ></Activity>
                </div>
                <v-divider></v-divider>
                <div class="buttons-content ml-1 mb-1">
                  <div class="mb-6">
                    <h3 class="creditos-total">Total creditos:</h3>
                    <h3 class="creditos-total float-md-right">
                      {{ getTotalCredits }}
                    </h3>
                  </div>
                  <v-row>
                    <v-col cols="12" sm="6" class="text-center">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="mx-2"
                            fab
                            dark
                            color="success"
                          >
                            <v-icon dark> mdi-check </v-icon>
                          </v-btn>
                        </template>
                        <span>Guardar cambios</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="12" sm="6" class="text-center">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="mx-2"
                            fab
                            dark
                            color="error"
                            to="/"
                          >
                            <v-icon dark> mdi-window-close </v-icon>
                          </v-btn>
                        </template>
                        <span>Cancelar</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="headline"> Crear actividad </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre"
                    v-model="activity.name"
                    :error-messages="nameErrors"
                    @input="$v.activity.name.$touch()"
                    @blur="$v.activity.name.$touch()"
                    autocomplete="off"
                    outlined
                    dense
                    required
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Numero de creditos"
                    v-model="activity.credits"
                    type="number"
                    autocomplete="off"
                    outlined
                    dense
                    required
                    rounded
                    min="0"
                    max="16"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Horas"
                    v-model="activity.time"
                    :error-messages="timeErrors"
                    @input="$v.activity.time.$touch()"
                    @blur="$v.activity.time.$touch()"
                    autocomplete="off"
                    type="number"
                    outlined
                    dense
                    required
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" cols="12" md="12">
                  Seleccionar color de actividad
                  <v-color-picker
                    class="custom-picker"
                    v-model="activity.color"
                    :swatches="swatches"
                    autocomplete="off"
                    disabled
                    hide-canvas
                    hide-inputs
                    hide-mode-switch
                    show-swatches
                    swatches-max-height="119"
                  ></v-color-picker>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              color="green darken-1"
              @click="saveActivity"
              text
            >
              Aceptar
            </v-btn>

            <v-btn
              class="text-capitalize"
              color="red darken-1"
              @click="dialog = false"
              text
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="600px">
        <v-card>
          <v-card-title class="headline"> Editar actividad </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre"
                    v-model="activity.name"
                    :error-messages="nameErrors"
                    @input="$v.activity.name.$touch()"
                    @blur="$v.activity.name.$touch()"
                    autocomplete="off"
                    outlined
                    dense
                    required
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Numero de creditos"
                    v-model="activity.credits"
                    type="number"
                    autocomplete="off"
                    outlined
                    dense
                    required
                    rounded
                    min="0"
                    max="16"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Horas"
                    v-model="activity.time"
                    :error-messages="timeErrors"
                    @input="$v.activity.time.$touch()"
                    @blur="$v.activity.time.$touch()"
                    autocomplete="off"
                    type="number"
                    outlined
                    dense
                    required
                    rounded
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" cols="12" md="12">
                  Seleccionar color de actividad
                  <v-color-picker
                    class="custom-picker"
                    v-model="activity.color"
                    :swatches="swatches"
                    autocomplete="off"
                    disabled
                    hide-canvas
                    hide-inputs
                    hide-mode-switch
                    show-swatches
                    swatches-max-height="119"
                  ></v-color-picker>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              color="green darken-1"
              @click="saveEditActivity"
              text
            >
              Aceptar
            </v-btn>

            <v-btn
              class="text-capitalize"
              color="red darken-1"
              @click="dialog2 = false"
              text
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" max-width="600px">
        <v-card>
          <v-card-title class="headline"> Asignar actividad </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-row>
                <v-col cols="5">
                  <v-select
                    :items="days"
                    label="Seleccionar dia"
                    solo
                  ></v-select>
                </v-col>
                <v-col>
                  <vue-timepicker></vue-timepicker>
                </v-col>
                <v-col>
                  <vue-timepicker></vue-timepicker>
                </v-col>
              </v-row>
            </v-form>
            <br /><br /><br />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize" color="green darken-1" text>
              Aceptar
            </v-btn>

            <v-btn
              class="text-capitalize"
              color="red darken-1"
              @click="dialog3 = false"
              text
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { USER_REQUEST } from "./../../store/actions/user";
import myNavbar from "./../Layouts/NavBar";
import myNavigationDrawer from "./../Layouts/NavigationDrawer";
import Activity from "./../Activity/index";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import VueTimepicker from "vue2-timepicker";

export default {
  name: "Schedules.create",
  mixins: [validationMixin],
  props: {},
  components: { myNavbar, myNavigationDrawer, Activity, VueTimepicker },
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    weekday: [1, 2, 3, 4, 5, 6, 0],
    time1: null,
    time2: null,
    menu1: false,
    menu2: false,
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
    swatches: [
      ["#AA0000", "#550000"],
      ["#AAAA00", "#555500"],
      ["#00AA00", "#005500"],
      ["#00AAAA", "#005555"],
      ["#0000AA", "#000055"],
    ],
    activities: [],
    activity: {
      name: "",
      credits: "",
      time: "",
      color: "",
    },
  }),
  watch: {
    dialog(val) {
      !val && this.clearData();
    },
    dialog2(val) {
      !val && this.clearData();
    },
  },
  methods: {
    myDayFormat(i) {
      return this.days[i.weekday];
    },
    saveActivity() {
      !this.$v.$touch();
      if (this.$v.activity.$anyError) return;

      this.activities.push({
        id: this.activities.length + 1,
        name: this.activity.name,
        credits: this.activity.credits,
        time: this.activity.time,
        color: this.activity.color,
      });
      this.dialog = false;
    },
    editActivity(activity) {
      this.activity.id = activity.id;
      this.activity.name = activity.name;
      this.activity.credits = activity.credits;
      this.activity.time = activity.time;
      this.activity.color = activity.color;
      this.dialog2 = true;
    },
    saveEditActivity() {
      !this.$v.$touch();
      if (this.$v.activity.$anyError) return;

      this.activities.forEach((activity) => {
        if (activity.id == this.activity.id) {
          activity.name = this.activity.name;
          activity.credits = this.activity.credits;
          activity.time = this.activity.time;
          activity.color = this.activity.color;
        }
      });
      this.dialog2 = false;
    },
    clearData() {
      this.activity.name = "";
      this.activity.credits = "";
      this.activity.time = "";
      this.activity.color = "";
      this.$v.$reset();
    },
    deleteActivity(activity) {
      for (var i = 0; i < this.activities.length; i++) {
        if (this.activities[i].id == activity.id) {
          this.activities.splice(i, 1);
          break;
        }
      }
    },
    addToCalendar(activity) {
      this.dialog3 = true;
    },
  },
  validations: {
    activity: {
      name: { required },
      credits: {},
      time: { required },
    },
  },
  computed: {
    getTotalCredits() {
      var total = 0;
      this.activities.forEach((activity) => {
        if (activity.credits != "") total += parseInt(activity.credits);
      });
      return total;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.activity.name.$dirty) return errors;
      !this.$v.activity.name.required && errors.push("Nombre es requerido");
      return errors;
    },
    timeErrors() {
      const errors = [];
      if (!this.$v.activity.time.$dirty) return errors;
      !this.$v.activity.time.required && errors.push("Tiempo es requerido");
      return errors;
    },
  },
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

.creditos-total {
  display: inline;
}

.buttons-content {
  height: 10%;
}

.content-calendar {
  height: 100%;
}

.content-tasks {
  height: 90%;
}

.options-task {
  display: none;
}

.custom-picker {
  max-width: none !important;
}

.v-color-picker__controls {
  display: none !important;
}

.display-time {
  height: 3.2em !important;
}
</style>