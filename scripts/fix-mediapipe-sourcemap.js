const fs = require("fs");
const path = require("path");

const bundlePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@mediapipe",
  "tasks-vision",
  "vision_bundle.mjs"
);

const brokenMarker = "sourceMappingURL=vision_bundle_mjs.js.map";
const fixedMarker = "sourceMappingURL=vision_bundle.mjs.map";

if (!fs.existsSync(bundlePath)) {
  console.warn(
    "[postinstall] @mediapipe/tasks-vision not found; skipping sourcemap patch."
  );
  process.exit(0);
}

const content = fs.readFileSync(bundlePath, "utf8");

if (!content.includes(brokenMarker)) {
  console.log(
    "[postinstall] MediaPipe sourcemap reference is already correct or unchanged."
  );
  process.exit(0);
}

const patched = content.replace(brokenMarker, fixedMarker);
fs.writeFileSync(bundlePath, patched, "utf8");
console.log("[postinstall] Patched @mediapipe/tasks-vision sourcemap reference.");
