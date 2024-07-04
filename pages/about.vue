<template>
    <div>

        <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">

        <Header />
        
        <q-page-container>

            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <NuxtLink to="/"> 
        <q-btn color="purple" label="Purple" />
        </NuxtLink>


</q-page-container>
</q-layout>

</div>
</template>

<script setup>

const leftDrawerOpen = ref(false)

  const toggleLeftDrawer =()=> {
        leftDrawerOpen.value = !leftDrawerOpen.value;
}

</script>

<style lang="scss" scoped>

</style>