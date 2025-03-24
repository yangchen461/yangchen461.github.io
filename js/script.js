document.addEventListener('DOMContentLoaded', () => {
  const pageBody = document.body;
  const localTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = localTheme ? localTheme === 'dark' : prefersDark;

  // 切换按钮（桌面和移动）
  const switchToggle = document.getElementById("switch_default");
  const mobileToggle = document.getElementById("mobile-toggle-theme");

  // 设置主题函数
  const setTheme = (mode) => {
    if (mode === 'dark') {
      pageBody.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (switchToggle) switchToggle.checked = true;
      if (mobileToggle) mobileToggle.innerText = "· Dark";
    } else {
      pageBody.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (switchToggle) switchToggle.checked = false;
      if (mobileToggle) mobileToggle.innerText = "· Light";
    }
  };

  // 初始化加载
  setTheme(isDark ? 'dark' : 'light');

  // 绑定按钮点击事件
  if (switchToggle) {
    switchToggle.addEventListener('change', () => {
      const nowDark = pageBody.classList.contains('dark-mode');
      setTheme(nowDark ? 'light' : 'dark');
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const nowDark = pageBody.classList.contains('dark-mode');
      setTheme(nowDark ? 'light' : 'dark');
    });
  }
});
