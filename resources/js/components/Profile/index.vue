<template>
  <div>
    <myNavigationDrawer></myNavigationDrawer>

    <myNavbar></myNavbar>

    <v-container>
      <v-card class="elevation-5 mt-10">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Datos del usuario</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitData">
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  label="Nombre completo"
                  type="text"
                  :error-messages="nameErrors"
                  outlined
                  dense
                  required
                  v-model="form1.name"
                  @input="$v.form1.name.$touch()"
                  @blur="$v.form1.name.$touch()"
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
                  v-model="form1.rol_id"
                  @input="$v.form1.rol_id.$touch()"
                  @blur="$v.form1.rol_id.$touch()"
                ></v-select>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                type="submit"
                class="text-capitalize mb-2"
                color="primary"
                outlined
                block
                :loading="loading1"
              >Actualizar datos</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card class="elevation-5 mt-10">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>Cambiar contraseña</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitPassword">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="Antigua Contraseña"
                  type="password"
                  :error-messages="oldPasswordErrors"
                  outlined
                  dense
                  required
                  v-model="form2.oldPassword"
                  @input="$v.form2.oldPassword.$touch()"
                  @blur="$v.form2.oldPassword.$touch()"
                  @keypress="!errors ? errors = true : errors"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="Nueva Contraseña"
                  type="password"
                  :error-messages="passwordErrors"
                  outlined
                  dense
                  required
                  v-model="form2.password"
                  @input="$v.form2.password.$touch()"
                  @blur="$v.form2.password.$touch()"
                  @keypress="!errors ? errors = true : errors"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  label="Confirmar nueva contraseña"
                  type="password"
                  :error-messages="passwordConfirmationErrors"
                  outlined
                  dense
                  required
                  v-model="form2.password_confirmation"
                  @keypress="!errors ? errors = true : errors"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                type="submit"
                class="text-capitalize mb-2"
                color="primary"
                outlined
                block
                :loading="loading2"
              >Actualizar contraseña</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

    <myFooter></myFooter>
  </div>
</template>

<script>
import { USER_REQUEST } from "./../../store/actions/user";
import { UPDATE_PROFILE_REQUEST } from "./../../store/actions/user";
import { UPDATE_PASSWORD_REQUEST } from "./../../store/actions/user";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import myFooter from "./../Layouts/Footer";
import myNavbar from "./../Layouts/NavBar";
import myNavigationDrawer from "./../Layouts/NavigationDrawer";

export default {
  name: "Profile",
  mixins: [validationMixin],
  props: ["rols"],
  components: { myFooter, myNavbar, myNavigationDrawer },
  data: () => ({
    loading1: false,
    loading2: false,
    errors: true,
    form1: {
      name: null,
      rol_id: null,
    },
    form2: {
      oldPassword: null,
      password: null,
      password_confirmation: null,
    },
  }),
  methods: {
    submitData() {
      var that = this;
      !that.$v.form1.$touch();
      if (that.$v.form1.$anyError) return;
      const { name, rol_id } = that.form1;
      that.loading1 = true;

      that.$store
        .dispatch(UPDATE_PROFILE_REQUEST, {
          name,
          rol_id,
        })
        .then(() => {
          that.loading1 = false;
        })
        .catch((err) => {
          that.loading1 = false;
        });
    },
    submitPassword() {
      var that = this;
      !that.$v.form2.$touch();
      if (that.$v.form2.$anyError) return;
      const { oldPassword, password, password_confirmation } = that.form2;
      that.loading2 = true;

      that.$store
        .dispatch(UPDATE_PASSWORD_REQUEST, {
          oldPassword,
          password,
          password_confirmation,
        })
        .then(() => {
          that.loading2 = false;
          that.form2.oldPassword = "";
          that.form2.password = "";
          that.form2.password_confirmation = "";
          that.$v.$reset();
        })
        .catch((err) => {
          that.loading2 = false;
          that.errors = false;
        });
    },
  },
  validations: {
    form1: {
      name: {
        required,
      },
      rol_id: {
        required,
      },
    },
    form2: {
      oldPassword: {
        required,
        minLength: minLength(6),
        errors() {
          return this.errors;
        },
      },
      password: {
        required,
        minLength: minLength(6),
      },
      password_confirmation: {
        sameAsPassword: sameAs("password"),
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
    nameErrors() {
      const errors = [];
      if (!this.$v.form1.name.$dirty) return errors;
      !this.$v.form1.name.required &&
        errors.push("Nombre completo es requerido");
      return errors;
    },
    rolErrors() {
      const errors = [];
      if (!this.$v.form1.rol_id.$dirty) return errors;
      !this.$v.form1.rol_id.required &&
        errors.push("Tipo de usuario es requerido");
      return errors;
    },
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.form2.oldPassword.$dirty) return errors;
      !this.$v.form2.oldPassword.required &&
        errors.push("Contraseña antigua es requerida");
      !this.$v.form2.oldPassword.minLength &&
        errors.push("Contraseña debe tener al menor 6 caracteres");
      !this.$v.form2.oldPassword.errors &&
        errors.push("Las credenciales no coinciden con nuestros registros");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form2.password.$dirty) return errors;
      !this.$v.form2.password.required &&
        errors.push("Contraseña es requerida");
      !this.$v.form2.password.minLength &&
        errors.push("Contraseña debe tener al menor 6 caracteres");
      !this.$v.form2.password_confirmation.sameAsPassword &&
        errors.push("Las contraseñas no coinciden");
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form2.password_confirmation.$dirty) return errors;
      !this.$v.form2.password_confirmation.required &&
        errors.push("Confirmación requerida");
      return errors;
    },
  },
  beforeMount() {
    var that = this;
    that.$store
      .dispatch(USER_REQUEST)
      .then(() => {
        that.form1.name = that.getUser.name;
        that.form1.rol_id = that.getUser.rol.id;
      })
      .catch((err) => {
        that.$router.push("/");
      });
  },
};
</script>

<style scoped>
</style>