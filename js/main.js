const sections = document.querySelectorAll("header .container ul li a");

// A Function To Give The Active Class To The Chosen Element
function activeHandler(elements, currentElement, sessionKey) {

  elements.forEach((el) => {
    el.classList.remove("active");
  })
  currentElement.classList.add("active");

  // ""Object.values(currentElement.dataset)[0]"" Is To Get The Element Dataset Value
  window.sessionStorage.setItem(sessionKey, Object.values(currentElement.dataset).at(0));
}

// A Function To Get The Activated Element From session Storage
function sessionActiveHandler(elements, currentElement, sessionKey) {

  if (window.sessionStorage.getItem(sessionKey)) {

    // Check If The Dataset Of The Element Is Equal To The Session Storage Value
    // ""Object.values(currentElement.dataset)[0]"" Is To Get The Element Dataset Value
    if (Object.values(currentElement.dataset).at(0) === window.sessionStorage.getItem(sessionKey)) {

      elements.forEach((el) => {
        el.classList.remove("active");
      });
      currentElement.classList.add("active");

    }

  }

}

let search = document.querySelector(".search i");

search.addEventListener("click", (e) => {

  document.body.style.overflow = "hidden";

  // Create The Overlay
  let overlay = document.createElement("div");
  overlay.className = "search-overlay";

  // Create And Add The parent Div
  let parent = document.createElement("div");
  parent.className = "search-parent";

  // Create And Add The Input Field
  let searchInput = document.createElement("input");
  searchInput.className = "search";
  searchInput.setAttribute("placeholder", "Search");
  parent.appendChild(searchInput);

  searchInput.addEventListener("input", (e) => {
    if (searchInput.value.toLowerCase() === "ahmed") {
      searchInput.value = `Your Uncle: ${searchInput.value}`;
    }
  });

  // Create And Add The Results Container
  let resultsContainer = document.createElement("div");
  resultsContainer.className = "search-container";
  parent.appendChild(resultsContainer);

  // Create And Add The Main Heading Of The Results Container
  let heading = document.createElement("h2");
  heading.textContent = "Results:"
  resultsContainer.appendChild(heading);

  let results = 2;

  for (let i = 0; i < results; i++) {

    // Create And Add The Result Div
    let result = document.createElement("div");
    result.className = "result";
    resultsContainer.appendChild(result);
  
    // Create And Add The Result Title
    let resultTitle = document.createElement("h3");
    resultTitle.textContent = "Result One";
    result.appendChild(resultTitle);
  
    // Create And Add The Result Description
    let resultDesc = document.createElement("p");
    resultDesc.textContent = "Curabitur arcu erat, accurnsan id imperdietet, porttitor at sem. Mauris blandit a'iouet elit eget tincidunt";
    result.appendChild(resultDesc);

  }

  // Create And Add The Close Button
  let close = document.createElement("div");
  close.className = "close";
  close.textContent = "X";
  parent.appendChild(close);

  // If The Close Button Is Clicked Remove The Search Div And The Overlay
  close.addEventListener("click", (e) => {
    parent.style.top = "150%";
    overlay.style.top = "150%";
    document.body.style.overflow = "visible";
    setTimeout(() => {
      // Remove The Search Div And Overlay When The Animation End
      close.parentElement.previousElementSibling.remove();
      close.parentElement.remove();
    }, 600);
  });

  // Append The Search Div And The Overlay To The Body
  document.body.append(overlay, parent);

  // Simple Animation For The Overlay
  setTimeout(() => {
    overlay.style.top = "0";
  }, 0);

  // Simple Animation For The Search Div
  setTimeout(() => {
    parent.style.top = "50%";
  }, 0);

})

// Loop On Every li In The Header And Active The Clicked One
sections.forEach((section) => {

  sessionActiveHandler(sections, section, "section");

  section.addEventListener("click", (e) => {
    activeHandler(sections, section, "section");
  });

});

const bar = document.querySelector("nav i.fa-bars");
const list = document.querySelector("nav ul");

document.addEventListener("click", (e) => {

  // if The Bar Is Clicked Show The List
  if (bar.contains(e.target)) {
    bar.classList.toggle("clicked");
    list.classList.toggle("show");

  // if The User Clicked On The Bar Again Or Any Where On The Site Hide The List
  } else {
    bar.classList.remove("clicked");
    list.classList.remove("show");
  }

});

const bullets = document.querySelectorAll(".landing .bullets .bullet");

// Loop On Every Bullet And Active The Clicked One
bullets.forEach((bullet) => {

  sessionActiveHandler(bullets, bullet, "bullet");

  bullet.addEventListener("click", (e) => {

    activeHandler(bullets, bullet, "bullet");
    landing.style.backgroundImage = `url(../images/${imgs.at(bullet.dataset.no)})`;
    window.sessionStorage.setItem("background-image", imgs.at(bullet.dataset.no));

  });

});

const imgs = ["landing1.jpg", "landing2.jpg", "landing3.jpg"];

const landing = document.querySelector(".landing");

const changeArrows = document.querySelectorAll(".landing .change-background");

// A function To Loop On Every Bullet And Get The Index Of The Active Bullet
function bulletsLoop(bullets) {

  for (let bullet of bullets) {

    if (bullet.classList.contains("active")) {
      // Return The data-no Of The Activated Bullet As A Number
      return Number(bullet.dataset.no);
    }

  }

}

// Declare A Variable And Assign It To The Active Bullet index
let n = bulletsLoop(bullets);

if (window.sessionStorage.getItem("background-image")) {
  landing.style.backgroundImage = `url(../images/${window.sessionStorage.getItem("background-image")})`;
}

// A Function To Change The Background Image Depending On The Current Image Number
function bgChange(n) {
  landing.style.backgroundImage = `url(../images/${imgs.at(n)})`;

  bullets.forEach((bullet) => {
    bullet.classList.remove("active");

    // If The Bullet Is Equal To n Activate It And Add It To The Session Storage
    if (bullet.dataset.no == n) {

      bullet.classList.add("active");
      sessionActiveHandler(bullets, bullet, "bullet");

    }

    window.sessionStorage.setItem("bullet", n);
    window.sessionStorage.setItem("background-image", imgs[n]);

  });
}

// Loop On Each Arrow And Change The BG Image Depending On Each One's Direction
changeArrows.forEach((arrow) => {

  arrow.addEventListener("click", (e) => {
    if (arrow.dataset.dir === "right") {

      n = n < 2 ? n + 1 : 0;
      bgChange(n);

    } else {

      n = n < 1 ? 2 : n - 1;
      bgChange(n);

    }
  });

});

let shuffles = document.querySelectorAll(".portfolio .container .shuffle li");

// Loop On Every Shuffle And Activate The Clicked One
shuffles.forEach((shuffle) => {

  sessionActiveHandler(shuffles, shuffle, "shuffle");

  shuffle.addEventListener("click", (e) => {
    activeHandler(shuffles, shuffle, "shuffle");
  });

});

// A Function To Get The Y Scroll Value And The Trigger Point Of The Given Section
function getScrollInfo(section) {

  let sectionOffset = section.offsetTop;
  let sectionHeight = section.offsetHeight;
  let documentHeight = window.innerHeight;

  return {
    scroll: window.pageYOffset,
    triggerPoint: sectionOffset + sectionHeight - documentHeight
  };
  
}

let statsSection = document.querySelector(".stats");
let stats = document.querySelectorAll(".stats .container .box h2");
let scrolled = false;

// Stats Scroll Start
window.addEventListener("scroll", (e) => {

  let scrollInfo = getScrollInfo(statsSection);
  
  if (scrollInfo.scroll >= scrollInfo.triggerPoint) {
    if (!scrolled) {
      stats.forEach((stat) => {

        let value = Number(stat.dataset.num);

        let interval = setInterval(() => {

          if (stat.textContent < value) {

            stat.textContent++;

          } else {
            clearInterval(interval);
          }

        }, 10);
      });
      scrolled = true;
    }
  }

});

let progs = document.querySelectorAll(".skills .our-skills .prog span");

let skillsSection = document.querySelector(".skills .our-skills");


window.addEventListener("scroll", (e) => {
  let scrollInfo = getScrollInfo(skillsSection);
  if (scrollInfo.scroll >= scrollInfo.triggerPoint) {
    progs.forEach((prog) => {
      prog.style.left = "0";
    });
  }
});

let testimonialsBullets = document.querySelectorAll(".skills .container .testimonials .bullets .bullet");

testimonialsBullets.forEach((bullet) => {

  sessionActiveHandler(testimonialsBullets, bullet, "testi-bullet");

  bullet.addEventListener("click", (e) => {
    activeHandler(testimonialsBullets, bullet, "testi-bullet");
  });

});

let contact = document.forms[1];

contact.addEventListener("submit", (e) => {
  let valid = true;

  let userName = document.querySelector("[name='name']");

  if (userName.value === "") {

    userName.nextElementSibling.textContent = "Can't be Blank";
    userName.nextElementSibling.style.display = "block";
    userName.style.borderColor = "red";
    valid = false;

  } else {

    let userNameRe = /^[a-zA-Z\s]+$/;

    if (userNameRe.test(userName.value) === false) {

      userName.nextElementSibling.textContent = "Your Name Can't Contain Any Numbers Or Special Characters";
      userName.nextElementSibling.style.display = "block";
      userName.style.borderColor = "red";
      valid = false;

    } else {

      userName.nextElementSibling.style.display = "none";
      userName.style.borderColor = "var(--descriptionColor)";

    }
  }

  let mail = document.querySelector("#email");

  if (mail.value === "") {

    mail.nextElementSibling.textContent = "Can't Be Blank";
    mail.nextElementSibling.style.display = "block";
    mail.style.borderColor = "red";
    valid = false;
    
  } else {

    let mailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (mailRe.test(mail.value) === false) {

      mail.nextElementSibling.textContent = "Invalid Mail Format";
      mail.nextElementSibling.style.display = "block";
      mail.style.borderColor = "red";
      valid = false;

    } else {

      mail.nextElementSibling.style.display = "none";
      mail.style.borderColor = "var(--descriptionColor)";

    }

  }

  let msg = document.querySelector("[name='msg']");

  if (msg.value.length < 2) {

    msg.nextElementSibling.style.display = "block";
    msg.style.borderColor = "red";
    valid = false;

  } else {

    msg.nextElementSibling.style.display = "none";
    msg.style.borderColor = "var(--descriptionColor)";

  }

  if (!valid) {

    e.preventDefault();
    
  }

});

let year = document.querySelector("footer .container .year");

year.textContent = new Date().getFullYear();