<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Universidad Autónoma de Manizales</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    label="Nombre completo"
                    :error-messages="nameErrors"
                    type="text"
                    outlined
                    dense
                    required
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    @blur="$v.form.name.$touch()"
                    @keypress="!errors ? errors = true : errors"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    prepend-inner-icon="mdi-tooltip-account"
                    :items="rols"
                    label="Tipo de usuario"
                    :error-messages="rolErrors"
                    item-text="name"
                    item-value="id"
                    outlined
                    dense
                    required
                    v-model="form.rol_id"
                    @input="$v.form.rol_id.$touch()"
                    @blur="$v.form.rol_id.$touch()"
                    @change="!errors ? errors = true : errors"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    label="Correo electronico"
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
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
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
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    label="Confirmar contraseña"
                    type="password"
                    outlined
                    dense
                    required
                    v-model="form.password_confirmation"
                    @keypress="!errors ? errors = true : errors"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-btn
                  type="submit"
                  class="text-capitalize mb-2"
                  color="primary"
                  :loading="loading"
                  outlined
                  block
                >Registrarme</v-btn>
                <v-btn
                  to="/"
                  class="text-capitalize"
                  color="success"
                  outlined
                  block
                >Deseo iniciar sesión</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { REGISTER_REQUEST } from "./../../store/actions/auth";
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "Register",
  mixins: [validationMixin],
  props: ["rols"],
  data: () => ({
    errors: true,
    loading: false,
    form: {
      name: null,
      rol_id: null,
      email: null,
      password: null,
      password_confirmation: null,
    },
  }),
  methods: {
    submit() {
      var that = this;
      !that.$v.$touch();
      if (that.$v.form.$anyError) return;
      const {
        name,
        rol_id,
        email,
        password,
        password_confirmation,
      } = that.form;
      that.loading = true;
      that.$store
        .dispatch(REGISTER_REQUEST, {
          name,
          rol_id,
          email,
          password,
          password_confirmation,
        })
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
      name: {
        required,
      },
      rol_id: {
        required,
      },
      email: {
        required,
        email,
        errors() {
          return this.errors;
        },
      },
      password: { required, minLength: minLength(6) },
      password_confirmation: {
        sameAsPassword: sameAs("password"),
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push("Nombre completo es requerido");
      return errors;
    },
    rolErrors() {
      const errors = [];
      if (!this.$v.form.rol_id.$dirty) return errors;
      !this.$v.form.rol_id.required &&
        errors.push("Tipo de usuario es requerido");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Correo electronico invalido");
      !this.$v.form.email.required &&
        errors.push("Correo electronico es requerido");
      !this.$v.form.email.errors &&
        errors.push("El correo ya se encuentra registrado");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Contraseña es requerida");
      !this.$v.form.password.minLength &&
        errors.push("Contraseña debe tener al menor 6 caracteres");
      !this.$v.form.password_confirmation.sameAsPassword &&
        errors.push("La contraseña no coincide");
      return errors;
    },
  },
};
</script>

<style scoped>
</style>