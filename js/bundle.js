!function(){"use strict";function e(e,t){const n=document.querySelector(e);n.classList.remove("hide"),n.classList.add("show"),document.body.style.overflow="hidden",t&&clearInterval(t)}function t(e){const t=document.querySelector(e);t.classList.remove("show"),t.classList.add("hide"),document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>e(".modal",n)),5e3);(function(e,t,n,o){const s=document.querySelectorAll(e),a=document.querySelectorAll(t),c=document.querySelector(n);function r(){a.forEach((e=>{e.classList.add("hide"),e.classList.remove("show","fade")})),s.forEach((e=>{e.classList.remove(o)}))}function i(e=0){a[e].classList.add("show","fade"),a[e].classList.remove("hide"),s[e].classList.add(o)}r(),i(),c.addEventListener("click",(t=>{const n=t.target;n&&n.classList.contains(e.slice(1))&&s.forEach(((e,t)=>{n==e&&(r(),i(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(n,o,s){const a=document.querySelectorAll(n),c=document.querySelector(o);a.forEach((t=>{t.addEventListener("click",(()=>e(o,s)))})),c.addEventListener("click",(e=>{e.target!=c&&""!=e.target.getAttribute("data-close")||t(o)})),document.addEventListener("keydown",(e=>{"Escape"==e.code&&c.classList.contains("show")&&t(o)})),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight&&(e(o,s),window.removeEventListener("scroll",t))}))}("[data-modal]",".modal",n),function(){class e{constructor(e,t,n,o,s,a,...c){this.src=e,this.alt=t,this.title=n,this.descr=o,this.price=s,this.parent=document.querySelector(a),this.transfer=27,this.classes=c,this.changeToUAH()}changeToUAH(){this.price*=this.transfer}render(){let e=document.createElement("div");0==this.classes.length?(this.element="menu__item",e.classList.add(this.element)):this.classes.forEach((t=>e.classList.add(t))),e.innerHTML=`\n        <img src =${this.src} alt = ${this.alt}>\n        <h3 class = "menu__item-subtitle" >${this.title}</h3>\n        <div class = "menu__item-descr">${this.descr}</div>\n        <div class = "menu__item-divider"></div>\n        <div class = "menu__item-price">\n          <div class = "menu__item-cost"> Цена: </div>\n          <div class = "menu__item-total">\n            <span>${this.price}</span> грн / день\n          </div>\n        </div>\n      `,this.parent.append(e)}}axios.get("http://localhost:3000/menu").then((t=>{t.data.forEach((({img:t,altImg:n,title:o,descr:s,price:a})=>{new e(t,n,o,s,a,".menu .container").render()}))}))}(),function(n,o){function s(n){const s=document.querySelector(".modal__dialog");s.classList.toggle("hide"),e(".modal",o);const a=document.createElement("div");a.classList.add("modal__dialog"),a.innerHTML=`\n      <div class="modal__content">\n        <div class="modal__close" data-close>&times;</div>\n        <div class="modal__title">${n}</div>\n      </div>\n    `,document.querySelector(".modal").append(a),setTimeout((()=>{a.remove(),s.classList.toggle("hide"),t(".modal")}),4e3)}document.querySelectorAll(n).forEach((e=>{var t;(t=e).addEventListener("submit",(function(e){e.preventDefault();const n=document.createElement("img");n.src="img/forms/spinner.svg",n.style.cssText=" \n        display: block;\n        margin: 0 auto;\n        margin-top: 30px;\n      ",t.insertAdjacentElement("afterend",n);const o=new FormData(t);(async(e,t)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",body:t,headers:{"Content-type":"application/json"}});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((e=>{console.log(e),s("Спасибо! Скоро мы с вами свяжемся"),n.remove()})).catch((()=>{s("Что-то пошло не так...")})).finally((()=>{t.reset()}))}))}))}("form",n),function(e,t){function n(e){return e>=0&&e<10?`0${e}`:e}!function(e,t){const o=document.querySelector(e),s=o.querySelector("#days"),a=o.querySelector("#hours"),c=o.querySelector("#minutes"),r=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const e=function(e){const t=Date.parse(e)-Date.parse(new Date);return{total:t,days:Math.floor(t/1e3/60/60/24),hours:Math.floor(t/1e3/60/60%24),minutes:Math.floor(t/1e3/60%60),seconds:Math.floor(t/1e3%60)}}(t);s.innerHTML=n(e.days),a.innerHTML=n(e.hours),c.innerHTML=n(e.minutes),r.innerHTML=n(e.seconds),e.total<=0&&clearInterval(i)}l()}(e,t)}(".timer","2200-01-01"),function({container:e,slide:t,nextArrow:n,prevArrow:o,totalCounter:s,currentCounter:a,wrapper:c,field:r}){const i=document.querySelectorAll(t),l=document.querySelector(o),d=document.querySelector(n),u=document.querySelector(s),m=document.querySelector(a),h=document.querySelector(c),g=document.querySelector(r),f=window.getComputedStyle(h).width;let v=1,_=0;function y(){m.textContent=v<10?`0${v}`:v}function p(){g.style.transform=`translateX(-${_}px)`}function L(e){return+e.replace(/\D/g,"")}i.length<10?(u.textContent=`0${i.length}`,m.textContent=`0${v}`):(u.textContent=i.length,m.textContent=v),g.style.width=100*i.length+"%",g.style.display="flex",g.style.transition="0.5s all",h.style.overflow="hidden",i.forEach((e=>{e.style.width=f})),d.addEventListener("click",(()=>{_===L(f)*(i.length-1)?_=0:_+=L(f),p(),v==i.length?v=1:v++,y()})),l.addEventListener("click",(()=>{0===_?_=L(f)*(i.length-1):_-=L(f),p(),1==v?v=i.length:v--,y()}));const S=document.querySelector(e);S.style.position="relative";const w=document.createElement("ol");w.classList.add("carousel-indicators"),S.append(w);const E=[];function b(){E.forEach((e=>e.style.opacity=.5)),E[v-1].style.opacity=1}for(let e=0;e<i.length;e++){const t=document.createElement("li");t.setAttribute("data-slide-to",e+1),t.classList.add("dot"),0==e&&(t.style.opacity=1),w.append(t),E.push(t)}d.addEventListener("click",(()=>{b()})),l.addEventListener("click",(()=>{b()})),E.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-slide-to");v=t,_=L(f)*(v-1),p(),b(),y()}))}))}({container:".offer__slider",slide:".offer__slide",nextArrow:".offer__slider-next",prevArrow:".offer__slider-prev",totalCounter:"#total",currentCounter:"#current",wrapper:".offer__slider-wrapper",field:".offer__slider-inner"}),function(){const e=document.querySelector(".calculating__result span");let t,n,o,s,a;function c(){e.textContent=t&&n&&o&&s&&a?"female"===t?Math.round((447.6+9.2*o+3.1*n-4.3*s)*a):Math.round((88.36+13.4*o+4.8*n-5.7*s)*a):"____"}function r(e,n){const o=document.querySelectorAll(e);o.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(a=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"))):(t=e.target.getAttribute("id"),localStorage.setItem("sex",e.target.getAttribute("id"))),o.forEach((e=>{e.classList.remove(n)})),e.target.classList.add(n),c()}))}))}function i(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?(t.style.border="1px solid red",t.style.boxShadow="0 4px 15px red"):(t.style.border="none",t.style.boxShadow="0 4px 15px rgba(0,0,0,.2)"),t.getAttribute("id")){case"height":n=+t.value;break;case"weight":o=+t.value;break;case"age":s=+t.value}c()}))}function l(e,t){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t)}))}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?a=localStorage.getItem("ratio"):(a=1.375,localStorage.setItem("ratio",1.375)),l("#gender div","calculating__choose-item_active"),l(".calculating__choose_big div","calculating__choose-item_active"),c(),r("#gender div","calculating__choose-item_active"),r(".calculating__choose_big div","calculating__choose-item_active"),i("#height"),i("#weight"),i("#age")}()}))}();
//# sourceMappingURL=bundle.js.map