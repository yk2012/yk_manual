const { createItem } = require("../../utils/createItem");

const booksItem = createItem("/code_life/life/books/");
const diaryItem = createItem("/code_life/life/diary/");
const summaryItem = createItem("/code_life/life/summary/");

const life = {
  title: "代码人生",
  path: "/code_life/life",
  collapsable: true,
  children: [
    {
      title: "阅读笔记",
      path: "/code_life/life/books",
      children: [booksItem("01三体")],
    },
    {
      title: "日记",
      path: "/code_life/life/diary",
      children: [diaryItem("01杂谈")],
    },
    {
      title: "总结",
      path: "/code_life/life/summary",
      children: [summaryItem("012021年总结")],
    },
  ],
};

module.exports = {
  life,
};
