export default {
	data() {
		return {
			userName: ''
		}
	},
	methods: {
		save(){
			console.log(this.userName)
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}