# Metro Runner

Vite, JavaScript va Three.js asosidagi uch yo‘lakli 3D endless runner. Backend kerak emas.

## Internetdagi o‘yin

Manzil: https://qibrohim711-lang.github.io/metro-runner/

Hosting: public repozitoriy uchun GitHub Pages. `vite.config.js` nisbiy asset manzillarini ishlatadi. `gh-pages` branch faqat tayyor `dist/` paketini saqlaydi; manba kodi `main` branch’da. Yangilash uchun ulangan GitHub hisobingiz bilan Windows PowerShell’da `./scripts/deploy-pages.ps1` ishga tushiriladi. Skript credential’ni faqat jarayon xotirasida ishlatadi; faylga yozmaydi.

Telefon uchun uch yo‘lak, surish orqali boshqarish, ikki marta tegish, moslashuvchan HUD va scroll qilinadigan menyu bor. 390×844 kichik ekran ko‘rinishi tekshirilgan; haqiqiy telefonning GPU/FPS ko‘rsatkichlari alohida sinov talab qiladi. Birinchi yuklashda 3D modellar sabab kutish mumkin. Natijalar har bir brauzer/origin localStorage’ida alohida saqlanadi — localhost’dagi tangalar internet manziliga avtomatik ko‘chmaydi.

## Ishga tushirish

```sh
npm install
npm run dev
npm test
npm run build
```

Terminaldagi manzilni oching. Yig‘ilgan paketni ko‘rish: `npm run preview`. WebGL kerak. Telefon boshqaruvi mavjud; haqiqiy telefonlarda alohida sinash tavsiya etiladi.

## Boshqarish

- A / D yoki ← / →: yo‘lak almashtirish, havoda ham.
- W / ↑ / Space: sakrash.
- S / ↓: past sirpanish; havoda tez tushish.
- H: hoverboard.
- P / Escape: pauza. Boshqa tabga o‘tilsa avtomatik pauza.
- Telefon: tegishli tomonga surish; ikki marta bosish yoki ◈ tugmasi orqali taxta.

Past to‘siqdan sakrang, baland to‘siq ostidan sirpaning. Poyezddan chetlaning yoki sariq qiya platformadan uning tomiga chiqing. Har qator kamida bitta ochiq yo‘lak qoldiradi; tezlik 36 m/s bilan cheklangan.

## Do‘kon va saqlash

| Saqlanadigan ID | Yangi model | Narx | Runtime fayl |
|---|---|---:|---|
| `aziz` | Humano biznesmen | 0 | `public/models/characters/aziz.glb` |
| `lola` | Hulk | 150 | `public/models/characters/lola.glb` |
| `sardor` | TASM 2 | 300 | `public/models/characters/sardor.glb` |

ID, narxlar va `metro-runner` localStorage kaliti o‘zgarmagan. Oldingi tangalar, rekord, ochilgan qahramonlar, tanlangan ID, taxtalar va ovoz sozlamalari saqlanadi. Hoverboard narxi 50 tanga. Birinchi o‘rnatishda 3 ta taxta beriladi; ishlatilganlari sarflanadi. Barcha modellar bir xil o‘yin qobiliyatiga ega. Menyuga qaytish yugurish tangalarini saqlaydi; qayta boshlash joriy yugurishni bekor qiladi.

Do‘kon preview’si alohida maket emas: `src/shop-preview.js` o‘yindagi shu model yuklagichi va idle klipidan rasm hosil qiladi. GLB va texture’lar bir marta cache qilinadi, skeletlar `SkeletonUtils.clone` bilan nusxalanadi. Har bir nusxaning mixer’i, dissolve materiallari va bone texture’lari olib tashlanganda tozalanadi.

## Modellar va animatsiyalar haqidagi aniq holat

Uchala yangi modelda ham tayyor animatsiya kliplari yo‘q. Yugurish, itarilish, sakrash, sirpanish, qo‘nish, hoverboard va uchish kliplari `src/avatar-animation.js` orqali yaratiladi; `AnimationMixer` va crossfade bilan ijro etiladi. Model masshtabi harakat vaqtida o‘zgarmaydi. Yo‘lak va fizik balandlik umumiy `playerRoot` bilan boshqariladi; kliplar root motion qo‘shmaydi.

- **Humano:** ZIP ichidagi FBX 6100 formati Three.js tomonidan o‘qilmaydi. Arxivdagi 30K OBJ va diffuse/normal rasmlaridan GLB yaratildi. Manba skeletsiz, qo‘llari cho‘ntakdagi skan; taxminiy avtomatik skin/rig qo‘shildi. Oyoq va gavda harakatlanadi, ammo qo‘llar skanga birikkanligi sabab tabiiy qo‘l siltash cheklangan. Professional rig sifatida ko‘rsatilmaydi.
- **Hulk:** Mixamo skeleti va haqiqiy skin weight’lari umumiy 20 ta anatomik bo‘g‘imga qayta bog‘landi. FBX tilga olgan `hulk_c.png`, pants, hair va boshqa texture fayllari yuborilmagan. Yo‘q rasmlarga so‘rov yuborilmaydi: yashil tana, binafsha kiyim va soch uchun PBR rangli materiallar ishlatiladi. Bu original texture tiklandi degani emas.
- **TASM 2:** Rigify’ning `DEF-*` deformatsiya suyaklari va weight’lari umumiy rigga qayta bog‘landi; bu faqat suyak nomlarini almashtirish emas. Skinlanmagan to‘r/logo qismlariga yaqin tana vertex’laridan weight ko‘chirildi. Root’ga bog‘langan taglik oyoqlarga qayta skinlandi. 1001–1010 UDIM body diffuse/normal rasmlari 5×2 atlasga joylandi, UV’lar qayta hisoblandi; 1012 ko‘z linzasi alohida moslandi.

GLB hajmlari taxminan Humano 1.1 MB, Hulk 9.2 MB, TASM 4.2 MB; texture’lar alohida JPEG. CPU collision hisoblari bo‘g‘im ekstremumlari va sirt namunalaridan foydalanadi. Telefonning GPU quvvatiga qarab, ayniqsa Hulk va soyalar tezlikka ta’sir qilishi mumkin.

Asl arxivlar Downloads’da qolgan. Ishchi nusxalar `assets-source/characters/` da va Git’dan chiqarilgan. Assetlarni qayta tayyorlash uchun shu manbalar kerak:

```sh
python scripts/prepare-character-textures.py
node scripts/prepare-characters.mjs
```

Python faqat qayta tayyorlash uchun; Pillow kerak. Oddiy o‘yinni ishga tushirish uchun Python kerak emas. Eski `public/models/avatar/model.fbx` zaxira yuklagich va eski rig testlarida ishlatilgani sabab o‘chirilmagan. Yuklash xatosida konsolda sabab chiqadi va zaxira qahramon qo‘llanadi.

## Jetpack → Enceladus

`assets-source/Enceladus.fbx` asl model saqlangan; o‘yinda `public/models/astronaut/Enceladus.glb` (6.4 MB) ishlatiladi. Qayta tayyorlash: `npm run prepare:astronaut`. Enceladus manbasida skelet, texture rasmlari va tayyor kliplar yo‘q; zirh qismlariga qo‘shilgan bo‘g‘imlar va PBR materiallar ishlatiladi.

Holatlar: `running → transformingToAstronaut → flying → transformingBack → landing → running`. Jetpack ichida 0.8 soniyalik yorug‘lik halqalari/dither-dissolve almashishi, keyin parvoz, oxirida 0.95 soniyalik qaytish va 0.26 soniyalik qo‘nish bor. Qaytishda aynan tanlangan model ko‘rinadi. Yaqin qo‘nish hududi to‘siqlardan tozalanadi; 1.5 soniya qo‘shimcha himoya ishlaydi. Yana jetpack olinsa vaqtga 8 soniya qo‘shiladi, uchish transformatsiyasi qayta boshlanmaydi. Kosmonavt yuklanmasa asosiy model bilan parvoz davom etadi.

Pauzada taymer, animatsiya va effektlar to‘xtaydi. Halqalar, 120 ta energiya/iz zarrachasi va dvigatel effektlari qayta ishlatiladi. Qayta boshlash/menyuga o‘tish ularni tozalaydi.

## Kuchaytirgichlar

`src/powerups.js` barcha buyumlarni detallangan geometriyadan yaratadi:

- Reaktiv parvoz: korpus, uch, qanotlar, soplo, olov va uchqunli raketa — 8 s.
- Magnit: qizil U-korpus, metall uchlar va maydon yoylari — 10 s.
- 2× ball: backing qutisiz haqiqiy extrude qilingan oltin 2 va ko‘paytirish belgisi — 10 s.
- Super krossovka: taglik, ustki qism, bog‘ichlar va energiya izli oyoq kiyim — 10 s.

Buyum root’i yig‘ib olish nuqtasi bo‘lib qoladi; alohida child qismi yengil tebranib/aylanadi. 2× yozuvi teskari o‘qilmasligi uchun to‘liq aylanish o‘rniga sekin buriladi. Olinganda rangli zarracha va Web Audio ovozi bor. Spawn ehtimollari, taymerlar va kuchlar ta’siri o‘zgarmagan. HUD SVG belgilari buyumlarga mos. Object pooling cheksiz obyekt yig‘ilishini cheklaydi.

## Tekshiruv sahifalari (faqat dev)

- `/animation-preview.html`: uchta modelni tanlash, yugurish, sakrash, sirpanish, hoverboard, jetpack va qaytish; pauza va 0.1 s qadam.
- `/powerup-preview.html`: to‘rtta 3D buyumni yaqindan ko‘rish.
- `/?jetpackTest=1`: asosiy o‘yinning haqiqiy pickup yo‘li bilan jetpack, magnit, 2× va krossovkani chaqirish. Bu tugmalar production’da yo‘q.

`npm test` eski saqlash ID/narxlarini, xarid/tanlash/saqlashni, har modelning skin index’larini, yerga turishini, masshtab o‘zgarmasligini, sirpanish balandligini, hoverboard klipini, kosmonavtdan aynan o‘sha modelga qaytishni, resurs tozalanishini hamda buyum collision nuqtasining siljimasligini tekshiradi. Build: `npm run build`.
