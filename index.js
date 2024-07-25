let cardList = document.querySelector("#cardList");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWEyNWNmMjg4ODcxYjJlMDBlNTRmMzk3NDI2OGVmMCIsIm5iZiI6MTcyMTc5NDA0MS45OTY3OCwic3ViIjoiNjZhMDcyYzgzNGI2NTA0MDZmNTAzNWRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eGzwSVRYXTpOYcimJwjbTJ_1nQAhNq6a_MZxuNZ3T4",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((json) => {
    let data = json.results;
    for (let element of data) {
      let image = element.poster_path;
      let title = element.title;
      let overview = element.overview;
      let voteAverage = element.vote_average;
      let movieId = element.id;

      let createFrame = document.createElement("div");

      let createImage = document.createElement("img");
      let createContentBox = document.createElement("div");

      let createTitle = document.createElement("h2");
      let createContent = document.createElement("p");
      let createVote = document.createElement("p");

      cardList.appendChild(createFrame);
      createFrame.appendChild(createImage);
      createFrame.appendChild(createContentBox);

      createContentBox.appendChild(createTitle);
      createContentBox.appendChild(createContent);
      createContentBox.appendChild(createVote);

      createFrame.classList.add("oneCard");
      createTitle.classList.add("contentTitle");
      createContentBox.classList.add("contentBox");

      createTitle.innerText = title;
      createContent.innerText = overview;
      createVote.innerText = "vote : " + voteAverage;
      createImage.src = "https://image.tmdb.org/t/p/w500/" + image;

      createFrame.addEventListener("click", function () {
        alert("영화 id : " + movieId);
      });
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  let input = document.querySelector("#inputBox").value;
  let searchWord = input.toLowerCase();

  function search() {
    let titleData = document.querySelectorAll("#contentTitle");

    for (let i = 0; i < titleData.length; i++) {
      let cardData = titleData[i].parentElement;
      if (searchWord.includes(titleData[i].toLowerCase())) {
        cardData.style.display = 'flex';
      } else {
        cardData.style.display = 'none';
      }
    }
  }
  document.querySelector("#searchBtn").addEventListener("click", search());
});
