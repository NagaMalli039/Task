<template>
  <div>
    <q-layout>
      <Header />

      <q-page-container>
        <q-page>
          <h2>products</h2>

          <div class="q-pa-md">
            <div class="q-gutter-md q-col-gutter-md">
              <q-card
                v-for="product in products"
                :key="product.id"
                class="q-mb-md"
              >
                <q-card-section>
                  <q-card-title
                    ><h5>{{ product.title }}</h5></q-card-title>

                  <q-card-main>
                    <p>{{ product.category }}</p>
                    <p>Price: {{ product.price }}</p>
                  </q-card-main>

                  <q-card-actions align="center">
                    <div
                      class="counter-container"
                      style="
                        display: flex;
                        gap: 0.5rem;
                        align-items: center;
                        justify-content: center;
                        margin-top: 16px; /* Space above the counter section */
                      "
                    >
                      <q-btn color="black" @click="count++"> + </q-btn>
                      <span class="counter">{{ count }}</span>
                      <q-btn color="black" @click="count--"> - </q-btn>
                      <q-btn color="primary">Add to Cart</q-btn>
                    </div>
                  </q-card-actions>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue"; 
import { useProductStore } from '~/stores/ProductStore';

const productStore = useProductStore();

const count = ref(0);
const { products, fetchProducts } = productStore;


onMounted(async () => {
 
await fetchProducts();

});
</script>

<style scoped>
.q-col-gutter-md {
  margin-bottom: 16px; /* Adjust spacing between columns */
}

.q-mb-md {
  margin-bottom: 16px; /* Adjust spacing between cards */
}

.q-gutter-md {
  display: grid;
  grid-gap: 16px; /* Adjust grid gap between rows and columns */
  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  ); /* Adjust column width */
}
</style>
