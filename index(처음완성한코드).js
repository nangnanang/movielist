let cardList = document.querySelector(".cardList");

// 페이지가 로드되면 커서를 검색창으로 자동 지정
window.onload = function () {
  document.getElementById("inputBox").focus();
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWEyNWNmMjg4ODcxYjJlMDBlNTRmMzk3NDI2OGVmMCIsIm5iZiI6MTcyMTc5NDA0MS45OTY3OCwic3ViIjoiNjZhMDcyYzgzNGI2NTA0MDZmNTAzNWRkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9eGzwSVRYXTpOYcimJwjbTJ_1nQAhNq6a_MZxuNZ3T4",
  },
};

// fetch로 불러온 promise를 json=>객체 배열로 변환하여 사용함
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((json) => {
    let data = json.results;
    data.forEach((element) => {
      // 객체 배열에서 객체 값 추출
      let image = element.poster_path;
      let title = element.title;
      let overview = element.overview;
      let voteAverage = element.vote_average;
      let movieId = element.id;

      //카드 구성에 필요한 태그들 생성
      let createFrame = document.createElement("div");

      let createImage = document.createElement("img");
      let createContentBox = document.createElement("div");

      let createTitle = document.createElement("h2");
      let createContent = document.createElement("p");
      let createVote = document.createElement("p");

      //태그들의 구조 맞추기
      cardList.appendChild(createFrame);
      createFrame.appendChild(createImage);
      createFrame.appendChild(createContentBox);

      createContentBox.appendChild(createTitle);
      createContentBox.appendChild(createContent);
      createContentBox.appendChild(createVote);

      //생성된 태그에 클래스 붙이기
      createFrame.classList.add("oneCard");
      createTitle.classList.add("contentTitle");
      createContentBox.classList.add("contentBox");
      createVote.classList.add("vote");

      //생성된 태그에 값 붙이기
      createTitle.innerText = title;
      createContent.innerText = overview;
      createVote.innerText = "vote : " + voteAverage;
      createImage.src = "https://image.tmdb.org/t/p/w500/" + image;

      // 카드 클릭하면 alert 뜨게 하기
      createFrame.addEventListener("click", function () {
        alert("영화 id : " + movieId);
      });
    });
  });

// 돔이 완료되면 해당 이벤트를 추가하라
document.addEventListener("DOMContentLoaded", () => {
  let search = () => {
    // contentTitle이라는 클래스를 가진 값 모두 불러와서 배열 생성
    let titleData = document.querySelectorAll(".contentTitle");
    let input = document.getElementById("inputBox");

    titleData.forEach((element) => {
      let searchWord = input.value.toLowerCase();
      let searchCard = element.innerText.toLowerCase();
      let cardData = element.closest(".oneCard");

      // 검색창에 입력된 값이 생성된 카드의 타이틀의 일부이면 보이고, 아니면 숨겨라
      if (searchCard.includes(searchWord)) {
        cardData.style.display = "";
      } else {
        cardData.style.display = "none";
      }
    });
    //검색 하고 검색창 초기화
    input.value = "";
  };
  // 검색 버튼을 클릭하면 search 함수를 실행하는 이벤트 생성
  document.querySelector(".searchBtn").addEventListener("click", search);
  //검색창에서 키를 눌렀다 떼면 함수가 발동하는 이벤트 생성
  document
    .getElementById("inputBox")
    .addEventListener("keyup", function (event) {
      // 검색창에서 엔터키(keyCode 13)를 눌렀다 떼면 검색 버튼을 클릭하라.
      if (event.keyCode === 13) {
        document.querySelector(".searchBtn").click();
      }
    });
});
