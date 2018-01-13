import services from './sysMessageDetailServices'

export default {
	data() {
		return {
			title: '标题',
			subTitle: '2018年1月8日',
			// fontSize: 'titleSize',
			comtent: '【2017国产动画报告&2018春季新作导视】全职高手特别篇、灵契第二季、一人之下第二季、狐妖小红娘南国篇、我家大师兄脑子有坑【2017国产动画报告&2018春季新作导视】全职高手特别篇、灵契第二季、一人之下第二季、狐妖小红娘南国篇、我家大师兄脑子有坑www.baidu.com'
		}
	},
	methods: {
		save(){
			console.log(this.userPhone)
		},
		goBack(){
			this.$router.goBack()
		}
	}
}