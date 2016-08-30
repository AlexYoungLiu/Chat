require.config({
	baseUrl:"",
	paths:{
		"jquery":"lib/jquery-1.7.2",
		"fastclick":"lib/fastclick",
		"mobIscroll":"plugin/mobiscroll",
		"mobIscrollDate":"plugin/mobiscroll_date",
		"dialog":"plugin/dialog",
		"swiper":"plugin/swiper.min",
		"iScroll":"lib/iscroll-probe",
		"public":"scripts/public",
		"dropload":"plugin/dropload",
		"echarts":"plugin/echarts"
	}
})

require(["scripts/login","scripts/register","scripts/welcome","scripts/add_people","scripts/home","scripts/profile","scripts/chat","scripts/compose","scripts/capture","scripts/gallery","scripts/stats","scripts/setup"],function(){
	
})