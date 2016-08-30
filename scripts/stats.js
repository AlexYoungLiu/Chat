define(["jquery","fastclick","public"],function($,fastclick,public){
	if(window.location.href.indexOf("stats.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.menu=document.querySelector(".menu");
		this.initFn();
		this.bindEvent();
	}

	Init.prototype={
		initFn:function(){

		},

		bindEvent:function(){
			this.menu.addEventListener("click",function(){
				public.menuFn();
			})

			public.moreFn();
		}
	}

	var Init=new Init();
})