/* 
  requestAnimationFrame
    是浏览器用于定时循环操作的一个接口,
    requestAnimationFrame类似于setTimeout
    cancelAnimationFrame类似于clearTimeout
*/

export const rAF = requestAnimationFrame || function (callback) {
  setTimeout(callback, 1000 / 60);
}

export const cancelRAF = cancelAnimationFrame || function (id: number) {
  clearTimeout(id)
}