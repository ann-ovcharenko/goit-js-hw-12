import{a as E,S as q,i as c}from"./assets/vendor-BNibzuFn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",M="52541896-5f78a6ef84d614b23e8cef476",p=15;async function b(r,t){const i={key:M,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:p};try{return(await E.get(v,{params:i})).data}catch{throw new Error("Failed to fetch images from Pixabay.")}}const l=document.querySelector("#gallery-container"),d=document.querySelector(".loader"),f=document.querySelector(".load-more-btn"),B=new q(".gallery a",{captionsData:"alt",captionDelay:250});function I({webformatURL:r,largeImageURL:t,tags:i,likes:n,views:e,comments:o,downloads:s}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${t}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${i}"
        />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${n}</p>
        <p class="info-item"><b>Views</b>${e}</p>
        <p class="info-item"><b>Comments</b>${o}</p>
        <p class="info-item"><b>Downloads</b>${s}</p>
      </div>
    </li>
  `}function L(r){if(!l)return;const t=r.map(I).join("");l.insertAdjacentHTML("beforeend",t),B.refresh()}function $(){l&&(l.innerHTML="")}function w(){d&&d.classList.remove("is-hidden")}function P(){d&&d.classList.add("is-hidden")}function S(){f&&f.classList.remove("is-hidden")}function g(){f&&f.classList.add("is-hidden")}let a=1,u="",m=0;const h=document.querySelector(".form"),O=document.querySelector(".search-input"),y=document.querySelector(".load-more-btn");h&&h.addEventListener("submit",R);y&&y.addEventListener("click",C);async function R(r){r.preventDefault();const t=O.value.trim();if(!t){c.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}a=1,u=t,$(),g(),w();try{const i=await b(u,a),n=i.hits,e=i.totalHits;m=Math.ceil(e/p),n.length===0?c.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):L(n),n.length>0&&m>a&&S(),h.reset()}catch{c.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{P()}}async function C(){a+=1,g(),w();try{const t=(await b(u,a)).hits;L(t),x(t.length),a>=m?A():S()}catch{c.error({title:"Error",message:"Failed to load more images. Please try again later.",position:"topRight"})}finally{P()}}function x(r){if(r>0){const t=document.querySelector(".gallery-item");if(t){const i=t.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}}}function A(){c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"}),g()}
//# sourceMappingURL=index.js.map
