<template>
	<view>
		<view :hover-start-time="viewData.hoverStartTime" :hover-class="viewData.hoverClass">{{viewData.text}}1</view>
		<view>{{viewData.text}}2</view>
		<text>{{textData.text}}</text>
		<text>{{textData.text}}</text>
		<!-- 滚动 -->
		<scroll-view :scroll-y="scrollData.scrollY">
			<view class="scroll-wrapper">
				<view v-for="value, index in 6" :id="index" :hover-class="viewData.hoverClass">
					{{value}}
				</view>
			</view>
		</scroll-view>
		<!-- 滑块 -->
		<swiper class="swiper-wrapper" :indicator-dots="swiperData.indicatorDots" :autoplay="swiperData.autoplay"
			:interval="swiperData.interval">
			<swiper-item v-for="value, index in swiperData.imageData.src" :id="index">
				<view class="swiper-image">
					<image :mode="swiperData.imageData.mode" :src="value"></image>
				</view>
			</swiper-item>
		</swiper>
		<progress :percent="progressData.pgList[2]" show-info stroke-width="3"></progress>
		<!-- <audio :src=""></audio> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewData: {
					text: '我是一个大帅哥',
					hoverStartTime: 0,
					hoverClass: 'view-hover'
				},
				textData: {
					text: '我也是一个大帅哥'
				},
				scrollData: {
					scrollY: true
				},
				swiperData: {
					indicatorDots: true,
					autoplay: true,
					interval: 55000,
					imageData: {
						src: [
							'../../static/img/portrait_1.JPEG',
							'../../static/img/portrait_2.JPEG',
							'../../static/img/portrait_3.JPEG',
							'../../static/img/portrait_4.JPEG',
						],
						mode: 'widthFix'
					}
				},
				progressData: {
					pgList: [0, 25, 50, 75, 100],

				},
				audioData: {

				}
			};
		}
	}
</script>

<style lang="scss">
	.view-hover {
		font-size: 45rpx;
		color: red;
	}

	.scroll-wrapper {
		height: 400rpx;
		margin-left: 5rpx;
		margin-right: 5rpx;

		view {
			width: 100%;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
			background-color: #89ba16;
			margin-top: 5rpx;
		}
	}

	.swiper-wrapper {
		height: 420rpx;

		.swiper-image {
			text-align: center;

			image {
				width: 50%;
			}
		}
	}
</style>
