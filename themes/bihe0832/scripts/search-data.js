// 生成 cb-search.json（兼容原 cb-search.js 搜索逻辑）
hexo.extend.generator.register('cb-search', function (locals) {
  const posts = locals.posts.sort('-date').toArray();
  const data = posts.map(function (post) {
    return {
      title: post.title,
      url: '/' + post.path,
      category: post.categories.length ? post.categories.data[0].name : '',
      tags: post.tags.map(function (t) { return t.name; }).join(' '),
      keywords: post.keywords || '',
      description: post.description || ''
    };
  });
  return [{
    path: 'search/cb-search.json',
    data: JSON.stringify({ code: 0, data: data })
  }];
});
