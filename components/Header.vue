<template>
    <div>
        
        <q-header elevated>
        <q-toolbar class="glossy">
          <q-btn flat round dense icon="menu" class="q-mr-sm" /> 
          
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title> Quasar Framework </q-toolbar-title>

<q-card-actions>          
  
  <q-btn flat round icon="shopping_cart" @click="showCartDialog = true">
        <q-badge color="red" floating>{{ productStore.cartItemCount }}</q-badge>
      </q-btn>
    
      <q-dialog v-model="showCartDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Shopping Cart</div>
          </q-card-section>

          <q-card-section>
              <div v-for="item in productStore.cart" :key="item.id" class="q-mb-md">
                <q-card>
                  <q-card-section>
                    <q-card-title>{{ item.title }}</q-card-title>

                    <q-card-main>
                      <p>{{ item.category }}</p>
                      <p>Price: {{ item.price }}</p>
                      <p>Quantity: {{ item.count }}</p>
                    </q-card-main>

                  </q-card-section>
                </q-card>
                </div>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>

        </q-card>
      </q-dialog>


    </q-card-actions>

</q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />

        <q-route-tab to="/fetch" label="Products" />
        <q-route-tab to="/table" label="Table" />

      </q-tabs>

      </q-header>

    </div>
</template>

<script setup>

const productStore = useProductStore();

const { cartItemCount, cart  } = productStore;
const showCartDialog=ref(false);


</script>

<style lang="scss" scoped>

</style>