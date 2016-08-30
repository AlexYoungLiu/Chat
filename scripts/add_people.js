define(["jquery","fastclick","iScroll","public"],function($,fastclick,iScroll,public){
	if(window.location.href.indexOf("add_people.html")==-1 && window.location.href.indexOf("link_network.html")==-1) return;
	fastclick.attach(document.body);

	var Init=function(){
		this.back=document.querySelector(".back");
		this.initiScroll();
		this.bindEvent();
	}

	Init.prototype={
		initiScroll:function(){
			var myiScroll;
			myiScroll=new iScroll('.list_box',{mouseWheel:true});
		},

		bindEvent:function(){
			var that=this;

			public.newAccountFn();
		}
	}

	var Init=new Init();
})