'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

const Web3Model: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Position camera dynamically based on look angles
    camera.position.set(0, 4, 12);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const mainGroup = new THREE.Group();

    // Node Parameters
    const numNodes = 25;
    const nodesData: { basePos: THREE.Vector3, phase: number, mesh: THREE.Group, refMesh?: THREE.Group }[] = [];
    const spread = 8;
    
    // Material for the cube faces (faint glass)
    const glassMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
    });

    // Material for the cube edges (glowing lines)
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });

    const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);

    // Generate organic positions
    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread * 0.6;
      const z = (Math.random() - 0.5) * spread;
      
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);
      
      const cube = new THREE.Mesh(boxGeo, glassMaterial);
      const edges = new THREE.LineSegments(edgesGeo, edgeMaterial);
      nodeGroup.add(cube);
      nodeGroup.add(edges);
      
      mainGroup.add(nodeGroup);
      
      nodesData.push({
        basePos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2,
        mesh: nodeGroup
      });
    }

    // Add Connections (Lines between close nodes)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.3,
    });

    const connections: [number, number][] = [];
    const threshold = 3.5; // Max distance to connect

    for (let i = 0; i < nodesData.length; i++) {
      for (let j = i + 1; j < nodesData.length; j++) {
        const dist = nodesData[i].basePos.distanceTo(nodesData[j].basePos);
        if (dist < threshold) {
          if (Math.random() > 0.3) {
            connections.push([i, j]);
          }
        }
      }
    }

    // Initialize lines geometry with correct buffer size
    const linePositions = new Float32Array(connections.length * 6);
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    // Create multiple line segment objects (one for main, one later for reflection)
    const linesMesh = new THREE.LineSegments(linesGeo, lineMaterial);
    mainGroup.add(linesMesh);

    scene.add(mainGroup);

    // Create a Fake Reflection
    const reflectionGroup = mainGroup.clone();
    reflectionGroup.position.y = -6; // offset below
    reflectionGroup.scale.y = -1; // flip
    
    // Map reflection nodes to our nodesData so we can animate them together
    // reflectionGroup.children will contain the node groups then the lines mesh
    for (let i = 0; i < numNodes; i++) {
        nodesData[i].refMesh = reflectionGroup.children[i] as THREE.Group;
    }
    const refLinesMesh = reflectionGroup.children[numNodes] as THREE.LineSegments;

    // Dim the reflection materials properly
    const dimGlass = glassMaterial.clone(); dimGlass.opacity *= 0.1;
    const dimEdge = edgeMaterial.clone(); dimEdge.opacity *= 0.2;
    const dimLine = lineMaterial.clone(); dimLine.opacity *= 0.2;
    
    for (let i = 0; i < numNodes; i++) {
        const refNode = nodesData[i].refMesh!;
        const cMesh = refNode.children[0] as THREE.Mesh;
        const eMesh = refNode.children[1] as THREE.LineSegments;
        cMesh.material = dimGlass;
        eMesh.material = dimEdge;
    }
    refLinesMesh.material = dimLine;

    scene.add(reflectionGroup);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.8, // strength
      0.5, // radius
      0.2  // threshold
    );
    composer.addPass(bloom);

    const rgbShift = new ShaderPass(RGBShiftShader);
    rgbShift.uniforms['amount'].value = 0.0035; // The chromatic aberration intensity
    composer.addPass(rgbShift);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Animate individual cubes floating and rotating
      nodesData.forEach((node) => {
        // Vertical bobbing
        const yOffset = Math.sin(t * 1.5 + node.phase) * 0.4;
        node.mesh.position.y = node.basePos.y + yOffset;
        
        // Gentle rotation
        node.mesh.rotation.x = t * 0.4 + node.phase;
        node.mesh.rotation.y = t * 0.3 + node.phase;

        // Apply same to reflection (local coordinates handle the flip correctly)
        if (node.refMesh) {
            node.refMesh.position.y = node.basePos.y + yOffset;
            node.refMesh.rotation.x = t * 0.4 + node.phase;
            node.refMesh.rotation.y = t * 0.3 + node.phase;
        }
      });

      // Update lines geometry to follow the cubes
      const posArray = linesGeo.attributes.position.array as Float32Array;
      let posIdx = 0;
      connections.forEach(([idxA, idxB]) => {
         const pA = nodesData[idxA].mesh.position;
         const pB = nodesData[idxB].mesh.position;
         posArray[posIdx++] = pA.x;
         posArray[posIdx++] = pA.y;
         posArray[posIdx++] = pA.z;
         posArray[posIdx++] = pB.x;
         posArray[posIdx++] = pB.y;
         posArray[posIdx++] = pB.z;
      });
      linesGeo.attributes.position.needsUpdate = true;
      // Also update reflection lines geometry
      const refPosArray = refLinesMesh.geometry.attributes.position.array as Float32Array;
      refPosArray.set(posArray);
      refLinesMesh.geometry.attributes.position.needsUpdate = true;

      // Slowly rotate the entire network
      mainGroup.rotation.y = t * 0.15;
      mainGroup.position.y = Math.sin(t * 0.5) * 0.5;

      reflectionGroup.rotation.y = t * 0.15;
      reflectionGroup.position.y = -6 - Math.sin(t * 0.5) * 0.5;

      composer.render();
    };
    animate();


    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      boxGeo.dispose();
      edgesGeo.dispose();
      linesGeo.dispose();
      glassMaterial.dispose();
      edgeMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="w-[120%] h-[120%] max-w-none origin-center" />
      {/* Dynamic gradient overlay to blend into the card naturally */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
    </div>
  );
};

export default Web3Model;
