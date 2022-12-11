<template>
	<view class="main">
		<view class="wrapper">
			<view class="pic-wrapper">
				<image :src="item.picurl" mode="aspectFill" @click="popPic"></image>
			</view>
			<view class="ninfo-wrapper" @click="goNewsDetail">
				<view class="ninfo-title" :style="{color: (titleClicked == true ? '#a5a9ab':'')}">{{item.title}}
				</view>
				<view class="ninfo-summary">
					<view>作者:{{item.author}}</view>
					<view>浏览:{{item.hits}}</view>
					<view v-if="item.looktime">记录时间:{{item.looktime}}</view>
					<view v-else>时间:{{item.posttime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newBox",
		props: {
			item: {
				type: Object,
				default () {
					return {
						title: "新闻标题",
						picurl: "/static/img/nopic.png",
						posttime: "2000-1-1 00:00:00",
						hits: "999",
						classid: "50",
						author: "盘古",
						looktime: '',
					}
				}
			}
		},
		data() {
			return {
				titleClicked: false
			}
		},
		methods: {
			popPic() {
				this.$emit('popPic', this.item.picurl);
			},
			goNewsDetail() {

				//修改标题为灰色
				this.titleClicked = true;

				this.$emit('goNewsDetail', {
					cid: this.item.classid,
					id: this.item.id,
					title: this.item.title
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main {}

	.wrapper {
		display: flex;
		box-sizing: border-box;
		padding: 13rpx 13rpx 0px 13rpx;

		.pic-wrapper {
			image {
				width: 200rpx;
				height: 200rpx;
				vertical-align: bottom; //解决图片底部留白
				border-radius: 10rpx;
			}
		}

		.ninfo-wrapper {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-around;
			padding: 0rpx 15rpx 0rpx 15rpx;

			.ninfo-title {
				font-size: 34rpx;
				overflow: hidden;
				display: -webkit-box; //使用自适应布局
				-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
				-webkit-box-orient: vertical;
			}

			.ninfo-summary {
				font-size: 25rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between
			}
		}
	}
</style>
