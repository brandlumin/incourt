function fn_AdaptViewPort(){$(window).innerWidth()<768&&($('#preview,#draft_button,[type="submit"]').prependTo(".col-md-8 .card-body > .text-right"),$(".col-md-4 .pub-btn > p, .col-md-4 .pub-btn > br").remove(),$(".col-md-8 .card-body > .text-right button").removeAttr("style"),$(".col-md-8 .card-body > .text-right a").addClass("btn-warning pull-left").removeClass("btn-primary"),$("button[name=preview]").removeClass("btn-primary").css("margin-left","5%"),$("button[name=submitStatus]").addClass("pull-right btn-success"),$(".col-md-8 .card-body > .text-right").removeAttr("class"),$("#draft_button").removeClass("btn-warning").addClass("btn-danger").hide("slow"))}function fn_UseLocalstorage(){postHour=parseInt(localStorage.getItem("selectedNews-time").match(/^(\d+)/)[1]),postMinutes=parseInt(localStorage.getItem("selectedNews-time").match(/(\d+)$/)[1]),postHour=postHour<10?"0"+postHour:String(postHour),postMinutes=postMinutes<10?"0"+postMinutes:String(postMinutes),newTime=postHour+":"+postMinutes,$("#pub").attr("value",newTime).val(newTime).change(),$("form#autoform").attr("onsubmit","fn_CleanupLocalstorage();"),$(".col-md-8 .card-body > div a").attr("onclick","fn_CleanupLocalstorage();")}function fn_CleanupLocalstorage(){localStorage.removeItem("selectedNews-time")}function fn_alert(t,e,o,a){void 0===e&&(e=300),void 0===o&&(o="#F5DA81"),void 0===a&&(a="#000"),$("#myalertwindow".length)&&$("#myalertwindow").remove(),box=$("<div/>",{id:"myalertwindow",class:"text-center"}).css({position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)","border-radius":".25em",border:"5px solid #fff",padding:"1.25em 3em","font-size":"1.15em","font-weight":"400","background-color":o,color:a,"box-shadow":"0 .5em 1em rgba(0, 0, 0, .5)","text-shadow":"0 0 .5px rgba(0, 0, 0, .25)","z-index":"99000000"}).appendTo("body").html(t),box.mouseover(function(){$(this).stop(!0,!1)}),box.mouseout(function(){1==$(this).is(":visible")&&$(this).fadeOut(300,function(){box.remove()})}),box.fadeIn(300).delay(e).fadeOut(300,function(){box.remove()})}$(function(){$("html body input[type], html body textarea.materialize-textarea, html body textarea, html body select").css("font",'normal 400 15px/1.5 "Roboto", sans-serif'),$("div#menubar").css("top","0"),$("header#header, div#menubar").slideUp("slow"),$("#base").css("padding-left","0"),$("#content").css("padding-top","0"),$(".page").css("margin-top","0"),$(".col-md-8 .card-head").slideUp("slow"),$(".token-input-list").css({font:'normal 400 .95em/1.5 "Roboto", sans-serif',"margin-top":"5px","border-radius":".25em",border:"none","z-index":"100% !important"}).find("li").css({"font-weight":"normal"}).find("p").css({"margin-right":".5em"}),$("#regular1[name=url]").parent(".form-group").slideUp("fast"),$("#attachmentType").val()||$("#attachmentType").val("images").change(),$(".tile-icon.main_image").parent(".tile-content.clearfix").slideUp(),fn_AdaptViewPort(),null!==localStorage.getItem("selectedNews-time")&&fn_UseLocalstorage(),$(window).resize(function(){fn_AdaptViewPort()})});