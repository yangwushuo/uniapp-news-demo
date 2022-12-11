<template>
	<view class="container">
		<scroll-view scroll-x enable-flex class="new-column-scroll">
			<view class="new-column-wrapper">
				<view class="new-column" :class="activeColumnIndex == item.id ? 'new-column-active':''"
					v-for="item in newColunmList" :key="item.id" @click="changeActiveColunm(item.id)">{{item.classname}}
				</view>
			</view>
		</scroll-view>
		<scroll-view v-if="newList.length != 0" scroll-y class="content-wrapper" @scrolltolower="contentWrapperBottom"
			:refresher-enabled="refreshNewConfig.refresherEnabled"
			:refresher-default-style="refreshNewConfig.refresherDefaultStyle"
			:refresher-threshold="refreshNewConfig.refresherThreshold"
			:lower-threshold="refreshNewConfig.lowerThreshold"
			:refresher-triggered="refreshNewConfig.refresherTriggered" @refresherrefresh="refreshNews">
			<view class="news-wrapper">
				<newBox v-for="item in newList" :key="item.id" :item="item" @popPic="popNewBoxPicShow"
					@goNewsDetail="goNewsDetail" @click.native="goNewDetail(1)">
				</newBox>
			</view>
			<view class="new-loading-wrapper" v-if="newList.length != 0 && moreShow">
				<view v-if="moreStatus">正在获取...</view>
				<view v-else>没有更多了</view>
			</view>
		</scroll-view>
		<view class="nonew-wrapper" v-if="newList.length == 0">
			<image :src="noNewPicUrl" mode="aspectFill" class="nonew-img"></image>
		</view>
		<van-popup custom-style="height: auto; background-color: transparent;" class="a" :show="popPicConfig.show"
			@close="popNewBoxPicClose">
			<image class="popPic" :src="popPicConfig.popPicUrl" mode=""></image>
		</van-popup>
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
				activeColumnIndex: "0",
				newColunmList: [],
				newList: [],
				page: 1,
				num: 10,
				noNewPicUrl: '../../static/img/nonew.png',
				refreshNewConfig: {
					refresherEnabled: true,
					refresherDefaultStyle: "none",
					refresherThreshold: 0,
					refresherTriggered: false,
					lowerThreshold: 50
				},
				moreShow: false,
				moreStatus: true,
				popPicConfig: {
					show: false,
					popPicUrl: '',
				}
			}
		},
		onLoad() {
			this.getNewColumn();
		},
		methods: {
			popNewBoxPicShow(e) {
				this.popPicConfig.show = true;
				this.popPicConfig.popPicUrl = e;
			},
			popNewBoxPicClose() {
				this.popPicConfig.show = false;
			},
			goNewsDetail(e) {

				//跳转到新闻详情页
				uni.navigateTo({
					url: `/pages/newsDetail/newsDetail?cid=${e.cid}&id=${e.id}`
				})
			},
			refreshNews() {
				//刷新新闻
				// console.log("开始刷新");
				this.getNews(1, 1);
			},
			contentWrapperBottom() {
				//滚动条滚动
				// console.log("底部");
				this.moreShow = true;
				this.moreStatus = true;
				this.page += 1;
				this.getNews(2)
			},
			changeActiveColunm(colunmIndex) {
				this.activeColumnIndex = colunmIndex;
				//初始化
				this.page = 1;
				//重新过去新闻
				this.getNews();
				//重置底部状态 

			},
			getNewColumn() {
				//获取导航栏目
				API.get(
						'/dataApi/news/navlist.php', {})
					.then((res) => {
						if (res.length == 0) {
							return;
						}

						this.newColunmList = res;
						this.activeColumnIndex = res[0].id;
						this.getNews();
					})
			},

			getNews(dir = 0, page = this.page) {
				// 获取新闻
				API.get('/dataApi/news/newslist.php', {
					cid: this.activeColumnIndex,
					num: this.num,
					page: page,
				}).then((res) => {

					//判断刷新方向
					//时间戳转换
					res.forEach((item) => {
						item.posttime = timestampFormat(item.posttime);
					})

					if (dir == 1) {
						//筛选出最新的几个
						res.forEach((nitem) => {
							//

							var findRes = this.newList.find((oitem) => {
								return nitem.id == oitem.id
							})

							console.log(findRes);
							if (!findRes.id) {
								// console.log("头部添加");
								this.newList.unshift(nitem);
							}
						})

					} else if (dir == 2) {
						// console.log(res);
						if (res.length == 0) {
							//没有更多
							this.moreStatus = false
						} else {
							//添加到尾部
							this.newList.push(...res);
							this.moreShow = false;
						}
					} else {
						this.newList = res;
						if (res.length < this.num) {
							this.moreShow = true;
							this.moreStatus = false;
						} else if (res.length == 5) {
							//如果刚好等于5个获取第二页判断是否还有新闻
							API.get('/dataApi/news/newslist.php', {
								cid: this.activeColumnIndex,
								num: this.num,
								page: 2,
							}).then((res) => {
								if (res.length == 0) {
									this.moreShow = true;
									this.moreStatus = false;
								}
							})
						}
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.new-column-scroll {
		z-index: 10;
		top: var(--window-top);
		left: 0;
		position: fixed;
		height: 100rpx;
		width: 100%;
		top: var(--window-top);
		background-color: white;
		border-bottom: rgba(0, 0, 0, 0.1) 1px solid;

		.new-column-wrapper {
			height: 100%;
			white-space: nowrap;
			line-height: 100rpx;

			.new-column {
				border-radius: 25rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #f3f3f5;
				display: inline-block;
				color: #505050;
				font-size: 26rpx;
				padding: 0 30rpx;
				margin-left: 10rpx;
			}

			.new-column:last-child {
				margin-right: 10rpx;
			}

			.new-column-active {
				box-shadow: #ff7b00 0rpx 0rpx 0rpx 2rpx;
			}
		}

	}

	.content-wrapper {
		height: 100vh;

		.news-wrapper {
			padding-top: 100rpx;
		}
	}

	.nonew-wrapper {
		text-align: center;

		.nonew-img {
			position: relative;
			top: 30vh;
			width: 50%;
		}
	}

	.new-loading-wrapper {
		height: 60rpx;
		color: #505050;
		font-size: 30rpx;
		padding: 15rpx;
		text-align: center;
	}

	.popPic {
		border-radius: 25rpx;
	}
</style>
