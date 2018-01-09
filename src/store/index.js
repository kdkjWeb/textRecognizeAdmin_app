/**
 * vuex config manage
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//存放用户
		user: {},

		//存放房间信息
		roomInfo: {},

		//存放聊天信息
		messageHistory: {},

	},
	getters: {},
	mutations: {},
	actions: {},
})

export default store