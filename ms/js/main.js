const slides = [...document.querySelectorAll(".hero-slide")];
const intervalTime = 2000;
let currentIndex = 0;

function showSlide(nextIndex) {
  slides[currentIndex].classList.remove("is-active");

  currentIndex = nextIndex;

  slides[currentIndex].classList.add("is-active");
}

setInterval(() => {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}, intervalTime);


const bookList = document.querySelector("#bookList");
const nextButton = document.querySelector("#nextButton");

nextButton.addEventListener("click", () => {

  // PC에서는 책이 모두 보이기 때문에
  // 가로 스크롤이 있는 경우에만 실행
  if (bookList.scrollWidth <= bookList.clientWidth) {
    return;
  }

  const firstCard = bookList.querySelector(".book-card");

  if (!firstCard) {
    return;
  }

  const cardWidth = firstCard.offsetWidth;

  const listStyle = window.getComputedStyle(bookList);
  const gap = parseFloat(listStyle.columnGap || listStyle.gap) || 0;

  const moveWidth = cardWidth + gap;


  /*
    마지막 위치까지 갔다면
    처음 위치로 이동
  */
  const maxScroll =
    bookList.scrollWidth -
    bookList.clientWidth;

  const isLast =
    bookList.scrollLeft >= maxScroll - 10;


  if (isLast) {

    bookList.scrollTo({
      left: 0,
      behavior: "smooth"
    });

  } else {

    bookList.scrollBy({
      left: moveWidth,
      behavior: "smooth"
    });

  }

});