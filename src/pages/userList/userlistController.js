//import services from './userlistServices'
import Axios from '@/server/index'
import scroll from 'better-scroll'
export default {
	data() {
		return {
			//改变箭头的状态
			ActShow:{
				show: false,
				show1:false
			},
			height: 0,
			current: 1,  //当前页码
			pageSize: 10,   //每次请求的数据条数
			loadingMore:'加载更多',
			searchModel: '',   //收索框内容
			isLoading: true,
			//所查询到的用户列表
			userList: [],
			proxyUser: {
				nickName: '',
				phone: ''
			},
			editDialog: {
				show: false,
				value: '1',
				model: {
					id: '',
					nickName: '',
					level: '',
					date: '',
					phone: '',
					grade: '',
					pictureAddress: ''
				}, 
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
		
		//按时间排序
		timeSort(){
			//从高到底
			if(!this.ActShow.show){
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'regist_time',
						sort: 'desc'
				}).then(res=>{
					console.log(res.data.data)
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show = !this.ActShow.show
			}else{
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'regist_time',
				}).then(res=>{
					console.log(res.data.data)
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show = !this.ActShow.show
			}
		},
		
		//按等级排序
		leavelSort(){
				//从高到底
			if(!this.ActShow.show1){
				console.log(11)
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'level',
						sort: 'desc'
				}).then(res=>{
					console.log(res.data.data)
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}else{
				console.log(22)
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: 10,
						orderBy: 'level',
				}).then(res=>{
					console.log(res.data.data)
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}
		},
		
		
		//点击搜索按钮查询
		search() {
			if(!this.searchModel){
				this.$toast('输入内容不能为空')
			}else{
			Axios.post('admin/selectUsersList',{
				type: 0,
				current: this.current,
				pageSize: 10,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				this.isLoading = false
				if(res.data.code == 500){
					this.userList = []
					this.$toast('找不到此用户')
				}
				this.userList = JSON.parse(res.data.data);
			}).catch(err=>{
				console.log(err)
			})
			}
		},
		
		//实时搜索
		selectUp(){
			Axios.post('admin/selectUsersList',{
				type: 0,
				current: this.current,
				pageSize: 10,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				if(res.data.code == 0){
					this.isLoading = false
					this.userList = JSON.parse(res.data.data);
				}
			})
		},
		
		//点击弹出框的确认按钮
		editSubmit() {
			this.editDialog.show = false
			if(this.editDialog.value == 1){
				
				Axios.post('admin/upToProxy',{
					id: this.editDialog.model.id
				}).then(res=>{
					this.searchModel = ''
					this.$toast('操作成功')
					Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: this.pageSize,
						orderBy: 'nickname'
					}).then(res=>{
						this.userList = JSON.parse(res.data.data);
					})
				})
			}
			
			
		},
		
		//点击弹出框的取消按钮
		editCancel() {
			this.editDialog.show = false
			this.searchModel = ''
			Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: this.pageSize,
						orderBy: 'nickname'
					}).then(res=>{
						this.userList = JSON.parse(res.data.data);
					})
		},
		
		// 点击操作弹出框显示
		openDialog(user){
			//this.editDialog.model.pictureAddress = user.pictureAddress
			Axios.post('admin/getProxyMsg',{
				id: user.id,
			}).then(res=>{
				console.log(res)
				if(res.data.code == 0){
					Object.assign(this.proxyUser,{
					nickName: JSON.parse(res.data.msg).nickname,
					phone: JSON.parse(res.data.msg).phone,
					
				})
				}
			})
			this.editDialog.show = true
			Object.assign(this.editDialog.model,{
				id: user.id,
				nickName: user.nickname,
				phone: user.phone,
				level: user.level,
				pictureAddress: user.pictureAddress
			})
			
		},
		
		//初始化滚动插件
		_initScroll(){
			let that = this;
			Axios.post('admin/selectUsersList',{
				type: 0,
				current: this.current,
				pageSize: this.pageSize,
				orderBy: 'nickname'
			}).then(res=>{
				this.userList = JSON.parse(res.data.data);
				this.$nextTick(()=>{
					if(!this.Scroll){
						this.Scroll = new scroll(this.$refs['userList'],{
							click: true,
							scrollY: true,
							pullUpLoad: {
								threshold: -70
							}
						})
						this.Scroll.on("pullingUp",()=>{
							that.loadData();
							that.$nextTick(()=>{
								that.Scroll.finishPullUp();
								that.Scroll.refresh();
							})
						})
						this.Scroll.on("pullingDown",()=>{
							this.current--
						})
						
					}
				})
			}).catch(err=>{
				this.isLoading = false,
				this.$toast('网络异常')
			})
		},
		
		//给页面添加数据
		loadData(){
			Axios.post('admin/selectUsersList',{
				type: 0,
				current: this.current++,
				pageSize: this.pageSize,
				orderBy: 'nickname'
			}).then(res=>{
				if(res.data.code == 0){
					console.log(res.data.msg)
				let userMore = JSON.parse(res.data.data);
				this.userList.push.apply(this.userList,userMore)
				console.log(this.userList)
				}else if(res.data.code == 500){
					this.isLoading = true,
					this.loadingMore = '没有更多数据了'
					this.$toast(res.data.msg)
				}
			}).catch(err=>{
				this.isLoading = true,
				this.loadingMore = '网络异常'
				console.log(err)
			})
		}
		
		
	},
	mounted() {
		
		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-112) + 'px';
        })
        
       //调用滚动插件初始化数据
       this._initScroll()
	}
}