const { createItem } = require("../../utils/createItem");

const basicsItem = createItem("/fe_code/algorithm/basics/");
const leetCodeItem = createItem("/fe_code/algorithm/LeetCode/");

const algorithm = {
  title: "算法与数据结构",
  path: "/fe_code/algorithm",
  collapsable: false,
  children: [
    {
      title: "算法与数据结构",
      path: "/fe_code/algorithm/basics",
      children: [
        basicsItem("01数据结构"),
        basicsItem("02排序算法"),
        basicsItem("03快速幂"),
      ],
    },
    {
      title: "LeetCode",
      path: "/fe_code/algorithm/LeetCode",
      children: [
        leetCodeItem("01斐波那契"),
        leetCodeItem("02数组"),
        leetCodeItem("03链表"),
        leetCodeItem("04树图"),
      ],
    },
  ],
};

module.exports = {
  algorithm,
};
