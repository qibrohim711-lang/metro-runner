import {load,save} from './storage.js';
export const promoMessages={empty:'Promokodni kiriting',invalid:'Promokod topilmadi',used:'Bu promokod avval ishlatilgan',success:'Tabriklaymiz! 30 000 tanga qo‘shildi!',storage:'Saqlash imkoni bo‘lmadi. Brauzer xotirasini tekshiring.'};
export function redeemPromo(data,input,{storage=globalThis.localStorage,locks=globalThis.navigator?.locks}={}){
 const code=String(input??'').trim().toUpperCase();
 if(!code)return Promise.resolve({status:'empty',message:promoMessages.empty});
 if(code!=='FREE')return Promise.resolve({status:'invalid',message:promoMessages.invalid});
 const transaction=()=>{
  // Read inside the lock so a second tab cannot redeem a stale copy of the profile.
  let latest;try{latest=storage.getItem('metro-runner')===null?{...data,redeemedPromos:[...(data.redeemedPromos||[])]}:load(storage)}catch{return {status:'storage',message:promoMessages.storage}}
  if(latest.redeemedPromos?.includes(code)){Object.assign(data,latest);return {status:'used',message:promoMessages.used}}
  const next={...latest,coins:(Number.isFinite(latest.coins)?latest.coins:0)+30000,redeemedPromos:[...(latest.redeemedPromos||[]),code]};
  if(!save(next,storage))return {status:'storage',message:promoMessages.storage};
  Object.assign(data,next);return {status:'success',message:promoMessages.success};
 };
 return locks?.request?locks.request('metro-runner-profile',transaction):Promise.resolve(transaction());
}
