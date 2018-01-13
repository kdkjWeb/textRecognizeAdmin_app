<template>
	<div style="height: 100%">
		<div class="header">
			<mu-appbar 
			style="text-align:center"
			title="消息推送">

				<mu-icon-button 
			    icon="chevron_left" 
			    slot="left"
			    @click="goBack"/>

			    <mu-raised-button
			    label="建议" 
			    class="demo-raised-button"
			    slot="right" 
			    secondary
			    @click="suggestDialog.show = true"/>
			</mu-appbar>
		</div>
		<div class="content">
			<mu-list>
				<div
				style="border-bottom: 1px solid #f1f1f1"
				v-for="msg, index in sysMsgList"
				:key="index"
				@click="$router.push({
					name: 'SysMessageDetail',
					query: { id: msg.id}
				})">
					<mu-list-item 
					:title="msg.title" 
					:afterText="msg.date">
					</mu-list-item>
					<!-- <mu-divider/> -->
				</div>
			</mu-list>
		</div>

		<!-- 建议弹出框 -->
		<mu-dialog :open="suggestDialog.show" @close="suggestCancel">
			<mu-text-field 
			hintText="推送建议:" 
			multiLine :rows="3" 
			:rowsMax="6"
			v-model="suggestDialog.model" 
			fullWidth/>
			<footer>
				<mu-raised-button 
				secondary 
				@click="suggestSubmit" 
				label="确定"/>
				<mu-raised-button 
				
				@click="suggestCancel" 
				primary 
				label="取消"/>
			</footer>
		</mu-dialog>
	</div>
</template>

<script type="text/javascript">
	export {default} from './sysMessageListController'
</script>

<style type="text/css" scoped>
	footer{
		display: flex;
		justify-content: space-between;
	}
</style>