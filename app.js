const searchbox = document.querySelector(".search-box");
const cityTxt = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weatherTxt = document.querySelector(".weather");
const dateTxt = document.querySelector(".date");

const api = {
  key: "e150c33f72106b91284591fc174acb3a",
  base: "http://api.openweathermap.org/data/2.5/"
};

searchbox.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
    e.currentTarget.value = "";
  }
});

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`, {
      mode: 'cors'
    })
    .then((response) => {
      return response.json();
    })
    .then(displayResults);
};

const displayResults = (weather) => {
  cityTxt.innerText = `${weather.name.toUpperCase()}, ${weather.sys.country}`;
  temp.innerText = `${Math.round(weather.main.temp)} °C`;
  weatherTxt.innerText = weather.weather[0].main;
  let now = new Date();
  dateTxt.innerText = dateBuilder(now);

  save(weather.name);
};

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"
  ];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const save = (city) => {
  localStorage.setItem('city', JSON.stringify(city));
};

const load = () => {
  const city = JSON.parse(localStorage.getItem("city"));

  if (city) {
    getResults(city);
  } else {
    getResults("muğla");
  }
};

load();
