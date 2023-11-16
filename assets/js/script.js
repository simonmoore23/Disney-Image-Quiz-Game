
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
var valid = document.querySelector('#validation')
//var test = 0;
var array = ["./assets/img/download.jpg", "./assets/img/download(1).jpg", "./assets/img/download(2).jpg"];
var score = 0
// Action to be performed on click store in named function
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  var newCharacter = characterInOrder();
  //input.value = ""
  // if(test == 2){
  //   test = 0 
  // }else{
  //   test ++;
  // }
  // img.src = array[test]
  
  //var newCharacter = characterInOrder();
  // img.src = newCharacter.getAttribute('image');
  // console.log(""+newCharacter.movie);
  //console.log(newCharacter.name)
  
}
  
// Add listener to submit element
submitEl.addEventListener("click", showResponse);



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
function removeBrackets(inputString) {
  return inputString.replace(/ *\([^)]*\) */g, ''); 
};

var i = 0; 

//var firstCharacter = characterInOrder()
//Loop to go through each object in Array
function characterInOrder() {
  var characterInfo = {};

  
  var currentCharacter = characterMovieList[i].characterName;
  //characterInfo.name = currentCharacter;
  // console.log(currentCharacter)
  if(i==0){
    var currentMovie = characterMovieList[i].movieName;
  }else{
    var currentMovie = characterMovieList[i-1].movieName;
  }
  

  // //Fetch for Character Image from API
  // var characterImage = getCharacterData(currentCharacter.characterName);
  // console.log(characterImage)
  // //Fetch for Movie Image from API
  // var movieImage = getMovieData(currentCharacter.movieName);

  // var characterName;

  
  // console.log('Movie', movieImage);
  //Function to fetch for the character Image
  function getCharacterData(currentCharacter){

      var url = 'https://api.disneyapi.dev/character/'+currentCharacter;
      
      fetch(url, {
        method: 'GET',
        
      })
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              var characterImage = data.data.imageUrl;
              img.src = characterImage;
              var characterName = (data.data.name);
              console.log(input.value);
              console.log(characterName);
              if(characterName == input.value){
                valid.textContent = "you are correct"
              }else{
                valid.textContent = "you are incorrect"
              }
              input.value = ""

              //console.log(characterName);
              // var importedMovieName = data.data.films[1];
              // console.log(imageSource);
              // console.log('data:', data)
              // console.log('CharacterImage:', characterImage);
              
          }); 
      //console.log(characterName);                     
  }
  getCharacterData(currentCharacter);
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
  getMovieData(currentMovie);

  //console.log(characterInfo)
  i++;
  //console.log(characterInfo);
  return characterInfo;  

}


