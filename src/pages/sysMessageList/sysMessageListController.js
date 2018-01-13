import services from './sysMessageListServices'
export default {
	data() {
		return {
			suggestDialog: {
				show: false,
				model: '', //建议的model
			},
			sysMsgList: [
				{
					id: '1',
					title: '推送消息1',
					date: '2018-1-2'
				},
				{
					id: '2',
					title: '推送消息2',
					date:'2018-1-1'
				},
				{
					id: '3',
					title: '推送消息3',
					date: '2018-1-1'
				},
				{
					id: '4',
					title: '推送消息4',
					date: '2017-12-31'
				},
				{
					id: '5',
					title: '推送消息5',
					date: '2017-12-30'
				}
			]
		}
	},
	methods:{
		goBack() {
			//断开socket链接
			this.$router.goBack()
		},

		/* 建议 */
		suggestSubmit() {
			//提交建议信息
			this.suggestDialog.show = false
		},
		suggestCancel() {
			this.suggestDialog.show = false
		},
	}
}