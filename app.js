// for category
const showAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategories(data.data.news_category);
};

displayAllCategories = (categories) => {
    console.log(categories);
    const newsContainer = document.getElementById('news-categories');
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.classList.add = 'nav-link';
        li.innerHTML = `

    <a onclick="loadAllNews('${category.category_id}')" class="nav-link active border-0 " aria-current="page" href="#">${category.category_name}</a>
    `;

        newsContainer.appendChild(li);
    });
};
showAllCategories();

// for news specifically
const loadAllNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // displayAllNews(data.data);
    displayAllNews(data.data);
};
const displayAllNews = (allNews) => {
    console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    allNews.forEach((news) => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
            <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
            <div class="d-flex justify-content-center align-items-center ">
                <div class="d-flex justify-content-center align-items-center p-5">
                    <img style="width:50px; height: 50px" src="${news.author.img
            }" alt="">
                    <span class="ps-2">${news.author.name ? news.author.name : 'Not found'
            }</span>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                <div>
                    <li class="list-unstyled me-3">
                    <i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'Not found'
            }
                    </li>
                </div>
            </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">Title: ${news.title ? news.title : 'Not Found'
            }</h5>
          <p class="card-text">${news.details.slice(0, 150)}...</p>
          <button onclick="newsModal('${news._id
            }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
          
        </div>
      </div>        
        `;
        newsContainer.appendChild(newsDiv);
    });
};

loadAllNews();

const newsModal = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    const res = await fetch(url);
    const data = await res.json();
    modalDetails(data.data[0]);
};
const modalDetails = (news) => {
    console.log(news);
    // const modalTitle = document.getElementById('exampleModalLabel');
    const modalDetailsContainer = document.getElementById('news-modal');
    modalDetailsContainer.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    
        <div>
            <h2>title: ${news.title}</h2>
        </div>
    
    `;
    modalDetailsContainer.appendChild(modalDiv);
};

newsModal();
