define(["fastclick"],function(fastclick){
	if(window.location.href.indexOf("chat.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.back=document.querySelector(".back");
		this.bindEvent();
	}

	Init.prototype={
		bindEvent:function(){
			this.back.addEventListener("click",function(){
				window.location.href="home.html";
			})
		}
	}

	var Init=new Init();
})