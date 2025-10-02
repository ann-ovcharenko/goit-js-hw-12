import{a as u,S as d,i as l}from"./assets/vendor-BNibzuFn.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",p="52541896-5f78a6ef84d614b23e8cef476";async function y(o){const r={key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};try{return(await u.get(m,{params:r})).data}catch{throw new Error("Failed to fetch images from Pixabay.")}}const n=document.querySelector("#gallery-container"),c=document.querySelector(".loader"),g=new d(".gallery a",{captionsData:"alt",captionDelay:250});function h({webformatURL:o,largeImageURL:r,tags:i,likes:a,views:e,comments:t,downloads:s}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${i}"
        />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${a}</p>
        <p class="info-item"><b>Views</b>${e}</p>
        <p class="info-item"><b>Comments</b>${t}</p>
        <p class="info-item"><b>Downloads</b>${s}</p>
      </div>
    </li>
  `}function b(o){if(!n)return;const r=o.map(h).join("");n.insertAdjacentHTML("beforeend",r),g.refresh()}function L(){n&&(n.innerHTML="")}function S(){c&&c.classList.remove("is-hidden")}function q(){c&&c.classList.add("is-hidden")}const f=document.querySelector(".form"),w=document.querySelector(".search-input");f&&f.addEventListener("submit",P);async function P(o){o.preventDefault();const r=w.value.trim();if(!r){l.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}L(),S();try{const a=(await y(r)).hits;a.length===0?l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):b(a)}catch{l.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{q(),f.reset()}}
//# sourceMappingURL=index.js.map
