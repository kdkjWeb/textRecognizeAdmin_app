export default {
	data() {
		return {
			 bottomNav: ''
		}
	},
	mounted() {
		let str = this.$route.path
		this.bottomNav = str.substring(7, str.length)
	},
	methods: {
		handleChange (val) {
	      this.bottomNav = val
	    }
	},

}