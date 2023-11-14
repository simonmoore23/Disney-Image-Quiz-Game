
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