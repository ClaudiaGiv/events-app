<template>
  <div class="ds-container">
    <div class="bg-bg">
      <v-img class="round-it mx-0" style="margin-left:0" eager src="../../assets/images/romania.jpeg">
        <v-row style="height:100%;padding:4%; margin-left:0" align="center" justify="center" no-gutters>
          <div>
            <p style="line-height:1.1;" class="font-2 text-center weight-600 white--text">Don’t Miss The 50% Discount if
              You register Today</p>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-btn to="/" style="text-transform:none;border-radius:20px" class="btn-2 bg blue--text font-7 mt-10">Register Today
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </div>
        </v-row>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.v-responsive__content {
  margin: 0 !important;
}

.ds-container {
  padding: 4%;
  padding-top: 15%;

  z-index: 3 !important;

}

.btn-2 {
  height: 70px !important;
}

.bg-bg {
  height: 100%;
  /* background:url('');background-size:cover */
}

@media screen and (max-width: 600px) {
  .ds-container {
    padding: 10%;
  }

  .round-it {
    border-radius: 34px !important;

  }

  .btn-2 {
    height: 40px !important;
  }
}
</style>
