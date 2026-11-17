// 3D level viewer for the Queen's Domain collectibles finder.
// Loaded on demand (dynamic import) the first time the user switches an area map to 3D.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

THREE.ColorManagement.enabled = false;   // vertex colours are baked in sRGB; pass them straight through

const COLOR = { egg: '#ff3b3b', skull: '#ffa31a', module: '#39d0ff', jigeki: '#ffe066', chest: '#c58b3a',
  secret: '#b46cff', meal: '#7ddc6f', teleporter: '#3ff0ff', save: '#ffffff' };
const SHAPE = { egg: 'circle', meal: 'circle', jigeki: 'circle', skull: 'diamond', module: 'square', secret: 'square',
  chest: 'chest', teleporter: 'triangle', save: 'save' };
// Pixel size of a pin on screen, by state.
const SIZE = { miss: 26, have: 15, unknown: 17, on: 24, off: 22 };

// UE: x forward, y right, z up, centimetres  ->  three: x, y up, z; metres.
const toThree = p => new THREE.Vector3(p.x / 100, p.z / 100, p.y / 100);

const textureCache = new Map();
function pinTexture(kind, state, unique) {
  const key = `${kind}|${state}|${unique ? 1 : 0}`;
  if (textureCache.has(key)) return textureCache.get(key);
  const S = 96, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d'), col = state === 'off' ? '#6b7280' : COLOR[kind];
  const filled = state !== 'have';
  const r = S * 0.30, cx = S * 0.46, cy = S * 0.54;
  g.lineJoin = 'round';
  const path = () => {
    g.beginPath();
    switch (SHAPE[kind]) {
      case 'circle': g.arc(cx, cy, r, 0, Math.PI * 2); break;
      case 'diamond': g.moveTo(cx, cy - r * 1.2); g.lineTo(cx + r * 1.2, cy); g.lineTo(cx, cy + r * 1.2); g.lineTo(cx - r * 1.2, cy); g.closePath(); break;
      case 'square': case 'save': g.rect(cx - r, cy - r, r * 2, r * 2); break;
      case 'chest': g.roundRect(cx - r * 1.25, cy - r * 0.85, r * 2.5, r * 1.7, r * 0.3); break;
      case 'triangle': g.moveTo(cx, cy - r * 1.25); g.lineTo(cx + r * 1.2, cy + r * 0.9); g.lineTo(cx - r * 1.2, cy + r * 0.9); g.closePath(); break;
    }
  };
  path();
  if (filled) {
    g.fillStyle = col; g.fill();
    g.lineWidth = S * 0.075; g.strokeStyle = state === 'miss' ? '#ffffff' : '#0b0d10'; g.stroke();
    if (SHAPE[kind] === 'save') { g.fillStyle = state === 'off' ? '#374151' : '#ff6bd6'; g.fillRect(cx - r * 0.45, cy - r * 0.45, r * 0.9, r * 0.9); }
    if (kind === 'jigeki') { g.beginPath(); g.arc(cx, cy, r * 0.45, 0, Math.PI * 2); g.fillStyle = '#8a6d00'; g.fill(); }
  } else {
    g.lineWidth = S * 0.11; g.strokeStyle = '#0b0d10'; g.stroke();
    g.lineWidth = S * 0.06; g.strokeStyle = col; g.stroke();
  }
  if (unique) {
    g.font = `bold ${S * 0.42}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = S * 0.06; g.strokeStyle = '#000'; g.strokeText('★', S * 0.8, S * 0.2);
    g.fillStyle = '#ffd84d'; g.fillText('★', S * 0.8, S * 0.2);
  }
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4;
  textureCache.set(key, t);
  return t;
}

export function createViewer(container, { onHover, onLeave, onClick } = {}) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none';
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.localClippingEnabled = true;
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b0d10');
  const camera = new THREE.PerspectiveCamera(45, 1, 0.5, 20000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.screenSpacePanning = true;
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e6);   // keeps geometry below clip.constant
  const pinGroup = new THREE.Group(); scene.add(pinGroup);

  let model = null, parts = {}, bounds = null, height = 0, pinsThrough = true, loadToken = 0;
  const cache = new Map();

  function size() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    height = h; scalePins();
  }
  function scalePins() {
    // With sizeAttenuation off, a sprite scale of 1 spans the camera's vertical field of view.
    const k = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / Math.max(height, 1);
    for (const s of pinGroup.children) { const px = SIZE[s.userData.state] || 18; s.scale.set(px * k, px * k, 1); }
  }
  const ro = new ResizeObserver(size); ro.observe(container);

  function applyClip() {
    for (const s of pinGroup.children) s.visible = s.userData.y <= clip.constant + 0.01;
  }
  function setPartVisible(name, v) { if (parts[name]) parts[name].visible = v; }

  async function loadModel(url) {
    if (cache.has(url)) return cache.get(url);
    const p = new Promise((res, rej) => loader.load(url, g => res(g.scene), undefined, rej));
    cache.set(url, p);
    try { return await p; } catch (e) { cache.delete(url); throw e; }
  }

  async function show(url, pins, opts = {}) {
    const token = ++loadToken;
    const root = await loadModel(url);
    if (token !== loadToken) return;          // a newer level was requested meanwhile
    if (model) scene.remove(model);
    model = root; parts = {};
    model.traverse(o => {
      if (o.name === 'floors' || o.name === 'walls' || o.name === 'water') parts[o.name] = o;
      if (o.isMesh && !o.userData.prepared) {
        o.material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, clippingPlanes: [clip],
          transparent: o.parent && o.parent.name === 'water', opacity: 0.85 });
        o.userData.prepared = true;
      }
    });
    scene.add(model);
    bounds = new THREE.Box3().setFromObject(model);
    clip.constant = bounds.max.y + 1;
    setPins(pins);
    if (opts.walls !== undefined) setPartVisible('walls', opts.walls);
    if (opts.water !== undefined) setPartVisible('water', opts.water);
    reset();
    return { minY: bounds.min.y, maxY: bounds.max.y };
  }

  function setPins(pins) {
    for (const s of [...pinGroup.children]) { pinGroup.remove(s); s.material.dispose(); }
    for (const p of pins) {
      const mat = new THREE.SpriteMaterial({ map: pinTexture(p.kind, p.state, p.unique), sizeAttenuation: false,
        depthTest: !pinsThrough, depthWrite: false, transparent: true });
      const s = new THREE.Sprite(mat);
      const pos = toThree(p); pos.y += 0.6;
      s.position.copy(pos); s.renderOrder = p.state === 'miss' ? 30 : (p.state === 'have' ? 10 : 20);
      s.userData = { item: p.item, state: p.state, y: pos.y };
      pinGroup.add(s);
    }
    scalePins(); applyClip();
  }

  function reset() {
    if (!bounds) return;
    const c = bounds.getCenter(new THREE.Vector3()), sz = bounds.getSize(new THREE.Vector3());
    const span = Math.max(sz.x, sz.z);
    controls.target.copy(c);
    camera.position.set(c.x + span * 0.45, c.y + span * 0.75, c.z + span * 0.6);
    camera.near = Math.max(span / 2000, 0.2); camera.far = span * 10; camera.updateProjectionMatrix();
    controls.update();
  }
  function focus(p, distance = 45) {
    const t = toThree(p), dir = camera.position.clone().sub(controls.target).normalize();
    controls.target.copy(t); camera.position.copy(t).addScaledVector(dir, distance); controls.update();
  }
  function zoom(f) {
    const off = camera.position.clone().sub(controls.target).multiplyScalar(1 / f);
    camera.position.copy(controls.target).add(off); controls.update();
  }

  // Hover / click on pins
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let hovered = null, downAt = null;
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pinGroup.children.filter(s => s.visible));
    if (!hits.length) return null;
    hits.sort((a, b) => b.object.renderOrder - a.object.renderOrder || a.distance - b.distance);
    return hits[0].object;
  }
  canvas.addEventListener('pointermove', e => {
    const s = pick(e);
    if (s) { hovered = s; canvas.style.cursor = 'pointer'; onHover && onHover(s.userData.item, e); }
    else if (hovered) { hovered = null; canvas.style.cursor = ''; onLeave && onLeave(); }
  });
  canvas.addEventListener('pointerleave', () => { hovered = null; onLeave && onLeave(); });
  canvas.addEventListener('pointerdown', e => { downAt = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointerup', e => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 4) return;
    const s = pick(e); if (s && onClick) onClick(s.userData.item);
  });

  let running = true;
  renderer.setAnimationLoop(() => { if (!running) return; controls.update(); renderer.render(scene, camera); });
  size();

  return {
    show, setPins, reset, focus, zoom,
    setWalls: v => setPartVisible('walls', v),
    setWater: v => setPartVisible('water', v),
    setPinsThrough(v) { pinsThrough = v; for (const s of pinGroup.children) { s.material.depthTest = !v; s.material.needsUpdate = true; } },
    setClipHeight(y) { clip.constant = y; applyClip(); },
    pause() { running = false; }, resume() { running = true; size(); },
    get bounds() { return bounds; }
  };
}
