<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-text class="content-all">
            <v-container>
              <v-row align="center">
                <v-col class="content-login ml-10">
                  <h1>Iniciar Sesión</h1>
                  <h3 class="mt-2">
                    ¿Nuevo usuario?
                    <v-btn
                      class="text-none btn-link"
                      to="register"
                      text
                      small
                      color="primary"
                      >Crear una cuenta</v-btn
                    >
                  </h3>
                  <v-form class="mt-8" ref="form" @submit.prevent="submit">
                    <v-text-field
                      prepend-inner-icon="mdi-email"
                      label="Correo electrónico"
                      :error-messages="emailErrors"
                      type="email"
                      outlined
                      dense
                      required
                      rounded
                      v-model="form.email"
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                      @keypress="!errors ? (errors = true) : errors"
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-lock"
                      label="Contraseña"
                      :error-messages="passwordErrors"
                      type="password"
                      outlined
                      dense
                      required
                      rounded
                      v-model="form.password"
                      @input="$v.form.password.$touch()"
                      @blur="$v.form.password.$touch()"
                      @keypress="!errors ? (errors = true) : errors"
                    ></v-text-field>
                    <div class="text-center">
                      <v-btn
                        type="submit"
                        class="text-capitalize mb-2"
                        color="primary"
                        :loading="loading"
                        rounded
                        block
                        >Iniciar sesión</v-btn
                      >
                      <v-divider class="mt-4 mb-2"></v-divider>
                      <a href="#" class="text-decoration-none" color="success"
                        >¿Olvide mi contraseña?</a
                      >
                    </div>
                  </v-form>
                </v-col>
                <v-col class="img mt-5 mb-5" cols="12" sm="5">
                  <div class="text-center">
                    <img src="images/login.png" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
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
          that.$router.push("/schedules");
        })
        .catch((err) => {
          that.loading = false;
          that.errors = false;
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
.img img {
  width: 190px;
}

.btn-link {
  height: auto !important;
  min-width: auto !important;
  padding: 0 !important;
}

@media screen and (max-width: 900px) {
  .img {
    display: none;
  }

  .content-all {
    grid-template-columns: 1fr;
  }

  .content-all > .container > .row > .content-login {
    margin-left: 0 !important;
  }
}
</style>