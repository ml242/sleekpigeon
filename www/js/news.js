(function(){

  const createArticle = (article) => (
    `<li class="article">
       <a href="${article.url}">
         <img class="thumbnail" src="${article.image}"/>
         <div class="details">
           <p class="category">${article.category}</p>
           <p class="datetime">${new Date(article.datetime * 1000).toLocaleDateString("en-CA")}</p>
           <h3 class="headline">${article.headline}</h3>
           <p class="summary">${article.summary}</p>
           <p class="source">${article.source}</p>
         </div>
       </a>
     </li>`
  );

  const getNews = async () => {
    const response = await fetch('/api/v1/news');
    const articles = await response.json();
    let html = "";
    articles.forEach(article => {
      html += createArticle(article);
    });
    return `<ul class="article-list">${html}</ul>`;
  }

  getNews().then(html => {
    document.getElementById("news-list").innerHTML = html;
  });

})();
