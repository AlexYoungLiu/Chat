define(["jquery","fastclick","iScroll","public"],function($,fastclick,iScroll,public){
	if(window.location.href.indexOf("setup.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.menu=document.querySelector(".menu");
		this.statsBtn=document.querySelector(".stats_btn");
		this.photo=document.querySelector(".head_photo");
		this.name=document.querySelector(".name");
		this.email=document.querySelector(".email");
		this.password=document.querySelector(".password");
		this.noticeItemBtn=document.querySelector(".notice_item_btn");
		this.initFn();
		this.initiScroll();
		this.bindEvent();
	}

	Init.prototype={
		initFn:function(){
			var that=this,
				ls=window.localStorage,
				photo=ls.photo;
				name=ls.name,
				email=ls.email,
				password=ls.password;
			this.photo.setAttribute("src",''+photo+'');
			this.name.setAttribute("value",''+name+'');
			this.email.setAttribute("value",''+email+'');
			this.password.setAttribute("value",''+password+'');
		},

		initiScroll:function(){
			var myiScroll;
			myiScroll=new iScroll('.setup_box',{mouseWheel:true});
		},

		bindEvent:function(){
			var that=this;

			this.menu.addEventListener("click",function(){
				public.menuFn();
			})

			this.statsBtn.addEventListener("click",function(){
				window.location.href="stats.html";
			})

			$(".update_photo_btn").on("change",function(){
				public.updatePhoto($(this));
			})

			$(".notice_item_btn").each(function(){
				$(this).on("click",function(){
					var noticeItemIcon=$(this).find(".notice_item_btn_icon");
					if($(noticeItemIcon).hasClass("notice_item_active")){
						$(noticeItemIcon).removeClass("notice_item_active").addClass("notice_item_actived");
						$(noticeItemIcon).css({
							"webkitTransition":"all .5s"
						})
					}else{
						$(noticeItemIcon).removeClass("notice_item_actived").addClass("notice_item_active");
						$(noticeItemIcon).css({
							"webkitTransition":"all .5s"
						})
					}
				})
			})
		}
	}

	var Init=new Init();
})