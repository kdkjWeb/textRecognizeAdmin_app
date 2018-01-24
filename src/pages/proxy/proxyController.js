import Axios from '@/server/index'
//import services from './proxyServices'
import scroll from 'better-scroll'
//import {mapGetters} from 'vuex'
export default {
	data() {
		return {
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
				model: {
					id: '',
					nickName: '',
					level: '',
					date: '',
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
	},
	methods:{
		//点击搜索按钮查询
		search() {
			if(!this.searchModel){
				this.$toast('输入内容不能为空')
			}else{
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: 1,
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
				type: 1,
				current: 1,
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
			console.log(user)
			Object.assign(this.user, {
				nickname: user.nickname,
				phone: user.phone,
				grade: user.level
			})
			/*this.user.nickname = user.nickname
			this.user.phone = user.phone
			this.user.grade = user.level*/
		},
		editSubmit() {
			this.editDialog.show = false
		},
		editCancel() {
			this.editDialog.show = false
		},
		//查询代理用户
		/*_searchProxyList(){
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: 1,
				pageSize: 5,
				orderBy: 'nickname'
			}).then(res=>{
				
				this.userList = JSON.parse(res.data.data);
				
			})
		},*/
	
		//初始化滚动插件
		_initScroll(){
			let that = this;
			Axios.post('admin/selectUsersList',{
				type: 1,
				current: this.current,
				pageSize: this.pageSize,
				orderBy: 'nickname'
			}).then(res=>{
				this.userList = JSON.parse(res.data.data);
				//console.log(this.userList)
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
				type: 1,
				current: ++this.current,
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
		//使用better-scroll 滚动插件 
		/*this.$nextTick(()=>{
			new scroll(this.$refs['userList'],{
				click: true
			})
		})*/

		// 监听窗口改变重置高度
        window.addEventListener('resize', () => {
            this.height = (window.innerHeight-142) + 'px';
        })
        
        
        //查询代理商用户
      //this._searchProxyList()
      
       this._initScroll();
	},
	/*computed: {
		...mapGetters({
			user: 'getUser'
		})
	},*/
}