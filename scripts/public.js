define([],function(){
	return {
		updatePhoto:function(obj){
			var objType = obj[0].files[0].type;
			if(/image/.test(objType)){
				if(obj[0].files[0].size/307200>1){
					EasyDialog.open({
						container:{
							header:'提示信息',
							content:'请上传小于300KB的照片',
							yesFn:function(){},
							noFn:true
						}
					})
					return false;
				}
				var pre=new FileReader;
				console.log(pre)
				pre.readAsDataURL(obj[0].files[0]);
				pre.onload=function(){
					var result=this.result;
					$(obj).parent().find("img").attr('src',result);
					$(obj).parent().attr("done",1);
					//上传图片
       				//$.when($.ajax('',this.result).done(function(){}));
				}
			}else{
				EasyDialog.open({
					container:{
						header:'提示信息',
						content:'上传照片文件格式错误',
						yesFn:function(){},
						noFn:true
					}
				})
			}
		},

		settleData:function(url){
		    url=decodeURI(url).slice(1);
		    var obj={};
		    url.split("&").forEach(function(t){
		        t=t.split("=");
		        obj[t[0]]=t[1];
		    })
		    return obj;
		},

		getUserData:function(data,callback){
			$.when($.ajax("data/friends_data.json"))
			.done(function(data){
				callback(data);
			})
			.fail(function(){
				EasyDialog.open({
					container:{
						header:'hint',
						content:'Request data fail,please try again!',
						yesFn:function(){},
						noFn:true
					}
				})
				return;
			})
		},

		getSelfData:function(data,callback){
			$.when($.ajax("data/self_data.json"))
			.done(function(data){
				callback(data);
			})
			.fail(function(){
				EasyDialog.open({
					container:{
						header:'hint',
						content:'Request data fail,please try again!',
						yesFn:function(){},
						noFn:true
					}
				})
				return;
			})
		},

		newAccountFn:function(){
			var that=this;
			$(".check_all").on("click",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked").addClass("check");
					$(".item_check").removeClass("checked").addClass("check");
				}else{
					$(this).addClass("checked").removeClass("check");
					$(".item_check").removeClass("check").addClass("checked");
				}
			})

			$(".item_check").on("click",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked").addClass("check");
					if($(".check_all").hasClass("checked")){
						$(".check_all").removeClass("checked").addClass("check");
					}
				}else{
					$(this).addClass("checked").removeClass("check");
					var len=$(".list_item").length;
					if($(".list_box .checked").parent().length==len){
						$(".check_all").addClass("checked").removeClass("check");
					}
				}
			})

			$(".add_back").on("click",function(){
				window.location.href="register.html";
			})

			$(".link_back").on("click",function(){
				window.location.href="add_people.html";
			})

			$(".btn_box").on("click","input",function(){
				if($(".list_box .checked").parent().length<=0){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'Please select at least one user to send the invitation.',
							yesFn:function(){},
							noFn:true
						}
					})
					return;
				}else{
					if($(this).hasClass("invite_btn")){
						EasyDialog.open({
							container:{
								header:'congratulation',
								content:'send success.',
								yesFn:function(){
									$(".invite_btn").val("Next Setp").addClass("next_btn").removeClass("invite_btn");

									$(".next_btn").off().on("click",function(){
										window.location.href="link_network.html";
									});
								}
							}
						})
					}
					if($(this).hasClass("link_btn")){
						EasyDialog.open({
							container:{
								header:'congratulation',
								content:'The connection is successful.',
								yesFn:function(){
									$(".link_btn").val("Start Tour").addClass("start_btn").removeClass("link_btn");

									$(".start_btn").off().on("click",function(){
										window.location.href="home.html";
									});
								}
							}
						})
					}
				}
			})
		},

		menuFn:function(){
			$(".main_view").addClass("none");
			var menuHtml='<div class="menu_view">'+
				'<header class="header">'+
					'<a class="close"></a>'+
					'<a class="setup_btn"></a>'+
				'</header>'+
				'<section class="menu_box">'+
					'<div class="menu_item"><span class="home">Home</span></div>'+
					'<div class="menu_item"><span class="profile">Profile</span></div>'+
					'<div class="menu_item"><span class="compose">Compose</span></div>'+
					'<div class="menu_item"><span class="gallery">Gallery</span></div>'+
					'<div class="menu_item"><span class="capture">Capture</span></div>'+
					'<div class="menu_item"><span class="stats">Stats</span></div>'+
				'</section>'+
				'<footer class="footer">'+
					'<input type="button" value="Logout" class="logout_btn">'+
				'</footer>'+
			'</div>';

			$(".container").append(menuHtml);

			//获取当前页面的标题,改变相对应的menu背景
			var nowTheme=document.querySelector("title").innerHTML.toLowerCase();
			$('.'+nowTheme+'').parent().css({
				"background":"yellowgreen"
			})

			if(nowTheme=="setup"){
				$(".setup_btn").remove();
			}

			document.querySelector(".close").addEventListener("click",function(){
				$(".menu_view").remove();
				$(".main_view").removeClass("none");
			})

			$(".setup_btn").off().on("click",function(){
				window.location.href="setup.html";
			})

			/*console.log(nowTheme)
			$(".menu_item").each(function(i,e){
				console.log($(e).find("span").text())
				if($(e).find("span").text()==nowTheme){
					console.log(nowTheme)
					$(this).parent().css({
						"background":"yellowgreen"
					})
				}
			})*/

			//遍历menu_item,进行相应页面的跳转
			$(".menu_item").each(function(i,e){
				$(e).on("touchstart",function(){
					$(this).css({
						"background":"greenyellow"
					})
				}).on("click","span",function(){
					var className=$(this).attr("class");
					console.log(className)
					if(className=="profile"){
						window.location.href=''+className+'.html?myself_profile';
					}else if(className=="capture"){
						window.location.href="capture.html"+'?back='+nowTheme+'';
					}else if(className=="compose"){
						window.location.href="compose.html"+'?back='+nowTheme+'';
					}else{
						window.location.href=''+className+'.html';
					}
				})
			})

			$(".logout_btn").on("click",function(){
				EasyDialog.open({
					container:{
						header:'hint',
						content:'Whether need to login again after cancellation,sure you want to cancel the current account.',
						yesFn:function(){
							window.location.href="login.html";
						},
						noFn:true
					}
				})
			})
		},

		moreFn:function(){
			var moreHtml="";
			moreHtml+='<section class="more_menu none">'+
				'<div class="more_item compose"><a>Initiate group chat</a></div>'+
				'<div class="more_item"><a>Add friends</a></div>'+
				'<div class="more_item"><a>Overscan</a></div>'+
				'<div class="more_item"><a>Help and feedback</a></div>'+
			'</section>';
			$(".main_view").append(moreHtml);
			
		    $(".more").on("touchstart",function(e){
		    	e.stopPropagation();
		    	$(".more_menu").toggleClass("none");
		    })

		    $("body").on("touchstart",function(e){
		    	e.stopPropagation();
		    	if(!$(".more_menu").hasClass("none")){
		    		$(".more_menu").addClass("none");
		    	}
		    })

		    $(".compose").on("click",function(){
		    	var back=document.querySelector("title").innerHTML.toLowerCase();
		    	window.location.href='compose.html'+'?back='+back+'';
		    })
		}
	}
})