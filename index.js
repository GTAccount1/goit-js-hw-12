import{a as j,S as w,i as l}from"./assets/vendor-CNqCr-V-.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&t(f)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();async function g(e,s){const a=j.create({baseURL:"https://pixabay.com/api/",params:{key:"34647227-856c4916cf69f9df89be744ef",q:e,page:s,per_page:"15",image_type:"photo",orientation:"horizontal",safesearch:"true"}});try{return(await a.get()).data}catch(t){throw console.log("API error",t),t}}let q=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function y(e){const s=e.map(t=>`<li class="js-gallery-item">
    <a class="js-image-link" href="${t.largeImageURL}">
    <img class="js-image" src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
    </a>
    <ul class="js-descr">
    <li class="js-info">
    <p class="js-title" >Likes</p>
    <p class="js-value" >${t.likes}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Views</p>
    <p class="js-value" >${t.views}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Comments</p>
    <p class="js-value" >${t.comments}</p>
    </li>
    <li class="js-info">
    <p class="js-title" >Downloads</p>
    <p class="js-value" >${t.downloads}</p>
    </li>
    </ul>
    </li>`).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",s),q.refresh()}function d(){const e=document.querySelector(".gallery");e.innerHTML=""}function h(){document.querySelector(".loader").classList.remove("hidden")}function i(){document.querySelector(".loader").classList.add("hidden")}function L(){document.querySelector(".js-btn-loadmore").classList.remove("hidden")}function c(){document.querySelector(".js-btn-loadmore").classList.add("hidden")}const b={searchForm:document.querySelector(".form"),searchInput:document.querySelector(".form input"),btnLoadmore:document.querySelector(".js-btn-loadmore")},p=15;let m,n,u;b.searchForm.addEventListener("submit",async e=>{if(e.preventDefault(),u=new FormData(e.target).get("search-text"),u.trim()===""){l.error({title:"Error",message:"Input field cann't be empty!"}),i(),e.target.reset(),d(),c();return}h(),d(),n=1;const a=await g(u,n);try{if(m=Math.ceil(a.totalHits/p),console.log(m),a.totalHits===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),e.target.reset(),i(),d(),c();return}y(a.hits),i(),a.totalHits<=p?(e.target.reset(),c(),l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):L()}catch(t){l.error({title:"Error",message:`API error: ${t}`}),d(),e.target.reset(),i(),c()}});async function S(){n+=1,console.log(n),h();const e=await g(u,n);y(e.hits),i(),n<m?L():(c(),l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}function v(){const e=document.querySelector(".js-gallery-item");if(!e)return;const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}b.btnLoadmore.addEventListener("click",async e=>{e.preventDefault(),await S(),v()});
//# sourceMappingURL=index.js.map
