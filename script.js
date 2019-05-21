
$(document).ready(function(){
  $(".dropright").click(function(){
    $(".dropContent").toggle("show").attr("");
    //make the arrow rotate
    $(".arrow").css('transform','rotate(180 deg)')

  });

  $(".dropContent > li").click(function(){
    var option= $(this).children().attr("class");
    $(".option").show()
    if (option != "numResult"){
      $(".selected").html($(this).html());
      $(this).hide()
      filterByGender(option);
    }
    else{
      $(".selected").html("Filter by gender");
      $(".resultList").show();
    }
  })
})


async function makeAPIcall(){
  $(".loader").show();
  $("figure").hide();
  $(".result").empty();
  var name = $("#searchItem")[0].value;
  var response = await apiCall(name);
  response= response.results;

  $(".loader").hide();
  // $(".box3").css({"background": "#c5cbd6"})
  displayAll(response);
}

function capitalize(word){
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function apiCall(name){
  var url = "https://swapi.co/api/people/"+"?search=" + name;
  var response;
  return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
    });
}

function displayAll(response){
  $(".numResult").text(response.length);
  var numFemale =0;
  var numMale =0;

  for (var i=0; i < response.length; i++){
  $(".result").append('<ul class=\"resultList\"></ul>');
  $(".resultList").eq(i).append('<li>'+ response[i].name+ '</li>');

    var html ="";
    if (response[i].gender){
      html= capitalize(response[i].gender);
      if (response[i].gender =="female"){
        $(".resultList").eq(i).attr("gender","female");
        numFemale ++;
      }
      else{
        $(".resultList").eq(i).attr("gender","male");
        numMale ++;
      }
    }
    if (response[i].hair_color){
      html+= "." + capitalize(response[i].hair_color) +" hair"
    }
    if (response[i].eye_color){
      html +="." + capitalize(response[i].eye_color) +" eye"
    }
    $(".resultList").eq(i).append("<li class=\"subList\">" + html + "</li>");
  }
  $(".result").show();
  $(".female").text("("+numFemale +")")
  $(".male").text("("+numMale +")") ;
}

function filterByGender(gender){
    if (gender == "female") gender= "male";
    else gender ="female"
    $("ul[gender=male]").show();
    $("ul[gender=female]").show();
    $("ul[gender="+gender+"]").hide();
}
