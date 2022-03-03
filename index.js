const searchValue = document.querySelector(".search__input");
const nbaContainer = document.querySelector(".nba-container");
const nbaGrid = document.querySelector(".nba_grid");
const suggestionName = document.getElementsByClassName("span-name");

const renderError = function (error) {
  const html = `<div class="error-container"><p>${error}</p></div>`;
  nbaContainer.insertAdjacentHTML("afterbegin", html);
};

const nbaPlayers = async function () {
  const res = await fetch(
    "https://free-nba.p.rapidapi.com/players?page=0&per_page",
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

const nbaTeams = async function (value) {
  const res = await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4",
    },
  });
  const data = await res.json();
  const data2 = data.data;

  const teamNames = data2.map((ele) => {
    return ele.name.toLowerCase();
  });
  const teamFullNames = data2.map((ele) => {
    return ele.full_name.toLowerCase();
  });

  const [searchedFullName] = teamFullNames.filter((ele) => ele.includes(value));
  const [searchedName] = teamNames.filter((ele) => ele === value);
 
  if (value === searchedFullName || value === searchedName) {
    console.log(`yes`);
  } else {
    renderError(
      `No such team is available. Did you mean <span class="span-name">${searchedFullName}</span>?`
    );
    nbaGrid.style.display = `none`;
  }
  //return teamNames, teamFullNames;
};

const nbaStats = async function () {
  const res = await fetch(
    "https://free-nba.p.rapidapi.com/stats?page=0&per_page=25",
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

//nbaPlayers();
//nbaStats();
//nbaGames();

searchValue.addEventListener("change", function () {
  const theValue = searchValue.value.toLowerCase();
  console.log(theValue);
  nbaTeams(theValue);
  searchValue.value = "";
});

/*
How to make the autosuggestion into the value of search???

suggestionName.addEventListener("click", function(){
  console.log(suggestionName);
  searchValue.value = suggestionName.textContent;
})*/
