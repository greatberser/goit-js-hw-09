function e(e,t){return new Promise(((o,n)=>{const s=Math.random()>.3,i=setTimeout((()=>{s?o({position:e,delay:t}):n({position:e,delay:t}),clearTimeout(i)}),t)}))}const t=document.querySelector(".form");t.addEventListener("submit",(o=>{o.preventDefault();const n=new FormData(t),s=parseInt(n.get("delay"),10),i=parseInt(n.get("step"),10),a=parseInt(n.get("amount"),10),r=[];for(let t=0;t<a;t++){const o=e(t+1,s+t*i);o.then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)})),r.push(o)}}));
//# sourceMappingURL=03-promises.50a7c49c.js.map