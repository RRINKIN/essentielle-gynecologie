// récupération du dom
const menuHamDom = document.getElementById("burgerMenu");
const menuMainDom = document.getElementById("menuMain");

// ajout/suppression class au click
if(menuHamDom !== null && menuMainDom !== null)
{
    menuHamDom.addEventListener('click', function(){
        menuMainDom.classList.toggle("is-active");
    });
}
else
{
    console.log("Regarde tes ID!!");
}

// Open Popup contact form when clicking on contact
let popup = document.querySelector(".l-main-aside-contactForm-container-form");
let main = document.querySelector(".main");
let header = document.querySelector(".header");
let footer = document.querySelector(".footer");
function openPopup(){
    main.classList.add("blur");
    header.classList.add("blur");
    footer.classList.add("blur");
    popup.classList.add("openPopup");
}

// Open Popup Thank U when clicking on submit
let thankU = document.querySelector(".l-main-aside-contactForm-check");
function openThankU(event){
    event.preventDefault();
    fetch("https://formsubmit.co/ajax/9725de9aecfce696ba6d54eb809da3c4", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            nom: document.getElementById("nom").value,
            prenom: document.getElementById("prenom").value,
            email: document.getElementById("email").value,
            tel: document.getElementById("phone").value,
            question: document.getElementById("question").value,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success == "true") {
                popup.classList.remove("openPopup");
                thankU.classList.add("openPopup");
                document.querySelector(".l-main-aside-contactForm-fields").reset();
            }
        })
        .catch(error => console.log(error));
}

// Close "thank u" popup
function closeThankU(){
    thankU.classList.remove("openPopup");
    main.classList.remove("blur");
    header.classList.remove("blur");
    footer.classList.remove("blur");
}

// Close "contact" popup
function closeContact(){
    popup.classList.remove("openPopup");
    main.classList.remove("blur");
    header.classList.remove("blur");
    footer.classList.remove("blur");
}

// onScroll animations of the expertness bar
function scrollTrigger(selector, options = {}){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
      addObserver(el, options)
    })
}
function addObserver(el, options) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, options) // Passing the options object to the observer
    observer.observe(el)
  }
scrollTrigger('.l-main-section-expertnessBar-inside')