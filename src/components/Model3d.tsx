import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Model3d: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Store values in refs to avoid re-rendering at 60fps
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const windowMouseRef = useRef({ x: 0, y: 0 });
  const [rotationZStr, setRotationZStr] = useState('0.00');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 5. Engineering Wireframe Polyhedron
    const geometry = new THREE.IcosahedronGeometry(2.0, 1);
    
    // Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b00, // Accent Orange
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    modelGroup.add(mesh);

    // Glow Points (Vertices)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffaa66, // Light orange
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    modelGroup.add(points);

    // 6. Gyroscopic Orbit Rings
    // Ring 1 (Horizontal Orbit)
    const ringGeom1 = new THREE.BufferGeometry();
    const pointsRing1: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pointsRing1.push(new THREE.Vector3(Math.cos(theta) * 2.8, 0, Math.sin(theta) * 2.8));
    }
    ringGeom1.setFromPoints(pointsRing1);
    const ringMat1 = new THREE.LineBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.15 });
    const ring1 = new THREE.Line(ringGeom1, ringMat1);
    modelGroup.add(ring1);

    // Ring 2 (Vertical Orbit)
    const ringGeom2 = new THREE.BufferGeometry();
    const pointsRing2: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pointsRing2.push(new THREE.Vector3(0, Math.cos(theta) * 2.8, Math.sin(theta) * 2.8));
    }
    ringGeom2.setFromPoints(pointsRing2);
    const ringMat2 = new THREE.LineBasicMaterial({ color: 0xff9242, transparent: true, opacity: 0.15 });
    const ring2 = new THREE.Line(ringGeom2, ringMat2);
    modelGroup.add(ring2);

    // 7. Coordinate Blueprint Grid
    const gridHelper = new THREE.GridHelper(10, 10, 0xff6b00, 0x1a1a24);
    gridHelper.position.y = -2.5;
    
    // Set grid Helper transparency
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.08;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.08;
    }
    modelGroup.add(gridHelper);

    // Mouse handlers
    const onCanvasMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotationRef.current.x = y * 0.4;
      targetRotationRef.current.y = x * 0.4;
    };

    const onWindowMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      windowMouseRef.current.x = x * 0.25;
      windowMouseRef.current.y = y * 0.25;
    };

    canvas.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener('mousemove', onWindowMouseMove);

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animFrameId: number;
    let tickCount = 0;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Base rotation
      modelGroup.rotation.y += 0.003;
      modelGroup.rotation.x += 0.001;

      // Rotate orbits in counter directions
      ring1.rotation.y -= 0.005;
      ring2.rotation.z += 0.004;

      // Smooth hover tilt physics interpolation (Damping)
      const lerpRotationX = targetRotationRef.current.x + windowMouseRef.current.y;
      const lerpRotationY = targetRotationRef.current.y + windowMouseRef.current.x;
      modelGroup.rotation.x += (lerpRotationX - modelGroup.rotation.x) * 0.05;
      modelGroup.rotation.y += (lerpRotationY - modelGroup.rotation.y) * 0.05;

      // Throttle setState updates to avoid excessive react renders
      tickCount++;
      if (tickCount % 5 === 0) {
        setRotationZStr(modelGroup.rotation.y.toFixed(2));
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener('mousemove', onCanvasMouseMove);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
      
      {/* Overlay Blueprint Details to feel like CAD interface */}
      <div className="absolute left-6 bottom-6 font-mono text-[10px] text-accent/40 select-none hidden md:block">
        <div>SYS_MODEL: CONSTELLATION_V3</div>
        <div>RENDER_MODE: WIREFRAME_GL</div>
        <div>VERTICES: 120 // EDGES: 340</div>
        <div>ROT_Z: <span className="text-accent/60">{rotationZStr}</span></div>
      </div>
      <div className="absolute right-6 top-6 font-mono text-[10px] text-accent/40 select-none hidden md:block">
        <div>COORD_GRID: ACTIVE</div>
        <div>SCALE: 1.000</div>
        <div>ANTIALIAS: ON</div>
      </div>
    </div>
  );
};
