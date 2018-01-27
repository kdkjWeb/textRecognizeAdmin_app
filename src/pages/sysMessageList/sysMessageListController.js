//import services from './sysMessageListServices'
import Axios from '@/server/index'
export default {
	data() {
		return {
			height: 0,
			suggestDialog: {
				show: false,
				model: '', //建议的model
				title: ''  //建议的标题
			},
			sysMsgList: []
		}
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},
		//点击遮罩层关闭遮罩层和弹框
		close(){
			this.suggestDialog.show = false
		},

		/* 发布 */
		suggestSubmit() {
			
			//提交建议信息
			this.suggestDialog.show = false
			if(!this.suggestDialog.model&&!this.suggestDialog.title){
				this.$toast('你还有内容没有输入')
				return
			}
		
			Axios.post('admin/addBroadCast',{
				msg: this.suggestDialog.model,
				date: (new Date).getTime(),
				title: this.suggestDialog.title
			}).then(res=>{
				if(res.data.code == 0){
					this.$toast('发布成功')
					 this.suggestDialog.model = ''
					 this.suggestDialog.title = ''
					 this._initMessageList()
				}
			},err=>{
				console.log(err)
			})
		},
		suggestCancel() {
			this.suggestDialog.show = false
		},	
		_initMessageList(){
			Axios.get('message/broadcast').then(res=>{
				if(res.data.data.length>0){
					this.sysMsgList = res.data.data.reverse()
				}
			})
		}
	},
	mounted(){
		this._initMessageList()
		this.height = window.innerHeight + 'px'
	}
}