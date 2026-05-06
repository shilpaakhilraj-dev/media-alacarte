import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';

/* ThreeSceneService
 * Manages the Three.js scene for the hero section's animated background.
 * Handles initialization, animation loop, and cleanup of resources.
 */
@Injectable({ providedIn: 'root' })

export class ThreeSceneService implements OnDestroy {
  /* References to Three.js scene, camera, renderer, and objects */
  private scene!: THREE.Scene;

  /* Animation loop ID for cleanup */
  private camera!: THREE.PerspectiveCamera;

  /* Mouse position for interactive rotation */
  private renderer!: THREE.WebGLRenderer;

  /* References to the particle field, network nodes, and connection lines */
  private animationId!: number;

  /* Initialize the Three.js scene with the provided canvas element */
  private particles!: THREE.Points;

  /* Create a dynamic particle field, network nodes, and connection lines */
  private nodes!: THREE.Points;

  /* Create connection lines between nearby nodes to form a network effect */
  private lines!: THREE.LineSegments;

  /* Handle mouse movement to create an interactive parallax effect on the scene */
  private mouse = new THREE.Vector2(0, 0);

  /* Clock for animating the scene over time */
  private clock = new THREE.Clock();

  /* Initialize the Three.js scene with the provided canvas element */
  private canvas!: HTMLCanvasElement;

  /* Set up event listeners for mouse movement and window resize to ensure the scene remains interactive and responsive */
  private mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e);

  /* Handle window resize events to adjust the camera aspect ratio and renderer size */
  private resizeHandler = (e: UIEvent) => this.onResize(e);

  constructor(private ngZone: NgZone) {}

  /* Initialize the Three.js scene with the provided canvas element */
  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.createParticleField();
    this.createNetworkNodes();
    this.createConnectionLines();

    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('resize', this.resizeHandler);

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  /* Create a dynamic particle field with random positions and sizes to add depth and visual interest to the background */
  private createParticleField(): void {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    this.particles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.25,
        sizeAttenuation: true,
      })
    );

    this.scene.add(this.particles);
  }

  /* Create a set of nodes randomly positioned in space that will form the basis of the network effect, with lines connecting nearby nodes to create a dynamic, evolving background pattern */
  private createNetworkNodes(): void {
    const nodeCount = 60;
    const positions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.nodes = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xe8173c,
        size: 0.35,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
      })
    );

    this.scene.add(this.nodes);
  }

  /* Create connection lines between nearby nodes to form a network effect */
  private createConnectionLines(): void {
    const nodePositions = this.nodes.geometry.attributes['position'];
    const linePositions: number[] = [];
    const maxDist = 12;

    for (let i = 0; i < nodePositions.count; i++) {
      const ax = nodePositions.getX(i);
      const ay = nodePositions.getY(i);
      const az = nodePositions.getZ(i);

      for (let j = i + 1; j < nodePositions.count; j++) {
        const bx = nodePositions.getX(j);
        const by = nodePositions.getY(j);
        const bz = nodePositions.getZ(j);

        if (Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2 + (bz - az) ** 2) < maxDist) {
          linePositions.push(ax, ay, az, bx, by, bz);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );

    this.lines = new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({
        color: 0xe8173c,
        transparent: true,
        opacity: 0.12,
      })
    );

    this.scene.add(this.lines);
  }

  /* Animation loop to rotate the scene based on mouse movement and elapsed time, creating a dynamic and interactive background effect that responds to user input while maintaining smooth performance */
  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    this.scene.rotation.x += (this.mouse.y * 0.3 - this.scene.rotation.x) * 0.02;
    this.scene.rotation.y += (this.mouse.x * 0.5 - this.scene.rotation.y) * 0.02;

    this.particles.rotation.y = elapsed * 0.02;
    this.nodes.rotation.y = elapsed * 0.025;
    this.lines.rotation.y = elapsed * 0.025;

    (this.nodes.material as THREE.PointsMaterial).opacity =
      0.6 + Math.sin(elapsed * 1.5) * 0.3;

    this.renderer.render(this.scene, this.camera);
  }

  /* Handle mouse movement to create an interactive parallax effect on the scene */
  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.y = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  /* Handle window resize events to adjust the camera aspect ratio and renderer size */
  private onResize(_: UIEvent): void {
    const canvas = this.canvas;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  /* Clean up resources and event listeners when the component is destroyed to prevent memory leaks and ensure proper cleanup of Three.js objects and event handlers */
  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer?.dispose();
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }
}