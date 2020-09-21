<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Universidad Autónoma de Manizales</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-text-field
                prepend-icon="mdi-email"
                label="Correo electrónico"
                type="email"
                :rules="rules.emailRules"
                required
                v-model="form.email"
              ></v-text-field>
              <v-select
                prepend-icon="mdi-account"
                label="Tipo de usuario"
                :items="rols"
                item-text="name"
                item-value="id"
                :rules="rules.rolRules"
                required
                v-model="form.rol"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit" outlined>Iniciar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AUTH_REQUEST } from "./../store/actions/auth";
export default {
  name: "Login",
  props: ["rols"],
  data: () => ({
    form: {
      email: null,
      rol: null,
    },
    rules: {
      emailRules: [
        (v) => !!v || "Correo electronico es requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo electronico debe ser valido",
      ],
      rolRules: [(v) => !!v || "Seleccionar un tipo de usuario"],
    },
  }),
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      const { email, rol } = this.form;

      this.$store
        .dispatch(AUTH_REQUEST, { email, rol })
        .then(() => {
          // this.$router.push("/");
          // console.log("hola login");
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
};
</script>

<style scoped>
</style>