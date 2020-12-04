<template>
  <div
    :style="`background-color: ${activity.color}; border: 1px solid ${activity.color};`"
    class="my-event mb-2"
  >
    <div class="mb-4">
      <p class="d-inline ml-2">{{ activity.name }}</p>
      <P class="float-md-right mr-2 mb-0">{{ activity.credits }}</P>
      <P class="ml-2 mt-2 mb-0"
        ><strong>Total horas restantes: </strong>{{ getTotal }}</P
      >
    </div>
    <div class="options-task text-center">
      <v-btn @click="editActivity" icon color="white">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="deleteActivity" icon color="white">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activity", "events"],
  methods: {
    editActivity() {
      this.$emit("editActivity", this.activity);
    },
    deleteActivity() {
      var self = this;
      self.$swal
        .fire({
          title: "Eliminar actividad",
          html:
            `Vas a eliminar un conjunto de actividades, ` +
            "ten en cuenta que se eliminarán los eventos relacionados con esta actividad.",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.value) {
            self.$emit("deleteActivity", self.activity);
          }
        });
    },
  },
  computed: {
    getTotal() {
      return (this.activity.time - this.activity.total).toFixed(2);
    },
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  padding: 4px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
}

.my-event:hover > .options-task {
  display: block;
}
</style>