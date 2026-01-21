import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedGridBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: false,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.set(0, 3, 5);
        camera.lookAt(0, 0, 0);

        // Black background
        scene.background = new THREE.Color(0x000000);

        // Create infinite grid with wave effect
        const gridSize = 50;
        const gridDivisions = 100;

        // Main grid plane with custom material for wave effect
        const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouseX: { value: 0 },
                mouseY: { value: 0 }
            },
            vertexShader: `
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec3 pos = position;
          
          // Wave effect based on position and time
          float wave1 = sin(pos.x * 0.5 + time) * 0.3;
          float wave2 = cos(pos.y * 0.5 + time * 0.8) * 0.3;
          
          // Mouse interaction - creates ripples
          float distanceToMouse = distance(pos.xy, vec2(mouseX * 10.0, mouseY * 10.0));
          float ripple = sin(distanceToMouse - time * 2.0) * 0.5 * exp(-distanceToMouse * 0.1);
          
          pos.z = wave1 + wave2 + ripple;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vPosition;
        
        void main() {
          // Create grid lines
          float gridX = abs(fract(vPosition.x * 2.0) - 0.5);
          float gridY = abs(fract(vPosition.y * 2.0) - 0.5);
          
          float grid = min(gridX, gridY);
          float line = smoothstep(0.48, 0.5, grid);
          
          // White grid lines with glow
          vec3 color = vec3(line);
          
          // Add subtle glow based on wave height
          float glow = abs(vPosition.z) * 0.5;
          color += vec3(glow * 0.3);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
            wireframe: false,
            side: THREE.DoubleSide
        });

        const gridMesh = new THREE.Mesh(geometry, material);
        gridMesh.rotation.x = -Math.PI / 2;
        gridMesh.position.y = -2;
        scene.add(gridMesh);

        // Add wireframe grid for extra detail
        const wireframeGeometry = new THREE.PlaneGeometry(gridSize, gridSize, 50, 50);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        wireframeMesh.rotation.x = -Math.PI / 2;
        wireframeMesh.position.y = -1.8;
        scene.add(wireframeMesh);

        // Add fog for depth
        scene.fog = new THREE.Fog(0x000000, 5, 30);

        // Mouse move handler
        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Update shader uniforms
            material.uniforms.time.value = elapsedTime;
            material.uniforms.mouseX.value = mouseRef.current.x;
            material.uniforms.mouseY.value = mouseRef.current.y;

            // Smooth camera movement based on mouse
            camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
            camera.position.y += (3 - mouseRef.current.y - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // Rotate wireframe slightly
            wireframeMesh.rotation.z = elapsedTime * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            wireframeGeometry.dispose();
            wireframeMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="animated-grid-canvas" />;
};

export default AnimatedGridBackground;
