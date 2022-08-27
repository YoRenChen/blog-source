//侧边栏
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const grayMatter = require("gray-matter");
function getChildren(lpath, rootPath, sort = true) {
  let root = [];
  const map = new Map();
  readDirSync("." + rootPath + lpath, root);
  root.map((item) => {
    const content = fs.readFileSync(path.join(process.cwd(), item), "utf8");
    const res = grayMatter(content);
    const date = res.data.date || new Date();
    map.set(new Date(date), item.split(rootPath)[1]);
  });

  //排序
  if (sort) {
    return [...map]
      .filter((el) => !el[1].includes("index"))
      .sort((a, b) => b[0] - a[0])
      .map((el) => {
        let rep = el[1].split("/");
        text = rep[rep.length - 1].split(".md")[0];
        return {
          text,
          link: el[1],
          date: moment(el[0]).format("YYYY-MM-DD"),
        };
      });
  }
  return root;
}
function readDirSync(path, root) {
  var pa = fs.readdirSync(path);
  pa.forEach(function (ele, index) {
    var info = fs.statSync(path + "/" + ele);
    if (info.isDirectory()) {
      readDirSync(path + ele, root);
    } else {
      if (checkFileType(ele)) {
        root.push(prefixPath(path, ele));
      }
    }
  });
}
function checkFileType(path) {
  return path.includes(".md");
}
function prefixPath(basePath, dirPath) {
  let index = basePath.indexOf("/");
  // 去除一级目录地址
  basePath = basePath.slice(index, path.length);
  // replace用于处理windows电脑的路径用\表示的问题
  return path.join(basePath, dirPath).replace(/\\/g, "/");
}
// export default getChildren;
module.exports = getChildren;
