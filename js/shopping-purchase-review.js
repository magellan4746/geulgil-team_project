/* ==============================
   리뷰 별점
============================== */

const reviewStars = document.querySelectorAll(".review-star");

let selectedRating = 0;


reviewStars.forEach((star) => {

  star.addEventListener("click", () => {

    selectedRating = Number(star.dataset.value);

    reviewStars.forEach((item) => {

      const value = Number(item.dataset.value);

      if (value <= selectedRating) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }

    });

  });

});


/* ==============================
   리뷰 작성
============================== */

const reviewText = document.querySelector("#reviewText");
const reviewSubmitBtn = document.querySelector("#reviewSubmitBtn");
const spoilerCheck = document.querySelector("#spoilerCheck");
const reviewList = document.querySelector("#reviewList");
const reviewEmpty = document.querySelector("#reviewEmpty");


reviewSubmitBtn.addEventListener("click", () => {

  const text = reviewText.value.trim();

  if (selectedRating === 0) {
    alert("별점을 선택해주세요.");
    return;
  }

  if (text === "") {
    alert("리뷰 내용을 작성해주세요.");
    return;
  }


  /* 기존 '리뷰 없음' 문구 제거 */
  if (reviewEmpty) {
    reviewEmpty.remove();
  }


  /* 새 리뷰 생성 */
  const reviewItem = document.createElement("article");

  reviewItem.classList.add("review-item");


  const spoilerText = spoilerCheck.checked
    ? "<span class='review-item-spoiler'>스포일러 포함</span>"
    : "";


  reviewItem.innerHTML = `
    <div class="review-item-stars">
      ${"★".repeat(selectedRating)}
      <span>${"★".repeat(5 - selectedRating)}</span>
    </div>

    ${spoilerText}

    <p class="review-item-text">
      ${text}
    </p>
  `;


  reviewList.prepend(reviewItem);


  /* 입력값 초기화 */
  reviewText.value = "";
  spoilerCheck.checked = false;

  selectedRating = 0;

  reviewStars.forEach((star) => {
    star.classList.remove("is-active");
  });

});


/* ==============================
   구매자 / 전체 필터 버튼
============================== */

const filterButtons =
  document.querySelectorAll(".review-filter-btn");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");

  });

});


/* ==============================
   정렬 버튼
============================== */

const sortButtons =
  document.querySelectorAll(".review-sort-btn");


sortButtons.forEach((button) => {

  button.addEventListener("click", () => {

    sortButtons.forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");

  });

});


/* ==============================
   리뷰 작성 유의사항
============================== */

const reviewWarningBtn =
  document.querySelector("#reviewWarningBtn");


reviewWarningBtn.addEventListener("click", () => {

  alert(
    "광고, 욕설, 비속어 및 타인을 비방하는 내용이 포함된 리뷰는 비공개 처리될 수 있습니다."
  );

});