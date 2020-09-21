<template>
  <v-container fluid>
    <div class="container-login100">
      <div class="wrap-login100 mb-5">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
          <v-btn
            to="/"
            class="text-capitalize"
            color="primary"
            rounded
            outlined
          >Go To Homepage</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.wrap-login100 {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}

.notfound {
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.notfound-404 {
  height: 220px;
  z-index: -1;
}

.notfound-404 h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 150px;
  margin: 0px;
  font-weight: 900;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background-size: cover;
  background-position: center;
}
</style>
