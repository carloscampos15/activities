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
                    ref="calendar"
                    color="primary"
                    type="week"
                    :weekdays="weekday"
                    :weekday-format="myDayFormat"
                    :short-weekdays="false"
                    :events="events"
                    :event-color="getEventColor"
                    :event-ripple="false"
                    @change="getEvents"
                    @mousedown:event="startDrag"
                    @mousedown:time="startTime"
                    @mousemove:time="mouseMove"
                    @mouseup:time="endDrag"
                    @mouseleave.native="cancelDrag"
                  >
                    <template v-slot:event="{ event, timed, eventSummary }">
                      <div
                        class="v-event-draggable"
                        v-html="eventSummary()"
                      ></div>
                      <div
                        v-if="timed"
                        class="v-event-drag-bottom"
                        @mousedown.stop="extendBottom(event)"
                      ></div>
                    </template>
                  </v-calendar>
                </v-sheet>
              </v-col>

              <v-col cols="12" sm="3" class="pr-3 pl-3">
                <div class="content-tasks">
                  <Activity
                    v-for="(activity, i) in activities"
                    v-bind:key="i"
                    :activity="activity"
                    :events="events"
                    v-on:editActivity="editActivity"
                    v-on:deleteActivity="deleteActivity"
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
                    v-on:keyup="lockTimeF"
                    :disabled="lockCredits"
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
                    v-on:keyup="lockCreditsF"
                    :disabled="lockTime"
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
                    v-on:keyup="lockTimeF"
                    :disabled="lockCredits"
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
                    v-on:keyup="lockCreditsF"
                    :disabled="lockTime"
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
      <v-dialog persistent v-model="dialog4" max-width="600px">
        <v-card>
          <v-card-title class="headline"> Asignar actividad </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-row>
                <v-col>
                  <v-select
                    :items="activities"
                    v-model="event.activity"
                    item-text="name"
                    item-value="id"
                    label="Seleccionar actividad"
                    solo
                    :disabled="bandDisable"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Numero de creditos"
                    v-model="getActivityByID.credits"
                    outlined
                    dense
                    rounded
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Horas"
                    v-model="getActivityByID.time"
                    outlined
                    dense
                    rounded
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" cols="6">
                  <vue-timepicker
                    input-width="19em"
                    :minute-interval="15"
                    hide-disabled-items
                    v-model="event.time.start"
                    :hour-range="[timeRange2]"
                    @close="setTimerange1"
                  ></vue-timepicker>
                </v-col>
                <v-col class="text-center" cols="6">
                  <vue-timepicker
                    input-width="19em"
                    :minute-interval="15"
                    v-model="event.time.end"
                    hide-disabled-items
                    :hour-range="[timeRange1]"
                    @close="setTimeRange2"
                  ></vue-timepicker>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center" cols="12" md="12">
                  <div class="content-color">
                    <span
                      :style="`background-color:${getActivityByID.color}`"
                      class="dot"
                    ></span>
                    <p class="mb-0 ml-2 mt-2">Color de la actividad</p>
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="dragEvent != null">
                <v-col class="text-center" cols="12" md="12">
                  <v-btn @click="removeEvent" outlined color="error">
                    Eliminar evento
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <br /><br />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              color="green darken-1"
              @click="assignActivity"
              text
            >
              Aceptar
            </v-btn>

            <v-btn
              class="text-capitalize"
              color="red darken-1"
              @click="cancelAssignActivity"
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
import { mapGetters } from "vuex";

export default {
  name: "Schedules.create",
  mixins: [validationMixin],
  props: {},
  components: { myNavbar, myNavigationDrawer, Activity, VueTimepicker },
  data: () => ({
    lockTime: false,
    lockCredits: false,
    dialog: false,
    dialog2: false,
    dialog4: false,
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
      color: "#AA0000",
    },
    bandDisable: false,

    events: [],
    color: "#2196F3",
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    current: null,
    event: {
      tempEvent: {},
      activity: 0,
      time: {
        start: {
          HH: "00",
          mm: "00",
        },
        end: {
          HH: "00",
          mm: "00",
        },
      },
    },
    eventTemp: null,
    timeRange1: [],
    timeRange2: [],
    createStart: null,
    extendOriginal: null,
  }),
  watch: {
    dialog(val) {
      !val && this.clearData();
    },
    dialog2(val) {
      !val && this.clearData();
    },
    dialog4(val) {
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
        id: uuid.v4(),
        name: this.activity.name,
        credits: this.activity.credits,
        time: this.activity.time,
        color: this.activity.color,
        total: 0,
      });
      this.dialog = false;
    },
    editActivity(activity) {
      this.activity.id = activity.id;
      this.activity.name = activity.name;
      if (activity.credits != "") {
        this.lockTime = true;
      } else if (activity.time != "") {
        this.lockCredits = true;
      }
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

      this.events.forEach((event) => {
        if (event.activity_id == this.activity.id) {
          event.name = this.activity.name;
          event.color = this.activity.color;
        }
      });

      this.dialog2 = false;
    },
    clearData() {
      this.activity.name = "";
      this.activity.credits = "";
      this.activity.time = "";
      this.activity.color = "#AA0000";
      this.lockCredits = false;
      this.lockTime = false;
      this.$v.$reset();
    },
    deleteActivity(activity) {
      for (var i = 0; i < this.activities.length; i++) {
        if (this.activities[i].id === activity.id) {
          this.activities.splice(i, 1);
          break;
        }
      }
      var events = [];
      this.events.forEach((event) => {
        if (event.activity_id !== activity.id) {
          events.push(event);
        }
      });
      this.events = events;
    },
    assignActivity() {
      if (this.event.activity == 0) return;

      // set start date
      var nowStart = new Date(this.event.tempEvent.start);
      nowStart.setHours(this.event.time.start.HH);
      nowStart.setMinutes(this.event.time.start.mm);
      // set end date
      var nowEnd = new Date(this.event.tempEvent.end);
      nowEnd.setHours(this.event.time.end.HH);
      nowEnd.setMinutes(this.event.time.end.mm);

      // set properties from event
      this.event.tempEvent.start = nowStart.getTime();
      this.event.tempEvent.end = nowEnd.getTime();
      this.event.tempEvent.name = this.getActivityByID.name;
      this.event.tempEvent.color = this.getActivityByID.color;
      this.event.tempEvent.activity_id = this.getActivityByID.id;

      var totalActual =
        nowEnd.getHours() +
        nowEnd.getMinutes() / 100 -
        (nowStart.getHours() + nowStart.getMinutes() / 100);
      // buscar actividad
      console.log(this.getActivityByID.total);
      console.log(totalActual);
      console.log(totalActual - this.getActivityByID.total);

      if (this.event.tempEvent.id == undefined) {
        if (this.dragEvent != null) {
          for (var i = 0; i < this.events.length; i++) {
            if (this.events[i].id === this.dragEvent.id) {
              this.events[i].start = this.event.tempEvent.start;
              this.events[i].end = this.event.tempEvent.end;
              this.events[i].name = this.event.tempEvent.name;
              this.events[i].color = this.event.tempEvent.color;
              break;
            }
          }
        } else {
          this.event.tempEvent.id = uuid.v4();
          this.events[this.events.length - 1] = this.event.tempEvent;
        }
      }

      this.calculateTotal();

      this.dragEvent = null;
      this.event.activity = 0;
      this.event.tempEvent = {};
      this.eventTemp = null;
      this.dialog4 = false;
    },
    cancelAssignActivity() {
      if (this.event.tempEvent.id === undefined) {
        this.events.pop();
      }

      this.eventTemp = null;
      this.dragEvent = null;
      this.event.tempEvent = null;

      this.event.activity = 0;
      this.dialog4 = false;
    },
    setTimerange1() {
      this.timeRange1 = [parseInt(this.event.time.start.HH) + 1, 23];
    },
    setTimeRange2() {
      this.timeRange2 = [0, parseInt(this.event.time.end.HH)];
    },
    getIDByEvent() {
      // while (true) {
      //   var band = false;
      //   var id = this.events.length;
      //   var cont = 0;
      //   this.events.forEach((event) => {
      //     if (event.id == id) {
      //       id++;
      //       break;
      //     }
      //     cont++;
      //   });
      //   if(cont == this.events.length){
      //     return id;
      //   }
      // }
      // return 0;
    },
    removeEvent() {
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].id === this.dragEvent.id) {
          this.events.splice(i, 1);
          break;
        }
      }

      this.dialog4 = false;
    },
    lockTimeF() {
      if (this.activity.credits != "") {
        this.lockTime = true;
        if (this.getUser.rol.id == 1) {
          //Estudiante
          const horas = 3 * parseInt(this.activity.credits);
          this.activity.time = horas;
        } else if (this.getUser.rol.id == 2) {
          //Docente
          const horas = 1.5 * parseInt(this.activity.credits);
          this.activity.time = horas;
        }
      } else this.lockTime = false;
    },
    lockCreditsF() {
      if (this.activity.time != "") this.lockCredits = true;
      else this.lockCredits = false;
    },

    startDrag({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
    startTime(tms) {
      const mouse = this.toTime(tms);
      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start;
        this.dragTime = mouse - start;
      } else {
        this.createStart = this.roundTime(mouse);
        this.createEvent = {
          name: `Event #${this.events.length}`,
          color: this.color,
          start: this.createStart,
          end: this.createStart,
          timed: true,
        };
        this.events.push(this.createEvent);
      }
    },
    extendBottom(event) {
      // this.createEvent = event;
      // this.createStart = event.start;
      // this.extendOriginal = event.end;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);
      if (this.dragEvent && this.dragTime !== null) {
        if (this.eventTemp == null) {
          this.eventTemp = {
            color: this.dragEvent.color,
            end: this.dragEvent.end,
            id: this.dragEvent.id,
            name: this.dragEvent.name,
            start: this.dragEvent.start,
            timed: this.dragEvent.timed,
          };
        }

        const start = this.dragEvent.start;
        const end = this.dragEvent.end;
        const duration = end - start;
        const newStartTime = mouse - this.dragTime;
        const newStart = this.roundTime(newStartTime);
        const newEnd = newStart + duration;
        this.dragEvent.start = newStart;
        this.dragEvent.end = newEnd;
      } else if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.createStart);
        const max = Math.max(mouseRounded, this.createStart);
        this.createEvent.start = min;
        this.createEvent.end = max;
      }
    },
    endDrag() {
      // console.log(this.dragEvent); //cuando arrastra el elemento
      // console.log(this.createEvent); // cuando crea el elemento
      // cuando se edita el elemento
      if (this.dragEvent != null) {
        //validar que se esta moviendo un elemento existente
        for (var i = 0; i < this.events.length; i++) {
          if (this.dragEvent.id == this.events[i].id) {
            this.event.tempEvent = this.events[i];
            break;
          }
        }
        this.event.activity = this.dragEvent.activity_id;
        this.bandDisable = true;
      } else {
        this.bandDisable = false;
        this.event.tempEvent = this.createEvent;
      }

      this.dragTime = null;
      this.createEvent = null;
      this.createStart = null;
      this.extendOriginal = null;

      try {
        let dateStart = new Date(this.event.tempEvent.start);
        let dateEnd = new Date(this.event.tempEvent.end);

        this.event.time.start = {
          HH:
            dateStart.getHours() < 10
              ? `0${dateStart.getHours()}`
              : `${dateStart.getHours()}`,
          mm:
            dateStart.getMinutes() < 10
              ? `0${dateStart.getMinutes()}`
              : `${dateStart.getMinutes()}`,
        };
        this.event.time.end = {
          HH:
            dateEnd.getHours() < 10
              ? `0${dateEnd.getHours()}`
              : `${dateEnd.getHours()}`,
          mm:
            dateEnd.getMinutes() < 10
              ? `0${dateEnd.getMinutes()}`
              : `${dateEnd.getMinutes()}`,
        };

        this.timeRange1 = [dateStart.getHours() + 1, 23];
        this.timeRange2 = [0, dateEnd.getHours() - 1];
        this.dialog4 = true;
      } catch (e) {}
    },
    calculateTotal() {
      this.activities.forEach((activity) => {
        var total = 0;
        this.events.forEach((event) => {
          if (event.activity_id === activity.id) {
            const start = new Date(event.start);
            const end = new Date(event.end);
            total +=
              end.getHours() +
              end.getMinutes() / 100 -
              (start.getHours() + start.getMinutes() / 100);
          }
        });
        activity.total = total;
      });
    },
    cancelDrag() {
      if (this.createEvent) {
        if (this.extendOriginal) {
          this.createEvent.end = this.extendOriginal;
        } else {
          const i = this.events.indexOf(this.createEvent);
          if (i !== -1) {
            this.events.splice(i, 1);
          }
        }
      }
      this.createEvent = null;
      this.createStart = null;
      this.dragTime = null;
      // this.dragEvent = null;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;
      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = 33;
      const g = 150;
      const b = 243;
      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },
    getEvents({ start, end }) {
      // en este meotodo cargar los elementos ya creados en el calendario
      // const events = [];
      // const min = new Date(`${start.date}T00:00:00`).getTime();
      // const max = new Date(`${end.date}T23:59:59`).getTime();
      // const days = (max - min) / 86400000;
      // const eventCount = this.rnd(days, days + 20);
      // for (let i = 0; i < eventCount; i++) {
      //   const timed = this.rnd(0, 3) !== 0;
      //   const firstTimestamp = this.rnd(min, max);
      //   const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
      //   const start = firstTimestamp - (firstTimestamp % 900000);
      //   const end = start + secondTimestamp;
      //   events.push({
      //     name: this.rndElement(this.names),
      //     color: this.rndElement(this.colors),
      //     start,
      //     end,
      //     timed,
      //   });
      // }
      // this.events = events;
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
    ...mapGetters(["getUser"]),
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
    getActivityByID() {
      if (this.event.activity != 0) {
        return this.activities.find(
          (activity) => activity.id === this.event.activity
        );
      } else return { name: "" };
    },
  },
  beforeMount() {},
};
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}
.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}
.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;
  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: "";
  }
  &:hover::after {
    display: block;
  }
}
</style>