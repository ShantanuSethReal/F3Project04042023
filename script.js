const API_KEY = "IvlYFpn5heIJvq1NDxpLUfLlrZmrJ5af4qEqU7g1";

var date = new Date().toISOString().split("T")[0];
// console.log(date);

var api_endpoint = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
// https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}

async function getCurrentImageOfTheDay() {
  const response = await fetch(api_endpoint);
  const jsonData = await response.json();
  //   console.log(jsonData);
  document.getElementById("image-container").innerHTML = `
    <h2>Nasa Picture of the day</h2>
    <img src=${jsonData.url} alt="" height="300px" width="800px">
    <h4>${jsonData.title}</h4>
    <p>${jsonData.explanation}</p>`;
}

getCurrentImageOfTheDay();
async function getImageOfTheDay(currdate) {
  //FETCH DATA FOR CURRENT DATE
  let api_endpoint = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currdate}`;
  const response = await fetch(api_endpoint);
  const jsonData = await response.json();
  //   console.log(jsonData);
  document.getElementById("image-container").innerHTML = `
    <h2>Nasa Picture of the day</h2>
    <img src=${jsonData.url} alt="" height="300px" width="800px">
    <h4>${jsonData.title}</h4>
    <p>${jsonData.explanation}</p>`;

  //ADD DATA TO LOCAL STORAGE
  if (localStorage.getItem("searches")) {
    const arraydates = JSON.parse(localStorage.getItem("searches"));
    const newarraydates = [...arraydates, { dates: currdate }];
    localStorage.setItem("searches", JSON.stringify(newarraydates));
  } else {
    const lobj = [{ dates: currdate }];
    localStorage.setItem("searches", JSON.stringify(lobj));
  }

  //SHOW IN search history
  var ul = document.getElementById("list-searches");
  var lidata = "";
  let arr = JSON.parse(localStorage.getItem("searches"));
  for (let index = 0; index < arr.length; index++) {
    let item = arr[index];
    lidata += `<li style="color:blue" onclick="showcontainer(event)">${item.dates}</li>`;
  }
  //   console.log(lidata);
  ul.innerHTML = lidata;
}
function saveSearch(cdate) {
  if (localStorage.getItem("searches")) {
    const arraydates = JSON.parse(localStorage.getItem("searches"));
    const newarraydates = [...arraydates, { dates: cdate }];
    localStorage.setItem("searches", JSON.stringify(newarraydates));
  } else {
    const lobj = [{ dates: cdate }];
    localStorage.setItem("searches", JSON.stringify(lobj));
  }
}
function addSearchToHistory(cdt) {
  var ul = document.getElementById("list-searches");
  var lidata = "";
  let arr = JSON.parse(localStorage.getItem("searches"));
  for (let index = 0; index < arr.length; index++) {
    let item = arr[index];
    lidata += `<li style="color:blue">${item.dates}</li>`;
  }
  //   console.log(lidata);
  lidata += `<li style="color:blue">${cdt}</li>`;
  ul.innerHTML = lidata;
}

function searchfn() {
  //   console.log("Button clicked");
  const currselecteddate = document.getElementById("search-input").value;
  getImageOfTheDay(currselecteddate);
}
function handler(e) {
  datesel = e.target.value;
  //   console.log(datesel);
}
async function showcontainer(e) {
  const d = e.target.innerHTML;
  //   console.log(e);
  //   console.log(d);
  let api_endpoint = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${d}`;
  const response = await fetch(api_endpoint);
  const jsonData = await response.json();
  //   console.log(jsonData);
  document.getElementById("image-container").innerHTML = `
    <h2>Nasa Picture of the day</h2>
    <img src=${jsonData.url} alt="" height="300px" width="800px">
    <h4>${jsonData.title}</h4>
    <p>${jsonData.explanation}</p>`;
}
