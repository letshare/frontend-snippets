$(document).ready(function(){
  $('div.readmore .inner').load('moreinfo.html',function(){
    $('div.readmore .inner code.html').chili();
    $('div.readmore .inner code.color').removeClass("color").addClass("html")
    .each(function(){
      $(this).text( "&lt;a " + $(this).text() + "&gt;" ).chili()
      t = $(this).html();
      $(this).html(t.substr(37,t.length-80).replace(/&nbsp;/,""))
    });
    });
  $('a.readmore').toggle(
    function(){$(this).html("Close").get(0).blur(); $('div.readmore').slideDown(); return false;},
    function(){$(this).html("Read More").get(0).blur(); $('div.readmore').slideUp(); return false;});
});
