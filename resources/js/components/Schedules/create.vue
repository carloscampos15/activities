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
                  <div class="my-event mb-2">
                    <div class="mb-4">
                      <p class="d-inline ml-2">Nombre actividad</p>
                      <P class="float-md-right mr-2 mb-0">18</P>
                    </div>
                    <div class="options-task text-center">
                      <v-btn icon color="white">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="white">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <v-divider></v-divider>
                </div>
                <v-divider></v-divider>
                <div class="buttons-content ml-1 mb-1">
                  <div class="mb-6">
                    <h3 class="creditos-total">Total creditos:</h3>
                    <h3 class="creditos-total float-md-right">31</h3>
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
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Nombre"
                    outlined
                    dense
                    required
                    rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Numero de creditos"
                    type="number"
                    outlined
                    dense
                    required
                    rounded
                    min="0"
                    max="16"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" cols="12" md="12">
                  <v-color-picker
                    class="custom-picker"
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
            <v-btn class="text-capitalize" color="green darken-1" text>
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
    </v-container>
  </div>
</template>

<script>
import { USER_REQUEST } from "./../../store/actions/user";
import myNavbar from "./../Layouts/NavBar";
import myNavigationDrawer from "./../Layouts/NavigationDrawer";

export default {
  name: "Schedules.create",
  props: {},
  components: { myNavbar, myNavigationDrawer },
  data: () => ({
    dialog: false,
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
      return this.days[i.weekday];
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

.my-event:hover > .options-task {
  display: block;
}

.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 8px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 4px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
}

.custom-picker {
  max-width: none !important;
}
</style>