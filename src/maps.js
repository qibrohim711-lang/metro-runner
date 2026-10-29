export const maps=[
 {id:'metro',name:'Shahar metrosi',price:0,description:'Issiq quyosh, xiyobonlar va metro yo‘li.',sky:0x9ccfdf,horizon:0xf4d8b1,ground:0x697881,accent:0xffd28b,weather:['clear','cloudy','rain','mist']},
 {id:'neon',name:'Neon shahar',price:3000,description:'Tungi osmono‘par binolar va neon ko‘chalar.',sky:0x11142e,horizon:0x553c79,ground:0x242d48,accent:0x6df9ff,weather:['clear','cloudy','rain','mist']},
 {id:'desert',name:'Cho‘l',price:5000,description:'Qum tepalari, qoyalar va voha bekatlari.',sky:0x77bddd,horizon:0xffd9a3,ground:0xc99a63,accent:0xffb75d,weather:['clear','cloudy','sand']},
 {id:'snow',name:'Qorli shahar',price:7000,description:'Qor bosgan tomlar va ignabargli o‘rmon.',sky:0x9ebbd4,horizon:0xe7f1fa,ground:0xc3d4e1,accent:0xa6e8ff,weather:['clear','snow','mist']},
 {id:'space',name:'Kosmik stansiya',price:10000,description:'Orbital platforma, sayyoralar va reaktorlar.',sky:0x050817,horizon:0x172a4e,ground:0x303b56,accent:0x86caff,weather:['stars','aurora','pulse']}
];
export const weatherLabels={clear:'☀ Ochiq',cloudy:'☁ Bulutli',rain:'☂ Yomg‘ir',mist:'≋ Tuman',sand:'≋ Qum shamoli',snow:'❄ Qor',stars:'✧ Yulduzlar',aurora:'✺ Qutb nuri',pulse:'◉ Reaktor nuri'};
export const getMap=id=>maps.find(m=>m.id===id)||maps[0];
export function normalizeMaps(data){data.maps=[...new Set(['metro',...(Array.isArray(data.maps)?data.maps:[])].filter(id=>maps.some(m=>m.id===id)))];if(!data.maps.includes(data.selectedMap))data.selectedMap='metro';if(!['low','medium','high'].includes(data.quality))data.quality='medium';return data}
export function chooseMap(data,id){const map=maps.find(m=>m.id===id);if(!map)return false;normalizeMaps(data);if(!data.maps.includes(id)){if(!Number.isFinite(data.coins)||data.coins<map.price)return false;data.coins-=map.price;data.maps.push(id)}data.selectedMap=id;return true}
// One serialized transition consumes each crossed boundary exactly once, even after a score leap.
export class EnvironmentCycle{
 constructor(random=Math.random){this.random=random;this.reset('metro')}
 reset(id){this.map=getMap(id).id;this.weather=getMap(id).weather[0];this.boundary=0;this.transition=null;this.queue=[];this.serial=0}
 choose(list,previous){const alternatives=list.filter(v=>v!==previous);const choices=alternatives.length?alternatives:list;return choices[Math.min(choices.length-1,Math.floor(this.random()*choices.length))]}
 update(dt,score,unlocked,paused=false){if(paused)return null;let event=null;
  if(this.transition){this.transition.time=Math.min(2.6,this.transition.time+dt);if(this.transition.time>=2.6){this.map=this.transition.map;this.weather=this.transition.weather;this.transition=null}}
  const reached=Math.floor(Math.max(0,score)/5000);while(this.boundary<reached){this.boundary++;this.queue.push(this.boundary)}
  if(!this.transition&&this.queue.length){const boundary=this.queue.shift();const available=maps.filter(m=>unlocked.includes(m.id)).map(m=>m.id);const map=boundary%2===0?this.choose(available.length?available:[this.map],this.map):this.map;const weather=this.choose(getMap(map).weather,this.weather);event={id:++this.serial,map,weather,fromMap:this.map,fromWeather:this.weather,mapChanged:map!==this.map,time:0,boundary};this.transition=event}
  return event
 }
 get protected(){return !!this.transition?.mapChanged}
}
