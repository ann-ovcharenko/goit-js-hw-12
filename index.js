import{a as v,S as M,i as c}from"./assets/vendor-BNibzuFn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const B="https://pixabay.com/api/",I="52541896-5f78a6ef84d614b23e8cef476",p=15;async function b(r,t){const n={key:I,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:p};try{return(await v.get(B,{params:n})).data}catch{throw new Error("Failed to fetch images from Pixabay.")}}const l=document.querySelector("#gallery-container"),d=document.querySelector(".loader"),f=document.querySelector(".load-more-btn"),$=new M(".gallery a",{captionsData:"alt",captionDelay:250});function O({webformatURL:r,largeImageURL:t,tags:n,likes:i,views:e,comments:o,downloads:a}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${n}"
        />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${i}</p>
        <p class="info-item"><b>Views</b>${e}</p>
        <p class="info-item"><b>Comments</b>${o}</p>
        <p class="info-item"><b>Downloads</b>${a}</p>
      </div>
    </li>
  `}function L(r){if(!l)return;const t=r.map(O).join("");l.insertAdjacentHTML("beforeend",t),$.refresh()}function R(){l&&(l.innerHTML="")}function w(){d&&d.classList.remove("is-hidden")}function P(){d&&d.classList.add("is-hidden")}function S(){f&&f.classList.remove("is-hidden")}function g(){f&&f.classList.add("is-hidden")}let s=1,u="",m=0;const h=document.querySelector(".form"),C=document.querySelector(".search-input"),y=document.querySelector(".load-more-btn");h&&h.addEventListener("submit",x);y&&y.addEventListener("click",A);async function x(r){r.preventDefault();const t=C.value.trim();if(!t){c.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}s=1,u=t,R(),g(),w();try{const n=await b(u,s),i=n.hits,e=n.totalHits;m=Math.ceil(e/p),i.length===0?c.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(L(i),E(i.length)),i.length>0&&m>s?S():i.length>0&&q(),h.reset()}catch{c.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{P()}}async function A(){s+=1,g(),w();try{const t=(await b(u,s)).hits;L(t),E(t.length),s>=m?q():S()}catch{c.error({title:"Error",message:"Failed to load more images. Please try again later.",position:"topRight"})}finally{P()}}function E(r){if(r>0){const t=document.querySelector(".gallery-item");if(t){const n=t.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}}function q(){c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}),g()}
//# sourceMappingURL=index.js.map
