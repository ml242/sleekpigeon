(function(){

  const createArticle = (article) => {
    
    const { url, image, category, datetime, url, image, headline, summary, source, } = article; // extract properties 
    const dateTime = new Date(datetime * 1000).toLocaleDateString("en-CA") // move logic outside of the rendering
    
    return `<li class="article">
       <a href="${url}">
         <img class="thumbnail" src="${image}"/>
         <div class="details">
           <p class="category">${category}</p>
           <p class="datetime">${dateTime}</p>
           <h3 class="headline">${headline}</h3>
           <p class="summary">${summary}</p>
           <p class="source">${source}</p>
         </div>
       </a>
     </li>`
  };

  const getNews = async () => {
    const response = await fetch('/api/v1/news');
    const articles = await response.json();

    let html = "";
    articles.forEach(article => {
      html += createArticle(article);
    });

    // const articleList = articles.map((article) => createArticle(article)); // get rid of 26-29 and avoid mutation
    // return `<ul class="article-list">${articleList}</ul>`;
    return `<ul class="article-list">${html}</ul>`;
  }

  getNews().then(html => {
    document.getElementById("news-list").innerHTML = html;
  });

})();
