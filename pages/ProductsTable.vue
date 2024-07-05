<!-- pages/ProductsTable.vue -->
<template>
    <div>
        <q-layout>

        <q-page-container>
      <Header />

   
      <q-page>
        
   
        <q-toolbar>
          <q-toolbar-title>Products Table</q-toolbar-title>
        </q-toolbar>
  
        <div class="q-pa-md">

          <q-input
            v-model="searchQuery"
            label="Search"
            filled
            dense
            class="q-ma-sm"/>
  
          <q-table
            :rows="filteredProducts"
            :columns="columns"
            row-key="id">

            <template v-slot:body-cell-id="props">
              <q-td :props="props">{{ props.row.id }}</q-td>
            </template>
            <template v-slot:body-cell-title="props">
              <q-td :props="props">{{ props.row.title }}</q-td>
            </template>
            <template v-slot:body-cell-category="props">
              <q-td :props="props">{{ props.row.category }}</q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :props="props">{{ props.row.price }}</q-td>
            </template>

          </q-table>

        </div>
    </q-page> 
</q-page-container>
</q-layout>   

</div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  
  const productStore = useProductStore();
  const { products, fetchProducts } = productStore;
  
  const searchQuery = ref('');
  
  const columns = [
    { name: 'id', label: 'ID', field: 'id' },
    { name: 'title', label: 'Title', field: 'title' },
    { name: 'category', label: 'Category', field: 'category' },
    { name: 'price', label: 'Price', field: 'price' },
  ];
  
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      return (
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  });
  
  onMounted(async () => {
    await fetchProducts();
  });
  </script>
  
  <style scoped>
  .q-pa-md {
    padding: 16px;
  }
  
  .q-ma-sm {
    margin: 8px;
  }
  </style>
  