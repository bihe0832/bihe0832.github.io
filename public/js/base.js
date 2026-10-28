/* 工具函数 */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

/* 控制导航按钮动作（侧边栏显隐） */
function nav_click(is_show) {
  var aside = $('.aside');
  var aside3 = $('.aside3');
  var content = $('.aside3-content');
  if (!aside || !aside3) return;
  if (is_show) {
    aside.classList.add('visible-md', 'visible-lg');
    aside.classList.remove('hidden-md', 'hidden-lg');
    aside3.classList.remove('col-md-12', 'col-lg-12');
    aside3.classList.add('col-md-8', 'col-lg-8');
    if (content) {
      content.classList.remove('col-md-10', 'col-lg-8', 'col-md-offset-1', 'col-lg-offset-2');
      content.classList.add('col-md-12');
    }
  } else {
    aside.classList.remove('visible-md', 'visible-lg');
    aside.classList.add('hidden-md', 'hidden-lg');
    aside3.classList.remove('col-md-8', 'col-lg-8');
    aside3.classList.add('col-md-12', 'col-lg-12');
    if (content) {
      content.classList.remove('col-md-12');
      content.classList.add('col-md-10', 'col-lg-8', 'col-md-offset-1', 'col-lg-offset-2');
    }
  }
}

/* 控制文章目录显隐 */
function content_click(is_show) {
  var table = $('#content_table');
  if (table) table.style.display = is_show ? 'block' : 'none';
}

/* 生成文章目录 */
function content_effects() {
  var nav = $('#nav');
  var contentBtn = $('#content_btn');
  if (nav && $('#content')) {
    nav.innerHTML = '';
    $all('#content > h2,#content > h3,#content > h4,#content > h5,#content > h6').forEach(function (header, i) {
      header.setAttribute('id', 'title' + i);
      var tag = parseInt(header.tagName.substr(1), 10);
      var div = document.createElement('div');
      div.style.marginLeft = (15 * (tag - 1)) + 'px';
      div.innerHTML = "<a id='link" + i + "' href='#title" + i + "'>" + header.innerHTML + "</a>";
      nav.appendChild(div);
    });
    $all('#content img').forEach(function (img) {
      img.classList.add('img-thumbnail');
      if (img.parentElement && img.parentElement.tagName === 'P') {
        img.parentElement.classList.add('center');
      }
    });
    if (contentBtn) contentBtn.style.display = 'block';
  } else {
    if (contentBtn) contentBtn.style.display = 'none';
  }
}

/* tab 切换（原生，替代 bootstrap tab） */
function setupTabs() {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-toggle="tab"]');
    if (!link) return;
    e.preventDefault();
    var id = (link.getAttribute('href') || '').replace('#', '');
    $all('.tab-pane').forEach(function (pane) { pane.classList.remove('active'); });
    var target = document.getElementById(id);
    if (target) target.classList.add('active');
    $all('[data-toggle="tab"]').forEach(function (l) { l.parentElement.classList.remove('active'); });
    link.parentElement.classList.add('active');
  });
}

/* 折叠（原生，替代 bootstrap collapse） */
function setupCollapse() {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-toggle="collapse"]');
    if (!link) return;
    e.preventDefault();
    var id = (link.getAttribute('href') || '').replace('#', '');
    var panel = document.getElementById(id);
    if (panel) panel.classList.toggle('in');
  });
}

/* 轻量 pjax（fetch + History API，保留无刷新跳转） */
function setupPjax() {
  function loadContent(url) {
    fetch(url).then(function (res) { return res.text(); }).then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var newContent = doc.querySelector('#pjax');
      var cur = $('#pjax');
      if (newContent && cur) {
        cur.innerHTML = newContent.innerHTML;
        var aside3 = $('.aside3');
        if (aside3) aside3.scrollTop = 0;
        content_effects();
      }
    }).catch(function () {
      window.location.href = url;
    });
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('.pjaxlink');
    if (!link || link.target === '_blank') return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    e.preventDefault();
    loadContent(href);
    history.pushState(null, '', href);
  });

  window.addEventListener('popstate', function () {
    loadContent(window.location.href);
  });
}

/* 初始化 */
document.addEventListener('DOMContentLoaded', function () {
  var navBtn = $('#nav_btn');
  if (navBtn) {
    navBtn.addEventListener('click', function () {
      var clicked = navBtn.getAttribute('data-clicked') === 'true';
      nav_click(clicked);
      navBtn.setAttribute('data-clicked', String(!clicked));
    });
  }

  var contentBtn = $('#content_btn');
  if (contentBtn) {
    contentBtn.addEventListener('click', function () {
      var clicked = contentBtn.getAttribute('data-clicked') === 'true';
      content_click(!clicked);
      contentBtn.setAttribute('data-clicked', String(!clicked));
    });
  }

  setupTabs();
  setupCollapse();
  setupPjax();
  content_effects();

  // 激活当前分类的 tab
  if (window.activeTab) {
    var activeLink = document.querySelector('a[data-toggle="tab"][href="#' + window.activeTab + '"]');
    if (activeLink) activeLink.click();
  }
});
