"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

interface InertiaLogoProps {
  size?: number;
}

export default function InertiaLogo({ size = 460 }: InertiaLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      5000,
    );
    camera.position.set(0, 20, 620);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(150, 220, 300);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x88aaff, 0.45);
    fill.position.set(-200, 50, -150);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xff8a4c, 0.5);
    rim.position.set(0, -100, -300);
    scene.add(rim);

    let logo: THREE.Mesh | undefined;
    let spin: gsap.core.Tween | undefined;
    let draggable: Draggable | undefined;
    let frameId: number;

    const loader = new THREE.TextureLoader();
    loader.load("/courtvision-mark-cropped.png", (texture: THREE.Texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // Cropped art is 404x679 (tight to the badge, no surrounding whitespace).
      const aspect = 404 / 679;
      const height = 340;
      const width = height * aspect;
      const depth = 26;
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0xf4f6fb,
        metalness: 0.1,
        roughness: 0.55,
      });
      const faceMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.05,
        roughness: 0.4,
      });

      // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
      logo = new THREE.Mesh(geometry, [
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        faceMaterial,
        faceMaterial,
      ]);

      scene.add(logo);
      setupDragSpin();
    });

    function animate() {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      camera.aspect = container!.clientWidth / container!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container!.clientWidth, container!.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    function setupDragSpin() {
      const dragDistancePerRotation = 600;
      const progressWrap = gsap.utils.wrap(0, 1);
      const proxy = document.createElement("div");
      let startProgress = 0;

      spin = gsap.to(logo!.rotation, {
        y: "-=" + Math.PI * 2,
        duration: 9,
        ease: "none",
        repeat: -1,
      });

      function updateRotation(this: Draggable) {
        const p =
          startProgress + (this.startX - this.x) / dragDistancePerRotation;
        spin!.progress(progressWrap(p));
      }

      [draggable] = Draggable.create(proxy, {
        trigger: container,
        type: "x",
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          gsap.killTweensOf(spin!);
          spin!.timeScale(0);
          startProgress = spin!.progress();
        },
        onDrag: updateRotation,
        onThrowUpdate: updateRotation,
        onRelease() {
          if (!this.tween || !this.tween.isActive()) {
            gsap.to(spin!, { timeScale: 1, duration: 1 });
          }
        },
        onThrowComplete() {
          gsap.to(spin!, { timeScale: 1, duration: 1 });
        },
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      draggable?.kill();
      spin?.kill();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(bgRef.current, {
      duration: 1,
      opacity: 1,
    });
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 4,
        duration: 4,
      },
    );
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        maxWidth: "62vw",
        maxHeight: "62vw",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(95,172,235,0.35), transparent 70%)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "grab",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}
