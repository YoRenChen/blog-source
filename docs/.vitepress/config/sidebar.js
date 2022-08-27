const getChildren = require("./createDocsSideBar");
export default [
  {
    text: "笔记",
    items: getChildren("/md/", "/docs"),
  },
];
