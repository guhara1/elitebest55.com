/* ============================================================
   ELITE Lounge — 인터랙션 스크립트
   ============================================================ */
(function () {
  "use strict";

  /* ---- 현재 연도 ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- GNB 스크롤 효과 ---- */
  var gnb = document.getElementById("gnb");
  var onScroll = function () {
    if (!gnb) return;
    gnb.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- 모바일 메뉴 토글 ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    // 메뉴 항목 클릭 시 닫기
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- 스크롤 등장 애니메이션 ---- */
  var revealTargets = document.querySelectorAll(
    ".section__head, .info-card, .room-card, .menu-card, .review-card, .feature, .location__grid, .reserve-form"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- 예약 폼 (데모 검증) ---- */
  var form = document.getElementById("reserveForm");
  var msg = document.getElementById("formMsg");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!msg) return;

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var agree = form.agree.checked;

      msg.className = "form-msg";

      if (!name || !phone) {
        msg.textContent = "이름과 연락처를 입력해 주세요.";
        msg.classList.add("is-err");
        return;
      }
      if (!agree) {
        msg.textContent = "개인정보 수집·이용에 동의해 주세요.";
        msg.classList.add("is-err");
        return;
      }

      // 실제 서비스에서는 서버/메신저(API)로 전송하도록 연결하세요.
      msg.textContent =
        "예약 신청이 접수되었습니다. 담당자가 빠르게 연락드리겠습니다. (데모)";
      msg.classList.add("is-ok");
      form.reset();
    });
  }
})();
