$(function(){
    $('.btn-secondary').click(function(){
        var searchItem= $('#Artist').val();
  $.ajax({

    url: 'http://localhost:3000/mtunes/search/' + searchItem,
    type: 'GET',
    success : function(data) {
        var jsondata = JSON.stringify(data[0]);
        var source = $("#book-detail-templete").html();
        var template = Handlebars.compile(source);
        var html = template(data);
       $("#resultsBlock").html(html);
    }
  });
});
});