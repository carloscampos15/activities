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
                prepend-inner-icon="mdi-email"
                label="Correo electrónico"
                :error-messages="emailErrors"
                type="email"
                outlined
                dense
                required
                v-model="form.email"
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
                @keypress="!errors ? errors = true : errors"
              ></v-text-field>
              <v-text-field
                prepend-inner-icon="mdi-lock"
                label="Contraseña"
                :error-messages="passwordErrors"
                type="password"
                outlined
                dense
                required
                v-model="form.password"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
                @keypress="!errors ? errors = true : errors"
              ></v-text-field>
              <div class="text-center">
                <v-btn
                  type="submit"
                  class="text-capitalize mb-2"
                  color="primary"
                  :loading="loading"
                  outlined
                  block
                >Iniciar sesión</v-btn>
                <v-btn
                  to="register"
                  class="text-capitalize"
                  color="success"
                  outlined
                  block
                >Deseo registrarme</v-btn>
                <v-divider class="mt-4 mb-2"></v-divider>
                <a href="#" class="text-decoration-none" color="success">¿Olvide mi contraseña?</a>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AUTH_REQUEST } from "./../../store/actions/auth";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  mixins: [validationMixin],
  props: [],
  data: () => ({
    errors: true,
    loading: false,
    form: {
      email: null,
      password: null,
    },
  }),
  methods: {
    submit() {
      var that = this;

      !that.$v.$touch();
      if (that.$v.form.$anyError) return;

      const { email, password } = that.form;
      that.loading = true;
      that.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          that.loading = false;
          that.$router.push("/home");
        })
        .catch((err) => {
          that.loading = false;
          that.errors = false;
          console.log(err.data);
        });
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
        errors() {
          return this.errors;
        },
      },
      password: { required },
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Correo electronico invalido");
      !this.$v.form.email.required &&
        errors.push("Correo electronico es requerido");
      !this.$v.form.email.errors &&
        errors.push("Las credenciales no coinciden con nuestros registros");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Contraseña es requerida");
      return errors;
    },
  },
};
</script>

<style scoped>
</style>