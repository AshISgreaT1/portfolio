from PIL import Image
import os
imgs = [
    'public/images/hero-avatar-cutout.png',
    'public/images/hero-character.png',
    'public/images/hero-avatar-model.png',
    'public/images/ayush-3d-avatar-clean.png',
]
for p in imgs:
    full = os.path.join(os.getcwd(), *p.split('/'))
    print(f"{p}: exists={os.path.exists(full)}")
    if not os.path.exists(full):
        continue
    im = Image.open(full)
    print('  mode', im.mode, 'size', im.size)
    if 'A' in im.getbands():
        alpha = im.split()[-1]
        data = list(alpha.getdata())
        trans = sum(1 for v in data if v == 0)
        print('  fully transparent pixels:', trans, 'of', im.size[0] * im.size[1])
        print('  opaque pixels:', sum(1 for v in data if v > 0))
    else:
        print('  no alpha channel')
    print('  sample pixels:')
    coords = [(10,10),(20,20),(30,30),(50,50),(100,100),(200,200),(10,200),(200,10),(400,400),(600,800)]
    px = im.load()
    for x,y in coords:
        if x < im.width and y < im.height:
            print('    ', (x,y), px[x,y])
    print()
