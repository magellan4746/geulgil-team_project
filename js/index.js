const slideGroups = [
  ...document.querySelectorAll(".hero-banner > .swiper-slide")
];

const intervalTime = 2000;
let currentIndex = 0;

function getVisibleSlide(group) {
  const variants = [...group.querySelectorAll(".hero-slide")];

  return variants.find((slide) => {
    const image = slide.querySelector("img");

    return image && window.getComputedStyle(image).display !== "none";
  });
}

function activateVisibleSlide(group) {
  const visibleSlide = getVisibleSlide(group);

  group.querySelectorAll(".hero-slide").forEach((slide) => {
    slide.classList.remove("is-active");
  });

  if (visibleSlide) {
    visibleSlide.classList.add("is-active");
  }
}

function showSlide(nextIndex) {
  currentIndex = nextIndex;

  slideGroups.forEach((group, index) => {
    if (index === currentIndex) {
      activateVisibleSlide(group);
    } else {
      group.querySelectorAll(".hero-slide").forEach((slide) => {
        slide.classList.remove("is-active");
      });
    }
  });
}

// 처음 로드될 때 현재 화면 크기에 맞는 이미지 활성화
showSlide(0);

// 화면 크기가 변경되면 현재 슬라이드의 반응형 이미지 재설정
window.addEventListener("resize", () => {
  activateVisibleSlide(slideGroups[currentIndex]);
});

// 슬라이드 자동 재생
setInterval(() => {
  const nextIndex = (currentIndex + 1) % slideGroups.length;

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


/* ==================================================
   메인 카테고리
   기본 이미지 ↔ Hover 이미지 변경
================================================== */

const categoryItems = document.querySelectorAll(".category-item");

categoryItems.forEach((item) => {
  const categoryImage = item.querySelector(".category-image");

  if (!categoryImage) return;

  const defaultImage = categoryImage.dataset.default;
  const hoverImage = categoryImage.dataset.hover;

  /* hover 이미지 미리 로딩 */
  if (hoverImage) {
    const preloadImage = new Image();
    preloadImage.src = hoverImage;
  }

  /* 마우스 올렸을 때 */
  item.addEventListener("mouseenter", () => {
    if (hoverImage) {
      categoryImage.src = hoverImage;
    }
  });

  /* 마우스 빠졌을 때 */
  item.addEventListener("mouseleave", () => {
    if (defaultImage) {
      categoryImage.src = defaultImage;
    }
  });

  /* 키보드 포커스 */
  item.addEventListener("focus", () => {
    if (hoverImage) {
      categoryImage.src = hoverImage;
    }
  });

  /* 키보드 포커스 해제 */
  item.addEventListener("blur", () => {
    if (defaultImage) {
      categoryImage.src = defaultImage;
    }
  });
});
