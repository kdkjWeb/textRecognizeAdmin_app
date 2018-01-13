export default {
	data() {
		return {
			oldPassword: '',
			newPassword: '',
			lastPassword: ''
		}
	},
	methods: {
		save(){
			//console.log(this.oldPassword,this.newPassword,this.lastPassword)

			//8-20位字母数字组合
			let reg = /^[A-Za-z0-9]{8,20}$/;
			let old = reg.test(this.newPassword);
			let last = reg.test(this.lastPassword);
			if(this.oldPassword == ''||this.newPassword == '' || this.lastPassword == ''){
				this.$toast('您还有内容没输入');
				return;
			}
			/* if(this.oldPassword != userPass){
				this.$toast('原密码不正确');
			 	return;
			 }*/
			if(this.newPassword != this.lastPassword){
				this.$toast('两次输入的密码不一致');
				return;
			}
			if(!old || !last){
				this.$toast('请输入8-20位字母数字组合格式');
				return;
			}
			axios.post('/password',{
				oldPassword: this.oldPassword,
				newPassword: this.newPassword,
				lastPassword: this.lastPassword
			}).then(res=>{
				if(res.data.code == '0'){
					this.$router.push('/mine')
				}
			}).catch(error=>{
				this.$toast('操作失败，请稍后再操作！');
			})
		},
		backFriends(){
			this.$router.back(-1)
		}
	}
}