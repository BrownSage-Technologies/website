import * as THREE from "three";

window.addEventListener("error", (event) => {
  const el = document.querySelector("#err");
  if (el) el.textContent = event.message;
});

const PERIOD = 5;
const params = new URLSearchParams(location.search);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hold = params.has("t") || reduce;
const holdTime = Number(params.get("t") || 0);

const canvas = document.querySelector("#view");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.setClearColor(0xe6ebf1, 1);

const scene = new THREE.Scene();
scene.background = makeBackdrop();
scene.environment = makeEnvironment();
scene.environmentIntensity = 1.15;

const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
const cubeX = 1.15;
const azimuth = 0.78;
const distance = 5.35;
camera.position.set(cubeX + Math.sin(azimuth) * distance * 0.55, 1.42, Math.cos(azimuth) * distance);
camera.lookAt(cubeX - 1.15, 0.02, 0);

scene.add(new THREE.HemisphereLight(0xfffefe, 0xd5dee8, 1.35));
const key = new THREE.DirectionalLight(0xffffff, 3.2);
key.position.set(-5, 8, 6);
scene.add(key);
const fill = new THREE.DirectionalLight(0xe5f0ff, 1.15);
fill.position.set(6, 2.2, 4);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xfff1df, 1.45);
rim.position.set(-1, 4.5, -6);
scene.add(rim);

const spin = new THREE.Group();
spin.position.set(cubeX, 0, 0);
scene.add(spin);

buildGlass(spin);
buildInterior(spin);
spin.add(makeCaustic());
scene.add(makeMotes(cubeX));

const clockStart = performance.now();

function phaseSeconds(now) {
  if (hold) return ((holdTime % PERIOD) + PERIOD) % PERIOD;
  return ((now - clockStart) / 1000) % PERIOD;
}

function applyPhase(seconds) {
  spin.rotation.y = (seconds / PERIOD) * Math.PI * 2;
}

function frame(now) {
  applyPhase(phaseSeconds(now));
  renderer.render(scene, camera);
  if (!hold) requestAnimationFrame(frame);
}

resize();
window.addEventListener("resize", resize);
applyPhase(phaseSeconds(performance.now()));
renderer.render(scene, camera);
if (!hold) requestAnimationFrame(frame);

window.addEventListener("error", (event) => {
  document.querySelector("#err").textContent = event.message;
});

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function buildGlass(parent) {
  const geo = new THREE.BoxGeometry(2, 2, 2);
  const mesh = new THREE.Mesh(geo, glassMaterial());
  mesh.renderOrder = 3;
  parent.add(mesh);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.004, 2.004, 2.004)),
    new THREE.LineBasicMaterial({ color: 0x7fa4bb, transparent: true, opacity: 0.9 })
  );
  edges.renderOrder = 4;
  parent.add(edges);
}

function buildInterior(parent) {
  const innards = new THREE.Group();
  parent.add(innards);

  const topTex = makeBoardTexture("top");
  const frontTex = makeBoardTexture("front");
  const sideTex = makeBoardTexture("side");
  const backTex = makeBoardTexture("back");
  const midTex = makeBoardTexture("mid");

  board(innards, topTex, 1.18, 0.026, 1.18, 0, 0.64, 0);
  board(innards, midTex, 1.15, 0.022, 0.95, 0, 0.1, 0);
  board(innards, midTex, 1.25, 0.022, 1.05, 0, -0.42, 0);
  board(innards, frontTex, 1.16, 1.12, 0.026, 0, -0.06, 0.62);
  board(innards, sideTex, 0.026, 1.3, 1.15, 0.78, -0.02, 0);
  board(innards, backTex, 1.3, 1.22, 0.026, 0, -0.02, -0.78);
  board(innards, sideTex, 0.026, 1.22, 1.08, -0.78, -0.04, 0);

  const metal = new THREE.MeshStandardMaterial({
    color: 0xc5ced6,
    metalness: 0.92,
    roughness: 0.24,
  });
  const die = new THREE.MeshStandardMaterial({
    color: 0x1a2433,
    metalness: 0.4,
    roughness: 0.45,
    emissive: 0x123044,
    emissiveIntensity: 0.4,
  });
  addBox(innards, metal, 0.34, 0.04, 0.34, 0, 0.67, 0);
  addBox(innards, die, 0.14, 0.016, 0.14, 0, 0.698, 0);

  const ring = new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.78),
    new THREE.MeshBasicMaterial({
      map: makeRingTexture(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.7;
  ring.renderOrder = 1;
  innards.add(ring);

  const magenta = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: makeStripeTexture(),
    emissive: 0xff3b86,
    emissiveMap: makeStripeTexture(),
    emissiveIntensity: 0.45,
    roughness: 0.4,
    metalness: 0.05,
  });
  addBox(innards, magenta, 0.11, 0.72, 0.04, 0.42, 0.02, 0.76);

  const gold = new THREE.MeshStandardMaterial({
    color: 0xe7c27a,
    metalness: 0.84,
    roughness: 0.3,
    emissive: 0x8a5a1e,
    emissiveIntensity: 0.16,
  });
  const cyan = new THREE.MeshStandardMaterial({
    color: 0xe7fbff,
    emissive: 0x35d0ff,
    emissiveIntensity: 1.15,
    roughness: 0.28,
    metalness: 0.04,
  });

  addBox(innards, cyan, 0.46, 0.014, 0.014, 0, 0.66, 0.28);
  addBox(innards, cyan, 0.014, 0.014, 0.46, 0.28, 0.66, 0);
  addBox(innards, cyan, 0.46, 0.014, 0.014, 0, 0.66, -0.28);
  addBox(innards, cyan, 0.014, 0.014, 0.46, -0.28, 0.66, 0);

  addBox(innards, gold, 0.9, 0.014, 0.014, 0, 0.16, 0.76);
  addBox(innards, gold, 0.014, 0.7, 0.014, -0.46, -0.05, 0.76);
  addBox(innards, gold, 0.014, 0.7, 0.014, 0.18, -0.05, 0.76);
  addBox(innards, gold, 0.58, 0.014, 0.014, -0.08, -0.4, 0.76);

  const pin = new THREE.CylinderGeometry(0.012, 0.012, 0.52, 10);
  [
    [-0.42, 0.3, -0.28],
    [0.46, 0.3, -0.22],
    [-0.36, 0.3, 0.26],
    [0.32, 0.3, 0.3],
    [0.02, 0.3, -0.4],
    [-0.08, 0.3, 0.4],
  ].forEach(([x, y, z]) => {
    const mesh = new THREE.Mesh(pin, gold);
    mesh.position.set(x, y, z);
    innards.add(mesh);
  });

  const port = new THREE.MeshStandardMaterial({
    color: 0x15191e,
    metalness: 0.72,
    roughness: 0.34,
  });
  const tongue = new THREE.MeshStandardMaterial({
    color: 0x8ea0b4,
    metalness: 0.5,
    roughness: 0.4,
  });
  addBox(innards, port, 0.22, 0.065, 0.035, -0.32, -0.52, 0.78);
  addBox(innards, tongue, 0.12, 0.02, 0.012, -0.32, -0.52, 0.8);
  addBox(innards, port, 0.18, 0.085, 0.035, 0.02, -0.51, 0.78);
  addBox(innards, tongue, 0.09, 0.038, 0.012, 0.02, -0.51, 0.8);

  const cyanLight = new THREE.PointLight(0x49d8ff, 2.4, 2.8, 2);
  cyanLight.position.set(0, 0.78, 0);
  parent.add(cyanLight);
  const magLight = new THREE.PointLight(0xff4d9a, 1.8, 2.2, 2);
  magLight.position.set(0.42, 0.05, 0.5);
  parent.add(magLight);
  const goldLight = new THREE.PointLight(0xffc56a, 1.4, 2.4, 2);
  goldLight.position.set(-0.2, -0.1, 0.35);
  parent.add(goldLight);
}

function glassMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    toneMapped: true,
    vertexShader: `
      out vec3 vNormal;
      out vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      precision highp float;
      in vec3 vNormal;
      in vec3 vWorld;
      out vec4 fragColor;
      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(cameraPosition - vWorld);
        float ndv = clamp(abs(dot(N, V)), 0.0, 1.0);
        float fres = pow(1.0 - ndv, 2.2);
        float rim = pow(1.0 - ndv, 6.0);
        float edge = smoothstep(0.0, 0.35, length(fwidth(N)) * 12.0);
        vec3 R = reflect(-V, N);
        float up = clamp(R.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 col = mix(vec3(0.78, 0.86, 0.94), vec3(0.96, 0.98, 1.0), up);
        col += vec3(0.25, 0.65, 1.0) * fres;
        col += vec3(1.0, 0.35, 0.65) * pow(fres, 4.0) * 0.4;
        col += vec3(0.9, 0.97, 1.0) * max(rim, edge);
        float alpha = max(0.1 + fres * 0.42, max(rim, edge) * 0.95);
        fragColor = vec4(col, alpha);
      }
    `,
  });
}

function board(parent, texture, w, h, d, x, y, z) {
  addBox(parent, pcbMaterial(texture), w, h, d, x, y, z);
}

function addBox(parent, material, w, h, d, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

function pcbMaterial(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return new THREE.MeshStandardMaterial({
    map: texture,
    emissiveMap: texture,
    emissive: 0xffffff,
    emissiveIntensity: 0.42,
    roughness: 0.6,
    metalness: 0.18,
  });
}

function makeCaustic() {
  const tex = paintCaustic();
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.015;
  mesh.renderOrder = 1;
  return mesh;
}

function makeMotes(originX) {
  const count = 42;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.45) * 2.4;
    const rad = 1.2 + Math.random() * 0.95;
    positions[i * 3] = Math.cos(theta) * rad;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * rad * 0.85;
    const warm = Math.random() > 0.82;
    colors[i * 3] = warm ? 1 : 0.75;
    colors[i * 3 + 1] = warm ? 0.86 : 0.92;
    colors[i * 3 + 2] = warm ? 0.7 : 1;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const map = new THREE.CanvasTexture(c);
  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      map,
      size: 0.045,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.9,
      sizeAttenuation: true,
    })
  );
  points.position.x = originX;
  points.renderOrder = 3;
  return points;
}

function makeEnvironment() {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0xf4f7fb);
  const geo = new THREE.PlaneGeometry(1, 1);
  const add = (color, x, y, z, rx, ry, sx, sy) => {
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, 0);
    mesh.scale.set(sx, sy, 1);
    env.add(mesh);
  };
  const half = Math.PI / 2;
  add(0xffffff, 0, 0, -8, 0, 0, 18, 10);
  add(0xf7f8fb, 0, -4, 0, -half, 0, 20, 20);
  add(0xffffff, 0, 6, 0, half, 0, 16, 14);
  add(0xe7eef8, -7, 1, 0, 0, half, 14, 8);
  add(0xf5fbff, 7, 2, 0, 0, -half, 12, 7);
  add(0xc6ecff, -2, 1.4, 4, 0, Math.PI, 2.4, 2.6);
  add(0xffe3ad, 2.4, 0.2, 3.4, 0, Math.PI, 2.6, 1.3);
  add(0xffc6e0, 0.8, -0.6, 4.2, 0, Math.PI, 0.9, 2.1);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.03).texture;
  pmrem.dispose();
  return tex;
}

function makeBackdrop() {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(690, 430, 30, 520, 480, 780);
  grd.addColorStop(0, "#fcfdfe");
  grd.addColorStop(0.42, "#f3f6f9");
  grd.addColorStop(1, "#e6ebf1");
  g.fillStyle = grd;
  g.fillRect(0, 0, 1024, 1024);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function paintCaustic() {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;

  const glow = g.createRadialGradient(cx, cy, 20, cx, cy, 260);
  glow.addColorStop(0, "rgba(255,255,255,0.55)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);

  const shadow = g.createRadialGradient(cx, cy + 10, 30, cx, cy + 16, 210);
  shadow.addColorStop(0, "rgba(120, 132, 148, 0.22)");
  shadow.addColorStop(0.6, "rgba(140, 150, 165, 0.05)");
  shadow.addColorStop(1, "rgba(140, 150, 165, 0)");
  g.fillStyle = shadow;
  g.fillRect(0, 0, size, size);

  const hues = [198, 212, 168, 42, 330, 292, 18, 205, 48, 318];
  for (let i = 0; i < 36; i += 1) {
    const ang = (i / 36) * Math.PI * 2 + (i % 4) * 0.03;
    const len = 160 + ((i * 67) % 300);
    const spread = 0.008 + (i % 5) * 0.0035;
    g.save();
    g.translate(cx, cy);
    g.rotate(ang);
    const grad = g.createLinearGradient(40, 0, len, 0);
    const hue = hues[i % hues.length];
    grad.addColorStop(0, `hsla(${hue}, 95%, 62%, 0)`);
    grad.addColorStop(0.18, `hsla(${hue}, 100%, 62%, 0.62)`);
    grad.addColorStop(0.72, `hsla(${hue + 24}, 90%, 68%, 0.12)`);
    grad.addColorStop(1, `hsla(${hue}, 90%, 72%, 0)`);
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(48, 0);
    g.lineTo(len, len * spread);
    g.lineTo(len, -len * spread);
    g.closePath();
    g.fill();
    g.restore();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}

function makeRingTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  g.translate(size / 2, size / 2);
  const stroke = (extent, width, color) => {
    g.strokeStyle = color;
    g.lineWidth = width;
    roundRect(g, -extent / 2, -extent / 2, extent, extent, 26);
    g.stroke();
  };
  stroke(300, 42, "rgba(70, 214, 255, 0.16)");
  stroke(300, 18, "rgba(150, 240, 255, 0.55)");
  stroke(300, 6, "rgba(240, 255, 255, 0.95)");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeStripeTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 512;
  const g = c.getContext("2d");
  const grd = g.createLinearGradient(0, 0, 128, 0);
  grd.addColorStop(0, "#d42574");
  grd.addColorStop(0.5, "#ff4e9c");
  grd.addColorStop(1, "#ff7ab4");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 512);
  g.fillStyle = "rgba(255,255,255,0.88)";
  for (let y = 28; y < 486; y += 16) {
    g.fillRect(18, y, 54 + ((y * 13) % 42), 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBoardTexture(kind) {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  g.fillStyle = "#070c16";
  g.fillRect(0, 0, size, size);
  g.strokeStyle = "rgba(90, 150, 190, 0.09)";
  g.lineWidth = 1;
  for (let i = 40; i < size; i += 32) {
    g.beginPath();
    g.moveTo(i, 24);
    g.lineTo(i, size - 24);
    g.stroke();
    g.beginPath();
    g.moveTo(24, i);
    g.lineTo(size - 24, i);
    g.stroke();
  }

  const line = (color, width, pts) => {
    g.strokeStyle = color;
    g.lineWidth = width;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
  };

  if (kind === "top") {
    for (let i = 0; i < 24; i += 1) {
      const a = (i / 24) * Math.PI * 2;
      line("#d7a85a", 3, [
        [512 + Math.cos(a) * 230, 512 + Math.sin(a) * 230],
        [512 + Math.cos(a) * 460, 512 + Math.sin(a) * 460],
      ]);
    }
    g.strokeStyle = "rgba(90, 220, 255, 0.85)";
    g.lineWidth = 8;
    roundRect(g, 300, 300, 424, 424, 28);
    g.stroke();
    chip(g, 110, 120, 100, 64);
    chip(g, 800, 130, 78, 78);
    chip(g, 140, 820, 120, 52);
    chip(g, 760, 800, 90, 70);
  } else if (kind === "front") {
    g.strokeStyle = "#e0b15c";
    g.lineWidth = 6;
    roundRect(g, 90, 90, 844, 844, 18);
    g.stroke();
    for (let y = 160; y < 900; y += 48) {
      line("#f0d090", 3, [
        [120, y],
        [220, y],
        [260, y + 18],
        [760, y + 18],
      ]);
    }
    line("#7ae7ff", 4, [
      [160, 200],
      [160, 820],
      [700, 820],
    ]);
    chip(g, 360, 390, 180, 140);
    chip(g, 180, 240, 90, 60);
    chip(g, 560, 230, 110, 48);
  } else if (kind === "side") {
    for (let x = 140; x < 900; x += 36) {
      line(x % 72 === 0 ? "#7adfff" : "#e6c17a", 3, [
        [x, 80],
        [x + 20, 512],
        [x, 940],
      ]);
    }
    chip(g, 400, 180, 160, 100);
    chip(g, 430, 620, 140, 90);
  } else if (kind === "back") {
    for (let y = 100; y < 940; y += 28) {
      line("#c99645", 2.5, [
        [80, y],
        [940, y + (y % 56 === 0 ? 10 : 0)],
      ]);
    }
    g.strokeStyle = "#6fd7ff";
    g.lineWidth = 5;
    g.strokeRect(160, 160, 700, 700);
    chip(g, 420, 450, 160, 120);
  } else {
    line("#e6c17a", 4, [
      [80, 200],
      [940, 200],
      [940, 824],
      [80, 824],
      [80, 200],
    ]);
    for (let i = 0; i < 8; i += 1) {
      line("#67d6ff", 3, [
        [140, 260 + i * 70],
        [880, 300 + i * 62],
      ]);
    }
    chip(g, 250, 420, 140, 90);
    chip(g, 620, 480, 120, 80);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function chip(g, x, y, w, h) {
  g.save();
  g.fillStyle = "#182232";
  roundRect(g, x, y, w, h, 8);
  g.fill();
  g.strokeStyle = "rgba(190, 230, 255, 0.45)";
  g.lineWidth = 2;
  g.stroke();
  g.strokeStyle = "#e7c78a";
  g.lineWidth = 2;
  const pins = Math.max(4, Math.floor(w / 18));
  for (let i = 0; i < pins; i += 1) {
    const px = x + ((i + 0.5) / pins) * w;
    g.beginPath();
    g.moveTo(px, y);
    g.lineTo(px, y - 12);
    g.moveTo(px, y + h);
    g.lineTo(px, y + h + 12);
    g.stroke();
  }
  g.restore();
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
