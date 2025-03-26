(function () {
  const input = document.getElementById('search-input');
  const resultList = document.getElementById('search-result');
  let data = [];

  fetch('/search.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(xml => {
      const entries = xml.getElementsByTagName('entry');
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        data.push({
          title: entry.getElementsByTagName('title')[0].textContent,
          content: entry.getElementsByTagName('content')[0].textContent,
          url: entry.getElementsByTagName('url')[0].textContent
        });
      }
    });

  input.addEventListener('input', function () {
    const keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
    resultList.innerHTML = '';

    if (this.value.trim().length === 0) return;

    const fragment = document.createDocumentFragment();

    data.forEach(function (article) {
      let isMatch = true;
      const title = article.title.toLowerCase();
      const content = article.content.toLowerCase();
      let indexTitle = -1;
      let indexContent = -1;

      for (let i = 0; i < keywords.length; i++) {
        indexTitle = title.indexOf(keywords[i]);
        indexContent = content.indexOf(keywords[i]);
        if (indexTitle < 0 && indexContent < 0) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        const item = document.createElement('li');
        item.innerHTML = `<a href="${article.url}">${article.title}</a>`;
        fragment.appendChild(item);
      }
    });

    resultList.appendChild(fragment);
  });
})();
