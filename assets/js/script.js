const dynamicText = document.querySelector(" p .auto-type");
const words = ["Data Scientist", "ML Engineer", "Gamer", "Web Developer","Techie","Graphics Designer"];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 70);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 150);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var header = document.getElementById('header');
    header.style.backgroundPositionY = -scrollPosition * 0.5 + 'px'; // Adjust the multiplier to control the speed of parallax
});

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


//sidemenuz//
var sidemeu = document.getElementById("sidemenu");
function openmenu(){
    sidemeu.style.right = "0";
}
function closemenu(){
    sidemeu.style.right = "-200px";
}


//to post data to googke sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWElsDHIT4533XyyEnQmm6Zod22-Ye7kqpwnLNNJ0BNhMkHnooV-1JvacsE9VSxYOV/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message Sent Successfully"
        setTimeout(() => {
            msg.innerHTML = ""
        }, 5000);
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})