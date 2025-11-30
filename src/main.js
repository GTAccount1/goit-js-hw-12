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
let totalPages = 0;
let currentPage = 1;
let query = '';

refs.searchForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    query = formData.get('search-text');

    if (query.trim() === "") {
            iziToast.error({
            title: 'Error',
            message: "Input field cann't be empty!"
            });
        clearGallery();
        hideLoader();
        hideLoadMoreButton();
        return;
    };
   
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    try {
        const data = await getImagesByQuery(query, currentPage);
    
        if (!data || data.totalHits === 0 || !data.hits || data.hits.length === 0) {
            iziToast.info({
                title: 'Info',
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            hideLoader();
            hideLoadMoreButton();
            return;
        }
        totalPages = Math.ceil(data.totalHits / defaultPerPage);
        createGallery(data.hits);
        hideLoader();

        if (currentPage >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results."
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `API error: ${error}`
        });
        hideLoader();
        hideLoadMoreButton();
        clearGallery();
    };

})

async function loadMore() {
  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    return 0;
    }
    
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (!data || !data.hits || data.hits.length === 0) {
      hideLoader();
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
      return 0;
    }  
    
    createGallery(data.hits);
    hideLoader();

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    } else {
      showLoadMoreButton();
      }
      
    return data.hits.length;
  } catch (error) {
    hideLoader();
    hideLoadMoreButton();
    iziToast.error({
      title: 'Error',
      message: `API error: ${error}`
    });
    return 0;
  }
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

refs.btnLoadmore.addEventListener("click", async (e) => {
  e.preventDefault();

  const newItemsCount = await loadMore();

  if (newItemsCount > 0) {
    scrollAfterLoadMore();
  }
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