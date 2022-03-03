const teamValue = document.querySelector("#address");
const nbaContainer = document.querySelector(".nba_container");
const nbaGrid = document.querySelector(".nba_grid");
const nbaHeader = document.querySelector(".nba_header");
const suggestionName = document.getElementsByClassName("span_name");

const renderError = function (error) {
  const html = `<div class="error_container"><p>${error}</p></div>`;
  nbaContainer.insertAdjacentHTML("afterbegin", html);
};

const renderPlayers = function (player, index) {
  const html = `<div class="nba_grid">
  <p class="nba_sn">${index + 1}</p>
  <p class="nba_name">${player.first_name} ${player.last_name}</p>
  <p class="nba_fullteam">${player.team.full_name}</p>
  <p class="nba_team">${player.team.name}</p>
</div>`;
  nbaHeader.style.opacity = 1;
  nbaContainer.insertAdjacentHTML("beforeend", html);
};

const renderTeams = async function () {
  const res = await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4",
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

const nbaPlayers = async function (team) {
  const res = await fetch(
    "https://free-nba.p.rapidapi.com/players?page=0&per_page=100",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        "x-rapidapi-key": "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4",
      },
    }
  );

  const data = await res.json();
  const data2 = data.data;
  const data3 = data2
    .map((ele) => {
      return ele;
    })
    .filter((ele) => {
      if (team === ele.team.full_name) {
        return ele;
      }
    })
    .map((ele) => ele);
  data3.forEach((ele, index) => {
    renderPlayers(ele, index);
  });
};

///EXECUTION
renderTeams();
teamValue.addEventListener("change", function () {
  nbaContainer.innerHTML = "";
  const theValue = teamValue.value;
  console.log(theValue);
  nbaPlayers(theValue);
});

const nbaGames = async function () {
  const res = await fetch(
    "https://free-nba.p.rapidapi.com/games?page=0&per_page=25",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        "x-rapidapi-key": "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4",
      },
    }
  );
  const data = await res.json();
  const data2 = data.data;
  console.log(data2);
};

//nbaGames();
