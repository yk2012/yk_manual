const { createItem } = require("../../utils/createItem");

const funItem = createItem("/fe_code/functional_programming/");

const functional_programming = {
  title: "函数式编程",
  path: "/fe_code/functional_programming",
  collapsable: true,
  children: [
    funItem("01函数式编程概述"),
    funItem("02纯函数"),
    funItem("03柯里化"),
    funItem("04函数组合"),
    funItem("05函子"),
  ],
};

module.exports = {
  functional_programming,
};
