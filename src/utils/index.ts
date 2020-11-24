import router from "@/router";
import store from "@/store";
import Vue from "vue";
import { Message } from "element-ui";

/**
 * 获取uuid
 */
export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key: string) {
  return (
    JSON.parse(sessionStorage.getItem("permissions") || "[]").indexOf(key) !==
      -1 || false
  );
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(
  data: StringMap,
  id = "id",
  pid = "parentId"
) {
  const res = [];
  const temp: StringMap = {};
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]["children"]) {
        temp[data[k][pid]]["children"] = [];
      }
      if (!temp[data[k][pid]]["_level"]) {
        temp[data[k][pid]]["_level"] = 1;
      }
      data[k]["_level"] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]["children"].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Vue.cookies.remove("token");
  store.commit("resetStore");
  router.isAddDynamicMenuRoutes = false;
}

/**
 * 下载附件
 */
export function judgeAndDownload(source: any) {
  if (
    source.data.type === "application/octet-stream" ||
    source.data.type === "application/octet-stream;charset=UTF-8"
  ) {
    let data = new Blob([source.data]);
    let str = source.headers["content-disposition"];
    let fileName = decodeURIComponent(str.slice(str.indexOf("=") + 1));
    // console.log('fileName', fileName)
    fileDownloadFunc(data, fileName);
  } else {
    // 报错的
    var reader = new FileReader();
    reader.readAsText(source.data, "utf-8");
    reader.onload = function(e) {
      if (reader.result) {
        let result = JSON.parse(<string>reader.result);
        Message.error(result.msg);
      }
    };
  }
}

function fileDownloadFunc(blobObject: object, fileName: string) {
  // 判断浏览器
  // console.log(window.navigator.userAgent);
  let reg = /Trident/;
  if (reg.test(window.navigator.userAgent)) {
    window.navigator.msSaveBlob(blobObject, fileName);
  } else {
    // 手动a标签下载
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = window.URL.createObjectURL(blobObject);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href); // 释放URL 对象
    document.body.removeChild(link);
  }
}
