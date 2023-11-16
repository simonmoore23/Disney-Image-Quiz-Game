// Initialize modals on elements with the 'modal' class when the document is ready
$(document).ready(function(){
  $('.modal').modal();
});

// Select corresponding Elements from HTML
var submitEl = document.querySelector("#submit");
var input = document.querySelector("#input");
var img = document.querySelector("#img");
var img2 = document.querySelector("#img2");
var valid = document.querySelector('#validation');
var modal = document.querySelector("#modal1");
var questionNoEl = document.querySelector("#questionNo");
var quiz = document.querySelector("#quiz");
var endPage = document.querySelector("#end-page");
var scoreRn = document.querySelector("#score-rn");
var percentRn = document.querySelector("#precent-rn");
var scorePrev = document.querySelector("#score-prev");
var percentPrev = document.querySelector("#percent-prev");
var correctName = document.querySelector("#correctName");
var array = ["./assets/img/download.jpg", "./assets/img/download(1).jpg", "./assets/img/download(2).jpg"];
var score = 0

//Array of Objects containing Character and Movie ID's
var characterMovieList = [
  { characterName: "1540", movieName: "tt1691917"},//Planes
  { characterName: "6749", movieName: "tt0076363"},//The Many Adventures of Winnie the Pooh
  { characterName: "5195", movieName: "tt0275847"},//Lilo & Stitch
  { characterName: "5325", movieName: "tt0032910"},//Pinocchio
  { characterName: "1975", movieName: "tt0033563"},//Dumbo
  { characterName: "5117", movieName: "tt0046183"},//Peter Pan
  { characterName: "6776", movieName: "tt0046183"},//Peter Pan
  { characterName: "1044", movieName: "tt0046183"},//Peter Pan
  { characterName: "4710", movieName: "tt0061852"}, //The Jungle Book
  { characterName: "450", movieName: "tt2226178"}, //Baloo 
  { characterName: "309", movieName: "tt0097757"}, //Ariel
  { characterName: "6160", movieName: "tt0110357"}, //The Lion King
  { characterName: "5379", movieName: "tt0114148"},//Pocahontas
  { characterName: "2389", movieName: "tt0119137"},//Flubber
  { characterName: "2183", movieName: "tt0120762"},//Fa Mulan
  { characterName: "6610", movieName: "tt0120855"},//Tarzan
  { characterName: "3631", movieName: "tt0328880"},//Brother Bear
  { characterName: "527", movieName: "tt2245084"}, //Big Hero 6
  { characterName: "5634", movieName: "tt5109280"} //Raya and the Last Dragon
]

//Variables for loop 
var i = 0; 
var v = 0;
var questionNo = 1
var currentCharacterName;

//Function to fetch Character and preload image for 1st Image 
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

//Calls Function
firstQuestion();

//Function to go through each object in Array and retrieve Character and Movie
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  var currentCharacterId = characterMovieList[i].characterName;
  getCharacterData(characterMovieList[i].characterName, 1);

  // If the index 'i' is less than 18, fetch character data for the next character in the list
  if(i<18){
    i++;
    getCharacterData(characterMovieList[i].characterName, 2);
  }

  // Get the movie name from the current index 'v' in 'characterMovieList'
  var currentMovie = characterMovieList[v].movieName;
  getMovieData(currentMovie);

  // Increment the indices 'v' and 'questionNo'
  v++;
  questionNo++;

  questionNoEl.textContent = questionNo;
  
  if(v == 19){
    //if true hide quiz
    quiz.style.display = 'none'

    //Display 'endpage element'
    endPage.style.display = 'block'

    // Set the text content of 'scoreRn' to the current score
    scoreRn.textContent = score

    // Calculate the percentage score and display it
    var percent = Math.round(score/19 *100)
    var temp =percent.toString();
    percentRn.textContent = temp;

    // Retrieve and render the previous score
    localScore =renderPrevScore();
    scorePrev.textContent = localScore;

    //Checks for previous Local Storage
    if(localScore == "N/A"){
      percentPrev.textContent = "N/A"
    }else{
      // If false, calculate the percentage based on 'localScore' and update 'percentPrev'
      var percent2 = Math.round(localScore/19 * 100);
      percentPrev.textContent = percent2;
    }
    localStorage.setItem("Score",score);
  }
}

//Retrieves last Local Storage values
function renderPrevScore() {
  var localScore = localStorage.getItem("Score")
  if (!localScore) {
    return "N/A";
  }
  return localScore
}
// Add listener to submit element
submitEl.addEventListener("click", showResponse);

//Checks whether the input from user matches correct data received from API
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
              valid.textContent = "CORRECT";
              score ++;
            }else{
              modal.className = "modal red lighten-2";
              valid.textContent = "INCORRECT";
            }
            correctName.textContent = characterName;
            input.value = ""
          }else{
            var characterImage = data.data.imageUrl;
            img.src = characterImage;
          }
      }); 
                     
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