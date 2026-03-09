from PIL import Image

try:
    img = Image.open("/Users/admin/Documents/Works/rnd/Public Complaint App/docs/citizen_app_complaint_form_mockup_1772889557150.png")
    img = img.convert('RGB')
    img.thumbnail((100, 100))
    q_img = img.quantize(colors=16)
    palette = q_img.getpalette()
    
    colors = q_img.getcolors(maxcolors=16)
    dominant = sorted(colors, reverse=True)
    
    for count, pixel in dominant:
        r = palette[pixel*3]
        g = palette[pixel*3 + 1]
        b = palette[pixel*3 + 2]
        print(f"Color #{r:02x}{g:02x}{b:02x} ({count} pixels)")

except Exception as e:
    print(e)
