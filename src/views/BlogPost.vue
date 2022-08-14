<template>
  <v-container fluid fill-height>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              Vuetify Mobile Navbar using v-menu
            </h3>
            <div>
              <p>
                Quick example of collapsable mobile menu
                <tt>&lt;v-toolbar&gt;</tt>, with a
                <tt>&lt;v-menu&gt;</tt> for mobile screens.
              </p>
              <p>
                Also shows how to use <tt>.hidden-md-and-up</tt> CSS
                classes to appropriately hide/show the menu depending upon
                window width.
              </p>
            </div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-container>
</template>

<script>

export default {
  name: "BlogPost",
}
</script>
