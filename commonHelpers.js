import{a as g,S as L,i as u}from"./assets/vendor-cec502ba.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const b="43840799-e71ea23b4db8ae9f9c01a8841",w="https://pixabay.com/api/";g.defaults.baseURL=w;const v=(t,s=1)=>{const o={key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15};return g.get("?",{params:{...o}})},E=t=>`
    <a href="${t.largeImageURL}" class="item">
      <img src="${t.webformatURL}" alt="" alt="${t.tags}"/>
      <div class="data">
        <p><b>Likes</b> <span>${t.likes}</span></p>
        <p><b>Views</b> <span>${t.views}</span></p>
        <p><b>Comments</b> <span>${t.comments}</span></p>
        <p><b>Downloads</b> <span>${t.downloads}</span></p>
      </div>
    </a>
  `,c=document.querySelector("form.form-search"),m=document.querySelector(".gallery"),l=document.querySelector(".loader"),a=document.querySelector(".loadMore"),P=new L(".gallery a",{});let n=1,d=1,f=0,h;const S=15,y=async(t,s=!0)=>{try{if(s&&(n=1,d=1),n>d)return;const o=await v(t,n);if(o.data.total===0){a.classList.add("d-none"),u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",class:"error",color:"white"});return}f=o.data.totalHits,d=Math.ceil(f/S),n++;const i=o.data.hits.map(e=>E(e)).join("");if(s)m.innerHTML=i;else{m.insertAdjacentHTML("beforeend",i);const{height:e}=m.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}P.refresh(),n>=d?a.classList.add("d-none"):a.classList.remove("d-none")}catch(o){console.error("Error fetching images:",o),u.error({message:"Error fetching images. Please try again later.",position:"topRight",class:"error",color:"white"})}finally{l.classList.add("is-hidden")}};c&&c.addEventListener("submit",async t=>{t.preventDefault(),l.classList.remove("is-hidden"),m.innerHTML="";const s=c.elements.search.value.trim();if(!s){u.error({message:"Please enter a search term",position:"topRight",class:"error",color:"white"}),l.classList.add("is-hidden");return}await y(s),h=s,c.reset()});a&&a.addEventListener("click",async()=>{l.classList.remove("is-hidden"),a.classList.add("d-none"),await y(h,!1),a.classList.remove("d-none"),l.classList.add("is-hidden")});
//# sourceMappingURL=commonHelpers.js.map