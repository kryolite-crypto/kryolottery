(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function w(){}function F(t){return t()}function W(){return Object.create(null)}function N(t){t.forEach(F)}function J(t){return typeof t=="function"}function K(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function tt(t){return Object.keys(t).length===0}function _(t,e){t.appendChild(e)}function T(t,e,n){t.insertBefore(e,n||null)}function k(t){t.parentNode&&t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function q(t){return document.createTextNode(t)}function L(){return q(" ")}function O(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function a(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function et(t){return Array.from(t.childNodes)}function nt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function B(t,e){t.value=e??""}function rt(t,e,{bubbles:n=!1,cancelable:s=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,s,e),i}let M;function C(t){M=t}function it(){if(!M)throw new Error("Function called outside component initialization");return M}function st(){const t=it();return(e,n,{cancelable:s=!1}={})=>{const i=t.$$.callbacks[e];if(i){const r=rt(e,n,{cancelable:s});return i.slice().forEach(l=>{l.call(t,r)}),!r.defaultPrevented}return!0}}const S=[],Q=[],A=[],z=[],ot=Promise.resolve();let D=!1;function lt(){D||(D=!0,ot.then(U))}function I(t){A.push(t)}const j=new Set;let E=0;function U(){if(E!==0)return;const t=M;do{try{for(;E<S.length;){const e=S[E];E++,C(e),ct(e.$$)}}catch(e){throw S.length=0,E=0,e}for(C(null),S.length=0,E=0;Q.length;)Q.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];j.has(n)||(j.add(n),n())}A.length=0}while(S.length);for(;z.length;)z.pop()();D=!1,j.clear(),C(t)}function ct(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const H=new Set;let at;function V(t,e){t&&t.i&&(H.delete(t),t.i(e))}function ut(t,e,n,s){if(t&&t.o){if(H.has(t))return;H.add(t),at.c.push(()=>{H.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function ft(t){t&&t.c()}function G(t,e,n,s){const{fragment:i,after_update:r}=t.$$;i&&i.m(e,n),s||I(()=>{const l=t.$$.on_mount.map(F).filter(J);t.$$.on_destroy?t.$$.on_destroy.push(...l):N(l),t.$$.on_mount=[]}),r.forEach(I)}function X(t,e){const n=t.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){t.$$.dirty[0]===-1&&(S.push(t),lt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,s,i,r,l,d=[-1]){const c=M;C(t);const o=t.$$={fragment:null,ctx:[],props:r,update:w,not_equal:i,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:W(),dirty:d,skip_bound:!1,root:e.target||c.$$.root};l&&l(o.root);let x=!1;if(o.ctx=n?n(t,e.props||{},(h,y,...f)=>{const g=f.length?f[0]:y;return o.ctx&&i(o.ctx[h],o.ctx[h]=g)&&(!o.skip_bound&&o.bound[h]&&o.bound[h](g),x&&dt(t,h)),y}):[],o.update(),x=!0,N(o.before_update),o.fragment=s?s(o.ctx):!1,e.target){if(e.hydrate){const h=et(e.target);o.fragment&&o.fragment.l(h),h.forEach(k)}else o.fragment&&o.fragment.c();e.intro&&V(t.$$.fragment),G(t,e.target,e.anchor,e.customElement),U()}C(c)}class Z{$destroy(){X(this,1),this.$destroy=w}$on(e,n){if(!J(n))return w;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!tt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function _t(t){let e,n,s,i,r,l,d;return{c(){e=m("div"),n=m("input"),s=L(),i=m("button"),r=q(t[1]),a(n,"class","bg-slate-700 w-3/4 text-white m-1"),a(n,"placeholder",t[0]),a(i,"class","bg-green-300 rounded-sm text-black m-1 h-12 w-12"),a(e,"id","barContainer"),a(e,"class","mb-10 flex justify-between")},m(c,o){T(c,e,o),_(e,n),B(n,t[2]),_(e,s),_(e,i),_(i,r),l||(d=[O(n,"input",t[4]),O(i,"click",t[3])],l=!0)},p(c,[o]){o&1&&a(n,"placeholder",c[0]),o&4&&n.value!==c[2]&&B(n,c[2]),o&2&&nt(r,c[1])},i:w,o:w,d(c){c&&k(e),l=!1,N(d)}}}function pt(t,e,n){let{input_placeholder_text:s}=e,{submit_button_text:i}=e,r="";const l=st();function d(){l("inputSubmitted",{data:r})}function c(){r=this.value,n(2,r)}return t.$$set=o=>{"input_placeholder_text"in o&&n(0,s=o.input_placeholder_text),"submit_button_text"in o&&n(1,i=o.submit_button_text)},[s,i,r,d,c]}class mt extends Z{constructor(e){super(),Y(this,e,pt,_t,K,{input_placeholder_text:0,submit_button_text:1})}}function ht(t){let e,n,s;return{c(){e=m("button"),e.textContent="( Show registrants [?] )",a(e,"class","font-mono text-xs text-slate-500"),a(e,"id","registrants")},m(i,r){T(i,e,r),n||(s=O(e,"click",t[4]),n=!0)},p:w,d(i){i&&k(e),n=!1,s()}}}function gt(t){let e;return{c(){e=m("div"),e.innerHTML='<textarea disabled="" class="bg-slate-600 h-96 w-96 font-mono text-slate-100 rounded-lg" id="registrants" name="registrants"></textarea>',a(e,"id","registrants_container")},m(n,s){T(n,e,s)},p:w,d(n){n&&k(e)}}}function yt(t){let e,n,s;return{c(){e=m("button"),e.textContent="(Show last winner)",a(e,"class","font-mono text-xs text-slate-500")},m(i,r){T(i,e,r),n||(s=O(e,"click",t[5]),n=!0)},p:w,d(i){i&&k(e),n=!1,s()}}}function bt(t){let e;return{c(){e=m("div"),e.innerHTML=`<p id="last_winner_reward" class="font-mono text-xs text-slate-100">[last_winner_reward]</p> 
          <p id="last_winner_address" class="font-mono text-xs text-slate-100">[last_winner_address]</p>`,a(e,"id","last_winner"),a(e,"class","flex flex-col items-center m-5")},m(n,s){T(n,e,s)},p:w,d(n){n&&k(e)}}}function xt(t){let e,n,s,i,r,l,d,c,o,x,h,y,f;n=new mt({props:{input_placeholder_text:"Enter lottery address",submit_button_text:"Load"}}),n.$on("inputSubmitted",t[2]);function g(u,v){return u[1]?gt:ht}let $=g(t),p=$(t);function R(u,v){return u[0]?bt:yt}let P=R(t),b=P(t);return{c(){e=m("body"),ft(n.$$.fragment),s=L(),i=m("div"),r=m("div"),l=m("p"),l.textContent="[address]",d=L(),c=m("p"),c.textContent="[ticket_price]",o=L(),x=m("p"),x.textContent="[registration_open]",h=L(),p.c(),y=L(),b.c(),a(l,"id","address"),a(l,"class","font-mono text-3xl m-2 text-slate-100"),a(c,"id","ticket_price"),a(c,"class","font-mono text-slate-100"),a(x,"id","registration_open"),a(x,"class","font-mono text-slate-100"),a(r,"id","lotteryDisplay"),a(r,"class","flex flex-col items-center bg-zinc-900 rounded-lg w-11/12"),a(i,"class","flex flex-col items-center")},m(u,v){T(u,e,v),G(n,e,null),_(e,s),_(e,i),_(i,r),_(r,l),_(r,d),_(r,c),_(r,o),_(r,x),_(r,h),p.m(r,null),_(r,y),b.m(r,null),f=!0},p(u,[v]){$===($=g(u))&&p?p.p(u,v):(p.d(1),p=$(u),p&&(p.c(),p.m(r,y))),P===(P=R(u))&&b?b.p(u,v):(b.d(1),b=P(u),b&&(b.c(),b.m(r,null)))},i(u){f||(V(n.$$.fragment,u),f=!0)},o(u){ut(n.$$.fragment,u),f=!1},d(u){u&&k(e),X(n),p.d(),b.d()}}}const wt="https://testnet-1.kryolite.io";async function $t(t,e,n){return new Promise((s,i)=>{fetch(`${t}${e}`,{body:JSON.stringify(n),headers:{"Content-Type":"application/json"},method:"POST"}).then(r=>r.json().catch(l=>{console.error(l)})).then(r=>{s(r)}).catch(r=>{i(r)})})}function kt(t,e,n){const s=new URLSearchParams(window.location.search),i="kryo:lol";let r,l=s.get("showWin")==="true"||!1,d=s.get("showReg")==="true"||!1;s.get("address")!=null&&c({detail:{data:s.get("address")}});async function c(y){let f=y.detail.data;f&&f.startsWith("kryo:")&&(f==="kryo:test"&&(f=i),$t(wt,`/contract/${f}/call`,{method:"get_state"}).then(g=>{if(JSON.stringify(g),g.address=f,f===i){let $=[];$.push("kryo:5VWxQp616QM9k21RumcbKpA3kmAe2QoPDpdv");for(let p=0;p<32;p++)$.push(`kryo:${(Math.random().toString(36)+"0").slice(2,10+2)}`);g.registrants=$}r=g,o()}).catch(g=>{console.error(g)}))}async function o(){if(r){if(address.innerHTML=`${r.address}`,ticket_price.innerHTML=`ticket_price : ${r.ticket_price}`,registration_open.innerHTML=`registration_open : ${r.registration_open}`,d){let y="";r.registrants.forEach(f=>{y+=`${f}
`}),registrants.textContent=y}else registrants.innerHTML=`( Show registrants [${r.registrants.length}] )`;l&&(last_winner_reward.innerHTML=`last_winner_reward : ${r.last_winner.reward}`,last_winner_address.innerHTML=`last_winner_address : ${r.last_winner.address}`)}}return[l,d,c,o,()=>{n(1,d=!d),setTimeout(o,1)},()=>{n(0,l=!0),setTimeout(o,1)}]}class vt extends Z{constructor(e){super(),Y(this,e,kt,xt,K,{})}}new vt({target:document.getElementById("app")});
