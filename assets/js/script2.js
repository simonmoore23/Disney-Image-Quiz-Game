
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//     instances.open();
//   });

$(document).ready(function(){
  $('.modal').modal();
  });

var submitEl = document.querySelector("#submit");
var input = document.querySelector("#input");
var img = document.querySelector("#img");
var img2 = document.querySelector("#img2");
var valid = document.querySelector('#validation');
var modal = document.querySelector("#modal1");
var questionNoEl = document.querySelector("#questionNo");
var quiz = document.querySelector("#quiz");
//var test = 0;
var array = ["./assets/img/download.jpg", "./assets/img/download(1).jpg", "./assets/img/download(2).jpg"];
var score = 0

var characterMovieList = [
  { characterName: "1540", movieName: "tt1691917"}, //Planes
  { characterName: "6749", movieName: "tt0076363"},//The Many Adventures of Winnie the Pooh
  { characterName: "5195", movieName: "tt0275847"},// Lilo & Stitch
  { characterName: "5325", movieName: "tt0032910"},//Pinocchio
  { characterName: "1975", movieName: "tt0033563"},//Dumbo
  { characterName: "5117", movieName: "tt0046183"},//Peter Pan
  { characterName: "6776", movieName: "tt0046183"},//Peter Pan
  { characterName: "1044", movieName: "tt0046183"},//Peter Pan
  { characterName: "4710", movieName: "tt0061852"}, //The Jungle Book
  { characterName: "450", movieName: "tt2226178"}, //Baloo 
  { characterName: "309", movieName: "tt0097757"}, //Ariel
  // { characterName: "Aladdin", movieName: "Planes"},
  { characterName: "6160", movieName: "tt0110357"}, //The Lion King
  { characterName: "5379", movieName: "tt0114148"},//Pocahontas
  { characterName: "2389", movieName: "tt0119137"},//Flubber
  { characterName: "2183", movieName: "tt0120762"},//Mulan
  { characterName: "6610", movieName: "tt0120855"},//Tarzan
  { characterName: "3631", movieName: "tt0328880"},//Brother Bear
  { characterName: "527", movieName: "tt2245084"}, //Big Hero 6
  { characterName: "5634", movieName: "tt5109280"} //Raya and the Last Dragon
]

//This function removes extra information about Movie names in Brackets
// function removeBrackets(inputString) {
//   return inputString.replace(/ *\([^)]*\) */g, ''); 
// };

var i = 0; 
var v = 0;
var questionNo = 1
//var currentCharacterImage;
//var currentMovieImage;
var currentCharacterName = "hello";

//Loop to go through each object in Array

function firstQuestion(){
  var url = 'https://api.disneyapi.dev/character/'+characterMovieList[0].characterName;
  
  fetch(url, {
    method: 'GET',
    
  })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          var characterImage = data.data.imageUrl;
          img.src = characterImage;
          //currentCharacterName = data.data.name;
      });
}
firstQuestion();
console.log(currentCharacterName);
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  var currentCharacterId = characterMovieList[i].characterName;
  getCharacterData(characterMovieList[i].characterName, 1);
  if(i<18){
    i++;
    getCharacterData(characterMovieList[i].characterName, 2);
  }
  var currentMovie = characterMovieList[v].movieName;
  getMovieData(currentMovie);
  v++;
  questionNo++;
  questionNoEl.textContent = questionNo;
  console.log(v);
  if(v == 18){
    quiz.style.display = 'none'
  }
}
  
// Add listener to submit element
submitEl.addEventListener("click", showResponse);

function getCharacterData(currentCharacter , nameOrImage){

  var url = 'https://api.disneyapi.dev/character/'+currentCharacter;
  
  fetch(url, {
    method: 'GET',
    
  })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          if(nameOrImage == 1){
            var characterName = (data.data.name);
            if(characterName == input.value){
              modal.className = "modal green lighten-2";
              valid.textContent = "you are correct";
              score ++;
            }else{
              modal.className = "modal red lighten-2";
              valid.textContent = "you are incorrect";
            }
            input.value = ""
          }else{
            var characterImage = data.data.imageUrl;
            img.src = characterImage;
          }
      }); 
  //console.log(characterName);                     
}
// Function to fetch for Movie Poster
function getMovieData(currentMovie){
    var movieName = 'Cars';
    var url = 'https://moviesdatabase.p.rapidapi.com/titles/'+currentMovie;  
    var rapidApiHost = 'moviesdatabase.p.rapidapi.com';
    
    fetch(url,{
        method:'GET',
        headers:{
            'X-RapidAPI-Host': rapidApiHost,
            'X-RapidAPI-Key': 'e75fa08f12mshdeaa96450c2a0f2p103cc2jsn84b52f82c0ae',  
            'Content-Type': 'application/json',
        },
    })
        .then(function (response){
            return response.json()
    })
        .then(function(data){
            // characterInfo.movie = data.results[2].primaryImage.url;
            //console.log('Movie Image',data.results.primaryImage.url);
            img2.src = data.results.primaryImage.url;
    })     

} 