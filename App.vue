<script>
	import 'material-symbols';
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";

	/*每个页面公共css */
	view {
		box-sizing: border-box;
	}
</style>
