/* ==================================================
   도서 카테고리 버튼
================================================== */

const bookFilterButtons =
  document.querySelectorAll(".book-filter-btn");


bookFilterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    bookFilterButtons.forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");

  });

});


/* ==================================================
   페이지 번호
================================================== */

const pageButtons =
  document.querySelectorAll(
    ".pagination .page-btn:not(.page-first):not(.page-prev):not(.page-next):not(.page-last)"
  );


pageButtons.forEach((button) => {

  button.addEventListener("click", () => {

    pageButtons.forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");

  });

});


/* ==================================================
   모바일 카테고리 메뉴
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const mobileMenuButton =
    document.querySelector(".book-mobile-menu");

  const mobileMenuPanel =
    document.querySelector(".mobile-category-panel");

  const mobileMenuClose =
    document.querySelector(".mobile-category-close");


  /* 세 요소가 모두 있을 때만 실행 */
  if (!mobileMenuButton || !mobileMenuPanel || !mobileMenuClose) {
    return;
  }


  /* 메뉴 열기 */
  mobileMenuButton.addEventListener("click", () => {
    mobileMenuPanel.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });


  /* 메뉴 닫기 */
  mobileMenuClose.addEventListener("click", () => {
    mobileMenuPanel.classList.remove("is-open");
    document.body.style.overflow = "";
  });


  /* ESC 키로 닫기 */
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      mobileMenuPanel.classList.remove("is-open");
      document.body.style.overflow = "";
    }

  });

});


