const varnameox = (project) => {
  // scratch 变量名混淆
  // project为scratch的project.json对象
  const targets = project['targets'];
  for (const target of targets) {
    const variables = target['variables'];
    // variables 是对象，键是变量ID，值是 [变量名, ...]
    for (const key in variables) {
      if (variables.hasOwnProperty(key)) {
        variables[key][0] = key.replace(/[^a-zA-Z0-9_]/g, '_'); // 替换变量名中的非法字符
      }
    }
    target['variables'] = variables;
  }
  return project;
}
const delcomment = (project) => {
  // 删除注释
  // project为scratch的project.json对象
  const targets = project['targets'];
  for (const target of targets) {
    if (target['comments']) {
      delete target['comments'];
    }
    if (target['blocks']) {
      for (const blockId in target['blocks']) {
        if (target['blocks'].hasOwnProperty(blockId)) {
          const block = target['blocks'][blockId];
          if (block['comment']) {
            delete block['comment'];
          }
        }
      }
    }
  }
  return project;
}
// 删除变量监视器
const delvarwatch = (project) => {
  // 删除变量监视器
  // project为scratch的project.json对象
  delete project['monitors'];
  return project;
}