(function(){

  const createArticle = (article) => (
   // why not extract the properties from article and then return the html instead of a string?
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

    // see if there are articles otherwise return null 
    // prefer const over let 
    // could just mal the articles and return that array 

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
