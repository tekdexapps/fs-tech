import { useEffect, useRef } from "react";
import * as THREE from "three";

const MetaballBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    renderer: THREE.WebGLRenderer | null;
    material: THREE.ShaderMaterial | null;
    clock: THREE.Clock | null;
    animationId: number | null;
    cleanup: (() => void) | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    material: null,
    clock: null,
    animationId: null,
    cleanup: null,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let renderer: THREE.WebGLRenderer;
    let material: THREE.ShaderMaterial;
    let clock: THREE.Clock;
    let animationId: number;

    // Device detection and optimization
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isLowPowerDevice =
      isMobile ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      isMobile ? 1.5 : 2
    );

    // Mouse tracking
    const targetMousePosition = new THREE.Vector2(0.5, 0.5);
    const mousePosition = new THREE.Vector2(0.5, 0.5);
    const cursorSphere3D = new THREE.Vector3(0, 0, 0);

    // Enhanced 3D yellow theme colors
    const settings = {
      sphereCount: isMobile ? 4 : 6,
      ambientIntensity: 0.2,
      diffuseIntensity: 1.2,
      specularIntensity: 2.0,
      specularPower: 12,
      fresnelPower: 1.8,
      backgroundColor: new THREE.Color().setHSL(0.139, 1.0, 0.95), // Soft golden background
      sphereColor: new THREE.Color().setHSL(0.139, 1.0, 0.55), // Rich golden color
      lightColor: new THREE.Color().setHSL(0.139, 1.0, 0.6), // Golden light
      lightPosition: new THREE.Vector3(0.8, 1.2, 1.0),
      smoothness: 0.3,
      contrast: 1.6,
      fogDensity: 0.015,
      cursorGlowIntensity: 0.1,
      cursorGlowRadius: 0.5,
      cursorGlowColor: new THREE.Color().setHSL(45 / 360, 0.85, 0.7), // Golden glow for depth
      fixedTopLeftRadius: 0.8,
      fixedBottomRightRadius: 0.9,
      smallTopLeftRadius: 0.3,
      smallBottomRightRadius: 0.35,
      cursorRadiusMin: 0.08,
      cursorRadiusMax: 0.15,
      animationSpeed: 0.6,
      movementScale: 1.2,
      mouseSmoothness: 0.1,
      mergeDistance: 1.5,
      mouseProximityEffect: true,
      minMovementScale: 0.3,
      maxMovementScale: 1.0,
    };

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;
      clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile && !isLowPowerDevice,
        alpha: true,
        powerPreference: isMobile ? "default" : "high-performance",
        preserveDrawingBuffer: false,
        premultipliedAlpha: false,
      });

      const pixelRatio = Math.min(devicePixelRatio, isMobile ? 1.5 : 2);
      renderer.setPixelRatio(pixelRatio);

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      renderer.setSize(viewportWidth, viewportHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const canvas = renderer.domElement;
      canvas.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        z-index: 1 !important;
        pointer-events: none !important;
      `;
      container.appendChild(canvas);

      // Create shader material
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(viewportWidth, viewportHeight),
          },
          uActualResolution: {
            value: new THREE.Vector2(
              viewportWidth * pixelRatio,
              viewportHeight * pixelRatio
            ),
          },
          uPixelRatio: { value: pixelRatio },
          uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
          uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
          uCursorRadius: { value: settings.cursorRadiusMin },
          uSphereCount: { value: settings.sphereCount },
          uFixedTopLeftRadius: { value: settings.fixedTopLeftRadius },
          uFixedBottomRightRadius: { value: settings.fixedBottomRightRadius },
          uSmallTopLeftRadius: { value: settings.smallTopLeftRadius },
          uSmallBottomRightRadius: { value: settings.smallBottomRightRadius },
          uMergeDistance: { value: settings.mergeDistance },
          uSmoothness: { value: settings.smoothness },
          uAmbientIntensity: { value: settings.ambientIntensity },
          uDiffuseIntensity: { value: settings.diffuseIntensity },
          uSpecularIntensity: { value: settings.specularIntensity },
          uSpecularPower: { value: settings.specularPower },
          uFresnelPower: { value: settings.fresnelPower },
          uBackgroundColor: { value: settings.backgroundColor },
          uSphereColor: { value: settings.sphereColor },
          uLightColor: { value: settings.lightColor },
          uLightPosition: { value: settings.lightPosition },
          uContrast: { value: settings.contrast },
          uFogDensity: { value: settings.fogDensity },
          uAnimationSpeed: { value: settings.animationSpeed },
          uMovementScale: { value: settings.movementScale },
          uMouseProximityEffect: { value: settings.mouseProximityEffect },
          uMinMovementScale: { value: settings.minMovementScale },
          uMaxMovementScale: { value: settings.maxMovementScale },
          uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
          uCursorGlowRadius: { value: settings.cursorGlowRadius },
          uCursorGlowColor: { value: settings.cursorGlowColor },
          uIsSafari: { value: isSafari ? 1.0 : 0.0 },
          uIsMobile: { value: isMobile ? 1.0 : 0.0 },
          uIsLowPower: { value: isLowPowerDevice ? 1.0 : 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          ${
            isMobile || isSafari || isLowPowerDevice
              ? "precision mediump float;"
              : "precision highp float;"
          }
          
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uActualResolution;
          uniform float uPixelRatio;
          uniform vec2 uMousePosition;
          uniform vec3 uCursorSphere;
          uniform float uCursorRadius;
          uniform int uSphereCount;
          uniform float uFixedTopLeftRadius;
          uniform float uFixedBottomRightRadius;
          uniform float uSmallTopLeftRadius;
          uniform float uSmallBottomRightRadius;
          uniform float uMergeDistance;
          uniform float uSmoothness;
          uniform float uAmbientIntensity;
          uniform float uDiffuseIntensity;
          uniform float uSpecularIntensity;
          uniform float uSpecularPower;
          uniform float uFresnelPower;
          uniform vec3 uBackgroundColor;
          uniform vec3 uSphereColor;
          uniform vec3 uLightColor;
          uniform vec3 uLightPosition;
          uniform float uContrast;
          uniform float uFogDensity;
          uniform float uAnimationSpeed;
          uniform float uMovementScale;
          uniform bool uMouseProximityEffect;
          uniform float uMinMovementScale;
          uniform float uMaxMovementScale;
          uniform float uCursorGlowIntensity;
          uniform float uCursorGlowRadius;
          uniform vec3 uCursorGlowColor;
          uniform float uIsSafari;
          uniform float uIsMobile;
          uniform float uIsLowPower;
          
          varying vec2 vUv;
          
          const float PI = 3.14159265359;
          const float EPSILON = 0.001;
          const float MAX_DIST = 100.0;
          
          float smin(float a, float b, float k) {
            float h = max(k - abs(a - b), 0.0) / k;
            return min(a, b) - h * h * k * 0.25;
          }
          
          float sdSphere(vec3 p, float r) {
            return length(p) - r;
          }
          
          vec3 screenToWorld(vec2 normalizedPos) {
            vec2 uv = normalizedPos * 2.0 - 1.0;
            uv.x *= uResolution.x / uResolution.y;
            return vec3(uv * 2.0, 0.0);
          }
          
          float getDistanceToCenter(vec2 pos) {
            float dist = length(pos - vec2(0.5, 0.5)) * 2.0;
            return smoothstep(0.0, 1.0, dist);
          }
          
          float sceneSDF(vec3 pos) {
            float result = MAX_DIST;
            
            vec3 topRightPos = screenToWorld(vec2(0.92, 0.92));
            float topRight = sdSphere(pos - topRightPos, uFixedTopLeftRadius);
            
            vec3 smallTopRightPos = screenToWorld(vec2(0.75, 0.72));
            float smallTopRight = sdSphere(pos - smallTopRightPos, uSmallTopLeftRadius);
            
            vec3 bottomLeftPos = screenToWorld(vec2(0.08, 0.08));
            float bottomLeft = sdSphere(pos - bottomLeftPos, uFixedBottomRightRadius);
            
            vec3 smallBottomLeftPos = screenToWorld(vec2(0.28, 0.25));
            float smallBottomLeft = sdSphere(pos - smallBottomLeftPos, uSmallBottomRightRadius);
            
            float t = uTime * uAnimationSpeed;
            
            float dynamicMovementScale = uMovementScale;
            if (uMouseProximityEffect) {
              float distToCenter = getDistanceToCenter(uMousePosition);
              float mixFactor = smoothstep(0.0, 1.0, distToCenter);
              dynamicMovementScale = mix(uMinMovementScale, uMaxMovementScale, mixFactor);
            }
            
            int maxIter = uIsMobile > 0.5 ? 4 : (uIsLowPower > 0.5 ? 6 : min(uSphereCount, 10));
            for (int i = 0; i < 10; i++) {
              if (i >= uSphereCount || i >= maxIter) break;
              
              float fi = float(i);
              float speed = 0.4 + fi * 0.12;
              float radius = 0.12 + mod(fi, 3.0) * 0.06;
              float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dynamicMovementScale;
              float phaseOffset = fi * PI * 0.35;
              
              float distToCursor = length(vec3(0.0) - uCursorSphere);
              float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
              orbitRadius *= proximityScale;
              
              vec3 offset;
              if (i == 0) {
                offset = vec3(
                  sin(t * speed) * orbitRadius * 0.7,
                  sin(t * 0.5) * orbitRadius,
                  cos(t * speed * 0.7) * orbitRadius * 0.5
                );
              } else if (i == 1) {
                offset = vec3(
                  sin(t * speed + PI) * orbitRadius * 0.5,
                  -sin(t * 0.5) * orbitRadius,
                  cos(t * speed * 0.7 + PI) * orbitRadius * 0.5
                );
              } else {
                offset = vec3(
                  sin(t * speed + phaseOffset) * orbitRadius * 0.8,
                  cos(t * speed * 0.85 + phaseOffset * 1.3) * orbitRadius * 0.6,
                  sin(t * speed * 0.5 + phaseOffset) * 0.3
                );
              }
              
              vec3 toCursor = uCursorSphere - offset;
              float cursorDist = length(toCursor);
              if (cursorDist < uMergeDistance && cursorDist > 0.0) {
                float attraction = (1.0 - cursorDist / uMergeDistance) * 0.3;
                offset += normalize(toCursor) * attraction;
              }
              
              float movingSphere = sdSphere(pos - offset, radius);
              
              float blend = 0.05;
              if (cursorDist < uMergeDistance) {
                float influence = 1.0 - (cursorDist / uMergeDistance);
                blend = mix(0.05, uSmoothness, influence * influence * influence);
              }
              
              result = smin(result, movingSphere, blend);
            }
            
            float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
            
            float topRightGroup = smin(topRight, smallTopRight, 0.4);
            float bottomLeftGroup = smin(bottomLeft, smallBottomLeft, 0.4);
            
            result = smin(result, topRightGroup, 0.3);
            result = smin(result, bottomLeftGroup, 0.3);
            result = smin(result, cursorBall, uSmoothness);
            
            return result;
          }
          
          vec3 calcNormal(vec3 p) {
            float eps = uIsLowPower > 0.5 ? 0.002 : 0.001;
            return normalize(vec3(
              sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
              sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
              sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
            ));
          }
          
          float ambientOcclusion(vec3 p, vec3 n) {
            if (uIsLowPower > 0.5) {
              float h1 = sceneSDF(p + n * 0.03);
              float h2 = sceneSDF(p + n * 0.06);
              float occ = (0.03 - h1) + (0.06 - h2) * 0.5;
              return clamp(1.0 - occ * 2.0, 0.0, 1.0);
            } else {
              float occ = 0.0;
              float weight = 1.0;
              for (int i = 0; i < 6; i++) {
                float dist = 0.01 + 0.015 * float(i * i);
                float h = sceneSDF(p + n * dist);
                occ += (dist - h) * weight;
                weight *= 0.85;
              }
              return clamp(1.0 - occ, 0.0, 1.0);
            }
          }
          
          float rayMarch(vec3 ro, vec3 rd) {
            float t = 0.0;
            int maxSteps = uIsMobile > 0.5 ? 16 : (uIsSafari > 0.5 ? 16 : 48);
            
            for (int i = 0; i < 48; i++) {
              if (i >= maxSteps) break;
              
              vec3 p = ro + rd * t;
              float d = sceneSDF(p);
              
              if (d < EPSILON) {
                return t;
              }
              
              if (t > 5.0) {
                break;
              }
              
              t += d * (uIsLowPower > 0.5 ? 1.2 : 0.9);
            }
            
            return -1.0;
          }
          
          vec3 lighting(vec3 p, vec3 rd, float t) {
            if (t < 0.0) {
              return vec3(0.0);
            }
            
            vec3 normal = calcNormal(p);
            vec3 viewDir = -rd;
            
            vec3 baseColor = uSphereColor;
            
            float ao = ambientOcclusion(p, normal);
            
            vec3 ambient = uLightColor * uAmbientIntensity * ao;
            
            vec3 lightDir = normalize(uLightPosition);
            float diff = max(dot(normal, lightDir), 0.0);
            
            vec3 diffuse = uLightColor * diff * uDiffuseIntensity;
            
            vec3 reflectDir = reflect(-lightDir, normal);
            float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
            float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
            
            vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;
            
            vec3 fresnelRim = uLightColor * fresnel * 0.4;
            
            float distToCursor = length(p - uCursorSphere);
            if (distToCursor < uCursorRadius + 0.4) {
              float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, distToCursor);
              specular += uLightColor * highlight * 0.2;
              
              float glow = exp(-distToCursor * 3.0) * 0.15;
              ambient += uLightColor * glow * 0.5;
            }
            
            vec3 color = (baseColor + ambient + diffuse + specular + fresnelRim) * ao;
            
            color = pow(color, vec3(uContrast * 0.9));
            color = color / (color + vec3(0.8));
            
            return color;
          }
          
          float calculateCursorGlow(vec3 worldPos) {
            float dist = length(worldPos.xy - uCursorSphere.xy);
            float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
            glow = pow(glow, 2.0);
            return glow * uCursorGlowIntensity;
          }
          
          void main() {
            vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
            uv.x *= uResolution.x / uResolution.y;
            
            vec3 ro = vec3(uv * 2.0, -1.0);
            vec3 rd = vec3(0.0, 0.0, 1.0);
            
            float t = rayMarch(ro, rd);
            
            vec3 p = ro + rd * t;
            
            vec3 color = lighting(p, rd, t);
            
            float cursorGlow = calculateCursorGlow(ro);
            vec3 glowContribution = uCursorGlowColor * cursorGlow;
            
            if (t > 0.0) {
              float fogAmount = 1.0 - exp(-t * uFogDensity);
              color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);
              
              color += glowContribution * 0.3;
              
              gl_FragColor = vec4(color, 1.0);
            } else {
              if (cursorGlow > 0.01) {
                gl_FragColor = vec4(glowContribution, cursorGlow * 0.8);
              } else {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              }
            }
          }
        `,
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Initialize cursor position
      onPointerMove({
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
    };

    const screenToWorldJS = (normalizedX: number, normalizedY: number) => {
      const uv_x = normalizedX * 2.0 - 1.0;
      const uv_y = normalizedY * 2.0 - 1.0;
      const aspect = window.innerWidth / window.innerHeight;
      return new THREE.Vector3(uv_x * aspect * 2.0, uv_y * 2.0, 0.0);
    };

    const onPointerMove = (event: { clientX: number; clientY: number }) => {
      targetMousePosition.x = event.clientX / window.innerWidth;
      targetMousePosition.y = 1.0 - event.clientY / window.innerHeight;

      const normalizedX = targetMousePosition.x;
      const normalizedY = targetMousePosition.y;
      const worldPos = screenToWorldJS(normalizedX, normalizedY);
      cursorSphere3D.copy(worldPos);

      // Calculate dynamic radius based on proximity to fixed spheres
      let closestDistance = 1000.0;
      const fixedPositions = [
        screenToWorldJS(0.92, 0.92),
        screenToWorldJS(0.75, 0.72),
        screenToWorldJS(0.08, 0.08),
        screenToWorldJS(0.28, 0.25),
      ];

      fixedPositions.forEach((pos) => {
        const dist = cursorSphere3D.distanceTo(pos);
        closestDistance = Math.min(closestDistance, dist);
      });

      const proximityFactor = Math.max(
        0,
        1.0 - closestDistance / settings.mergeDistance
      );
      const smoothFactor =
        proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor);
      const dynamicRadius =
        settings.cursorRadiusMin +
        (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      if (material) {
        material.uniforms.uCursorSphere.value.copy(cursorSphere3D);
        material.uniforms.uCursorRadius.value = dynamicRadius;
      }
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentPixelRatio = Math.min(devicePixelRatio, isMobile ? 1.5 : 2);

      if (camera && renderer && material) {
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(currentPixelRatio);

        material.uniforms.uResolution.value.set(width, height);
        material.uniforms.uActualResolution.value.set(
          width * currentPixelRatio,
          height * currentPixelRatio
        );
        material.uniforms.uPixelRatio.value = currentPixelRatio;
      }
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      if (!material || !clock || !renderer || !scene || !camera) return;

      // Smooth mouse movement
      mousePosition.x +=
        (targetMousePosition.x - mousePosition.x) * settings.mouseSmoothness;
      mousePosition.y +=
        (targetMousePosition.y - mousePosition.y) * settings.mouseSmoothness;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMousePosition.value = mousePosition;

      renderer.render(scene, camera);
    };

    // Event listeners
    const handlePointerMove = (e: MouseEvent) => onPointerMove(e);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        onPointerMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    // Initialize
    init();
    animate();

    // Add event listeners
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", onWindowResize, { passive: true });

    // Cleanup function
    const cleanup = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", onWindowResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }

      if (material) {
        material.dispose();
      }

      if (scene) {
        scene.clear();
      }
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      clock,
      animationId,
      cleanup,
    };

    return cleanup;
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 1 }}
    />
  );
};

export default MetaballBackground;
