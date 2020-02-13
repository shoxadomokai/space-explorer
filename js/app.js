const sections = document.querySelectorAll("section");
const navList = document.querySelector(".navbar__list");
const navbar = document.querySelector(".navbar");

//function to populate the navbar
const buildLinks = () => {
  for (let section of sections) {
    //label of the navbar link
    const linkName = section.getAttribute("data-nav");
    //create and add the class to the navbar item node
    const listItem = document.createElement("LI");
    listItem.classList.add("navbar__item");
    const linkItem = document.createElement("A");
    linkItem.classList.add("navbar__link");
    linkItem.textContent = linkName;
    linkItem.setAttribute("href", `#${section.id}`);
    listItem.appendChild(linkItem);
    navList.appendChild(listItem);
  }
  document.querySelector(".navbar__item").classList.add("active-link");
};

//highlight active link
const highLightActive = () => {
  //find the boundary of the active link
  let activeLink = document
    .querySelector(".active-link")
    .getBoundingClientRect();
  //set the left position and width of the underline to the left and width of the link
  document.documentElement.style.setProperty(
    "--leftPos",
    `${activeLink.left}px`
  );
  document.documentElement.style.setProperty(
    "--linkWidth",
    `${activeLink.width}px`
  );
};

//add class 'active' section
const spyScrolling = () => {
  const scrollPos = document.scrollingElement.scrollTop + 2;
  if (scrollPos >= document.body.offsetHeight / 2) {
    goTop.style.bottom = "3vw";
  } else {
    goTop.style.bottom = "-7vw";
  }
  for (let section of sections) {
    if (section.offsetTop <= scrollPos) {
      const id = section.id;
      document.querySelector(".active-link").classList.remove("active-link");
      if (!document.querySelector(".active")) {
        sections[0].classList.add("active");
      }
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector(`a[href*=${id}]`)
        .parentElement.classList.add("active-link");
      document.querySelector(`#${id}`).classList.add("active");
      highLightActive();
    }
  }
};

let prevScrollpos = document.scrollingElement.scrollTop;
const goTop = document.querySelector(".goTop");
const animateNavbar = () => {
  //adds and removes a background to the navbar on scroll
  let currentScrollPos = document.scrollingElement.scrollTop;
  if (currentScrollPos == 0) {
    navbar.classList.remove("navbar--dark");
  } else if (prevScrollpos < currentScrollPos) {
    navbar.classList.add("navbar--dark");
    navbar.style.top = `-${navbar.offsetHeight}px`;
  } else {
    navbar.style.top = "0";
  }
  prevScrollpos = currentScrollPos;
};

//add smooth scrolling behaviour
const makeNavLinksSmooth = () => {
  event.preventDefault();
  document.querySelector(event.target.hash).scrollIntoView({
    behavior: "smooth"
  });
};
navList.addEventListener("click", makeNavLinksSmooth);

//add gotoTop function
goTop.addEventListener("click", () => {
  document.querySelector("body").scrollIntoView({
    behavior: "smooth"
  });
});

window.addEventListener("DOMContentLoaded", () => {
  buildLinks();
  highLightActive();
});

//on window resize make sure the link is correctly positioned
window.addEventListener("resize", () => {
  highLightActive();
});

window.addEventListener("scroll", () => {
  animateNavbar();
  spyScrolling();
});
