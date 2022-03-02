const nbaPlayers = async function(){
  const res = await fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "8f7a1114f2msh2187cd8d4c81e92p156f4djsn5789829814f4"
    }
  })

  const data = await res.json();
  const data2 = data.data;
  /*const data3 = data2.filter((ele) => {
    console.log(ele);
    if (ele.team.name === "Timberwolves"){
      console.log(ele.first_name);
      return ele.first_name
    }
  }
  )*/
  console.log(data2);
}

const usingData = nbaPlayers();