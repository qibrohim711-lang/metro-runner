from pathlib import Path
from PIL import Image
out=Path('public/models/characters');out.mkdir(parents=True,exist_ok=True)
humano=Path('assets-source/characters/Humano_01BusinessOffice_01_C4D/Tex')
for suffix,name,limit in [('Diffuse01','humano-color',2048),('Normal','humano-normal',1024)]:
    image=Image.open(humano/f'Humano_01Business_01_{suffix}.jpg').convert('RGB')
    image.thumbnail((limit,limit));image.save(out/f'{name}.jpg',quality=88,optimize=True)
tasm=Path('assets-source/characters/TASM 2/textures')
for kind,name in [('BaseColor','tasm-color'),('Normal','tasm-normal')]:
    atlas=Image.new('RGB',(2560,1024),(128,128,255) if kind=='Normal' else (30,30,30))
    for tile in range(10):
        image=Image.open(tasm/f'Substance tasm 5_Tasm 2_{kind}.{1001+tile}.png').convert('RGB').resize((512,512),Image.Resampling.LANCZOS)
        atlas.paste(image,((tile%5)*512,(1-tile//5)*512))
    atlas.save(out/f'{name}.jpg',quality=90,optimize=True)
for source,name in [(tasm/'Substance tasm 5_Inner Lenses_BaseColor.1012.png','tasm-lenses'),
    (tasm/'Sole/New TASM 2 Sole for texturing_40_Material33_1_0_0.002_BaseColor.png','tasm-sole')]:
    image=Image.open(source).convert('RGB');image.thumbnail((512,512));image.save(out/f'{name}.jpg',quality=88,optimize=True)
print('Prepared Humano textures and 10-tile TASM atlases.')
