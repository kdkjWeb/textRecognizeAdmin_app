import Axios from '@/server/index'
//import services from './proxyServices'
import scroll from 'better-scroll'
//import {mapGetters} from 'vuex'
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
			user:{
				nickname:'',
				phone: '',
				grade: ''
			},
			editDialog: {
				show: false,
				value: '0',
				model: {
					id: '',
					nickName: '',
					level: '',
					date: '',
					phone: '',
					grade: '',
					pictureAddress: '',
					expireDate: '',
					minDate: ''
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
		this.height = (window.innerHeight -142) + 'px';
		this.editDialog.model.minDate = new Date()
	},
	methods:{
		//按时间排序
		timeSort(){
			//从高到底
			if(!this.ActShow.show){
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: 10,
						orderBy: 'expire_date',
						sort: 'desc'
				}).then(res=>{
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
						type: 1,
						current: this.current,
						pageSize: 10,
						orderBy: 'expire_date',
				}).then(res=>{
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
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: 10,
						orderBy: 'proxy_level',  
						sort: 'desc'
				}).then(res=>{
					if(res.data.code == 0){
						this.userList = JSON.parse(res.data.data);
					}
				},err=>{
					this.$toast('操作失败!')
				})
				this.ActShow.show1 = !this.ActShow.show1
			}else{
				//从低到高
				Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: 10,
						orderBy: 'proxy_level',   // 以等级排序
				}).then(res=>{
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
				type: 1,
				current: this.current,
				pageSize: 10,
				orderBy: 'nickname',
				keyWord: this.searchModel
			}).then(res=>{
				
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
				type: 1,
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
		
		//打开弹出选择框
		openDialog(user){
			this.editDialog.show = true
			Object.assign(this.editDialog.model,{
				id: user.id,
				nickName: user.nickname,
				phone: user.phone,
				level: user.proxyLevel,
				pictureAddress: user.pictureAddress,
				expireDate: this.transTime(user.expireDate)
			})
		},
		
		//点击弹出框确认按钮
		editSubmit() {
			this.editDialog.show = false
			//  if(!this.editDialog.model.grade&&!this.editDialog.model.date){
			//  	this.$toast('操作失败，你还没有填写信息')
			//  	return
			//  }
			
			if(this.editDialog.value == 1){
				Axios.post('admin/proxyToUser',{
					id: this.editDialog.model.id
				}).then(res=>{
					console.log(res.data.code)
					this.searchModel = ''
					this.$toast('操作成功')
					if(res.data.code == 0){
						console.log(666)
						this._initScroll();
					}
					/*Axios.post('admin/selectUsersList',{
						type: 0,
						current: this.current,
						pageSize: this.pageSize,
						orderBy: 'nickname'
					}).then(res=>{
						this.userList = JSON.parse(res.data.data);
					})*/
				})
			}


			if(this.editDialog.model.grade||this.editDialog.model.date){
				console.log(11)
				Axios.post('user/update',{
					id: this.editDialog.model.id,
					proxyLevel: this.editDialog.model.grade,
					expireDate: (new Date(this.editDialog.model.date)).getTime()
				}).then(res=>{
					if(res.data.code == 0){
					
						/*Axios.post('admin/selectUsersList',{
							type: 1,
							current: this.current,
							pageSize: this.pageSize,
							orderBy: 'nickname'
						}).then(res=>{
							this.userList = JSON.parse(res.data.data);
							console.log(6666)
						})*/
						this.editDialog.model.grade = ''
						this.editDialog.model.date = ''
						this.$toast('操作成功')
						this._initScroll();
					}
				})
			}
			
		
		},
		
		// 点击弹出框取消按钮
		editCancel() {
			this.editDialog.show = false
			this.editDialog.model.grade = ''
			this.editDialog.model.date = ''
			this.searchModel = ''
			Axios.post('admin/selectUsersList',{
						type: 1,
						current: this.current,
						pageSize: this.pageSize,
						orderBy: 'nickname'
					}).then(res=>{
						this.userList = JSON.parse(res.data.data);
					})
		},

	
		//初始化滚动插件
		_initScroll(){
			let that = this;
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: this.current,
				pageSize: this.pageSize,
				orderBy: 'nickname'
			}).then(res=>{
				if(res.data.code == 0){
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
								//that.loadData();
								setTimeout(()=>{
									that.loadData();
									console.log(666)
								},2000)
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
				}else if(res.data.msg == '没有更多的消息'){
					this.userList = []
				}
				
				
			}).catch(err=>{
				this.isLoading = false,
				this.$toast('暂无代理商')
			})
		},
		
		//给页面添加数据
		loadData(){
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: this.current++,
				pageSize: this.pageSize,
				orderBy: 'nickname'
			}).then(res=>{
				if(res.data.code == 0){
				let userMore = JSON.parse(res.data.data);
				this.userList.push.apply(this.userList,userMore)
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
		},
		//转换时间戳成年月日
		transTime(val){
			var time = new Date(val);
			var year = time.getFullYear();
			var month = time.getMonth() > 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
			var day = time.getDate() > 10 ? time.getDate() : '0' + time.getDate();
			return (year + "-" + month + "-" + day);
		  },
	
	},
	mounted() {
		this.editDialog.model.minDate = new Date()

		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-142) + 'px';
        })
        
        //调用滚动插件初始化数据
       this._initScroll();
	}
}