import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
 
export function createGallery(value) {
      const markup = value.map((v) => 
        `<li class="js-gallery-item">
    <a class="js-image-link" href="${v.largeImageURL}">
    <img class="js-image" src="${v.webformatURL}" alt="${v.tags}" loading="lazy" />
    </a>
    <ul class="js-descr">
    <li class="js-info">
    <p class="js-title" >Likes</p>
    <p class="js-value" >${v.likes}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Views</p>
    <p class="js-value" >${v.views}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Comments</p>
    <p class="js-value" >${v.comments}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Downloads</p>
    <p class="js-value" >${v.downloads}</p>
    </li>
    </ul>
    </li>`).join('');
    const gallery = document.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    return;
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";
};

export function showLoader() { 
    const loader = document.querySelector('.loader');
    loader.classList.remove('hidden');
};

export function hideLoader() {
const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
};

export function showLoadMoreButton() { 
    const btnLoader = document.querySelector('.js-btn-loadmore');
    btnLoader.classList.remove('hidden');
};
export function hideLoadMoreButton() { 
    const btnLoader = document.querySelector('.js-btn-loadmore');
    btnLoader.classList.add('hidden');
};