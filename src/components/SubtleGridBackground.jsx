import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SubtleGridBackground = ({ opacity = 0.1 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.set(0, 2, 4);
        camera.lookAt(0, 0, 0);

        // Transparent background
        scene.background = null;

        // Create subtle grid
        const gridSize = 30;
        const gridDivisions = 60;

        const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                opacity: { value: opacity }
            },
            vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec3 pos = position;
          
          // Gentle wave
          float wave = sin(pos.x * 0.3 + time * 0.5) * 0.2;
          wave += cos(pos.y * 0.3 + time * 0.3) * 0.2;
          
          pos.z = wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vPosition;
        uniform float opacity;
        
        void main() {
          // Subtle grid lines
          float gridX = abs(fract(vPosition.x * 2.0) - 0.5);
          float gridY = abs(fract(vPosition.y * 2.0) - 0.5);
          
          float grid = min(gridX, gridY);
          float line = smoothstep(0.48, 0.5, grid);
          
          vec3 color = vec3(line * 0.3);
          
          gl_FragColor = vec4(color, opacity);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide
        });

        const gridMesh = new THREE.Mesh(geometry, material);
        gridMesh.rotation.x = -Math.PI / 2.2;
        gridMesh.position.y = -1.5;
        scene.add(gridMesh);

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            material.uniforms.time.value = elapsedTime;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [opacity]);

    return <canvas ref={canvasRef} className="subtle-grid-canvas" />;
};

export default SubtleGridBackground;
