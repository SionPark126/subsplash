function makeAPIcall(){
  var name = $("#searchItem")[0].value;
  var url = "https://swapi.co/api/people/"+"?search=" + name;
  var response;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    $(".loader").show();
    $("figure").hide();
    $(".result").empty();
       if (this.readyState == 4 && this.status == 200) {
          $(".loader").hide();
          response =JSON.parse(this.responseText);
           console.log("success")
           // console.log(response)
           response = response.results;
           console.log(response)
           // console.log()

           for (var i=0; i < response.length; i++){
           $(".result").append('<ul class=\"resultList\"></ul>');
           $(".resultList").eq(i).append('<li>'+ response[i].name+ '</li>');
           console.log($(".resultList")[i])
             var html= capitalize(response[i].gender);

             if (response[i].hair_color){
               html+= "." + capitalize(response[i].hair_color) +" hair"
             }
             if (response[i].eye_color){
               html +="." + capitalize(response[i].eye_color) +" eye"
             }
             $(".resultList").eq(i).append("<li class=\"subList\">" + html + "</li>");
           }
           $(".result").show();
         }
   };
   xhttp.open("GET", url , true);
   xhttp.send(null);

}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}
