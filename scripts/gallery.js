define(["jquery","fastclick","iScroll","swiper","public"],function($,fastclick,iScroll,swiper,public){
	if(window.location.href.indexOf("gallery.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.menu=document.querySelector(".menu");
		this.galleryNav=document.querySelector(".gallery_nav");
		this.photosBox=document.querySelector(".photos_box");
		this.videosBox=document.querySelector(".videos_box");
		this.initFn();
		this.initiScroll();
		//this.initSwiper();
		this.bindEvent();
	}

	Init.prototype={
		initFn:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:'data/self_data.json',
				dataType:'json',
				success:function(data){
					that.renderFn(data);
				},
				error:function(){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'Request data fail,please try again!',
							yesFn:function(){},
							noFn:true
						}
					})
					return;
				}
			})
		},

		//渲染数据
		renderFn:function(data){
			var _data=data.self_data[0].photos,
				len=_data.length,
				photoHtml="";
			for(var i=0;i<len;i++){
				photoHtml+='<section class="photos_item">'+
					'<img src="'+_data[i]+'" class="photos">'+
				'</section>';
			}
			$(".photos_box").append(photoHtml);
			myiScroll=new iScroll('.photos_view',{mouseWheel:true});
		},

		initiScroll:function(){
			var myiScroll;
			myiScroll=new iScroll('.albums_view',{mouseWheel:true});
		},

		initSwiper:function(){
			var swiper=new Swiper('.swiper-container',{
		        pagination:'.swiper_icons',
		        paginationClickable:true,
		        paginationBulletRender:function(index,className){
		        	var item_name=["PHOTOS","VIDEOS","ALBUMS"];
		            return '<li class="'+className+'"><span>'+(item_name[index])+'</span></li>';
		        }
		    })
		},

		bindEvent:function(){
			var that=this;

			public.moreFn();

			this.menu.addEventListener("click",function(){
				public.menuFn();
			})

			//给导航绑定事件,进行相应页面的切换
			this.galleryNav.addEventListener("click",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="span"){
					console.log($(target).parent().index())
					var i=$(target).parent().index();
					var left=i*33.3333+"%";
					console.log(left)
					$(target).parent().addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
					$(".swiper-wrapper").css({
						"webkitTransform":'translate3d(-'+left+',0,0)'
					})
				}
			})

			//给photo绑定事件,进行缩放
			this.photosBox.addEventListener("click",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="img"){
					$(".umbr_box").removeClass("none");
					var photo=$(target).attr("src");
					console.log(photo)
					var zoom="";
					zoom+='<div class="zoom_in zoomInDown"><img src="'+photo+'"><span class="close_pic"></span></div>';
					$(".main_view").append(zoom);
				}
				$(".close_pic").on("click",function(){
					$(this).parent().remove();
					$(".umbr_box").addClass("none");
				})
			})

			this.videosBox.addEventListener("click",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="video"){
					$(".umbr_box").removeClass("none");
					var video=$(target).attr("src");
					var zoom="";
					zoom+='<div class="zoom_in zoomInDown"><video src="'+video+'" autoplay controls></video><span class="close_pic"></span></div>';
					$(".main_view").append(zoom);
				}
				$(".close_pic").on("click",function(){
					$(this).parent().remove();
					$(".umbr_box").addClass("none");
				})
			})
		}
	}

	var Init=new Init();
})