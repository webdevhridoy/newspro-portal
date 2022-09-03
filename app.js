// for category
const showAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data[0]);
        displayAllCategories(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
};

displayAllCategories = (categories) => {
    console.log(categories);
    const newsContainer = document.getElementById('news-categories');
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.classList.add('active-color')
        li.innerHTML = `

    <a onclick="loadAllNews('${category.category_id ? category.category_id : 'Not found'
            }')" class=" text-decoration-none text-dark d-inline-block  px-3  active border-0 " href="#">${category.category_name ? category.category_name : 'Not found'
            }</a>
    `;

        newsContainer.appendChild(li);
    });
};
showAllCategories();

// for news specifically
const loadAllNews = async (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data[0]);
        displayAllNews(data.data, id);
    } catch (error) {
        console.log(error);
    }
};

const displayAllNews = (allNews, cId) => {
    // console.log(allNews);

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    // error handaling
    const noNewsFound = document.getElementById('not-found');
    if (allNews.length == 0) {
        noNewsFound.classList.remove('d-none');
    } else {
        noNewsFound.classList.add('d-none');
    }
    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    allNews.forEach((news) => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="row g-3 shadow p-2 rounded">
            <div class="card col-md-3 col-lg-3 col-12 border-0">
                <img class="img-fluid pb-3" src="${news.thumbnail_url ? news.thumbnail_url : 'Not found'}" class="card-img-top" alt="...">
            </div>
            <div class="card-body col-md-9 col-lg-9 col-12 align-itmes-center">
                <div class="ps-md-5 ps-sm-3 ps-3 pt-3">
                    <h5 class="card-title fs-4 fs-md-4 fw-bolder">${news.title ? news.title : 'Not Found'}</h5>
                    <p class="card-text my-3">${news.details.slice(0, 350)}...</p>
                    <a onclick="newsModal('${news._id}')" type="button" class=" mb-3 text-decoration-none text-danger custom-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More <i class="fa-solid fa-arrow-right"></i></a>

                    <div class="row justify-content-between align-items-center mt-4 pb-3">

                        <div class="col-6 d-flex justify-content-start align-baseline align-items-center">
                        <div>
                            <img class="rounded-5" style="width:50px; height: 50px" src="${news.author.img ? news.author.img : 'Not found'}" alt="">
                        </div>
                        <div>
                            <span class="ps-2 text-primary fw-bolder  text-capitalize">${news.author.name ? news.author.name : 'Not found'
                            }</span> <br>
                            <span class="ps-2">${news.author.published_date ? news.author.published_date : 'Not found'
                            }</span>
                        </div>
                        </div>
                        <div class="col-6">
                        <div class="d-flex justify-content-around align-baseline align-items-center">
                            <li class="list-unstyled me-3">
                                <i class="fa-regular fa-eye text-primary"></i> ${news.total_view ? news.total_view : 'Not found'
                                }
                            </li>
                            <li class="list-unstyled me-3">
                            <i class="fa-solid fa-star text-warning"></i> ${news.rating.number ? news.rating.number : 'Not found'
                                }
                            </li>
                        </div>
                        </div>
                    </div>
                </div> 
            </div> 
        </div>      
        `;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);

    // Total news count section
    const newsDiv = [];
    const totalNews = (document.getElementById('news-count').innerText =
        allNews.length);
    for (let i = 0; i > 0; i++) {
        const name = newsDiv[i].totalNews;
        const span = document.createElement('span');
        span.innerHTML = `
  <p>${newsDiv}</p>
`;
        totalNews.appendChild(name);
    }

    // Showing categroy name by using category id
    const categoryName = async () => {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.data[0]);
            displayCategory(data.data.news_category);
        } catch (error) {
            console.log(error);
        }
    };
    const displayCategory = (news) => {
        const categoryName = document.getElementById('category-name');
        categoryName.innerText = news[cId - 1].category_name;
    };

    categoryName();
};

// Spinner area
const toggleSpinner = (isLoading) => {
    const loaderSpinner = document.getElementById('News-spinner');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none');
    } else {
        loaderSpinner.classList.add('d-none');
    }
};

// Modal Area
const newsModal = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data[0]);
        modalDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
};

const modalDetails = (modalNews) => {
    // console.log(modalNews);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = modalNews.title ? modalNews.title : 'Not found';
    const modalDetailsContainer = document.getElementById('news-modal');
    modalDetailsContainer.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    
    <img src="${modalNews.image_url ? modalNews.image_url : 'Not found'
        }" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Name: ${modalNews.author.name ? modalNews.author.name : 'Not found'
        }</h5>
        <p class="card-title"><b>Published Date:</b> ${modalNews.author.published_date
            ? modalNews.author.published_date
            : 'Not found'
        }</p>
        <p class="card-title"><b>Details:</b> ${modalNews.details ? modalNews.details : 'Not found'
        }</p>
        <p class="card-text"><b>Rating:</b> ${modalNews.rating.number ? modalNews.rating.number : 'Not found'
        }</p>
        <p class="card-text"><b>Views:</b> ${modalNews.total_view ? modalNews.total_view : 'Not found'
        }</p>
    </div>
    
    `;
    modalDetailsContainer.appendChild(modalDiv);
};

loadAllNews('08')
// newsModal();