
// for category
const showAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategories(data.data.news_category);
};

displayAllCategories = categories => {
    console.log(categories);
    const newsContainer = document.getElementById('news-categories');
    categories.forEach((category) => {
        const li = document.createElement('li');
        li.classList.add = "nav-link";
        li.innerHTML = `

    <a class="nav-link active" aria-current="page" href="">${category.category_name}</a>
    `;

        newsContainer.appendChild(li);
    });
};
showAllCategories();