# Personalized avatar

Asset: `zaw-avatar.png` (1205 × 1306, transparent PNG).
Generated using the built-in image generation tool. The original website illustration remains in `hero.png` as a reference.

Final edit prompt:

> Keep the personalized avatar’s identity, swept black hairstyle, silver nose stud, black hoop earring, subtle smile, black shirt collar, centered complete-head composition, and transparent background. Enlarge the eyes by approximately 12%, with centered brown irises. Match the original website avatar’s muted light beige/peach skin, rosy cheeks, and cooler sculpted shadows. Add subtle sparse freckles across the nose and upper cheeks. Preserve blue hair rim lighting. No text, watermark, or scenery.

`InteractiveAvatar.tsx` animates the head using perspective transforms. Each iris reuses the generated texture inside an independent SVG eye mask, responding to pointer position and scroll. Touch devices use scroll motion. Reduced-motion preference restores the static render; animations pause offscreen and in hidden tabs.

## Silver earrings and facial animation

Previous asset: `zaw-avatar-silver.png` (1205 × 1306, transparent PNG).
Generated with the built-in image-generation tool from `zaw-avatar.png`.

Edit prompt: Change only the earrings to matching larger polished silver hoops on both ears, approximately twice the previous hoop size. Preserve the face, eye positions, skin tone, freckles, hairstyle, black collar, lighting, dimensions and transparency.

The animated render adds natural 240 ms blinks every few seconds and smooth relaxed, smiling and curious expressions. Expressions deform the original mouth and eyebrow texture through localized SVG displacement fields. Moving the cursor over the avatar or tapping it prompts a smile. Head and gaze tracking remain active. Reduced-motion mode shows the unanimated source PNG. Ambient timers and animation frames pause offscreen and in hidden tabs.

Blink frame: `zaw-avatar-blink.png` (1205 × 1306, transparent PNG), generated with the built-in image-generation tool. Prompt: Change only both eyes to naturally fully closed, with shaded peach eyelid skin and subtle curved lash lines. Preserve the exact head placement, eyebrows, expression, freckles, silver earrings, lighting, shirt and transparency. Feathered masks blend the rendered eyelids into the animated face during each blink.

## Floating head refinement

Current asset: `zaw-avatar-head.png` (1205 × 1306, transparent PNG), generated with the built-in image-generation tool.

Edit prompt: Remove all neck and shirt/collar, leaving only the complete floating head with a rounded chin and transparency underneath. Reduce both shiny silver hoops by approximately 20%. Preserve the exact facial coordinates, features, hairstyle, freckles, skin color, lighting and canvas dimensions. The original website avatar is a floating-head framing reference only.

The eye rig and facial expressions reuse their original coordinates. The blink frame is displayed only inside feathered eye masks, so its source image’s neck and earrings are never rendered.
