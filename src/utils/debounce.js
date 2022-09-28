export function debounce(func, delay = 300) {
  var timer;

  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, delay, event);
  };
}
