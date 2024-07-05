// stores/productStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  const products = ref([]); 
  const cart = ref([]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');

      products.value = response.data.map(product => ({
        ...product, 
        count: 0 // Initialize count for each product
      })); 
 
      console.log(product, 'Product') 
    
    } catch (err) {
      error.value = err.message || 'Failed to fetch products';
    }

  };

  const incrementCount = (productId) => {
    const product = products.value.find(product => product.id === productId); 

    if (product) {
      product.count++;
    } 
  };

  const decrementCount = (productId) => {
    const product = products.value.find(product => product.id === productId);
    
    if (product) {
      product.count--;
    }  
  };

  const addToCart = (productId) => {
    const product = products.value.find(product => product.id === productId);
   
    console.log(product, 'product')
    
    if (product && product.count > 0) {

      const cartItem = cart.value.find(item => item.id === productId);
      if (cartItem) { 

        cartItem.count = product.count;
        
      } else {
        cart.value.push({ ...product });
      }
    }
  };

  const cartItemCount = computed(() => {

    return cart.value.reduce((total, item) => total + item.count, 0);
    console.log(cartItemCount, 'CART COUNT');

  });

  return { products, fetchProducts,incrementCount,decrementCount, addToCart, cartItemCount,cart }; 

});
