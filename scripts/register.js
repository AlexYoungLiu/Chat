define(["jquery","mobIscroll","mobIscrollDate","fastclick","dialog","public"],function($,mobIscroll,mobIscrollDate,fastclick,dialog,public){
	if(window.location.href.indexOf("register.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.uploadPhoto=document.querySelector(".upload_photo");
		this.photo=document.querySelector(".photo");
		this.name=document.querySelector(".name");
		this.password=document.querySelector(".password");
		this.gender=document.querySelector(".gender");
		this.birth=document.querySelector(".birth");
		this.mail=document.querySelector(".mail");
		this.phone=document.querySelector(".phone");
		this.registerBtn=document.querySelector(".register_btn");
		this.back=document.querySelector(".back");
		this.bindEvent();
		this.birthPlugin();
	}

	Init.prototype={
		bindEvent:function(){
			var that=this;

			this.back.addEventListener("click",function(){
				window.location.href="login.html";
			})

			this.gender.addEventListener("click",function(ev){
				var ev=ev || window.event;
				var target=ev.target || ev.srcElement;
				if(target.tagName.toLowerCase()=="a"){
					if(!$(target).hasClass("active")){
						$(target).addClass("active").siblings().removeClass("active");
					}
				}
				if(target.tagName.toLowerCase()=="label"){
					if(!$(target).prev().hasClass("active")){
						$(target).prev().addClass("active").siblings().removeClass("active");
					}

				}
			})

			/*$(".gender").on("click","a",function(){
				if(!$(this).hasClass("active")){
					$(this).addClass("active").siblings().removeClass("active");
				}
			})*/

			$(".upload_photo").on("change",function(){
				public.updatePhoto($(this));
			})

			this.registerBtn.addEventListener("click",function(){
				var nameReg=/^[a-zA-Z0-9]{1}([\w]|[a-zA-Z0-9]|[_.@]){4,15}$/,
					passReg=/^[a-z0-9]{1}(\w){6,15}$/,
					phoneReg=/^1[3|4|5|7|8]\d{9}$/;
				if(!nameReg.test(that.name.value)){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'wrong name input!',
							yesFn:function(){
								that.name.focus();
							},
							noFn:true
						}
					})
					return;
				}else if(!passReg.test(that.password.value)){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'wrong password input!',
							yesFn:function(){
								that.password.focus();
							},
							noFn:true
						}
					})
					return;
				}else if(!phoneReg.test(that.phone.value)){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'wrong phone input!',
							yesFn:function(){
								that.phone.focus();
							},
							noFn:true
						}
					})
					return;
				}else{
					var ls=window.localStorage,
						name=that.name.value,
						password=that.password.value,
						mail=that.mail.value,
						photo=that.photo.src;
					ls.name=''+name+'';
					ls.password=''+password+'';
					ls.email=''+mail+'';
					ls.photo=''+photo+'';
					window.location.href="welcome.html";
				}
			})
		},

		birthPlugin:function(){
			var curYear=(new Date()).getFullYear(),
				opt={};
			opt.date={preset:"date"};
			opt.datetime={preset:"datetime"};
			opt.time={preset:"time"};
			opt.default={
				theme:"android-ics beauty",//皮肤样式
				display:"modal",//显示方式
				mode:"scroller",//日期选择模式
				dateFormat:"MM dd, yyyy",
				monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],
				lang:"zh",
				showNow:false,
				nowText:"今天",
				startYear:curYear-70,//开始年份
				endYear:curYear-10//结束年份
			}

			$("#birth").mobiscroll($.extend(opt["date"],opt["default"]));
		}
	}

	var Init=new Init();
})