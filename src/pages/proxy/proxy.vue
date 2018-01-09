<template>
	<div style="height:100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="代理">
				<mu-icon-button 
			    icon="" 
			    slot="left"/>
			    <mu-icon-menu
			     icon="unfold_more" 
			     slot="right"
			     :anchorOrigin="{vertical: 'top',horizontal: 'left'}"
		         :targetOrigin="{vertical: 'bottom',horizontal: 'left'}">
			    	<mu-menu-item title="按时间" />
				    <mu-menu-item title="按等级" />
			    </mu-icon-menu>
			</mu-appbar>
		</div>
		<div class="content">
			<div class="middle">
				<div class="search">
					<input type="text" placeholder="搜索用户">
					<div class="verLine"></div>
					<mu-icon 
					value="search"
					@click="search"/>
				</div>
			</div>
			<div class="userList">
				<mu-list style="padding: 0">
					<mu-list-item
					v-for="user, index in userList"
					:key="index"
					style="border-bottom:1px solid #fafafa" 
					:title="user.userName">
				      <mu-avatar 
				      :src="user.header" 
				      slot="leftAvatar"/>
				      <mu-icon 
				      value="border_color"
				      :size="18" 
				      slot="right"
				      @click="editDialog.show = true"/>
				    </mu-list-item>
				</mu-list>
			</div>
		</div>

		<!-- 代理用户信息修改dialog -->
		<mu-dialog 
		:open="editDialog.show" 
		@close="editCancel"
		style="padding: 0">
			<header>
				<div class="header">
					<mu-avatar
					:size="70" 
					slot="left" 
					src="/static/header2.jpg"/>
				</div>
				<div class="info">
					<p>
						<span>昵称:</span>
						<span>会飞的肥肉</span>
					</p>
					<p>
						<span>账号:</span>
						<span>1234567890</span>
					</p>
					<p>
						<span>等级:</span>
						<span>1</span>
					</p>
				</div>
			</header>
			<div>
				<div class="options">
					<div class="up_Low">
						<mu-select-field 
						v-model="editDialog.model.level"
						label="升降级" 
						fullWidth>
						    <!-- <mu-menu-item 
						    v-for="lev,index in levelList" 
						    :key="index" 
						    :value="lev.key" 
						    :title="lev.label" /> -->
						    <mu-menu-item value="1" title="1"/>
						    <mu-menu-item value="2" title="2"/>
						    <mu-menu-item value="3" title="3"/>
					    </mu-select-field>
					</div>
					<div class="date">
						<span style="font-size:13px">代理时间:</span><mu-date-picker hintText="请选择"/>
					</div>
				</div>
			</div>
			<footer>
				<mu-raised-button 
				label="确定" 
				secondary
				@click="editSubmit"/>

				<mu-raised-button
				label="取消" 
				primary
				@click="editCancel"/>
			</footer>
		</mu-dialog>
	</div>
</template>

<script type="text/javascript">
	export {default} from './proxyController'
</script>
<style type="text/css">
	.mu-dialog-body{padding: 0 !important;}
</style>

<style type="text/css" scoped>
	.content{
		height: -webkit-calc(100% - 56px);
		height: -moz-calc(100% - 56px);
		height: calc(100% - 56px)
	}
	.middle{
		padding: 4% 0;
		background-color: #fafafa;
	}
	.search{
		width: 80%;
		margin: 0 auto;
		border: 1px solid #2196f3;
		display: flex;
		background-color: #fff;
		padding: 2% 5%;
		border-radius: 20px;
	}
	.search input{
		border: none;
		width: 100%;
	}
	.verLine{
		width: 1px;
		height: 24px;
		background: #2196f3;
		margin: 0 9px;
	}
	.userList{
		background-color: #fff;
		height: -webkit-calc(100% - 71px);
		height: -moz-calc(100% - 71px);
		height: calc(100% - 71px);
		overflow-y: scroll;
	}


	/**
	 * dialog
	 */
	
	header{
		display: flex;
		background-color: #039be5;
		padding: 5% 10%;
	}
	header .header{
		margin: 5px 20px 0 0;
	}
	header p{
		margin-bottom: 10px;
		font-size: 13px;
		color: #fff;
	}
	.options{
		padding: 0 5%;
	}
	footer{
		padding: 5% 10%;
		display: flex;

		justify-content: space-between;
		width: 100%;
	}
</style>