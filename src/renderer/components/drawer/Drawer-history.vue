<template>
  <div class="Container">
    <p class="Drawer-heading">History</p>
    <div class="history-table-header">Date</div>
    <div class="history-table-header">Work time</div>
    <div class="history-table-header">Total</div>
    <div v-for="line in localHistory" class="history-table-line">
      <div class="history-table-column">{{ line.date }}</div>
      <div class="history-table-column">{{ line.worktime }}</div>
      <div class="history-table-column">{{ line.total }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Drawer-timer',

    data () {
      return {
        localHistory: []
      }
    },

    computed: {
      currentHistory () {
        return this.$store.getters.history
      }
    },

    methods: {
      initHistory () {
        this.localHistory = this.currentHistory
      }
    },

    mounted () {
      this.initHistory()
    }
  }
</script>

<style lang="scss" scoped>
  .Container {
    float: left;
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
    padding-bottom: 20px;
    height: calc(100vh - 100px);
    &::-webkit-scrollbar
    {
      width: 12px;  /* for vertical scrollbars */
      height: 12px; /* for horizontal scrollbars */
    }

    &::-webkit-scrollbar-track
    {
      background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb
    {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .history-table-header {
    float: left;
    width: 33.33%;
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    box-sizing: border-box;
    font-size: 0.8rem;
    background-color: darken($colorNavy, 2%);
    text-align: left;
  }
  .history-table-line:nth-child(even) {
    background-color: darken($colorNavy, 1%);
    float: left;
    width: 100%;
  }

  .history-table-column {
    float: left;
    width: 33.33%;
    font-size: 0.8rem;
    padding: 10px 0px 10px 10px;
    box-sizing: border-box;
    text-align: left;
    &:nth-child(2),
    &:nth-child(3) {
      font-style: italic;
    }
  }
  .Setting-wrapper {
    margin: 10px 0;
    text-align: center;
  }

  .Setting-title {
    color: $colorBlueGrey;
    font-size: 14px;
    letter-spacing: .05em;
    margin-bottom: 8px;
  }

  .Setting-value {
    background-color: $colorNavy;
    border-radius: 4px;
    display: inline-block;
    font-family: 'RobotoMono', monospace;
    font-size: 12px;
    padding: 2px 6px;
  }

  .Slider-wrapper {
    position: relative;
  }

  .Slider {
    position: relative;
    width: 100%;
    -webkit-appearance: none;
    &:focus {
      outline: 0;
    }
    &::-webkit-slider-runnable-track {
      background-color: $colorNavy;
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
    top: calc(50% + 3px);
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
</style>
