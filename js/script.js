/** @format */

// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // active section for animation on scroll
      sec.classList.add("show-animate");
    }
    // If want to use animation that repeat on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll
  window.addEventListener("scroll", function () {
    let footer = document.querySelector("footer");

    footer.classList.toggle(
      "show-animate",
      this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
    );
  });
};

//Additional content expands or collapses when clicking the "Read More"
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButton = document.querySelector(".read-more");
  const longDescription = document.querySelector(".long-description");

  readMoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    longDescription.classList.toggle("hidden");
    if (longDescription.classList.contains("hidden")) {
      readMoreButton.textContent = "Read More";
    } else {
      readMoreButton.textContent = "Read Less";
    }
  });
});

//Send message to email
const form = document.querySelector("form");
const fullName = document.getElementById("fullName");
const emailId = document.getElementById("emailId");
const mobile = document.getElementById("mobile");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${emailId.value}<br> Mobile Number: ${mobile.value}<br> Message: ${message.value}`;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "uttamjena343@gmail.com",
    Password: "EA2F538093C7149E0A4CC8FF524106E1491C",
    To: "uttamjena343@gmail.com",
    From: "uttamjena343@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      }).then(() => {
        document.getElementById("myForm").reset(); // Reset the form after success
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!emailId.value.match(emailRegex)) {
    emailId.classList.add("error");
    emailId.parentElement.classList.add("error");

    if (emailId.value != "") {
      errorTxtEmail.innerText = "Invalid Email";
    } else {
      errorTxtEmail.innerText = "Email address can't be blank";
    }
  } else {
    emailId.classList.remove("error");
    emailId.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !emailId.classList.contains("error") &&
    !mobile.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
  }
});

// Disable the keys
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
document.addEventListener("keydown", function (e) {
   if (e.key === "F12" || (e.ctrlKey && e.key === "u")) {
     e.preventDefault();
   }
 });
