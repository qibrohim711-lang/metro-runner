(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Zn=[{id:"metro",name:"Shahar metrosi",price:0,description:"Issiq quyosh, xiyobonlar va metro yo‘li.",sky:10276831,horizon:16046257,ground:6912129,accent:16765579,weather:["clear","cloudy","rain","mist"]},{id:"neon",name:"Neon shahar",price:3e3,description:"Tungi osmono‘par binolar va neon ko‘chalar.",sky:1119278,horizon:5586041,ground:2370888,accent:7207423,weather:["clear","cloudy","rain","mist"]},{id:"desert",name:"Cho‘l",price:5e3,description:"Qum tepalari, qoyalar va voha bekatlari.",sky:7847389,horizon:16767395,ground:13212259,accent:16758621,weather:["clear","cloudy","sand"]},{id:"snow",name:"Qorli shahar",price:7e3,description:"Qor bosgan tomlar va ignabargli o‘rmon.",sky:10402772,horizon:15200762,ground:12834017,accent:10938623,weather:["clear","snow","mist"]},{id:"space",name:"Kosmik stansiya",price:1e4,description:"Orbital platforma, sayyoralar va reaktorlar.",sky:329751,horizon:1518158,ground:3160918,accent:8833791,weather:["stars","aurora","pulse"]}],Sl={clear:"☀ Ochiq",cloudy:"☁ Bulutli",rain:"☂ Yomg‘ir",mist:"≋ Tuman",sand:"≋ Qum shamoli",snow:"❄ Qor",stars:"✧ Yulduzlar",aurora:"✺ Qutb nuri",pulse:"◉ Reaktor nuri"},pi=r=>Zn.find(e=>e.id===r)||Zn[0];function Ha(r){return r.maps=[...new Set(["metro",...Array.isArray(r.maps)?r.maps:[]].filter(e=>Zn.some(t=>t.id===e)))],r.maps.includes(r.selectedMap)||(r.selectedMap="metro"),["low","medium","high"].includes(r.quality)||(r.quality="medium"),r}function Rf(r,e){const t=Zn.find(n=>n.id===e);if(!t)return!1;if(Ha(r),!r.maps.includes(e)){if(!Number.isFinite(r.coins)||r.coins<t.price)return!1;r.coins-=t.price,r.maps.push(e)}return r.selectedMap=e,!0}class Cf{constructor(e=Math.random){this.random=e,this.reset("metro")}reset(e){this.map=pi(e).id,this.weather=pi(e).weather[0],this.boundary=0,this.transition=null,this.queue=[],this.serial=0}choose(e,t){const n=e.filter(s=>s!==t),i=n.length?n:e;return i[Math.min(i.length-1,Math.floor(this.random()*i.length))]}update(e,t,n,i=!1){if(i)return null;let s=null;this.transition&&(this.transition.time=Math.min(2.6,this.transition.time+e),this.transition.time>=2.6&&(this.map=this.transition.map,this.weather=this.transition.weather,this.transition=null));const o=Math.floor(Math.max(0,t)/5e3);for(;this.boundary<o;)this.boundary++,this.queue.push(this.boundary);if(!this.transition&&this.queue.length){const a=this.queue.shift(),c=Zn.filter(h=>n.includes(h.id)).map(h=>h.id),l=a%2===0?this.choose(c.length?c:[this.map],this.map):this.map,u=this.choose(pi(l).weather,this.weather);s={id:++this.serial,map:l,weather:u,fromMap:this.map,fromWeather:this.weather,mapChanged:l!==this.map,time:0,boundary:a},this.transition=s}return s}get protected(){return!!this.transition?.mapChanged}}const br={coins:0,best:0,characters:["aziz"],selected:"aziz",boards:3,sound:!0};function nu(r=globalThis.localStorage){try{const e=JSON.parse(r.getItem("metro-runner"));return Ha({...br,...e,redeemedPromos:Array.isArray(e?.redeemedPromos)?[...new Set(e.redeemedPromos.filter(t=>typeof t=="string").map(t=>t.trim().toUpperCase()))]:[],characters:Array.isArray(e?.characters)?[...new Set(["aziz",...e.characters])]:[...br.characters]})}catch{return Ha({...br,redeemedPromos:[],characters:[...br.characters]})}}function qn(r,e=globalThis.localStorage){try{return e.setItem("metro-runner",JSON.stringify(r)),!0}catch{return!1}}function Pf(r,e){const t=ir.find(n=>n.id===e);if(!t)return!1;if(!r.characters.includes(e)){if(r.coins<t.price)return!1;r.coins-=t.price,r.characters.push(e)}return r.selected=e,!0}const ir=[{id:"aziz",name:"Near Future Soldier",description:"Kelajak jangchisi. Bepul boshlang‘ich qahramon.",color:9412004,hat:2175822,price:0},{id:"lola",name:"Hulk",description:"Kuchli yashil qahramon.",color:6597448,hat:6635136,price:150},{id:"sardor",name:"TASM 2",description:"Qizil-ko‘k libosdagi chaqqon qahramon.",color:13910595,hat:2646923,price:300}],Yi={empty:"Promokodni kiriting",invalid:"Promokod topilmadi",used:"Bu promokod avval ishlatilgan",success:"Tabriklaymiz! 30 000 tanga qo‘shildi!",storage:"Saqlash imkoni bo‘lmadi. Brauzer xotirasini tekshiring."};function If(r,e,{storage:t=globalThis.localStorage,locks:n=globalThis.navigator?.locks}={}){const i=String(e??"").trim().toUpperCase();if(!i)return Promise.resolve({status:"empty",message:Yi.empty});if(i!=="FREE")return Promise.resolve({status:"invalid",message:Yi.invalid});const s=()=>{let o;try{o=t.getItem("metro-runner")===null?{...r,redeemedPromos:[...r.redeemedPromos||[]]}:nu(t)}catch{return{status:"storage",message:Yi.storage}}if(o.redeemedPromos?.includes(i))return Object.assign(r,o),{status:"used",message:Yi.used};const a={...o,coins:(Number.isFinite(o.coins)?o.coins:0)+3e4,redeemedPromos:[...o.redeemedPromos||[],i]};return qn(a,t)?(Object.assign(r,a),{status:"success",message:Yi.success}):{status:"storage",message:Yi.storage}};return n?.request?n.request("metro-runner-profile",s):Promise.resolve(s())}const Vc="180",Lf=0,Tl=1,Df=2,iu=1,su=2,Xn=3,ei=0,qt=1,cn=2,gi=0,vs=1,xs=2,bl=3,El=4,Nf=5,Ui=100,Uf=101,Ff=102,Of=103,Bf=104,kf=200,zf=201,Hf=202,Vf=203,Va=204,Ga=205,Gf=206,Wf=207,Xf=208,qf=209,Yf=210,jf=211,Kf=212,$f=213,Zf=214,Wa=0,Xa=1,qa=2,Ts=3,Ya=4,ja=5,Ka=6,$a=7,wo=0,Jf=1,Qf=2,_i=0,ed=1,td=2,nd=3,ru=4,id=5,sd=6,rd=7,wl="attached",od="detached",ou=300,bs=301,Es=302,mo=303,Za=304,Ao=306,vi=1e3,In=1001,go=1002,Yt=1003,au=1004,js=1005,tn=1006,ro=1007,Kn=1008,Dn=1009,cu=1010,lu=1011,sr=1012,Gc=1013,zi=1014,Mn=1015,_r=1016,Wc=1017,Xc=1018,rr=1020,hu=35902,uu=35899,fu=1021,du=1022,hn=1023,or=1026,ar=1027,qc=1028,Yc=1029,pu=1030,jc=1031,Kc=1033,oo=33776,ao=33777,co=33778,lo=33779,Ja=35840,Qa=35841,ec=35842,tc=35843,nc=36196,ic=37492,sc=37496,rc=37808,oc=37809,ac=37810,cc=37811,lc=37812,hc=37813,uc=37814,fc=37815,dc=37816,pc=37817,mc=37818,gc=37819,_c=37820,vc=37821,xc=36492,yc=36494,Mc=36495,Sc=36283,Tc=36284,bc=36285,Ec=36286,mu=2200,ad=2201,cd=2202,cr=2300,lr=2301,Go=2302,ds=2400,ps=2401,_o=2402,$c=2500,ld=2501,hd=0,gu=1,wc=2,ud=3200,fd=3201,Ro=0,dd=1,Yn="",ot="srgb",jt="srgb-linear",vo="linear",ft="srgb",ji=7680,Al=519,pd=512,md=513,gd=514,_u=515,_d=516,vd=517,xd=518,yd=519,Ac=35044,Rl="300 es",Ln=2e3,xo=2001;class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cl=1234567;const Zs=Math.PI/180,ws=180/Math.PI;function un(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[r&255]+kt[r>>8&255]+kt[r>>16&255]+kt[r>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function et(r,e,t){return Math.max(e,Math.min(t,r))}function Zc(r,e){return(r%e+e)%e}function Md(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Sd(r,e,t){return r!==e?(t-r)/(e-r):0}function Js(r,e,t){return(1-t)*r+t*e}function Td(r,e,t,n){return Js(r,e,1-Math.exp(-t*n))}function bd(r,e=1){return e-Math.abs(Zc(r,e*2)-e)}function Ed(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function wd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Ad(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Rd(r,e){return r+Math.random()*(e-r)}function Cd(r){return r*(.5-Math.random())}function Pd(r){r!==void 0&&(Cl=r);let e=Cl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Id(r){return r*Zs}function Ld(r){return r*ws}function Dd(r){return(r&r-1)===0&&r!==0}function Nd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ud(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":r.set(a*u,c*h,c*f,a*l);break;case"YZY":r.set(c*f,a*u,c*h,a*l);break;case"ZXZ":r.set(c*h,c*f,a*u,a*l);break;case"XZX":r.set(a*u,c*m,c*d,a*l);break;case"YXY":r.set(c*d,a*u,c*m,a*l);break;case"ZYZ":r.set(c*m,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function xn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const We={DEG2RAD:Zs,RAD2DEG:ws,generateUUID:un,clamp:et,euclideanModulo:Zc,mapLinear:Md,inverseLerp:Sd,lerp:Js,damp:Td,pingpong:bd,smoothstep:Ed,smootherstep:wd,randInt:Ad,randFloat:Rd,randFloatSpread:Cd,seededRandom:Pd,degToRad:Id,radToDeg:Ld,isPowerOfTwo:Dd,ceilPowerOfTwo:Nd,floorPowerOfTwo:Ud,setQuaternionFromProperEuler:Fd,normalize:ht,denormalize:xn};class pe{constructor(e=0,t=0){pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],m=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=m,e[t+3]=_;return}if(h!==_||c!==f||l!==d||u!==m){let g=1-a;const p=c*f+l*d+u*m+h*_,b=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const R=Math.sqrt(v),w=Math.atan2(R,p*b);g=Math.sin(g*w)/R,a=Math.sin(a*w)/R}const x=a*b;if(c=c*g+f*x,l=l*g+d*x,u=u*g+m*x,h=h*g+_*x,g===1-a){const R=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=R,l*=R,u*=R,h*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],m=s[o+3];return e[t]=a*m+u*h+c*d-l*f,e[t+1]=c*m+u*f+l*h-a*d,e[t+2]=l*m+u*d+a*f-c*h,e[t+3]=u*m-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(s/2),f=c(n/2),d=c(i/2),m=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*m,this._y=l*d*h-f*u*m,this._z=l*u*m+f*d*h,this._w=l*u*h-f*d*m;break;case"YXZ":this._x=f*u*h+l*d*m,this._y=l*d*h-f*u*m,this._z=l*u*m-f*d*h,this._w=l*u*h+f*d*m;break;case"ZXY":this._x=f*u*h-l*d*m,this._y=l*d*h+f*u*m,this._z=l*u*m+f*d*h,this._w=l*u*h-f*d*m;break;case"ZYX":this._x=f*u*h-l*d*m,this._y=l*d*h+f*u*m,this._z=l*u*m-f*d*h,this._w=l*u*h+f*d*m;break;case"YZX":this._x=f*u*h+l*d*m,this._y=l*d*h+f*u*m,this._z=l*u*m-f*d*h,this._w=l*u*h-f*d*m;break;case"XZY":this._x=f*u*h-l*d*m,this._y=l*d*h-f*u*m,this._z=l*u*m+f*d*h,this._w=l*u*h+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+i*l-s*c,this._y=i*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),u=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=i+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wo.copy(this).projectOnVector(e),this.sub(Wo)}reflect(e){return this.sub(Wo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wo=new L,Pl=new Mt;class je{constructor(e,t,n,i,s,o,a,c,l){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],m=n[8],_=i[0],g=i[3],p=i[6],b=i[1],v=i[4],x=i[7],R=i[2],w=i[5],A=i[8];return s[0]=o*_+a*b+c*R,s[3]=o*g+a*v+c*w,s[6]=o*p+a*x+c*A,s[1]=l*_+u*b+h*R,s[4]=l*g+u*v+h*w,s[7]=l*p+u*x+h*A,s[2]=f*_+d*b+m*R,s[5]=f*g+d*v+m*w,s[8]=f*p+d*x+m*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,m=t*h+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xo.makeScale(e,t)),this}rotate(e){return this.premultiply(Xo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xo=new je;function vu(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function hr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Od(){const r=hr("canvas");return r.style.display="block",r}const Il={};function ur(r){r in Il||(Il[r]=!0,console.warn(r))}function Bd(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Ll=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dl=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kd(){const r={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ft&&(i.r=Jn(i.r),i.g=Jn(i.g),i.b=Jn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ft&&(i.r=ys(i.r),i.g=ys(i.g),i.b=ys(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Yn?vo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ur("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ur("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[jt]:{primaries:e,whitePoint:n,transfer:vo,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ot},outputColorSpaceConfig:{drawingBufferColorSpace:ot}},[ot]:{primaries:e,whitePoint:n,transfer:ft,toXYZ:Ll,fromXYZ:Dl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ot}}}),r}const Ke=kd();function Jn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ys(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ki;class zd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ki===void 0&&(Ki=hr("canvas")),Ki.width=e.width,Ki.height=e.height;const i=Ki.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ki}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Jn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hd=0;class Jc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=un(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(qo(i[o].image)):s.push(qo(i[o]))}else s=qo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function qo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?zd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vd=0;const Yo=new L;class Pt extends Wi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=In,i=In,s=tn,o=Kn,a=hn,c=Dn,l=Pt.DEFAULT_ANISOTROPY,u=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=un(),this.name="",this.source=new Jc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Yo).x}get height(){return this.source.getSize(Yo).y}get depth(){return this.source.getSize(Yo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ou)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vi:e.x=e.x-Math.floor(e.x);break;case In:e.x=e.x<0?0:1;break;case go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vi:e.y=e.y-Math.floor(e.y);break;case In:e.y=e.y<0?0:1;break;case go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=ou;Pt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,i=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,x=(d+1)/2,R=(p+1)/2,w=(u+f)/4,A=(h+_)/4,I=(m+g)/4;return v>x&&v>R?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=w/n,s=A/n):x>R?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=w/i,s=I/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=A/s,i=I/s),this.set(n,i,s,t),this}let b=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(h-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gd extends Wi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Pt(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Jc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends Gd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class xu extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wd extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=In,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,dn):dn.fromBufferAttribute(s,o),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),wr.subVectors(this.max,Us),$i.subVectors(e.a,Us),Zi.subVectors(e.b,Us),Ji.subVectors(e.c,Us),ri.subVectors(Zi,$i),oi.subVectors(Ji,Zi),Ei.subVectors($i,Ji);let t=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-Ei.z,Ei.y,ri.z,0,-ri.x,oi.z,0,-oi.x,Ei.z,0,-Ei.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-Ei.y,Ei.x,0];return!jo(t,$i,Zi,Ji,wr)||(t=[1,0,0,0,1,0,0,0,1],!jo(t,$i,Zi,Ji,wr))?!1:(Ar.crossVectors(ri,oi),t=[Ar.x,Ar.y,Ar.z],jo(t,$i,Zi,Ji,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const kn=[new L,new L,new L,new L,new L,new L,new L,new L],dn=new L,Er=new Tn,$i=new L,Zi=new L,Ji=new L,ri=new L,oi=new L,Ei=new L,Us=new L,wr=new L,Ar=new L,wi=new L;function jo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){wi.fromArray(r,s);const a=i.x*Math.abs(wi.x)+i.y*Math.abs(wi.y)+i.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=n.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Xd=new Tn,Fs=new L,Ko=new L;class Fn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Fs,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ko.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(Ko)),this.expandByPoint(Fs.copy(e.center).sub(Ko))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const zn=new L,$o=new L,Rr=new L,ai=new L,Zo=new L,Cr=new L,Jo=new L;class Co{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){$o.copy(e).add(t).multiplyScalar(.5),Rr.copy(t).sub(e).normalize(),ai.copy(this.origin).sub($o);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Rr),a=ai.dot(this.direction),c=-ai.dot(Rr),l=ai.lengthSq(),u=Math.abs(1-o*o);let h,f,d,m;if(u>0)if(h=o*c-a,f=o*a-c,m=s*u,h>=0)if(f>=-m)if(f<=m){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-m?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=m?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy($o).addScaledVector(Rr,f),d}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),i=zn.dot(zn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,i,s){Zo.subVectors(t,e),Cr.subVectors(n,e),Jo.crossVectors(Zo,Cr);let o=this.direction.dot(Jo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,e);const c=a*this.direction.dot(Cr.crossVectors(ai,Cr));if(c<0)return null;const l=a*this.direction.dot(Zo.cross(ai));if(l<0||c+l>o)return null;const u=-a*ai.dot(Jo);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class we{constructor(e,t,n,i,s,o,a,c,l,u,h,f,d,m,_,g){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,u,h,f,d,m,_,g)}set(e,t,n,i,s,o,a,c,l,u,h,f,d,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Qi.setFromMatrixColumn(e,0).length(),s=1/Qi.setFromMatrixColumn(e,1).length(),o=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,m=a*u,_=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+m*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=m+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,m=l*u,_=l*h;t[0]=f+_*a,t[4]=m*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-m,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,m=l*u,_=l*h;t[0]=f-_*a,t[4]=-o*h,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,m=a*u,_=a*h;t[0]=c*u,t[4]=m*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=_-f*h,t[8]=m*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+m,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*c,d=o*l,m=a*c,_=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-m,t[2]=m*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qd,e,Yd)}lookAt(e,t,n){const i=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ci.crossVectors(n,Qt),ci.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ci.crossVectors(n,Qt)),ci.normalize(),Pr.crossVectors(Qt,ci),i[0]=ci.x,i[4]=Pr.x,i[8]=Qt.x,i[1]=ci.y,i[5]=Pr.y,i[9]=Qt.y,i[2]=ci.z,i[6]=Pr.z,i[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],b=n[3],v=n[7],x=n[11],R=n[15],w=i[0],A=i[4],I=i[8],S=i[12],M=i[1],C=i[5],U=i[9],k=i[13],z=i[2],W=i[6],q=i[10],Q=i[14],X=i[3],oe=i[7],ge=i[11],xe=i[15];return s[0]=o*w+a*M+c*z+l*X,s[4]=o*A+a*C+c*W+l*oe,s[8]=o*I+a*U+c*q+l*ge,s[12]=o*S+a*k+c*Q+l*xe,s[1]=u*w+h*M+f*z+d*X,s[5]=u*A+h*C+f*W+d*oe,s[9]=u*I+h*U+f*q+d*ge,s[13]=u*S+h*k+f*Q+d*xe,s[2]=m*w+_*M+g*z+p*X,s[6]=m*A+_*C+g*W+p*oe,s[10]=m*I+_*U+g*q+p*ge,s[14]=m*S+_*k+g*Q+p*xe,s[3]=b*w+v*M+x*z+R*X,s[7]=b*A+v*C+x*W+R*oe,s[11]=b*I+v*U+x*q+R*ge,s[15]=b*S+v*k+x*Q+R*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+s*c*h-i*l*h-s*a*f+n*l*f+i*a*d-n*c*d)+_*(+t*c*d-t*l*f+s*o*f-i*o*d+i*l*u-s*c*u)+g*(+t*l*h-t*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+p*(-i*a*u-t*c*h+t*a*f+i*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],m=e[12],_=e[13],g=e[14],p=e[15],b=h*g*l-_*f*l+_*c*d-a*g*d-h*c*p+a*f*p,v=m*f*l-u*g*l-m*c*d+o*g*d+u*c*p-o*f*p,x=u*_*l-m*h*l+m*a*d-o*_*d-u*a*p+o*h*p,R=m*h*c-u*_*c-m*a*f+o*_*f+u*a*g-o*h*g,w=t*b+n*v+i*x+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=b*A,e[1]=(_*f*s-h*g*s-_*i*d+n*g*d+h*i*p-n*f*p)*A,e[2]=(a*g*s-_*c*s+_*i*l-n*g*l-a*i*p+n*c*p)*A,e[3]=(h*c*s-a*f*s-h*i*l+n*f*l+a*i*d-n*c*d)*A,e[4]=v*A,e[5]=(u*g*s-m*f*s+m*i*d-t*g*d-u*i*p+t*f*p)*A,e[6]=(m*c*s-o*g*s-m*i*l+t*g*l+o*i*p-t*c*p)*A,e[7]=(o*f*s-u*c*s+u*i*l-t*f*l-o*i*d+t*c*d)*A,e[8]=x*A,e[9]=(m*h*s-u*_*s-m*n*d+t*_*d+u*n*p-t*h*p)*A,e[10]=(o*_*s-m*a*s+m*n*l-t*_*l-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*d-t*a*d)*A,e[12]=R*A,e[13]=(u*_*i-m*h*i+m*n*f-t*_*f-u*n*g+t*h*g)*A,e[14]=(m*a*i-o*_*i-m*n*c+t*_*c+o*n*g-t*a*g)*A,e[15]=(o*h*i-u*a*i+u*n*c-t*h*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,m=s*h,_=o*u,g=o*h,p=a*h,b=c*l,v=c*u,x=c*h,R=n.x,w=n.y,A=n.z;return i[0]=(1-(_+p))*R,i[1]=(d+x)*R,i[2]=(m-v)*R,i[3]=0,i[4]=(d-x)*w,i[5]=(1-(f+p))*w,i[6]=(g+b)*w,i[7]=0,i[8]=(m+v)*A,i[9]=(g-b)*A,i[10]=(1-(f+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Qi.set(i[0],i[1],i[2]).length();const o=Qi.set(i[4],i[5],i[6]).length(),a=Qi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],pn.copy(this);const l=1/s,u=1/o,h=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Ln,c=!1){const l=this.elements,u=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i);let m,_;if(c)m=s/(o-s),_=o*s/(o-s);else if(a===Ln)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===xo)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Ln,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-i),f=-(t+e)/(t-e),d=-(n+i)/(n-i);let m,_;if(c)m=1/(o-s),_=o/(o-s);else if(a===Ln)m=-2/(o-s),_=-(o+s)/(o-s);else if(a===xo)m=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qi=new L,pn=new we,qd=new L(0,0,0),Yd=new L(1,1,1),ci=new L,Pr=new L,Qt=new L,Nl=new we,Ul=new Mt;class Ct{constructor(e=0,t=0,n=0,i=Ct.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ct.DEFAULT_ORDER="XYZ";class yu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jd=0;const Fl=new L,es=new Mt,Hn=new we,Ir=new L,Os=new L,Kd=new L,$d=new Mt,Ol=new L(1,0,0),Bl=new L(0,1,0),kl=new L(0,0,1),zl={type:"added"},Zd={type:"removed"},ts={type:"childadded",child:null},Qo={type:"childremoved",child:null};class pt extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new L,t=new Ct,n=new Mt,i=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new we},normalMatrix:{value:new je}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(Ol,e)}rotateY(e){return this.rotateOnAxis(Bl,e)}rotateZ(e){return this.rotateOnAxis(kl,e)}translateOnAxis(e,t){return Fl.copy(e).applyQuaternion(this.quaternion),this.position.add(Fl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ol,e)}translateY(e){return this.translateOnAxis(Bl,e)}translateZ(e){return this.translateOnAxis(kl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ir.copy(e):Ir.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Os,Ir,this.up):Hn.lookAt(Ir,Os,this.up),this.quaternion.setFromRotationMatrix(Hn),i&&(Hn.extractRotation(i.matrixWorld),es.setFromRotationMatrix(Hn),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zl),ts.child=e,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zd),Qo.child=e,this.dispatchEvent(Qo),Qo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zl),ts.child=e,this.dispatchEvent(ts),ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,Kd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,$d,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}pt.DEFAULT_UP=new L(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new L,Vn=new L,ea=new L,Gn=new L,ns=new L,is=new L,Hl=new L,ta=new L,na=new L,ia=new L,sa=new it,ra=new it,oa=new it;class yn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),mn.subVectors(e,t),i.cross(mn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){mn.subVectors(i,t),Vn.subVectors(n,t),ea.subVectors(e,t);const o=mn.dot(mn),a=mn.dot(Vn),c=mn.dot(ea),l=Vn.dot(Vn),u=Vn.dot(ea),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,m=(o*u-a*c)*f;return s.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Gn.x),c.addScaledVector(o,Gn.y),c.addScaledVector(a,Gn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,o){return sa.setScalar(0),ra.setScalar(0),oa.setScalar(0),sa.fromBufferAttribute(e,t),ra.fromBufferAttribute(e,n),oa.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(sa,s.x),o.addScaledVector(ra,s.y),o.addScaledVector(oa,s.z),o}static isFrontFacing(e,t,n,i){return mn.subVectors(n,t),Vn.subVectors(e,t),mn.cross(Vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),mn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;ns.subVectors(i,n),is.subVectors(s,n),ta.subVectors(e,n);const c=ns.dot(ta),l=is.dot(ta);if(c<=0&&l<=0)return t.copy(n);na.subVectors(e,i);const u=ns.dot(na),h=is.dot(na);if(u>=0&&h<=u)return t.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(ns,o);ia.subVectors(e,s);const d=ns.dot(ia),m=is.dot(ia);if(m>=0&&d<=m)return t.copy(s);const _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(is,a);const g=u*m-d*h;if(g<=0&&h-u>=0&&d-m>=0)return Hl.subVectors(s,i),a=(h-u)/(h-u+(d-m)),t.copy(i).addScaledVector(Hl,a);const p=1/(g+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(ns,o).addScaledVector(is,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function aa(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=Zc(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=aa(o,s,e+1/3),this.g=aa(o,s,e),this.b=aa(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,i),this}setStyle(e,t=ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){const n=Mu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return Ke.workingToColorSpace(zt.copy(this),e),Math.round(et(zt.r*255,0,255))*65536+Math.round(et(zt.g*255,0,255))*256+Math.round(et(zt.b*255,0,255))}getHexString(e=ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(zt.copy(this),t);const n=zt.r,i=zt.g,s=zt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=ot){Ke.workingToColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,i=zt.b;return e!==ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(Lr);const n=Js(li.h,Lr.h,t),i=Js(li.s,Lr.s,t),s=Js(li.l,Lr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new be;be.NAMES=Mu;let Jd=0;class fn extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=un(),this.name="",this.type="Material",this.blending=vs,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Ga,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vs&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==Ga&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ot extends fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ct,this.combine=wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new L,Dr=new pe;let Qd=0;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ac,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ac&&(e.usage=this.usage),e}}class Qc extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Su extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dt extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ep=0;const rn=new we,ca=new pt,ss=new L,en=new Tn,Bs=new Tn,Nt=new L;class Et extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vu(e)?Su:Qc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,n){return rn.makeTranslation(e,t,n),this.applyMatrix4(rn),this}scale(e,t,n){return rn.makeScale(e,t,n),this.applyMatrix4(rn),this}lookAt(e){return ca.lookAt(e),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Nt.addVectors(en.min,Bs.min),en.expandByPoint(Nt),Nt.addVectors(en.max,Bs.max),en.expandByPoint(Nt)):(en.expandByPoint(Bs.min),en.expandByPoint(Bs.max))}en.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Nt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Nt.fromBufferAttribute(a,l),c&&(ss.fromBufferAttribute(e,l),Nt.add(ss)),i=Math.max(i,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new L,c[I]=new L;const l=new L,u=new L,h=new L,f=new pe,d=new pe,m=new pe,_=new L,g=new L;function p(I,S,M){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),f.fromBufferAttribute(s,I),d.fromBufferAttribute(s,S),m.fromBufferAttribute(s,M),u.sub(l),h.sub(l),d.sub(f),m.sub(f);const C=1/(d.x*m.y-m.x*d.y);isFinite(C)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-d.y).multiplyScalar(C),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(C),a[I].add(_),a[S].add(_),a[M].add(_),c[I].add(g),c[S].add(g),c[M].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,S=b.length;I<S;++I){const M=b[I],C=M.start,U=M.count;for(let k=C,z=C+U;k<z;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const v=new L,x=new L,R=new L,w=new L;function A(I){R.fromBufferAttribute(i,I),w.copy(R);const S=a[I];v.copy(S),v.sub(R.multiplyScalar(R.dot(S))).normalize(),x.crossVectors(w,S);const C=x.dot(c[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,C)}for(let I=0,S=b.length;I<S;++I){const M=b[I],C=M.start,U=M.count;for(let k=C,z=C+U;k<z;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new L,s=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)f[m++]=l[d++]}return new It(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vl=new we,Ai=new Co,Nr=new Fn,Gl=new L,Ur=new L,Fr=new L,Or=new L,la=new L,Br=new L,Wl=new L,kr=new L;class rt extends pt{constructor(e=new Et,t=new Ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Br.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(la.fromBufferAttribute(h,e),o?Br.addScaledVector(la,u):Br.addScaledVector(la.sub(t),u))}t.add(Br)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),Ai.copy(e.ray).recast(e.near),!(Nr.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Nr,Gl)===null||Ai.origin.distanceToSquared(Gl)>(e.far-e.near)**2))&&(Vl.copy(s).invert(),Ai.copy(e.ray).applyMatrix4(Vl),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ai)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],b=Math.max(g.start,d.start),v=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let x=b,R=v;x<R;x+=3){const w=a.getX(x),A=a.getX(x+1),I=a.getX(x+2);i=zr(this,p,e,n,l,u,h,w,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const b=a.getX(g),v=a.getX(g+1),x=a.getX(g+2);i=zr(this,o,e,n,l,u,h,b,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],b=Math.max(g.start,d.start),v=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let x=b,R=v;x<R;x+=3){const w=x,A=x+1,I=x+2;i=zr(this,p,e,n,l,u,h,w,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const b=g,v=g+1,x=g+2;i=zr(this,o,e,n,l,u,h,b,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function tp(r,e,t,n,i,s,o,a){let c;if(e.side===qt?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===ei,a),c===null)return null;kr.copy(a),kr.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(kr);return l<t.near||l>t.far?null:{distance:l,point:kr.clone(),object:r}}function zr(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,Ur),r.getVertexPosition(c,Fr),r.getVertexPosition(l,Or);const u=tp(r,e,t,n,Ur,Fr,Or,Wl);if(u){const h=new L;yn.getBarycoord(Wl,Ur,Fr,Or,h),i&&(u.uv=yn.getInterpolatedAttribute(i,a,c,l,h,new pe)),s&&(u.uv1=yn.getInterpolatedAttribute(s,a,c,l,h,new pe)),o&&(u.normal=yn.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};yn.getNormal(Ur,Fr,Or,f.normal),u.face=f,u.barycoord=h}return u}class Si extends Et{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,s,0),m("z","y","x",1,-1,n,t,-e,o,s,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(h,2));function m(_,g,p,b,v,x,R,w,A,I,S){const M=x/A,C=R/I,U=x/2,k=R/2,z=w/2,W=A+1,q=I+1;let Q=0,X=0;const oe=new L;for(let ge=0;ge<q;ge++){const xe=ge*C-k;for(let ze=0;ze<W;ze++){const Xe=ze*M-U;oe[_]=Xe*b,oe[g]=xe*v,oe[p]=z,l.push(oe.x,oe.y,oe.z),oe[_]=0,oe[g]=0,oe[p]=w>0?1:-1,u.push(oe.x,oe.y,oe.z),h.push(ze/A),h.push(1-ge/I),Q+=1}}for(let ge=0;ge<I;ge++)for(let xe=0;xe<A;xe++){const ze=f+xe+W*ge,Xe=f+xe+W*(ge+1),Je=f+(xe+1)+W*(ge+1),qe=f+(xe+1)+W*ge;c.push(ze,Xe,qe),c.push(Xe,Je,qe),X+=6}a.addGroup(d,X,S),d+=X,f+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Wt(r){const e={};for(let t=0;t<r.length;t++){const n=As(r[t]);for(const i in n)e[i]=n[i]}return e}function np(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Tu(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const ip={clone:As,merge:Wt};var sp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ti extends fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sp,this.fragmentShader=rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=np(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class bu extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new L,Xl=new pe,ql=new pe;class Ut extends bu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Xl,ql),t.subVectors(ql,Xl)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const rs=-90,os=1;class op extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ut(rs,os,e,t);i.layers=this.layers,this.add(i);const s=new Ut(rs,os,e,t);s.layers=this.layers,this.add(s);const o=new Ut(rs,os,e,t);o.layers=this.layers,this.add(o);const a=new Ut(rs,os,e,t);a.layers=this.layers,this.add(a);const c=new Ut(rs,os,e,t);c.layers=this.layers,this.add(c);const l=new Ut(rs,os,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Eu extends Pt{constructor(e=[],t=bs,n,i,s,o,a,c,l,u){super(e,t,n,i,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ap extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Eu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Si(5,5,5),s=new ti({name:"CubemapFromEquirect",uniforms:As(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:gi});s.uniforms.tEquirect.value=t;const o=new rt(i,s),a=t.minFilter;return t.minFilter===Kn&&(t.minFilter=tn),new op(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class _t extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cp={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cp)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Po{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new Po(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class el extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ct,this.environmentIntensity=1,this.environmentRotation=new Ct,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class lp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ac,this.updateRanges=[],this.version=0,this.uuid=un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new L;class tl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new tl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Yl=new L,jl=new it,Kl=new it,hp=new L,$l=new we,Hr=new L,ua=new Fn,Zl=new we,fa=new Co;class wu extends rt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=wl,this.bindMatrix=new we,this.bindMatrixInverse=new we,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Tn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hr),this.boundingBox.expandByPoint(Hr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hr),this.boundingSphere.expandByPoint(Hr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ua.copy(this.boundingSphere),ua.applyMatrix4(i),e.ray.intersectsSphere(ua)!==!1&&(Zl.copy(i).invert(),fa.copy(e.ray).applyMatrix4(Zl),!(this.boundingBox!==null&&fa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,fa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===wl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===od?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;jl.fromBufferAttribute(i.attributes.skinIndex,e),Kl.fromBufferAttribute(i.attributes.skinWeight,e),Yl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Kl.getComponent(s);if(o!==0){const a=jl.getComponent(s);$l.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(hp.copy(Yl).applyMatrix4($l),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class yo extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Au extends Pt{constructor(e=null,t=1,n=1,i,s,o,a,c,l=Yt,u=Yt,h,f){super(null,o,a,c,l,u,i,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jl=new we,up=new we;class Io{constructor(e=[],t=[]){this.uuid=un(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new we)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new we;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:up;Jl.multiplyMatrices(a,t[s]),Jl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Io(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Au(t,e,e,hn,Mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new yo),this.bones.push(o),this.boneInverses.push(new we().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Rc extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const as=new we,Ql=new we,Vr=[],eh=new Tn,fp=new we,ks=new rt,zs=new Fn;class dp extends rt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,fp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),eh.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(eh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),zs.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),e.ray.intersectsSphere(zs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,as),Ql.multiplyMatrices(n,as),ks.matrixWorld=Ql,ks.raycast(e,Vr);for(let o=0,a=Vr.length;o<a;o++){const c=Vr[o];c.instanceId=s,c.object=this,t.push(c)}Vr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Rc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Au(new Float32Array(i*this.count),i,this.count,qc,Mn));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const da=new L,pp=new L,mp=new je;class Li{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=da.subVectors(n,t).cross(pp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(da),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||mp.getNormalMatrix(e),i=this.coplanarPoint(da).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new Fn,gp=new pe(.5,.5),Gr=new L;class nl{constructor(e=new Li,t=new Li,n=new Li,i=new Li,s=new Li,o=new Li){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ln,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],h=s[5],f=s[6],d=s[7],m=s[8],_=s[9],g=s[10],p=s[11],b=s[12],v=s[13],x=s[14],R=s[15];if(i[0].setComponents(l-o,d-u,p-m,R-b).normalize(),i[1].setComponents(l+o,d+u,p+m,R+b).normalize(),i[2].setComponents(l+a,d+h,p+_,R+v).normalize(),i[3].setComponents(l-a,d-h,p-_,R-v).normalize(),n)i[4].setComponents(c,f,g,x).normalize(),i[5].setComponents(l-c,d-f,p-g,R-x).normalize();else if(i[4].setComponents(l-c,d-f,p-g,R-x).normalize(),t===Ln)i[5].setComponents(l+c,d+f,p+g,R+x).normalize();else if(t===xo)i[5].setComponents(c,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);const t=gp.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Gr.x=i.normal.x>0?e.max.x:e.min.x,Gr.y=i.normal.y>0?e.max.y:e.min.y,Gr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Lo extends fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mo=new L,So=new L,th=new we,Hs=new Co,Wr=new Fn,pa=new L,nh=new L;class Do extends pt{constructor(e=new Et,t=new Lo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mo.fromBufferAttribute(t,i-1),So.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mo.distanceTo(So);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(i),Wr.radius+=s,e.ray.intersectsSphere(Wr)===!1)return;th.copy(i).invert(),Hs.copy(e.ray).applyMatrix4(th);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=u.getX(_),b=u.getX(_+1),v=Xr(this,e,Hs,c,p,b,_);v&&t.push(v)}if(this.isLineLoop){const _=u.getX(m-1),g=u.getX(d),p=Xr(this,e,Hs,c,_,g,m-1);p&&t.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=Xr(this,e,Hs,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Xr(this,e,Hs,c,m-1,d,m-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Xr(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Mo.fromBufferAttribute(a,i),So.fromBufferAttribute(a,s),t.distanceSqToSegment(Mo,So,pa,nh)>n)return;pa.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(pa);if(!(l<e.near||l>e.far))return{distance:l,point:nh.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const ih=new L,sh=new L;class Ru extends Do{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)ih.fromBufferAttribute(t,i),sh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ih.distanceTo(sh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _p extends Do{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class fr extends fn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const rh=new we,Cc=new Co,qr=new Fn,Yr=new L;class To extends pt{constructor(e=new Et,t=new fr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(i),qr.radius+=s,e.ray.intersectsSphere(qr)===!1)return;rh.copy(i).invert(),Cc.copy(e.ray).applyMatrix4(rh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,_=d;m<_;m++){const g=l.getX(m);Yr.fromBufferAttribute(h,g),oh(Yr,g,c,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let m=f,_=d;m<_;m++)Yr.fromBufferAttribute(h,m),oh(Yr,m,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function oh(r,e,t,n,i,s,o){const a=Cc.distanceSqToPoint(r);if(a<t){const c=new L;Cc.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Cu extends Pt{constructor(e,t,n=zi,i,s,o,a=Yt,c=Yt,l,u=or,h=1){if(u!==or&&u!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,i,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Pu extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Hi extends Et{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let m=0;const _=[],g=n/2;let p=0;b(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new dt(h,3)),this.setAttribute("normal",new dt(f,3)),this.setAttribute("uv",new dt(d,2));function b(){const x=new L,R=new L;let w=0;const A=(t-e)/n;for(let I=0;I<=s;I++){const S=[],M=I/s,C=M*(t-e)+e;for(let U=0;U<=i;U++){const k=U/i,z=k*c+a,W=Math.sin(z),q=Math.cos(z);R.x=C*W,R.y=-M*n+g,R.z=C*q,h.push(R.x,R.y,R.z),x.set(W,A,q).normalize(),f.push(x.x,x.y,x.z),d.push(k,1-M),S.push(m++)}_.push(S)}for(let I=0;I<i;I++)for(let S=0;S<s;S++){const M=_[S][I],C=_[S+1][I],U=_[S+1][I+1],k=_[S][I+1];(e>0||S!==0)&&(u.push(M,C,k),w+=3),(t>0||S!==s-1)&&(u.push(C,U,k),w+=3)}l.addGroup(p,w,0),p+=w}function v(x){const R=m,w=new pe,A=new L;let I=0;const S=x===!0?e:t,M=x===!0?1:-1;for(let U=1;U<=i;U++)h.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;const C=m;for(let U=0;U<=i;U++){const z=U/i*c+a,W=Math.cos(z),q=Math.sin(z);A.x=S*q,A.y=g*M,A.z=S*W,h.push(A.x,A.y,A.z),f.push(0,M,0),w.x=W*.5+.5,w.y=q*.5*M+.5,d.push(w.x,w.y),m++}for(let U=0;U<i;U++){const k=R+U,z=C+U;x===!0?u.push(z,z+1,k):u.push(z+1,z,k),I+=3}l.addGroup(p,I,x===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rs extends Hi{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Rs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=t||(o.isVector2?new pe:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,i=[],s=[],o=[],a=new L,c=new we;for(let d=0;d<=e;d++){const m=d/e;i[d]=this.getTangentAt(m,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(et(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(et(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],d*m)),o[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class il extends bn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new pe){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class vp extends il{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function sl(){let r=0,e=0,t=0,n=0;function i(s,o,a,c){r=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const jr=new L,ma=new sl,ga=new sl,_a=new sl;class xp extends bn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%s]:(jr.subVectors(i[0],i[1]).add(i[0]),l=jr);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(jr.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=jr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),ma.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,m,_,g),ga.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,m,_,g),_a.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(ma.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),ga.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),_a.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(ma.calc(c),ga.calc(c),_a.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ah(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,c=r*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*r+t}function yp(r,e){const t=1-r;return t*t*e}function Mp(r,e){return 2*(1-r)*r*e}function Sp(r,e){return r*r*e}function Qs(r,e,t,n){return yp(r,e)+Mp(r,t)+Sp(r,n)}function Tp(r,e){const t=1-r;return t*t*t*e}function bp(r,e){const t=1-r;return 3*t*t*r*e}function Ep(r,e){return 3*(1-r)*r*r*e}function wp(r,e){return r*r*r*e}function er(r,e,t,n,i){return Tp(r,e)+bp(r,t)+Ep(r,n)+wp(r,i)}class Iu extends bn{constructor(e=new pe,t=new pe,n=new pe,i=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(er(e,i.x,s.x,o.x,a.x),er(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ap extends bn{constructor(e=new L,t=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(er(e,i.x,s.x,o.x,a.x),er(e,i.y,s.y,o.y,a.y),er(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Lu extends bn{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rp extends bn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Du extends bn{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Qs(e,i.x,s.x,o.x),Qs(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cp extends bn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(Qs(e,i.x,s.x,o.x),Qs(e,i.y,s.y,o.y),Qs(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nu extends bn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(ah(a,c.x,l.x,u.x,h.x),ah(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new pe().fromArray(i))}return this}}var Pc=Object.freeze({__proto__:null,ArcCurve:vp,CatmullRomCurve3:xp,CubicBezierCurve:Iu,CubicBezierCurve3:Ap,EllipseCurve:il,LineCurve:Lu,LineCurve3:Rp,QuadraticBezierCurve:Du,QuadraticBezierCurve3:Cp,SplineCurve:Nu});class Pp extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Pc[i.type]().fromJSON(i))}return this}}class Ic extends Pp{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Lu(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Du(this.currentPoint.clone(),new pe(e,t),new pe(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new Iu(this.currentPoint.clone(),new pe(e,t),new pe(n,i),new pe(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Nu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,i,s,o,a,c),this}absellipse(e,t,n,i,s,o,a,c){const l=new il(e,t,n,i,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Bi extends Ic{constructor(e){super(e),this.uuid=un(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ic().fromJSON(i))}return this}}function Ip(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Uu(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Fp(r,e,s,t)),r.length>80*t){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let f=t;f<i;f+=t){const d=r[f],m=r[f+1];d<a&&(a=d),m<c&&(c=m),d>u&&(u=d),m>h&&(h=m)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return dr(s,o,t,a,c,l,0),o}function Uu(r,e,t,n,i){let s;if(i===Yp(r,e,t,n)>0)for(let o=e;o<t;o+=n)s=ch(o/n|0,r[o],r[o+1],s);else for(let o=t-n;o>=e;o-=n)s=ch(o/n|0,r[o],r[o+1],s);return s&&Cs(s,s.next)&&(mr(s),s=s.next),s}function Vi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Cs(t,t.next)||bt(t.prev,t,t.next)===0)){if(mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function dr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&Hp(r,n,i,s);let a=r;for(;r.prev!==r.next;){const c=r.prev,l=r.next;if(s?Dp(r,n,i,s):Lp(r)){e.push(c.i,r.i,l.i),mr(r),r=l.next,a=l.next;continue}if(r=l,r===a){o?o===1?(r=Np(Vi(r),e),dr(r,e,t,n,i,s,2)):o===2&&Up(r,e,t,n,i,s):dr(Vi(r),e,t,n,i,s,1);break}}}function Lp(r){const e=r.prev,t=r,n=r.next;if(bt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=Math.min(i,s,o),h=Math.min(a,c,l),f=Math.max(i,s,o),d=Math.max(a,c,l);let m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=f&&m.y>=h&&m.y<=d&&Ks(i,a,s,c,o,l,m.x,m.y)&&bt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Dp(r,e,t,n){const i=r.prev,s=r,o=r.next;if(bt(i,s,o)>=0)return!1;const a=i.x,c=s.x,l=o.x,u=i.y,h=s.y,f=o.y,d=Math.min(a,c,l),m=Math.min(u,h,f),_=Math.max(a,c,l),g=Math.max(u,h,f),p=Lc(d,m,e,t,n),b=Lc(_,g,e,t,n);let v=r.prevZ,x=r.nextZ;for(;v&&v.z>=p&&x&&x.z<=b;){if(v.x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Ks(a,u,c,h,l,f,v.x,v.y)&&bt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Ks(a,u,c,h,l,f,x.x,x.y)&&bt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Ks(a,u,c,h,l,f,v.x,v.y)&&bt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=b;){if(x.x>=d&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Ks(a,u,c,h,l,f,x.x,x.y)&&bt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Np(r,e){let t=r;do{const n=t.prev,i=t.next.next;!Cs(n,i)&&Ou(n,t,t.next,i)&&pr(n,i)&&pr(i,n)&&(e.push(n.i,t.i,i.i),mr(t),mr(t.next),t=r=i),t=t.next}while(t!==r);return Vi(t)}function Up(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Wp(o,a)){let c=Bu(o,a);o=Vi(o,o.next),c=Vi(c,c.next),dr(o,e,t,n,i,s,0),dr(c,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Fp(r,e,t,n){const i=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*n,c=s<o-1?e[s+1]*n:r.length,l=Uu(r,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Gp(l))}i.sort(Op);for(let s=0;s<i.length;s++)t=Bp(i[s],t);return t}function Op(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Bp(r,e){const t=kp(r,e);if(!t)return e;const n=Bu(t,r);return Vi(n,n.next),Vi(t,t.next)}function kp(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,o;if(Cs(r,t))return t;do{if(Cs(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const h=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Fu(i<l?n:s,i,c,l,i<l?s:n,i,t.x,t.y)){const h=Math.abs(i-t.y)/(n-t.x);pr(t,r)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&zp(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function zp(r,e){return bt(r.prev,r,e.prev)<0&&bt(e.next,r,r.next)<0}function Hp(r,e,t,n){let i=r;do i.z===0&&(i.z=Lc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Vp(i)}function Vp(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,t*=2}while(e>1);return r}function Lc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Gp(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Fu(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function Ks(r,e,t,n,i,s,o,a){return!(r===o&&e===a)&&Fu(r,e,t,n,i,s,o,a)}function Wp(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Xp(r,e)&&(pr(r,e)&&pr(e,r)&&qp(r,e)&&(bt(r.prev,r,e.prev)||bt(r,e.prev,e))||Cs(r,e)&&bt(r.prev,r,r.next)>0&&bt(e.prev,e,e.next)>0)}function bt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Cs(r,e){return r.x===e.x&&r.y===e.y}function Ou(r,e,t,n){const i=$r(bt(r,e,t)),s=$r(bt(r,e,n)),o=$r(bt(t,n,r)),a=$r(bt(t,n,e));return!!(i!==s&&o!==a||i===0&&Kr(r,t,e)||s===0&&Kr(r,n,e)||o===0&&Kr(t,r,n)||a===0&&Kr(t,e,n))}function Kr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function $r(r){return r>0?1:r<0?-1:0}function Xp(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Ou(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function pr(r,e){return bt(r.prev,r,r.next)<0?bt(r,e,r.next)>=0&&bt(r,r.prev,e)>=0:bt(r,e,r.prev)<0||bt(r,r.next,e)<0}function qp(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Bu(r,e){const t=Dc(r.i,r.x,r.y),n=Dc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function ch(r,e,t,n){const i=Dc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function mr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Dc(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yp(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class jp{static triangulate(e,t,n=2){return Ip(e,t,n)}}class mi{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return mi.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];lh(e),hh(n,e);let o=e.length;t.forEach(lh);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,hh(n,t[c]);const a=jp.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function lh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function hh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class No extends Et{constructor(e=new Bi([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new dt(i,3)),this.setAttribute("uv",new dt(s,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Kp;let v,x=!1,R,w,A,I;p&&(v=p.getSpacedPoints(u),x=!0,f=!1,R=p.computeFrenetFrames(u,!1),w=new L,A=new L,I=new L),f||(g=0,d=0,m=0,_=0);const S=a.extractPoints(l);let M=S.shape;const C=S.holes;if(!mi.isClockWise(M)){M=M.reverse();for(let H=0,B=C.length;H<B;H++){const j=C[H];mi.isClockWise(j)&&(C[H]=j.reverse())}}function k(H){const j=10000000000000001e-36;let $=H[0];for(let ae=1;ae<=H.length;ae++){const se=ae%H.length,ue=H[se],Ue=ue.x-$.x,Fe=ue.y-$.y,E=Ue*Ue+Fe*Fe,y=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs($.x),Math.abs($.y)),D=j*y*y;if(E<=D){H.splice(se,1),ae--;continue}$=ue}}k(M),C.forEach(k);const z=C.length,W=M;for(let H=0;H<z;H++){const B=C[H];M=M.concat(B)}function q(H,B,j){return B||console.error("THREE.ExtrudeGeometry: vec does not exist"),H.clone().addScaledVector(B,j)}const Q=M.length;function X(H,B,j){let $,ae,se;const ue=H.x-B.x,Ue=H.y-B.y,Fe=j.x-H.x,E=j.y-H.y,y=ue*ue+Ue*Ue,D=ue*E-Ue*Fe;if(Math.abs(D)>Number.EPSILON){const K=Math.sqrt(y),re=Math.sqrt(Fe*Fe+E*E),J=B.x-Ue/K,De=B.y+ue/K,de=j.x-E/re,Pe=j.y+Fe/re,Ie=((de-J)*E-(Pe-De)*Fe)/(ue*E-Ue*Fe);$=J+ue*Ie-H.x,ae=De+Ue*Ie-H.y;const ce=$*$+ae*ae;if(ce<=2)return new pe($,ae);se=Math.sqrt(ce/2)}else{let K=!1;ue>Number.EPSILON?Fe>Number.EPSILON&&(K=!0):ue<-Number.EPSILON?Fe<-Number.EPSILON&&(K=!0):Math.sign(Ue)===Math.sign(E)&&(K=!0),K?($=-Ue,ae=ue,se=Math.sqrt(y)):($=ue,ae=Ue,se=Math.sqrt(y/2))}return new pe($/se,ae/se)}const oe=[];for(let H=0,B=W.length,j=B-1,$=H+1;H<B;H++,j++,$++)j===B&&(j=0),$===B&&($=0),oe[H]=X(W[H],W[j],W[$]);const ge=[];let xe,ze=oe.concat();for(let H=0,B=z;H<B;H++){const j=C[H];xe=[];for(let $=0,ae=j.length,se=ae-1,ue=$+1;$<ae;$++,se++,ue++)se===ae&&(se=0),ue===ae&&(ue=0),xe[$]=X(j[$],j[se],j[ue]);ge.push(xe),ze=ze.concat(xe)}let Xe;if(g===0)Xe=mi.triangulateShape(W,C);else{const H=[],B=[];for(let j=0;j<g;j++){const $=j/g,ae=d*Math.cos($*Math.PI/2),se=m*Math.sin($*Math.PI/2)+_;for(let ue=0,Ue=W.length;ue<Ue;ue++){const Fe=q(W[ue],oe[ue],se);Ce(Fe.x,Fe.y,-ae),$===0&&H.push(Fe)}for(let ue=0,Ue=z;ue<Ue;ue++){const Fe=C[ue];xe=ge[ue];const E=[];for(let y=0,D=Fe.length;y<D;y++){const K=q(Fe[y],xe[y],se);Ce(K.x,K.y,-ae),$===0&&E.push(K)}$===0&&B.push(E)}}Xe=mi.triangulateShape(H,B)}const Je=Xe.length,qe=m+_;for(let H=0;H<Q;H++){const B=f?q(M[H],ze[H],qe):M[H];x?(A.copy(R.normals[0]).multiplyScalar(B.x),w.copy(R.binormals[0]).multiplyScalar(B.y),I.copy(v[0]).add(A).add(w),Ce(I.x,I.y,I.z)):Ce(B.x,B.y,0)}for(let H=1;H<=u;H++)for(let B=0;B<Q;B++){const j=f?q(M[B],ze[B],qe):M[B];x?(A.copy(R.normals[H]).multiplyScalar(j.x),w.copy(R.binormals[H]).multiplyScalar(j.y),I.copy(v[H]).add(A).add(w),Ce(I.x,I.y,I.z)):Ce(j.x,j.y,h/u*H)}for(let H=g-1;H>=0;H--){const B=H/g,j=d*Math.cos(B*Math.PI/2),$=m*Math.sin(B*Math.PI/2)+_;for(let ae=0,se=W.length;ae<se;ae++){const ue=q(W[ae],oe[ae],$);Ce(ue.x,ue.y,h+j)}for(let ae=0,se=C.length;ae<se;ae++){const ue=C[ae];xe=ge[ae];for(let Ue=0,Fe=ue.length;Ue<Fe;Ue++){const E=q(ue[Ue],xe[Ue],$);x?Ce(E.x,E.y+v[u-1].y,v[u-1].x+j):Ce(E.x,E.y,h+j)}}}ee(),ne();function ee(){const H=i.length/3;if(f){let B=0,j=Q*B;for(let $=0;$<Je;$++){const ae=Xe[$];V(ae[2]+j,ae[1]+j,ae[0]+j)}B=u+g*2,j=Q*B;for(let $=0;$<Je;$++){const ae=Xe[$];V(ae[0]+j,ae[1]+j,ae[2]+j)}}else{for(let B=0;B<Je;B++){const j=Xe[B];V(j[2],j[1],j[0])}for(let B=0;B<Je;B++){const j=Xe[B];V(j[0]+Q*u,j[1]+Q*u,j[2]+Q*u)}}n.addGroup(H,i.length/3-H,0)}function ne(){const H=i.length/3;let B=0;Me(W,B),B+=W.length;for(let j=0,$=C.length;j<$;j++){const ae=C[j];Me(ae,B),B+=ae.length}n.addGroup(H,i.length/3-H,1)}function Me(H,B){let j=H.length;for(;--j>=0;){const $=j;let ae=j-1;ae<0&&(ae=H.length-1);for(let se=0,ue=u+g*2;se<ue;se++){const Ue=Q*se,Fe=Q*(se+1),E=B+$+Ue,y=B+ae+Ue,D=B+ae+Fe,K=B+$+Fe;ie(E,y,D,K)}}}function Ce(H,B,j){c.push(H),c.push(B),c.push(j)}function V(H,B,j){Te(H),Te(B),Te(j);const $=i.length/3,ae=b.generateTopUV(n,i,$-3,$-2,$-1);P(ae[0]),P(ae[1]),P(ae[2])}function ie(H,B,j,$){Te(H),Te(B),Te($),Te(B),Te(j),Te($);const ae=i.length/3,se=b.generateSideWallUV(n,i,ae-6,ae-3,ae-2,ae-1);P(se[0]),P(se[1]),P(se[3]),P(se[1]),P(se[2]),P(se[3])}function Te(H){i.push(c[H*3+0]),i.push(c[H*3+1]),i.push(c[H*3+2])}function P(H){s.push(H.x),s.push(H.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $p(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Pc[i.type]().fromJSON(i)),new No(n,e.options)}}const Kp={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[i*3],u=e[i*3+1];return[new pe(s,o),new pe(a,c),new pe(l,u)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],m=e[i*3+2],_=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new pe(o,1-c),new pe(l,1-h),new pe(f,1-m),new pe(_,1-p)]:[new pe(a,1-c),new pe(u,1-h),new pe(d,1-m),new pe(g,1-p)]}};function $p(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Uo extends Et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=e/a,f=t/c,d=[],m=[],_=[],g=[];for(let p=0;p<u;p++){const b=p*f-o;for(let v=0;v<l;v++){const x=v*h-s;m.push(x,-b,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){const v=b+l*p,x=b+l*(p+1),R=b+1+l*(p+1),w=b+1+l*p;d.push(v,x,w),d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uo(e.width,e.height,e.widthSegments,e.heightSegments)}}class yi extends Et{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,d=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const b=[],v=p/n;let x=0;p===0&&o===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const w=R/t;h.x=-e*Math.cos(i+w*s)*Math.sin(o+v*a),h.y=e*Math.cos(o+v*a),h.z=e*Math.sin(i+w*s)*Math.sin(o+v*a),m.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),g.push(w+x,1-v),b.push(l++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const v=u[p][b+1],x=u[p][b],R=u[p+1][b],w=u[p+1][b+1];(p!==0||o>0)&&d.push(v,x,w),(p!==n-1||c<Math.PI)&&d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qn extends Et{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],u=new L,h=new L,f=new L;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){const _=m/i*s,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(m/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){const _=(i+1)*d+m-1,g=(i+1)*(d-1)+m-1,p=(i+1)*(d-1)+m,b=(i+1)*d+m;o.push(_,g,b),o.push(g,p,b)}this.setIndex(o),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Nn extends fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ct,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class On extends Nn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return et(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Zr extends fn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new be(16777215),this.specular=new be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ct,this.combine=wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zp extends fn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ro,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ct,this.combine=wo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jp extends fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qp extends fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Jr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function em(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function tm(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function uh(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function ku(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class vr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nm extends vr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ds,endingEnd:ds}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ps:s=e,a=2*t-n;break;case _o:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ps:o=e,c=2*n-t;break;case _o:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),_=m*m,g=_*m,p=-f*g+2*f*_-f*m,b=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,v=(-1-d)*g+(1.5+d)*_+.5*m,x=d*g-d*_;for(let R=0;R!==a;++R)s[R]=p*o[u+R]+b*o[l+R]+v*o[c+R]+x*o[h+R];return s}}class zu extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*h+o[c+f]*u;return s}}class im extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class En{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Jr(t,this.TimeBufferType),this.values=Jr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Jr(e.times,Array),values:Jr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new im(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new zu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case cr:t=this.InterpolantFactoryMethodDiscrete;break;case lr:t=this.InterpolantFactoryMethodLinear;break;case Go:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return lr;case this.InterpolantFactoryMethodSmooth:return Go}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&em(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Go,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(i)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let m=0;m!==n;++m){const _=t[h+m];if(_!==t[f+m]||_!==t[d+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}En.prototype.ValueTypeName="";En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=lr;class Is extends En{constructor(e,t,n){super(e,t,n)}}Is.prototype.ValueTypeName="bool";Is.prototype.ValueBufferType=Array;Is.prototype.DefaultInterpolation=cr;Is.prototype.InterpolantFactoryMethodLinear=void 0;Is.prototype.InterpolantFactoryMethodSmooth=void 0;class Hu extends En{constructor(e,t,n,i){super(e,t,n,i)}}Hu.prototype.ValueTypeName="color";class ni extends En{constructor(e,t,n,i){super(e,t,n,i)}}ni.prototype.ValueTypeName="number";class sm extends vr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let u=l+a;l!==u;l+=4)Mt.slerpFlat(s,0,o,l-a,o,l,c);return s}}class ii extends En{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new sm(this.times,this.values,this.getValueSize(),e)}}ii.prototype.ValueTypeName="quaternion";ii.prototype.InterpolantFactoryMethodSmooth=void 0;class Ls extends En{constructor(e,t,n){super(e,t,n)}}Ls.prototype.ValueTypeName="string";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=cr;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;class Gi extends En{constructor(e,t,n,i){super(e,t,n,i)}}Gi.prototype.ValueTypeName="vector";class Ps{constructor(e="",t=-1,n=[],i=$c){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=un(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(om(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(En.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=tm(c);c=uh(c,1,u),l=uh(l,1,u),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new ni(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,m,_){if(d.length!==0){const g=[],p=[];ku(d,g,p,m),g.length!==0&&_.push(new h(f,g,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let _=0;_<f[m].morphTargets.length;_++)d[f[m].morphTargets[_]]=-1;for(const _ in d){const g=[],p=[];for(let b=0;b!==f[m].morphTargets.length;++b){const v=f[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}i.push(new ni(".morphTargetInfluence["+_+"]",g,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(Gi,d+".position",f,"pos",i),n(ii,d+".quaternion",f,"rot",i),n(Gi,d+".scale",f,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function rm(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ni;case"vector":case"vector2":case"vector3":case"vector4":return Gi;case"color":return Hu;case"quaternion":return ii;case"bool":case"boolean":return Is;case"string":return Ls}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function om(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=rm(r.type);if(r.times===void 0){const t=[],n=[];ku(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const $n={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class am{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],m=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const cm=new am;class Un{constructor(e){this.manager=e!==void 0?e:cm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Un.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wn={};class lm extends Error{constructor(e,t){super(e),this.response=t}}class Fo extends Un{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=$n.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Wn[e]!==void 0){Wn[e].push({onLoad:t,onProgress:n,onError:i});return}Wn[e]=[],Wn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Wn[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,m=d!==0;let _=0;const g=new ReadableStream({start(p){b();function b(){h.read().then(({done:v,value:x})=>{if(v)p.close();else{_+=x.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:d});for(let w=0,A=u.length;w<A;w++){const I=u[w];I.onProgress&&I.onProgress(R)}p.enqueue(x),b()}},v=>{p.error(v)})}}});return new Response(g)}else throw new lm(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{$n.add(`file:${e}`,l);const u=Wn[e];delete Wn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=Wn[e];if(u===void 0)throw this.manager.itemError(e),l;delete Wn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const cs=new WeakMap;class hm extends Un{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=$n.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let h=cs.get(o);h===void 0&&(h=[],cs.set(o,h)),h.push({onLoad:t,onError:i})}return o}const a=hr("img");function c(){u(),t&&t(this);const h=cs.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}cs.delete(this),s.manager.itemEnd(e)}function l(h){u(),i&&i(h),$n.remove(`image:${e}`);const f=cs.get(this)||[];for(let d=0;d<f.length;d++){const m=f[d];m.onError&&m.onError(h)}cs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),$n.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class rl extends Un{constructor(e){super(e)}load(e,t,n,i){const s=new Pt,o=new hm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class xr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ol extends xr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const va=new we,fh=new L,dh=new L;class al{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nl,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fh.setFromMatrixPosition(e.matrixWorld),t.position.copy(fh),dh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dh),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class um extends al{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ws*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Vu extends xr{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new um}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ph=new we,Vs=new L,xa=new L;class fm extends al{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vs),xa.copy(n.position),xa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xa),n.updateMatrixWorld(),i.makeTranslation(-Vs.x,-Vs.y,-Vs.z),ph.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ph,n.coordinateSystem,n.reversedDepth)}}class bo extends xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new fm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class cl extends bu{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class dm extends al{constructor(){super(new cl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yr extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new dm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class pm extends xr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ms{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ya=new WeakMap;class mm extends Un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=$n.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{if(ya.has(o)===!0)i&&i(ya.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return $n.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ya.set(c,l),$n.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});$n.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class gm extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class _m{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Mt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;Mt.multiplyQuaternionsFlat(e,o,e,t,e,n),Mt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const ll="\\[\\]\\.:\\/",vm=new RegExp("["+ll+"]","g"),hl="[^"+ll+"]",xm="[^"+ll.replace("\\.","")+"]",ym=/((?:WC+[\/:])*)/.source.replace("WC",hl),Mm=/(WCOD+)?/.source.replace("WCOD",xm),Sm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hl),Tm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hl),bm=new RegExp("^"+ym+Mm+Sm+Tm+"$"),Em=["material","materials","bones","map"];class wm{constructor(e,t,n){const i=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vm,"")}static parseTrackName(e){const t=bm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Em.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=wm;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Am{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:ds,endingEnd:ds};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ad,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case ld:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case $c:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===cd;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===mu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ps,i.endingEnd=ps):(e?i.endingStart=this.zeroSlopeAtStart?ps:ds:i.endingStart=_o,t?i.endingEnd=this.zeroSlopeAtEnd?ps:ds:i.endingEnd=_o)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const Rm=new Float32Array(1);class Gu extends Wi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==s;++h){const f=i[h],d=f.name;let m=u[d];if(m!==void 0)++m.referenceCount,o[h]=m;else{if(m=o[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,d));continue}const _=t&&t._propertyBindings[h].binding.parsedPath;m=new _m(st.create(n,d,_),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,d),o[h]=m}a[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new zu(new Float32Array(2),new Float32Array(2),1,Rm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?Ps.findByName(i,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=$c),c!==void 0){const h=c.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new Am(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Ps.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Cm{constructor(){this.type="ShapePath",this.color=new be,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Ic,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,s,o){return this.currentPath.bezierCurveTo(e,t,n,i,s,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){const b=[];for(let v=0,x=p.length;v<x;v++){const R=p[v],w=new Bi;w.curves=R.curves,b.push(w)}return b}function n(p,b){const v=b.length;let x=!1;for(let R=v-1,w=0;w<v;R=w++){let A=b[R],I=b[w],S=I.x-A.x,M=I.y-A.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(A=b[w],S=-S,I=b[R],M=-M),p.y<A.y||p.y>I.y)continue;if(p.y===A.y){if(p.x===A.x)return!0}else{const C=M*(p.x-A.x)-S*(p.y-A.y);if(C===0)return!0;if(C<0)continue;x=!x}}else{if(p.y!==A.y)continue;if(I.x<=p.x&&p.x<=A.x||A.x<=p.x&&p.x<=I.x)return!0}}return x}const i=mi.isClockWise,s=this.subPaths;if(s.length===0)return[];let o,a,c;const l=[];if(s.length===1)return a=s[0],c=new Bi,c.curves=a.curves,l.push(c),l;let u=!i(s[0].getPoints());u=e?!u:u;const h=[],f=[];let d=[],m=0,_;f[m]=void 0,d[m]=[];for(let p=0,b=s.length;p<b;p++)a=s[p],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!u&&f[m]&&m++,f[m]={s:new Bi,p:_},f[m].s.curves=a.curves,u&&m++,d[m]=[]):d[m].push({h:a,p:_[0]});if(!f[0])return t(s);if(f.length>1){let p=!1,b=0;for(let v=0,x=f.length;v<x;v++)h[v]=[];for(let v=0,x=f.length;v<x;v++){const R=d[v];for(let w=0;w<R.length;w++){const A=R[w];let I=!0;for(let S=0;S<f.length;S++)n(A.p,f[S].p)&&(v!==S&&b++,I?(I=!1,h[S].push(A)):p=!0);I&&h[v].push(A)}}b>0&&p===!1&&(d=h)}let g;for(let p=0,b=f.length;p<b;p++){c=f[p].s,l.push(c),g=d[p];for(let v=0,x=g.length;v<x;v++)c.holes.push(g[v].h)}return l}}function mh(r,e,t,n){const i=Pm(n);switch(t){case fu:return r*e;case qc:return r*e/i.components*i.byteLength;case Yc:return r*e/i.components*i.byteLength;case pu:return r*e*2/i.components*i.byteLength;case jc:return r*e*2/i.components*i.byteLength;case du:return r*e*3/i.components*i.byteLength;case hn:return r*e*4/i.components*i.byteLength;case Kc:return r*e*4/i.components*i.byteLength;case oo:case ao:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case co:case lo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Qa:case tc:return Math.max(r,16)*Math.max(e,8)/4;case Ja:case ec:return Math.max(r,8)*Math.max(e,8)/2;case nc:case ic:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case sc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case rc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case oc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case ac:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case cc:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case lc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case hc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case uc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case fc:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case dc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case pc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case mc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case gc:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case _c:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case vc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case xc:case yc:case Mc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Sc:case Tc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case bc:case Ec:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Pm(r){switch(r){case Dn:case cu:return{byteLength:1,components:1};case sr:case lu:case _r:return{byteLength:2,components:1};case Wc:case Xc:return{byteLength:2,components:4};case zi:case Gc:case Mn:return{byteLength:4,components:1};case hu:case uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vc);function Wu(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Im(r){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(r.bindBuffer(l,a),h.length===0)r.bufferSubData(l,0,u);else{h.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<h.length;d++){const m=h[f],_=h[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,m=h.length;d<m;d++){const _=h[d];r.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(r.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var Lm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Um=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Om=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,km=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,tg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ng=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ig=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",lg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ug=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ig=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$g=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,e0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,t0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,n0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,i0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,r0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,o0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,m0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,g0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,x0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,M0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,S0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,E0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,w0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,P0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,L0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,B0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,k0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,z0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,J0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Q0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,n_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,o_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,a_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,l_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:Lm,alphahash_pars_fragment:Dm,alphamap_fragment:Nm,alphamap_pars_fragment:Um,alphatest_fragment:Fm,alphatest_pars_fragment:Om,aomap_fragment:Bm,aomap_pars_fragment:km,batching_pars_vertex:zm,batching_vertex:Hm,begin_vertex:Vm,beginnormal_vertex:Gm,bsdfs:Wm,iridescence_fragment:Xm,bumpmap_pars_fragment:qm,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Km,clipping_planes_vertex:$m,color_fragment:Zm,color_pars_fragment:Jm,color_pars_vertex:Qm,color_vertex:eg,common:tg,cube_uv_reflection_fragment:ng,defaultnormal_vertex:ig,displacementmap_pars_vertex:sg,displacementmap_vertex:rg,emissivemap_fragment:og,emissivemap_pars_fragment:ag,colorspace_fragment:cg,colorspace_pars_fragment:lg,envmap_fragment:hg,envmap_common_pars_fragment:ug,envmap_pars_fragment:fg,envmap_pars_vertex:dg,envmap_physical_pars_fragment:bg,envmap_vertex:pg,fog_vertex:mg,fog_pars_vertex:gg,fog_fragment:_g,fog_pars_fragment:vg,gradientmap_pars_fragment:xg,lightmap_pars_fragment:yg,lights_lambert_fragment:Mg,lights_lambert_pars_fragment:Sg,lights_pars_begin:Tg,lights_toon_fragment:Eg,lights_toon_pars_fragment:wg,lights_phong_fragment:Ag,lights_phong_pars_fragment:Rg,lights_physical_fragment:Cg,lights_physical_pars_fragment:Pg,lights_fragment_begin:Ig,lights_fragment_maps:Lg,lights_fragment_end:Dg,logdepthbuf_fragment:Ng,logdepthbuf_pars_fragment:Ug,logdepthbuf_pars_vertex:Fg,logdepthbuf_vertex:Og,map_fragment:Bg,map_pars_fragment:kg,map_particle_fragment:zg,map_particle_pars_fragment:Hg,metalnessmap_fragment:Vg,metalnessmap_pars_fragment:Gg,morphinstance_vertex:Wg,morphcolor_vertex:Xg,morphnormal_vertex:qg,morphtarget_pars_vertex:Yg,morphtarget_vertex:jg,normal_fragment_begin:Kg,normal_fragment_maps:$g,normal_pars_fragment:Zg,normal_pars_vertex:Jg,normal_vertex:Qg,normalmap_pars_fragment:e0,clearcoat_normal_fragment_begin:t0,clearcoat_normal_fragment_maps:n0,clearcoat_pars_fragment:i0,iridescence_pars_fragment:s0,opaque_fragment:r0,packing:o0,premultiplied_alpha_fragment:a0,project_vertex:c0,dithering_fragment:l0,dithering_pars_fragment:h0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:f0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:p0,shadowmap_vertex:m0,shadowmask_pars_fragment:g0,skinbase_vertex:_0,skinning_pars_vertex:v0,skinning_vertex:x0,skinnormal_vertex:y0,specularmap_fragment:M0,specularmap_pars_fragment:S0,tonemapping_fragment:T0,tonemapping_pars_fragment:b0,transmission_fragment:E0,transmission_pars_fragment:w0,uv_pars_fragment:A0,uv_pars_vertex:R0,uv_vertex:C0,worldpos_vertex:P0,background_vert:I0,background_frag:L0,backgroundCube_vert:D0,backgroundCube_frag:N0,cube_vert:U0,cube_frag:F0,depth_vert:O0,depth_frag:B0,distanceRGBA_vert:k0,distanceRGBA_frag:z0,equirect_vert:H0,equirect_frag:V0,linedashed_vert:G0,linedashed_frag:W0,meshbasic_vert:X0,meshbasic_frag:q0,meshlambert_vert:Y0,meshlambert_frag:j0,meshmatcap_vert:K0,meshmatcap_frag:$0,meshnormal_vert:Z0,meshnormal_frag:J0,meshphong_vert:Q0,meshphong_frag:e_,meshphysical_vert:t_,meshphysical_frag:n_,meshtoon_vert:i_,meshtoon_frag:s_,points_vert:r_,points_frag:o_,shadow_vert:a_,shadow_frag:c_,sprite_vert:l_,sprite_frag:h_},_e={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Cn={basic:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new be(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Wt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Wt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Wt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new be(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Wt([_e.points,_e.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Wt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Wt([_e.common,_e.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Wt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Wt([_e.sprite,_e.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Wt([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Wt([_e.lights,_e.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Cn.physical={uniforms:Wt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Qr={r:0,b:0,g:0},Ci=new Ct,u_=new we;function f_(r,e,t,n,i,s,o){const a=new be(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function m(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const R=m(v);R===null?p(a,c):R&&R.isColor&&(p(R,1),x=!0);const w=r.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(v,x){const R=m(x);R&&(R.isCubeTexture||R.mapping===Ao)?(u===void 0&&(u=new rt(new Si(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:As(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ci.copy(x.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(u_.makeRotationFromEuler(Ci)),u.material.toneMapped=Ke.getTransfer(R.colorSpace)!==ft,(h!==R||f!==R.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=R,f=R.version,d=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new rt(new Uo(2,2),new ti({name:"BackgroundMaterial",uniforms:As(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(R.colorSpace)!==ft,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(h!==R||f!==R.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=R,f=R.version,d=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,x){v.getRGB(Qr,Tu(r)),n.buffers.color.setClear(Qr.r,Qr.g,Qr.b,x,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:_,addToRenderList:g,dispose:b}}function d_(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,C,U,k,z){let W=!1;const q=h(k,U,C);s!==q&&(s=q,l(s.object)),W=d(M,k,U,z),W&&m(M,k,U,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(M,C,U,k),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function u(M){return r.deleteVertexArray(M)}function h(M,C,U){const k=U.wireframe===!0;let z=n[M.id];z===void 0&&(z={},n[M.id]=z);let W=z[C.id];W===void 0&&(W={},z[C.id]=W);let q=W[k];return q===void 0&&(q=f(c()),W[k]=q),q}function f(M){const C=[],U=[],k=[];for(let z=0;z<t;z++)C[z]=0,U[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:k,object:M,attributes:{},index:null}}function d(M,C,U,k){const z=s.attributes,W=C.attributes;let q=0;const Q=U.getAttributes();for(const X in Q)if(Q[X].location>=0){const ge=z[X];let xe=W[X];if(xe===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),ge===void 0||ge.attribute!==xe||xe&&ge.data!==xe.data)return!0;q++}return s.attributesNum!==q||s.index!==k}function m(M,C,U,k){const z={},W=C.attributes;let q=0;const Q=U.getAttributes();for(const X in Q)if(Q[X].location>=0){let ge=W[X];ge===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor));const xe={};xe.attribute=ge,ge&&ge.data&&(xe.data=ge.data),z[X]=xe,q++}s.attributes=z,s.attributesNum=q,s.index=k}function _(){const M=s.newAttributes;for(let C=0,U=M.length;C<U;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){const U=s.newAttributes,k=s.enabledAttributes,z=s.attributeDivisors;U[M]=1,k[M]===0&&(r.enableVertexAttribArray(M),k[M]=1),z[M]!==C&&(r.vertexAttribDivisor(M,C),z[M]=C)}function b(){const M=s.newAttributes,C=s.enabledAttributes;for(let U=0,k=C.length;U<k;U++)C[U]!==M[U]&&(r.disableVertexAttribArray(U),C[U]=0)}function v(M,C,U,k,z,W,q){q===!0?r.vertexAttribIPointer(M,C,U,z,W):r.vertexAttribPointer(M,C,U,k,z,W)}function x(M,C,U,k){_();const z=k.attributes,W=U.getAttributes(),q=C.defaultAttributeValues;for(const Q in W){const X=W[Q];if(X.location>=0){let oe=z[Q];if(oe===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),oe!==void 0){const ge=oe.normalized,xe=oe.itemSize,ze=e.get(oe);if(ze===void 0)continue;const Xe=ze.buffer,Je=ze.type,qe=ze.bytesPerElement,ee=Je===r.INT||Je===r.UNSIGNED_INT||oe.gpuType===Gc;if(oe.isInterleavedBufferAttribute){const ne=oe.data,Me=ne.stride,Ce=oe.offset;if(ne.isInstancedInterleavedBuffer){for(let V=0;V<X.locationSize;V++)p(X.location+V,ne.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let V=0;V<X.locationSize;V++)g(X.location+V);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let V=0;V<X.locationSize;V++)v(X.location+V,xe/X.locationSize,Je,ge,Me*qe,(Ce+xe/X.locationSize*V)*qe,ee)}else{if(oe.isInstancedBufferAttribute){for(let ne=0;ne<X.locationSize;ne++)p(X.location+ne,oe.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ne=0;ne<X.locationSize;ne++)g(X.location+ne);r.bindBuffer(r.ARRAY_BUFFER,Xe);for(let ne=0;ne<X.locationSize;ne++)v(X.location+ne,xe/X.locationSize,Je,ge,xe*qe,xe/X.locationSize*ne*qe,ee)}}else if(q!==void 0){const ge=q[Q];if(ge!==void 0)switch(ge.length){case 2:r.vertexAttrib2fv(X.location,ge);break;case 3:r.vertexAttrib3fv(X.location,ge);break;case 4:r.vertexAttrib4fv(X.location,ge);break;default:r.vertexAttrib1fv(X.location,ge)}}}}b()}function R(){I();for(const M in n){const C=n[M];for(const U in C){const k=C[U];for(const z in k)u(k[z].object),delete k[z];delete C[U]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const U in C){const k=C[U];for(const z in k)u(k[z].object),delete k[z];delete C[U]}delete n[M.id]}function A(M){for(const C in n){const U=n[C];if(U[M.id]===void 0)continue;const k=U[M.id];for(const z in k)u(k[z].object),delete k[z];delete U[M.id]}}function I(){S(),o=!0,s!==i&&(s=i,l(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:b}}function p_(r,e,t){let n;function i(l){n=l}function s(l,u){r.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(r.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let m=0;m<h;m++)d+=u[m];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],u[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*f[_];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function m_(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==hn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===_r&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Dn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mn&&!I)}function c(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:R,maxSamples:w}}function g_(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Li,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=r.get(h);if(!i||m===null||m.length===0||s&&!g)s?u(null):l();else{const b=s?0:n,v=b*4;let x=p.clippingState||null;c.value=x,x=u(m,f,v,d);for(let R=0;R!==v;++R)x[R]=t[R];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,m){const _=h!==null?h.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=d+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=d;v!==_;++v,x+=4)o.copy(h[v]).applyMatrix4(b,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function __(r){let e=new WeakMap;function t(o,a){return a===mo?o.mapping=bs:a===Za&&(o.mapping=Es),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===mo||a===Za)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new ap(c.height);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const ms=4,gh=[.125,.215,.35,.446,.526,.582],Fi=20,Ma=new cl,_h=new be;let Sa=null,Ta=0,ba=0,Ea=!1;const Di=(1+Math.sqrt(5))/2,ls=1/Di,vh=[new L(-Di,ls,0),new L(Di,ls,0),new L(-ls,0,Di),new L(ls,0,Di),new L(0,Di,-ls),new L(0,Di,ls),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],v_=new L;class xh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=v_}=s;Sa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sa,Ta,ba),this._renderer.xr.enabled=Ea,e.scissorTest=!1,eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===Es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:_r,format:hn,colorSpace:jt,depthBuffer:!1},i=yh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=x_(s)),this._blurMaterial=y_(s,e,t)}return i}_compileMaterial(e){const t=new rt(this._lodPlanes[0],e);this._renderer.compile(t,Ma)}_sceneToCubeUV(e,t,n,i,s){const c=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(_h),h.toneMapping=_i,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));const _=new Ot({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),g=new rt(new Si,_);let p=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,p=!0):(_.color.copy(_h),p=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(c.up.set(0,l[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[v],s.y,s.z)):x===1?(c.up.set(0,0,l[v]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[v],s.z)):(c.up.set(0,l[v],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[v]));const R=this._cubeSize;eo(i,x*R,v>2?R:0,R,R),h.setRenderTarget(i),p&&h.render(g,c),h.render(e,c)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===bs||e.mapping===Es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new rt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;eo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ma)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=vh[(i-s-1)%vh.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new rt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Fi-1),_=s/m,g=isFinite(s)?1+Math.floor(u*_):Fi;g>Fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fi}`);const p=[];let b=0;for(let A=0;A<Fi;++A){const I=A/_,S=Math.exp(-I*I/2);p.push(S),A===0?b+=S:A<g&&(b+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;const x=this._sizeLods[i],R=3*x*(i>v-ms?i-v+ms:0),w=4*(this._cubeSize-x);eo(t,R,w,3*x,2*x),c.setRenderTarget(t),c.render(h,Ma)}}function x_(r){const e=[],t=[],n=[];let i=r;const s=r-ms+1+gh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-ms?c=gh[o-r+ms-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,m=6,_=3,g=2,p=1,b=new Float32Array(_*m*d),v=new Float32Array(g*m*d),x=new Float32Array(p*m*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,I=w>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];b.set(S,_*m*w),v.set(f,g*m*w);const M=[w,w,w,w,w,w];x.set(M,p*m*w)}const R=new Et;R.setAttribute("position",new It(b,_)),R.setAttribute("uv",new It(v,g)),R.setAttribute("faceIndex",new It(x,p)),e.push(R),i>ms&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function yh(r,e,t){const n=new xi(r,e,t);return n.texture.mapping=Ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function eo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function y_(r,e,t){const n=new Float32Array(Fi),i=new L(0,1,0);return new ti({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Mh(){return new ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Sh(){return new ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function ul(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function M_(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===mo||c===Za,u=c===bs||c===Es;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new xh(r)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new xh(r)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function S_(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ur("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function T_(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)e.update(f[d],r.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,m=h.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let v=0,x=b.length;v<x;v+=3){const R=b[v+0],w=b[v+1],A=b[v+2];f.push(R,w,w,A,A,R)}}else if(m!==void 0){const b=m.array;_=m.version;for(let v=0,x=b.length/3-1;v<x;v+=3){const R=v+0,w=v+1,A=v+2;f.push(R,w,w,A,A,R)}}else return;const g=new(vu(f)?Su:Qc)(f,1);g.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function b_(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*o),t.update(d,n,1)}function l(f,d,m){m!==0&&(r.drawElementsInstanced(n,d,s,f*o,m),t.update(d,n,m))}function u(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];t.update(g,n,1)}function h(f,d,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,m);let p=0;for(let b=0;b<m;b++)p+=d[b]*_[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function E_(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function w_(r,e,t){const n=new WeakMap,i=new it;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let R=a.attributes.position.count*x,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const A=new Float32Array(R*w*4*h),I=new xu(A,R,w,h);I.type=Mn,I.needsUpdate=!0;const S=x*4;for(let C=0;C<h;C++){const U=p[C],k=b[C],z=v[C],W=R*w*4*C;for(let q=0;q<U.count;q++){const Q=q*S;m===!0&&(i.fromBufferAttribute(U,q),A[W+Q+0]=i.x,A[W+Q+1]=i.y,A[W+Q+2]=i.z,A[W+Q+3]=0),_===!0&&(i.fromBufferAttribute(k,q),A[W+Q+4]=i.x,A[W+Q+5]=i.y,A[W+Q+6]=i.z,A[W+Q+7]=0),g===!0&&(i.fromBufferAttribute(z,q),A[W+Q+8]=i.x,A[W+Q+9]=i.y,A[W+Q+10]=i.z,A[W+Q+11]=z.itemSize===4?i.w:1)}}f={count:h,texture:I,size:new pe(R,w)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function A_(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const Xu=new Pt,Th=new Cu(1,1),qu=new xu,Yu=new Wd,ju=new Eu,bh=[],Eh=[],wh=new Float32Array(16),Ah=new Float32Array(9),Rh=new Float32Array(4);function Ds(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=bh[i];if(s===void 0&&(s=new Float32Array(i),bh[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Lt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Dt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Oo(r,e){let t=Eh[e];t===void 0&&(t=new Int32Array(e),Eh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function R_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function C_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2fv(this.addr,e),Dt(t,e)}}function P_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;r.uniform3fv(this.addr,e),Dt(t,e)}}function I_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4fv(this.addr,e),Dt(t,e)}}function L_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Rh.set(n),r.uniformMatrix2fv(this.addr,!1,Rh),Dt(t,n)}}function D_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;Ah.set(n),r.uniformMatrix3fv(this.addr,!1,Ah),Dt(t,n)}}function N_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,n))return;wh.set(n),r.uniformMatrix4fv(this.addr,!1,wh),Dt(t,n)}}function U_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function F_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2iv(this.addr,e),Dt(t,e)}}function O_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3iv(this.addr,e),Dt(t,e)}}function B_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4iv(this.addr,e),Dt(t,e)}}function k_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function z_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;r.uniform2uiv(this.addr,e),Dt(t,e)}}function H_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;r.uniform3uiv(this.addr,e),Dt(t,e)}}function V_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;r.uniform4uiv(this.addr,e),Dt(t,e)}}function G_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Th.compareFunction=_u,s=Th):s=Xu,t.setTexture2D(e||s,i)}function W_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Yu,i)}function X_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ju,i)}function q_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||qu,i)}function Y_(r){switch(r){case 5126:return R_;case 35664:return C_;case 35665:return P_;case 35666:return I_;case 35674:return L_;case 35675:return D_;case 35676:return N_;case 5124:case 35670:return U_;case 35667:case 35671:return F_;case 35668:case 35672:return O_;case 35669:case 35673:return B_;case 5125:return k_;case 36294:return z_;case 36295:return H_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return G_;case 35679:case 36299:case 36307:return W_;case 35680:case 36300:case 36308:case 36293:return X_;case 36289:case 36303:case 36311:case 36292:return q_}}function j_(r,e){r.uniform1fv(this.addr,e)}function K_(r,e){const t=Ds(e,this.size,2);r.uniform2fv(this.addr,t)}function $_(r,e){const t=Ds(e,this.size,3);r.uniform3fv(this.addr,t)}function Z_(r,e){const t=Ds(e,this.size,4);r.uniform4fv(this.addr,t)}function J_(r,e){const t=Ds(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Q_(r,e){const t=Ds(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ev(r,e){const t=Ds(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function tv(r,e){r.uniform1iv(this.addr,e)}function nv(r,e){r.uniform2iv(this.addr,e)}function iv(r,e){r.uniform3iv(this.addr,e)}function sv(r,e){r.uniform4iv(this.addr,e)}function rv(r,e){r.uniform1uiv(this.addr,e)}function ov(r,e){r.uniform2uiv(this.addr,e)}function av(r,e){r.uniform3uiv(this.addr,e)}function cv(r,e){r.uniform4uiv(this.addr,e)}function lv(r,e,t){const n=this.cache,i=e.length,s=Oo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Xu,s[o])}function hv(r,e,t){const n=this.cache,i=e.length,s=Oo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Yu,s[o])}function uv(r,e,t){const n=this.cache,i=e.length,s=Oo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ju,s[o])}function fv(r,e,t){const n=this.cache,i=e.length,s=Oo(t,i);Lt(n,s)||(r.uniform1iv(this.addr,s),Dt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||qu,s[o])}function dv(r){switch(r){case 5126:return j_;case 35664:return K_;case 35665:return $_;case 35666:return Z_;case 35674:return J_;case 35675:return Q_;case 35676:return ev;case 5124:case 35670:return tv;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return ov;case 36295:return av;case 36296:return cv;case 35678:case 36198:case 36298:case 36306:case 35682:return lv;case 35679:case 36299:case 36307:return hv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return fv}}class pv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Y_(t.type)}}class mv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dv(t.type)}}class gv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function Ch(r,e){r.seq.push(e),r.map[e.id]=e}function _v(r,e,t){const n=r.name,i=n.length;for(wa.lastIndex=0;;){const s=wa.exec(n),o=wa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ch(t,l===void 0?new pv(a,r,e):new mv(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new gv(a),Ch(t,h)),t=h}}}class ho{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);_v(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ph(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const vv=37297;let xv=0;function yv(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Ih=new je;function Mv(r){Ke._getMatrix(Ih,Ke.workingColorSpace,r);const e=`mat3( ${Ih.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(r)){case vo:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Lh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+yv(r.getShaderSource(e),a)}else return s}function Sv(r,e){const t=Mv(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Tv(r,e){let t;switch(e){case ed:t="Linear";break;case td:t="Reinhard";break;case nd:t="Cineon";break;case ru:t="ACESFilmic";break;case sd:t="AgX";break;case rd:t="Neutral";break;case id:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const to=new L;function bv(){Ke.getLuminanceCoefficients(to);const r=to.x.toFixed(4),e=to.y.toFixed(4),t=to.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ev(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function wv(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Av(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function $s(r){return r!==""}function Dh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Rv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nc(r){return r.replace(Rv,Pv)}const Cv=new Map;function Pv(r,e){let t=Ze[e];if(t===void 0){const n=Cv.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nc(t)}const Iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uh(r){return r.replace(Iv,Lv)}function Lv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Fh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Dv(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===iu?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===su?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function Nv(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case bs:case Es:e="ENVMAP_TYPE_CUBE";break;case Ao:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Uv(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Es&&(e="ENVMAP_MODE_REFRACTION"),e}function Fv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case wo:e="ENVMAP_BLENDING_MULTIPLY";break;case Jf:e="ENVMAP_BLENDING_MIX";break;case Qf:e="ENVMAP_BLENDING_ADD";break}return e}function Ov(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Bv(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Dv(t),l=Nv(t),u=Uv(t),h=Fv(t),f=Ov(t),d=Ev(t),m=wv(s),_=i.createProgram();let g,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),p.length>0&&(p+=`
`)):(g=[Fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Ze.tonemapping_pars_fragment:"",t.toneMapping!==_i?Tv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Sv("linearToOutputTexel",t.outputColorSpace),bv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),o=Nc(o),o=Dh(o,t),o=Nh(o,t),a=Nc(a),a=Dh(a,t),a=Nh(a,t),o=Uh(o),a=Uh(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=b+g+o,x=b+p+a,R=Ph(i,i.VERTEX_SHADER,v),w=Ph(i,i.FRAGMENT_SHADER,x);i.attachShader(_,R),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(C){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(_)||"",k=i.getShaderInfoLog(R)||"",z=i.getShaderInfoLog(w)||"",W=U.trim(),q=k.trim(),Q=z.trim();let X=!0,oe=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,R,w);else{const ge=Lh(i,R,"vertex"),xe=Lh(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+ge+`
`+xe)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(q===""||Q==="")&&(oe=!1);oe&&(C.diagnostics={runnable:X,programLog:W,vertexShader:{log:q,prefix:g},fragmentShader:{log:Q,prefix:p}})}i.deleteShader(R),i.deleteShader(w),I=new ho(i,_),S=Av(i,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,vv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}let kv=0;class zv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Hv(e),t.set(e,n)),n}}class Hv{constructor(e){this.id=kv++,this.code=e,this.usedTimes=0}}function Vv(r,e,t,n,i,s,o){const a=new yu,c=new zv,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,C,U,k){const z=U.fog,W=k.geometry,q=S.isMeshStandardMaterial?U.environment:null,Q=(S.isMeshStandardMaterial?t:e).get(S.envMap||q),X=Q&&Q.mapping===Ao?Q.image.height:null,oe=m[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,xe=ge!==void 0?ge.length:0;let ze=0;W.morphAttributes.position!==void 0&&(ze=1),W.morphAttributes.normal!==void 0&&(ze=2),W.morphAttributes.color!==void 0&&(ze=3);let Xe,Je,qe,ee;if(oe){const lt=Cn[oe];Xe=lt.vertexShader,Je=lt.fragmentShader}else Xe=S.vertexShader,Je=S.fragmentShader,c.update(S),qe=c.getVertexShaderID(S),ee=c.getFragmentShaderID(S);const ne=r.getRenderTarget(),Me=r.state.buffers.depth.getReversed(),Ce=k.isInstancedMesh===!0,V=k.isBatchedMesh===!0,ie=!!S.map,Te=!!S.matcap,P=!!Q,H=!!S.aoMap,B=!!S.lightMap,j=!!S.bumpMap,$=!!S.normalMap,ae=!!S.displacementMap,se=!!S.emissiveMap,ue=!!S.metalnessMap,Ue=!!S.roughnessMap,Fe=S.anisotropy>0,E=S.clearcoat>0,y=S.dispersion>0,D=S.iridescence>0,K=S.sheen>0,re=S.transmission>0,J=Fe&&!!S.anisotropyMap,De=E&&!!S.clearcoatMap,de=E&&!!S.clearcoatNormalMap,Pe=E&&!!S.clearcoatRoughnessMap,Ie=D&&!!S.iridescenceMap,ce=D&&!!S.iridescenceThicknessMap,Se=K&&!!S.sheenColorMap,Ve=K&&!!S.sheenRoughnessMap,Ne=!!S.specularMap,ve=!!S.specularColorMap,$e=!!S.specularIntensityMap,N=re&&!!S.transmissionMap,fe=re&&!!S.thicknessMap,me=!!S.gradientMap,Ae=!!S.alphaMap,le=S.alphaTest>0,te=!!S.alphaHash,Le=!!S.extensions;let Ye=_i;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ye=r.toneMapping);const vt={shaderID:oe,shaderType:S.type,shaderName:S.name,vertexShader:Xe,fragmentShader:Je,defines:S.defines,customVertexShaderID:qe,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:V,batchingColor:V&&k._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&k.instanceColor!==null,instancingMorph:Ce&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?r.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:jt,alphaToCoverage:!!S.alphaToCoverage,map:ie,matcap:Te,envMap:P,envMapMode:P&&Q.mapping,envMapCubeUVHeight:X,aoMap:H,lightMap:B,bumpMap:j,normalMap:$,displacementMap:f&&ae,emissiveMap:se,normalMapObjectSpace:$&&S.normalMapType===dd,normalMapTangentSpace:$&&S.normalMapType===Ro,metalnessMap:ue,roughnessMap:Ue,anisotropy:Fe,anisotropyMap:J,clearcoat:E,clearcoatMap:De,clearcoatNormalMap:de,clearcoatRoughnessMap:Pe,dispersion:y,iridescence:D,iridescenceMap:Ie,iridescenceThicknessMap:ce,sheen:K,sheenColorMap:Se,sheenRoughnessMap:Ve,specularMap:Ne,specularColorMap:ve,specularIntensityMap:$e,transmission:re,transmissionMap:N,thicknessMap:fe,gradientMap:me,opaque:S.transparent===!1&&S.blending===vs&&S.alphaToCoverage===!1,alphaMap:Ae,alphaTest:le,alphaHash:te,combine:S.combine,mapUv:ie&&_(S.map.channel),aoMapUv:H&&_(S.aoMap.channel),lightMapUv:B&&_(S.lightMap.channel),bumpMapUv:j&&_(S.bumpMap.channel),normalMapUv:$&&_(S.normalMap.channel),displacementMapUv:ae&&_(S.displacementMap.channel),emissiveMapUv:se&&_(S.emissiveMap.channel),metalnessMapUv:ue&&_(S.metalnessMap.channel),roughnessMapUv:Ue&&_(S.roughnessMap.channel),anisotropyMapUv:J&&_(S.anisotropyMap.channel),clearcoatMapUv:De&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:de&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&_(S.sheenRoughnessMap.channel),specularMapUv:Ne&&_(S.specularMap.channel),specularColorMapUv:ve&&_(S.specularColorMap.channel),specularIntensityMapUv:$e&&_(S.specularIntensityMap.channel),transmissionMapUv:N&&_(S.transmissionMap.channel),thicknessMapUv:fe&&_(S.thicknessMap.channel),alphaMapUv:Ae&&_(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&($||Fe),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(ie||Ae),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:ze,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ye,decodeVideoTexture:ie&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===ft,decodeVideoTextureEmissive:se&&S.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(S.emissiveMap.colorSpace)===ft,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===cn,flipSided:S.side===qt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Le&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&S.extensions.multiDraw===!0||V)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(b(M,S),v(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function b(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function v(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const M=m[S.type];let C;if(M){const U=Cn[M];C=ip.clone(U.uniforms)}else C=S.uniforms;return C}function R(S,M){let C;for(let U=0,k=u.length;U<k;U++){const z=u[U];if(z.cacheKey===M){C=z,++C.usedTimes;break}}return C===void 0&&(C=new Bv(r,M,S,s),u.push(C)),C}function w(S){if(--S.usedTimes===0){const M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:I}}function Gv(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Wv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Oh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Bh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,m,_,g){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function a(h,f,d,m,_,g){const p=o(h,f,d,m,_,g);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,m,_,g){const p=o(h,f,d,m,_,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||Wv),n.length>1&&n.sort(f||Oh),i.length>1&&i.sort(f||Oh)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:u,sort:l}}function Xv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Bh,r.set(n,[o])):i>=s.length?(o=new Bh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function qv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new be};break;case"SpotLight":t={position:new L,direction:new L,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new L,halfWidth:new L,halfHeight:new L};break}return r[e.id]=t,t}}}function Yv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let jv=0;function Kv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function $v(r){const e=new qv,t=Yv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const i=new L,s=new we,o=new we;function a(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,b=0,v=0,x=0,R=0,w=0,A=0;l.sort(Kv);for(let S=0,M=l.length;S<M;S++){const C=l[S],U=C.color,k=C.intensity,z=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=U.r*k,h+=U.g*k,f+=U.b*k;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],k);A++}else if(C.isDirectionalLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.directionalShadow[d]=X,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=C.shadow.matrix,b++}n.directional[d]=q,d++}else if(C.isSpotLight){const q=e.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(U).multiplyScalar(k),q.distance=z,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[_]=q;const Q=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,Q.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=Q.matrix,C.castShadow){const X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=W,x++}_++}else if(C.isRectAreaLight){const q=e.get(C);q.color.copy(U).multiplyScalar(k),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=q,g++}else if(C.isPointLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){const Q=C.shadow,X=t.get(C);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,X.shadowCameraNear=Q.camera.near,X.shadowCameraFar=Q.camera.far,n.pointShadow[m]=X,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=C.shadow.matrix,v++}n.point[m]=q,m++}else if(C.isHemisphereLight){const q=e.get(C);q.skyColor.copy(C.color).multiplyScalar(k),q.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[p]=q,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==b||I.numPointShadows!==v||I.numSpotShadows!==x||I.numSpotMaps!==R||I.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,I.directionalLength=d,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=b,I.numPointShadows=v,I.numSpotShadows=x,I.numSpotMaps=R,I.numLightProbes=A,n.version=jv++)}function c(l,u){let h=0,f=0,d=0,m=0,_=0;const g=u.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const v=l[p];if(v.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),h++}else if(v.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),d++}else if(v.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),o.identity(),s.copy(v.matrixWorld),s.premultiply(g),o.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function kh(r){const e=new $v(r),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Zv(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new kh(r),e.set(i,[a])):s>=o.length?(a=new kh(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ex(r,e,t){let n=new nl;const i=new pe,s=new pe,o=new it,a=new Jp({depthPacking:fd}),c=new Qp,l={},u=t.maxTextureSize,h={[ei]:qt,[qt]:ei,[cn]:cn},f=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:Jv,fragmentShader:Qv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new Et;m.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new rt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=iu;let p=this.type;this.render=function(w,A,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(gi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=p!==Xn&&this.type===Xn,z=p===Xn&&this.type!==Xn;for(let W=0,q=w.length;W<q;W++){const Q=w[W],X=Q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const oe=X.getFrameExtents();if(i.multiply(oe),s.copy(X.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/oe.x),i.x=s.x*oe.x,X.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/oe.y),i.y=s.y*oe.y,X.mapSize.y=s.y)),X.map===null||k===!0||z===!0){const xe=this.type!==Xn?{minFilter:Yt,magFilter:Yt}:{};X.map!==null&&X.map.dispose(),X.map=new xi(i.x,i.y,xe),X.map.texture.name=Q.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const ge=X.getViewportCount();for(let xe=0;xe<ge;xe++){const ze=X.getViewport(xe);o.set(s.x*ze.x,s.y*ze.y,s.x*ze.z,s.y*ze.w),U.viewport(o),X.updateMatrices(Q,xe),n=X.getFrustum(),x(A,I,X.camera,Q,this.type)}X.isPointLightShadow!==!0&&this.type===Xn&&b(X,I),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(S,M,C)};function b(w,A){const I=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new xi(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,I,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,I,d,_,null)}function v(w,A,I,S){let M=null;const C=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)M=C;else if(M=I.isPointLight===!0?c:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=M.uuid,k=A.uuid;let z=l[U];z===void 0&&(z={},l[U]=z);let W=z[k];W===void 0&&(W=M.clone(),z[k]=W,A.addEventListener("dispose",R)),M=W}if(M.visible=A.visible,M.wireframe=A.wireframe,S===Xn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:h[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const U=r.properties.get(M);U.light=I}return M}function x(w,A,I,S,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Xn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const k=e.update(w),z=w.material;if(Array.isArray(z)){const W=k.groups;for(let q=0,Q=W.length;q<Q;q++){const X=W[q],oe=z[X.materialIndex];if(oe&&oe.visible){const ge=v(w,oe,S,M);w.onBeforeShadow(r,w,A,I,k,ge,X),r.renderBufferDirect(I,null,k,ge,w,X),w.onAfterShadow(r,w,A,I,k,ge,X)}}}else if(z.visible){const W=v(w,z,S,M);w.onBeforeShadow(r,w,A,I,k,W,null),r.renderBufferDirect(I,null,k,W,w,null),w.onAfterShadow(r,w,A,I,k,W,null)}}const U=w.children;for(let k=0,z=U.length;k<z;k++)x(U[k],A,I,S,M)}function R(w){w.target.removeEventListener("dispose",R);for(const I in l){const S=l[I],M=w.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const tx={[Wa]:Xa,[qa]:Ka,[Ya]:$a,[Ts]:ja,[Xa]:Wa,[Ka]:qa,[$a]:Ya,[ja]:Ts};function nx(r,e){function t(){let N=!1;const fe=new it;let me=null;const Ae=new it(0,0,0,0);return{setMask:function(le){me!==le&&!N&&(r.colorMask(le,le,le,le),me=le)},setLocked:function(le){N=le},setClear:function(le,te,Le,Ye,vt){vt===!0&&(le*=Ye,te*=Ye,Le*=Ye),fe.set(le,te,Le,Ye),Ae.equals(fe)===!1&&(r.clearColor(le,te,Le,Ye),Ae.copy(fe))},reset:function(){N=!1,me=null,Ae.set(-1,0,0,0)}}}function n(){let N=!1,fe=!1,me=null,Ae=null,le=null;return{setReversed:function(te){if(fe!==te){const Le=e.get("EXT_clip_control");te?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),fe=te;const Ye=le;le=null,this.setClear(Ye)}},getReversed:function(){return fe},setTest:function(te){te?ne(r.DEPTH_TEST):Me(r.DEPTH_TEST)},setMask:function(te){me!==te&&!N&&(r.depthMask(te),me=te)},setFunc:function(te){if(fe&&(te=tx[te]),Ae!==te){switch(te){case Wa:r.depthFunc(r.NEVER);break;case Xa:r.depthFunc(r.ALWAYS);break;case qa:r.depthFunc(r.LESS);break;case Ts:r.depthFunc(r.LEQUAL);break;case Ya:r.depthFunc(r.EQUAL);break;case ja:r.depthFunc(r.GEQUAL);break;case Ka:r.depthFunc(r.GREATER);break;case $a:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ae=te}},setLocked:function(te){N=te},setClear:function(te){le!==te&&(fe&&(te=1-te),r.clearDepth(te),le=te)},reset:function(){N=!1,me=null,Ae=null,le=null,fe=!1}}}function i(){let N=!1,fe=null,me=null,Ae=null,le=null,te=null,Le=null,Ye=null,vt=null;return{setTest:function(lt){N||(lt?ne(r.STENCIL_TEST):Me(r.STENCIL_TEST))},setMask:function(lt){fe!==lt&&!N&&(r.stencilMask(lt),fe=lt)},setFunc:function(lt,Bn,wn){(me!==lt||Ae!==Bn||le!==wn)&&(r.stencilFunc(lt,Bn,wn),me=lt,Ae=Bn,le=wn)},setOp:function(lt,Bn,wn){(te!==lt||Le!==Bn||Ye!==wn)&&(r.stencilOp(lt,Bn,wn),te=lt,Le=Bn,Ye=wn)},setLocked:function(lt){N=lt},setClear:function(lt){vt!==lt&&(r.clearStencil(lt),vt=lt)},reset:function(){N=!1,fe=null,me=null,Ae=null,le=null,te=null,Le=null,Ye=null,vt=null}}}const s=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,b=null,v=null,x=null,R=null,w=null,A=new be(0,0,0),I=0,S=!1,M=null,C=null,U=null,k=null,z=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Q=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),q=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),q=Q>=2);let oe=null,ge={};const xe=r.getParameter(r.SCISSOR_BOX),ze=r.getParameter(r.VIEWPORT),Xe=new it().fromArray(xe),Je=new it().fromArray(ze);function qe(N,fe,me,Ae){const le=new Uint8Array(4),te=r.createTexture();r.bindTexture(N,te),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Le=0;Le<me;Le++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(fe,0,r.RGBA,1,1,Ae,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(fe+Le,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return te}const ee={};ee[r.TEXTURE_2D]=qe(r.TEXTURE_2D,r.TEXTURE_2D,1),ee[r.TEXTURE_CUBE_MAP]=qe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[r.TEXTURE_2D_ARRAY]=qe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ee[r.TEXTURE_3D]=qe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(r.DEPTH_TEST),o.setFunc(Ts),j(!1),$(Tl),ne(r.CULL_FACE),H(gi);function ne(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Me(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Ce(N,fe){return h[N]!==fe?(r.bindFramebuffer(N,fe),h[N]=fe,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=fe),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=fe),!0):!1}function V(N,fe){let me=d,Ae=!1;if(N){me=f.get(fe),me===void 0&&(me=[],f.set(fe,me));const le=N.textures;if(me.length!==le.length||me[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Le=le.length;te<Le;te++)me[te]=r.COLOR_ATTACHMENT0+te;me.length=le.length,Ae=!0}}else me[0]!==r.BACK&&(me[0]=r.BACK,Ae=!0);Ae&&r.drawBuffers(me)}function ie(N){return m!==N?(r.useProgram(N),m=N,!0):!1}const Te={[Ui]:r.FUNC_ADD,[Uf]:r.FUNC_SUBTRACT,[Ff]:r.FUNC_REVERSE_SUBTRACT};Te[Of]=r.MIN,Te[Bf]=r.MAX;const P={[kf]:r.ZERO,[zf]:r.ONE,[Hf]:r.SRC_COLOR,[Va]:r.SRC_ALPHA,[Yf]:r.SRC_ALPHA_SATURATE,[Xf]:r.DST_COLOR,[Gf]:r.DST_ALPHA,[Vf]:r.ONE_MINUS_SRC_COLOR,[Ga]:r.ONE_MINUS_SRC_ALPHA,[qf]:r.ONE_MINUS_DST_COLOR,[Wf]:r.ONE_MINUS_DST_ALPHA,[jf]:r.CONSTANT_COLOR,[Kf]:r.ONE_MINUS_CONSTANT_COLOR,[$f]:r.CONSTANT_ALPHA,[Zf]:r.ONE_MINUS_CONSTANT_ALPHA};function H(N,fe,me,Ae,le,te,Le,Ye,vt,lt){if(N===gi){_===!0&&(Me(r.BLEND),_=!1);return}if(_===!1&&(ne(r.BLEND),_=!0),N!==Nf){if(N!==g||lt!==S){if((p!==Ui||x!==Ui)&&(r.blendEquation(r.FUNC_ADD),p=Ui,x=Ui),lt)switch(N){case vs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xs:r.blendFunc(r.ONE,r.ONE);break;case bl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case El:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case vs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case bl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case El:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,v=null,R=null,w=null,A.set(0,0,0),I=0,g=N,S=lt}return}le=le||fe,te=te||me,Le=Le||Ae,(fe!==p||le!==x)&&(r.blendEquationSeparate(Te[fe],Te[le]),p=fe,x=le),(me!==b||Ae!==v||te!==R||Le!==w)&&(r.blendFuncSeparate(P[me],P[Ae],P[te],P[Le]),b=me,v=Ae,R=te,w=Le),(Ye.equals(A)===!1||vt!==I)&&(r.blendColor(Ye.r,Ye.g,Ye.b,vt),A.copy(Ye),I=vt),g=N,S=!1}function B(N,fe){N.side===cn?Me(r.CULL_FACE):ne(r.CULL_FACE);let me=N.side===qt;fe&&(me=!me),j(me),N.blending===vs&&N.transparent===!1?H(gi):H(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ae=N.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),se(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ne(r.SAMPLE_ALPHA_TO_COVERAGE):Me(r.SAMPLE_ALPHA_TO_COVERAGE)}function j(N){M!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),M=N)}function $(N){N!==Lf?(ne(r.CULL_FACE),N!==C&&(N===Tl?r.cullFace(r.BACK):N===Df?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Me(r.CULL_FACE),C=N}function ae(N){N!==U&&(q&&r.lineWidth(N),U=N)}function se(N,fe,me){N?(ne(r.POLYGON_OFFSET_FILL),(k!==fe||z!==me)&&(r.polygonOffset(fe,me),k=fe,z=me)):Me(r.POLYGON_OFFSET_FILL)}function ue(N){N?ne(r.SCISSOR_TEST):Me(r.SCISSOR_TEST)}function Ue(N){N===void 0&&(N=r.TEXTURE0+W-1),oe!==N&&(r.activeTexture(N),oe=N)}function Fe(N,fe,me){me===void 0&&(oe===null?me=r.TEXTURE0+W-1:me=oe);let Ae=ge[me];Ae===void 0&&(Ae={type:void 0,texture:void 0},ge[me]=Ae),(Ae.type!==N||Ae.texture!==fe)&&(oe!==me&&(r.activeTexture(me),oe=me),r.bindTexture(N,fe||ee[N]),Ae.type=N,Ae.texture=fe)}function E(){const N=ge[oe];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function y(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function D(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function re(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(N){Xe.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Xe.copy(N))}function Ve(N){Je.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Je.copy(N))}function Ne(N,fe){let me=l.get(fe);me===void 0&&(me=new WeakMap,l.set(fe,me));let Ae=me.get(N);Ae===void 0&&(Ae=r.getUniformBlockIndex(fe,N.name),me.set(N,Ae))}function ve(N,fe){const Ae=l.get(fe).get(N);c.get(fe)!==Ae&&(r.uniformBlockBinding(fe,Ae,N.__bindingPointIndex),c.set(fe,Ae))}function $e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},oe=null,ge={},h={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,b=null,v=null,x=null,R=null,w=null,A=new be(0,0,0),I=0,S=!1,M=null,C=null,U=null,k=null,z=null,Xe.set(0,0,r.canvas.width,r.canvas.height),Je.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ne,disable:Me,bindFramebuffer:Ce,drawBuffers:V,useProgram:ie,setBlending:H,setMaterial:B,setFlipSided:j,setCullFace:$,setLineWidth:ae,setPolygonOffset:se,setScissorTest:ue,activeTexture:Ue,bindTexture:Fe,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:D,texImage2D:Ie,texImage3D:ce,updateUBOMapping:Ne,uniformBlockBinding:ve,texStorage2D:de,texStorage3D:Pe,texSubImage2D:K,texSubImage3D:re,compressedTexSubImage2D:J,compressedTexSubImage3D:De,scissor:Se,viewport:Ve,reset:$e}}function ix(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new pe,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,y){return d?new OffscreenCanvas(E,y):hr("canvas")}function _(E,y,D){let K=1;const re=Fe(E);if((re.width>D||re.height>D)&&(K=D/Math.max(re.width,re.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const J=Math.floor(K*re.width),De=Math.floor(K*re.height);h===void 0&&(h=m(J,De));const de=y?m(J,De):h;return de.width=J,de.height=De,de.getContext("2d").drawImage(E,0,0,J,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+J+"x"+De+")."),de}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){r.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(E,y,D,K,re=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let J=y;if(y===r.RED&&(D===r.FLOAT&&(J=r.R32F),D===r.HALF_FLOAT&&(J=r.R16F),D===r.UNSIGNED_BYTE&&(J=r.R8)),y===r.RED_INTEGER&&(D===r.UNSIGNED_BYTE&&(J=r.R8UI),D===r.UNSIGNED_SHORT&&(J=r.R16UI),D===r.UNSIGNED_INT&&(J=r.R32UI),D===r.BYTE&&(J=r.R8I),D===r.SHORT&&(J=r.R16I),D===r.INT&&(J=r.R32I)),y===r.RG&&(D===r.FLOAT&&(J=r.RG32F),D===r.HALF_FLOAT&&(J=r.RG16F),D===r.UNSIGNED_BYTE&&(J=r.RG8)),y===r.RG_INTEGER&&(D===r.UNSIGNED_BYTE&&(J=r.RG8UI),D===r.UNSIGNED_SHORT&&(J=r.RG16UI),D===r.UNSIGNED_INT&&(J=r.RG32UI),D===r.BYTE&&(J=r.RG8I),D===r.SHORT&&(J=r.RG16I),D===r.INT&&(J=r.RG32I)),y===r.RGB_INTEGER&&(D===r.UNSIGNED_BYTE&&(J=r.RGB8UI),D===r.UNSIGNED_SHORT&&(J=r.RGB16UI),D===r.UNSIGNED_INT&&(J=r.RGB32UI),D===r.BYTE&&(J=r.RGB8I),D===r.SHORT&&(J=r.RGB16I),D===r.INT&&(J=r.RGB32I)),y===r.RGBA_INTEGER&&(D===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),D===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),D===r.UNSIGNED_INT&&(J=r.RGBA32UI),D===r.BYTE&&(J=r.RGBA8I),D===r.SHORT&&(J=r.RGBA16I),D===r.INT&&(J=r.RGBA32I)),y===r.RGB&&(D===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),D===r.UNSIGNED_INT_10F_11F_11F_REV&&(J=r.R11F_G11F_B10F)),y===r.RGBA){const De=re?vo:Ke.getTransfer(K);D===r.FLOAT&&(J=r.RGBA32F),D===r.HALF_FLOAT&&(J=r.RGBA16F),D===r.UNSIGNED_BYTE&&(J=De===ft?r.SRGB8_ALPHA8:r.RGBA8),D===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),D===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function x(E,y){let D;return E?y===null||y===zi||y===rr?D=r.DEPTH24_STENCIL8:y===Mn?D=r.DEPTH32F_STENCIL8:y===sr&&(D=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===zi||y===rr?D=r.DEPTH_COMPONENT24:y===Mn?D=r.DEPTH_COMPONENT32F:y===sr&&(D=r.DEPTH_COMPONENT16),D}function R(E,y){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==Yt&&E.minFilter!==tn?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function w(E){const y=E.target;y.removeEventListener("dispose",w),I(y),y.isVideoTexture&&u.delete(y)}function A(E){const y=E.target;y.removeEventListener("dispose",A),M(y)}function I(E){const y=n.get(E);if(y.__webglInit===void 0)return;const D=E.source,K=f.get(D);if(K){const re=K[y.__cacheKey];re.usedTimes--,re.usedTimes===0&&S(E),Object.keys(K).length===0&&f.delete(D)}n.remove(E)}function S(E){const y=n.get(E);r.deleteTexture(y.__webglTexture);const D=E.source,K=f.get(D);delete K[y.__cacheKey],o.memory.textures--}function M(E){const y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let re=0;re<y.__webglFramebuffer[K].length;re++)r.deleteFramebuffer(y.__webglFramebuffer[K][re]);else r.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)r.deleteFramebuffer(y.__webglFramebuffer[K]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const D=E.textures;for(let K=0,re=D.length;K<re;K++){const J=n.get(D[K]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(D[K])}n.remove(E)}let C=0;function U(){C=0}function k(){const E=C;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),C+=1,E}function z(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function W(E,y){const D=n.get(E);if(E.isVideoTexture&&ue(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&D.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(D,E,y);return}}else E.isExternalTexture&&(D.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,D.__webglTexture,r.TEXTURE0+y)}function q(E,y){const D=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){ee(D,E,y);return}t.bindTexture(r.TEXTURE_2D_ARRAY,D.__webglTexture,r.TEXTURE0+y)}function Q(E,y){const D=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){ee(D,E,y);return}t.bindTexture(r.TEXTURE_3D,D.__webglTexture,r.TEXTURE0+y)}function X(E,y){const D=n.get(E);if(E.version>0&&D.__version!==E.version){ne(D,E,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+y)}const oe={[vi]:r.REPEAT,[In]:r.CLAMP_TO_EDGE,[go]:r.MIRRORED_REPEAT},ge={[Yt]:r.NEAREST,[au]:r.NEAREST_MIPMAP_NEAREST,[js]:r.NEAREST_MIPMAP_LINEAR,[tn]:r.LINEAR,[ro]:r.LINEAR_MIPMAP_NEAREST,[Kn]:r.LINEAR_MIPMAP_LINEAR},xe={[pd]:r.NEVER,[yd]:r.ALWAYS,[md]:r.LESS,[_u]:r.LEQUAL,[gd]:r.EQUAL,[xd]:r.GEQUAL,[_d]:r.GREATER,[vd]:r.NOTEQUAL};function ze(E,y){if(y.type===Mn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===tn||y.magFilter===ro||y.magFilter===js||y.magFilter===Kn||y.minFilter===tn||y.minFilter===ro||y.minFilter===js||y.minFilter===Kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,oe[y.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,oe[y.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,oe[y.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ge[y.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ge[y.minFilter]),y.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,xe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Yt||y.minFilter!==js&&y.minFilter!==Kn||y.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");r.texParameterf(E,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Xe(E,y){let D=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",w));const K=y.source;let re=f.get(K);re===void 0&&(re={},f.set(K,re));const J=z(y);if(J!==E.__cacheKey){re[J]===void 0&&(re[J]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,D=!0),re[J].usedTimes++;const De=re[E.__cacheKey];De!==void 0&&(re[E.__cacheKey].usedTimes--,De.usedTimes===0&&S(y)),E.__cacheKey=J,E.__webglTexture=re[J].texture}return D}function Je(E,y,D){return Math.floor(Math.floor(E/D)/y)}function qe(E,y,D,K){const J=E.updateRanges;if(J.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,y.width,y.height,D,K,y.data);else{J.sort((ce,Se)=>ce.start-Se.start);let De=0;for(let ce=1;ce<J.length;ce++){const Se=J[De],Ve=J[ce],Ne=Se.start+Se.count,ve=Je(Ve.start,y.width,4),$e=Je(Se.start,y.width,4);Ve.start<=Ne+1&&ve===$e&&Je(Ve.start+Ve.count-1,y.width,4)===ve?Se.count=Math.max(Se.count,Ve.start+Ve.count-Se.start):(++De,J[De]=Ve)}J.length=De+1;const de=r.getParameter(r.UNPACK_ROW_LENGTH),Pe=r.getParameter(r.UNPACK_SKIP_PIXELS),Ie=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,y.width);for(let ce=0,Se=J.length;ce<Se;ce++){const Ve=J[ce],Ne=Math.floor(Ve.start/4),ve=Math.ceil(Ve.count/4),$e=Ne%y.width,N=Math.floor(Ne/y.width),fe=ve,me=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,$e),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,$e,N,fe,me,D,K,y.data)}E.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,de),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Pe),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ie)}}function ee(E,y,D){let K=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=r.TEXTURE_3D);const re=Xe(E,y),J=y.source;t.bindTexture(K,E.__webglTexture,r.TEXTURE0+D);const De=n.get(J);if(J.version!==De.__version||re===!0){t.activeTexture(r.TEXTURE0+D);const de=Ke.getPrimaries(Ke.workingColorSpace),Pe=y.colorSpace===Yn?null:Ke.getPrimaries(y.colorSpace),Ie=y.colorSpace===Yn||de===Pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let ce=_(y.image,!1,i.maxTextureSize);ce=Ue(y,ce);const Se=s.convert(y.format,y.colorSpace),Ve=s.convert(y.type);let Ne=v(y.internalFormat,Se,Ve,y.colorSpace,y.isVideoTexture);ze(K,y);let ve;const $e=y.mipmaps,N=y.isVideoTexture!==!0,fe=De.__version===void 0||re===!0,me=J.dataReady,Ae=R(y,ce);if(y.isDepthTexture)Ne=x(y.format===ar,y.type),fe&&(N?t.texStorage2D(r.TEXTURE_2D,1,Ne,ce.width,ce.height):t.texImage2D(r.TEXTURE_2D,0,Ne,ce.width,ce.height,0,Se,Ve,null));else if(y.isDataTexture)if($e.length>0){N&&fe&&t.texStorage2D(r.TEXTURE_2D,Ae,Ne,$e[0].width,$e[0].height);for(let le=0,te=$e.length;le<te;le++)ve=$e[le],N?me&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,ve.width,ve.height,Se,Ve,ve.data):t.texImage2D(r.TEXTURE_2D,le,Ne,ve.width,ve.height,0,Se,Ve,ve.data);y.generateMipmaps=!1}else N?(fe&&t.texStorage2D(r.TEXTURE_2D,Ae,Ne,ce.width,ce.height),me&&qe(y,ce,Se,Ve)):t.texImage2D(r.TEXTURE_2D,0,Ne,ce.width,ce.height,0,Se,Ve,ce.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){N&&fe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,Ne,$e[0].width,$e[0].height,ce.depth);for(let le=0,te=$e.length;le<te;le++)if(ve=$e[le],y.format!==hn)if(Se!==null)if(N){if(me)if(y.layerUpdates.size>0){const Le=mh(ve.width,ve.height,y.format,y.type);for(const Ye of y.layerUpdates){const vt=ve.data.subarray(Ye*Le/ve.data.BYTES_PER_ELEMENT,(Ye+1)*Le/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,Ye,ve.width,ve.height,1,Se,vt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,ve.width,ve.height,ce.depth,Se,ve.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,le,Ne,ve.width,ve.height,ce.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?me&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,ve.width,ve.height,ce.depth,Se,Ve,ve.data):t.texImage3D(r.TEXTURE_2D_ARRAY,le,Ne,ve.width,ve.height,ce.depth,0,Se,Ve,ve.data)}else{N&&fe&&t.texStorage2D(r.TEXTURE_2D,Ae,Ne,$e[0].width,$e[0].height);for(let le=0,te=$e.length;le<te;le++)ve=$e[le],y.format!==hn?Se!==null?N?me&&t.compressedTexSubImage2D(r.TEXTURE_2D,le,0,0,ve.width,ve.height,Se,ve.data):t.compressedTexImage2D(r.TEXTURE_2D,le,Ne,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?me&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,ve.width,ve.height,Se,Ve,ve.data):t.texImage2D(r.TEXTURE_2D,le,Ne,ve.width,ve.height,0,Se,Ve,ve.data)}else if(y.isDataArrayTexture)if(N){if(fe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ae,Ne,ce.width,ce.height,ce.depth),me)if(y.layerUpdates.size>0){const le=mh(ce.width,ce.height,y.format,y.type);for(const te of y.layerUpdates){const Le=ce.data.subarray(te*le/ce.data.BYTES_PER_ELEMENT,(te+1)*le/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,ce.width,ce.height,1,Se,Ve,Le)}y.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Se,Ve,ce.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ne,ce.width,ce.height,ce.depth,0,Se,Ve,ce.data);else if(y.isData3DTexture)N?(fe&&t.texStorage3D(r.TEXTURE_3D,Ae,Ne,ce.width,ce.height,ce.depth),me&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Se,Ve,ce.data)):t.texImage3D(r.TEXTURE_3D,0,Ne,ce.width,ce.height,ce.depth,0,Se,Ve,ce.data);else if(y.isFramebufferTexture){if(fe)if(N)t.texStorage2D(r.TEXTURE_2D,Ae,Ne,ce.width,ce.height);else{let le=ce.width,te=ce.height;for(let Le=0;Le<Ae;Le++)t.texImage2D(r.TEXTURE_2D,Le,Ne,le,te,0,Se,Ve,null),le>>=1,te>>=1}}else if($e.length>0){if(N&&fe){const le=Fe($e[0]);t.texStorage2D(r.TEXTURE_2D,Ae,Ne,le.width,le.height)}for(let le=0,te=$e.length;le<te;le++)ve=$e[le],N?me&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Se,Ve,ve):t.texImage2D(r.TEXTURE_2D,le,Ne,Se,Ve,ve);y.generateMipmaps=!1}else if(N){if(fe){const le=Fe(ce);t.texStorage2D(r.TEXTURE_2D,Ae,Ne,le.width,le.height)}me&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se,Ve,ce)}else t.texImage2D(r.TEXTURE_2D,0,Ne,Se,Ve,ce);g(y)&&p(K),De.__version=J.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ne(E,y,D){if(y.image.length!==6)return;const K=Xe(E,y),re=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+D);const J=n.get(re);if(re.version!==J.__version||K===!0){t.activeTexture(r.TEXTURE0+D);const De=Ke.getPrimaries(Ke.workingColorSpace),de=y.colorSpace===Yn?null:Ke.getPrimaries(y.colorSpace),Pe=y.colorSpace===Yn||De===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,ce=y.image[0]&&y.image[0].isDataTexture,Se=[];for(let te=0;te<6;te++)!Ie&&!ce?Se[te]=_(y.image[te],!0,i.maxCubemapSize):Se[te]=ce?y.image[te].image:y.image[te],Se[te]=Ue(y,Se[te]);const Ve=Se[0],Ne=s.convert(y.format,y.colorSpace),ve=s.convert(y.type),$e=v(y.internalFormat,Ne,ve,y.colorSpace),N=y.isVideoTexture!==!0,fe=J.__version===void 0||K===!0,me=re.dataReady;let Ae=R(y,Ve);ze(r.TEXTURE_CUBE_MAP,y);let le;if(Ie){N&&fe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,$e,Ve.width,Ve.height);for(let te=0;te<6;te++){le=Se[te].mipmaps;for(let Le=0;Le<le.length;Le++){const Ye=le[Le];y.format!==hn?Ne!==null?N?me&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,0,0,Ye.width,Ye.height,Ne,Ye.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,$e,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,0,0,Ye.width,Ye.height,Ne,ve,Ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le,$e,Ye.width,Ye.height,0,Ne,ve,Ye.data)}}}else{if(le=y.mipmaps,N&&fe){le.length>0&&Ae++;const te=Fe(Se[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ae,$e,te.width,te.height)}for(let te=0;te<6;te++)if(ce){N?me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Se[te].width,Se[te].height,Ne,ve,Se[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,Se[te].width,Se[te].height,0,Ne,ve,Se[te].data);for(let Le=0;Le<le.length;Le++){const vt=le[Le].image[te].image;N?me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,0,0,vt.width,vt.height,Ne,ve,vt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,$e,vt.width,vt.height,0,Ne,ve,vt.data)}}else{N?me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ne,ve,Se[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,Ne,ve,Se[te]);for(let Le=0;Le<le.length;Le++){const Ye=le[Le];N?me&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,0,0,Ne,ve,Ye.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Le+1,$e,Ne,ve,Ye.image[te])}}}g(y)&&p(r.TEXTURE_CUBE_MAP),J.__version=re.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function Me(E,y,D,K,re,J){const De=s.convert(D.format,D.colorSpace),de=s.convert(D.type),Pe=v(D.internalFormat,De,de,D.colorSpace),Ie=n.get(y),ce=n.get(D);if(ce.__renderTarget=y,!Ie.__hasExternalTextures){const Se=Math.max(1,y.width>>J),Ve=Math.max(1,y.height>>J);re===r.TEXTURE_3D||re===r.TEXTURE_2D_ARRAY?t.texImage3D(re,J,Pe,Se,Ve,y.depth,0,De,de,null):t.texImage2D(re,J,Pe,Se,Ve,0,De,de,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),se(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,re,ce.__webglTexture,0,ae(y)):(re===r.TEXTURE_2D||re>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,re,ce.__webglTexture,J),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ce(E,y,D){if(r.bindRenderbuffer(r.RENDERBUFFER,E),y.depthBuffer){const K=y.depthTexture,re=K&&K.isDepthTexture?K.type:null,J=x(y.stencilBuffer,re),De=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,de=ae(y);se(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,de,J,y.width,y.height):D?r.renderbufferStorageMultisample(r.RENDERBUFFER,de,J,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,J,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,De,r.RENDERBUFFER,E)}else{const K=y.textures;for(let re=0;re<K.length;re++){const J=K[re],De=s.convert(J.format,J.colorSpace),de=s.convert(J.type),Pe=v(J.internalFormat,De,de,J.colorSpace),Ie=ae(y);D&&se(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,Pe,y.width,y.height):se(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ie,Pe,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,Pe,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function V(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(y.depthTexture);K.__renderTarget=y,(!K.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),W(y.depthTexture,0);const re=K.__webglTexture,J=ae(y);if(y.depthTexture.format===or)se(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0);else if(y.depthTexture.format===ar)se(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function ie(E){const y=n.get(E),D=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){const re=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",re)};K.addEventListener("dispose",re),y.__depthDisposeCallback=re}y.__boundDepthTexture=K}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");const K=E.texture.mipmaps;K&&K.length>0?V(y.__webglFramebuffer[0],E):V(y.__webglFramebuffer,E)}else if(D){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=r.createRenderbuffer(),Ce(y.__webglDepthbuffer[K],E,!1);else{const re=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,J),r.framebufferRenderbuffer(r.FRAMEBUFFER,re,r.RENDERBUFFER,J)}}else{const K=E.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),Ce(y.__webglDepthbuffer,E,!1);else{const re=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,J),r.framebufferRenderbuffer(r.FRAMEBUFFER,re,r.RENDERBUFFER,J)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(E,y,D){const K=n.get(E);y!==void 0&&Me(K.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),D!==void 0&&ie(E)}function P(E){const y=E.texture,D=n.get(E),K=n.get(y);E.addEventListener("dispose",A);const re=E.textures,J=E.isWebGLCubeRenderTarget===!0,De=re.length>1;if(De||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=y.version,o.memory.textures++),J){D.__webglFramebuffer=[];for(let de=0;de<6;de++)if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer[de]=[];for(let Pe=0;Pe<y.mipmaps.length;Pe++)D.__webglFramebuffer[de][Pe]=r.createFramebuffer()}else D.__webglFramebuffer[de]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){D.__webglFramebuffer=[];for(let de=0;de<y.mipmaps.length;de++)D.__webglFramebuffer[de]=r.createFramebuffer()}else D.__webglFramebuffer=r.createFramebuffer();if(De)for(let de=0,Pe=re.length;de<Pe;de++){const Ie=n.get(re[de]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=r.createTexture(),o.memory.textures++)}if(E.samples>0&&se(E)===!1){D.__webglMultisampledFramebuffer=r.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let de=0;de<re.length;de++){const Pe=re[de];D.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,D.__webglColorRenderbuffer[de]);const Ie=s.convert(Pe.format,Pe.colorSpace),ce=s.convert(Pe.type),Se=v(Pe.internalFormat,Ie,ce,Pe.colorSpace,E.isXRRenderTarget===!0),Ve=ae(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ve,Se,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,D.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(D.__webglDepthRenderbuffer=r.createRenderbuffer(),Ce(D.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),ze(r.TEXTURE_CUBE_MAP,y);for(let de=0;de<6;de++)if(y.mipmaps&&y.mipmaps.length>0)for(let Pe=0;Pe<y.mipmaps.length;Pe++)Me(D.__webglFramebuffer[de][Pe],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,Pe);else Me(D.__webglFramebuffer[de],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);g(y)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let de=0,Pe=re.length;de<Pe;de++){const Ie=re[de],ce=n.get(Ie);let Se=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Se=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Se,ce.__webglTexture),ze(Se,Ie),Me(D.__webglFramebuffer,E,Ie,r.COLOR_ATTACHMENT0+de,Se,0),g(Ie)&&p(Se)}t.unbindTexture()}else{let de=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(de=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),ze(de,y),y.mipmaps&&y.mipmaps.length>0)for(let Pe=0;Pe<y.mipmaps.length;Pe++)Me(D.__webglFramebuffer[Pe],E,y,r.COLOR_ATTACHMENT0,de,Pe);else Me(D.__webglFramebuffer,E,y,r.COLOR_ATTACHMENT0,de,0);g(y)&&p(de),t.unbindTexture()}E.depthBuffer&&ie(E)}function H(E){const y=E.textures;for(let D=0,K=y.length;D<K;D++){const re=y[D];if(g(re)){const J=b(E),De=n.get(re).__webglTexture;t.bindTexture(J,De),p(J),t.unbindTexture()}}}const B=[],j=[];function $(E){if(E.samples>0){if(se(E)===!1){const y=E.textures,D=E.width,K=E.height;let re=r.COLOR_BUFFER_BIT;const J=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,De=n.get(E),de=y.length>1;if(de)for(let Ie=0;Ie<y.length;Ie++)t.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const Pe=E.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Ie=0;Ie<y.length;Ie++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(re|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(re|=r.STENCIL_BUFFER_BIT)),de){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,De.__webglColorRenderbuffer[Ie]);const ce=n.get(y[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ce,0)}r.blitFramebuffer(0,0,D,K,0,0,D,K,re,r.NEAREST),c===!0&&(B.length=0,j.length=0,B.push(r.COLOR_ATTACHMENT0+Ie),E.depthBuffer&&E.resolveDepthBuffer===!1&&(B.push(J),j.push(J),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,j)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,B))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let Ie=0;Ie<y.length;Ie++){t.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,De.__webglColorRenderbuffer[Ie]);const ce=n.get(y[Ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,ce,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function ae(E){return Math.min(i.maxSamples,E.samples)}function se(E){const y=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ue(E){const y=o.render.frame;u.get(E)!==y&&(u.set(E,y),E.update())}function Ue(E,y){const D=E.colorSpace,K=E.format,re=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||D!==jt&&D!==Yn&&(Ke.getTransfer(D)===ft?(K!==hn||re!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),y}function Fe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=X,this.rebindTextures=Te,this.setupRenderTarget=P,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=se}function sx(r,e){function t(n,i=Yn){let s;const o=Ke.getTransfer(i);if(n===Dn)return r.UNSIGNED_BYTE;if(n===Wc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Xc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===hu)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===uu)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===cu)return r.BYTE;if(n===lu)return r.SHORT;if(n===sr)return r.UNSIGNED_SHORT;if(n===Gc)return r.INT;if(n===zi)return r.UNSIGNED_INT;if(n===Mn)return r.FLOAT;if(n===_r)return r.HALF_FLOAT;if(n===fu)return r.ALPHA;if(n===du)return r.RGB;if(n===hn)return r.RGBA;if(n===or)return r.DEPTH_COMPONENT;if(n===ar)return r.DEPTH_STENCIL;if(n===qc)return r.RED;if(n===Yc)return r.RED_INTEGER;if(n===pu)return r.RG;if(n===jc)return r.RG_INTEGER;if(n===Kc)return r.RGBA_INTEGER;if(n===oo||n===ao||n===co||n===lo)if(o===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===oo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===oo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ao)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===Qa||n===ec||n===tc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ja)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ec)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nc||n===ic||n===sc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===nc||n===ic)return o===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===sc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rc||n===oc||n===ac||n===cc||n===lc||n===hc||n===uc||n===fc||n===dc||n===pc||n===mc||n===gc||n===_c||n===vc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===rc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ac)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_c)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vc)return o===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xc||n===yc||n===Mc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===xc)return o===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sc||n===Tc||n===bc||n===Ec)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Sc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Tc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ec)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ox=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ax{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Pu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ti({vertexShader:rx,fragmentShader:ox,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rt(new Uo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cx extends Wi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,m=null;const _=typeof XRWebGLBinding<"u",g=new ax,p={},b=t.getContextAttributes();let v=null,x=null;const R=[],w=[],A=new pe;let I=null;const S=new Ut;S.viewport=new it;const M=new Ut;M.viewport=new it;const C=[S,M],U=new gm;let k=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ne=R[ee];return ne===void 0&&(ne=new ha,R[ee]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(ee){let ne=R[ee];return ne===void 0&&(ne=new ha,R[ee]=ne),ne.getGripSpace()},this.getHand=function(ee){let ne=R[ee];return ne===void 0&&(ne=new ha,R[ee]=ne),ne.getHandSpace()};function W(ee){const ne=w.indexOf(ee.inputSource);if(ne===-1)return;const Me=R[ne];Me!==void 0&&(Me.update(ee.inputSource,ee.frame,l||o),Me.dispatchEvent({type:ee.type,data:ee.inputSource}))}function q(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<R.length;ee++){const ne=w[ee];ne!==null&&(w[ee]=null,R[ee].disconnect(ne))}k=null,z=null,g.reset();for(const ee in p)delete p[ee];e.setRenderTarget(v),d=null,f=null,h=null,i=null,x=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",q),i.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ce=null,V=null;b.depth&&(V=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=b.stencil?ar:or,Ce=b.stencil?rr:zi);const ie={colorFormat:t.RGBA8,depthFormat:V,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(ie),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new xi(f.textureWidth,f.textureHeight,{format:hn,type:Dn,depthTexture:new Cu(f.textureWidth,f.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Me={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new xi(d.framebufferWidth,d.framebufferHeight,{format:hn,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),qe.setContext(i),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(ee){for(let ne=0;ne<ee.removed.length;ne++){const Me=ee.removed[ne],Ce=w.indexOf(Me);Ce>=0&&(w[Ce]=null,R[Ce].disconnect(Me))}for(let ne=0;ne<ee.added.length;ne++){const Me=ee.added[ne];let Ce=w.indexOf(Me);if(Ce===-1){for(let ie=0;ie<R.length;ie++)if(ie>=w.length){w.push(Me),Ce=ie;break}else if(w[ie]===null){w[ie]=Me,Ce=ie;break}if(Ce===-1)break}const V=R[Ce];V&&V.connect(Me)}}const X=new L,oe=new L;function ge(ee,ne,Me){X.setFromMatrixPosition(ne.matrixWorld),oe.setFromMatrixPosition(Me.matrixWorld);const Ce=X.distanceTo(oe),V=ne.projectionMatrix.elements,ie=Me.projectionMatrix.elements,Te=V[14]/(V[10]-1),P=V[14]/(V[10]+1),H=(V[9]+1)/V[5],B=(V[9]-1)/V[5],j=(V[8]-1)/V[0],$=(ie[8]+1)/ie[0],ae=Te*j,se=Te*$,ue=Ce/(-j+$),Ue=ue*-j;if(ne.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Ue),ee.translateZ(ue),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),V[10]===-1)ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Fe=Te+ue,E=P+ue,y=ae-Ue,D=se+(Ce-Ue),K=H*P/E*Fe,re=B*P/E*Fe;ee.projectionMatrix.makePerspective(y,D,K,re,Fe,E),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function xe(ee,ne){ne===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ne.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let ne=ee.near,Me=ee.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),U.near=M.near=S.near=ne,U.far=M.far=S.far=Me,(k!==U.near||z!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),k=U.near,z=U.far),U.layers.mask=ee.layers.mask|6,S.layers.mask=U.layers.mask&3,M.layers.mask=U.layers.mask&5;const Ce=ee.parent,V=U.cameras;xe(U,Ce);for(let ie=0;ie<V.length;ie++)xe(V[ie],Ce);V.length===2?ge(U,S,M):U.projectionMatrix.copy(S.projectionMatrix),ze(ee,U,Ce)};function ze(ee,ne,Me){Me===null?ee.matrix.copy(ne.matrixWorld):(ee.matrix.copy(Me.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ne.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=ws*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(ee){c=ee,f!==null&&(f.fixedFoveation=ee),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(ee){return p[ee]};let Xe=null;function Je(ee,ne){if(u=ne.getViewerPose(l||o),m=ne,u!==null){const Me=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let Ce=!1;Me.length!==U.cameras.length&&(U.cameras.length=0,Ce=!0);for(let P=0;P<Me.length;P++){const H=Me[P];let B=null;if(d!==null)B=d.getViewport(H);else{const $=h.getViewSubImage(f,H);B=$.viewport,P===0&&(e.setRenderTargetTextures(x,$.colorTexture,$.depthStencilTexture),e.setRenderTarget(x))}let j=C[P];j===void 0&&(j=new Ut,j.layers.enable(P),j.viewport=new it,C[P]=j),j.matrix.fromArray(H.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(H.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(B.x,B.y,B.width,B.height),P===0&&(U.matrix.copy(j.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ce===!0&&U.cameras.push(j)}const V=i.enabledFeatures;if(V&&V.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const P=h.getDepthInformation(Me[0]);P&&P.isValid&&P.texture&&g.init(P,i.renderState)}if(V&&V.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let P=0;P<Me.length;P++){const H=Me[P].camera;if(H){let B=p[H];B||(B=new Pu,p[H]=B);const j=h.getCameraImage(H);B.sourceTexture=j}}}}for(let Me=0;Me<R.length;Me++){const Ce=w[Me],V=R[Me];Ce!==null&&V!==void 0&&V.update(Ce,ne,l||o)}Xe&&Xe(ee,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),m=null}const qe=new Wu;qe.setAnimationLoop(Je),this.setAnimationLoop=function(ee){Xe=ee},this.dispose=function(){}}}const Pi=new Ct,lx=new we;function hx(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Tu(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,b,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,x)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,b,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=e.get(p),v=b.envMap,x=b.envMapRotation;v&&(g.envMap.value=v,Pi.copy(x),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),g.envMapRotation.value.setFromMatrix4(lx.makeRotationFromEuler(Pi)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,b,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const b=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ux(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,v){const x=v.program;n.uniformBlockBinding(b,x)}function l(b,v){let x=i[b.id];x===void 0&&(m(b),x=u(b),i[b.id]=x,b.addEventListener("dispose",g));const R=v.program;n.updateUBOMapping(b,R);const w=e.render.frame;s[b.id]!==w&&(f(b),s[b.id]=w)}function u(b){const v=h();b.__bindingPointIndex=v;const x=r.createBuffer(),R=b.__size,w=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,R,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const v=i[b.id],x=b.uniforms,R=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let w=0,A=x.length;w<A;w++){const I=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,M=I.length;S<M;S++){const C=I[S];if(d(C,w,S,R)===!0){const U=C.__offset,k=Array.isArray(C.value)?C.value:[C.value];let z=0;for(let W=0;W<k.length;W++){const q=k[W],Q=_(q);typeof q=="number"||typeof q=="boolean"?(C.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,U+z,C.__data)):q.isMatrix3?(C.__data[0]=q.elements[0],C.__data[1]=q.elements[1],C.__data[2]=q.elements[2],C.__data[3]=0,C.__data[4]=q.elements[3],C.__data[5]=q.elements[4],C.__data[6]=q.elements[5],C.__data[7]=0,C.__data[8]=q.elements[6],C.__data[9]=q.elements[7],C.__data[10]=q.elements[8],C.__data[11]=0):(q.toArray(C.__data,z),z+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(b,v,x,R){const w=b.value,A=v+"_"+x;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const I=R[A];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return R[A]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function m(b){const v=b.uniforms;let x=0;const R=16;for(let A=0,I=v.length;A<I;A++){const S=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,C=S.length;M<C;M++){const U=S[M],k=Array.isArray(U.value)?U.value:[U.value];for(let z=0,W=k.length;z<W;z++){const q=k[z],Q=_(q),X=x%R,oe=X%Q.boundary,ge=X+oe;x+=oe,ge!==0&&R-ge<Q.storage&&(x+=R-ge),U.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=Q.storage}}}const w=x%R;return w>0&&(x+=R-w),b.__size=x,b.__cache={},this}function _(b){const v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function g(b){const v=b.target;v.removeEventListener("dispose",g);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:c,update:l,dispose:p}}class Ku{constructor(e={}){const{canvas:t=Od(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const b=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=ot;let w=0,A=0,I=null,S=-1,M=null;const C=new it,U=new it;let k=null;const z=new be(0);let W=0,q=t.width,Q=t.height,X=1,oe=null,ge=null;const xe=new it(0,0,q,Q),ze=new it(0,0,q,Q);let Xe=!1;const Je=new nl;let qe=!1,ee=!1;const ne=new we,Me=new L,Ce=new it,V={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function Te(){return I===null?X:1}let P=n;function H(T,F){return t.getContext(T,F)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vc}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",le,!1),P===null){const F="webgl2";if(P=H(F,T),P===null)throw H(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let B,j,$,ae,se,ue,Ue,Fe,E,y,D,K,re,J,De,de,Pe,Ie,ce,Se,Ve,Ne,ve,$e;function N(){B=new S_(P),B.init(),Ne=new sx(P,B),j=new m_(P,B,e,Ne),$=new nx(P,B),j.reversedDepthBuffer&&f&&$.buffers.depth.setReversed(!0),ae=new E_(P),se=new Gv,ue=new ix(P,B,$,se,j,Ne,ae),Ue=new __(x),Fe=new M_(x),E=new Im(P),ve=new d_(P,E),y=new T_(P,E,ae,ve),D=new A_(P,y,E,ae),ce=new w_(P,j,ue),de=new g_(se),K=new Vv(x,Ue,Fe,B,j,ve,de),re=new hx(x,se),J=new Xv,De=new Zv(B),Ie=new f_(x,Ue,Fe,$,D,d,c),Pe=new ex(x,D,j),$e=new ux(P,ae,j,$),Se=new p_(P,B,ae),Ve=new b_(P,B,ae),ae.programs=K.programs,x.capabilities=j,x.extensions=B,x.properties=se,x.renderLists=J,x.shadowMap=Pe,x.state=$,x.info=ae}N();const fe=new cx(x,P);this.xr=fe,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=B.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=B.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(q,Q,!1))},this.getSize=function(T){return T.set(q,Q)},this.setSize=function(T,F,G=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=T,Q=F,t.width=Math.floor(T*X),t.height=Math.floor(F*X),G===!0&&(t.style.width=T+"px",t.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(q*X,Q*X).floor()},this.setDrawingBufferSize=function(T,F,G){q=T,Q=F,X=G,t.width=Math.floor(T*G),t.height=Math.floor(F*G),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,F,G,Y){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,F,G,Y),$.viewport(C.copy(xe).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(ze)},this.setScissor=function(T,F,G,Y){T.isVector4?ze.set(T.x,T.y,T.z,T.w):ze.set(T,F,G,Y),$.scissor(U.copy(ze).multiplyScalar(X).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(T){$.setScissorTest(Xe=T)},this.setOpaqueSort=function(T){oe=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(T=!0,F=!0,G=!0){let Y=0;if(T){let O=!1;if(I!==null){const he=I.texture.format;O=he===Kc||he===jc||he===Yc}if(O){const he=I.texture.type,ye=he===Dn||he===zi||he===sr||he===rr||he===Wc||he===Xc,Re=Ie.getClearColor(),Ee=Ie.getClearAlpha(),He=Re.r,Ge=Re.g,Oe=Re.b;ye?(m[0]=He,m[1]=Ge,m[2]=Oe,m[3]=Ee,P.clearBufferuiv(P.COLOR,0,m)):(_[0]=He,_[1]=Ge,_[2]=Oe,_[3]=Ee,P.clearBufferiv(P.COLOR,0,_))}else Y|=P.COLOR_BUFFER_BIT}F&&(Y|=P.DEPTH_BUFFER_BIT),G&&(Y|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",le,!1),Ie.dispose(),J.dispose(),De.dispose(),se.dispose(),Ue.dispose(),Fe.dispose(),D.dispose(),ve.dispose(),$e.dispose(),K.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",wn),fe.removeEventListener("sessionend",gl),Ti.stop()};function me(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=ae.autoReset,F=Pe.enabled,G=Pe.autoUpdate,Y=Pe.needsUpdate,O=Pe.type;N(),ae.autoReset=T,Pe.enabled=F,Pe.autoUpdate=G,Pe.needsUpdate=Y,Pe.type=O}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function te(T){const F=T.target;F.removeEventListener("dispose",te),Le(F)}function Le(T){Ye(T),se.remove(T)}function Ye(T){const F=se.get(T).programs;F!==void 0&&(F.forEach(function(G){K.releaseProgram(G)}),T.isShaderMaterial&&K.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,G,Y,O,he){F===null&&(F=V);const ye=O.isMesh&&O.matrixWorld.determinant()<0,Re=Sf(T,F,G,Y,O);$.setMaterial(Y,ye);let Ee=G.index,He=1;if(Y.wireframe===!0){if(Ee=y.getWireframeAttribute(G),Ee===void 0)return;He=2}const Ge=G.drawRange,Oe=G.attributes.position;let nt=Ge.start*He,ut=(Ge.start+Ge.count)*He;he!==null&&(nt=Math.max(nt,he.start*He),ut=Math.min(ut,(he.start+he.count)*He)),Ee!==null?(nt=Math.max(nt,0),ut=Math.min(ut,Ee.count)):Oe!=null&&(nt=Math.max(nt,0),ut=Math.min(ut,Oe.count));const wt=ut-nt;if(wt<0||wt===1/0)return;ve.setup(O,Y,Re,G,Ee);let xt,mt=Se;if(Ee!==null&&(xt=E.get(Ee),mt=Ve,mt.setIndex(xt)),O.isMesh)Y.wireframe===!0?($.setLineWidth(Y.wireframeLinewidth*Te()),mt.setMode(P.LINES)):mt.setMode(P.TRIANGLES);else if(O.isLine){let ke=Y.linewidth;ke===void 0&&(ke=1),$.setLineWidth(ke*Te()),O.isLineSegments?mt.setMode(P.LINES):O.isLineLoop?mt.setMode(P.LINE_LOOP):mt.setMode(P.LINE_STRIP)}else O.isPoints?mt.setMode(P.POINTS):O.isSprite&&mt.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ur("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),mt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(B.get("WEBGL_multi_draw"))mt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const ke=O._multiDrawStarts,St=O._multiDrawCounts,at=O._multiDrawCount,Zt=Ee?E.get(Ee).bytesPerElement:1,qi=se.get(Y).currentProgram.getUniforms();for(let Jt=0;Jt<at;Jt++)qi.setValue(P,"_gl_DrawID",Jt),mt.render(ke[Jt]/Zt,St[Jt])}else if(O.isInstancedMesh)mt.renderInstances(nt,wt,O.count);else if(G.isInstancedBufferGeometry){const ke=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,St=Math.min(G.instanceCount,ke);mt.renderInstances(nt,wt,St)}else mt.render(nt,wt)};function vt(T,F,G){T.transparent===!0&&T.side===cn&&T.forceSinglePass===!1?(T.side=qt,T.needsUpdate=!0,Tr(T,F,G),T.side=ei,T.needsUpdate=!0,Tr(T,F,G),T.side=cn):Tr(T,F,G)}this.compile=function(T,F,G=null){G===null&&(G=T),p=De.get(G),p.init(F),v.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),T!==G&&T.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const Y=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const he=O.material;if(he)if(Array.isArray(he))for(let ye=0;ye<he.length;ye++){const Re=he[ye];vt(Re,G,O),Y.add(Re)}else vt(he,G,O),Y.add(he)}),p=v.pop(),Y},this.compileAsync=function(T,F,G=null){const Y=this.compile(T,F,G);return new Promise(O=>{function he(){if(Y.forEach(function(ye){se.get(ye).currentProgram.isReady()&&Y.delete(ye)}),Y.size===0){O(T);return}setTimeout(he,10)}B.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let lt=null;function Bn(T){lt&&lt(T)}function wn(){Ti.stop()}function gl(){Ti.start()}const Ti=new Wu;Ti.setAnimationLoop(Bn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(T){lt=T,fe.setAnimationLoop(T),T===null?Ti.stop():Ti.start()},fe.addEventListener("sessionstart",wn),fe.addEventListener("sessionend",gl),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(F),F=fe.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,F,I),p=De.get(T,v.length),p.init(F),v.push(p),ne.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Je.setFromProjectionMatrix(ne,Ln,F.reversedDepth),ee=this.localClippingEnabled,qe=de.init(this.clippingPlanes,ee),g=J.get(T,b.length),g.init(),b.push(g),fe.enabled===!0&&fe.isPresenting===!0){const he=x.xr.getDepthSensingMesh();he!==null&&Ho(he,F,-1/0,x.sortObjects)}Ho(T,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(oe,ge),ie=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,ie&&Ie.addToRenderList(g,T),this.info.render.frame++,qe===!0&&de.beginShadows();const G=p.state.shadowsArray;Pe.render(G,T,F),qe===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const he=F.cameras;if(O.length>0)for(let ye=0,Re=he.length;ye<Re;ye++){const Ee=he[ye];vl(Y,O,T,Ee)}ie&&Ie.render(T);for(let ye=0,Re=he.length;ye<Re;ye++){const Ee=he[ye];_l(g,T,Ee,Ee.viewport)}}else O.length>0&&vl(Y,O,T,F),ie&&Ie.render(T),_l(g,T,F);I!==null&&A===0&&(ue.updateMultisampleRenderTarget(I),ue.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(x,T,F),ve.resetDefaultState(),S=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],qe===!0&&de.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function Ho(T,F,G,Y){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Je.intersectsSprite(T)){Y&&Ce.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ne);const ye=D.update(T),Re=T.material;Re.visible&&g.push(T,ye,Re,G,Ce.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Je.intersectsObject(T))){const ye=D.update(T),Re=T.material;if(Y&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ce.copy(T.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ce.copy(ye.boundingSphere.center)),Ce.applyMatrix4(T.matrixWorld).applyMatrix4(ne)),Array.isArray(Re)){const Ee=ye.groups;for(let He=0,Ge=Ee.length;He<Ge;He++){const Oe=Ee[He],nt=Re[Oe.materialIndex];nt&&nt.visible&&g.push(T,ye,nt,G,Ce.z,Oe)}}else Re.visible&&g.push(T,ye,Re,G,Ce.z,null)}}const he=T.children;for(let ye=0,Re=he.length;ye<Re;ye++)Ho(he[ye],F,G,Y)}function _l(T,F,G,Y){const O=T.opaque,he=T.transmissive,ye=T.transparent;p.setupLightsView(G),qe===!0&&de.setGlobalState(x.clippingPlanes,G),Y&&$.viewport(C.copy(Y)),O.length>0&&Sr(O,F,G),he.length>0&&Sr(he,F,G),ye.length>0&&Sr(ye,F,G),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function vl(T,F,G,Y){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new xi(1,1,{generateMipmaps:!0,type:B.has("EXT_color_buffer_half_float")||B.has("EXT_color_buffer_float")?_r:Dn,minFilter:Kn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const he=p.state.transmissionRenderTarget[Y.id],ye=Y.viewport||C;he.setSize(ye.z*x.transmissionResolutionScale,ye.w*x.transmissionResolutionScale);const Re=x.getRenderTarget(),Ee=x.getActiveCubeFace(),He=x.getActiveMipmapLevel();x.setRenderTarget(he),x.getClearColor(z),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),ie&&Ie.render(G);const Ge=x.toneMapping;x.toneMapping=_i;const Oe=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),qe===!0&&de.setGlobalState(x.clippingPlanes,Y),Sr(T,G,Y),ue.updateMultisampleRenderTarget(he),ue.updateRenderTargetMipmap(he),B.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let ut=0,wt=F.length;ut<wt;ut++){const xt=F[ut],mt=xt.object,ke=xt.geometry,St=xt.material,at=xt.group;if(St.side===cn&&mt.layers.test(Y.layers)){const Zt=St.side;St.side=qt,St.needsUpdate=!0,xl(mt,G,Y,ke,St,at),St.side=Zt,St.needsUpdate=!0,nt=!0}}nt===!0&&(ue.updateMultisampleRenderTarget(he),ue.updateRenderTargetMipmap(he))}x.setRenderTarget(Re,Ee,He),x.setClearColor(z,W),Oe!==void 0&&(Y.viewport=Oe),x.toneMapping=Ge}function Sr(T,F,G){const Y=F.isScene===!0?F.overrideMaterial:null;for(let O=0,he=T.length;O<he;O++){const ye=T[O],Re=ye.object,Ee=ye.geometry,He=ye.group;let Ge=ye.material;Ge.allowOverride===!0&&Y!==null&&(Ge=Y),Re.layers.test(G.layers)&&xl(Re,F,G,Ee,Ge,He)}}function xl(T,F,G,Y,O,he){T.onBeforeRender(x,F,G,Y,O,he),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(x,F,G,Y,T,he),O.transparent===!0&&O.side===cn&&O.forceSinglePass===!1?(O.side=qt,O.needsUpdate=!0,x.renderBufferDirect(G,F,Y,O,T,he),O.side=ei,O.needsUpdate=!0,x.renderBufferDirect(G,F,Y,O,T,he),O.side=cn):x.renderBufferDirect(G,F,Y,O,T,he),T.onAfterRender(x,F,G,Y,O,he)}function Tr(T,F,G){F.isScene!==!0&&(F=V);const Y=se.get(T),O=p.state.lights,he=p.state.shadowsArray,ye=O.state.version,Re=K.getParameters(T,O.state,he,F,G),Ee=K.getProgramCacheKey(Re);let He=Y.programs;Y.environment=T.isMeshStandardMaterial?F.environment:null,Y.fog=F.fog,Y.envMap=(T.isMeshStandardMaterial?Fe:Ue).get(T.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,He===void 0&&(T.addEventListener("dispose",te),He=new Map,Y.programs=He);let Ge=He.get(Ee);if(Ge!==void 0){if(Y.currentProgram===Ge&&Y.lightsStateVersion===ye)return Ml(T,Re),Ge}else Re.uniforms=K.getUniforms(T),T.onBeforeCompile(Re,x),Ge=K.acquireProgram(Re,Ee),He.set(Ee,Ge),Y.uniforms=Re.uniforms;const Oe=Y.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Oe.clippingPlanes=de.uniform),Ml(T,Re),Y.needsLights=bf(T),Y.lightsStateVersion=ye,Y.needsLights&&(Oe.ambientLightColor.value=O.state.ambient,Oe.lightProbe.value=O.state.probe,Oe.directionalLights.value=O.state.directional,Oe.directionalLightShadows.value=O.state.directionalShadow,Oe.spotLights.value=O.state.spot,Oe.spotLightShadows.value=O.state.spotShadow,Oe.rectAreaLights.value=O.state.rectArea,Oe.ltc_1.value=O.state.rectAreaLTC1,Oe.ltc_2.value=O.state.rectAreaLTC2,Oe.pointLights.value=O.state.point,Oe.pointLightShadows.value=O.state.pointShadow,Oe.hemisphereLights.value=O.state.hemi,Oe.directionalShadowMap.value=O.state.directionalShadowMap,Oe.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Oe.spotShadowMap.value=O.state.spotShadowMap,Oe.spotLightMatrix.value=O.state.spotLightMatrix,Oe.spotLightMap.value=O.state.spotLightMap,Oe.pointShadowMap.value=O.state.pointShadowMap,Oe.pointShadowMatrix.value=O.state.pointShadowMatrix),Y.currentProgram=Ge,Y.uniformsList=null,Ge}function yl(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=ho.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function Ml(T,F){const G=se.get(T);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Sf(T,F,G,Y,O){F.isScene!==!0&&(F=V),ue.resetTextureUnits();const he=F.fog,ye=Y.isMeshStandardMaterial?F.environment:null,Re=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:jt,Ee=(Y.isMeshStandardMaterial?Fe:Ue).get(Y.envMap||ye),He=Y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ge=!!G.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Oe=!!G.morphAttributes.position,nt=!!G.morphAttributes.normal,ut=!!G.morphAttributes.color;let wt=_i;Y.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(wt=x.toneMapping);const xt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,mt=xt!==void 0?xt.length:0,ke=se.get(Y),St=p.state.lights;if(qe===!0&&(ee===!0||T!==M)){const Vt=T===M&&Y.id===S;de.setState(Y,T,Vt)}let at=!1;Y.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==St.state.version||ke.outputColorSpace!==Re||O.isBatchedMesh&&ke.batching===!1||!O.isBatchedMesh&&ke.batching===!0||O.isBatchedMesh&&ke.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&ke.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&ke.instancing===!1||!O.isInstancedMesh&&ke.instancing===!0||O.isSkinnedMesh&&ke.skinning===!1||!O.isSkinnedMesh&&ke.skinning===!0||O.isInstancedMesh&&ke.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&ke.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&ke.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&ke.instancingMorph===!1&&O.morphTexture!==null||ke.envMap!==Ee||Y.fog===!0&&ke.fog!==he||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==de.numPlanes||ke.numIntersection!==de.numIntersection)||ke.vertexAlphas!==He||ke.vertexTangents!==Ge||ke.morphTargets!==Oe||ke.morphNormals!==nt||ke.morphColors!==ut||ke.toneMapping!==wt||ke.morphTargetsCount!==mt)&&(at=!0):(at=!0,ke.__version=Y.version);let Zt=ke.currentProgram;at===!0&&(Zt=Tr(Y,F,O));let qi=!1,Jt=!1,Ns=!1;const Tt=Zt.getUniforms(),nn=ke.uniforms;if($.useProgram(Zt.program)&&(qi=!0,Jt=!0,Ns=!0),Y.id!==S&&(S=Y.id,Jt=!0),qi||M!==T){$.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Tt.setValue(P,"projectionMatrix",T.projectionMatrix),Tt.setValue(P,"viewMatrix",T.matrixWorldInverse);const Kt=Tt.map.cameraPosition;Kt!==void 0&&Kt.setValue(P,Me.setFromMatrixPosition(T.matrixWorld)),j.logarithmicDepthBuffer&&Tt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Tt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Jt=!0,Ns=!0)}if(O.isSkinnedMesh){Tt.setOptional(P,O,"bindMatrix"),Tt.setOptional(P,O,"bindMatrixInverse");const Vt=O.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),Tt.setValue(P,"boneTexture",Vt.boneTexture,ue))}O.isBatchedMesh&&(Tt.setOptional(P,O,"batchingTexture"),Tt.setValue(P,"batchingTexture",O._matricesTexture,ue),Tt.setOptional(P,O,"batchingIdTexture"),Tt.setValue(P,"batchingIdTexture",O._indirectTexture,ue),Tt.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&Tt.setValue(P,"batchingColorTexture",O._colorsTexture,ue));const sn=G.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&ce.update(O,G,Zt),(Jt||ke.receiveShadow!==O.receiveShadow)&&(ke.receiveShadow=O.receiveShadow,Tt.setValue(P,"receiveShadow",O.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(nn.envMap.value=Ee,nn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&F.environment!==null&&(nn.envMapIntensity.value=F.environmentIntensity),Jt&&(Tt.setValue(P,"toneMappingExposure",x.toneMappingExposure),ke.needsLights&&Tf(nn,Ns),he&&Y.fog===!0&&re.refreshFogUniforms(nn,he),re.refreshMaterialUniforms(nn,Y,X,Q,p.state.transmissionRenderTarget[T.id]),ho.upload(P,yl(ke),nn,ue)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ho.upload(P,yl(ke),nn,ue),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Tt.setValue(P,"center",O.center),Tt.setValue(P,"modelViewMatrix",O.modelViewMatrix),Tt.setValue(P,"normalMatrix",O.normalMatrix),Tt.setValue(P,"modelMatrix",O.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Vt=Y.uniformsGroups;for(let Kt=0,Vo=Vt.length;Kt<Vo;Kt++){const bi=Vt[Kt];$e.update(bi,Zt),$e.bind(bi,Zt)}}return Zt}function Tf(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function bf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,F,G){const Y=se.get(T);Y.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),se.get(T.texture).__webglTexture=F,se.get(T.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:G,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,F){const G=se.get(T);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};const Ef=P.createFramebuffer();this.setRenderTarget=function(T,F=0,G=0){I=T,w=F,A=G;let Y=!0,O=null,he=!1,ye=!1;if(T){const Ee=se.get(T);if(Ee.__useDefaultFramebuffer!==void 0)$.bindFramebuffer(P.FRAMEBUFFER,null),Y=!1;else if(Ee.__webglFramebuffer===void 0)ue.setupRenderTarget(T);else if(Ee.__hasExternalTextures)ue.rebindTextures(T,se.get(T.texture).__webglTexture,se.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Oe=T.depthTexture;if(Ee.__boundDepthTexture!==Oe){if(Oe!==null&&se.has(Oe)&&(T.width!==Oe.image.width||T.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(T)}}const He=T.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ye=!0);const Ge=se.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[F])?O=Ge[F][G]:O=Ge[F],he=!0):T.samples>0&&ue.useMultisampledRTT(T)===!1?O=se.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?O=Ge[G]:O=Ge,C.copy(T.viewport),U.copy(T.scissor),k=T.scissorTest}else C.copy(xe).multiplyScalar(X).floor(),U.copy(ze).multiplyScalar(X).floor(),k=Xe;if(G!==0&&(O=Ef),$.bindFramebuffer(P.FRAMEBUFFER,O)&&Y&&$.drawBuffers(T,O),$.viewport(C),$.scissor(U),$.setScissorTest(k),he){const Ee=se.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ee.__webglTexture,G)}else if(ye){const Ee=F;for(let He=0;He<T.textures.length;He++){const Ge=se.get(T.textures[He]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+He,Ge.__webglTexture,G,Ee)}}else if(T!==null&&G!==0){const Ee=se.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ee.__webglTexture,G)}S=-1},this.readRenderTargetPixels=function(T,F,G,Y,O,he,ye,Re=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee){$.bindFramebuffer(P.FRAMEBUFFER,Ee);try{const He=T.textures[Re],Ge=He.format,Oe=He.type;if(!j.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-Y&&G>=0&&G<=T.height-O&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(F,G,Y,O,Ne.convert(Ge),Ne.convert(Oe),he))}finally{const He=I!==null?se.get(I).__webglFramebuffer:null;$.bindFramebuffer(P.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(T,F,G,Y,O,he,ye,Re=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=se.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ye!==void 0&&(Ee=Ee[ye]),Ee)if(F>=0&&F<=T.width-Y&&G>=0&&G<=T.height-O){$.bindFramebuffer(P.FRAMEBUFFER,Ee);const He=T.textures[Re],Ge=He.format,Oe=He.type;if(!j.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,nt),P.bufferData(P.PIXEL_PACK_BUFFER,he.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Re),P.readPixels(F,G,Y,O,Ne.convert(Ge),Ne.convert(Oe),0);const ut=I!==null?se.get(I).__webglFramebuffer:null;$.bindFramebuffer(P.FRAMEBUFFER,ut);const wt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Bd(P,wt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,nt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,he),P.deleteBuffer(nt),P.deleteSync(wt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,F=null,G=0){const Y=Math.pow(2,-G),O=Math.floor(T.image.width*Y),he=Math.floor(T.image.height*Y),ye=F!==null?F.x:0,Re=F!==null?F.y:0;ue.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,ye,Re,O,he),$.unbindTexture()};const wf=P.createFramebuffer(),Af=P.createFramebuffer();this.copyTextureToTexture=function(T,F,G=null,Y=null,O=0,he=null){he===null&&(O!==0?(ur("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=O,O=0):he=0);let ye,Re,Ee,He,Ge,Oe,nt,ut,wt;const xt=T.isCompressedTexture?T.mipmaps[he]:T.image;if(G!==null)ye=G.max.x-G.min.x,Re=G.max.y-G.min.y,Ee=G.isBox3?G.max.z-G.min.z:1,He=G.min.x,Ge=G.min.y,Oe=G.isBox3?G.min.z:0;else{const sn=Math.pow(2,-O);ye=Math.floor(xt.width*sn),Re=Math.floor(xt.height*sn),T.isDataArrayTexture?Ee=xt.depth:T.isData3DTexture?Ee=Math.floor(xt.depth*sn):Ee=1,He=0,Ge=0,Oe=0}Y!==null?(nt=Y.x,ut=Y.y,wt=Y.z):(nt=0,ut=0,wt=0);const mt=Ne.convert(F.format),ke=Ne.convert(F.type);let St;F.isData3DTexture?(ue.setTexture3D(F,0),St=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ue.setTexture2DArray(F,0),St=P.TEXTURE_2D_ARRAY):(ue.setTexture2D(F,0),St=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const at=P.getParameter(P.UNPACK_ROW_LENGTH),Zt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),qi=P.getParameter(P.UNPACK_SKIP_PIXELS),Jt=P.getParameter(P.UNPACK_SKIP_ROWS),Ns=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,xt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,He),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ge),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Oe);const Tt=T.isDataArrayTexture||T.isData3DTexture,nn=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const sn=se.get(T),Vt=se.get(F),Kt=se.get(sn.__renderTarget),Vo=se.get(Vt.__renderTarget);$.bindFramebuffer(P.READ_FRAMEBUFFER,Kt.__webglFramebuffer),$.bindFramebuffer(P.DRAW_FRAMEBUFFER,Vo.__webglFramebuffer);for(let bi=0;bi<Ee;bi++)Tt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,se.get(T).__webglTexture,O,Oe+bi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,se.get(F).__webglTexture,he,wt+bi)),P.blitFramebuffer(He,Ge,ye,Re,nt,ut,ye,Re,P.DEPTH_BUFFER_BIT,P.NEAREST);$.bindFramebuffer(P.READ_FRAMEBUFFER,null),$.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||T.isRenderTargetTexture||se.has(T)){const sn=se.get(T),Vt=se.get(F);$.bindFramebuffer(P.READ_FRAMEBUFFER,wf),$.bindFramebuffer(P.DRAW_FRAMEBUFFER,Af);for(let Kt=0;Kt<Ee;Kt++)Tt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,sn.__webglTexture,O,Oe+Kt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,sn.__webglTexture,O),nn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Vt.__webglTexture,he,wt+Kt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Vt.__webglTexture,he),O!==0?P.blitFramebuffer(He,Ge,ye,Re,nt,ut,ye,Re,P.COLOR_BUFFER_BIT,P.NEAREST):nn?P.copyTexSubImage3D(St,he,nt,ut,wt+Kt,He,Ge,ye,Re):P.copyTexSubImage2D(St,he,nt,ut,He,Ge,ye,Re);$.bindFramebuffer(P.READ_FRAMEBUFFER,null),$.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else nn?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(St,he,nt,ut,wt,ye,Re,Ee,mt,ke,xt.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(St,he,nt,ut,wt,ye,Re,Ee,mt,xt.data):P.texSubImage3D(St,he,nt,ut,wt,ye,Re,Ee,mt,ke,xt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,he,nt,ut,ye,Re,mt,ke,xt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,he,nt,ut,xt.width,xt.height,mt,xt.data):P.texSubImage2D(P.TEXTURE_2D,he,nt,ut,ye,Re,mt,ke,xt);P.pixelStorei(P.UNPACK_ROW_LENGTH,at),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Zt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,qi),P.pixelStorei(P.UNPACK_SKIP_ROWS,Jt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ns),he===0&&F.generateMipmaps&&P.generateMipmap(St),$.unbindTexture()},this.initRenderTarget=function(T){se.get(T).__webglFramebuffer===void 0&&ue.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ue.setTextureCube(T,0):T.isData3DTexture?ue.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ue.setTexture2DArray(T,0):ue.setTexture2D(T,0),$.unbindTexture()},this.resetState=function(){w=0,A=0,I=null,$.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function $u(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,c=new Et;let l=0;for(let u=0;u<r.length;++u){const h=r[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(t){let u=0;const h=[];for(let f=0;f<r.length;++f){const d=r[f].index;for(let m=0;m<d.count;++m)h.push(d.getX(m)+u);u+=r[f].attributes.position.count}c.setIndex(h)}for(const u in s){const h=zh(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][f]);const m=zh(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}return c}function zh(r){let e,t,n,i=-1,s=0;for(let l=0;l<r.length;++l){const u=r[l];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const o=new e(s),a=new It(o,t,n);let c=0;for(let l=0;l<r.length;++l){const u=r[l];if(u.isInterleavedBufferAttribute){const h=c/t;for(let f=0,d=u.count;f<d;f++)for(let m=0;m<t;m++){const _=u.getComponent(f,m);a.setComponent(f+h,m,_)}}else o.set(u.array,c);c+=u.count*t}return i!==void 0&&(a.gpuType=i),a}function Hh(r,e){if(e===hd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===wc||e===gu){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===wc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}const Uc=new Si(1,1,1),tr=new yi(1,10,7),Gs=new Rs(1,1,8),Vh=new Hi(1,1,1,10);function fx(r,e,t){const n=new _t,i=new Map,s=(u,h,f,d,m,_,g,p,b=!1,v=0)=>{const x=p+":"+b;i.has(x)||i.set(x,{color:p,glow:b,geos:[]});const R=u.clone();R.applyMatrix4(new we().compose(new L(h,f,d),new Mt().setFromEuler(new Ct(0,0,v)),new L(m,_,g))),i.get(x).geos.push(R)},o=(u,h,f,d,m,_,g,p=!1)=>s(Uc,u,h,f,d,m,_,g,p),a=(u,h,f,d,m)=>s(tr,u,h,f,d,d,d,m),c=pi(r),l=r==="neon"||r==="space";o(0,-.58,0,70,.4,24,c.ground);for(const u of[-1,1]){const h=u*10,f=9+e*7%17;if(o(u*6,-.05,0,1,.65,24,r==="snow"?15595002:r==="desert"?15185533:10070197),r==="metro"||r==="neon"){const d=r==="neon"?[2633810,3421015,2374480][e%3]:[11914193,12890020,9481652][e%3];o(h,f/2,0,6,f,14,d),o(h,f+.3,0,6.2,.6,14.2,l?4411508:14868954);for(let m=2;m<f-1;m+=2.5)for(let _=-5;_<=5;_+=2.5)o(u*6.96,m,_,.06,1.2,1.3,l?e%2?16741083:6938351:3495019,l);o(h,f+1.1,-3,1.6,1.1,2,6518150),l?(o(u*6.9,f/2,-6,.12,f,.15,15424995,!0),o(u*6.9,4,2,.12,2,5,4648685,!0),o(u*6.78,4,2,.14,.2,3,16777215,!0)):(o(u*7,.9,7,.3,2,.3,7822670),a(u*7,3.1,7,1.45,3771762),o(u*6.9,.6,-6,1,.22,2,9069650),o(u*7.3,1,-6,.15,1,2,9069650))}else if(r==="desert")s(tr,u*20,1,-4,10,5+e%3*2,14,14265459),s(Gs,u*12,2.6,3,3,6,3,11499861),s(Gs,u*15,1.6,-6,2,4,2,12553051),o(u*7.8,1.6,-6,.45,3.4,.5,4752747),o(u*8.5,2.1,-6,1.3,.3,.4,4752747),o(u*9,2.6,-6,.35,1.2,.4,4752747),e%3===0&&(o(u*9,1,6,4,2,4,14468249),o(u*9,2.2,6,4.5,.35,4.5,10314569),o(u*6.95,1,6,.1,1.4,1,3758442));else if(r==="snow"){o(h,2.2,0,6,4.4,10,6651289),s(Gs,h,5.5,0,4.8,3,7,15791349),o(u*6.96,2,0,.08,1,1.5,16767386,!0);for(const d of[-8,8])o(u*8,1.5,d,.4,3,.4,6378828),s(Gs,u*8,3.2,d,1.7,3,1.7,3958884),s(Gs,u*8,3.65,d,1.65,2.4,1.65,15200754);s(tr,u*6.6,.15,4,1.3,.45,2.5,15922936)}else{o(u*11,1,0,8,2,24,2635087),o(u*7.1,1.8,0,.14,.14,24,7855359,!0);for(const d of[-8,0,8])o(u*8,5,d,.6,8,.6,5464444),o(u*8,8.8,d,.8,.22,2,8249343,!0),s(Vh,u*11,4,d,1.5,5,1.5,4085358),s(Vh,u*11,4,d,1.53,.35,1.53,7137788,!0);e%3===0&&(o(0,9,-7,17,.5,.65,5464444),o(0,8.7,-7,14,.08,.2,8707583,!0))}r!=="space"&&(o(u*5.8,2.7,-8,.13,5.4,.13,l?4806515:6585481),o(u*5.2,5.4,-8,1.3,.12,.2,6585481),o(u*4.7,5.3,-8,.45,.12,.4,l?9959167:16770485,!0)),o(u*5.6,.45,3,.25,.9,.35,c.accent),o(u*5.7,.13,6,.6,.12,1,4215140)}r==="metro"&&e%4===0&&(o(-5.3,4,-9,.4,8,.5,4217971),o(5.3,4,-9,.4,8,.5,4217971),o(0,8,-9,11,.4,.5,4217971));for(const{geos:u,color:h,glow:f}of i.values()){const d=$u(u,!1);u.forEach(g=>g.dispose());const m=new Nn({color:h,roughness:f?.35:.8,emissive:f?h:0,emissiveIntensity:f?.8:0,transparent:!0});m.userData.baseRoughness=m.roughness;const _=new rt(d,m);_.castShadow=!f,_.receiveShadow=!0,n.add(_)}return n}function dx(r,e,t,n,i=()=>{}){const s=new Cf,o=new Map;let a="medium",c=0,l="metro";for(const V of Zn){const ie=new _t;ie.visible=!1,r.add(ie);const Te=[];for(let P=0;P<12;P++){const H=fx(V.id,P);H.position.z=-P*24,ie.add(H),Te.push(H)}o.set(V.id,{layer:ie,segments:Te})}const u=new _t;r.add(u);const h=[];for(let V=0;V<12;V++){const ie=new _t;ie.position.z=-V*24,u.add(ie);const Te=(H,B,j,$,ae,se,ue)=>{const Ue=new rt(Uc,new Nn({color:ue,metalness:.35,roughness:.55}));Ue.position.set(H,B,j),Ue.scale.set($,ae,se),Ue.receiveShadow=!0,ie.add(Ue)};Te(0,-.3,0,11,.4,24,4544102);for(const H of[-3,0,3]){Te(H,-.05,0,2.65,.1,24,2571600);for(const B of[-1,1])Te(H+B*.9,.07,0,.08,.12,24,11058377);for(let B=-11;B<12;B+=2)Te(H,.015,B,2.3,.1,.2,8222573)}const P=new Map;for(const H of[...ie.children]){const B=H.material.color.getHex();P.has(B)||P.set(B,{material:H.material,geometries:[]}),H.updateMatrix(),P.get(B).geometries.push(H.geometry.clone().applyMatrix4(H.matrix)),H.material!==P.get(B).material&&H.material.dispose(),ie.remove(H)}for(const H of P.values()){const B=new rt($u(H.geometries),H.material);B.receiveShadow=!0,ie.add(B),H.geometries.forEach(j=>j.dispose())}h.push(ie)}const f=new ti({side:qt,depthWrite:!1,uniforms:{top:{value:new be},bottom:{value:new be}},vertexShader:"varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 v;uniform vec3 top;uniform vec3 bottom;void main(){float h=smoothstep(-.08,.7,normalize(v).y);gl_FragColor=vec4(mix(bottom,top,h),1.);#include <tonemapping_fragment>
#include <colorspace_fragment>
}`});f.fragmentShader=f.fragmentShader.replace(";#include",`;
#include`);const d=new rt(new yi(240,24,14),f);d.frustumCulled=!1,r.add(d);const m=new _t;r.add(m);const _=new Ot({color:15857146,transparent:!0,opacity:.38,depthWrite:!1});for(let V=0;V<14;V++){const ie=new rt(tr,_);ie.position.set((V%2?1:-1)*(15+V*2),25+V%4*3,-15-V*13),ie.scale.set(8,1.5,3),m.add(ie)}const g=new rt(new yi(22,24,16),new Ot({color:6651564}));g.position.set(75,65,-170),r.add(g);const p=new rt(new Qn(31,1.8,6,48),new Ot({color:11770837}));p.position.copy(g.position),p.rotation.x=1.1,r.add(p);const b=900,v=new Float32Array(b*3),x=new Float32Array(b);for(let V=0;V<b;V++)v[V*3]=(Math.random()-.5)*42,v[V*3+1]=Math.random()*25,v[V*3+2]=-Math.random()*95,x[V]=.6+Math.random();const R=new Et;R.setAttribute("position",new It(v,3));const w=new fr({size:.085,color:12179954,transparent:!0,opacity:0,depthWrite:!1}),A=new To(R,w);A.frustumCulled=!1,r.add(A);const I=new _t,S=new Ot({color:8388577,transparent:!0,opacity:.14,depthWrite:!1,side:cn});for(let V=0;V<3;V++){const ie=new rt(new Qn(90+V*8,2,4,60,Math.PI),S);ie.position.set(0,42+V*7,-130),ie.rotation.set(.4,0,V*.2),I.add(ie)}r.add(I);const M=new Float32Array(b*6),C=new Et;C.setAttribute("position",new It(M,3));const U=new Lo({color:12507631,transparent:!0,opacity:0,depthWrite:!1}),k=new Ru(C,U);k.frustumCulled=!1,r.add(k);const z=new Et,W=[];for(let V=0;V<500;V++)W.push((Math.random()-.5)*350,20+Math.random()*160,-60-Math.random()*140);z.setAttribute("position",new dt(W,3));const q=new To(z,new fr({color:13756415,size:.3,transparent:!0,depthWrite:!1}));r.add(q);const Q=new _t;r.add(Q);const X=new Ot({color:10874367,transparent:!0,opacity:0,depthWrite:!1});for(let V=0;V<3;V++){const ie=new rt(new Qn(6+V*.22,.08,6,48),X);ie.position.z=-V*1.2,Q.add(ie)}Q.visible=!1;const oe=new _t,ge=new Nn({color:7441310,metalness:.65,roughness:.3}),xe=new rt(Uc,ge);xe.scale.set(.9,.2,.5),oe.add(xe);for(const V of[-1,1]){const ie=new rt(tr,new Ot({color:10350335}));ie.position.x=V*.6,ie.scale.set(.12,.04,.12),oe.add(ie)}r.add(oe);function ze(V,ie){const Te=pi(V),P=V==="neon"||V==="space",H=ie==="cloudy"||ie==="rain";return{sky:new be(Te.sky).multiplyScalar(H?.65:1),horizon:new be(Te.horizon).multiplyScalar(H?.7:1),sun:P?.65:H?1.35:2.6,ambient:P?1.6:2.2,fogNear:ie==="mist"?24:ie==="sand"?35:60,fogFar:ie==="mist"?115:ie==="sand"?135:210}}function Xe(V,ie,Te){f.uniforms.top.value.copy(V.sky).lerp(ie.sky,Te),f.uniforms.bottom.value.copy(V.horizon).lerp(ie.horizon,Te),r.fog.color.copy(f.uniforms.bottom.value),r.fog.near=We.lerp(V.fogNear,ie.fogNear,Te),r.fog.far=We.lerp(V.fogFar,ie.fogFar,Te),t.intensity=We.lerp(V.sun,ie.sun,Te),n.intensity=We.lerp(V.ambient,ie.ambient,Te)}function Je(V,ie){const{layer:Te}=o.get(V);Te.visible=ie>.001,Te.visible&&Te.traverse(P=>{P.isMesh&&(P.material.opacity=ie,P.material.depthWrite=ie>.98)})}function qe(V,ie){const Te=s.transition,P=Te?We.smoothstep(Te.time,0,2.6):1,H=Te?.fromMap||s.map,B=Te?.map||s.map,j=Te?.fromWeather||s.weather,$=Te?.weather||s.weather;H!==B?(Je(H,1-P),Je(B,P)):Je(B,1),Xe(ze(H,j),ze(B,$),P);for(const D of Zn)D.id!==H&&D.id!==B&&Je(D.id,0);const ae=We.lerp(H==="space"?1:0,B==="space"?1:0,P);q.visible=ae>0,q.material.opacity=ae*($==="pulse"?.5+.25*Math.sin(c*1.5):.8),g.visible=p.visible=ae>.5;const se=D=>D==="aurora"?1:0;I.visible=ae>0,S.opacity=We.lerp(se(j),se($),P)*ae*(.13+.04*Math.sin(c)),I.rotation.z=Math.sin(c*.1)*.06,t.color.set(B==="space"?$==="pulse"?13150463:$==="aurora"?10420190:13035263:B==="neon"?11846399:16773069);const ue=D=>D==="cloudy"?.65:D==="rain"?.7:D==="clear"?.16:0;_.opacity=We.lerp(ue(j),ue($),P)*(1-ae),m.position.x=Math.sin(c*.04)*5;const Ue=["rain","snow","sand"],Fe=D=>Ue.includes(D)?.7:0;w.opacity=We.lerp(Fe(j),Fe($),P),j!==$&&Fe(j)&&Fe($)&&(w.opacity*=Math.abs(P*2-1)),A.visible=w.opacity>.001;const E=P<.5?j:$;if(w.size=E==="snow"?.13:E==="sand"?.09:.055,w.color.set(E==="snow"?16055295:E==="sand"?15122839:11656437),R.setDrawRange(0,a==="low"?130:a==="medium"?420:b),A.visible&&V>0){for(let D=0;D<b;D++)v[D*3+1]-=V*(E==="rain"?28:E==="snow"?2:1)*x[D],v[D*3]+=V*(E==="sand"?6:Math.sin(c+D)*.25),v[D*3+2]+=ie*.8,v[D*3+1]<0&&(v[D*3+1]=25),v[D*3]>21&&(v[D*3]=-21),v[D*3+2]>12&&(v[D*3+2]=-95);R.attributes.position.needsUpdate=!0}if(k.visible=E==="rain"&&w.opacity>.001,U.opacity=w.opacity*.6,C.setDrawRange(0,(a==="low"?130:a==="medium"?420:b)*2),k.visible){A.visible=!1;for(let D=0;D<b;D++)M.set([v[D*3],v[D*3+1],v[D*3+2],v[D*3]+.06,v[D*3+1]+.6,v[D*3+2]-.12],D*6);C.attributes.position.needsUpdate=!0}const y=We.lerp(j==="rain"?1:0,$==="rain"?1:0,P);for(const D of h)for(const K of D.children)K.material.roughness=.6-y*.4;Q.visible=!!Te?.mapChanged,X.opacity=Q.visible?Math.sin(P*Math.PI)*.7:0,Q.position.set(0,3,-40+Math.min(1,(Te?.time||0)/1.3)*48),Q.rotation.z=c*.3,oe.visible=a!=="low"&&B!=="desert"&&B!=="snow",oe.position.set(9+Math.sin(c*.45)*2,9+Math.sin(c)*.4,-35+c*4%110),oe.rotation.z=Math.sin(c*.8)*.1}function ee(V){s.reset(V),l=s.map;for(const ie of Zn)Je(ie.id,ie.id===l?1:0),o.get(ie.id).segments.forEach((Te,P)=>Te.position.z=-P*24);h.forEach((ie,Te)=>ie.position.z=-Te*24),c=0,qe(0,0)}function ne(V){a=V,e.setPixelRatio(Math.min(devicePixelRatio,V==="low"?1:V==="medium"?1.5:2)),e.shadowMap.enabled=V!=="low",t.shadow.mapSize.set(V==="high"?2048:1024,V==="high"?2048:1024),t.shadow.map?.dispose(),t.shadow.map=null,e.shadowMap.needsUpdate=!0}const Me=new Map;function Ce(V){if(Me.has(V))return Me.get(V);const ie=new el,Te=pi(V);ie.background=new be(Te.sky),ie.fog=new Po(Te.sky,45,150),ie.add(new ol(15136511,5464184,2.4));const P=new yr(16773079,2);P.position.set(12,25,10),ie.add(P);const H=o.get(V).layer.clone(!0);H.visible=!0,ie.add(H),H.traverse(E=>{E.isMesh&&(E.material=E.material.clone(),E.material.opacity=1,E.material.depthWrite=!0)}),ie.add(u.clone(!0));const B=new Ut(60,2,.1,260);B.position.set(3,6,15),B.lookAt(0,3,-32);const j=new xi(360,180),$=e.getRenderTarget();e.setRenderTarget(j),e.render(ie,B);const ae=new Uint8Array(360*180*4);e.readRenderTargetPixels(j,0,0,360,180,ae),e.setRenderTarget($);const se=document.createElement("canvas");se.width=360,se.height=180;const ue=se.getContext("2d"),Ue=ue.createImageData(360,180);for(let E=0;E<180;E++)Ue.data.set(ae.subarray((179-E)*360*4,(180-E)*360*4),E*360*4);ue.putImageData(Ue,0,0);const Fe=se.toDataURL();return j.dispose(),H.traverse(E=>{E.isMesh&&E.material.dispose()}),Me.set(V,Fe),Fe}return ee("metro"),{cycle:s,reset:ee,setQuality:ne,preview:Ce,get protected(){return s.protected},get label(){const V=s.transition;return pi(V?.map||s.map).name+" · "+Sl[V?.weather||s.weather]},update(V,ie,Te,P){c+=V;const H=s.transition,B=s.update(V,Te,P);H&&!s.transition&&Je(H.fromMap,H.fromMap===s.map?1:0),B&&(l!==B.map&&B.mapChanged?i("Yangi hudud: "+pi(B.map).name):i(Sl[B.weather]),l=B.map);for(const{segments:j}of o.values())for(const $ of j)$.position.z+=ie,$.position.z>24&&($.position.z-=288);for(const j of h)j.position.z+=ie,j.position.z>24&&(j.position.z-=288);qe(V,ie)},idle(V){c+=V,qe(V,0)}}}var ln=Uint8Array,gs=Uint16Array,px=Int32Array,Zu=new ln([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ju=new ln([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),mx=new ln([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Qu=function(r,e){for(var t=new gs(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new px(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return{b:t,r:i}},ef=Qu(Zu,2),tf=ef.b,gx=ef.r;tf[28]=258,gx[258]=28;var _x=Qu(Ju,0),vx=_x.b,Fc=new gs(32768);for(var yt=0;yt<32768;++yt){var ui=(yt&43690)>>1|(yt&21845)<<1;ui=(ui&52428)>>2|(ui&13107)<<2,ui=(ui&61680)>>4|(ui&3855)<<4,Fc[yt]=((ui&65280)>>8|(ui&255)<<8)>>1}var nr=(function(r,e,t){for(var n=r.length,i=0,s=new gs(e);i<n;++i)r[i]&&++s[r[i]-1];var o=new gs(e);for(i=1;i<e;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(t){a=new gs(1<<e);var c=15-e;for(i=0;i<n;++i)if(r[i])for(var l=i<<4|r[i],u=e-r[i],h=o[r[i]-1]++<<u,f=h|(1<<u)-1;h<=f;++h)a[Fc[h]>>c]=l}else for(a=new gs(n),i=0;i<n;++i)r[i]&&(a[i]=Fc[o[r[i]-1]++]>>15-r[i]);return a}),Mr=new ln(288);for(var yt=0;yt<144;++yt)Mr[yt]=8;for(var yt=144;yt<256;++yt)Mr[yt]=9;for(var yt=256;yt<280;++yt)Mr[yt]=7;for(var yt=280;yt<288;++yt)Mr[yt]=8;var nf=new ln(32);for(var yt=0;yt<32;++yt)nf[yt]=5;var xx=nr(Mr,9,1),yx=nr(nf,5,1),Aa=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},gn=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},Ra=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},Mx=function(r){return(r+7)/8|0},Sx=function(r,e,t){return(t==null||t>r.length)&&(t=r.length),new ln(r.subarray(e,t))},Tx=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],vn=function(r,e,t){var n=new Error(e||Tx[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,vn),!t)throw n;return n},bx=function(r,e,t,n){var i=r.length,s=0;if(!i||e.f&&!e.l)return t||new ln(0);var o=!t,a=o||e.i!=2,c=e.i;o&&(t=new ln(i*3));var l=function(ie){var Te=t.length;if(ie>Te){var P=new ln(Math.max(Te*2,ie));P.set(t),t=P}},u=e.f||0,h=e.p||0,f=e.b||0,d=e.l,m=e.d,_=e.m,g=e.n,p=i*8;do{if(!d){u=gn(r,h,1);var b=gn(r,h+1,3);if(h+=3,b)if(b==1)d=xx,m=yx,_=9,g=5;else if(b==2){var w=gn(r,h,31)+257,A=gn(r,h+10,15)+4,I=w+gn(r,h+5,31)+1;h+=14;for(var S=new ln(I),M=new ln(19),C=0;C<A;++C)M[mx[C]]=gn(r,h+C*3,7);h+=A*3;for(var U=Aa(M),k=(1<<U)-1,z=nr(M,U,1),C=0;C<I;){var W=z[gn(r,h,k)];h+=W&15;var v=W>>4;if(v<16)S[C++]=v;else{var q=0,Q=0;for(v==16?(Q=3+gn(r,h,3),h+=2,q=S[C-1]):v==17?(Q=3+gn(r,h,7),h+=3):v==18&&(Q=11+gn(r,h,127),h+=7);Q--;)S[C++]=q}}var X=S.subarray(0,w),oe=S.subarray(w);_=Aa(X),g=Aa(oe),d=nr(X,_,1),m=nr(oe,g,1)}else vn(1);else{var v=Mx(h)+4,x=r[v-4]|r[v-3]<<8,R=v+x;if(R>i){c&&vn(0);break}a&&l(f+x),t.set(r.subarray(v,R),f),e.b=f+=x,e.p=h=R*8,e.f=u;continue}if(h>p){c&&vn(0);break}}a&&l(f+131072);for(var ge=(1<<_)-1,xe=(1<<g)-1,ze=h;;ze=h){var q=d[Ra(r,h)&ge],Xe=q>>4;if(h+=q&15,h>p){c&&vn(0);break}if(q||vn(2),Xe<256)t[f++]=Xe;else if(Xe==256){ze=h,d=null;break}else{var Je=Xe-254;if(Xe>264){var C=Xe-257,qe=Zu[C];Je=gn(r,h,(1<<qe)-1)+tf[C],h+=qe}var ee=m[Ra(r,h)&xe],ne=ee>>4;ee||vn(3),h+=ee&15;var oe=vx[ne];if(ne>3){var qe=Ju[ne];oe+=Ra(r,h)&(1<<qe)-1,h+=qe}if(h>p){c&&vn(0);break}a&&l(f+131072);var Me=f+Je;if(f<oe){var Ce=s-oe,V=Math.min(oe,Me);for(Ce+f<0&&vn(3);f<V;++f)t[f]=n[Ce+f]}for(;f<Me;++f)t[f]=t[f-oe]}}e.l=d,e.p=ze,e.b=f,e.f=u,d&&(u=1,e.m=_,e.d=m,e.n=g)}while(!u);return f!=t.length&&o?Sx(t,0,f):t.subarray(0,f)},Ex=new ln(0),wx=function(r,e){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&vn(6,"invalid zlib data"),(r[1]>>5&1)==1&&vn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function Ax(r,e){return bx(r.subarray(wx(r),-4),{i:2},e,e)}var Rx=typeof TextDecoder<"u"&&new TextDecoder,Cx=0;try{Rx.decode(Ex,{stream:!0}),Cx=1}catch{}function sf(r,e,t){const n=t.length-r-1;if(e>=t[n])return n-1;if(e<=t[r])return r;let i=r,s=n,o=Math.floor((i+s)/2);for(;e<t[o]||e>=t[o+1];)e<t[o]?s=o:i=o,o=Math.floor((i+s)/2);return o}function Px(r,e,t,n){const i=[],s=[],o=[];i[0]=1;for(let a=1;a<=t;++a){s[a]=e-n[r+1-a],o[a]=n[r+a]-e;let c=0;for(let l=0;l<a;++l){const u=o[l+1],h=s[a-l],f=i[l]/(u+h);i[l]=c+u*f,c=h*f}i[a]=c}return i}function Ix(r,e,t,n){const i=sf(r,n,e),s=Px(i,n,r,e),o=new it(0,0,0,0);for(let a=0;a<=r;++a){const c=t[i-r+a],l=s[a],u=c.w*l;o.x+=c.x*u,o.y+=c.y*u,o.z+=c.z*u,o.w+=c.w*l}return o}function Lx(r,e,t,n,i){const s=[];for(let h=0;h<=t;++h)s[h]=0;const o=[];for(let h=0;h<=n;++h)o[h]=s.slice(0);const a=[];for(let h=0;h<=t;++h)a[h]=s.slice(0);a[0][0]=1;const c=s.slice(0),l=s.slice(0);for(let h=1;h<=t;++h){c[h]=e-i[r+1-h],l[h]=i[r+h]-e;let f=0;for(let d=0;d<h;++d){const m=l[d+1],_=c[h-d];a[h][d]=m+_;const g=a[d][h-1]/a[h][d];a[d][h]=f+m*g,f=_*g}a[h][h]=f}for(let h=0;h<=t;++h)o[0][h]=a[h][t];for(let h=0;h<=t;++h){let f=0,d=1;const m=[];for(let _=0;_<=t;++_)m[_]=s.slice(0);m[0][0]=1;for(let _=1;_<=n;++_){let g=0;const p=h-_,b=t-_;h>=_&&(m[d][0]=m[f][0]/a[b+1][p],g=m[d][0]*a[p][b]);const v=p>=-1?1:-p,x=h-1<=b?_-1:t-h;for(let w=v;w<=x;++w)m[d][w]=(m[f][w]-m[f][w-1])/a[b+1][p+w],g+=m[d][w]*a[p+w][b];h<=b&&(m[d][_]=-m[f][_-1]/a[b+1][h],g+=m[d][_]*a[h][b]),o[_][h]=g;const R=f;f=d,d=R}}let u=t;for(let h=1;h<=n;++h){for(let f=0;f<=t;++f)o[h][f]*=u;u*=t-h}return o}function Dx(r,e,t,n,i){const s=i<r?i:r,o=[],a=sf(r,n,e),c=Lx(a,n,r,s,e),l=[];for(let u=0;u<t.length;++u){const h=t[u].clone(),f=h.w;h.x*=f,h.y*=f,h.z*=f,l[u]=h}for(let u=0;u<=s;++u){const h=l[a-r].clone().multiplyScalar(c[u][0]);for(let f=1;f<=r;++f)h.add(l[a-r+f].clone().multiplyScalar(c[u][f]));o[u]=h}for(let u=s+1;u<=i+1;++u)o[u]=new it(0,0,0);return o}function Nx(r,e){let t=1;for(let i=2;i<=r;++i)t*=i;let n=1;for(let i=2;i<=e;++i)n*=i;for(let i=2;i<=r-e;++i)n*=i;return t/n}function Ux(r){const e=r.length,t=[],n=[];for(let s=0;s<e;++s){const o=r[s];t[s]=new L(o.x,o.y,o.z),n[s]=o.w}const i=[];for(let s=0;s<e;++s){const o=t[s].clone();for(let a=1;a<=s;++a)o.sub(i[s-a].clone().multiplyScalar(Nx(s,a)*n[a]));i[s]=o.divideScalar(n[0])}return i}function Fx(r,e,t,n,i){const s=Dx(r,e,t,n,i);return Ux(s)}class Ox extends bn{constructor(e,t,n,i,s){super();const o=t?t.length-1:0,a=n?n.length:0;this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=i||0,this.endKnot=s||o;for(let c=0;c<a;++c){const l=n[c];this.controlPoints[c]=new it(l.x,l.y,l.z,l.w)}}getPoint(e,t=new L){const n=t,i=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=Ix(this.degree,this.knots,this.controlPoints,i);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new L){const n=t,i=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=Fx(this.degree,this.knots,this.controlPoints,i,1);return n.copy(s[1]).normalize(),n}toJSON(){const e=super.toJSON();return e.degree=this.degree,e.knots=[...this.knots],e.controlPoints=this.controlPoints.map(t=>t.toArray()),e.startKnot=this.startKnot,e.endKnot=this.endKnot,e}fromJSON(e){return super.fromJSON(e),this.degree=e.degree,this.knots=[...e.knots],this.controlPoints=e.controlPoints.map(t=>new it(t[0],t[1],t[2],t[3])),this.startKnot=e.startKnot,this.endKnot=e.endKnot,this}}let Qe,At,Xt;class Bx extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,o=s.path===""?Ms.extractUrlBase(e):s.path,a=new Fo(this.manager);a.setPath(s.path),a.setResponseType("arraybuffer"),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(c){try{t(s.parse(c,o))}catch(l){i?i(l):console.error(l),s.manager.itemError(e)}},n,i)}parse(e,t){if(Wx(e))Qe=new Gx().parse(e);else{const i=af(e);if(!Xx(i))throw new Error("THREE.FBXLoader: Unknown format.");if(Wh(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Wh(i));Qe=new Vx().parse(i)}const n=new rl(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new kx(n,this.manager).parse(Qe)}}class kx{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){At=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),i=this.parseDeformers(),s=new zx().parse(i);return this.parseScene(i,s,n),Xt}parseConnections(){const e=new Map;return"Connections"in Qe&&Qe.Connections.connections.forEach(function(n){const i=n[0],s=n[1],o=n[2];e.has(i)||e.set(i,{parents:[],children:[]});const a={ID:s,relationship:o};e.get(i).parents.push(a),e.has(s)||e.set(s,{parents:[],children:[]});const c={ID:i,relationship:o};e.get(s).children.push(c)}),e}parseImages(){const e={},t={};if("Video"in Qe.Objects){const n=Qe.Objects.Video;for(const i in n){const s=n[i],o=parseInt(i);if(e[o]=s.RelativeFilename||s.Filename,"Content"in s){const a=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,c=typeof s.Content=="string"&&s.Content!=="";if(a||c){const l=this.parseImage(n[i]);t[s.RelativeFilename||s.Filename]=l}}}}for(const n in e){const i=e[n];t[i]!==void 0?e[n]=t[i]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(i){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;case"webp":s="image/webp";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const o=new Uint8Array(t);return window.URL.createObjectURL(new Blob([o],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Qe.Objects){const n=Qe.Objects.Texture;for(const i in n){const s=this.parseTexture(n[i],e);t.set(parseInt(i),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const i=e.WrapModeU,s=e.WrapModeV,o=i!==void 0?i.value:0,a=s!==void 0?s.value:0;if(n.wrapS=o===0?vi:In,n.wrapT=a===0?vi:In,"Scaling"in e){const c=e.Scaling.value;n.repeat.x=c[0],n.repeat.y=c[1]}if("Translation"in e){const c=e.Translation.value;n.offset.x=c[0],n.offset.y=c[1]}return n}loadTexture(e,t){const n=e.FileName.split(".").pop().toLowerCase();let i=this.manager.getHandler(`.${n}`);i===null&&(i=this.textureLoader);const s=i.path;s||i.setPath(this.textureLoader.path);const o=At.get(e.id).children;let a;if(o!==void 0&&o.length>0&&t[o[0].ID]!==void 0&&(a=t[o[0].ID],(a.indexOf("blob:")===0||a.indexOf("data:")===0)&&i.setPath(void 0)),a===void 0)return console.warn("FBXLoader: Undefined filename, creating placeholder texture."),new Pt;const c=i.load(a);return i.setPath(s),c}parseMaterials(e){const t=new Map;if("Material"in Qe.Objects){const n=Qe.Objects.Material;for(const i in n){const s=this.parseMaterial(n[i],e);s!==null&&t.set(parseInt(i),s)}}return t}parseMaterial(e,t){const n=e.id,i=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!At.has(n))return null;const o=this.parseParameters(e,t,n);let a;switch(s.toLowerCase()){case"phong":a=new Zr;break;case"lambert":a=new Zp;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),a=new Zr;break}return a.setValues(o),a.name=i,a}parseParameters(e,t,n){const i={};e.BumpFactor&&(i.bumpScale=e.BumpFactor.value),e.Diffuse?i.color=Ke.colorSpaceToWorking(new be().fromArray(e.Diffuse.value),ot):e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(i.color=Ke.colorSpaceToWorking(new be().fromArray(e.DiffuseColor.value),ot)),e.DisplacementFactor&&(i.displacementScale=e.DisplacementFactor.value),e.Emissive?i.emissive=Ke.colorSpaceToWorking(new be().fromArray(e.Emissive.value),ot):e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(i.emissive=Ke.colorSpaceToWorking(new be().fromArray(e.EmissiveColor.value),ot)),e.EmissiveFactor&&(i.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),i.opacity=1-(e.TransparencyFactor?parseFloat(e.TransparencyFactor.value):0),(i.opacity===1||i.opacity===0)&&(i.opacity=e.Opacity?parseFloat(e.Opacity.value):null,i.opacity===null&&(i.opacity=1-(e.TransparentColor?parseFloat(e.TransparentColor.value[0]):0))),i.opacity<1&&(i.transparent=!0),e.ReflectionFactor&&(i.reflectivity=e.ReflectionFactor.value),e.Shininess&&(i.shininess=e.Shininess.value),e.Specular?i.specular=Ke.colorSpaceToWorking(new be().fromArray(e.Specular.value),ot):e.SpecularColor&&e.SpecularColor.type==="Color"&&(i.specular=Ke.colorSpaceToWorking(new be().fromArray(e.SpecularColor.value),ot));const s=this;return At.get(n).children.forEach(function(o){const a=o.relationship;switch(a){case"Bump":i.bumpMap=s.getTexture(t,o.ID);break;case"Maya|TEX_ao_map":i.aoMap=s.getTexture(t,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=s.getTexture(t,o.ID),i.map!==void 0&&(i.map.colorSpace=ot);break;case"DisplacementColor":i.displacementMap=s.getTexture(t,o.ID);break;case"EmissiveColor":i.emissiveMap=s.getTexture(t,o.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=ot);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=s.getTexture(t,o.ID);break;case"ReflectionColor":i.envMap=s.getTexture(t,o.ID),i.envMap!==void 0&&(i.envMap.mapping=mo,i.envMap.colorSpace=ot);break;case"SpecularColor":i.specularMap=s.getTexture(t,o.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=ot);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=s.getTexture(t,o.ID),i.transparent=!0;break;default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(e,t){return"LayeredTexture"in Qe.Objects&&t in Qe.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=At.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Qe.Objects){const n=Qe.Objects.Deformer;for(const i in n){const s=n[i],o=At.get(parseInt(i));if(s.attrType==="Skin"){const a=this.parseSkeleton(o,n);a.ID=i,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,e[i]=a}else if(s.attrType==="BlendShape"){const a={id:i};a.rawTargets=this.parseMorphTargets(o,n),a.id=i,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[i]=a}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(i){const s=t[i.ID];if(s.attrType!=="Cluster")return;const o={ID:i.ID,indices:[],weights:[],transformLink:new we().fromArray(s.TransformLink.a)};"Indexes"in s&&(o.indices=s.Indexes.a,o.weights=s.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let i=0;i<e.children.length;i++){const s=e.children[i],o=t[s.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=At.get(parseInt(s.ID)).children.filter(function(c){return c.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(e,t,n){Xt=new _t;const i=this.parseModels(e.skeletons,t,n),s=Qe.Objects.Model,o=this;i.forEach(function(c){const l=s[c.ID];o.setLookAtProperties(c,l),At.get(c.ID).parents.forEach(function(h){const f=i.get(h.ID);f!==void 0&&f.add(c)}),c.parent===null&&Xt.add(c)}),this.bindSkeleton(e.skeletons,t,i),this.addGlobalSceneSettings(),Xt.traverse(function(c){if(c.userData.transformData){c.parent&&(c.userData.transformData.parentMatrix=c.parent.matrix,c.userData.transformData.parentMatrixWorld=c.parent.matrixWorld);const l=of(c.userData.transformData);c.applyMatrix4(l),c.updateWorldMatrix()}});const a=new Hx().parse();Xt.children.length===1&&Xt.children[0].isGroup&&(Xt.children[0].animations=a,Xt=Xt.children[0]),Xt.animations=a}parseModels(e,t,n){const i=new Map,s=Qe.Objects.Model;for(const o in s){const a=parseInt(o),c=s[o],l=At.get(a);let u=this.buildSkeleton(l,e,a,c.attrName);if(!u){switch(c.attrType){case"Camera":u=this.createCamera(l);break;case"Light":u=this.createLight(l);break;case"Mesh":u=this.createMesh(l,t,n);break;case"NurbsCurve":u=this.createCurve(l,t);break;case"LimbNode":case"Root":u=new yo;break;default:u=new _t;break}u.name=c.attrName?st.sanitizeNodeName(c.attrName):"",u.userData.originalName=c.attrName,u.ID=a}this.getTransformData(u,c),i.set(a,u)}return i}buildSkeleton(e,t,n,i){let s=null;return e.parents.forEach(function(o){for(const a in t){const c=t[a];c.rawBones.forEach(function(l,u){if(l.ID===o.ID){const h=s;s=new yo,s.matrixWorld.copy(l.transformLink),s.name=i?st.sanitizeNodeName(i):"",s.userData.originalName=i,s.ID=n,c.bones[u]=s,h!==null&&s.add(h)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(i){const s=Qe.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new pt;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,c=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,c=n.AspectHeight.value);const l=a/c;let u=45;n.FieldOfView!==void 0&&(u=n.FieldOfView.value);const h=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:t=new Ut(u,l,s,o),h!==null&&t.setFocalLength(h);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),t=new pt;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),t=new pt;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(i){const s=Qe.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new pt;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=Ke.colorSpaceToWorking(new be().fromArray(n.Color.value),ot));let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);const c=1;switch(i){case 0:t=new bo(s,o,a,c);break;case 1:t=new yr(s,o);break;case 2:let l=Math.PI/3;n.InnerAngle!==void 0&&(l=We.degToRad(n.InnerAngle.value));let u=0;n.OuterAngle!==void 0&&(u=We.degToRad(n.OuterAngle.value),u=Math.max(u,1)),t=new Vu(s,o,a,l,u,c);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new bo(s,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let i,s=null,o=null;const a=[];if(e.children.forEach(function(c){t.has(c.ID)&&(s=t.get(c.ID)),n.has(c.ID)&&a.push(n.get(c.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new Zr({name:Un.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in s.attributes&&a.forEach(function(c){c.vertexColors=!0}),s.groups.length>0){let c=!1;for(let l=0,u=s.groups.length;l<u;l++){const h=s.groups[l];(h.materialIndex<0||h.materialIndex>=a.length)&&(h.materialIndex=a.length,c=!0)}if(c){const l=new Zr;a.push(l)}}return s.FBX_Deformer?(i=new wu(s,o),i.normalizeSkinWeights()):i=new rt(s,o),i}createCurve(e,t){const n=e.children.reduce(function(s,o){return t.has(o.ID)&&(s=t.get(o.ID)),s},null),i=new Lo({name:Un.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Do(n,i)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=gr(t.RotationOrder.value):n.eulerOrder=gr(0),"Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&At.get(e.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){const s=Qe.Objects.Model[i.ID];if("Lcl_Translation"in s){const o=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(o),Xt.add(e.target)):e.lookAt(new L().fromArray(o))}}})}bindSkeleton(e,t,n){const i=this.parsePoseNodes();for(const s in e){const o=e[s];At.get(parseInt(o.ID)).parents.forEach(function(c){if(t.has(c.ID)){const l=c.ID;At.get(l).parents.forEach(function(h){n.has(h.ID)&&n.get(h.ID).bind(new Io(o.bones),i[h.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in Qe.Objects){const t=Qe.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const i=t[n].PoseNode;Array.isArray(i)?i.forEach(function(s){e[s.Node]=new we().fromArray(s.Matrix.a)}):e[i.Node]=new we().fromArray(i.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Qe){if("AmbientColor"in Qe.GlobalSettings){const e=Qe.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],i=e[2];if(t!==0||n!==0||i!==0){const s=new be().setRGB(t,n,i,ot);Xt.add(new pm(s,1))}}"UnitScaleFactor"in Qe.GlobalSettings&&(Xt.userData.unitScaleFactor=Qe.GlobalSettings.UnitScaleFactor.value)}}}class zx{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Qe.Objects){const n=Qe.Objects.Geometry;for(const i in n){const s=At.get(parseInt(i)),o=this.parseGeometry(s,n[i],e);t.set(parseInt(i),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const i=n.skeletons,s=[],o=e.parents.map(function(h){return Qe.Objects.Model[h.ID]});if(o.length===0)return;const a=e.children.reduce(function(h,f){return i[f.ID]!==void 0&&(h=i[f.ID]),h},null);e.children.forEach(function(h){n.morphTargets[h.ID]!==void 0&&s.push(n.morphTargets[h.ID])});const c=o[0],l={};"RotationOrder"in c&&(l.eulerOrder=gr(c.RotationOrder.value)),"InheritType"in c&&(l.inheritType=parseInt(c.InheritType.value)),"GeometricTranslation"in c&&(l.translation=c.GeometricTranslation.value),"GeometricRotation"in c&&(l.rotation=c.GeometricRotation.value),"GeometricScaling"in c&&(l.scale=c.GeometricScaling.value);const u=of(l);return this.genGeometry(t,a,s,u)}genGeometry(e,t,n,i){const s=new Et;e.attrName&&(s.name=e.attrName);const o=this.parseGeoNode(e,t),a=this.genBuffers(o),c=new dt(a.vertex,3);if(c.applyMatrix4(i),s.setAttribute("position",c),a.colors.length>0&&s.setAttribute("color",new dt(a.colors,3)),t&&(s.setAttribute("skinIndex",new Qc(a.weightsIndices,4)),s.setAttribute("skinWeight",new dt(a.vertexWeights,4)),s.FBX_Deformer=t),a.normal.length>0){const l=new je().getNormalMatrix(i),u=new dt(a.normal,3);u.applyNormalMatrix(l),s.setAttribute("normal",u)}if(a.uvs.forEach(function(l,u){const h=u===0?"uv":`uv${u}`;s.setAttribute(h,new dt(a.uvs[u],2))}),o.material&&o.material.mappingType!=="AllSame"){let l=a.materialIndex[0],u=0;if(a.materialIndex.forEach(function(h,f){h!==l&&(s.addGroup(u,f-u,l),l=h,u=f)}),s.groups.length>0){const h=s.groups[s.groups.length-1],f=h.start+h.count;f!==a.materialIndex.length&&s.addGroup(f,a.materialIndex.length-f,l)}s.groups.length===0&&s.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(s,e,n,i),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&e.LayerElementColor[0].Colors&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let i=0;for(;e.LayerElementUV[i];)e.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[i])),i++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(i,s){i.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:s,weight:i.weights[a]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,i=0,s=!1,o=[],a=[],c=[],l=[],u=[],h=[];const f=this;return e.vertexIndices.forEach(function(d,m){let _,g=!1;d<0&&(d=d^-1,g=!0);let p=[],b=[];if(o.push(d*3,d*3+1,d*3+2),e.color){const v=no(m,n,d,e.color);c.push(v[0],v[1],v[2])}if(e.skeleton){if(e.weightTable[d]!==void 0&&e.weightTable[d].forEach(function(v){b.push(v.weight),p.push(v.id)}),b.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const v=[0,0,0,0],x=[0,0,0,0];b.forEach(function(R,w){let A=R,I=p[w];x.forEach(function(S,M,C){if(A>S){C[M]=A,A=S;const U=v[M];v[M]=I,I=U}})}),p=v,b=x}for(;b.length<4;)b.push(0),p.push(0);for(let v=0;v<4;++v)u.push(b[v]),h.push(p[v])}if(e.normal){const v=no(m,n,d,e.normal);a.push(v[0],v[1],v[2])}e.material&&e.material.mappingType!=="AllSame"&&(_=no(m,n,d,e.material)[0],_<0&&(f.negativeMaterialIndices=!0,_=0)),e.uv&&e.uv.forEach(function(v,x){const R=no(m,n,d,v);l[x]===void 0&&(l[x]=[]),l[x].push(R[0]),l[x].push(R[1])}),i++,g&&(f.genFace(t,e,o,_,a,c,l,u,h,i),n++,i=0,o=[],a=[],c=[],l=[],u=[],h=[])}),t}getNormalNewell(e){const t=new L(0,0,0);for(let n=0;n<e.length;n++){const i=e[n],s=e[(n+1)%e.length];t.x+=(i.y-s.y)*(i.z+s.z),t.y+=(i.z-s.z)*(i.x+s.x),t.z+=(i.x-s.x)*(i.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),i=(Math.abs(t.z)>.5?new L(0,1,0):new L(0,0,1)).cross(t).normalize(),s=t.clone().cross(i).normalize();return{normal:t,tangent:i,bitangent:s}}flattenVertex(e,t,n){return new pe(e.dot(t),e.dot(n))}genFace(e,t,n,i,s,o,a,c,l,u){let h;if(u>3){const f=[],d=t.baseVertexPositions||t.vertexPositions;for(let p=0;p<n.length;p+=3)f.push(new L(d[n[p]],d[n[p+1]],d[n[p+2]]));const{tangent:m,bitangent:_}=this.getNormalTangentAndBitangent(f),g=[];for(const p of f)g.push(this.flattenVertex(p,m,_));h=mi.triangulateShape(g,[])}else h=[[0,1,2]];for(const[f,d,m]of h)e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[d*3]]),e.vertex.push(t.vertexPositions[n[d*3+1]]),e.vertex.push(t.vertexPositions[n[d*3+2]]),e.vertex.push(t.vertexPositions[n[m*3]]),e.vertex.push(t.vertexPositions[n[m*3+1]]),e.vertex.push(t.vertexPositions[n[m*3+2]]),t.skeleton&&(e.vertexWeights.push(c[f*4]),e.vertexWeights.push(c[f*4+1]),e.vertexWeights.push(c[f*4+2]),e.vertexWeights.push(c[f*4+3]),e.vertexWeights.push(c[d*4]),e.vertexWeights.push(c[d*4+1]),e.vertexWeights.push(c[d*4+2]),e.vertexWeights.push(c[d*4+3]),e.vertexWeights.push(c[m*4]),e.vertexWeights.push(c[m*4+1]),e.vertexWeights.push(c[m*4+2]),e.vertexWeights.push(c[m*4+3]),e.weightsIndices.push(l[f*4]),e.weightsIndices.push(l[f*4+1]),e.weightsIndices.push(l[f*4+2]),e.weightsIndices.push(l[f*4+3]),e.weightsIndices.push(l[d*4]),e.weightsIndices.push(l[d*4+1]),e.weightsIndices.push(l[d*4+2]),e.weightsIndices.push(l[d*4+3]),e.weightsIndices.push(l[m*4]),e.weightsIndices.push(l[m*4+1]),e.weightsIndices.push(l[m*4+2]),e.weightsIndices.push(l[m*4+3])),t.color&&(e.colors.push(o[f*3]),e.colors.push(o[f*3+1]),e.colors.push(o[f*3+2]),e.colors.push(o[d*3]),e.colors.push(o[d*3+1]),e.colors.push(o[d*3+2]),e.colors.push(o[m*3]),e.colors.push(o[m*3+1]),e.colors.push(o[m*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(i),e.materialIndex.push(i),e.materialIndex.push(i)),t.normal&&(e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[d*3]),e.normal.push(s[d*3+1]),e.normal.push(s[d*3+2]),e.normal.push(s[m*3]),e.normal.push(s[m*3+1]),e.normal.push(s[m*3+2])),t.uv&&t.uv.forEach(function(_,g){e.uvs[g]===void 0&&(e.uvs[g]=[]),e.uvs[g].push(a[g][f*2]),e.uvs[g].push(a[g][f*2+1]),e.uvs[g].push(a[g][d*2]),e.uvs[g].push(a[g][d*2+1]),e.uvs[g].push(a[g][m*2]),e.uvs[g].push(a[g][m*2+1])})}addMorphTargets(e,t,n,i){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=this;n.forEach(function(o){o.rawTargets.forEach(function(a){const c=Qe.Objects.Geometry[a.geoID];c!==void 0&&s.genMorphGeometry(e,t,c,i,a.name)})})}genMorphGeometry(e,t,n,i,s){const o=t.Vertices!==void 0?t.Vertices.a:[],a=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],c=n.Vertices!==void 0?n.Vertices.a:[],l=n.Indexes!==void 0?n.Indexes.a:[],u=e.attributes.position.count*3,h=new Float32Array(u);for(let _=0;_<l.length;_++){const g=l[_]*3;h[g]=c[_*3],h[g+1]=c[_*3+1],h[g+2]=c[_*3+2]}const f={vertexIndices:a,vertexPositions:h,baseVertexPositions:o},d=this.genBuffers(f),m=new dt(d.vertex,3);m.name=s||n.attrName,m.applyMatrix4(i),e.morphAttributes.position.push(m)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:i,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:i,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let o=0,a=new be;o<i.length;o+=4)a.fromArray(i,o),Ke.colorSpaceToWorking(a,ot),a.toArray(i,o);return{dataSize:4,buffer:i,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const i=e.Materials.a,s=[];for(let o=0;o<i.length;++o)s.push(o);return{dataSize:1,buffer:i,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new Et;const n=t-1,i=e.KnotVector.a,s=[],o=e.Points.a;for(let h=0,f=o.length;h<f;h+=4)s.push(new it().fromArray(o,h));let a,c;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){a=n,c=i.length-1-a;for(let h=0;h<n;++h)s.push(s[h])}const u=new Ox(n,i,s,a,c).getPoints(s.length*12);return new Et().setFromPoints(u)}}class Hx{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const i=t[n],s=this.addClip(i);e.push(s)}return e}parseClips(){if(Qe.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Qe.Objects.AnimationCurveNode,t=new Map;for(const n in e){const i=e[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:i.id,attr:i.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Qe.Objects.AnimationCurve;for(const n in t){const i={id:t[n].id,times:t[n].KeyTime.a.map(qx),values:t[n].KeyValueFloat.a},s=At.get(i.id);if(s!==void 0){const o=s.parents[0].ID,a=s.parents[0].relationship;a.match(/X/)?e.get(o).curves.x=i:a.match(/Y/)?e.get(o).curves.y=i:a.match(/Z/)?e.get(o).curves.z=i:a.match(/DeformPercent/)&&e.has(o)&&(e.get(o).curves.morph=i)}}}parseAnimationLayers(e){const t=Qe.Objects.AnimationLayer,n=new Map;for(const i in t){const s=[],o=At.get(parseInt(i));o!==void 0&&(o.children.forEach(function(c,l){if(e.has(c.ID)){const u=e.get(c.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[l]===void 0){const h=At.get(c.ID).parents.filter(function(f){return f.relationship!==void 0})[0].ID;if(h!==void 0){const f=Qe.Objects.Model[h.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",c);return}const d={modelName:f.attrName?st.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Xt.traverse(function(m){m.ID===f.id&&(d.transform=m.matrix,m.userData.transformData&&(d.eulerOrder=m.userData.transformData.eulerOrder))}),d.transform||(d.transform=new we),"PreRotation"in f&&(d.preRotation=f.PreRotation.value),"PostRotation"in f&&(d.postRotation=f.PostRotation.value),s[l]=d}}s[l]&&(s[l][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[l]===void 0){const h=At.get(c.ID).parents.filter(function(p){return p.relationship!==void 0})[0].ID,f=At.get(h).parents[0].ID,d=At.get(f).parents[0].ID,m=At.get(d).parents[0].ID,_=Qe.Objects.Model[m],g={modelName:_.attrName?st.sanitizeNodeName(_.attrName):"",morphName:Qe.Objects.Deformer[h].attrName};s[l]=g}s[l][u.attr]=u}}}),n.set(parseInt(i),s))}return n}parseAnimStacks(e){const t=Qe.Objects.AnimationStack,n={};for(const i in t){const s=At.get(parseInt(i)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const o=e.get(s[0].ID);n[i]={name:t[i].attrName,layer:o}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(i){t=t.concat(n.generateTracks(i))}),new Ps(e.name,-1,t)}generateTracks(e){const t=[];let n=new L,i=new L;if(e.transform&&e.transform.decompose(n,new Mt,i),n=n.toArray(),i=i.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,i,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,i){const s=this.getTimesForAllAxes(t),o=this.getKeyframeTrackValues(s,t,n);return new Gi(e+"."+i,s,o)}generateRotationTrack(e,t,n,i,s){let o,a;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){const f=this.interpolateRotations(t.x,t.y,t.z,s);o=f[0],a=f[1]}const c=gr(0);n!==void 0&&(n=n.map(We.degToRad),n.push(c),n=new Ct().fromArray(n),n=new Mt().setFromEuler(n)),i!==void 0&&(i=i.map(We.degToRad),i.push(c),i=new Ct().fromArray(i),i=new Mt().setFromEuler(i).invert());const l=new Mt,u=new Ct,h=[];if(!a||!o)return new ii(e+".quaternion",[0],[0]);for(let f=0;f<a.length;f+=3)u.set(a[f],a[f+1],a[f+2],s),l.setFromEuler(u),n!==void 0&&l.premultiply(n),i!==void 0&&l.multiply(i),f>2&&new Mt().fromArray(h,(f-3)/3*4).dot(l)<0&&l.set(-l.x,-l.y,-l.z,-l.w),l.toArray(h,f/3*4);return new ii(e+".quaternion",o,h)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),i=Xt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new ni(e.modelName+".morphTargetInfluences["+i+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,i){return n-i}),t.length>1){let n=1,i=t[0];for(let s=1;s<t.length;s++){const o=t[s];o!==i&&(t[n]=o,i=o,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const i=n,s=[];let o=-1,a=-1,c=-1;return e.forEach(function(l){if(t.x&&(o=t.x.times.indexOf(l)),t.y&&(a=t.y.times.indexOf(l)),t.z&&(c=t.z.times.indexOf(l)),o!==-1){const u=t.x.values[o];s.push(u),i[0]=u}else s.push(i[0]);if(a!==-1){const u=t.y.values[a];s.push(u),i[1]=u}else s.push(i[1]);if(c!==-1){const u=t.z.values[c];s.push(u),i[2]=u}else s.push(i[2])}),s}interpolateRotations(e,t,n,i){const s=[],o=[];s.push(e.times[0]),o.push(We.degToRad(e.values[0])),o.push(We.degToRad(t.values[0])),o.push(We.degToRad(n.values[0]));for(let a=1;a<e.values.length;a++){const c=[e.values[a-1],t.values[a-1],n.values[a-1]];if(isNaN(c[0])||isNaN(c[1])||isNaN(c[2]))continue;const l=c.map(We.degToRad),u=[e.values[a],t.values[a],n.values[a]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;const h=u.map(We.degToRad),f=[u[0]-c[0],u[1]-c[1],u[2]-c[2]],d=[Math.abs(f[0]),Math.abs(f[1]),Math.abs(f[2])];if(d[0]>=180||d[1]>=180||d[2]>=180){const _=Math.max(...d)/180,g=new Ct(...l,i),p=new Ct(...h,i),b=new Mt().setFromEuler(g),v=new Mt().setFromEuler(p);b.dot(v)&&v.set(-v.x,-v.y,-v.z,-v.w);const x=e.times[a-1],R=e.times[a]-x,w=new Mt,A=new Ct;for(let I=0;I<1;I+=1/_)w.copy(b.clone().slerp(v.clone(),I)),s.push(x+I*R),A.setFromQuaternion(w,i),o.push(A.x),o.push(A.y),o.push(A.z)}else s.push(e.times[a]),o.push(We.degToRad(e.values[a])),o.push(We.degToRad(t.values[a])),o.push(We.degToRad(n.values[a]))}return[s,o]}}class Vx{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new rf,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(i,s){const o=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(o||a)return;const c=i.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),l=i.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=i.match("^\\t{"+(t.currentIndent-1)+"}}");c?t.parseNodeBegin(i,c):l?t.parseNodeProperty(i,l,n[++s]):u?t.popStack():i.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),i=t[2].split(",").map(function(c){return c.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},o=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in a?(n==="PoseNode"?a.PoseNode.push(s):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=s)):typeof o.id=="number"?(a[n]={},a[n][o.id]=s):n!=="Properties70"&&(n==="PoseNode"?a[n]=[s]:a[n]=s),typeof o.id=="number"&&(s.id=o.id),o.name!==""&&(s.attrName=o.name),o.type!==""&&(s.attrType=o.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",i="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),i=e[2]),{id:t,name:n,type:i}}parseNodeProperty(e,t,n){let i=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(e,i,s);return}if(i==="C"){const c=s.split(",").slice(1),l=parseInt(c[0]),u=parseInt(c[1]);let h=s.split(",").slice(3);h=h.map(function(f){return f.trim().replace(/^"/,"")}),i="connections",s=[l,u],jx(s,h),o[i]===void 0&&(o[i]=[])}i==="Node"&&(o.id=s),i in o&&Array.isArray(o[i])?o[i].push(s):i!=="a"?o[i]=s:o.a=s,this.setCurrentProp(o,i),i==="a"&&s.slice(-1)!==","&&(o.a=Pa(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=Pa(t.a))}parseNodeSpecialProperty(e,t,n){const i=n.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=i[0],o=i[1],a=i[2],c=i[3];let l=i[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":l=parseFloat(l);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":l=Pa(l);break}this.getPrevNode()[s]={type:o,type2:a,flag:c,value:l},this.setCurrentProp(this.getPrevNode(),s)}}class Gx{parse(e){const t=new Gh(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const i=new rf;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&i.add(s.name,s)}return i}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},i=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const o=e.getUint8(),a=e.getString(o);if(i===0)return null;const c=[];for(let f=0;f<s;f++)c.push(this.parseProperty(e));const l=c.length>0?c[0]:"",u=c.length>1?c[1]:"",h=c.length>2?c[2]:"";for(n.singleProperty=s===1&&e.getOffset()===i;i>e.getOffset();){const f=this.parseNode(e,t);f!==null&&this.parseSubNode(a,n,f)}return n.propertyList=c,typeof l=="number"&&(n.id=l),u!==""&&(n.attrName=u),h!==""&&(n.attrType=h),a!==""&&(n.name=a),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const i=n.propertyList[0];Array.isArray(i)?(t[n.name]=n,n.a=i):t[n.name]=i}else if(e==="Connections"&&n.name==="C"){const i=[];n.propertyList.forEach(function(s,o){o!==0&&i.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let i=n.propertyList[0],s=n.propertyList[1];const o=n.propertyList[2],a=n.propertyList[3];let c;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?c=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:c=n.propertyList[4],t[i]={type:s,type2:o,flag:a,value:c}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const i=e.getUint32(),s=e.getUint32(),o=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(i);case"d":return e.getFloat64Array(i);case"f":return e.getFloat32Array(i);case"i":return e.getInt32Array(i);case"l":return e.getInt64Array(i)}const a=Ax(new Uint8Array(e.getArrayBuffer(o))),c=new Gh(a.buffer);switch(t){case"b":case"c":return c.getBooleanArray(i);case"d":return c.getFloat64Array(i);case"f":return c.getFloat32Array(i);case"i":return c.getInt32Array(i);case"l":return c.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class Gh{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,t,i)),this._textDecoder.decode(n)}}class rf{add(e,t){this[e]=t}}function Wx(r){const e="Kaydara FBX Binary  \0";return r.byteLength>=e.length&&e===af(r,0,e.length)}function Xx(r){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(i){const s=r[i-1];return r=r.slice(t+i),t++,s}for(let i=0;i<e.length;++i)if(n(1)===e[i])return!1;return!0}function Wh(r){const e=/FBXVersion: (\d+)/,t=r.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function qx(r){return r/46186158e3}const Yx=[];function no(r,e,t,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=r;break;case"ByPolygon":i=e;break;case"ByVertice":i=t;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);const s=i*n.dataSize,o=s+n.dataSize;return Kx(Yx,n.buffer,s,o)}const Ca=new Ct,hs=new L;function of(r){const e=new we,t=new we,n=new we,i=new we,s=new we,o=new we,a=new we,c=new we,l=new we,u=new we,h=new we,f=new we,d=r.inheritType?r.inheritType:0;r.translation&&e.setPosition(hs.fromArray(r.translation));const m=gr(0);if(r.preRotation){const C=r.preRotation.map(We.degToRad);C.push(m),t.makeRotationFromEuler(Ca.fromArray(C))}if(r.rotation){const C=r.rotation.map(We.degToRad);C.push(r.eulerOrder||m),n.makeRotationFromEuler(Ca.fromArray(C))}if(r.postRotation){const C=r.postRotation.map(We.degToRad);C.push(m),i.makeRotationFromEuler(Ca.fromArray(C)),i.invert()}r.scale&&s.scale(hs.fromArray(r.scale)),r.scalingOffset&&a.setPosition(hs.fromArray(r.scalingOffset)),r.scalingPivot&&o.setPosition(hs.fromArray(r.scalingPivot)),r.rotationOffset&&c.setPosition(hs.fromArray(r.rotationOffset)),r.rotationPivot&&l.setPosition(hs.fromArray(r.rotationPivot)),r.parentMatrixWorld&&(h.copy(r.parentMatrix),u.copy(r.parentMatrixWorld));const _=t.clone().multiply(n).multiply(i),g=new we;g.extractRotation(u);const p=new we;p.copyPosition(u);const b=p.clone().invert().multiply(u),v=g.clone().invert().multiply(b),x=s,R=new we;if(d===0)R.copy(g).multiply(_).multiply(v).multiply(x);else if(d===1)R.copy(g).multiply(v).multiply(_).multiply(x);else{const U=new we().scale(new L().setFromMatrixScale(h)).clone().invert(),k=v.clone().multiply(U);R.copy(g).multiply(_).multiply(k).multiply(x)}const w=l.clone().invert(),A=o.clone().invert();let I=e.clone().multiply(c).multiply(l).multiply(t).multiply(n).multiply(i).multiply(w).multiply(a).multiply(o).multiply(s).multiply(A);const S=new we().copyPosition(I),M=u.clone().multiply(S);return f.copyPosition(M),I=f.clone().multiply(R),I.premultiply(u.invert()),I}function gr(r){r=r||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return r===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[r]}function Pa(r){return r.split(",").map(function(t){return parseFloat(t)})}function af(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=r.byteLength),new TextDecoder().decode(new Uint8Array(r,e,t))}function jx(r,e){for(let t=0,n=r.length,i=e.length;t<i;t++,n++)r[n]=e[t]}function Kx(r,e,t,n){for(let i=t,s=0;i<n;i++,s++)r[s]=e[i];return r}function $x(r){const e=new Map,t=new Map,n=r.clone();return cf(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function cf(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)cf(r.children[n],e.children[n],t)}class Zx extends No{constructor(e,t={}){const n=t.font;if(n===void 0)super();else{const i=n.generateShapes(e,t.size);t.depth===void 0&&(t.depth=50),t.bevelThickness===void 0&&(t.bevelThickness=10),t.bevelSize===void 0&&(t.bevelSize=8),t.bevelEnabled===void 0&&(t.bevelEnabled=!1),super(i,t)}this.type="TextGeometry"}}class Jx extends Un{constructor(e){super(e)}load(e,t,n,i){const s=this,o=new Fo(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){const c=s.parse(JSON.parse(a));t&&t(c)},n,i)}parse(e){return new Qx(e)}}class Qx{constructor(e){this.isFont=!0,this.type="Font",this.data=e}generateShapes(e,t=100){const n=[],i=ey(e,t,this.data);for(let s=0,o=i.length;s<o;s++)n.push(...i[s].toShapes());return n}}function ey(r,e,t){const n=Array.from(r),i=e/t.resolution,s=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*i,o=[];let a=0,c=0;for(let l=0;l<n.length;l++){const u=n[l];if(u===`
`)a=0,c-=s;else{const h=ty(u,i,a,c,t);a+=h.offsetX,o.push(h.path)}}return o}function ty(r,e,t,n,i){const s=i.glyphs[r]||i.glyphs["?"];if(!s){console.error('THREE.Font: character "'+r+'" does not exists in font family '+i.familyName+".");return}const o=new Cm;let a,c,l,u,h,f,d,m;if(s.o){const _=s._cachedOutline||(s._cachedOutline=s.o.split(" "));for(let g=0,p=_.length;g<p;)switch(_[g++]){case"m":a=_[g++]*e+t,c=_[g++]*e+n,o.moveTo(a,c);break;case"l":a=_[g++]*e+t,c=_[g++]*e+n,o.lineTo(a,c);break;case"q":l=_[g++]*e+t,u=_[g++]*e+n,h=_[g++]*e+t,f=_[g++]*e+n,o.quadraticCurveTo(h,f,l,u);break;case"b":l=_[g++]*e+t,u=_[g++]*e+n,h=_[g++]*e+t,f=_[g++]*e+n,d=_[g++]*e+t,m=_[g++]*e+n,o.bezierCurveTo(h,f,d,m,l,u);break}}return{offsetX:s.ha*e,path:o}}const ny={2:{x_min:64,x_max:764,ha:828,o:"m 764 685 q 675 452 764 541 q 484 325 637 415 q 307 168 357 250 l 754 168 l 754 0 l 64 0 q 193 301 64 175 q 433 480 202 311 q 564 673 564 576 q 519 780 564 737 q 416 824 475 824 q 318 780 358 824 q 262 633 270 730 l 80 633 q 184 903 80 807 q 415 988 276 988 q 654 907 552 988 q 764 685 764 819 "}},iy="bold",sy=1216,ry=-100,oy="normal",ay={yMin:-333,xMin:-162,yMax:1216,xMax:1681},cy=1e3,ly={postscript_name:"Helvetiker-Bold",version_string:"Version 1.00 2004 initial release",vendor_url:"http://www.magenta.gr",full_font_name:"Helvetiker Bold",font_family_name:"Helvetiker",copyright:"Copyright (c) Magenta ltd, 2004.",description:"",trademark:"",designer:"",designer_url:"",unique_font_identifier:"Magenta ltd:Helvetiker Bold:22-10-104",license_url:"http://www.ellak.gr/fonts/MgOpen/license.html",license_description:`Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of the fonts accompanying this license ("Fonts") and associated documentation files (the "Font Software"), to reproduce and distribute the Font Software, including without limitation the rights to use, copy, merge, publish, distribute, and/or sell copies of the Font Software, and to permit persons to whom the Font Software is furnished to do so, subject to the following conditions: \r
\r
The above copyright and this permission notice shall be included in all copies of one or more of the Font Software typefaces.\r
\r
The Font Software may be modified, altered, or added to, and in particular the designs of glyphs or characters in the Fonts may be modified and additional glyphs or characters may be added to the Fonts, only if the fonts are renamed to names not containing the word "MgOpen", or if the modifications are accepted for inclusion in the Font Software itself by the each appointed Administrator.\r
\r
This License becomes null and void to the extent applicable to Fonts or Font Software that has been modified and is distributed under the "MgOpen" name.\r
\r
The Font Software may be sold as part of a larger software package but no copy of one or more of the Font Software typefaces may be sold by itself. \r
\r
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL MAGENTA OR PERSONS OR BODIES IN CHARGE OF ADMINISTRATION AND MAINTENANCE OF THE FONT SOFTWARE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.`,manufacturer_name:"Magenta ltd",font_sub_family_name:"Bold"},hy=-334,uy="Helvetiker",fy=1549,dy=50,py={glyphs:ny,cssFontWeight:iy,ascender:sy,underlinePosition:ry,cssFontStyle:oy,boundingBox:ay,resolution:cy,original_font_information:ly,descender:hy,familyName:uy,lineHeight:fy,underlineThickness:dy},my=new Jx().parse(py),Ia=new Map,gy=(r,e=.2)=>{const t=`${r}:${e}`;return Ia.has(t)||Ia.set(t,new Nn({color:r,metalness:e,roughness:.35})),Ia.get(t)};function An(r,e,t,n=0,i=0,s=0){const o=new rt(e,gy(t));return o.position.set(n,i,s),o.castShadow=!0,r.add(o),o}function Ws(r,e,t,n,i,s=0,o=0,a=0){return An(r,new Si(e,t,n),i,s,o,a)}function La(r,e,t,n){const i=An(r,new No(e,{depth:t,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:16}),n);return i.position.z=-t/2,i}const _y={jet:'<path d="M12 2C7 6 7 12 9 16h6c2-4 2-10-3-14Z"/><path d="m8 10-4 6h4m8-6 4 6h-4M10 19l2 3 2-3"/><circle cx="12" cy="9" r="2"/>',magnet:'<path d="M4 4v10a8 8 0 0 0 16 0V4h-5v10a3 3 0 0 1-6 0V4Z"/><path d="M4 8h5m6 0h5"/>',double:'<path d="M3 8c1-5 8-4 8 0 0 3-7 5-7 9h8m3-9 6 8m0-8-6 8"/>',sneakers:'<path d="M3 6h5l3 6 9 3v5H3Z"/><path d="M3 17h17M9 9l-3 2m5 1-3 2m6 0-3 2"/>'},Bo={jet:{label:"Reaktiv parvoz",color:6675455},magnet:{label:"Tanga magniti",color:16732771},double:{label:"2× ball",color:16765775},sneakers:{label:"Super krossovka",color:12188500}};function vy(r){return`<svg class="power-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${_y[r]??""}</svg>`}function xy(r){const e=new _t,t=new _t;if(e.add(t),e.userData.powerupVisual=t,e.userData.type=r,r==="jet"){An(t,new Hi(.17,.18,.65,16),15199988),An(t,new Rs(.18,.32,16),16734803,0,.48),An(t,new Hi(.12,.19,.16,12),2506070,0,-.4);const c=An(t,new yi(.09,12,8),5098751,0,.12,.145);c.scale.z=.25;for(let u=0;u<3;u++){const h=Ws(t,.06,.3,.28,3185353);h.position.set(Math.sin(u*2*Math.PI/3)*.18,-.22,Math.cos(u*2*Math.PI/3)*.18),h.rotation.y=u*2*Math.PI/3,h.rotation.z=.2}const l=An(t,new Rs(.1,.35,12),16762714,0,-.65);l.rotation.x=Math.PI,e.userData.flame=l}else if(r==="magnet"){const c=new Bi;c.moveTo(-.4,.38),c.lineTo(-.4,-.08),c.absarc(0,-.08,.4,Math.PI,Math.PI*2,!1),c.lineTo(.4,.38),c.lineTo(.21,.38),c.lineTo(.21,-.08),c.absarc(0,-.08,.21,0,-Math.PI,!0),c.lineTo(-.21,.38),c.closePath(),La(t,c,.18,15944539);for(const l of[-.305,.305])Ws(t,.2,.16,.21,14807029,l,.34);for(const l of[.53,.7]){const u=An(t,new Qn(l,.012,6,40,Math.PI*1.4),6283519);u.rotation.z=-.2}}else if(r==="double"){An(t,new Zx("2",{font:my,size:.72,depth:.13,curveSegments:5,bevelEnabled:!0,bevelThickness:.018,bevelSize:.015,bevelSegments:2}),16765775,-.5,-.35,-.06);for(const c of[-Math.PI/4,Math.PI/4]){const l=Ws(t,.1,.5,.14,16769674,.32,0);l.rotation.z=c}}else if(r==="sneakers"){const c=new Bi;c.moveTo(-.47,-.2),c.lineTo(.4,-.2),c.quadraticCurveTo(.56,-.17,.51,-.06),c.lineTo(-.47,-.06),c.closePath(),La(t,c,.34,15793407);const l=new Bi;l.moveTo(-.43,-.06),l.lineTo(.47,-.06),l.quadraticCurveTo(.44,.17,.12,.2),l.lineTo(-.08,.4),l.lineTo(-.4,.38),l.closePath(),La(t,l,.3,3320015);for(let u=0;u<4;u++){const h=Ws(t,.035,.035,.34,16777215,-.08+u*.06,.43-u*.06);h.rotation.z=-.3}for(const u of[-1,1])for(let h=0;h<3;h++){const f=Ws(t,.04,.17,.025,12188500,-.24+h*.12,.06,u*.18);f.rotation.z=-.35}}const n=Bo[r].color,i=new Ot({color:n,transparent:!0,opacity:.28,blending:xs,depthWrite:!1}),s=new rt(new Qn(.58,.018,6,40),i);s.rotation.x=Math.PI/2,s.position.y=-.5,t.add(s);const o=new yi(.025,6,4),a=[];for(let c=0;c<8;c++)a.push(An(t,o,n));return e.userData.sparks=a,e}function yy(r,e,t){const n=r.userData.powerupVisual;n&&(n.position.y=Math.sin(t*2.1)*.09,r.userData.type==="double"?n.rotation.y=Math.sin(t*.7)*.3:n.rotation.y+=e*.7,r.userData.flame&&(r.userData.flame.scale.y=.8+Math.sin(t*19)*.2),r.userData.sparks.forEach((i,s)=>{const o=t*1.6+s*Math.PI/4;i.position.set(Math.cos(o)*.58,Math.sin(o*1.7)*.4,Math.sin(o)*.58)}))}const My={};function fl(r){return My[r]??=new Nn({color:r,roughness:.7})}const Sy=new Si(1,1,1),Ty=new yi(1,12,10);function _n(r,e,t,n,i,s,o,a){const c=new rt(Sy,fl(a));return c.position.set(e,t,n),c.scale.set(i,s,o),c.castShadow=!0,c.receiveShadow=!0,r.add(c),c}function lf(r,e,t,n,i,s){const o=new rt(Ty,fl(s));return o.position.set(e,t,n),o.scale.setScalar(i),o.castShadow=!0,r.add(o),o}function by(r){if(Bo[r])return xy(r);const e=new _t;if(r==="coin"){const t=new rt(new Qn(.25,.075,8,16),fl(16765268));e.add(t)}else if(r==="low"){_n(e,0,.5,0,2.25,1,.65,16739922);for(const t of[-.75,0,.75])_n(e,t,.5,-.335,.28,.65,.03,16772528)}else if(r==="high"){for(const t of[-1.05,1.05])_n(e,t,1.4,0,.16,2.8,.5,15973450);_n(e,0,2.1,0,2.2,1.15,.65,3313054),_n(e,0,2.12,-.34,1.8,.15,.03,15335423)}else if(r==="train"||r==="moving"){_n(e,0,1.65,0,2.55,3.3,9,2603184),_n(e,0,3.32,0,2.65,.2,9.1,15329239),_n(e,0,1.05,0,2.6,.2,9.05,16765011),_n(e,0,2.3,4.53,2.1,1,.06,1654103);for(let t=-3;t<=3;t+=1.8)for(const n of[-1,1])_n(e,n*1.28,2.25,t,.03,1,1.25,2313576);for(const t of[-1,1])lf(e,t*.85,.65,4.58,.17,16774323)}else if(r==="ramp"){const t=new Et;t.setAttribute("position",new dt([-1.3,0,4,1.3,0,4,-1.3,3.5,-4,1.3,0,4,1.3,3.5,-4,-1.3,3.5,-4],3)),t.computeVertexNormals();const n=new rt(t,new Nn({color:16761938,side:cn}));e.add(n)}return e}function Ey(r){r.updateWorldMatrix(!0,!0);const e=[],t=r.getWorldQuaternion(new Mt);r.traverse(s=>{if(!s.isBone||s.position.lengthSq()<1e-8||!/^(Left|Right)(Arm|ForeArm|UpLeg|Leg|Foot)$|^Spine[012]?$|^Neck$|^Head$/.test(s.name))return;let o;if(/^(Left|Right)Arm$/.test(s.name)){const a=s.children.find(c=>c.isBone&&/ForeArm/.test(c.name));if(a){const c=a.getWorldPosition(new L).sub(s.getWorldPosition(new L)).applyQuaternion(t.clone().invert()),l=s.name.startsWith("Left")?1:-1;o=Math.atan2(-.98,l*.18)-Math.atan2(c.y,c.x),o=Math.atan2(Math.sin(o),Math.cos(o))}}e.push({bone:s,q:s.quaternion.clone(),side:s.name.startsWith("Left")?1:-1,armDrop:o})});const n={idle:2.4,run:.68,board:1.8,takeoff:.11,jump:.9,fly:1.8,roll:.8,land:.24},i={};for(const[s,o]of Object.entries(n)){const a=Math.ceil(o*30),c=[],l=[],u=e.map(()=>[]);for(let h=0;h<=a;h++){const f=h/a;l.push(f*o);for(const d of e)d.bone.quaternion.copy(d.q);r.updateWorldMatrix(!0,!0);for(let d=0;d<e.length;d++){const m=e[d],_=m.bone.parent.getWorldQuaternion(new Mt).invert(),g=v=>v.applyQuaternion(t).applyQuaternion(_).normalize(),p=wy(s,f,m.bone.name,m.side);m.armDrop!==void 0&&(p.z+=m.armDrop+m.side*1.32);const b=m.q.clone();b.premultiply(new Mt().setFromAxisAngle(g(new L(0,0,1)),p.z)),b.premultiply(new Mt().setFromAxisAngle(g(new L(1,0,0)),p.x)),m.bone.quaternion.copy(b),m.bone.updateWorldMatrix(!1,!0),u[d].push(...b.toArray())}}for(let h=0;h<e.length;h++)c.push(new ii(`${e[h].bone.uuid}.quaternion`,l,u[h]));i[s]=new Ps(`Metro_${s}`,o,c)}for(const s of e)s.bone.quaternion.copy(s.q);return r.updateWorldMatrix(!0,!0),i}function wy(r,e,t,n){const i=/^(Left|Right)Arm$/.test(t),s=t.endsWith("ForeArm"),o=t.endsWith("UpLeg"),a=/^(Left|Right)Leg$/.test(t),c=t.endsWith("Foot"),l=t.startsWith("Spine"),u=t==="Head"||t==="Neck";let h=0,f=i?-n*1.32:0;const d=Math.sin(e*Math.PI*2)*n;if(r==="run")i&&(h=d*.72-.12),s&&(h=-.95+d*.15),o&&(h=-d*.8),a&&(h=.12+Math.max(0,d)*1.25),c&&(h=-.1-Math.max(0,d)*.2),l&&(h=.035),u&&(h=-.025);else if(r==="jump"){const m=e<.16?We.lerp(.25,.08,e/.16):e<.55?We.lerp(.08,.85,(e-.16)/.39):We.lerp(.85,.3,(e-.55)/.45);o&&(h=-m*(n>0?1:.72)),a&&(h=m*1.6),i&&(h=-.45-Math.sin(e*Math.PI)*.85+n*.12),s&&(h=-.65+Math.sin(e*Math.PI*2)*.2),l&&(h=.07+Math.sin(e*Math.PI)*.04),u&&(h=-.08)}else if(r==="board")i&&(h=-.18+d*.05,f+=n*.38),s&&(h=-.6),o&&(h=-.32+d*.025),a&&(h=.65),l&&(h=.06+d*.012);else if(r==="fly")i&&(h=-.3+d*.12,f+=n*.24),s&&(h=-.9+Math.cos(e*Math.PI*2+n)*.15),o&&(h=.18+d*.16),a&&(h=.55+Math.cos(e*Math.PI*2+n)*.2),c&&(h=-.2),l&&(h=.055+Math.sin(e*Math.PI*2)*.018),u&&(h=-.09);else if(r==="roll"){const m=We.smoothstep(e,0,.15),_=1-We.smoothstep(e,.78,1),g=m*_;o&&(h=-1.9*g),a&&(h=2.65*g),c&&(h=-.55*g),l&&(h=.31*g),u&&(h=-.22*g),i&&(h=-.95*g,f+=n*.16*g),s&&(h=-.4-.5*g+Math.sin(e*Math.PI*2)*.12*g)}else if(r==="land"||r==="takeoff"){const m=Math.sin(e*Math.PI)*.48;o&&(h=-m),a&&(h=m*1.8),l&&(h=m*.25),i&&(h=-.25+m*.3),s&&(h=-.75)}else i&&(h=-.06+d*.025),s&&(h=-.3),l&&(h=Math.sin(e*Math.PI*2)*.012);return{x:h,z:f}}class hf extends Un{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Iy(t)}),this.register(function(t){return new Ly(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Ny(t)}),this.register(function(t){return new Uy(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new Oy(t)}),this.register(function(t){return new Py(t)}),this.register(function(t){return new By(t)}),this.register(function(t){return new Dy(t)}),this.register(function(t){return new zy(t)}),this.register(function(t){return new ky(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Wy(t)}),this.register(function(t){return new Xy(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Ms.extractUrlBase(e);o=Ms.resolveURL(l,this.path)}else o=Ms.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Fo(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===uf){try{o[tt.KHR_BINARY_GLTF]=new qy(e)}catch(h){i&&i(h);return}s=JSON.parse(o[tt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new rM(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case tt.KHR_MATERIALS_UNLIT:o[h]=new Cy;break;case tt.KHR_DRACO_MESH_COMPRESSION:o[h]=new Yy(s,this.dracoLoader);break;case tt.KHR_TEXTURE_TRANSFORM:o[h]=new jy;break;case tt.KHR_MESH_QUANTIZATION:o[h]=new Ky;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Ay(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const tt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ry{constructor(e){this.parser=e,this.name=tt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new be(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],jt);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new yr(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new bo(u),l.distance=h;break;case"spot":l=new Vu(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Rn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class Cy{constructor(){this.name=tt.KHR_MATERIALS_UNLIT}getMaterialType(){return Ot}extendParams(e,t,n){const i=[];e.color=new be(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],jt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ot))}return Promise.all(i)}}class Py{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Iy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new pe(a,a)}return Promise.all(s)}}class Ly{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Dy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Ny{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new be(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],jt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,ot)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Uy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Fy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new be().setRGB(a[0],a[1],a[2],jt),Promise.all(s)}}class Oy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class By{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new be().setRGB(a[0],a[1],a[2],jt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,ot)),Promise.all(s)}}class ky{constructor(e){this.parser=e,this.name=tt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class zy{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Hy{constructor(e){this.parser=e,this.name=tt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Vy{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class Gy{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class Wy{constructor(e){this.name=tt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class Xy{constructor(e){this.name=tt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==on.TRIANGLES&&l.mode!==on.TRIANGLE_STRIP&&l.mode!==on.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const m of h){const _=new we,g=new L,p=new Mt,b=new L(1,1,1),v=new dp(m.geometry,m.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&b.fromBufferAttribute(c.SCALE,x),v.setMatrixAt(x,_.compose(g,p,b));for(const x in c)if(x==="_COLOR_0"){const R=c[x];v.instanceColor=new Rc(R.array,R.itemSize,R.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&m.geometry.setAttribute(x,c[x]);pt.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),d.push(v)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const uf="glTF",Xs=12,Xh={JSON:1313821514,BIN:5130562};class qy{constructor(e){this.name=tt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==uf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Xs,s=new DataView(e,Xs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Xh.JSON){const l=new Uint8Array(e,Xs+o,a);this.content=n.decode(l)}else if(c===Xh.BIN){const l=Xs+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Yy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=tt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=Oc[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=Oc[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=Ss[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const m in d.attributes){const _=d.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}h(d)},a,l,jt,f)})})}}class jy{constructor(){this.name=tt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ky{constructor(){this.name=tt.KHR_MESH_QUANTIZATION}}class ff extends vr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,m=e*l,_=m-l,g=-2*d+3*f,p=d-f,b=1-g,v=p-f+h;for(let x=0;x!==a;x++){const R=o[_+x+a],w=o[_+x+c]*u,A=o[m+x+a],I=o[m+x]*u;s[x]=b*R+v*w+g*A+p*I}return s}}const $y=new Mt;class Zy extends ff{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return $y.fromArray(s).normalize().toArray(s),s}}const on={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ss={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},qh={9728:Yt,9729:tn,9984:au,9985:ro,9986:js,9987:Kn},Yh={33071:In,33648:go,10497:vi},Da={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Oc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Jy={CUBICSPLINE:void 0,LINEAR:lr,STEP:cr},Na={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Qy(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Nn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ei})),r.DefaultMaterial}function Ii(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Rn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function eM(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;o.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function tM(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function nM(r){let e;const t=r.extensions&&r.extensions[tt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ua(t.attributes):e=r.indices+":"+Ua(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ua(r.targets[n]);return e}function Ua(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Bc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function iM(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const sM=new we;class rM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ay,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new rl(this.options.manager):this.textureLoader=new mm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ii(s,a,i),Rn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[tt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ms.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Da[i.type],a=Ss[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new It(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Da[i.type],l=Ss[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,g;if(d&&d!==h){const p=Math.floor(f/d),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let v=t.cache.get(b);v||(_=new l(a,p*d,i.count*d/u),v=new lp(_,d/u),t.cache.add(b,v)),g=new tl(v,c,f%d/u,m)}else a===null?_=new l(i.count*c):_=new l(a,f,i.count*c),g=new It(_,c,m);if(i.sparse!==void 0){const p=Da.SCALAR,b=Ss[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,R=new b(o[1],v,i.sparse.count*p),w=new l(o[2],x,i.sparse.count*c);a!==null&&(g=new It(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,I=R.length;A<I;A++){const S=R[A];if(g.setX(S,w[A*c]),c>=2&&g.setY(S,w[A*c+1]),c>=3&&g.setZ(S,w[A*c+2]),c>=4&&g.setW(S,w[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=qh[f.magFilter]||tn,u.minFilter=qh[f.minFilter]||Kn,u.wrapS=Yh[f.wrapS]||vi,u.wrapT=Yh[f.wrapT]||vi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Yt&&u.minFilter!==tn,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let m=f;t.isImageBitmapLoader===!0&&(m=function(_){const g=new Pt(_);g.needsUpdate=!0,f(g)}),t.load(Ms.resolveURL(h,s.path),m,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Rn(h,o),h.userData.mimeType=o.mimeType||iM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[tt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[tt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[tt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new fr,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Lo,fn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Nn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[tt.KHR_MATERIALS_UNLIT]){const h=i[tt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new be(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],jt),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,ot)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=cn);const u=s.alphaMode||Na.OPAQUE;if(u===Na.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Na.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ot&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new pe(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==Ot&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ot){const h=s.emissiveFactor;a.emissive=new be().setRGB(h[0],h[1],h[2],jt)}return s.emissiveTexture!==void 0&&o!==Ot&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,ot)),Promise.all(l).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Rn(h,s),t.associations.set(h,{materials:e}),s.extensions&&Ii(i,h,s),h})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[tt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return jh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=nM(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[tt.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=jh(new Et,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?Qy(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,m=u.length;d<m;d++){const _=u[d],g=o[d];let p;const b=l[d];if(g.mode===on.TRIANGLES||g.mode===on.TRIANGLE_STRIP||g.mode===on.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new wu(_,b):new rt(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===on.TRIANGLE_STRIP?p.geometry=Hh(p.geometry,gu):g.mode===on.TRIANGLE_FAN&&(p.geometry=Hh(p.geometry,wc));else if(g.mode===on.LINES)p=new Ru(_,b);else if(g.mode===on.LINE_STRIP)p=new Do(_,b);else if(g.mode===on.LINE_LOOP)p=new _p(_,b);else if(g.mode===on.POINTS)p=new To(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&tM(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Rn(p,s),g.extensions&&Ii(i,p,g),t.assignFinalMaterial(p),h.push(p)}for(let d=0,m=h.length;d<m;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&Ii(i,h[0],s),h[0];const f=new _t;s.extensions&&Ii(i,f,s),t.associations.set(f,{meshes:e});for(let d=0,m=h.length;d<m;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(We.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new cl(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Rn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new we;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Io(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],m=i.samplers[d.sampler],_=d.target,g=_.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,b=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(m),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],m=h[2],_=h[3],g=h[4],p=[];for(let v=0,x=f.length;v<x;v++){const R=f[v],w=d[v],A=m[v],I=_[v],S=g[v];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const M=n._createAnimationTracks(R,w,A,I,S);if(M)for(let C=0;C<M.length;C++)p.push(M[C])}const b=new Ps(s,void 0,p);return Rn(b,i),b})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,sM)});for(let d=0,m=h.length;d<m;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new yo:l.length>1?u=new _t:l.length===1?u=l[0]:u=new pt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=o),Rn(u,s),s.extensions&&Ii(n,u,s),s.matrix!==void 0){const h=new we;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new _t;n.name&&(s.name=i.createUniqueName(n.name)),Rn(s,n),n.extensions&&Ii(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof fn||f instanceof Pt)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];fi[s.path]===fi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(fi[s.path]){case fi.weights:l=ni;break;case fi.rotation:l=ii;break;case fi.translation:case fi.scale:l=Gi;break;default:n.itemSize===1?l=ni:l=Gi;break}const u=i.interpolation!==void 0?Jy[i.interpolation]:lr,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const m=new l(c[f]+"."+fi[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Bc(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ii?Zy:ff;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function oM(r,e,t){const n=e.attributes,i=new Tn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){const u=Bc(Ss[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new L,c=new L;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){const _=Bc(Ss[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Fn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function jh(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=Oc[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ke.workingColorSpace!==jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Rn(r,e),oM(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?eM(r,e.targets,t):r})}const Fa=new Map,Oa=new Map,df="./models/characters/";function qs(r,e=!0){return Oa.has(r)||Oa.set(r,new rl().loadAsync(df+r).then(t=>(t.colorSpace=e?ot:Yn,t.anisotropy=4,t))),Oa.get(r)}function pf(r){if(Fa.has(r))return Fa.get(r);const e=new hf().loadAsync(`${df}${r==="aziz"?"aziz-soldier":r}.glb`).then(async t=>{let n,i,s,o;r==="aziz"&&(n=await qs("soldier-color.png")),r==="sardor"&&([n,i,s,o]=await Promise.all([qs("tasm-color.jpg"),qs("tasm-normal.jpg",!1),qs("tasm-lenses.jpg"),qs("tasm-sole.jpg")])),t.scene.traverse(c=>{if(c.isMesh){c.castShadow=c.receiveShadow=!0;for(const l of[c.material].flat())r==="aziz"||r==="sardor"&&c.name==="Body_for_surface_modifier"?(l.map=n,l.normalMap=i,l.normalMap&&l.normalScale.setScalar(.45),l.color.setHex(16777215)):r==="sardor"&&c.name==="Lenses"?(l.map=s,l.color.setHex(16777215),l.roughness=.25):r==="sardor"&&c.name==="Sole"&&(l.map=o,l.color.setHex(16777215)),l.needsUpdate=!0}});const a={scene:t.scene,animations:t.animations,facing:Math.PI,id:r};return t.animations.map(c=>c.name),a}).catch(t=>{throw t.message,t});return Fa.set(r,e),e}function aM(){return Promise.allSettled(["aziz","lola","sardor"].map(pf))}function cM(r){const e=[],t=new L;return r.traverse(n=>{if(!n.isMesh)return;const i=n.geometry.attributes.position,s=i.count,o=new Set,a=Math.max(1,Math.ceil(s/1400));for(let h=0;h<s;h+=a)o.add(h);const c=new Map,l=n.geometry.attributes.skinIndex,u=n.geometry.attributes.skinWeight;for(let h=0;h<s;h++){let f=0;if(l){let _=-1;for(let g=0;g<4;g++)u.array[h*4+g]>_&&(_=u.array[h*4+g],f=l.array[h*4+g])}let d=c.get(f);d||(d={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0],lo:[],hi:[]},c.set(f,d));const m=[i.getX(h),i.getY(h),i.getZ(h)];for(let _=0;_<3;_++)m[_]<d.min[_]&&(d.min[_]=m[_],d.lo[_]=h),m[_]>d.max[_]&&(d.max[_]=m[_],d.hi[_]=h)}c.forEach(h=>[...h.lo,...h.hi].forEach(f=>o.add(f))),e.push({mesh:n,indices:[...o]})}),n=>{n.makeEmpty();for(const{mesh:i,indices:s}of e)for(const o of s)i.getVertexPosition(o,t).applyMatrix4(i.matrixWorld),n.expandByPoint(t);return n}}const Pn={status:"loading",clips:[],generated:[],error:""};let lM;function Kh(){return lM??=new Bx().loadAsync("./models/avatar/model.fbx").then(r=>(r.traverse(e=>{if(e.isMesh){e.castShadow=e.receiveShadow=!0;for(const t of[e.material].flat())t.map&&(t.map.colorSpace=ot),t.shininess=Math.min(t.shininess??20,35)}}),{scene:r,animations:r.animations,facing:Math.PI,id:"legacy"})).catch(r=>{Pn.status="error",Pn.error=r.message,console.error("Avatar FBX yuklanmadi:",r)})}function mf(r,e){const t=new _t,n=new _t,i=new _t;t.add(n),n.add(i);const s=_n(t,0,.09,0,1.05,.12,1.3,6553584);s.visible=!1;const o={height:2.3,currentHeight:2.3,halfWidth:.34,halfDepth:.27,offsetX:0,offsetZ:0,rollHeight:2.3},a=new Tn,c={},l={},u={mode:"idle",action:"",authored:[],generated:[],scale:1};let h=!1,f,d,m,_="idle",g=0,p,b=0,v=0,x=!0;Pn.status="loading";const w=(e?.id?pf(e.id).catch(M=>(console.warn("Tanlangan model yuklanmadi, zaxira qahramon ishlatiladi.",M),Kh())):Kh()).then(M=>{if(h)return;if(!M)return r(Pn.error);const C=M.scene;f=$x(C),M.id==="legacy"&&e&&e.id!=="aziz"&&f.traverse(z=>{z.isMesh&&z.name==="outfit_top"&&(z.material=z.material.clone(),z.material.color.setHex(e.color),z.userData.avatarOwnMaterial=!0)}),f.rotation.y=M.facing,A(),a.setFromObject(f,!0),f.scale.multiplyScalar(o.height/(a.max.y-a.min.y)),A(),a.setFromObject(f,!0),f.position.x-=(a.min.x+a.max.x)/2,f.position.z-=(a.min.z+a.max.z)/2,f.position.y-=a.min.y,i.add(f),A();const U=Ey(f);d=new Gu(f);const k={idle:/idle/i,run:/run|jog/i,board:/board|surf/i,takeoff:/takeoff/i,jump:/jump/i,roll:/roll|slide/i,fly:/fly|flight|hover/i,land:/land/i};for(const[z,W]of Object.entries(U)){l[z]=d.clipAction(W);const q=M.animations.find(Q=>k[z].test(Q.name));c[z]=q?d.clipAction(q):l[z],["jump","roll","land","takeoff"].includes(z)&&(c[z].setLoop(mu,1),c[z].clampWhenFinished=!0)}u.characterId=M.id,Pn.clips=M.animations.map(z=>z.name),u.authored=Pn.clips,u.generated=Object.keys(U).filter(z=>c[z]===l[z]),Pn.generated=u.generated,u.scale=f.scale.x,M.id!=="legacy"&&(p=cM(f)),S(0,{mode:"idle"}),Pn.status="ready"});function A(){f.updateWorldMatrix(!0,!0),f.updateMatrixWorld(!0)}function I(M,C){const U=c[M];U!==m&&(U.reset().setEffectiveWeight(1).play(),m&&U.crossFadeFrom(m,C,!1),m=U,u.action=U.getClip().name)}function S(M,{mode:C="idle",speed:U=18,laneDelta:k=0,boardActive:z=!1,rollProgress:W=0,velocityY:q=0,grounded:Q=C==="run"||C==="idle"}={}){if(!f||!d)return;C!==_&&C==="jump"&&(v=0),Q&&!x&&C!=="roll"&&(g=.24),(C==="roll"||C==="fly")&&(g=0);const X=g>0&&C==="run"?"land":z&&C==="run"?"board":C;if(I(X,C==="roll"||_==="roll"?.07:.14),m.timeScale=X==="run"?We.clamp(U/18,.8,1.7):1,C==="roll")m.paused=!0,m.time=We.clamp(W,0,.999)*m.getClip().duration;else if(C==="jump"){v+=M,m.paused=!0;let xe=q>0?Math.min(.53,v*1.15):Math.min(.98,.55+Math.min(1,-q/16)*.43);xe=We.clamp(xe+Math.sin(v*12)*.012,0,.99),m.time=xe*m.getClip().duration}else m.paused=!1;d.update(M),b+=M;const oe=C==="fly"?-.13+Math.sin(b*3)*.025:C==="jump"?-.05:0;i.rotation.x=We.damp(i.rotation.x,oe,12,M||1),i.rotation.z=We.damp(i.rotation.z,We.clamp(k*-.09,-.18,.18)+(C==="fly"?Math.sin(b*2.6)*.035:0),12,M||1),A(),p?p(a):a.setFromObject(f,!0);const ge=z?.16:.05;n.position.y+=ge-(a.min.y-t.position.y),C==="fly"&&(n.position.y+=Math.sin(b*4)*.035),o.currentHeight=a.max.y-a.min.y+ge+(C==="fly"?.04:0),o.rollHeight=o.currentHeight,o.halfDepth=Math.max(.24,(a.max.z-a.min.z)*.5),p&&(o.halfWidth=We.clamp((a.max.x-a.min.x)*.4,.3,.58)),o.offsetX=(a.min.x+a.max.x)*.5-t.position.x,o.offsetZ=(a.min.z+a.max.z)*.5-t.position.z,u.mode=X,x=Q,_=C,g=Math.max(0,g-M)}return{g:t,body:n,board:s,collider:o,update:S,diagnostics:u,ready:w,dispose(){if(h=!0,d?.stopAllAction(),f){d?.uncacheRoot(f);const M=new Set;f.traverse(C=>{C.userData.avatarOwnMaterial&&C.material.dispose(),C.isSkinnedMesh&&M.add(C.skeleton)}),M.forEach(C=>C.dispose())}t.removeFromParent()}}}let Ys,$h=Promise.resolve();const Ba=new Map;function hM(r){if(Ba.has(r.id))return Ba.get(r.id);const e=$h.then(async()=>{Ys??=new Ku({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),Ys.setSize(180,220),Ys.setPixelRatio(1.5);const t=new el;t.add(new ol(15202559,5984867,2.5));const n=new yr(16772824,2.5);n.position.set(-3,5,-4),t.add(n);const i=mf(a=>{throw new Error(a)},r);t.add(i.g),await i.ready,i.update(0,{mode:"idle",grounded:!0});const s=new Ut(30,180/220,.1,50);s.position.set(.7,1.65,-4.8),s.lookAt(0,1.2,0),Ys.render(t,s);const o=Ys.domElement.toDataURL("image/png");return i.dispose(),o});return $h=e.catch(()=>{}),Ba.set(r.id,e),e}const _s={status:"loading",clips:[],error:""};let Eo;const uM=new hf().loadAsync("./models/astronaut/Enceladus.glb").then(r=>{Eo=r.scene,_s.clips=r.animations.map(e=>e.name),Eo.traverse(e=>{e.isMesh&&(e.castShadow=e.receiveShadow=!0)}),_s.status="ready"}).catch(r=>{_s.status="error",_s.error=r.message,console.warn("Kosmonavt yuklanmadi; asosiy qahramon uchishda davom etadi.",r)});function fM(){const r=new _t,e=new _t;r.add(e);let t,n,i=0,s=!1;const o=new Tn,a=new L,c=uM.then(()=>{if(!Eo||s)return;t=Eo.clone(!0),e.add(t);const u=[],h=Array.from({length:61},(d,m)=>m*1.8/60),f={AstroArmLeft:[-.22,.12],AstroArmRight:[-.22,-.12],AstroLegLeft:[-.12,.06],AstroLegRight:[-.12,-.06],AstroHead:[-.04,.02],AstroLegLeftLower:[.45,.08],AstroLegRightLower:[.45,-.08],AstroArmLeftLower:[-.38,.1],AstroArmRightLower:[-.38,-.1]};for(const[d,[m,_]]of Object.entries(f)){const g=t.getObjectByName(d);g&&(u.push(new ni(`${g.uuid}.rotation[x]`,h,h.map(p=>m+Math.sin(p/1.8*Math.PI*2)*_))),d.startsWith("AstroArm")&&u.push(new ni(`${g.uuid}.rotation[z]`,h,h.map(p=>(d.endsWith("Left")?-.1:.1)+Math.cos(p/1.8*Math.PI*2)*.025))))}n=new Gu(t),n.clipAction(new Ps("Enceladus_generated_flight",1.8,u)).play(),l(0,{})});function l(u,{laneDelta:h=0,thrust:f=1}={}){if(!t)return;i+=u,n.update(u),e.rotation.x=We.damp(e.rotation.x,-.12+Math.sin(i*2.7)*.025,10,u||1),e.rotation.z=We.damp(e.rotation.z,We.clamp(-h*.11,-.2,.2)+Math.sin(i*2.1)*.02,10,u||1),t.updateWorldMatrix(!0,!0),o.setFromObject(t);const d=r.getWorldPosition(a).y;e.position.y+=d+.05+Math.sin(i*3.6)*.025-o.min.y}return{g:r,pivot:e,ready:c,get model(){return t},update:l,dispose(){s=!0,n?.stopAllAction(),t&&n?.uncacheRoot(t),r.removeFromParent()}}}const Zh=r=>(r=Math.max(0,Math.min(1,r)),r*r*(3-2*r));class dM{constructor(){this.reset()}reset(){this.state="running",this.remaining=0,this.clock=0,this.height=0,this.startHeight=0,this.alpha=0,this.startAlpha=0,this.grace=0}collect(e=8,t=0){this.state==="running"?(this.remaining=e,this.state="transformingToAstronaut",this.clock=0,this.startHeight=t,this.startAlpha=0):(this.remaining+=e,(this.state==="transformingBack"||this.state==="landing")&&(this.state="transformingToAstronaut",this.clock=0,this.startHeight=this.height,this.startAlpha=this.alpha))}update(e){if(this.grace=Math.max(0,this.grace-e),!!this.active)if(this.remaining=Math.max(0,this.remaining-e),this.clock+=e,this.state==="transformingToAstronaut"){const t=Zh(this.clock/.8);this.height=this.startHeight+(7-this.startHeight)*t,this.alpha=this.startAlpha+(1-this.startAlpha)*t,this.clock>=.8&&(this.state="flying",this.clock=0,this.height=7,this.alpha=1)}else if(this.state==="flying")this.height=7,this.alpha=1,this.remaining<=.95&&(this.state="transformingBack",this.clock=0,this.startHeight=this.height);else if(this.state==="transformingBack"){const t=Zh(this.clock/.95);this.height=this.startHeight*(1-t),this.alpha=1-t,this.clock>=.95&&(this.state="landing",this.clock=0,this.height=0,this.alpha=0,this.remaining=0,this.grace=1.5)}else this.state==="landing"&&this.clock>=.26&&(this.state="running",this.clock=0)}get active(){return this.state!=="running"}get protected(){return this.active||this.grace>0}get clearingLanding(){return["transformingBack","landing"].includes(this.state)}get energy(){return this.state==="transformingToAstronaut"?Math.sin(Math.PI*Math.min(1,this.clock/.8)):this.state==="transformingBack"?Math.sin(Math.PI*Math.min(1,this.clock/.95)):0}get thrust(){return this.state==="landing"||!this.active?0:this.alpha*Math.min(1,this.remaining/1.6)}}function pM(r,e){const t=new _t;r.add(t);const n=new Qn(.84,.025,8,56),i=new Ot({color:13170175,transparent:!0,opacity:0,blending:xs,depthWrite:!1});for(let x=0;x<3;x++){const R=new rt(n,i);R.rotation.x=Math.PI/2,R.position.y=.35+x*.75,t.add(R)}const s=new Float32Array(360),o=new Et;o.setAttribute("position",new It(s,3));const a=new fr({color:10808063,size:.075,transparent:!0,blending:xs,depthWrite:!1}),c=new To(o,a);c.frustumCulled=!1,r.add(c);const l=new _t;l.position.set(0,1.3,.38),e.add(l);const u=new Hi(.12,.14,.35,12),h=new Nn({color:4022906,metalness:.65,roughness:.35}),f=new Rs(.13,.9,12),d=new Ot({color:9235711,transparent:!0,blending:xs,depthWrite:!1}),m=[];for(const x of[-1,1]){const R=new rt(u,h);R.position.x=x*.22,l.add(R);const w=new rt(f,d);w.rotation.x=Math.PI,w.position.set(x*.22,-.6,0),l.add(w),m.push(w)}const _=new bo(8642559,0,5);_.position.y=1,r.add(_);let g=0;const p=new we,b=new L;function v(x,R,w){g+=x,t.visible=R>.001,l.visible=w>.001,i.opacity=R*.9,d.opacity=w*.85,t.rotation.y=g*3,t.children.forEach((A,I)=>{A.rotation.z=g*(I%2?-2:2),A.position.y=.25+(g*1.5+I*.73)%2.3,A.scale.setScalar(1+Math.sin(g*7+I)*.1)}),m.forEach((A,I)=>A.scale.set(1,Math.max(.01,w*(.8+Math.sin(g*39+I)*.15)),1)),c.visible=R+w>.001,r.updateWorldMatrix(!0,!1),l.updateWorldMatrix(!0,!1),p.copy(r.matrixWorld).invert().multiply(l.matrixWorld);for(let A=0;A<120;A++){const I=(g*(A<72?.8:2)+A*.6180339)%1,S=A*2.39996+g*2;if(A<72&&R>.001){const M=.6+I*.65;s[A*3]=Math.cos(S)*M,s[A*3+1]=I*2.7,s[A*3+2]=Math.sin(S)*M}else A>=72&&w>.001?b.set((A%2?-.22:.22)+Math.sin(S)*I*.2,-.2-I*2*w,I*.65).applyMatrix4(p).toArray(s,A*3):s[A*3+1]=-1e3}o.attributes.position.needsUpdate=!0,a.opacity=Math.min(1,R+w),_.intensity=R*3+w*1.3}return v(0,0,0),{update:v,reset(){g=0,v(0,0,0)},dispose(){t.removeFromParent(),c.removeFromParent(),l.removeFromParent(),_.removeFromParent();for(const x of[n,i,o,a,u,h,f,d])x.dispose()}}}function Jh(r){const e={value:1},t=new Map,n=[];return r.traverse(i=>{if(!i.isMesh)return;const s=o=>{if(t.has(o))return t.get(o);const a=o.clone();return a.onBeforeCompile=c=>{c.uniforms.uMetroOpacity=e,c.fragmentShader=`uniform float uMetroOpacity;
`+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <alphatest_fragment>",`
          #include <alphatest_fragment>
          float metroNoise = fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898,78.233))) * 43758.5453);
          if (metroNoise >= uMetroOpacity) discard;
        `)},a.customProgramCacheKey=()=>"metro-transform-dither-v1",t.set(o,a),a};n.push({mesh:i,original:i.material,shadow:i.castShadow}),i.material=Array.isArray(i.material)?i.material.map(s):s(i.material)}),{set(i){e.value=Math.max(0,Math.min(1,i)),r.visible=i>.001;for(const s of n)s.mesh.castShadow=s.shadow&&i>.5},dispose(){for(const i of n)i.mesh.material=i.original,i.mesh.castShadow=i.shadow;t.forEach(i=>i.dispose()),r.visible=!0}}}function mM(r,e){const t=mf(r,e),n=fM(),i=new dM,s=t.g;s.name="playerRoot",s.add(n.g);const o=pM(s,n.pivot);let a,c,l=!1;const u=Promise.all([t.ready,n.ready]).then(()=>{l||(a=Jh(t.body),n.model&&(c=Jh(n.model)),n.g.visible=!1)});function h(d,m){const g=!!n.model?i.alpha:0,p=i.state==="landing"?"run":i.state==="transformingBack"?"jump":i.active?"fly":m.mode;t.update(d,{...m,mode:p,grounded:i.state==="landing"||!i.active&&m.grounded}),g>.001&&n.update(d,{...m,thrust:i.thrust}),a?.set(1-g),c?.set(g),n.g.visible=g>.001,_s.status==="error"&&n.pivot.parent!==t.body&&t.body.add(n.pivot),o.update(d,i.energy,i.thrust)}function f(){i.reset(),o.reset(),a?.set(1),c?.set(0),n.g.visible=!1}return{...t,g:s,flight:i,ready:u,update:h,reset:f,dispose(){l=!0,f(),o.dispose(),a?.dispose(),c?.dispose(),n.dispose(),t.dispose()}}}let Oi;function dl(){try{Oi??=new AudioContext,Oi.resume()}catch{}}function gM(r,e){if(!e||!Oi)return;const t=Oi.createOscillator(),n=Oi.createGain();t.connect(n),n.connect(Oi.destination);const i=Oi.currentTime,s={coin:980,jump:320,hit:95,button:540,power:650}[r]||440;t.type=r==="hit"?"sawtooth":"sine",t.frequency.setValueAtTime(s,i),t.frequency.exponentialRampToValueAtTime(r==="hit"?40:s*1.7,i+.12),n.gain.setValueAtTime(.055,i),n.gain.exponentialRampToValueAtTime(.001,i+.18),t.start(),t.stop(i+.2)}aM();const gt=r=>document.getElementById(r),Be=nu(),$t=new el;$t.background=new be(10213855);$t.fog=new Po(10213855,55,195);const jn=new Ut(57,innerWidth/innerHeight,.1,280),Ht=new Ku({antialias:!0});Ht.setPixelRatio(Math.min(devicePixelRatio,2));Ht.setSize(innerWidth,innerHeight);Ht.shadowMap.enabled=!0;Ht.shadowMap.type=su;Ht.outputColorSpace=ot;Ht.toneMapping=ru;Ht.toneMappingExposure=1;Ht.setClearColor(10213855);gt("game").append(Ht.domElement);const gf=new ol(14875903,6448512,2.5);$t.add(gf);const Xi=new yr(16773069,3);Xi.position.set(-15,35,20);Xi.castShadow=!0;Xi.shadow.mapSize.set(2048,2048);Object.assign(Xi.shadow.camera,{left:-28,right:28,top:40,bottom:-45});$t.add(Xi);$t.add(Xi.target);const Bt=dx($t,Ht,Xi,gf,r=>Sn(r));Bt.setQuality(Be.quality);let ct;function ko(){ct&&ct.dispose(),ct=mM(r=>{Sn("Model yuklanmadi. Avatar faylini tekshiring."),si('<h2>Model yuklanmadi</h2><p>public/models/avatar/model.fbx fayli ochilmadi. Fayl mavjudligini tekshiring va sahifani yangilang.</p><button class="primary" data-action="retrymodel">Qayta yuklash</button>'),Ft==="playing"&&(Ft="paused")},ir.find(r=>r.id===Be.selected)||ir[0]),ct.g.rotation.y=0,$t.add(ct.g)}ko();const _M={},_f={},an=[],ki=[];let Ft="menu",Z,di=0,uo=0,fo=0,kc;const zc={magnet:"Tanga magniti",jet:"Reaktiv parvoz",sneakers:"Super krossovka",double:"2× ball",board:"Hoverboard"};function Mi(r){gM(r,Be.sound)}function Sn(r){gt("toast").textContent=r,gt("toast").style.opacity=1,clearTimeout(kc),kc=setTimeout(()=>gt("toast").style.opacity=0,2400)}function Ni(r,e,t,n=0){const i=_f[r]?.pop()||by(r);$t.add(i),i.visible=!0,i.position.set(e*3,n,t),i.rotation.set(0,0,0);const s={type:r,lane:e,g:i,passed:!1};return an.push(s),s}function us(r){const e=an[r];e.g.visible=!1,$t.remove(e.g),(_f[e.type]??=[]).push(e.g),an.splice(r,1)}function po(r,e,t,n=16765268){for(let i=0;i<8&&!(ki.length>=96);i++){const s=pl.pop()||lf($t,0,0,0,.065,n);s.material=_M[n]??=new Ot({color:n}),s.scale.setScalar(.065),$t.add(s),s.position.set(r,e,t),ki.push({g:s,v:new L((Math.random()-.5)*5,Math.random()*4,(Math.random()-.5)*5),life:.5})}}const pl=[];function vf(){for(let r=an.length-1;r>=0;r--)us(r);for(const r of ki)$t.remove(r.g),pl.push(r.g);ki.length=0}function vM(){if(_s.status==="loading"){Sn("Kosmonavt modeli tayyorlanmoqda…");return}if(Pn.status!=="ready"){Sn(Pn.status==="error"?"Model yuklanmadi. Sahifani yangilang.":"Model yuklanmoqda, biroz kuting…");return}vf(),clearTimeout(kc),gt("toast").style.opacity=0,ko(),Z={lane:0,x:0,y:0,vy:0,roll:0,distance:0,coins:0,score:0,speed:18,boards:Be.boards,powers:{},inv:0,ground:0},jn.position.set(0,6.3,11),jn.lookAt(0,1.8,-13),di=0,uo=3,fo=7,Ft="playing",gt("panel").hidden=!0,gt("hud").hidden=!1,ct.g.visible=!0,Bt.reset(Be.selectedMap),yf()}function xM(){Ft==="playing"&&(Mi("hit"),Ft="over",ct.reset(),Be.coins+=Z.coins,Be.best=Math.max(Be.best,Math.floor(Z.score)),Be.boards=Z.boards,qn(Be),si(`<span class="eyebrow">YANA BIR SARGUZASHT?</span><h2>Yugurish yakunlandi</h2><div class="result">${Math.floor(Z.score).toLocaleString()} <small style="font-size:15px">ball</small></div><div class="record"><div><small>TANGALAR</small><b>+${Z.coins}</b></div><div><small>MASOFA</small><b>${Math.floor(Z.distance)} m</b></div><div><small>REKORD</small><b>${Be.best}</b></div></div><button class="primary" data-action="start">Qayta o‘ynash →</button><div class="menu-row"><button data-action="menu">Bosh menyu</button></div>`))}function si(r){gt("panel").innerHTML=`<div class="panel-inner">${r}</div>`,gt("panel").hidden=!1}function Hc(){(Ft==="playing"||Ft==="paused")&&(Be.coins+=Z.coins,Be.best=Math.max(Be.best,Math.floor(Z.score)),Be.boards=Z.boards,qn(Be)),Ft="menu",Bt.reset(Be.selectedMap),gt("hud").hidden=!0,vf(),ko(),ct.g.position.set(0,0,0),si(`<span class="eyebrow">SHAHAR SENING MAYDONING</span><h1>METRO<br><em>RUNNER.</em></h1><p>Bir shahar. Uch yo‘lak. Cheksiz imkoniyat.<br>Ritmni tut, tangalarni yig‘ va o‘z rekordingni yangila.</p><button class="primary" data-action="start">O‘ynash &nbsp; ↗</button><div class="menu-row"><button data-action="characters">Qahramonlar</button><button data-action="shop">Do‘kon</button><button data-action="maps">Xaritalar</button><button data-action="graphics">Grafika</button><button data-action="promo">Promokod</button><button data-action="help">Boshqarish</button><button data-action="sound">Ovoz: ${Be.sound?"yoqilgan":"o‘chirilgan"}</button></div><div class="record"><div><small>ENG YUQORI REKORD</small><b>${Be.best.toLocaleString()}</b></div><div><small>HAMYON</small><b>◉ ${Be.coins}</b></div></div><p style="font-size:10px;letter-spacing:2px;margin-top:35px">UCH QAHRAMON · CHEKSIZ SARGUZASHT</p>`)}function io(r=!1){si(`<span class="eyebrow">SENING USLUBING · ◉ ${Be.coins}</span><h2>${r?"Qahramon tanla":"Shahar do‘koni"}</h2>${ir.map(e=>`<div class="shop-model-card"><img class="model-preview" data-preview="${e.id}" alt="${e.name} 3D modeli"><div><b>${e.name}</b><p>${e.description}</p><button data-character="${e.id}">${Be.selected===e.id?"Tanlangan ✓":Be.characters.includes(e.id)?"Tanlash":`◉ ${e.price} · Ochish`}</button></div></div>`).join("")}${r?"":`<div class="card"><div><b>◈ Hoverboard</b><p>20 soniya va bir urilishdan himoya. Sizda: ${Be.boards}</p></div><button data-action="buyboard">◉ 50 · Olish</button></div>`}<div class="menu-row"><button data-action="menu">← Bosh menyu</button></div>`);for(const e of ir)hM(e).then(t=>{const n=document.querySelector(`[data-preview="${e.id}"]`);n&&(n.src=t)}).catch(()=>Sn("Model preview yuklanmadi. Qayta urinib ko‘ring."))}function yM(){si(`<span class="eyebrow">SENGA SOVG‘A</span><h2>Promokod</h2><div class="promo-wallet">HAMYON <b id="promo-balance">◉ ${Be.coins.toLocaleString()}</b></div><form id="promo-form"><label for="promo-code">Promokodni kiriting</label><input id="promo-code" name="code" type="text" maxlength="40" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Masalan: FREE"><button class="primary" type="submit">Faollashtirish</button></form><p id="promo-status" role="status" aria-live="polite"></p><p>Har bir kod shu brauzerdagi profil uchun bir marta ishlaydi.</p><div class="menu-row"><button data-action="menu">← Bosh menyu</button></div>`)}let ka=!1;document.addEventListener("submit",async r=>{if(r.target.id!=="promo-form"||(r.preventDefault(),ka))return;ka=!0;const e=r.target,t=e.querySelector("button");t.disabled=!0;try{const n=await If(Be,e.elements.code.value);e.isConnected&&(gt("promo-balance").textContent="◉ "+Be.coins.toLocaleString(),gt("promo-status").textContent=n.message,gt("promo-status").dataset.status=n.status),n.status==="success"&&Mi("power")}catch{e.isConnected&&(gt("promo-status").textContent="Saqlash imkoni bo‘lmadi. Qayta urinib ko‘ring.")}finally{ka=!1,t.disabled=!1}});function Qh(){si(`<span class="eyebrow">YANGI MANZILLAR · ◉ ${Be.coins}</span><h2>Xaritalar</h2><p>Har 10 000 ballda ochilgan hududlaringiz orasida sayohat qiling.</p>${Zn.map(r=>`<article class="map-card"><img src="${Bt.preview(r.id)}" alt="${r.name} 3D preview"><div><b>${r.name}</b><p>${r.description}</p><small>${Be.maps.includes(r.id)?"Ochilgan ✓":r.price.toLocaleString()+" tanga"}</small><button data-map="${r.id}" ${Be.selectedMap===r.id?"disabled":""}>${Be.selectedMap===r.id?"Tanlangan ✓":Be.maps.includes(r.id)?"Tanlash":"Sotib olish · ◉ "+r.price.toLocaleString()}</button></div></article>`).join("")}<div class="menu-row"><button data-action="menu">← Bosh menyu</button></div>`)}function eu(){si(`<span class="eyebrow">QURILMANGIZGA MOS</span><h2>Grafika</h2><p>Past: kam zarracha, soyasiz. O‘rta: muvozanatli. Yuqori: batafsil soyalar va ko‘proq zarracha.</p><div class="menu-row">${[["low","Past"],["medium","O‘rta"],["high","Yuqori"]].map(([r,e])=>`<button data-quality="${r}">${e}${Be.quality===r?" ✓":""}</button>`).join("")}</div><p>Tanlov avtomatik saqlanadi.</p><button data-action="menu">← Bosh menyu</button>`)}function zo(){Ft==="playing"?(Ft="paused",si('<span class="eyebrow">NAFAS ROSTLA</span><h2>O‘yin pauzada</h2><button class="primary" data-action="resume">Davom etish →</button><div class="menu-row"><button data-action="start">Qayta boshlash</button><button data-action="menu">Bosh menyu</button></div>')):Ft==="paused"&&(Ft="playing",gt("panel").hidden=!0)}document.addEventListener("click",r=>{dl();const e=r.target.closest("button");if(!e)return;Mi("button");const t=e.dataset.action;if(t==="promo"&&yM(),e.dataset.map){if(!Rf(Be,e.dataset.map))return Sn("Tanga yetarli emas. Bu xarita uchun ko‘proq tanga yig‘ing!");qn(Be),Bt.reset(Be.selectedMap),Qh()}if(e.dataset.quality&&(Be.quality=e.dataset.quality,qn(Be),Bt.setQuality(Be.quality),eu()),t==="maps"&&Qh(),t==="graphics"&&eu(),t==="retrymodel"&&location.reload(),e.dataset.character){if(!Pf(Be,e.dataset.character))return Sn("Tanga yetarli emas. Yugurib, ko‘proq tanga yig‘ing!");qn(Be),ko(),io(!0)}if(t==="start"&&vM(),t==="menu"&&Hc(),t==="resume"&&zo(),t==="characters"&&io(!0),t==="shop"&&io(),t==="buyboard"){if(Be.coins<50)return Sn("Hoverboard uchun 50 tanga kerak.");Be.coins-=50,Be.boards++,qn(Be),io()}t==="sound"&&(Be.sound=!Be.sound,qn(Be),Hc()),t==="help"&&si('<span class="eyebrow">RITMNI TOP</span><h2>Boshqarish</h2><p>← / A va → / D — yo‘lakni almashtirish.<br>↑ / W / Space — sakrash.<br>↓ / S — dumalash.<br>H — hoverboard. P / Escape — pauza.</p><p>Telefonda to‘rt tomonga suring. Hoverboard uchun ikki marta bosing yoki ◈ tugmasiga teging.</p><p>Sariq to‘siqdan sakrang, baland to‘siq ostidan dumalang. Poyezdlardan chetlaning yoki sariq qiya yo‘lak orqali tomiga chiqing. Yorqin kublar vaqtinchalik kuch beradi.</p><div class="menu-row"><button data-action="menu">← Bosh menyu</button></div>')});function ml(){if(!(Ft!=="playing"||Z.powers.board)){if(Z.boards<=0)return Sn("Taxtalar tugadi. Do‘kondan xarid qiling.");Z.boards--,Be.boards=Z.boards,qn(Be),Z.powers.board=20,Mi("power")}}function xf(r){Ft==="playing"&&(r==="left"&&(Z.lane=Math.max(-1,Z.lane-1)),r==="right"&&(Z.lane=Math.min(1,Z.lane+1)),r==="jump"&&!ct.flight.active&&Z.y<=Z.ground+.08&&!Z.powers.jet&&!Z.takeoff&&(Z.takeoff=.11,Z.jumpForce=Z.powers.sneakers?15:10.5,Z.roll=0,Mi("jump")),r==="roll"&&!ct.flight.active&&(Z.takeoff=0,Z.roll=.8,Z.y>Z.ground+.1&&(Z.vy=-17)))}document.addEventListener("keydown",r=>{if(r.target.closest("input,textarea,select")||(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Space"].includes(r.code)&&r.preventDefault(),r.repeat))return;if(dl(),["KeyP","Escape"].includes(r.code))return zo();if(r.code==="KeyH")return ml();xf({ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"jump",KeyW:"jump",Space:"jump",ArrowDown:"roll",KeyS:"roll"}[r.code])});gt("pause").onclick=zo;gt("board").onclick=ml;let fs,so=0;Ht.domElement.addEventListener("pointerdown",r=>{dl(),fs={x:r.clientX,y:r.clientY,t:performance.now()}});Ht.domElement.addEventListener("pointerup",r=>{if(!fs)return;const e=r.clientX-fs.x,t=r.clientY-fs.y,n=performance.now();Math.max(Math.abs(e),Math.abs(t))>28?(xf(Math.abs(e)>Math.abs(t)?e>0?"right":"left":t<0?"jump":"roll"),so=0):n-fs.t<240&&(n-so<280?(ml(),so=0):so=n),fs=null});document.addEventListener("visibilitychange",()=>{document.hidden&&Ft==="playing"&&zo()});function MM(){const r=Math.floor(Math.random()*3)-1,e=di>20,t=Math.random();if(t<.24&&e){Ni("train",r,-145),Ni("ramp",r,-136.5);for(let s=-147;s<-140;s+=2)Ni("coin",r,s,4.15)}else{const s=t<.38?"train":t<.58&&e?"moving":t<.78?"low":"high";if(Ni(s,r,-145),e&&Math.random()<.4){const o=[-1,0,1].filter(a=>a!==r)[Math.floor(Math.random()*2)];Ni(Math.random()<.5?"low":"high",o,-145)}}const n=[-1,0,1].filter(s=>!an.some(o=>o.lane===s&&o.g.position.z<-135&&["train","moving","low","high"].includes(o.type))),i=n[Math.floor(Math.random()*n.length)]??0;for(let s=0;s<7;s++)Ni("coin",i,-153-s*2.4,1.25)}function SM(r){Z.inv>0||ct.flight.protected||Bt.protected||(Z.powers.board?(delete Z.powers.board,Z.inv=2.5,po(Z.x,1,0,6553584),Mi("hit"),Sn("Taxta sizni himoya qildi!")):xM())}function yf(){gt("environment-label").textContent=Bt.label,gt("environment-diagnostic")&&(gt("environment-diagnostic").textContent=JSON.stringify({boundary:Bt.cycle.boundary,queue:Bt.cycle.queue.length,transition:Bt.cycle.transition?.time.toFixed(2),map:Bt.cycle.map,weather:Bt.cycle.weather,draws:Ht.info.render.calls,geometries:Ht.info.memory.geometries})),gt("score").textContent=Math.floor(Z.score).toLocaleString(),gt("coins").textContent=Z.coins,gt("distance").textContent=`${Math.floor(Z.distance)} m`,gt("speed").textContent=`${Math.round(Z.speed*3.6)} km/h`,gt("record").textContent=Math.max(Be.best,Math.floor(Z.score)),gt("boards").textContent=Z.boards,gt("powers").innerHTML=Object.entries(Z.powers).filter(([,r])=>r>0).map(([r,e])=>`<div>${Bo[r]?vy(r):"◈"}${zc[r]} <b>${Math.ceil(e)} s</b></div>`).join("")}let tu=performance.now(),za=0;function Mf(r){requestAnimationFrame(Mf);const e=Math.min((r-tu)/1e3,.04);if(tu=r,Ft==="playing"){di+=e,Z.speed=Math.min(36,18+di*.15);const t=Z.speed*e;Z.distance+=t,Z.score+=t*(Z.powers.double?2:1),Z.inv=Math.max(0,Z.inv-e),Z.roll=Math.max(0,Z.roll-e);for(const n of Object.keys(Z.powers))n!=="jet"&&(Z.powers[n]-=e,Z.powers[n]<=0&&delete Z.powers[n]);if(Z.x=We.damp(Z.x,Z.lane*3,16,e),Z.ground=0,Bt.update(e,t,Z.score,Be.maps),Bt.protected)for(let n=an.length-1;n>=0;n--){const i=an[n];["train","moving","low","high","ramp"].includes(i.type)&&i.g.position.z>-Z.speed*3&&i.g.position.z<18&&us(n)}uo-=e,uo<=0&&(MM(),uo=Math.max(1.3,2.7-di*.008)),fo-=e,fo<=0&&(Ni(["magnet","jet","sneakers","double"][Math.floor(Math.random()*4)],Math.floor(Math.random()*3)-1,-145,1.5),fo=12+Math.random()*4);for(const n of an){n.g.position.z+=t+(n.type==="moving"?e*13:0);const i=n.g.position.z,s=Math.abs(n.g.position.x-Z.x);n.type==="ramp"&&s<1.1&&i>=-4&&i<=4&&Z.y<3.7&&(Z.ground=Math.max(Z.ground,(i+4)/8*3.5)),n.type==="train"&&s<1.13&&Math.abs(i)<4.8&&Z.y>=3.25&&(Z.ground=Math.max(Z.ground,3.5))}if(ct.flight.update(e),ct.flight.remaining>0?Z.powers.jet=ct.flight.remaining:delete Z.powers.jet,ct.flight.clearingLanding||ct.flight.grace>0){for(let n=an.length-1;n>=0;n--){const i=an[n];["train","moving","low","high","ramp"].includes(i.type)&&i.g.position.z>-Z.speed*1.6&&i.g.position.z<12&&us(n)}Z.ground=0}Z.takeoff>0&&(Z.takeoff=Math.max(0,Z.takeoff-e),Z.takeoff===0&&(Z.vy=Z.jumpForce)),ct.flight.active?(Z.y=ct.flight.height,Z.vy=0,Z.roll=0,Z.takeoff=0):(Z.vy-=27*e,Z.y+=Z.vy*e,Z.y<Z.ground&&(Z.y=Z.ground,Z.vy=0)),ct.g.position.set(Z.x,Z.y,0),ct.update(e,{mode:Z.powers.jet?"fly":Z.roll>0?"roll":Z.takeoff>0?"takeoff":Z.y>Z.ground+.1?"jump":"run",speed:Z.speed,laneDelta:Z.lane*3-Z.x,boardActive:!!Z.powers.board,rollProgress:1-Z.roll/.8,velocityY:Z.vy,grounded:Z.y<=Z.ground+.08&&!Z.powers.jet});for(let n=an.length-1;n>=0;n--){const i=an[n],s=i.g.position,o=Math.abs(s.x-Z.x),a=Math.abs(s.z);if(i.type==="coin"){if(i.g.rotation.y+=e*3,ct.flight.active&&s.z>-30&&s.z<10&&(s.y=We.damp(s.y,8,6,e)),Z.powers.magnet&&o<7&&a<14&&s.lerp(new L(Z.x,Z.y+1,0),Math.min(1,e*10)),Math.abs(s.x-Z.x)<.8&&Math.abs(s.z)<1&&Math.abs(s.y-(Z.y+1))<1.2){Z.coins++,Mi("coin"),po(s.x,s.y,s.z),us(n);continue}}else if(zc[i.type]&&i.type!=="board"){if(yy(i.g,e,di),i.type==="jet"&&ct.flight.active&&s.z>-30&&s.z<10&&(s.y=We.damp(s.y,Z.y+1,8,e)),o<.85&&a<1&&Math.abs(s.y-Z.y-1)<1.6){i.type==="jet"?(ct.flight.collect(8,Z.y),Z.powers.jet=ct.flight.remaining):Z.powers[i.type]=10,Mi("power"),po(s.x,s.y,s.z,Bo[i.type].color),Sn(zc[i.type]+" faollashdi!"),us(n);continue}}else if(!i.passed){const c=ct.collider,l=Math.abs(s.z-c.offsetZ),u=Math.abs(s.x-Z.x-c.offsetX),h=Z.y+c.currentHeight;let f=!1;i.type==="low"&&(f=u<1.125+c.halfWidth&&l<.325+c.halfDepth&&Z.y<1.03),i.type==="high"&&(f=u<1.1+c.halfWidth&&l<.325+c.halfDepth&&h>1.5&&Z.y<2.8),(i.type==="train"||i.type==="moving")&&(f=u<1.275+c.halfWidth&&l<4.5+c.halfDepth&&Z.y<3.3),f&&(SM(),i.passed=!0)}s.z>23&&us(n)}ct.board.visible=!!Z.powers.board,ct.g.visible=ct.flight.active||Z.inv<=0||Math.floor(di*15)%2===0,Z.powers.board&&Math.random()<.5&&po(Z.x,.1,.7,6553584),jn.position.lerp(new L(Z.x*.3,6.3+Z.y*.8,11),1-Math.exp(-e*5)),jn.lookAt(Z.x*.35,1.8+Z.y*.85,-13),za+=e,za>.1&&(yf(),za=0)}else Ft==="menu"&&(Bt.idle(e),di+=e,ct.g.position.set(2.7,0,0),ct.g.rotation.y=Math.PI-.35,ct.update(e,{mode:"idle"}),jn.position.set(4.5,5.2,12),jn.lookAt(0,2,-22));if(Ft==="playing")for(let t=ki.length-1;t>=0;t--){const n=ki[t];n.life-=e,n.g.position.addScaledVector(n.v,e),n.v.y-=e*9,n.g.scale.setScalar(Math.max(.01,n.life*.13)),n.life<=0&&($t.remove(n.g),pl.push(n.g),ki.splice(t,1))}Ht.render($t,jn)}window.addEventListener("resize",()=>{jn.aspect=innerWidth/innerHeight,jn.updateProjectionMatrix(),Ht.setSize(innerWidth,innerHeight),Bt.setQuality(Be.quality)});Hc();requestAnimationFrame(Mf);
