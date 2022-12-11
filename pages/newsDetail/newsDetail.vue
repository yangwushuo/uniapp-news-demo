<template>
	<view class="detail">
		<view class="title">{{detail.title}}</view>
		<view class="info">
			<view class="author">编辑：{{detail.author}}</view>
			<view class="time">发布日期：{{detail.posttime}}</view>
		</view>
		<view class="content">
			<rich-text :nodes="detail.content"></rich-text>
		</view>
		<view v-if="contentStatus">
			<image class="load-failed-img" :src="loadFailedPicUrl" mode="aspectFill"></image>
		</view>
		<view class="description">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script>
	import API from '../../utils/request.js'
	import {
		timestampFormat
	} from '../../utils/tool.js'
	export default {
		data() {
			return {
				detail: {
					title: 'xxxx',
					author: 'xxxx',
					posttime: 13413412341,
					content: 'xxxxx',
					contentStatus: false,
					loadFailedPicUrl: '../../static/img/loadFailed.png'
				}
			};
		},
		methods: {
			getNewsDetail(data) {
				API.get('/dataApi/news/detail.php', data)
					.then((res) => {

						if (!res.id) {
							this.contentStatus = true;
							return;
						}

						res.content = res.content.replace(/<img/gi, '<img style="max-width:100%;border-radius:5px"');
						res.posttime = timestampFormat(res.posttime);
						this.detail = res;
						this.saveHistory();
						uni.setNavigationBarTitle({
							title: this.detail.title
						})
					})
					.catch((err) => {
						this.contentStatus = true;
					})
			},
			saveHistory() {
				//历史记录保存到本地缓存
				let historyArr = uni.getStorageSync("historyArr") || []
				let item = {
					id: this.detail.id,
					classid: this.detail.classid,
					picurl: this.detail.picurl,
					title: this.detail.title,
					author: this.detail.author,
					hits: this.detail.hits,
					looktime: timestampFormat(Date.now() / 1000)
				}

				let index = historyArr.findIndex(i => {
					return i.id == this.detail.id
				})

				if (index >= 0) {
					historyArr.splice(index, 1)
				}

				historyArr.unshift(item)
				historyArr = historyArr.slice(0, 10)
				uni.setStorageSync("historyArr", historyArr)
			}
		},
		onLoad(e) {
			this.getNewsDetail(e);
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 46rpx;
			color: #333;
		}

		.info {
			background: #F6F6F6;
			padding: 20rpx;
			font-size: 25rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;
		}

		.content {
			padding-bottom: 50rpx;


		}

		.description {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;
		}
	}
</style>
