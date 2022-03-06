const teamValue = document.querySelector("#address");
const nbaContainer = document.querySelector(".nba_container");
const topScorerContainer = document.querySelector(".top_scorers_container");
const nbaGrid = document.querySelector(".nba_grid");
const nbaHeader = document.querySelector(".nba_header");
const suggestionName = document.getElementsByClassName("span_name");
const host = "free-nba.p.rapidapi.com";
const key = "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4";

const renderError = function (error) {
  const html = `<div class="error_container"><p>${error}</p></div>`;
  nbaContainer.insertAdjacentHTML("afterbegin", html);
};

const renderPlayers = function (player, index) {
  const html = `<div class="nba_grid">
  <p class="nba_sn">${index + 1}</p>
  <p class="nba_name">${player.first_name} ${player.last_name}</p>
  <p class="nba_fullteam">${player.position}</p>
  <p class="nba_team">${player.team.name}</p>
</div>`;
  nbaContainer.insertAdjacentHTML("beforeend", html);
};

//GETTING ALL THE PLAYERS FROM API
let allPlayers, allNBAPlayers, locallySavedPlayers, allGames, allStats;
const reformedApi = async function (route = "", param = "") {
  const res = await fetch(`https://${host}/${route}?${param}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": host,
      "x-rapidapi-key": key,
    },
  });
  const data = await res.json();
  return data;
};
const getPlayers = async function () {
  allPlayers = [];
  for (let page = 1; page <= 38; page++) {
    let param = `page=${page}&per_page=100`;
    const res = await reformedApi(`players`, param);
    allPlayers.push(...res.data);
  }
  return allPlayers;
};

const renderTeams = async function () {
  const res = await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
    method: "GET",
    headers: {
      "x-rapidapi-host": host,
      "x-rapidapi-key": key,
    },
  });
  const data = await res.json();
  const data2 = data.data;
  const team = data2.map((ele) => {
    return ele.full_name;
  });
  team.forEach((ele) => {
    const html = `<option value="${ele}">${ele}</option>`;
    teamValue.insertAdjacentHTML("beforeend", html);
  });
};
//----ASYNCHRONUS IIFE -------------///
(async function () {
  allNBAPlayers = await getPlayers();
  localStorage.setItem("allPlayers", JSON.stringify(allNBAPlayers));
  renderTeams();
})()

const nbaPlayers = async function (team) {
  const theData = JSON.parse(localStorage.getItem("allPlayers"));
  const data = theData
    .map((ele) => {
      return ele;
    })
    .filter((ele) => {
      if (team === ele.team.full_name) {
        return ele;
      }
    })
    .map((ele) => ele);
  data.forEach((ele, index) => {
    renderPlayers(ele, index);
  });
};

///EXECUTION
teamValue.addEventListener("change", function () {
  nbaContainer.innerHTML = "";
  const theValue = teamValue.value;
  nbaPlayers(theValue);
});

const currentYear = new Date().getFullYear();
//----------GETTING THE TOP SCORERS----------///
const nbaGames = async function () {
  allGames = [];
  for (let page = 1; page <= 14; page++) {
    let param = `page=${page}&per_page=100&seasons[]=${currentYear - 1}&seasons[]=${currentYear}`;
    const res = await reformedApi(`games`, param);
    allGames.push(...res.data);
  }
  const getLatestDate = allGames
    .sort((a, b) => {
      return a.date - b.date;
    })
    .slice(-3);

  getLatestDate.forEach(async (game) => {
    let param = `per_page=100&game_ids[]=${game.id}`;
    const res = await reformedApi(`stats`, param);
    const [getTopPts] = res.data.sort((a, b) => b.pts - a.pts).slice(0, 1);
    const html = `<div class="top_grid">
    <p class="top_scorers_date">${game.date.split("T")[0]}</p>
    <p class="top_scorers_name">${getTopPts.player.first_name} ${getTopPts.player.last_name}</p>
    <p class="top_scorers_team">${getTopPts.team.full_name}</p>
    <p class="top_scorers_position">${getTopPts.player.position}</p>
    <p class="top_scorers_pts">${getTopPts.pts}</p>
  </div>`;
    topScorerContainer.insertAdjacentHTML("beforeend", html);
  });
};

nbaGames();
