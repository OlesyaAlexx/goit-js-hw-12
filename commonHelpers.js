import{a as m,S as p,i as b}from"./assets/vendor-b11e2a50.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();class P{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=15}async fetchPhoto(){console.log(this);const e={method:"get",url:"https://pixabay.com/api/",params:{key:"43954842-86e0551d49d52b31999082e7b",image_type:"photo",orientation:"horizontal",safesearch:"true",q:this.searchQuery,page:this.page,per_page:this.PER_PAGE}};try{const a=(await m(e)).data;return this.incrementPage(),a}catch(s){throw new Error("Error fetching data from Pixabay API:",s)}}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}reset(){this.searchQuery=""}}let L=new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function w(r,e){if(!e){console.error("Gallery container is undefined");return}const s=r.map(({webformatURL:a,largeImageURL:t,tags:o,likes:n,views:f,comments:y,downloads:g})=>`<div class="photo-card">
    <a href="${t}">
      <img class="photo-img" src="${a}" alt="${o}" />
    </a>
    <ul class="info-list">
      <li class="info-item">
        <b>Likes</b>
        ${n}
      </li>
      <li class="info-item">
        <b>Views</b>
        ${f}
      </li>
      <li class="info-item">
        <b>Comments</b>
        ${y}
      </li>
      <li class="info-item">
        <b>Downloads</b>
        ${g}
      </li>
    </ul>
    </div>`).join("");e.insertAdjacentHTML("beforeend",s),L.refresh(),console.log(e)}const i={searchform:document.querySelector(".search-form"),galleryConteiner:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};let l=0;const d=new P;i.searchform.addEventListener("submit",q);i.loadMoreBtn.addEventListener("click",v);function q(r){r.preventDefault();const e=r.currentTarget.elements.query.value.trim();if(!e)return c("red","Please, fill the main field");u(),i.galleryConteiner.innerHTML="",d.query=e,d.resetPage(),l=0,i.searchform.reset(),h()}function v(){u(),d.incrementPage(),h()}async function h(){u(),i.loadMoreBtn.classList.add("is-hidden");try{const r=await d.fetchPhoto(),{hits:e,total:s}=r;if(l+=e.length,!e.length){c("red","Sorry, there are no images matching your search query. Please try again.","topRight"),i.loadMoreBtn.classList.add("is-hidden");return}w(e,i.galleryConteiner),l<s&&(c("green",`Hooray! We found ${s} images !!!`,"topRight"),i.loadMoreBtn.classList.remove("is-hidden")),l>=s&&c("red","We're sorry, but you've reached the end of search results.","topRight"),E()}catch(r){console.error("Error:",r),c("red","An error occurred while fetching images. Please try again later.")}finally{S()}}function E(){const{height:r}=document.querySelector(".gallery .photo-card").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}function c(r,e){b.show({color:r,message:e,position:"topRight"})}function u(){i.loader.style.display="block"}function S(){i.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
