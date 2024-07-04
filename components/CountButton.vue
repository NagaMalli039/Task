<template>
    <div>

        <div class="col-12 text-center self-center" style="display: flex; gap: 0.5rem;align-items: center; ">

        <q-btn color="black" @click="count++"> + </q-btn>
        
        <span style="align-items: center">{{ count }}</span>

        <q-btn color="black" @click="count--"> - </q-btn>

        </div>
        <br>

    </div>
</template>

<script setup>

const count=ref(0);

</script>

<style lang="scss" scoped>

</style>