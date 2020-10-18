const url = "https://api.covid19api.com/summary";
let summary = [];
const globalDataDiv = document.querySelector(".global-data");
const lastUpdate = document.querySelector(".last-update");
const searchResultDiv = document.querySelector(".search-result");

document.querySelector("#searchBar").addEventListener("keyup", (e) => {
  const empty = "";
  if (e.target.value.trim() === empty) {
    searchResultDiv.innerHTML = ``;
  } else {
    searchCountry(e.target.value);
  }
});

async function getSummary() {
  try {
    const res = await fetch(url);
    summary = await res.json();
    displayGlobal(summary);
    console.log(summary);
  } catch (err) {
    console.log(err);
  }
}

function displayGlobal(data) {
  const globalData = data.Global;

  globalDataDiv.innerHTML = `
  <div class="flex-row">
  <h3>Last Updated: </h3>
  <h3>${data.Date}</h3>

</div>
<div class="flex-row">
  <h3>New Confirmed: </h3>
  <h3>${globalData.NewConfirmed}</h3>
</div>
<div class="flex-row">
 <h3>New Deaths: </h3>
 <h3>${globalData.NewDeaths}</h3>
</div>
<div class="flex-row">
  <h3>New Recovered: </h3>
  <h3>${globalData.NewRecovered}</h3>
</div>
<div class="flex-row">
  <h3>Total Confirmed: </h3>
  <h3>${globalData.TotalConfirmed}</h3>
</div>
<div class="flex-row">
  <h3>Total Deaths: </h3>
  <h3>${globalData.TotalDeaths}</h3>
</div>
<div class="flex-row">
  <h3>Total Recovered: </h3>
  <h3>${globalData.TotalRecovered}</h3>
</div>
  `;
}

function searchCountry(searchingKeyWords) {
  searchingKeyWords = searchingKeyWords.toLowerCase().trim();
  const result = summary.Countries.filter((item) => {
    return item.Country.toLowerCase().includes(searchingKeyWords);
    //    ||item.CountryCode.toLowerCase().includes(searchingKeyWords)
  });
  displaySearchResult(result);
}

function displaySearchResult(result) {
  console.log(result);
  const resultData = result
    .map((item) => {
      return `
      <div class="grid-card">
      <div class="header grid">
          <h3>Country</h3>
          <h3>New Confirmed</h3>
          <h3>New Deaths</h3>
          <h3>New Recovered</h3>
          <h3>Total Confirmed</h3>
          <h3>Total Deaths</h3>
          <h3>Total Recovered</h3>
      </div>
      <div class="body grid">
          <h3>${item.Country}</h3>
          <h3>${item.NewConfirmed}</h3>
          <h3>${item.NewDeaths}</h3>
          <h3>${item.NewRecovered}</h3>
          <h3>${item.TotalConfirmed}</h3>
          <h3>${item.TotalDeaths}</h3>
          <h3>${item.TotalRecovered}</h3>
      </div>
  </div>`;
    })
    .join("");

  searchResultDiv.innerHTML = resultData;
}

getSummary();
