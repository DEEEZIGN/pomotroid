<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    <div class="Setting-wrapper">
      <p class="Setting-title">Hourly rate</p>
      <p class="Setting-value">{{ localRate }}</p>
      <div class="Slider-wrapper">
        <input
          type="range"
          min="10"
          :max="maxRate"
          step="10"
          class="Slider"
          v-model.number="localRate"
          @change="setRate"
        >
        <div
          class="Slider-bar Slider-bar--blueGrey">
        </div>
      </div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Always On Top</p>
      <div class="Checkbox" @click="selectAlwaysOnTop" :class="alwaysOnTop ? 'is-active' : 'is-inactive'"></div>
    </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">Auto-start Timer</p>
      <div class="Checkbox" @click="selectAutoStartTimer" :class="autoStartTimer ? 'is-active' : 'is-inactive'"></div>
    </div>
    <div class="Setting-wrapper">
    <p class="Setting-title">Desktop Notifications</p>
    <div class="Checkbox" @click="selectNotifications" :class="notifications ? 'is-active' : 'is-inactive'"></div>
  </div>
    <div class="Setting-wrapper">
      <p class="Setting-title">History</p>
      <div class="TextButton" @click="clearHistory">Clear</div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Drawer-settings',

  data () {
    return {
      maxRate: 1000,
      localRate: 10
    }
  },

  computed: {
    alwaysOnTop () {
      return this.$store.getters.alwaysOnTop
    },

    autoStartTimer () {
      return this.$store.getters.autoStartTimer
    },

    rate () {
      return this.$store.getters.rate
    },

    notifications () {
      return this.$store.getters.notifications
    }
  },

  methods: {
    calcPercentage (val, max) {
      return val / max * 100
    },
    initRate () {
      this.localRate = this.rate
    },
    setRate (e, setting) {
      this.$store.dispatch('setRate', e.target.value)
    },
    clearHistory () {
      this.$store.dispatch('clearHistory')
    },
    selectAlwaysOnTop () {
      const payload = {
        key: 'alwaysOnTop',
        val: !this.alwaysOnTop
      }
      ipcRenderer.send('toggle-alwaysOnTop', !this.alwaysOnTop)
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    },

    selectAutoStartTimer () {
      const payload = {
        key: 'autoStartTimer',
        val: !this.autoStartTimer
      }
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    },

    selectNotifications () {
      const payload = {
        key: 'notifications',
        val: !this.notifications
      }
      this.$store.dispatch('setSetting', payload)
      this.$store.dispatch('setViewState', payload)
    }
  },
  mounted () {
    this.initRate()
  }
}
</script>

<style lang="scss" scoped>

  .TextButton {
    margin-top: 0;
  }

  .Slider--blue {
    &::-webkit-slider-thumb {
      background-color: $colorBlue;
      border: 2px solid $colorBlue;
      -webkit-app-region: no-drag;
    }
  }

  .Slider--green {
    &::-webkit-slider-thumb {
      background-color: $colorGreen;
      border: 2px solid $colorGreen;
      -webkit-app-region: no-drag;
    }
  }

  .Slider--red {
    &::-webkit-slider-thumb {
      background-color: $colorRed;
      border: 2px solid $colorRed;
      -webkit-app-region: no-drag;
    }
  }

  .Slider-bar {
    position: absolute;
    top: calc(50% - 1.5px);
    height: 3px;
  }

  .Slider-bar--blue {
    background-color: $colorBlue;
  }

  .Slider-bar--blueGrey {
    background-color: $colorBlueGrey;
  }

  .Slider-bar--green {
    background-color: $colorGreen;
  }

  .Slider-bar--red {
    background-color: $colorRed;
  }
  .Setting-value {
    background-color: $colorNavy;
    display: inline-block;
    font-family: 'RobotoMono', monospace;
    font-size: 12px;
  }

  .Slider-wrapper {
    position: relative;
  }

  .Slider {
    position: relative;
    width: 100%;
    display: block;
    margin-top: 9px;
    -webkit-appearance: none;
    &:focus {
      outline: 0;
    }
    &::-webkit-slider-runnable-track {
      background-color: darken($colorNavy, 5%);
      width: 100%;
      height: 3px;
    }
    &::-webkit-slider-thumb {
      background-color: $colorBlueGrey;
      border: 2px solid $colorBlueGrey;
      border-radius: 100%;
      margin-top: -7px;
      width: 15px;
      height: 15px;
      -webkit-appearance: none;
      -webkit-app-region: no-drag;
    }
  }
.Checkbox {
  background-color: $colorNavy;
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: inline-block;
  transition: $transitionDefault;
  width: 16px;
  height: 16px;
  &:hover {
    border-color: $colorRed;
  }
  &.is-active {
    background-color: $colorRed;
    border-color: $colorNavy;
    &:hover {
      background-color: $colorNavy;
      border-color: $colorRed;
    }
  }
}

.Setting-wrapper {
  background-color: $colorNavy;
  border-bottom: 1px solid lighten($colorNavy, 3%);
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0px;
  padding: 0px 0px 20px;
  &:last-child {
    border-bottom: 0;
  }
}

.Setting-title {
  color: $colorBlueGrey;
  font-size: 14px;
  letter-spacing: .05em;
}
</style>
