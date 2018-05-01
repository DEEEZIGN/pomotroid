<template>
  <div class="Drawer">
    <transition name="fade" mode="out-in">
      <component :is="currentDrawer"/>
    </transition>
    <app-drawer-menu/>
  </div>
</template>

<script>
import appDrawerMenu from '@/components/drawer/Drawer-menu'
import appDrawerSettings from '@/components/drawer/Drawer-settings'
import appDrawerTimer from '@/components/drawer/Drawer-timer'
import appDrawerHistory from '@/components/drawer/Drawer-history'

export default {
  name: 'Drawer',

  components: {
    appDrawerMenu,
    appDrawerSettings,
    appDrawerHistory,
    appDrawerTimer
  },

  computed: {
    currentDrawer () {
      return this.$store.getters.currentDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  background-color: $colorNavy;
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  z-index: 1;
  -webkit-app-region: no-drag;
}
</style>
