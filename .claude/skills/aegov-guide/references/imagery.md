# Imagery guideline

Guides authentic, human, future-forward imagery with realistic colour/lighting, defined aspect ratios, and overlay/quality standards.

## Rules

- **Three principles:** Memorable (realism for connection), Human (feature people), Future Forward (progressive, optimistic outlook).
- Keep backgrounds minimal; subject in focus. Focal point should occupy **~50%** of the image in the foreground.
- Use **natural lighting**; avoid harsh shadows on the subject.
- **Framing:** rule of thirds for hero images with a single subject; center-weighted composition for group photos on solid backgrounds; do not apply rule of thirds in small containers.
- **People:** reflect diversity, happiness, quality of life. Team photos uniform in weight (each subject consistent space), same light/time/location.
- **Approved aspect ratios:** 1:1 (circle/square); 3:4, 3:2, 16:9, 21:9 (rectangles).
- Use **natural blur (aperture)** for depth — do not blur backgrounds artificially.
- **Colour/tone:** reduce palette, avoid unrealistic hue/saturation; **no colour overlays in post** except location-based temperature correction; no filters.
- **Text overlays:** prefer separating image and text; when overlaying, add **30% black overlay** on semi-complicated images, **60% black** on very bright/crowded images. Never put coloured text on a bright/crowded image without an overlay.
- **Quality:** correct dimensions, resize proportionally; never upscale in code. Serve responsive images via **`srcset`** and a **CDN**.
- **Format:** prefer **WebP** (~30% smaller than JPEG); keep original JPEG for compatibility.
- **CGI/AI:** use minimally, preferably only hero images; must not conflict with cultural values, ethics, or beliefs; avoid unrealistic/irrelevant AI imagery.
- **Illustrations:** simple, recognizable, geometric shapes, **solid colours (no gradients)**, strong contrast. Mix with photography at an **80–20 ratio**. Use icons instead when the object is **under 100px wide**. Good for hero, blog, cards, error pages, empty states.

## Common violations to flag

- Artificially blurred backgrounds instead of natural aperture blur.
- Colour overlays/filters applied in post (beyond temperature correction).
- Coloured text over a bright/busy image with no dark overlay (or below 30%/60% thresholds).
- Aspect ratios outside the approved set.
- Upscaled/low-resolution images or missing `srcset` responsive handling.
- Cluttered backgrounds; subject not in focus or focal point far from ~50%.
- Inconsistent team/people photography (mismatched lighting or subject scale).
- Gradient-filled illustrations, or illustrations used for objects under 100px (should be icons).
- AI/CGI imagery that is unrealistic or culturally inappropriate.

**Source:** https://designsystem.gov.ae/guidelines/imagery
