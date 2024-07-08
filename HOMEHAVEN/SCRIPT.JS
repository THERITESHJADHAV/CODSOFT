//-------------------------------------------------------- INSURING POPUP PREVIEW AND SCROLL IS WORKING SIMULTANEOUSLY --------------------
document.addEventListener('DOMContentLoaded', function() {
  // Selecting elements
  let preveiwContainer = document.querySelector('.products-preview');
  let previewBox = preveiwContainer.querySelectorAll('.preview');
  let properties = document.querySelectorAll('.PROPERTY_CONTAINER .PROPERTY');

  // Adding click event listener to each property
  properties.forEach(property => {
    property.addEventListener('click', () => {
      let name = property.getAttribute('data-property-id');
      
      // Display preview container and activate corresponding preview box
      preveiwContainer.style.display = 'flex';
      
      previewBox.forEach(preview => {
        let target = preview.getAttribute('data-target');
        if (name === target) {
          preview.classList.add('active');
        } else {
          preview.classList.remove('active'); // Ensure others are inactive
        }
      });
    });
  });

  // Adding click event listener to close buttons in preview boxes
  previewBox.forEach(preview => {
    preview.querySelector('.fa-times').addEventListener('click', () => {
      preview.classList.remove('active');
      preveiwContainer.style.display = 'none';
    });
  });
});

//--------------------------------------------------------TOGGLE FOR LOGIN-PAGE--------------------
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register(){
  
  RegForm.style.transform = "translateX(0PX)";
  LoginForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
}

function login(){
  RegForm.style.transform = "translateX(300px)";
  LoginForm.style.transform = "translateX(300px)";
  Indicator.style.transform = "translateX(0px)";
}

//---------------------------------------------LIKED HEART IN POPULAR PROPERTIES -----------------------------------------------------------

function toggleHeart(element) {
  element.classList.toggle("heart-red");
}

// Function to toggle heart and store state in localStorage
function toggleHeart(element) {
  element.classList.toggle("heart-red"); // Toggle the class to change color

  var propertyId = element.parentElement.getAttribute('data-property-id'); // Get property ID
  var isRed = element.classList.contains("heart-red"); // Check if heart is red

  // Store state in localStorage
  if (isRed) {
      localStorage.setItem(propertyId, "red");
  } else {
      localStorage.removeItem(propertyId);
  }
}
// Function to initialize heart states based on localStorage
function initializeHearts() {
  var hearts = document.querySelectorAll('.fa-solid.fa-heart'); // Select all hearts
  hearts.forEach(function(heart) {
      var propertyId = heart.parentElement.getAttribute('data-property-id'); // Get property ID
      
      // Check localStorage for saved state and apply if necessary
      if (localStorage.getItem(propertyId) === "red") {
          heart.classList.add("heart-red");
      }
  });
}
// Handle clicking on heart to toggle its color
document.querySelectorAll('.PROPERTY_CONTAINER .fa-solid.fa-heart').forEach(heart => {
  heart.onclick = (event) => {
    event.stopPropagation(); // Stop event from bubbling to the container
    toggleHeart(heart);
  };
});

// Handle clicking on property container to show popup preview
document.querySelectorAll('.PROPERTY_CONTAINER .PROPERTY').forEach(property => {
  property.onclick = () => {
    // Implement your popup preview logic here
    console.log('Popup preview triggered for property:', property.getAttribute('data-property-id'));
  };
});
    // Initialize heart states when the page loads
document.addEventListener("DOMContentLoaded", function() {
  initializeHearts();
});


//--------------------------------------------- SCROLL IN MOST VIEWED ---------------------------------------------
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

//POP UP PREVIEW IN LATEST PROJECT SECTION

let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.PROPERTY_CONTAINER .PROPERTY').forEach(property =>{
  property.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = property.getAttribute('data-property-id');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});


//------------------------------------------------------ SPREADSHEET -------------------------------------------------------------------------
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzvH-Q5lsIkqRj4lECvqn6L4_9POZjl7vFg7bNsdEboAyf13gXhQNloYjXEvhJZxsV5/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML =""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })


//--------------------------------SCRIPT FOR PROPERTY-IMAGES IN POPUP PREVIEW -----------------------------

var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");

SmallImg[0].onclick = function()
{
  ProductImg.src = SmallImg[0].src;
} 
SmallImg[1].onclick = function()
{
  ProductImg.src = SmallImg[1].src;
} 
SmallImg[2].onclick = function()
{
  ProductImg.src = SmallImg[2].src;
} 
SmallImg[3].onclick = function()
{
  ProductImg.src = SmallImg[3].src;
}


//-----------------------------SCRIPT FOR SIDEMENU-----------------------------------





//--------------------------------STEPS TO CONNECT SPREADSHEET OF CONTACT FORM -----------------------------
/*
1.FIRST CREATE ONE SPREADSHEET AND GIVE APPROPRIATE NAME.
2.WRITE THE APPROPRIATE 'NAMES' IN THAT SPREADSHEET.
3.IN SPREADSHEET CLICK ON EXTENTIONS AND CHOOSE APPSCRIPT.
4.CHANGE THE APPSCRIPT FILE NAME TO THE NAME OF OUR SPREADSHEET.
5.CLEAR THE APPSCRIPT AND PASTE THE FOLLOWING CODE IN THAT APPSCRIPT FILE.
   
  var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

6. AFTER PASTING THE ABOVE CODE, CLICK ON SAVE AND RUN.
7. CLICK ON PREVIEW PERMISSIONS.
8. CHOOSE ACCOUNT.
9. CLICK ON ADVANCED.
10.CLICK ON GOTO(UNSAFE)..........
11.CLICK ON ALLOW.
12.CLICK ON DEPLOY AND CHOOSE NEW DEPLOYMENT.
13. CLICK ON SEETING ICON(SELECT TYPE) CLICK ON WEB APP.
14. WRITE THE NEW DESCRIPTION (FILE NAME).
15. WHO CAN ACCESS === ANYONE.
16.CLICK ON DEPLOY.
17. COPY THE WEB APP URL. (REQUIRED AFTERWARDS)
18. PASTE THE FOLLOWING CODE IN JAVASCRIPT FILE

  const scriptURL = '<SCRIPT URL>'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })

19. PASTE THE WEB APP URL AT THE PLACE OF SCRIPT URL. (FIRST LINE OF RECENT COPIED CODE).
20. ADD NAME="submit-to-google-sheet" THIS IN FORM TAG OF HTML
*/