define(["jquery","fastclick","swiper","public"],function($,fastclick,swiper,public){
	if(window.location.href.indexOf("profile.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.menu=document.querySelector(".menu");
		this.setup=document.querySelector(".setup_w");
		this.renderData();
	}

	Init.prototype={
		renderData:function(){
			var that=this;

			//如果由menu菜单进入profile,向下执行,请求用户本人数据,进行渲染
			if(window.location.href.indexOf("?myself_profile")!=-1){
				console.log(window.location.href)
				public.getSelfData({},function(data){
					var selfHtml="";
					if(data){
						data.self_data.forEach(function(v,i){
							console.log(v)
							selfHtml+='<div class="swiper-container">'+
								'<ul class="swiper-wrapper">'+
									'<li class="swiper-slide"><img src="'+v.profile_pic.swiper_slide1+'"></li>'+
									'<li class="swiper-slide"><img src="'+v.profile_pic.swiper_slide2+'"></li>'+
									'<li class="swiper-slide"><img src="'+v.profile_pic.swiper_slide3+'"></li>'+
									'<li class="swiper-slide"><img src="'+v.profile_pic.swiper_slide4+'"></li>'+
								'</ul>'+
								'<span class="name">'+v.name+'</span>'+
								'<span class="pro_more"></span>'+
								'<span class="vocation">'+v.vocation+'</span>'+
								'<span class="site">'+v.site+'</span>'+
							'</div>'+
							'<div class="item_box">'+
								'<section class="fun_box">'+
									'<span class="chat"></span>'+
									'<span class="video"></span>'+
									'<span class="stats"></span>'+
								'</section>'+
								'<section class="follow_box">'+
									'<div class="follow_item likes_item">'+
										'<span class="likes"><a>'+v.likes+'</a></span>'+
										'<span>LIKES</span>'+
									'</div>'+
									'<div class="follow_item following_item">'+
										'<span class="following"><a>'+v.following+'</a></span>'+
										'<span>FOLLOWING</span>'+
									'</div>'+
									'<div class="follow_item followers_item">'+
										'<span class="followers"><a>'+v.followers+'</a></span>'+
										'<span>FOLLOWERS</span>'+
									'</div>'+
									'<div class="follow_state">Following</div>'+
								'</section>'+
							'</div>';
						})
					}
					$(".main_box").html(selfHtml);

					that.initSwiper();

					that.bindEvent();
				})
			}

			//如果由home页,选择好友进入,向下执行,请求friend数据,进行渲染
			if(window.location.href.indexOf("?userid")!=-1){
				console.log(window.location.href)
				public.getUserData({},function(data){
					var userHtml="";
					if(data){
						//由地址栏获取好友ID,通过ID请求其数据,进行渲染
						var userinfo=public.settleData(location.search);
						console.log(userinfo.userid);
						var _userid=parseInt(userinfo.userid)-1;
						console.log(_userid)
						var _data=data.friends_data.friends;
						console.log(_data)
						userHtml+='<div class="swiper-container">'+
							'<ul class="swiper-wrapper">'+
								'<li class="swiper-slide"><img src="'+_data[_userid].profile_pic.swiper_slide1+'"></li>'+
								'<li class="swiper-slide"><img src="'+_data[_userid].profile_pic.swiper_slide2+'"></li>'+
								'<li class="swiper-slide"><img src="'+_data[_userid].profile_pic.swiper_slide3+'"></li>'+
								'<li class="swiper-slide"><img src="'+_data[_userid].profile_pic.swiper_slide4+'"></li>'+
							'</ul>'+
							'<span class="name">'+_data[_userid].name+'</span>'+
							'<span class="pro_more"></span>'+
							'<span class="vocation">'+_data[_userid].vocation+'</span>'+
							'<span class="site">'+_data[_userid].site+'</span>'+
						'</div>'+
						'<div class="item_box">'+
							'<section class="fun_box">'+
								'<span class="chat"></span>'+
								'<span class="video"></span>'+
								'<span class="stats"></span>'+
							'</section>'+
							'<section class="follow_box">'+
								'<div class="follow_item likes_item">'+
									'<span class="likes"><a>'+_data[_userid].likes+'</a></span>'+
									'<span>LIKES</span>'+
								'</div>'+
								'<div class="follow_item following_item">'+
									'<span class="following"><a>'+_data[_userid].following+'</a></span>'+
									'<span>FOLLOWING</span>'+
								'</div>'+
								'<div class="follow_item followers_item">'+
									'<span class="followers"><a>'+_data[_userid].followers+'</a></span>'+
									'<span>FOLLOWERS</span>'+
								'</div>'+
								'<div class="follow_state">Following</div>'+
							'</section>'+
						'</div>';
					}
					$(".main_box").html(userHtml);

					that.initSwiper();

					that.bindEvent();
				})
			}
		},

		initSwiper:function(){
			var swiper=new Swiper('.swiper-container',{
		        pagination:'.swiper_icons',
		        paginationClickable:true,
		        autoplay:2000,
        		autoplayDisableOnInteraction:false //鼠标拖动后无操作,继续autoplay
		    })
		},
						
		bindEvent:function(){
			var that=this;

			this.menu.addEventListener("click",function(){
				public.menuFn();
			})

			this.setup.addEventListener("click",function(){
				window.location.href="setup.html";
			})

			$(".chat").on("click",function(){
				window.location.href="chat.html";
			})

			$(".video").on("click",function(){
				window.location.href="gallery.html";
			})

			$(".stats").on("click",function(){
				window.location.href="stats.html";
			})
		}
	}

	var Init=new Init();
})