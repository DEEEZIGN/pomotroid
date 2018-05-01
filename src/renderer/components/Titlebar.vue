<template>
  <nav class="Titlebar">
    <!-- menu -->
    <div class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--single" style="position: absolute;" @click="toggleDrawer">
      <div class="Menu-wrapper" :class="drawerOpen ? 'is-collapsed' : ''">
        <div class="Menu-line"></div>
        <div class="Menu-line"></div>
      </div>
    </div>

    <h1 class="Title">Pomotroid</h1>

    <div class="Icon-group" style="position: absolute; top: 0; right: 0;">
      <div class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--double--left" @click="winMinimize">
        <div class="Menu-line-minimize"></div>
      </div>
      <div class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--double--right" @click="winClose">
        <div class="Menu-line-close"></div>
        <div class="Menu-line-close"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  computed: {
    // store getters
    drawerOpen () {
      return this.$store.getters.drawerOpen
    }
  },

  methods: {
    toggleDrawer () {
      this.$store.dispatch('toggleDrawer')
    },

    winClose () {
      ipcRenderer.send('window-close')
    },

    winMinimize () {
      ipcRenderer.send('window-minimize')
    }
  }
}
</script>

<style lang="scss" scoped>

.Icon--close, .Icon--minimize {
  & line {
    stroke: lighten($colorBlueGrey, 10%);
    transition: $transitionDefault;
  }
}

.Menu-line {
  background-color: lighten($colorBlueGrey, 10%);
  display: inline-block;
  transition: $transitionDefault;
  width: 20px;
  height: 1px;
  &:last-child {
    width: 10px;
  }
}

.Menu-line-minimize {
  background-color: lighten($colorBlueGrey, 10%);
  display: inline-block;
  transition: $transitionDefault;
  width: 15px;
  height: 1px;
}

.Menu-line-close {
  background-color: lighten($colorBlueGrey, 10%);
  display: inline-block;
  transition: $transitionDefault;
  width: 20px;
  height: 1px;
  transform: rotate(-45deg);
  &:last-child {
    transform: rotate(45deg);
    position: absolute;
  }
}

.Menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  &.is-collapsed {
    & .Menu-line:first-child {
      transform: rotate(-45deg);
      width: 12px;
    }
    & .Menu-line:last-child {
      transform: rotate(45deg);
      width: 12px;
    }
  }
}

.Title {
  color: lighten($colorBlueGrey, 20%);
  font-size: 1rem;
  font-weight: 100;
  padding-top: 14px;
}

.Titlebar {
  letter-spacing: .05em;
  position: relative;
  text-align: center;
  background-color: darken($colorNavy, 3%);
  height: 50px;
  -webkit-app-region: drag;
}

.Icon-wrapper--titlebar {
  -webkit-app-region: no-drag;
  &:hover .Menu-line,
  &:hover .Menu-line-minimize,
  &:hover  .Menu-line-close {
    background-color: $colorRed;
  }
  &:hover .Icon--close line, &:hover .Icon--minimize line {
    stroke: $colorRed;
  }
}
</style>
