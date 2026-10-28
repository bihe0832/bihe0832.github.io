(function () {
  var time1 = 0;
  var show = false;
  var names = [];
  var urls = [];
  var matches = [];
  var activeIndex = -1;

  var tool = document.querySelector('.cb-search-tool');
  var input = document.getElementById('cb-search-content');
  var dropdown = null;

  function openSearch() {
    if (!tool) return;
    tool.style.display = 'block';
    show = true;
    if (input) { input.value = ''; input.focus(); }
    time1 = 0;
  }
  function closeSearch() {
    if (tool) tool.style.display = 'none';
    show = false;
    time1 = 0;
  }
  function go(url) {
    closeSearch();
    window.location.href = url;
  }

  function render() {
    if (!dropdown || !input) return;
    var q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    if (!q) { matches = []; activeIndex = -1; return; }

    matches = [];
    for (var i = 0; i < names.length && matches.length < 10; i++) {
      if (names[i].toLowerCase().indexOf(q) >= 0) {
        matches.push({ name: names[i], url: urls[i] });
      }
    }
    if (matches.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'cb-search-empty';
      empty.textContent = '无匹配结果';
      dropdown.appendChild(empty);
      return;
    }
    matches.forEach(function (m, idx) {
      var div = document.createElement('div');
      div.className = 'cb-search-item' + (idx === activeIndex ? ' active' : '');
      var esc = m.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      var j = esc.toLowerCase().indexOf(q);
      div.innerHTML = j >= 0
        ? esc.slice(0, j) + '<mark>' + esc.slice(j, j + q.length) + '</mark>' + esc.slice(j + q.length)
        : esc;
      div.addEventListener('click', function () { go(m.url); });
      dropdown.appendChild(div);
    });
  }

  function moveActive(delta) {
    if (matches.length === 0) return;
    activeIndex = (activeIndex + delta + matches.length) % matches.length;
    render();
  }

  // 双击 Ctrl 开合、ESC 关闭
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 17) {
      var gap = Date.now() - time1;
      time1 = Date.now();
      if (gap < 500) {
        if (show) closeSearch(); else openSearch();
        time1 = 0;
      }
    } else if (e.keyCode === 27) {
      closeSearch();
    }
  });

  var closeBtn = document.getElementById('cb-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  var googleBtn = document.getElementById('cb-search-google');
  if (googleBtn && input) googleBtn.addEventListener('click', function () {
    window.open('https://www.google.com/search?sitesearch=bihe0832.com&q=' + encodeURIComponent(input.value), '_blank');
  });

  var searchBtn = document.getElementById('cb-search-btn');
  if (searchBtn) searchBtn.addEventListener('click', openSearch);

  // 键盘导航：上下键切换、回车打开
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.keyCode === 40) { // 下
        e.preventDefault();
        moveActive(1);
      } else if (e.keyCode === 38) { // 上
        e.preventDefault();
        moveActive(-1);
      } else if (e.keyCode === 13) { // 回车
        if (activeIndex >= 0 && matches[activeIndex]) {
          e.preventDefault();
          go(matches[activeIndex].url);
        }
      }
    });
  }

  // 加载数据 + 输入过滤（原生替代 typeahead）
  fetch('/search/cb-search.json').then(function (res) { return res.json(); }).then(function (data) {
    if (data.code !== 0 || !input) return;
    data.data.forEach(function (item) {
      names.push('「 ' + item.title + ' 」  — ' + item.keywords + ' — ' + item.description + ' — ' + item.tags);
      urls.push(item.url);
    });

    dropdown = document.createElement('div');
    dropdown.className = 'cb-search-dropdown';
    input.parentElement.appendChild(dropdown);

    input.addEventListener('input', function () {
      activeIndex = -1;
      render();
    });
  });
})();
