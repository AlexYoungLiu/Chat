define(["jquery","fastclick","swiper","iScroll","public","dropload"],function($,fastclick,swiper,iScroll,public,dropload){
	if(window.location.href.indexOf("home.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.menu=document.querySelector(".menu");
		//this.renderData();
		this.initSwiper();
		this.bindEvent();
		this.loadFn();
	}

	Init.prototype={
		/*renderData:function(){
			var that=this;
			public.getUserData({},function(data){
				var messHtml="";
				if(data){
					data.friends_data.friends.forEach(function(v,i){
						console.log(v)
						messHtml+='<div class="mess_item">'+
							'<img src="'+v.photo+'" class="mess_head_photo">'+
							'<span class="name">'+v.name+'</span>'+
							'<span class="time">5 minutes ago</span>'+
							'<div class="clear"></div>'+
							'<span class="mess_content">'+v.mess_info+'</span>'+
						'</div>';
					})
				}
				$(".iScroll").html(messHtml);

				//that.initiScroll();
			})
		},*/

		loadFn:function(){
			var counter = 0;
		    // 每页展示4个
		    var num = 4;
		    var pageStart = 0,pageEnd = 0;

		    // dropload
		    $('.mess_box').dropload({
		        scrollArea:$(".mess_box"),
		        loadDownFn:function(me){
		            $.ajax({
		                type:'GET',
		                url:'data/friends_data.json',
		                dataType:'json',
		                success:function(data){
		                    var messHtml='';
		                    counter++;
		                    pageEnd=num*counter;
		                    pageStart=pageEnd-num,
		                    _data=data.friends_data.friends;
		                    console.log($(".mess_item").length)
		                    console.log(_data[0])

		                    for(var i=pageStart;i<pageEnd;i++){
		                    	//判断信息时间
		                    	var time=_data[i].mess_time;
		                    	var _time="";
		                    	console.log(time)
		                    	if(time<60){
		                    		console.log(time+" seconds ago")
		                    		if(time==1){
		                    			_time+="1 second ago";
		                    		}else{
		                    			_time+=time+" seconds ago";
		                    		}
		                    	}
		                    	if(time>=60 && time<3600){
		                    		console.log(parseInt(time/60)+" minutes ago")
		                    		if(parseInt(time/60)==1){
		                    			_time+="1 minute ago";
		                    		}else{
		                    			_time+=parseInt(time/60)+" minutes ago";
		                    		}
		                    	}
		                    	if(time>=3600 && time<86400){
		                    		console.log(parseInt(time/3600)+" hours ago")
		                    		if(parseInt(time/3600)==1){
		                    			_time+="1 hour ago";
		                    		}else{
		                    			_time+=parseInt(time/3600)+" hours ago";
		                    		}
		                    	}
		                    	if(time>=86400 && time<2592000){
		                    		console.log(parseInt(time/86400)+" days ago")
		                    		if(parseInt(time/86400)==1){
		                    			_time+="1 day ago";
		                    		}else{
		                    			_time+=parseInt(time/86400)+" days ago";
		                    		}
		                    	}
		                    	if(time>=2592000 && time<31104000){
		                    		console.log(parseInt(time/2592000)+" months ago")
		                    		if(parseInt(time/2592000)==1){
		                    			_time+="1 month ago";
		                    		}else{
		                    			_time+=parseInt(time/2592000)+" months ago";
		                    		}
		                    	}
		                    	if(time>=31104000){
		                    		console.log("1 year ago")
		                    		_time+="1 year ago";
		                    	}
		                        messHtml+='<div class="mess_item" data-info="'+_data[i].ID+'">'+
									'<img src="'+_data[i].photo+'" class="mess_head_photo">'+
									'<span class="name">'+_data[i].name+'</span>'+
									'<span class="time">'+_time+'</span>'+
									'<div class="clear"></div>'+
									'<span class="mess_content">'+_data[i].mess_info+'</span>'+
								'</div>';
		                        if((i+1)>=_data.length){
		                            // 锁定
		                            me.lock();
		                            // 无数据
		                            me.noData();
		                            break;
		                        }
		                    }
		                    // 为了测试，延迟1秒加载
		                    setTimeout(function(){
		                        $('.iScroll').append(messHtml);
		                        console.log($(".mess_item").length)

					            //跳转页面,传递用户信息
							    $(".mess_item").on("click",function(){
							    	console.log($(this).attr("data-info"))
							    	var userid="?userid="+$(this).attr("data-info");
							    	if(userid){
							    		_userid=encodeURI(userid);
							    		window.location.href="profile.html"+_userid;
							    	}
							    })

		                        // 每次数据加载完，必须重置
		                        me.resetload();
		                    },1000);
		                },
		                error:function(xhr,type){
		                    EasyDialog.open({
								container:{
									header:'hint',
									content:'Request data fail,please try again!',
									yesFn:function(){
										
									},
									noFn:true
								}
							})
		                    // 即使加载出错，也得重置
		                    me.resetload();
		                }
		            })
		        }
		    })
		},

		initiScroll:function(){
			var myiScroll;
			myiScroll=new iScroll('.mess_box',{
				mouseWheel:true
			});
			/*myiScroll.on("scrollEnd",function(){
				if(this.y<-200){
					$(".swiper-container").addClass("none");
					$(".mess_box").css({
						"height":"100%"
					})
				}
			})*/
			myiScroll.on('scrollEnd',function(){
				console.log(this.y);
				if(this.y>=-150){
					$(".swiper-container").css({
						"height":"40%",
						"webkitTransition":"height .5s linear"
					})
				}else{
					$(".swiper-container").css({
						"height":"0",
						"webkitTransition":"height .5s linear"
					})
				}
			})
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

			public.moreFn();

			this.menu.addEventListener("click",function(){
				public.menuFn();
			})

			//绑定scroll事件,距顶部大于50px时隐藏swiper,否则显示.
		    $(".mess_box").on("scroll",function(){
				var spaceTop=$(".mess_box")[0].scrollTop;
                if(spaceTop<50){
                	$(".swiper-container").css({
						"height":"40%",
						"webkitTransition":"height .5s linear"
					})
				}else{
					$(".swiper-container").css({
						"height":"0",
						"webkitTransition":"height .5s linear"
					})
				}
		    })
		}
	}

	var Init=new Init();
})