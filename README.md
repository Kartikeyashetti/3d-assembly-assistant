3D Assembly Assistant
A web-based 3D assembly assistant built with React, React Three Fiber, and TypeScript. It walks through cabinet assembly step-by-step with animated part placement, exploded view, and a bill of materials.

Features
Step-by-step animated assembly
Exploded/assembled toggle
Animated part entry from off-screen
Active part highlight and instruction text
Previous / Next / Repeat controls
Bill of Materials overlay
Camera focus on current step


Project Structure
scene — 3D scene, parts, cabinet, door
controls — bottom navigation controls
bom — BOM overlay
cabinetAssembly.ts — cabinet parts and step data
useAssemblyState.ts — timeline and view state
index.css — global styles
assembly.ts — shared TypeScript types
animation.ts — easing utilities


Setup
git clone https://github.com/Kartikeyashetti/3d-assembly-assistant.git
cd assembly-assistant
npm install

run locally
npm run dev