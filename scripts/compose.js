define(["jquery","fastclick","iScroll","public"],function($,fastclick,iScroll,public){
	if(window.location.href.indexOf("compose.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.back=document.querySelector(".back");
		this.getDataFn();
		this.bindEvent();
	}

	Init.prototype={
		initFn:function(){
			var that=this;

			$(".item_check").on("click",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked").addClass("check");
					var userid=$(this).parent().attr("data-userid");
					var item=$(".compose_item").length;
					$(".compose_item").each(function(i,e){
						if($(this).attr("data-id")==userid){
							$(this).remove();
							var composeItems=$(".compose_item").length,
							iScrollW=$("#iScroll").width(),
							iw=composeItems*140;
							$("#iScroll").css({
								"width":''+(iw+20)+'px'
							})
						}
					})
				}else{
					$(this).addClass("checked").removeClass("check");
					var id=$(this).parent().attr("data-userid");
					var name=$(this).parent().find(".item_name").text();
					var picSrc=$(this).parent().find(".item_photo").attr("src");
					var html="";
					html+='<div class="compose_item" data-id="'+id+'">'+
							'<img src='+picSrc+'>'+
							'<span>'+name+'</span>'+
						'</div>';
					$(html).appendTo($("#iScroll"));
					var composeItems=$(".compose_item").length,
						iScrollW=$("#iScroll").width(),
						iw=composeItems*140;
					console.log(iw)
					if(iw>iScrollW){
						$("#iScroll").css({
							"width":''+(iw+20)+'px'
						})
					}else{
						$("#iScroll").css({
							"width":"100%"
						})
					}
				}
				var myiScroll;
				myiScroll=new iScroll('.compose_box',{scrollX:true,scrollY:false,mouseWheel:true});
			})
		},

		getDataFn:function(){
			var that=this;
			$.ajax({
				url:"../data/friends_data.json",
				type:"get",
				dataType:"json",
				success:function(data){
					console.log(data)
				},
				error:function(){

				}
			})
			public.getUserData({},function(data){
				console.log(data)
				var listHtml="",
					_data=data.friends_data.friends,
					num=_data.length;
					console.log(num)
				for(var i=0;i<num;i++){
					listHtml+='<div class="friend_item" data-userid="'+_data[i].ID+'">'+
						'<img src="'+_data[i].photo+'" class="item_photo">'+
						'<span class="item_name">'+_data[i].name+'</span>'+
						'<span class="item_check check"></span>'+
					'</div>';
				}
				$(listHtml).appendTo($(".iScroll"));
				that.initFn();
				var myiScroll;
				myiScroll=new iScroll('.friends_list',{mouseWheel:true});
			})
		},

		bindEvent:function(){
			var that=this;

			public.moreFn();

			//public.newAccountFn();

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