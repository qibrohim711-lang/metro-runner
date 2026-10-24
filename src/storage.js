const defaults={coins:0,best:0,characters:['aziz'],selected:'aziz',boards:3,sound:true};
export function load(){try{const s=JSON.parse(localStorage.getItem('metro-runner'));return {...defaults,...s,characters:Array.isArray(s?.characters)?s.characters:defaults.characters}}catch{return {...defaults}}}
export function save(data){try{localStorage.setItem('metro-runner',JSON.stringify(data))}catch{}}
export const characters=[{id:'aziz',name:'Aziz',description:'Shahar ritmini his qiluvchi kashfiyotchi.',color:0xc5ff52,hat:0x21334e,price:0},{id:'lola',name:'Lola',description:'Binafsha uslub, cheksiz energiya.',color:0xc390ff,hat:0xff637d,price:150},{id:'sardor',name:'Sardor',description:'Moviy kurtka va quyosh rangli qalpoq.',color:0x3edcfa,hat:0xffc24b,price:300}];
