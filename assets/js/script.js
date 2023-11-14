
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//     instances.open();
//   });

var submitEl = document.querySelector("#submit");
var input = document.querySelector("#input");
var img = document.querySelector("#img");
var test = 0;
var array = ["./assets/img/download.jpg", "./assets/img/download(1).jpg", "./assets/img/download(2).jpg"];

// Action to be performed on click store in named function
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
  input.value = ""
  if(test == 2){
    test = 0 
  }else{
    test ++;
  }
  img.src = array[test]
}
  
// Add listener to submit element
submitEl.addEventListener("click", showResponse);



var characterMovieList = [
  { characterName: "Dusty Crophopper", movieName: "Planes"},
  { characterName: "Tigger", movieName: "The Many Adventures of Winnie the Pooh"},
  { characterName: "Lilo", movieName: "Lilo & Stitch"},
  // { characterName: "Pinocchio", movieName: "Pinocchio"},
  // { characterName: "Dumbo", movieName: "Dumbo"},
  // { characterName: "Peter Pan", movieName: "Peter Pan [1]"},
  // { characterName: "Tinker Bell", movieName: "Peter Pan [1]"},
  // { characterName: "Captain Hook", movieName: "Peter Pan [1]"},
  // { characterName: "Mowgli", movieName: "The Jungle Book [1]"},
  // { characterName: "Baloo", movieName: "Planes"},
  // { characterName: "Ariel", movieName: "Planes"},
  // { characterName: "Aladdin", movieName: "Planes"},
  // { characterName: "Simba", movieName: "The Lion King [2]"},
  // { characterName: "Pocahontas", movieName: "Pocahontas"},
  // { characterName: "Flubber", movieName: "Flubber [2]"},
  // { characterName: "Mulan", movieName: "Mulan [1]"},
  // { characterName: "Tarzan", movieName: "Tarzan"},
  // { characterName: "Kenai", movieName: "Brother Bear"},
  // { characterName: "Baymax", movieName: "Big Hero 6"},
  // { characterName: "Raya", movieName: "Raya and the Last Dragon "}
]


//This function removes extra information about Movie names in Brackets
function removeBrackets(inputString) {
  return inputString.replace(/ *\([^)]*\) */g, ''); 
};


//Loop to go through each object in Array
function characterInOrder() {
  for (let i = 0; i < characterMovieList.length; i++){
      var currentCharacter = characterMovieList[i].characterName;
      console.log(currentCharacter)
      var currentMovie = characterMovieList[i].movieName;
      

      //Fetch for Character Image from API
      var characterImage = getCharacterData(currentCharacter.characterName);

      //Fetch for Movie Image from API
      // var movieImage = getMovieData(currentCharacter.movieName);

      

      
      // console.log('Movie', movieImage);
      //Function to fetch for the character Image
      function getCharacterData(){

          var url = 'https://api.disneyapi.dev/character?name='+currentCharacter;
          
          fetch(url, {
            method: 'GET',
            
          })
              .then(function (response) {
                  return response.json();
              })
              .then(function (data) {
                  var characterImage = data.data.imageUrl;
                  // var importedMovieName = data.data.films[1];
                  // console.log(imageSource);
                  // console.log('data:', data)
                  console.log('CharacterImage:', characterImage);
              });                  
      }
      //Function to fetch for Movie Poster
      function getMovieData(){
          var movieName = 'Cars';
          var url = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/'+currentMovie+'?exact=true&titleType=movie';  
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
                  console.log('PosterLink',data.results[0].primaryImage.url)
          })
      


      }    



      





  }
}

characterInOrder();