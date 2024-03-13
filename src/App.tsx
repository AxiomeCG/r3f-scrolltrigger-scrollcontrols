import { Canvas } from "@react-three/fiber";
import "./App.scss";
import { Box, Scroll, ScrollControls, Sphere, useScroll } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


function HtmlPart() {
  const {fixed} = useScroll();
  const scopeRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    const boxes = gsap.utils.toArray('.box') as HTMLElement[];
    boxes.forEach(box => {
      gsap.to(box, {
        x: 300,
        rotation: 360,
        scrollTrigger: {
          trigger: box,
          scrub: true,
          scroller: fixed.parentElement,
        }
      })
    });
  },  { scope: scopeRef });
  return <div ref={scopeRef} style={{marginBottom: "100vh"}}>
    <h2>Scroll down</h2>
    <div className="box"></div>

    <div className="box"></div>

    <div className="box"></div>
  </div>;
}

function App() {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 5]} intensity={1}/>
      <ambientLight intensity={0.5}/>
      <ScrollControls pages={4}>
        <Scroll html>
          <HtmlPart/>
        </Scroll>

        <Scroll>
          <Sphere>
            <meshStandardMaterial color="hotpink"/>
          </Sphere>
          <Box position={[0, -3, 0]}>
            <meshStandardMaterial color="cyan"/>
          </Box>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}

export default App;
