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
| `aziz` | Near Future Soldier | 0 | `public/models/characters/aziz-soldier.glb` |
| `lola` | Hulk | 150 | `public/models/characters/lola.glb` |
| `sardor` | TASM 2 | 300 | `public/models/characters/sardor.glb` |

ID, narxlar va `metro-runner` localStorage kaliti o‘zgarmagan. Oldingi tangalar, rekord, ochilgan qahramonlar, tanlangan ID, taxtalar va ovoz sozlamalari saqlanadi. Hoverboard narxi 50 tanga. Birinchi o‘rnatishda 3 ta taxta beriladi; ishlatilganlari sarflanadi. Barcha modellar bir xil o‘yin qobiliyatiga ega. Menyuga qaytish yugurish tangalarini saqlaydi; qayta boshlash joriy yugurishni bekor qiladi.

Do‘kon preview’si alohida maket emas: `src/shop-preview.js` o‘yindagi shu model yuklagichi va idle klipidan rasm hosil qiladi. GLB va texture’lar bir marta cache qilinadi, skeletlar `SkeletonUtils.clone` bilan nusxalanadi. Har bir nusxaning mixer’i, dissolve materiallari va bone texture’lari olib tashlanganda tozalanadi.

## Modellar va animatsiyalar haqidagi aniq holat

Uchala yangi modelda ham tayyor animatsiya kliplari yo‘q. Yugurish, itarilish, sakrash, sirpanish, qo‘nish, hoverboard va uchish kliplari `src/avatar-animation.js` orqali yaratiladi; `AnimationMixer` va crossfade bilan ijro etiladi. Model masshtabi harakat vaqtida o‘zgarmaydi. Yo‘lak va fizik balandlik umumiy `playerRoot` bilan boshqariladi; kliplar root motion qo‘shmaydi.

- **Near Future Soldier:** Near_future_soldier__0123183948.fbx va PNG ishlatiladi. Manbada skelet va tayyor kliplar yo‘q. 20 bo‘g‘imli taxminiy skelet, anatomik skin og‘irliklari va AnimationMixer orqali run/jump/land/roll/board/fly kliplari qo‘shimcha yaratiladi. Bu professional qo‘lda rig qilingan model emas; murakkab zirh bo‘g‘imlarida deformatsiya bo‘lishi mumkin.
- **Hulk:** Mixamo skeleti va haqiqiy skin weight’lari umumiy 20 ta anatomik bo‘g‘imga qayta bog‘landi. FBX tilga olgan `hulk_c.png`, pants, hair va boshqa texture fayllari yuborilmagan. Yo‘q rasmlarga so‘rov yuborilmaydi: yashil tana, binafsha kiyim va soch uchun PBR rangli materiallar ishlatiladi. Bu original texture tiklandi degani emas.
- **TASM 2:** Rigify’ning `DEF-*` deformatsiya suyaklari va weight’lari umumiy rigga qayta bog‘landi; bu faqat suyak nomlarini almashtirish emas. Skinlanmagan to‘r/logo qismlariga yaqin tana vertex’laridan weight ko‘chirildi. Root’ga bog‘langan taglik oyoqlarga qayta skinlandi. 1001–1010 UDIM body diffuse/normal rasmlari 5×2 atlasga joylandi, UV’lar qayta hisoblandi; 1012 ko‘z linzasi alohida moslandi.

GLB hajmlari taxminan Soldier 9 MB, Hulk 9.2 MB, TASM 4.2 MB; texture’lar alohida JPEG/PNG. CPU collision hisoblari bo‘g‘im ekstremumlari va sirt namunalaridan foydalanadi. Telefonning GPU quvvatiga qarab, ayniqsa Hulk va soyalar tezlikka ta’sir qilishi mumkin.

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

## Xaritalar va ob-havo

Xaritalar menyusi: Shahar metrosi (bepul), Neon shahar (3 000), Cho‘l (5 000), Qorli shahar (7 000), Kosmik stansiya (10 000 tanga). Narx faqat birinchi muvaffaqiyatli xaridda yechiladi. Yangi localStorage maydonlari: maps, selectedMap, quality; avvalgi metro-runner ma’lumotlari saqlanadi.

Har 5 000 ball chegarasi bir marta qayta ishlanadi. Har ikkinchi chegarada faqat ochilgan xaritalardan boshqa xarita tanlanadi; shu yangi xaritaga mos ob-havo birgalikda aniqlanadi. O‘tishlar navbat bilan 2.6 soniyada bajariladi. Bitta xarita ochiq bo‘lsa, faqat ob-havo o‘zgaradi. Menyudagi boshlang‘ich xarita avtomatik o‘tishlarda o‘zgarmaydi. Portal paytida oldindagi to‘siqlar tozalanadi va qisqa himoya ishlaydi; koordinatalar, jetpack, taxta va ball qayta boshlanmaydi.

Besh muhitning geometriyasi oldindan tayyorlanadi, detallar material bo‘yicha birlashtiriladi, 12 ta segment aylanma ishlatiladi. Yomg‘ir chiziqlari, qor va chang uchun oldindan ajratilgan zarrachalar mavjud. Kosmosda yog‘ingarchilik o‘rniga yulduzlar, sayyora, qutb nuri yoki reaktor yoritilishi ishlaydi. Grafika menyusida Past/O‘rta/Yuqori tanlanadi; pixel ratio, soyalar, zarracha soni va dron effekti moslanadi.

Faqat ishlab chiqish rejimida ?environmentTest&jetpackTest manzili haqiqiy o‘yin balli, muhit va jetpackni sinov tugmalari orqali boshqaradi. Bu tugmalar production build’da yo‘q. Pul berilmaydi; do‘kon xaridlari alohida avtomatik storage testlarida tekshiriladi. Chegara/navbat, pauza, qayta boshlash, eski ma’lumotlar va 18 ta ketma-ket o‘tishda sahna resurslarining barqarorligi tests/environment.test.js’da tekshiriladi.

## FREE promokod

Bosh menyudagi Promokod bo‘limi FREE kodini bo‘shliqlar va katta-kichik harflardan qat’i nazar qabul qiladi. Mavjud balansga bir marta 30 000 tanga qo‘shadi. redeemedPromos ro‘yxati profil bilan bir yozuvda localStorage’ga saqlanadi; yozish amalga oshmasa mukofot berilmaydi. Tez bosish UI band holati bilan, eski profil nusxasi esa saqlashni qayta o‘qish bilan himoyalanadi. Web Locks mavjud brauzerlarda tablar bir xil profil qulfidan foydalanadi. Backend yo‘q: cheklov faqat shu brauzer/origin profiliga tegishli; xotirani o‘chirish yoki o‘zgartirishdan server himoyasi yo‘q.

Soldier runtime: public/models/characters/aziz-soldier.glb + soldier-color.png. ID aziz va narx 0 saqlanadi; boshqa tanlangan qahramon avtomatik o‘zgarmaydi. Qayta tayyorlash: node scripts/prepare-characters.mjs --free-only (manba FBX assets-source/characters/Soldier ichida bo‘lishi kerak). Oldingi Humano texture’lari runtime’dan chiqarildi; manba arxivlar va zaxira GLB assets-source ichida saqlanadi.
