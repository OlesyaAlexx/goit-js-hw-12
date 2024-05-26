import{S as d,i as y}from"./assets/vendor-0fc460d7.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();class m{constructor(){this.searchQuery=""}async fetchPhoto(){console.log(this);const o=`https://pixabay.com/api/?${new URLSearchParams({key:"43954842-86e0551d49d52b31999082e7b",image_type:"photo",orientation:"horizontal",safesearch:"true",q:this.searchQuery}).toString()}`;try{const s=await fetch(o);if(!s.ok)throw new Error("Network response was not ok");return await s.json()}catch(s){throw new Error("Error fetching data from Pixabay API:",s)}}get query(){return this.searchQuery}set query(r){this.searchQuery=r}reset(){this.searchQuery=""}}let p=new d(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function g(i,r){if(!r){console.error("Gallery container is undefined");return}const o=i.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:u,comments:f,downloads:h})=>`<div class="photo-card">
    <a href="${e}">
      <img class="photo-img" src="${s}" alt="${t}" />
    </a>
    <ul class="info-list">
      <li class="info-item">
        <b>Likes</b>
        ${a}
      </li>
      <li class="info-item">
        <b>Views</b>
        ${u}
      </li>
      <li class="info-item">
        <b>Comments</b>
        ${f}
      </li>
      <li class="info-item">
        <b>Downloads</b>
        ${h}
      </li>
    </ul>
    </div>`).join("");r.insertAdjacentHTML("beforeend",o),p.refresh(),console.log(r)}const n={searchform:document.querySelector(".search-form"),galleryConteiner:document.querySelector(".gallery"),loader:document.querySelector(".loader")},c=new m;n.searchform.addEventListener("submit",b);function b(i){i.preventDefault();const r=i.currentTarget.elements.query.value.trim();if(!r)return l("red","Please, fill the main field");w(),n.galleryConteiner.innerHTML="",c.query=r,c.fetchPhoto().then(o=>{o.hits.length===0?l("red","Sorry, there are no images matching your search query. Please try again!"):g(o.hits,n.galleryConteiner)}).catch(o=>{console.error("Error:",o),l("red","An error occurred while fetching images. Please try again later.")}).finally(()=>{L(),n.searchform.reset()}),c.reset()}function l(i,r){y.show({color:i,message:r,position:"topRight"})}function w(){n.loader.style.display="block"}function L(){n.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
