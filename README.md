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

Tashqi modellar va audio talab qilinmaydi. Google shrift yuklanmasa tizim shrifti ishlaydi. WebGL kerak; eski telefonlarda soya va yuqori piksel zichligi ishlash tezligiga ta’sir qilishi mumkin. To‘qnashuvlar obyekt o‘lchami va qahramon balandligiga mos soddalashtirilgan hajmlar bilan tekshiriladi.
