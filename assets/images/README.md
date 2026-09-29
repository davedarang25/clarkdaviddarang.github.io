# Assets / Images

Drop your images into this folder using the exact filenames below. `js/data.js` and `js/main.js`
already point at these paths, so no code changes are needed if you keep the names.

## Required files

| Filename              | Used for                                              | Suggested size |
|------------------------|--------------------------------------------------------|-----------------|
| `profile.jpg`          | Operative identification portrait (Hero HUD avatar)     | 512×512 px, square |
| `project-preview.png`  | Default project telemetry thumbnail (Mission Log cards) | 800×450 px, 16:9 |

## Adding per-project images

If you want a unique preview image per project instead of the shared default, add more files here
(e.g. `sentinel-preview.png`, `convoy-preview.png`) and update the corresponding `imagePath` field
for that project inside `js/data.js`.

## Fallback behavior

If an image file is missing, the site does not break:
- The profile avatar shows a placeholder crest icon instead of a broken image.
- Project cards show a "NO TELEMETRY IMAGE" placeholder panel instead of a broken image icon.

## Notes

- Keep file sizes reasonable (under ~300KB each) so the page stays fast.
- JPG/PNG/WebP are all supported — just make sure the extension in `data.js` matches the real file.
