define(["fastclick","swiper"],function(fastclick,swiper){
	if(window.location.href.indexOf("welcome.html")==-1) return;
	fastclick.attach(document.body);
	
	var Init=function(){
		this.skipBtn=document.querySelector(".skip_btn");
		this.initSwiper();
		this.bindEvent();
	}

	Init.prototype={
		initSwiper:function(){
			var swiper=new Swiper('.swiper-container',{
		        pagination:'.swiper_icons',
		        paginationClickable:true,
		        nextButton:'.next_btn',
		        spaceBetween:30,
		        effect:'fade',
		        onSlideChangeEnd:function(swiper){
		        	console.log(swiper.activeIndex)
		        	var index=swiper.activeIndex;
		        	if(index==1){
		        		$($(".chat_item")[0]).addClass("fadeIn_a");
		        		$($(".chat_item")[1]).addClass("fadeIn_b");
		        		$($(".chat_item")[2]).addClass("fadeIn_c");
		        	}else{
		        		$($(".chat_item")[0]).removeClass("fadeIn_a");
		        		$($(".chat_item")[1]).removeClass("fadeIn_b");
		        		$($(".chat_item")[2]).removeClass("fadeIn_c");
		        	}
		        	if(index==2){
		        		$(".next_btn").on("click",function(){
		        			window.location.href="add_people.html";
		        		})
		        	}
				    /*if(swiper.isEnd){
				    	$(".next_btn").on("click",function(){
		        			window.location.href="add_people.html";
		        		})
				    }*/
		        }
		    })
		},

		bindEvent:function(){
			var that=this;

			this.skipBtn.addEventListener("click",function(){
				window.location.href="home.html";
			})
		}
	}

	var Init=new Init();
})