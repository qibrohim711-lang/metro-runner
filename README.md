# Metro Runner

Original qahramonlar va Three.js geometriyalaridan yaratilgan 3D cheksiz yugurish o‘yini.

## Ishga tushirish

```sh
npm install
npm run dev
```

Terminalda ko‘rsatilgan manzilni oching. Yakuniy paket: `npm run build`. Uni ko‘rish: `npm run preview`.

## Boshqarish

- A / D yoki ← / →: yo‘lak almashtirish (havoda ham).
- W / ↑ / Space: sakrash.
- S / ↓: dumalash, havoda tez tushish.
- H: hoverboard.
- P / Escape: pauza.
- Telefon: tegishli tomonga surish; ikki marta bosish yoki ◈ tugmasi orqali taxta.

Past to‘siqdan sakrang, baland to‘siq tagidan dumalang. Poyezddan chetlaning yoki sariq qiya platforma orqali uning tomiga chiqing. Har to‘siq qatorida kamida bitta ochiq yo‘lak qoladi. Tezlik 36 m/s bilan cheklangan.

Magnit (10 s), reaktiv parvoz (8 s), super krossovka (10 s), ikki karra ball (10 s), hoverboard (20 s va bir urilishdan himoya) mavjud. Parvozdan tushishda 3 soniya, taxta singanda 2.5 soniya himoya beriladi.

Rekord, hamyon, personajlar, taxtalar va ovoz holati shu brauzerning localStorage xotirasida saqlanadi. Boshlang‘ich 3 ta taxta beriladi; ishlatilganlari sarflanadi. Qahramonlar bir xil qobiliyatga ega. Menyuga qaytish yakunlanmagan yugurish tangalarini saqlaydi; qayta boshlash esa joriy yugurishni bekor qiladi.

## Tuzilishi

- `src/main.js`: o‘yin holati, fizika, kiritish, to‘qnashuv, menyular va obyekt havzasi.
- `src/world.js`: geometriyalar, qahramon va qayta ishlatiladigan shahar segmentlari.
- `src/storage.js`: saqlash va personajlar.
- `src/audio.js`: foydalanuvchi bosgandan keyin ishlaydigan Web Audio ovozlari.

Avatar modeli loyiha ichida saqlanadi; tashqi audio talab qilinmaydi. Google shrift yuklanmasa tizim shrifti ishlaydi. WebGL kerak; eski telefonlarda soya va yuqori piksel zichligi ishlash tezligiga ta’sir qilishi mumkin. To‘qnashuvlar obyekt o‘lchami va qahramon balandligiga mos soddalashtirilgan hajmlar bilan tekshiriladi.

## Foydalanuvchi avatari

Endi qahramon `public/models/avatar/model.fbx` faylidan `FBXLoader` orqali yuklanadi (12.7 MB). Skelet va 29 ta texture havolasi fayl ichida; qo‘shimcha PNG/JPG yoki material fayli kerak emas. Build ushbu modelni `dist/models/avatar/model.fbx` ga nusxalaydi. Eski geometrik qahramon kodi saqlangan, lekin o‘yinda ishlatilmaydi.

FBX ichida **tayyor animatsiya kliplari yo‘q** (nomlar ro‘yxati bo‘sh). `src/avatar-animation.js` skelet suyaklari uchun `Metro_idle`, `Metro_run`, `Metro_takeoff`, `Metro_jump`, `Metro_roll`, `Metro_fly` va `Metro_land` kliplarini yaratadi. `src/avatar-controller.js` ularni Three.js `AnimationMixer` va crossfade bilan boshqaradi. `src/avatar.js` shu boshqaruvchini eksport qiladi. Bular motion capture animatsiyalari emas.

Dumalash boshqaruvi endi **tizzada past sirpanish**: son, tizza, umurtqa, qo‘l va tirsaklar bukiladi; modelning masshtabi hech bir harakatda o‘zgarmaydi. To‘liq akrobatik salto yo‘q. Sakrashdan oldin 0.11 soniyalik itarilish fazasi, havoda o‘zgaruvchi poza va qo‘nganda 0.24 soniyalik yumshatish fazasi bor. Jetpackda gavda tebranadi, qo‘l-oyoq suyaklari uzluksiz harakatlanadi; tugaganda tushish va qo‘nish klipiga o‘tiladi. Yugurish ritmi tezlikka moslashadi. Model bo‘yi 2.3 o‘yin birligiga moslanadi, oyoqlar har pozada yer/tom balandligiga to‘g‘rilanadi. To‘qnashuv balandligi, chuqurligi va old-orqa markazi ayni kadrdagi deformatsiyalangan model bo‘yicha hisoblanadi; sirpanishga kirish/chiqish ham hisobga olinadi. To‘siqqa yetmasdan oldin pastlashish uchun ↓ tugmasini oldinroq bosing.

Tekshirish: `node --test tests/avatar.test.js`. Besh test modelning masshtabi o‘zgarmasligi, yerga turishi, sirpanish hajmi, sakrash/uchishdagi suyak harakati, qo‘nish, qayta boshlash va 30/60 FPS mosligini tekshiradi. `npm run dev` dan so‘ng `/animation-preview.html` sahifasida yugurish, sakrash, sirpanish va jetpackni alohida ko‘rish mumkin (faqat ishlab chiqish serverida). Haqiqiy o‘yin bosh sahifada qoladi.

Avvalgi qahramon tanlash va ochish ma’lumotlari saqlanadi; ochilgan Lola va Sardor tanlanganda shu avatar ko‘ylagiga tegishli rang beriladi. Asosiy Aziz variantida original texture ranglari saqlanadi.

Model ko‘rinmasa: `npm run dev` orqali oching, `public/models/avatar/model.fbx` mavjudligini tekshiring, so‘ng sahifani yangilang. Model yuklanishidagi xato o‘zbekcha oynada, texnik sababi brauzer konsolida ko‘rsatiladi. Dastlabki yuklash model hajmi sabab biroz vaqt olishi mumkin. Yaxshiroq tabiiy animatsiya uchun ayni skeletga mos Run/Jump/Roll kliplarini FBX ichiga eksport qilish kerak; animatsiya nomlari bo‘yicha tanlash va crossfade tayyorlangan.
