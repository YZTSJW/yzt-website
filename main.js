/* YZT 新版官网 · 全局交互 */
(function () {
  'use strict';

  /* 1. 导航吸顶阴影 */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (header) {
      if (window.scrollY > 10) { header.classList.add('scrolled'); }
      else { header.classList.remove('scrolled'); }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. 移动端菜单 */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* 3. 滚动渐入 */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    /* 兜底：若 1.5 秒后仍有渐入元素未显示（观察器异常/特殊浏览器），强制全部显示，保证内容不丢失 */
    setTimeout(function () {
      revealEls.forEach(function (el) {
        if (!el.classList.contains('visible')) { el.classList.add('visible'); }
      });
    }, 1500);
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 4. 产品筛选（products.html） */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var prodCards = document.querySelectorAll('.prod-card[data-cat]');
  if (filterBtns.length && prodCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        prodCards.forEach(function (card) {
          var show = (cat === 'all') || (card.getAttribute('data-cat') === cat);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }


  /* 5. 留言表单（contact.html）— 提交提示 */
  var form = document.getElementById('feedbackForm');
  var formTip = document.getElementById('formTip');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formTip) {
        formTip.textContent = '✅ 提交成功！我们会尽快与您联系。';
        formTip.style.color = '#16a34a';
      }
      form.reset();
    });
  }
})();
