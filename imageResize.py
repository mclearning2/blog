from glob import glob

from PIL import Image

fixed_height = 500

for path in glob("static/images/**/*.png"):
    img = Image.open(path);

    if (img.height > fixed_height):
        height_percent = (fixed_height / float(img.height))
        width_size = int((float(img.width) * float(height_percent)))
        image = img.resize((width_size, fixed_height), Image.NEAREST)
        print(path, img.width, img.height, " -> ", image.width, image.height)

        image.save(path,optimize=True,quality=30)
    else:
        print(path, img.width, img.height, " -> keeping")

print("Hi")
