import services from './sysMessageDetailServices'
import Axios from '@/server/index'
export default {
	data() {
		return {
			title: '',
			subTitle: '',
			comtent: ''
		}
	},
	methods: {	
		//返回上一页
		goBack(){
			this.$router.goBack()
			//返回重新请求数据
			Axios.get('message/broadcast').then(res=>{
				this.sysMsgList = res.data.data.reverse()
			})
		
		},
		
	},
	mounted() {
		this.title = this.$route.query.msg.title
		this.subTitle = this.$route.query.msg.date
		this.comtent =this.$route.query.msg.msg
	}
}