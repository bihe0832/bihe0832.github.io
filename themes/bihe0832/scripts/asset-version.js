// 静态资源版本号 helper：按文件内容生成短哈希，内容变则版本变，用于缓存失效（cache-busting）
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

hexo.extend.helper.register('asset_version', function (relative) {
  const file = path.join(hexo.theme_dir, 'source', relative);
  try {
    const data = fs.readFileSync(file);
    return crypto.createHash('md5').update(data).digest('hex').slice(0, 8);
  } catch (e) {
    return '0';
  }
});
