<template>
    <div>
        
        <q-header elevated>
        <q-toolbar class="glossy">
          <q-btn flat round dense icon="menu" class="q-mr-sm" /> 
          
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title> Quasar Framework </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
          <q-chip> {{ quantity }} </q-chip>
        </q-toolbar>


        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />

        <q-route-tab to="/fetch" label="Products" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>



      </q-header>

    </div>
</template>

<script setup>

const quantity=ref(0);

const addToCart=()=>{
 


}

</script>

<style lang="scss" scoped>

</style>