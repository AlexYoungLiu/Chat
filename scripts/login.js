define(["fastclick"],function(fastclick){
	if(window.location.href.indexOf("login.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.username=document.querySelector(".username");
		this.password=document.querySelector(".password");
		this.loginBtn=document.querySelector(".login_btn");
		this.register=document.querySelector(".register");
		this.bindEvent();
	}

	Init.prototype={
		bindEvent:function(){
			var that=this;
			this.loginBtn.addEventListener("click",function(){
				var nameReg=/^[a-zA-Z0-9]{1}([\w]|[_.@]){4,15}$/,
					passReg=/^[a-z0-9]{1}(\w){6,15}$/;
				if(!nameReg.test(that.username.value)){
					EasyDialog.open({
						container:{
							header:'hint',
							content:'wrong username input!',
							yesFn:function(){
								that.username.focus();
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
				}else{
					var ls=window.localStorage;
					if(that.username.value==ls.name && that.password.value==ls.password){
						window.location.href="home.html";
					}else{
						EasyDialog.open({
							container:{
								header:'hint',
								content:'Your username or password error!',
								yesFn:function(){
									that.username.focus();
								},
								noFn:true
							}
						})
					}
				}
			})

			this.register.addEventListener("click",function(){
				window.location.href="register.html";
			})
		}
	}

	var Init=new Init();
})