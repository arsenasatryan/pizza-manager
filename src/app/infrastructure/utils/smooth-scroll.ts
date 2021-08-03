export const smoothScrollToTop = (): void => {
  const html = document.getElementsByTagName('html')[0];
  html.classList.add('smooth-scroll');
  setTimeout(() => {
    window.scrollTo(0, 0);
  });
  setTimeout(() => {
    html.classList.remove('smooth-scroll');
  }, 1500);
};
