define(["fastclick","public"],function(fastclick,public){
	if(window.location.href.indexOf("capture.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.back=document.querySelector(".back");
		this.canvas=document.querySelector("#canvas");
		this.capture=document.querySelector(".capture");
		this.initFn();
		this.bindEvent();
	}

	Init.prototype={
		initFn:function(){
			var that=this;
			var context=this.canvas.getContext("2d");

			var error=function(){
				console.log("something wrong!")
			}

			if(navigator.getUserMedia){
				navigator.getUserMedia({
					"video":true
				},function(stream){
					video.src=stream;
					video.play();
				},error)
			}else if(navigator.webkitGetUserMedia){
				navigator.webkitGetUserMedia({
					"video":true
				},function(stream){
					video.src=window.webkitURL.createObjectURL(stream);
					video.play();
				},error)
			}

			this.capture.addEventListener("click",function(){
				context.drawImage(video,0,0,100,100);
			})
		},

		bindEvent:function(){
			var that=this;

			this.back.addEventListener("click",function(){
				var backTheme=public.settleData(location.search);
				if(backTheme.back=="profile"){
					window.location.href='profile.html?myself_profile';
				}else{
					window.location.href=''+backTheme.back+'.html';
				}
			})
		}
	}

	var Init=new Init();
})