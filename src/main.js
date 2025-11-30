import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';
import { clearGallery } from './js/render-functions.js';
import { showLoader } from './js/render-functions.js';
import { hideLoader } from './js/render-functions.js';
import { showLoadMoreButton } from './js/render-functions.js';
import { hideLoadMoreButton } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    searchForm: document.querySelector('.form'),
    searchInput: document.querySelector('.form input'),
    btnLoadmore: document.querySelector('.js-btn-loadmore'),
}

const defaultPerPage = 15;
let totalPages;
let currentPage;
let query;

refs.searchForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    query = formData.get('search-text');

    if (query.trim() === "") {
            iziToast.error({
            title: 'Error',
            message: "Input field cann't be empty!"
            });
        hideLoader();
        e.target.reset(); 
        clearGallery();
        hideLoadMoreButton();
        return;
    };
   
    showLoader();
    clearGallery();

    currentPage = 1;
    const data = await getImagesByQuery(query, currentPage);
    try {
        totalPages = Math.ceil(data.totalHits / defaultPerPage);
        console.log(totalPages);
     
        if (data.totalHits === 0) {
            iziToast.info({
                title: 'Info',
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            e.target.reset();
            hideLoader();
            clearGallery();
            hideLoadMoreButton();
            return ;
            }
        createGallery(data.hits);
        hideLoader();
       
        if (data.totalHits <= defaultPerPage) {
            e.target.reset(); 
            hideLoadMoreButton();
            iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results."
        });
        }
        else  showLoadMoreButton();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `API error: ${error}`
        });
        clearGallery();
        e.target.reset();
        hideLoader();
        hideLoadMoreButton();
    };

})

async function loadMore() {
    currentPage += 1;
    console.log(currentPage);
    showLoader();
    const data = await getImagesByQuery(query, currentPage);
    createGallery(data.hits);
    hideLoader();
    if (currentPage < totalPages) {
        showLoadMoreButton();
    }
    else {
        hideLoadMoreButton();
        iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results."
        });
    };
}

function scrollAfterLoadMore() {
  const firstCard = document.querySelector(".js-gallery-item");
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

refs.btnLoadmore.addEventListener("click", async e => {
    e.preventDefault();
    await loadMore();
    scrollAfterLoadMore()
});


// Завантаження при прокрутці до кнопки
// const options = {
//   root: document.querySelector("#scrollArea"),
//   rootMargin: "0px",
//   scrollMargin: "0px",
//   threshold: 1.0,
// };

// const observer = new IntersectionObserver(async (arr) => { 
//     const myTargetItem = arr[0];
//     const { isIntersecting } = myTargetItem;
//     if (isIntersecting) {
//         await loadMore();
//     }
// }, {});

// observer.observe(refs.btnLoadmore);