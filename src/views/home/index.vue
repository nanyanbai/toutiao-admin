<template>
    <div class="home-container">
        <top-view />

        <sales-view />

        <bottom-view />

        <map-view />
    </div>
</template>

<script>
import TopView from './components/TopView/'
import SalesView from './components/SalesView/'
import BottomView from './components/BottomView/'
import MapView from './components/MapView'


export default {
    name: 'HomeIndex',
    components: {
        TopView,
        SalesView,
        BottomView,
        MapView
    }
}
</script>

<style scoped lang="scss">
.home-container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
