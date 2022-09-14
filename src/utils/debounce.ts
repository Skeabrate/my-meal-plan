export function debounce(func: Function, delay: number) {
  var timer: any;

  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, delay, event);
  };
}
