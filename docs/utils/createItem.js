function createItem(url) {
  return function (title) {
    return { title: title.substring(2), path: url + title };
  };
}

module.exports = {
  createItem,
};
