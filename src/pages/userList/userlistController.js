import services from './userlistServices'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			height: 0,
			//所查询到的用户列表
			userList: [
				{
					header: '/static/header1.jpeg',
					userName: 'Macao Mai',
					id: '1'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Paca Tie',
					id: '2'
				},
				{
					header: '/static/header3.jpg',
					userName: 'Mikey',
					id: '3'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Tom',
					id: '4'
				},
				{
					header: '/static/header1.jpeg',
					userName: 'Macao Mai',
					id: '1'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Paca Tie',
					id: '2'
				},
				{
					header: '/static/header3.jpg',
					userName: 'Mikey',
					id: '3'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Tom',
					id: '4'
				},
				{
					header: '/static/header1.jpeg',
					userName: 'Macao Mai',
					id: '1'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Paca Tie',
					id: '2'
				},
				{
					header: '/static/header3.jpg',
					userName: 'Mikey',
					id: '3'
				},
				{
					header: '/static/header2.jpg',
					userName: 'Tom',
					id: '4'
				}
			],

			editDialog: {
				show: false,
				value: 'yes',
			},

			levelList: [
				{
					key: 1,
					label: '1'
				},
				{
					key: 2,
					label: '2'
				},
				{
					key: 3,
					label: '3'
				},
			] 
		}
	},
	created() {
		this.height = (window.innerHeight-112) + 'px';
	},
	methods:{
		search() {

		},

		editSubmit() {
			this.editDialog.show = false
			console.log(this.editDialog.value)
		},
		editCancel() {
			this.editDialog.show = false
		},
		
	},
	mounted() {
		//使用 better-scroll滚动插件
		this.$nextTick(()=>{
			new scroll(this.$refs['userList'],{
				click: true
			})
		})
		
		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-112) + 'px';
        })
	}
}