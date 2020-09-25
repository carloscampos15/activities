<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-card-text class="content-all">
            <v-container>
              <v-row align="center">
                <v-col class="content-register ml-10 mt-4">
                  <h1>Crear una cuenta</h1>
                  <h3 class="mt-2">
                    Tienes una cuenta?
                    <v-btn
                      class="text-none btn-link"
                      to="/"
                      text
                      small
                      color="primary"
                      >Iniciar sesión</v-btn
                    >
                  </h3>
                  <v-form class="mt-8" ref="form" @submit.prevent="submit">
                    <v-row>
                      <v-col cols="12 custom-col" md="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account"
                          label="Nombres"
                          :error-messages="nameErrors"
                          type="text"
                          outlined
                          dense
                          required
                          rounded
                          v-model="form.name"
                          @input="$v.form.name.$touch()"
                          @blur="$v.form.name.$touch()"
                          @keypress="!errors ? (errors = true) : errors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12 custom-col" md="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account"
                          label="Apellidos"
                          :error-messages="lastnameErrors"
                          type="text"
                          outlined
                          dense
                          required
                          rounded
                          v-model="form.lastname"
                          @input="$v.form.lastname.$touch()"
                          @blur="$v.form.lastname.$touch()"
                          @keypress="!errors ? (errors = true) : errors"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12 custom-col" md="7">
                        <v-text-field
                          prepend-inner-icon="mdi-email"
                          label="Correo electronico"
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
                      </v-col>
                      <v-col cols="12 custom-col" md="5">
                        <v-select
                          prepend-inner-icon="mdi-tooltip-account"
                          :items="rols"
                          label="Usuario"
                          :error-messages="rolErrors"
                          item-text="name"
                          item-value="id"
                          outlined
                          dense
                          required
                          rounded
                          v-model="form.rol_id"
                          @input="$v.form.rol_id.$touch()"
                          @blur="$v.form.rol_id.$touch()"
                          @change="!errors ? (errors = true) : errors"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12 custom-col" md="6">
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
                      </v-col>
                      <v-col cols="12 custom-col" md="6">
                        <v-text-field
                          prepend-inner-icon="mdi-lock"
                          label="Confirmar contraseña"
                          type="password"
                          :error-messages="passwordConfirmationErrors"
                          outlined
                          dense
                          required
                          rounded
                          v-model="form.password_confirmation"
                          @keypress="!errors ? (errors = true) : errors"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div class="text-center">
                      <v-btn
                        type="submit"
                        class="text-capitalize mb-2"
                        color="primary"
                        :loading="loading"
                        rounded
                        block
                        >Registrarme</v-btn
                      >
                    </div>
                  </v-form>
                </v-col>
                <v-col class="img mt-5 mb-5" cols="12" sm="5">
                  <div class="text-center">
                    <img src="images/register.png" />
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
        lastname,
        rol_id,
        email,
        password,
        password_confirmation,
      } = that.form;
      that.loading = true;
      that.$store
        .dispatch(REGISTER_REQUEST, {
          name,
          lastname,
          rol_id,
          email,
          password,
          password_confirmation,
        })
        .then(() => {
          that.loading = false;
          that.$router.push("/activities");
        })
        .catch((err) => {
          that.loading = false;
          that.errors = false;
        });
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      lastname: {
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
        required,
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push("Nombres requeridos");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.form.lastname.$dirty) return errors;
      !this.$v.form.lastname.required && errors.push("Apellidos requeridos");
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
        errors.push("Las contraseñas no coinciden");
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form.password_confirmation.$dirty) return errors;
      !this.$v.form.password_confirmation.required &&
        errors.push("Confirmación requerida");
      return errors;
    },
  },
};
</script>

<style scoped>
.img img {
  width: 260px;
}

.btn-link {
  height: auto !important;
  min-width: auto !important;
  padding: 0 !important;
}

.custom-col {
  padding-bottom: 0;
  padding-top: 0;
}

@media screen and (max-width: 1100px) {
  .img {
    display: none;
  }

  .content-all {
    grid-template-columns: 1fr;
  }

  .content-all > .container > .row > .content-register {
    margin-left: 0 !important;
  }
}
</style>