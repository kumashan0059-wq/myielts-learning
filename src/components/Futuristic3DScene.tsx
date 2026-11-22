import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Futuristic3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- RENDERER SETUP ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- SCENE & CAMERA ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050507);
    scene.fog = new THREE.FogExp2(0x050507, 0.011);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3, 34);

    // --- LIGHTING ---
    // Central core glowing red light
    const coreLight = new THREE.PointLight(0xff1a2a, 6.5, 70);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Dynamic orbital red fill light
    const orbitalRedLight = new THREE.PointLight(0xe11d2a, 4, 80);
    orbitalRedLight.position.set(12, 8, 14);
    scene.add(orbitalRedLight);

    // Crisp white key/rim light for glossy edges
    const rimWhiteLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimWhiteLight.position.set(-18, 22, 20);
    scene.add(rimWhiteLight);

    // Subtle blue-tinted fill from behind for cinematic contrast
    const backRimLight = new THREE.DirectionalLight(0x221122, 1.8);
    backRimLight.position.set(0, -15, -20);
    scene.add(backRimLight);

    const ambientLight = new THREE.AmbientLight(0x1a0608, 1.2);
    scene.add(ambientLight);

    // Master Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ==========================================
    // 1. DIGITAL WORLD MAP TEXTURE GENERATION
    // ==========================================
    const createWorldMapTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Deep dark futuristic base
      ctx.fillStyle = '#07070b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fine coordinate grid lines
      ctx.strokeStyle = 'rgba(225, 29, 42, 0.08)';
      ctx.lineWidth = 1;
      const stepX = canvas.width / 36;
      const stepY = canvas.height / 18;
      for (let x = 0; x <= canvas.width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Procedural stylized world continents (dots & glowing cyber-outlines)
      const landClusters = [
        // North America (Canada & US)
        { cx: 480, cy: 300, rx: 220, ry: 130 },
        { cx: 440, cy: 220, rx: 180, ry: 90 }, // Canada
        { cx: 340, cy: 190, rx: 90, ry: 60 },  // Alaska
        { cx: 560, cy: 400, rx: 70, ry: 60 },  // Mexico / Caribbean
        // South America
        { cx: 660, cy: 640, rx: 110, ry: 180 },
        // Europe (UK, EU)
        { cx: 1040, cy: 270, rx: 130, ry: 80 },
        { cx: 990, cy: 260, rx: 40, ry: 50 },  // UK & Ireland
        { cx: 1080, cy: 210, rx: 70, ry: 60 }, // Scandinavia
        // Africa
        { cx: 1080, cy: 520, rx: 140, ry: 170 },
        // Asia
        { cx: 1380, cy: 320, rx: 280, ry: 150 }, // Russia / Central Asia
        { cx: 1340, cy: 460, rx: 100, ry: 100 }, // South Asia / Bangladesh / India
        { cx: 1520, cy: 420, rx: 130, ry: 120 }, // East Asia
        { cx: 1560, cy: 560, rx: 110, ry: 90 },  // SE Asia
        { cx: 1620, cy: 290, rx: 50, ry: 80 },   // Japan
        // Australia & New Zealand
        { cx: 1680, cy: 720, rx: 120, ry: 100 },
        { cx: 1820, cy: 770, rx: 30, ry: 50 },
      ];

      // Draw high-density cyber digital dots over continents
      for (const cluster of landClusters) {
        const dotSpacing = 11;
        const startX = cluster.cx - cluster.rx;
        const endX = cluster.cx + cluster.rx;
        const startY = cluster.cy - cluster.ry;
        const endY = cluster.cy + cluster.ry;

        for (let px = startX; px <= endX; px += dotSpacing) {
          for (let py = startY; py <= endY; py += dotSpacing) {
            const dx = (px - cluster.cx) / cluster.rx;
            const dy = (py - cluster.cy) / cluster.ry;
            const distSq = dx * dx + dy * dy;

            if (distSq <= 0.92 + (Math.sin(px * 0.1) * Math.cos(py * 0.1) * 0.15)) {
              // High-tech red/white digital matrix dot
              const isHighlight = Math.random() > 0.88;
              const isRedAccent = Math.random() > 0.65;

              ctx.fillStyle = isHighlight
                ? '#ffffff'
                : isRedAccent
                ? '#ff2a3a'
                : '#e11d2a';
              ctx.shadowColor = isHighlight ? '#ffffff' : '#ff1e2d';
              ctx.shadowBlur = isHighlight ? 8 : 4;

              ctx.beginPath();
              ctx.arc(px, py, isHighlight ? 2.4 : 1.7, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Reset shadow for clean highlights
      ctx.shadowBlur = 0;

      // Key Global Educational Hub Targets
      const educationHubs = [
        { name: 'Dhaka (Hub)', x: 1365, y: 460 },
        { name: 'London (UK)', x: 990, y: 260 },
        { name: 'Toronto (CAN)', x: 520, y: 280 },
        { name: 'New York (USA)', x: 540, y: 320 },
        { name: 'Melbourne (AUS)', x: 1710, y: 760 },
        { name: 'Berlin (EU)', x: 1060, y: 265 }
      ];

      educationHubs.forEach(hub => {
        // Glowing target beacon
        ctx.strokeStyle = '#ff2a3a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 10, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    const worldTexture = createWorldMapTexture();

    // ==========================================
    // 2. 3D GLOWING GLOBE LAYERS
    // ==========================================
    const globeRadius = 7.5;

    // Layer A: Inner Dark Reflective Core Sphere
    const coreSphereGeo = new THREE.SphereGeometry(globeRadius * 0.985, 64, 64);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.15,
      metalness: 0.95,
      emissive: 0x160205,
      emissiveIntensity: 0.8
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    globeGroup.add(coreSphere);

    // Layer B: Digital World Map Layer
    const mapSphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const mapSphereMat = new THREE.MeshStandardMaterial({
      map: worldTexture,
      transparent: true,
      opacity: 0.95,
      roughness: 0.25,
      metalness: 0.5,
      emissive: 0xff1e2d,
      emissiveMap: worldTexture,
      emissiveIntensity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const mapSphere = new THREE.Mesh(mapSphereGeo, mapSphereMat);
    globeGroup.add(mapSphere);

    // Layer C: Glowing 3D Wireframe Cage
    const wireframeGeo = new THREE.IcosahedronGeometry(globeRadius * 1.025, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff2535,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const wireframeGlobe = new THREE.Mesh(wireframeGeo, wireframeMat);
    globeGroup.add(wireframeGlobe);

    // Layer D: Outer Atmospheric Neon Fresnel Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.14, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xff1828) },
        viewVector: { value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity * 0.7);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // ==========================================
    // 3. MULTIPLE BRIGHT RED ORBITAL RINGS
    // ==========================================
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    interface OrbitalRingConfig {
      radius: number;
      tube: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      speed: number;
      color: number;
      opacity: number;
      mesh?: THREE.Mesh;
      pulseDots: THREE.Mesh[];
    }

    const ringConfigs: OrbitalRingConfig[] = [
      { radius: 10.4, tube: 0.045, rotX: 1.15, rotY: 0.25, rotZ: 0.35, speed: 0.0035, color: 0xff2233, opacity: 0.9, pulseDots: [] },
      { radius: 11.6, tube: 0.035, rotX: 0.45, rotY: -0.65, rotZ: 0.85, speed: -0.0028, color: 0xff3b4a, opacity: 0.8, pulseDots: [] },
      { radius: 12.8, tube: 0.05, rotX: 1.55, rotY: 0.15, rotZ: -0.45, speed: 0.0042, color: 0xff1e2d, opacity: 0.95, pulseDots: [] },
      { radius: 13.9, tube: 0.03, rotX: -0.85, rotY: 0.95, rotZ: 0.2, speed: -0.0022, color: 0xffffff, opacity: 0.5, pulseDots: [] },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(cfg.rotX, cfg.rotY, cfg.rotZ);
      ringsGroup.add(ringMesh);
      cfg.mesh = ringMesh;

      // Add 2-3 glowing energy dots traveling along each orbital ring
      const dotGeo = new THREE.SphereGeometry(0.16, 16, 16);
      for (let d = 0; d < 3; d++) {
        const dotMat = new THREE.MeshBasicMaterial({
          color: d === 0 ? 0xffffff : 0xff3344,
          blending: THREE.AdditiveBlending
        });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        ringMesh.add(dot);
        cfg.pulseDots.push(dot);
      }
    });

    // ==========================================
    // 4. GLOWING LIGHT TRAILS ORBITING GLOBE
    // ==========================================
    // Create CatmullRom curved orbital trail with pulsating particle heads
    const trailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-11, 2, 4),
      new THREE.Vector3(-4, 9, 8),
      new THREE.Vector3(7, 6, 7),
      new THREE.Vector3(11, -2, -3),
      new THREE.Vector3(5, -8, -8),
      new THREE.Vector3(-6, -7, -4),
      new THREE.Vector3(-11, 2, 4)
    ], true);

    const trailPoints = trailCurve.getPoints(200);
    const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
    const trailMat = new THREE.LineBasicMaterial({
      color: 0xff1e2d,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });
    const trailLine = new THREE.Line(trailGeo, trailMat);
    scene.add(trailLine);

    // Glowing comet particle with trailing light along trailCurve
    const cometGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const cometMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending
    });
    const cometMesh = new THREE.Mesh(cometGeo, cometMat);
    scene.add(cometMesh);

    // Second counter-orbiting light trail (Pure Red)
    const trailCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(9, -5, 6),
      new THREE.Vector3(3, 8, 8),
      new THREE.Vector3(-8, 5, 5),
      new THREE.Vector3(-10, -4, -6),
      new THREE.Vector3(2, -8, -7),
      new THREE.Vector3(9, -5, 6)
    ], true);

    const trailPoints2 = trailCurve2.getPoints(200);
    const trailGeo2 = new THREE.BufferGeometry().setFromPoints(trailPoints2);
    const trailMat2 = new THREE.LineBasicMaterial({
      color: 0xff3b4a,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const trailLine2 = new THREE.Line(trailGeo2, trailMat2);
    scene.add(trailLine2);

    const comet2Geo = new THREE.SphereGeometry(0.2, 16, 16);
    const comet2Mat = new THREE.MeshBasicMaterial({
      color: 0xff2535,
      blending: THREE.AdditiveBlending
    });
    const comet2Mesh = new THREE.Mesh(comet2Geo, comet2Mat);
    scene.add(comet2Mesh);

    // ==========================================
    // 5. 3D AIRPLANE SMOOTHLY CRUISING FLIGHT PATH
    // ==========================================
    const airplaneCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(9.2, 3.2, 3.5),
      new THREE.Vector3(4.5, 8.8, -3.2),
      new THREE.Vector3(-6.5, 6.2, -7.0),
      new THREE.Vector3(-9.6, -1.8, -3.5),
      new THREE.Vector3(-5.2, -8.2, 4.2),
      new THREE.Vector3(3.8, -5.8, 8.2),
      new THREE.Vector3(9.2, 3.2, 3.5)
    ], true);

    // Airplane Flight Path Ribbon
    const flightPathPoints = airplaneCurve.getPoints(220);
    const flightPathGeo = new THREE.BufferGeometry().setFromPoints(flightPathPoints);
    const flightPathMat = new THREE.LineDashedMaterial({
      color: 0xff2a3a,
      dashSize: 0.6,
      gapSize: 0.35,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const flightPathLine = new THREE.Line(flightPathGeo, flightPathMat);
    flightPathLine.computeLineDistances();
    scene.add(flightPathLine);

    // Stylized Futuristic Airplane 3D Object
    const airplaneGroup = new THREE.Group();

    // Fuselage (Streamlined sleek geometry)
    const fuselageGeo = new THREE.ConeGeometry(0.22, 1.4, 8);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x220508
    });
    const fuselage = new THREE.Mesh(fuselageGeo, fuselageMat);
    airplaneGroup.add(fuselage);

    // Main Swept Wings
    const wingGeo = new THREE.BoxGeometry(2.1, 0.04, 0.55);
    wingGeo.translate(0, 0, -0.15);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.25,
      metalness: 0.85
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    airplaneGroup.add(wings);

    // Red Wingtip Beacons
    const wingtipGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const wingtipMat = new THREE.MeshBasicMaterial({ color: 0xff1e2d, blending: THREE.AdditiveBlending });
    const leftWingtip = new THREE.Mesh(wingtipGeo, wingtipMat);
    leftWingtip.position.set(-1.05, 0.05, -0.15);
    airplaneGroup.add(leftWingtip);
    const rightWingtip = new THREE.Mesh(wingtipGeo, wingtipMat);
    rightWingtip.position.set(1.05, 0.05, -0.15);
    airplaneGroup.add(rightWingtip);

    // Tail Fin (Vertical Stabilizer)
    const tailFinGeo = new THREE.BoxGeometry(0.04, 0.45, 0.4);
    tailFinGeo.translate(0, 0.22, -0.5);
    const tailFin = new THREE.Mesh(tailFinGeo, fuselageMat);
    airplaneGroup.add(tailFin);

    // Glowing Jet Engine Trail Light
    const engineTrailGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const engineTrailMat = new THREE.MeshBasicMaterial({
      color: 0xff1e2d,
      blending: THREE.AdditiveBlending
    });
    const engineTrail = new THREE.Mesh(engineTrailGeo, engineTrailMat);
    engineTrail.position.set(0, 0, -0.7);
    airplaneGroup.add(engineTrail);

    airplaneGroup.scale.set(0.65, 0.65, 0.65);
    scene.add(airplaneGroup);

    // ==========================================
    // 6. FLOATING HOLOGRAPHIC ICONS & CONNECTION LINES
    // ==========================================
    interface FloatingHub {
      name: string;
      category: string;
      code: string;
      pos: THREE.Vector3;
      globeTarget: THREE.Vector3;
      group: THREE.Group;
      line: THREE.Line;
      lineGeo: THREE.BufferGeometry;
      pulseOffset: number;
    }

    const floatingHubs: FloatingHub[] = [];

    const hubData = [
      { name: 'CAMBRIDGE / IDP', category: 'IELTS Band 7.5+', code: 'IELTS', pos: new THREE.Vector3(-12.5, 6.2, 4.0), targetLat: 51.5, targetLon: 0.0 }, // London
      { name: 'GLOBAL ADMISSION', category: 'Top Tier Universities', code: 'EDU', pos: new THREE.Vector3(12.8, 5.5, 3.5), targetLat: 43.6, targetLon: -79.3 }, // Canada
      { name: 'STUDY VISA DISPATCH', category: 'Direct Consulate Stream', code: 'VISA', pos: new THREE.Vector3(-11.5, -5.5, 6.2), targetLat: 40.7, targetLon: -74.0 }, // USA
      { name: 'WORK PERMIT / PR', category: 'Post-Graduation Rights', code: 'WORK', pos: new THREE.Vector3(12.0, -4.8, 5.0), targetLat: -37.8, targetLon: 144.9 }, // AUS
      { name: 'FLIGHT & MOBILITY', category: 'International Routes', code: 'FLY', pos: new THREE.Vector3(0.0, 9.8, -5.5), targetLat: 23.8, targetLon: 90.4 }, // Dhaka
    ];

    const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Helper to generate futuristic Canvas texture for floating cards
    const createHoloCardTexture = (title: string, sub: string, tag: string, iconType: string) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      // Glassmorphic translucent dark background
      ctx.fillStyle = 'rgba(7, 7, 12, 0.94)';
      ctx.fillRect(0, 0, c.width, c.height);

      // Cyber frame & border
      ctx.strokeStyle = '#e11d2a';
      ctx.lineWidth = 3.5;
      ctx.strokeRect(10, 10, c.width - 20, c.height - 20);

      // Corner accent brackets
      ctx.fillStyle = '#ff2a3a';
      ctx.fillRect(6, 6, 24, 6);
      ctx.fillRect(6, 6, 6, 24);
      ctx.fillRect(c.width - 30, 6, 24, 6);
      ctx.fillRect(c.width - 12, 6, 6, 24);
      ctx.fillRect(6, c.height - 12, 24, 6);
      ctx.fillRect(6, c.height - 30, 6, 24);
      ctx.fillRect(c.width - 30, c.height - 12, 24, 6);
      ctx.fillRect(c.width - 12, c.height - 30, 6, 24);

      // Top Tag pill
      ctx.fillStyle = 'rgba(225, 29, 42, 0.25)';
      ctx.fillRect(28, 28, 110, 36);
      ctx.strokeStyle = '#ff1e2d';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(28, 28, 110, 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "Courier New", monospace';
      ctx.fillText(tag, 42, 53);

      // Specific Holographic Icon in top-right
      ctx.save();
      ctx.translate(c.width - 55, 46);
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ff2a3a';
      ctx.lineWidth = 2;

      if (iconType === 'EDU') {
        // Graduation Cap
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(16, -4);
        ctx.lineTo(0, 4);
        ctx.lineTo(-16, -4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-9, 0);
        ctx.lineTo(-9, 10);
        ctx.quadraticCurveTo(0, 15, 9, 10);
        ctx.lineTo(9, 0);
        ctx.stroke();
      } else if (iconType === 'IELTS') {
        // Hexagon with star
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const hx = Math.cos(a) * 14;
          const hy = Math.sin(a) * 14;
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (iconType === 'VISA') {
        // Visa Stamp
        ctx.strokeRect(-12, -12, 24, 24);
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-2, 4);
        ctx.lineTo(7, -5);
        ctx.stroke();
      } else if (iconType === 'WORK') {
        // Briefcase / Work Permit
        ctx.strokeRect(-13, -6, 26, 18);
        ctx.beginPath();
        ctx.arc(0, -6, 6, Math.PI, 0);
        ctx.stroke();
        ctx.fillRect(-3, 0, 6, 6);
      } else {
        // Airplane
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(14, 8);
        ctx.lineTo(3, 4);
        ctx.lineTo(0, 14);
        ctx.lineTo(-3, 4);
        ctx.lineTo(-14, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 30px sans-serif';
      ctx.fillText(title, 28, 120);

      // Subtitle
      ctx.fillStyle = '#ff4d5a';
      ctx.font = '600 20px sans-serif';
      ctx.fillText(sub, 28, 165);

      // Bottom cyber barcode / telemetry data ticks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 28; i++) {
        const w = (i % 3 === 0) ? 5 : 2;
        ctx.fillRect(28 + i * 14, 205, w, 16);
      }

      const tex = new THREE.CanvasTexture(c);
      return tex;
    };

    hubData.forEach((item, index) => {
      const hubGroup = new THREE.Group();
      hubGroup.position.copy(item.pos);
      scene.add(hubGroup);

      // Floating Holographic Card
      const cardTex = createHoloCardTexture(item.name, item.category, item.code, item.code);
      const cardGeo = new THREE.PlaneGeometry(3.6, 1.8);
      const cardMat = new THREE.MeshBasicMaterial({
        map: cardTex,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      hubGroup.add(cardMesh);

      // Floating Icon Hologram Ring
      const holoRingGeo = new THREE.RingGeometry(0.7, 0.85, 32);
      const holoRingMat = new THREE.MeshBasicMaterial({
        color: 0xff1e2d,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
      holoRing.position.set(-2.2, 0, 0.1);
      hubGroup.add(holoRing);

      // Inner Icon Glow Core
      const coreIconGeo = new THREE.OctahedronGeometry(0.4, 0);
      const coreIconMat = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0xffffff : 0xff2a3a,
        wireframe: true,
        blending: THREE.AdditiveBlending
      });
      const coreIconMesh = new THREE.Mesh(coreIconGeo, coreIconMat);
      coreIconMesh.position.set(-2.2, 0, 0.1);
      hubGroup.add(coreIconMesh);

      // Connection Line to Globe Surface
      const globeTarget = latLonToVector3(item.targetLat, item.targetLon, globeRadius);

      const linePoints = [item.pos.clone(), globeTarget.clone()];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xff1e2d,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      // Target Pin on Globe
      const targetPinGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const targetPinMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending
      });
      const targetPin = new THREE.Mesh(targetPinGeo, targetPinMat);
      targetPin.position.copy(globeTarget);
      scene.add(targetPin);

      floatingHubs.push({
        name: item.name,
        category: item.category,
        code: item.code,
        pos: item.pos,
        globeTarget,
        group: hubGroup,
        line,
        lineGeo,
        pulseOffset: index * 1.3
      });
    });

    // ==========================================
    // 7. FUTURISTIC GRID FLOOR WITH RED GLOW
    // ==========================================
    const floorSize = 120;
    const floorDivisions = 60;
    const gridHelper = new THREE.GridHelper(floorSize, floorDivisions, 0xff1e2d, 0x1f070a);
    gridHelper.position.y = -12.5;
    scene.add(gridHelper);

    // Subtle reflective glossy floor plane with soft radial fade
    const floorPlaneGeo = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 1024;
    floorCanvas.height = 1024;
    const fCtx = floorCanvas.getContext('2d')!;
    const radGrad = fCtx.createRadialGradient(512, 512, 50, 512, 512, 512);
    radGrad.addColorStop(0, 'rgba(225, 29, 42, 0.28)');
    radGrad.addColorStop(0.35, 'rgba(180, 15, 25, 0.12)');
    radGrad.addColorStop(0.7, 'rgba(10, 5, 8, 0.05)');
    radGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
    fCtx.fillStyle = radGrad;
    fCtx.fillRect(0, 0, 1024, 1024);

    const floorTex = new THREE.CanvasTexture(floorCanvas);
    const floorPlaneMat = new THREE.MeshBasicMaterial({
      map: floorTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const floorPlane = new THREE.Mesh(floorPlaneGeo, floorPlaneMat);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = -12.48;
    scene.add(floorPlane);

    // ==========================================
    // 8. CONTINUOUS GLOWING PARTICLES (1200+)
    // ==========================================
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 10 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.65;
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      particleScales[i] = Math.random() * 0.8 + 0.2;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.006
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Canvas Sprite for round, soft-glowing bokeh dots
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.25, 'rgba(255, 40, 55, 0.85)');
    pGrad.addColorStop(0.65, 'rgba(225, 29, 42, 0.3)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.85,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // 9. MOUSE PARALLAX & CINEMATIC CAMERA
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX * 3.5;
      mouse.targetY = normY * 2.0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ==========================================
    // 10. ANIMATION LOOP (SLOW, CINEMATIC, SEAMLESS)
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Slow smooth Globe Rotation
      globeGroup.rotation.y = elapsedTime * 0.085;
      wireframeGlobe.rotation.y = -elapsedTime * 0.04;
      wireframeGlobe.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08;

      // Orbital Rings Rotation at varying speeds and directions
      ringConfigs.forEach((cfg, idx) => {
        if (cfg.mesh) {
          cfg.mesh.rotation.z += cfg.speed;
          cfg.mesh.rotation.y += cfg.speed * 0.4;

          // Pulse dots traveling along ring perimeter
          cfg.pulseDots.forEach((dot, dotIdx) => {
            const angle = elapsedTime * (0.8 + idx * 0.3) + (dotIdx * (Math.PI * 2 / cfg.pulseDots.length));
            dot.position.set(
              Math.cos(angle) * cfg.radius,
              Math.sin(angle) * cfg.radius,
              0
            );
          });
        }
      });

      // Trail Comet 1 motion
      const cometProgress = (elapsedTime * 0.075) % 1;
      const cometPos = trailCurve.getPointAt(cometProgress);
      cometMesh.position.copy(cometPos);

      // Trail Comet 2 motion (counter orbit)
      const comet2Progress = (1.0 - (elapsedTime * 0.09) % 1);
      const comet2Pos = trailCurve2.getPointAt(comet2Progress);
      comet2Mesh.position.copy(comet2Pos);

      // Airplane Motion along 3D CatmullRom flight path
      const airplaneProgress = (elapsedTime * 0.048) % 1;
      const planePos = airplaneCurve.getPointAt(airplaneProgress);
      airplaneGroup.position.copy(planePos);

      // Orient airplane along the tangent of its flight path
      const lookAtPoint = airplaneCurve.getPointAt((airplaneProgress + 0.015) % 1);
      airplaneGroup.lookAt(lookAtPoint);

      // Gentle banking roll motion on curves
      const bankingAngle = Math.sin(elapsedTime * 1.5) * 0.25;
      airplaneGroup.rotateZ(bankingAngle);

      // Holographic Floating Hub Cards & Icons
      floatingHubs.forEach((hub) => {
        // Floating bobbing sine motion
        const bob = Math.sin(elapsedTime * 1.2 + hub.pulseOffset) * 0.28;
        hub.group.position.y = hub.pos.y + bob;

        // Cards always face camera with subtle tilt
        hub.group.lookAt(camera.position);

        // Holographic connection line pulse
        const pulse = (Math.sin(elapsedTime * 3 + hub.pulseOffset) + 1) * 0.5;
        (hub.line.material as THREE.LineBasicMaterial).opacity = 0.25 + pulse * 0.45;

        // Keep connection line endpoint anchored to the bobbing hub card
        const positions = (hub.lineGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
        positions[0] = hub.group.position.x;
        positions[1] = hub.group.position.y;
        positions[2] = hub.group.position.z;
        hub.lineGeo.attributes.position.needsUpdate = true;
      });

      // Floating Particles drifting gently
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += particleVelocities[i].x;
        posArray[i * 3 + 1] += particleVelocities[i].y;
        posArray[i * 3 + 2] += particleVelocities[i].z;

        // Gentle boundary bounce
        if (Math.abs(posArray[i * 3]) > 40) particleVelocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 22) particleVelocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 40) particleVelocities[i].z *= -1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Soft breathing core glow
      coreLight.intensity = 5.5 + Math.sin(elapsedTime * 1.8) * 1.5;
      orbitalRedLight.position.x = Math.sin(elapsedTime * 0.3) * 14;
      orbitalRedLight.position.z = Math.cos(elapsedTime * 0.3) * 14;

      // Smooth Camera Mouse Parallax & Gentle Cinematic Drift
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const idleCamX = Math.sin(elapsedTime * 0.12) * 1.2;
      const idleCamY = Math.cos(elapsedTime * 0.16) * 0.8;

      camera.position.x = idleCamX + mouse.x;
      camera.position.y = 2.5 + idleCamY + mouse.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESPONSIVE RESIZING ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      worldTexture.dispose();
      floorTex.dispose();
      pTexture.dispose();
    };
  }, []);

  return (
    <div
      id="futuristic-3d-visual-container"
      className="relative w-screen h-screen overflow-hidden bg-[#050507] flex items-center justify-center select-none"
    >
      {/* Three.js Canvas Container (16:9 widescreen or full responsive immersive viewport) */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Cinematic Vignette Overlay (Dark edges, intense neon center focus) */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,4,6,0.85)_85%,#040406_100%)]" />

      {/* Subtle Top & Bottom Cinematic Scope Letterbox bars on ultra-wide screens */}
      <div className="absolute top-0 left-0 w-full h-3 sm:h-5 bg-gradient-to-b from-[#040406] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-3 sm:h-5 bg-gradient-to-t from-[#040406] to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Futuristic3DScene;
