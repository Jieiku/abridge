// enforce local storage setting but also fallback to user-agent preferences
if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add('light');
}
