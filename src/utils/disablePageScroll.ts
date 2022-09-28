export const disablePageScroll = (isDisabled: boolean) => {
  if (isDisabled) {
    document.body.setAttribute('style', 'position: fixed; top: 0; width: 100%; overflow: hidden');
  } else {
    document.body.removeAttribute('style');
  }
};
