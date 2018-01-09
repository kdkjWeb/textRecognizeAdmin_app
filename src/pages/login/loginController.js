export default {
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	methods: {
		login() {
			console.log(this.userName, this.password)
			// this.$toast("login error")
			this.$router.push({
				path: '/index'
			})
		}
	},
}