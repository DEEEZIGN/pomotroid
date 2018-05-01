<template>
  <section class="Container Footer">
    <div class="Round-wrapper">
      <p class="TextButton">{{ round + '/' + workRounds }}</p>
      <p class="TextButton" @click="callForReset">Reset</p>
      <p class="TextButton" @click="endWork">End work day</p>
    </div>
    <div class="Icon-group" style="position: absolute; right: 0;">
      <!-- skip -->
      <div @click="skipRound">
        <svg class="buttons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="315.889 375.665 14 14" width="14" height="14"><path d=" M 329.889 375.665 L 329.889 389.665 L 327.889 389.665 L 327.889 383.571 L 315.889 389.665 L 315.889 375.665 L 327.889 381.759 L 327.889 375.665 L 329.889 375.665 Z " fill="rgb(0,0,0)"></path></svg>
      </div>
      <!-- mute -->
      <div @click="toggleMute">
        <transition name="fade" mode="out-in">
          <svg class="buttons" v-if="!isMuted" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="300.453 441.537 15 18" width="15" height="18"><path d=" M 310.453 441.537 L 304.453 447.537 L 300.453 447.537 L 300.453 453.537 L 304.453 453.537 L 310.453 459.537 L 310.453 441.537 Z  M 312.453 446.631 L 312.453 454.35 C 314.221 453.934 315.466 452.352 315.453 450.537 C 315.453 448.639 314.153 447.131 312.453 446.631 Z " fill="rgb(0,0,0)"/></svg>
          <svg class="buttons" v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="290.622 415.188 19.718 18" width="19.718" height="18"><path d=" M 300.622 415.188 L 294.622 421.188 L 290.622 421.188 L 290.622 427.188 L 294.622 427.188 L 300.622 433.188 L 300.622 415.188 Z  M 303.341 419.469 L 301.902 420.908 L 304.715 423.689 L 301.902 426.47 L 303.34 427.908 L 306.121 425.095 L 308.902 427.908 L 310.34 426.47 L 307.527 423.689 L 310.34 420.908 L 308.902 419.468 L 306.122 422.282 L 303.341 419.469 Z " fill="rgb(0,0,0)"/></svg>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { EventBus } from '@/utils/event-bus'
import dateFormat from 'dateformat'

export default {
  computed: {
    // store getters
    currentRound () {
      return this.$store.getters.currentRound
    },

    isMuted () {
      return this.$store.getters.isMuted
    },

    timeWork () {
      return this.$store.getters.timeWork
    },

    round () {
      return this.$store.getters.round
    },

    workRounds () {
      return this.$store.getters.workRounds
    }
  },

  methods: {
    callForReset () {
      EventBus.$emit('call-timer-reset')
    },

    endWork () {
      let currentTime = parseFloat((this.$parent.timer.time / 60).toFixed(2))
      let workTimeMinutes = (this.timeWork * (this.round - 1)) + currentTime
      let workTime = parseFloat((workTimeMinutes / 60).toFixed(2))
      let total = parseFloat((this.$store.getters.rate * workTime).toFixed(2))
      if (total) {
        this.$store.dispatch('setHistory', {
          date: dateFormat(new Date(), 'yyyy-mm-dd'),
          worktime: workTime,
          total: total
        })
        this.callForReset()
      }
    },

    skipRound () {
      EventBus.$emit('timer-completed')
    },

    toggleMute () {
      this.$store.dispatch('toggleMute')
    }
  }
}
</script>

<style lang="scss" scoped>
  .Icon-group {
    padding-top: 15px;
    padding-right: 15px;
  }
  .buttons {
    height: 20px;
    cursor: pointer;
    margin-left: 10px;
    path {
      fill: darken($colorBlueGrey, 10%);
      &:hover {
        fill: $colorRed;
      }
    }
  }
.Footer {
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

.Icon--mute {
  & path {
    transition: $transitionDefault;
  }
}

.Icon--muted {
  & path {
    transition: $transitionDefault;
  }
}

.Icon-wrapper {
  &:hover .Icon--muted path:first-child {
    fill: $colorRed;
  }
  &:hover .Icon--mute path {
    fill: $colorRed;
  }
  &:hover .Icon--skip polygon, 
  &:hover .Icon--skip rect {
    fill: $colorRed;
  }
}

.Icon--skip {
  & polygon, & rect {
    transition: $transitionDefault;
  }
}

.Round-wrapper {
  text-align: center;
  p {
    float: left;
    &.TextButton {
      margin-right: 15px;
    }
  }
}
</style>
