// Set lightmode
if (document.getElementById('mode')) {
  document.getElementById('mode').addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });
}
