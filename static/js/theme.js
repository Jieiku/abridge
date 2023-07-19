// enforce local storage setting but also fallback to user-agent preferences
if (localStorage.getItem('theme') === 'switch' || (!localStorage.getItem('theme') && !window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add('switch');
}
