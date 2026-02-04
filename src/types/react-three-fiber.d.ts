import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      pointLight: ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      // @react-three/drei components
      float: ReactThreeFiber.Node<Float, typeof Float>;
      sphere: ReactThreeFiber.Node<Sphere, typeof Sphere>;
      box: ReactThreeFiber.Node<Box, typeof Box>;
      torus: ReactThreeFiber.Node<Torus, typeof Torus>;
      meshDistortMaterial: ReactThreeFiber.Node<MeshDistortMaterial, typeof MeshDistortMaterial>;
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}
