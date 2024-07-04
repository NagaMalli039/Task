// stores/productStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      products.value = response.data.map(product => ({
        ...product, 
        count: 0 // Initialize count for each product
      }));

      
    } catch (err) {
      error.value = err.message || 'Failed to fetch products';
    }
  };

  return { products, fetchProducts };
});
