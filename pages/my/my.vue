<template>
	<view class="my-wrapper">
		<view class="history-news-hint">
			<image :src="historyNewsStatus? historyNewsPicUrl:noHistoryNewsPicUrl" mode="aspectFill"></image>
			<view v-if="!historyNewsStatus" class="hint">没有记录</view>
		</view>
		<view class="history-news-wrapper">
			<newBox v-for="item in historyNews" :key="item.id" :item="item" @goNewsDetail="goNewsDetail"></newBox>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyNews: [],
				historyNewsStatus: true,
				noHistoryNewsPicUrl: '../../static/img/noNewsHistory.png',
				historyNewsPicUrl: '../../static/img/newsHistory.png'
			};
		},
		methods: {
			goNewsDetail(e) {
				//跳转到新闻详情页
				uni.navigateTo({
					url: `/pages/newsDetail/newsDetail?cid=${e.cid}&id=${e.id}`
				})
			},
			getHistoryNews() {
				//获取历史记录
				var historyNews = uni.getStorageSync("historyArr")
				// console.log(historyNews);
				if (historyNews) {
					this.historyNewsStatus = true;
				} else {
					this.historyNewsStatus = false;
				}
				this.historyNews = historyNews;
			}
		},
		onShow() {
			// console.log("获取缓存新闻");
			this.getHistoryNews();
		}
	}
</script>

<style lang="scss" scoped>
	.my-wrapper {
		.history-news-hint {
			display: flex;
			align-items: center;
			flex-direction: column;

			image {
				transform: scale(0.6);
			}

			.hint {
				text-align: center;
				font-size: 30rpx;
			}
		}
	}
</style>
