import{a as b,S as j,i}from"./assets/vendor-CNqCr-V-.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();async function h(e,s){const o=b.create({baseURL:"https://pixabay.com/api/",params:{key:"34647227-856c4916cf69f9df89be744ef",q:e,page:s,per_page:"15",image_type:"photo",orientation:"horizontal",safesearch:"true"}});try{return(await o.get()).data}catch(r){throw console.log("API error",r),r}}let w=new j(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(e){const s=e.map(r=>`<li class="js-gallery-item">
    <a class="js-image-link" href="${r.largeImageURL}">
    <img class="js-image" src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
    </a>
    <ul class="js-descr">
    <li class="js-info">
    <p class="js-title" >Likes</p>
    <p class="js-value" >${r.likes}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Views</p>
    <p class="js-value" >${r.views}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Comments</p>
    <p class="js-value" >${r.comments}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Downloads</p>
    <p class="js-value" >${r.downloads}</p>
    </li>
    </ul>
    </li>`).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",s),w.refresh()}function m(){const e=document.querySelector(".gallery");e.innerHTML=""}function p(){document.querySelector(".loader").classList.remove("hidden")}function l(){document.querySelector(".loader").classList.add("hidden")}function g(){document.querySelector(".js-btn-loadmore").classList.remove("hidden")}function n(){document.querySelector(".js-btn-loadmore").classList.add("hidden")}const L={searchForm:document.querySelector(".form"),searchInput:document.querySelector(".form input"),btnLoadmore:document.querySelector(".js-btn-loadmore")},q=15;let d=0,c=1,u="";L.searchForm.addEventListener("submit",async e=>{if(e.preventDefault(),u=new FormData(e.target).get("search-text"),u.trim()===""){i.error({title:"Error",message:"Input field cann't be empty!"}),m(),l(),n();return}c=1,m(),n(),p();try{const o=await h(u,c);if(!o||o.totalHits===0||!o.hits||o.hits.length===0){i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),l(),n();return}d=Math.ceil(o.totalHits/q),y(o.hits),l(),c>=d?(n(),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):g()}catch(o){i.error({title:"Error",message:`API error: ${o}`}),l(),n(),m()}});async function I(){if(c>=d)return n(),0;c+=1,p(),n();try{const e=await h(u,c);return!e||!e.hits||e.hits.length===0?(l(),n(),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),0):(y(e.hits),l(),c>=d?(n(),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):g(),e.hits.length)}catch(e){return l(),n(),i.error({title:"Error",message:`API error: ${e}`}),0}}function S(){const e=document.querySelector(".js-gallery-item");if(!e)return;const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}L.btnLoadmore.addEventListener("click",async e=>{e.preventDefault(),await I()>0&&S()});
//# sourceMappingURL=index.js.map
