const darkIcon = document.querySelector(".darkIcon");
const lightIcon = document.querySelector(".lightIcon");

let storedTheme = JSON.parse(localStorage.getItem("mode")) || false;
let darkTheme = storedTheme;

if (darkTheme) {
  document.body.classList.add("dark-theme");
  darkIcon.classList.add("d-none");
  lightIcon.classList.remove("d-none");
} else {
  document.body.classList.remove("dark-theme");
  darkIcon.classList.remove("d-none");
  lightIcon.classList.add("d-none");
}

function changeTheme() {
  darkTheme = !darkTheme;
  localStorage.setItem("mode", JSON.stringify(darkTheme));

  if (darkTheme) {
    document.body.classList.add("dark-theme");
    darkIcon.classList.add("d-none");
    lightIcon.classList.remove("d-none");
  } else {
    document.body.classList.remove("dark-theme");
    darkIcon.classList.remove("d-none");
    lightIcon.classList.add("d-none");
  }
}


export{ darkIcon , lightIcon , changeTheme , storedTheme , darkTheme}