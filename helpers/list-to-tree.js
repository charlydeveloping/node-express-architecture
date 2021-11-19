const listToTree = (list) => {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent_id !== null) {
      list[map[node.parent_id]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  const tree = roots.map((node) => {
    if (node.children.length == 0) {
      delete node.children;
    }
    return node;
  });

  return tree;
};

module.exports = listToTree;
