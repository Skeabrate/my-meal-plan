export function debounce(func: () => void, delay: number = 300) {
  var timer: ReturnType<typeof setTimeout>;

  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
}
