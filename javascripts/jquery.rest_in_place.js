//these first functions are run whenever the span is clicked

jQuery.fn.rest_in_place_input = function(url, objectName, attributeName) {
  var e = this;
  function clickFunction() {
    var oldValue = e.html();
    e.html('<form action="javascript:void(0)" style="display:inline;"><input type="text" value="' + oldValue + '"></form>');
    e.find("input")[0].select();
    e.unbind('click');
    e.find("input").blur(function(){
	  e.find("form").submit();
	  e.click(clickFunction);
    })
    e.find("form").submit(function(){
      var value = e.find("input").val();
      e.html("Loading...");
      jQuery.ajax({
        "url" : url,
        "type" : "post",
        "data" : "_method=put&"+objectName+'['+attributeName+']='+encodeURIComponent(value)+(window.rails_authenticity_token ? "&authenticity_token="+window.rails_authenticity_token : ''),
        "success" : function(){
          jQuery.ajax({
            "url" : url,
            "beforeSend"  : function(xhr){ xhr.setRequestHeader("Accept", "application/javascript"); },
            "success" : function(json){
              e.html(eval('(' + json + ')' )[objectName][attributeName]);
              e.click(clickFunction);
            }
          });
        }
      });
      return false;
    })
  }
  this.click(clickFunction);
}

jQuery.fn.rest_in_place_textarea = function(url, objectName, attributeName) {
  var e = this;
  function clickFunction() {
    var oldValue = e.html();
    e.html('<form action="javascript:void(0)" style="display:inline;"><textarea>'+oldValue+'</textarea></form>');
    e.find("textarea")[0].select();
    e.unbind('click');
    e.find("textarea").blur(function(){
      e.find("form").submit();
      e.click(clickFunction);
    })
    e.find("form").submit(function(){
      var value = e.find("textarea").val();
      e.html("Loading...");
      jQuery.ajax({
        "url" : url,
        "type" : "post",
        "data" : "_method=put&"+objectName+'['+attributeName+']='+encodeURIComponent(value)+(window.rails_authenticity_token ? "&authenticity_token="+window.rails_authenticity_token : ''),
        "success" : function(){
          jQuery.ajax({
            "url" : url,
            "beforeSend"  : function(xhr){ xhr.setRequestHeader("Accept", "application/javascript"); },
            "success" : function(json){
              e.html(eval('(' + json + ')' )[objectName][attributeName]);
              e.click(clickFunction);
            }
          });
        }
      });
      return false;
    })
  }
  this.click(clickFunction);
}


jQuery.fn.rest_in_place_select = function(url, objectName, attributeName) {
  var e = this;

	var  c = $(this).children();

	var oldValue = $(c[1]).html();
	$(c[1]).html('<form action="javascript:void(0)" style="display:inline;">' + oldValue + '</form>');
	
	var fvalue = $(c[0]);	
  var field = $(c[1]).children().children();
  
  function clickFunction() {
		$(c[0]).hide();
		$(c[1]).show();  
    
    var oldValue = e.html();
    
    
    
    $(field).select();
    e.unbind('click');
    $(field).blur(function(){
      e.find("form").submit();
      e.click(clickFunction);
    })
    e.find("form").submit(function(){
      var value = $(field).val();
      fvalue.html("Loading...");
      jQuery.ajax({
        "url" : url,
        "type" : "post",
        "data" : "_method=put&"+objectName+'['+attributeName+']='+encodeURIComponent(value)+(window.rails_authenticity_token ? "&authenticity_token="+window.rails_authenticity_token : ''),
        "success" : function(){
          jQuery.ajax({
            "url" : url,
            "beforeSend"  : function(xhr){ xhr.setRequestHeader("Accept", "application/javascript"); },
            "success" : function(json){
            	var key = eval('(' + json + ')' )[objectName][attributeName] - 1;
            	var kvalue = $(field.children()[value=key]).text();
            	fvalue.html(kvalue);
              
              $(c[1]).hide();
              $(c[0]).show();
              e.click(clickFunction);
            }
          });
        }
      });
      return false;
    })
  }
  this.click(clickFunction);
}



jQuery.fn.rest_in_place_checkbox = function(url, objectName, attributeName, truetext, falsetext) {
  var e = this;

	//wrap everything in a form tag
	var oldValue = $(e).html();
	$(e).html('<form action="javascript:void(0)" style="display:inline;">' + oldValue + '</form>');
	
	
	var  c = $(this).children().children();
	
	var fvalue = $(c[0]);	
  var field = $(c[1]);
  
  function clickFunction() {
		//$(c[0]).hide();
		
		$(field).show();  
    
    var oldValue = e.html();
    
    
    
    $(field).select();
    e.unbind('click');
    $(field).blur(function(){
      e.find("form").submit();
      e.click(clickFunction);
    })
    e.find("form").submit(function(){
      var value = $(field).attr("checked");
      fvalue.html("Loading...");
      jQuery.ajax({
        "url" : url,
        "type" : "post",
        "data" : "_method=put&"+objectName+'['+attributeName+']='+encodeURIComponent(value)+(window.rails_authenticity_token ? "&authenticity_token="+window.rails_authenticity_token : ''),
        "success" : function(){
          jQuery.ajax({
            "url" : url,
            "beforeSend"  : function(xhr){ xhr.setRequestHeader("Accept", "application/javascript"); },
            "success" : function(json){
            	var result = eval('(' + json + ')' )[objectName][attributeName];
            	
            	if (result == true) fvalue.html(truetext);
            	else fvalue.html(falsetext);
            	
            	//var kvalue = $(field.children()[value=key]).text();
            	//fvalue.html(key);
              
              $(field).hide();
              //$(c[0]).show();
              e.click(clickFunction);
            }
          });
        }
      });
      return false;
    })
  }
  this.click(clickFunction);
}





//everything below this line will be ran when the page is first loaded


jQuery(function()
{
  jQuery(".rest_in_place_input").each(function()
  {
    var e = jQuery(this);
    var url; var obj; var attrib;
    
    e.parents().each(function()
    {
      url    = url    || jQuery(this).attr("url");
      obj    = obj    || jQuery(this).attr("object");
      attrib = attrib || jQuery(this).attr("attribute");
    });
    
    e.parents().each(function()
    {
    
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) 
      {
        obj = obj || res[1];
      }
    
    });
    url    = e.attr("url")       || url    || document.location.pathname;
    obj    = e.attr("object")    || obj;
    attrib = e.attr("attribute") || attrib;
    e.rest_in_place_input(url, obj, attrib);
  });
  
  jQuery(".rest_in_place_textarea").each(function()
  {
    var e = jQuery(this);
    var url; var obj; var attrib;
    
    e.parents().each(function()
    {
      url    = url    || jQuery(this).attr("url");
      obj    = obj    || jQuery(this).attr("object");
      attrib = attrib || jQuery(this).attr("attribute");
    });
    e.parents().each(function()
    {
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) 
      {
        obj = obj || res[1];
      }
    });
    url    = e.attr("url")       || url    || document.location.pathname;
    obj    = e.attr("object")    || obj;
    attrib = e.attr("attribute") || attrib;
    e.rest_in_place_textarea(url, obj, attrib);
  });
  
  jQuery(".rest_in_place_select").each(function()
  {
  	var  c = $(this).children();
		$(c[1]).hide();
  	
    var e = jQuery(this);
    var url; var obj; var attrib;
    e.parents().each(function()
    {
      url    = url    || jQuery(this).attr("url");
      obj    = obj    || jQuery(this).attr("object");
      attrib = attrib || jQuery(this).attr("attribute");
    });
    
    e.parents().each(function()
    {
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) 
      {
        obj = obj || res[1];
      }
    });
    
    url    = e.attr("url")       || url    || document.location.pathname;
    obj    = e.attr("object")    || obj;
    attrib = e.attr("attribute") || attrib;
    e.rest_in_place_select(url, obj, attrib);
  });
  

	//checkbox code
  
  jQuery(".rest_in_place_checkbox").each(function()
  {
  	//set text for default checkboxes
  	truetext = $(this).attr("true") || "Yes";
  	falsetext = $(this).attr("false") || "No";
  	  
  	//need to drill down through the form tag  
  	var c = $(this).children();
  	$(this).prepend("<span>" + truetext + "</span>");

  	box = $(c[0]);
  	text = $(c[1]);
  	  	
  	$(box).hide();
  	
  	
    var e = jQuery(this);
    var url; var obj; var attrib;
    e.parents().each(function()
    {
      url    = url    || jQuery(this).attr("url");
      obj    = obj    || jQuery(this).attr("object");
      attrib = attrib || jQuery(this).attr("attribute");
    });
    
    e.parents().each(function()
    {
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) 
      {
        obj = obj || res[1];
      }
    });
    
    url    = e.attr("url")       || url    || document.location.pathname;
    obj    = e.attr("object")    || obj;
    attrib = e.attr("attribute") || attrib;
    e.rest_in_place_checkbox(url, obj, attrib, truetext, falsetext);
  });
	


  
});
