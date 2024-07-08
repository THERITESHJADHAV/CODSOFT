// CONSTANT TYPED 
const typed = new Typed('.multiple-text',{
    strings: ['FRONTEND DEVELOPER', 'GRAPHIC DESIGNER', 'UI/UX DESIGNER'],
    typeSpeed:150,
    backSpeed:150,
    backDelay:1000,
    loop:true
});
//CHANGING TABS IN ABOUT SECTION
var tablinks = document.getElementsByClassName("TAB_LINKS");
var tabcontents = document.getElementsByClassName("TAB_CONTENTS");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("ACTIVE_LINK");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("ACTIVE_TAB");
    }
    event.currentTarget.classList.add("ACTIVE_LINK");
    document.getElementById(tabname).classList.add("ACTIVE_TAB");
}
//POP UP PREVIEW IN LATEST PROJECT SECTION

let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    document.body.classList.add('no-scroll'); // Prevent body scrolling
    let name = product.getAttribute('data-name');
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
    document.body.classList.remove('no-scroll'); // Allow body scrolling
  };
});
//SCRIPT FOR CONTACT ME GOOGLE SHEET
const scriptURL = 'https://script.google.com/macros/s/AKfycbzjopDLs42_MHZMSMptz5ThP3YL2PTrufLVy4qXCnabfFV4-_Z-SJTlGkVDuLtiKg/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "Form Submitted Succesfully. Wait for Reply."
        setTimeout(function(){
          msg.innerHTML = ""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

//SCROLL REVEAL SCRIPT FOR TEXT MOTION 
  ScrollReveal({ 
      //reset: true,
      distance:'40px',
      duration:2000, 
      delay:200
  });

  ScrollReveal().reveal('.HOME_CONTENT', { origin: 'top' });
  ScrollReveal().reveal('.HOME_IMAGE, .SOCIAL-MEDIA, .SERVICES_LIST, .products-container', { origin: 'bottom' });
  ScrollReveal().reveal('.HOME_CONTENT H1, .HOME_CONTENT H3, .ABOUT_COLUMN_1, .ABOUT_COLUMN_2 P, .CONTACT_LEFT p', { origin: 'left' });
  ScrollReveal().reveal('.ABOUT_COLUMN_2 H1, .MIDDLE, .CONTACT_RIGHT', { origin:'right' });

//SCRIPT FOR SIDEMENU

var sidemenu = document.getElementById("sidemenu");
function openmenu(){
  sidemenu.style.right = "0";
}
function closemenu(){
  sidemenu.style.right = "-200px";
}