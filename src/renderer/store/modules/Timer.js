import { createLocalStore } from '@/utils/local-store'

const localStore = createLocalStore()

const state = {
  round: 1,
  workRounds: parseInt(localStore.get('workRounds')),
  rate: parseInt(localStore.get('rate')),
  history: localStore.get('history') ? JSON.parse(localStore.get('history')) : [],
  timeLongBreak: parseInt(localStore.get('timeLongBreak')),
  timeShortBreak: parseInt(localStore.get('timeShortBreak')),
  timeWork: parseInt(localStore.get('timeWork')),
  currentRound: 'work', // work, short-break, long-break
  isMuted: false
}

const getters = {
  round () {
    return state.round
  },
  workRounds () {
    return state.workRounds
  },
  rate () {
    return state.rate
  },
  history () {
    return state.history
  },
  timeLongBreak () {
    return state.timeLongBreak
  },
  timeShortBreak () {
    return state.timeShortBreak
  },
  timeWork () {
    return state.timeWork
  },
  currentRound () {
    return state.currentRound
  },
  isMuted () {
    return state.isMuted
  }
}

const mutations = {
  INCREMENT_ROUND (state) {
    state.round += 1
  },

  RESET_ROUND (state) {
    state.round = 1
  },

  RESET_DEFAULTS (state) {
    state.workRounds = 4
    state.timeLongBreak = 15
    state.timeShortBreak = 5
    state.timeWork = 25
  },

  SET_CURRENT_ROUND (state, payload) {
    state.currentRound = payload
  },

  SET_TIME_LONG_BREAK (state, payload) {
    state.timeLongBreak = payload
  },

  SET_TIME_SHORT_BREAK (state, payload) {
    state.timeShortBreak = payload
  },

  SET_TIME_WORK (state, payload) {
    state.timeWork = payload
  },

  SET_WORK_ROUNDS (state, payload) {
    state.workRounds = payload
  },

  SET_RATE (state, payload) {
    state.rate = payload
  },

  SET_HISTORY (state, payload) {
    state.history.push(payload)
  },

  CLEAR_HISTORY (state, payload) {
    state.history = []
  },

  TOGGLE_MUTE (state) {
    state.isMuted = !state.isMuted
  }
}

const actions = {
  incrementRound ({ commit }) {
    commit('INCREMENT_ROUND')
  },

  resetRound ({ commit }) {
    commit('RESET_ROUND')
  },

  resetDefaults ({ commit }) {
    commit('RESET_DEFAULTS')
    localStore.setData({
      workRounds: '4',
      timeLongBreak: '15',
      timeShortBreak: '5',
      timeWork: '25'
    })
  },

  setCurrentRound ({ commit }, payload) {
    commit('SET_CURRENT_ROUND', payload)
  },

  setTimeLongBreak ({ commit }, payload) {
    commit('SET_TIME_LONG_BREAK', payload)
    localStore.set('timeLongBreak', payload)
  },

  setTimeShortBreak ({ commit }, payload) {
    commit('SET_TIME_SHORT_BREAK', payload)
    localStore.set('timeShortBreak', payload)
  },

  setTimeWork ({ commit }, payload) {
    commit('SET_TIME_WORK', payload)
    localStore.set('timeWork', payload)
  },

  setWorkRounds ({ commit }, payload) {
    commit('SET_WORK_ROUNDS', payload)
    localStore.set('workRounds', payload)
  },

  setRate ({ commit }, payload) {
    commit('SET_RATE', payload)
    localStore.set('rate', payload)
  },

  setHistory ({ commit }, payload) {
    commit('SET_HISTORY', payload)
    localStore.set('history', JSON.stringify(state.history))
  },

  clearHistory ({ commit }, payload) {
    commit('CLEAR_HISTORY', payload)
    localStore.set('history', JSON.stringify(state.history))
  },

  toggleMute ({ commit }) {
    commit('TOGGLE_MUTE')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
