// switch theme mode
if (document.getElementById('mode')) {
    document.getElementById('mode').addEventListener('click', () => {
    document.documentElement.classList.toggle('switch');
    localStorage.setItem('theme', document.documentElement.classList.contains('switch') ? 'switch' : 'default');
  });
}
