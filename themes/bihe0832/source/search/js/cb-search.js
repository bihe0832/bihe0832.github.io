(function () {
  var time1 = 0;
  var show = false;
  var names = [];
  var urls = [];

  var tool = document.querySelector('.cb-search-tool');
  var input = document.getElementById('cb-search-content');

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

  // 加载数据 + 输入过滤（原生替代 typeahead）
  fetch('/search/cb-search.json').then(function (res) { return res.json(); }).then(function (data) {
    if (data.code !== 0 || !input) return;
    data.data.forEach(function (item) {
      names.push('「 ' + item.title + ' 」  — ' + item.keywords + ' — ' + item.description + ' — ' + item.tags);
      urls.push(item.url);
    });

    var dropdown = document.createElement('div');
    dropdown.className = 'cb-search-dropdown';
    input.parentElement.appendChild(dropdown);

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      dropdown.innerHTML = '';
      if (!q) return;
      var matches = [];
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
      matches.forEach(function (m) {
        var div = document.createElement('div');
        div.className = 'cb-search-item';
        var esc = m.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var idx = esc.toLowerCase().indexOf(q);
        div.innerHTML = idx >= 0
          ? esc.slice(0, idx) + '<mark>' + esc.slice(idx, idx + q.length) + '</mark>' + esc.slice(idx + q.length)
          : esc;
        div.addEventListener('click', function () {
          closeSearch();
          window.location.href = m.url;
        });
        dropdown.appendChild(div);
      });
    });
  });
})();
