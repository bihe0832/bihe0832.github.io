// 生成 atom.xml（RSS 2.0，最近 5 篇文章）
function escapeXml(str) {
  if (!str) return '';
  return String(str).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
  });
}

hexo.extend.generator.register('atom', function (locals) {
  const posts = locals.posts.sort('-date').limit(5).toArray();
  const url = this.config.url;
  const items = posts.map(function (post) {
    return '    <item>\n' +
      '      <title>' + escapeXml(post.title) + '</title>\n' +
      '      <link>' + url + '/' + post.path + '</link>\n' +
      '      <guid isPermaLink="true">' + url + '/' + post.path + '</guid>\n' +
      '      <pubDate>' + post.date.toDate().toUTCString() + '</pubDate>\n' +
      '      <description>' + escapeXml(post.excerpt || '') + '</description>\n' +
      '    </item>';
  }).join('\n');
  const xml = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<rss version="2.0">\n  <channel>\n' +
    '    <title>' + escapeXml(this.config.title) + '</title>\n' +
    '    <link>' + url + '</link>\n' +
    '    <description>' + escapeXml(this.config.description) + '</description>\n' +
    items + '\n  </channel>\n</rss>';
  return [{ path: 'atom.xml', data: xml }];
});
