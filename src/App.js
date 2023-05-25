import React, {
  Suspense,
  useEffect,
  useState,
  useRef,
  useMemo,
  createRef,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components";
import Hamburger from "hamburger-react";
import {
  Button,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  AppBar,
} from "@mui/material";
import "./App.css";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useMediaQuery } from "@mui/material";
import * as THREE from "three";
import { Parallax, Background } from "react-parallax";
import { styled } from "@mui/system";
import {
  nonAlcohol,
  wine,
  whiskey,
  alco,
  cocktails,
  navs,
} from "./assets/mock/menu";
import useScrollBlock from "./hooks/useScrollBlock";

const Title = styled("span")(({ theme }) => ({
  fontWeight: "bold",
  letterSpacing: "3px",
  fontSize: "22px",
  [theme.breakpoints.up("md")]: {
    fontSize: "32px",
  },
  textTransform: "uppercase",
  display: "block",
  width: "100%",
  textAlign: "center",
  marginTop: "10px",
  marginBottom: "2px",
}));

const PositionBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const PositionDesc = styled("span")(({ theme }) => ({
  fontSize: "16px",
  [theme.breakpoints.up("md")]: {
    fontSize: "26px",
  },
  textAlign: "center",
}));

const PositionName = styled("span")(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
  textAlign: "center",
}));

const PositionPrice = styled("span")(({ theme }) => ({
  fontSize: "20px",
  [theme.breakpoints.up("md")]: {
    fontSize: "30px",
  },
  textAlign: "center",
}));

function LoadScreen() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [count, setCount] = useState(0);
  const [intensity, setIntensity] = useState(0.5);

  useEffect(() => {
    let timerId;
    let intervalId;

    const updateCount = () => {
      setCount((prevCount) => prevCount + 1);
    };

    const updateIntensity = () => {
      const sinValue = Math.sin(Date.now() * 0.01);
      const newIntensity = THREE.MathUtils.clamp(sinValue, 0, 1);
      setIntensity(newIntensity);
    };

    if (count <= 4) {
      timerId = setInterval(updateCount, 1000);
      intervalId = setInterval(updateIntensity, 50);
    }

    return () => {
      clearInterval(timerId);
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera
        makeDefault
        fov={50}
        position={isDesktop ? [-1, 4, 17] : [-2, 3, 24]}
      />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture, index) => (
          <React.Fragment key={index}>
            <Environment map={texture} />
          </React.Fragment>
        )}
      </CubeCamera>

      {count >= 1 && (
        <spotLight
          color={new THREE.Color("#ffffff")}
          intensity={count > 2 ? 0.6 : intensity}
          angle={1}
          penumbra={0.5}
          position={[-15, 10, 10]}
          castShadow
          shadow-bias={-0.0001}
        />
      )}

      {count > 1 && (
        <spotLight
          color={new THREE.Color("#ffffff")}
          intensity={count > 2 ? 0.6 : intensity}
          angle={1}
          penumbra={0.5}
          position={[15, 10, 10]}
          castShadow
          shadow-bias={-0.0001}
        />
      )}

      <Ground />
    </>
  );
}

function App() {
  const [isMoved, setIsMoved] = useState(false);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [isOpen, setOpen] = useState(false);
  const [scrollContentPos, setScrollContentPos] = useState(0);
  const [blockScroll, allowScroll] = useScrollBlock();

  const handleOpenMenu = () => {
    setScrollContentPos(window.scrollY);
    if (isOpen === false) {
      blockScroll();
    } else {
      allowScroll();
    }

    window.scrollTo(0, scrollContentPos);
    setOpen(!isOpen);
  };

  const handleMove = () => {
    setIsMoved(true);
  };

  const styles = {
    height: "1000vh",
    width: isDesktop ? "400vw" : "200vw",
    backgroundImage: isDesktop ? "url('/bg2.jpg')" : "url('/bg5.png')",
    backgroundSize: !isDesktop ? "700px" : "auto",
  };

  const navsRef = useRef([]);

  const handleScroll = (index) => {
    allowScroll();

    switch (index) {
      case 0:
        window.scrollTo(0, nonAlcoholRefs[0].current?.offsetTop - 120);
        break;
      case 1:
        window.scrollTo(0, nonAlcoholRefs[1].current?.offsetTop - 120);
        break;
      case 2:
        window.scrollTo(0, nonAlcoholRefs[4].current?.offsetTop - 120);
        break;
      case 3:
        window.scrollTo(0, wineRef.current?.offsetTop - 120);
        break;
      case 4:
        window.scrollTo(0, whiskeyRef.current?.offsetTop - 120);
        break;
      case 5:
        window.scrollTo(0, alcoRef.current?.offsetTop - 120);
        break;
      case 6:
        window.scrollTo(0, cocktailsRef.current?.offsetTop - 120);
        break;
    }

    setOpen(false);
  };

  const nonAlcoholRefs = useMemo(
    () => Array.from({ length: nonAlcohol.length }).map(() => createRef()),
    [nonAlcohol]
  );
  const wineRef = useRef(null);
  const whiskeyRef = useRef(null);
  const alcoRef = useRef(null);
  const cocktailsRef = useRef(null);
  const contentRef = useRef(null);

  const [value, setValue] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {!isMoved ? (
        <Suspense fallback={null}>
          <Canvas shadows>
            <LoadScreen />
          </Canvas>

          {value && (
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                top: "75%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#e3000e",
                fontSize: " 30px",
                letterSpacing: "3px",
                width: "150px",
                height: "60px",
                fontFamily: "PoiretOne",
                "&:hover": {
                  background: "#e3000e",
                },
              }}
              onClick={handleMove}
            >
              Меню
            </Button>
          )}
        </Suspense>
      ) : (
        <div style={{ position: "relative" }} ref={contentRef}>
          <AppBar
            sx={{
              backgroundColor: "black",
              height: "80px",
              boxShadow: "0px 14px 11px 5px rgba(0, 0, 0, 0.5)",
              d: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              pl: 2,
              pr: 6,
            }}
          >
            <Box>
              <Hamburger
                direction="right"
                size={32}
                toggled={isOpen}
                toggle={handleOpenMenu}
                color={"white"}
              />
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
              <img
                src={"/textures/logo.png"}
                style={{ height: "80px", width: "80px" }}
              />
            </Box>
          </AppBar>

          <Box
            sx={{
              display: isOpen ? "flex" : "none",
              height: "1000vh",
              overflow: isOpen ? "hidden" : "auto",
              width: "100vw",
              backgroundColor: "black",
              color: "white",
              flexDirection: "column",
              position: "absolute",
              top: 0,
              left: 0,
              pt: "100px",
              zIndex: 1000,
            }}
          >
            {navs.map((name, i) => (
              <Title
                key={i}
                ref={navsRef.current[i]}
                sx={{ py: 1, fontSize: "22px", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(i);
                }}
              >
                {name}
              </Title>
            ))}
          </Box>

          <Parallax strength={isDesktop ? 2000 : 500}>
            <Box
              sx={{
                overflow: isOpen ? "hidden" : "hidden",
                color: "white",
                fontFamily: "PoiretOne",
                p: 4,
                pt: 12,
                px: { md: 24 },
              }}
            >
              {nonAlcohol.map((elem, index) => (
                <React.Fragment key={index}>
                  <Title id={`#${elem.title}`} ref={nonAlcoholRefs[index]}>
                    {elem.title}
                  </Title>
                  {elem.position.map((position) => (
                    <PositionBox>
                      <PositionName sx={{ textAlign: "left" }}>
                        {position.name}
                      </PositionName>
                      <PositionPrice>{position.price}</PositionPrice>
                    </PositionBox>
                  ))}
                </React.Fragment>
              ))}
              <Grid container ref={wineRef}>
                <Title sx={{fontSize: '30px'}} id="#Вино">Вино</Title>
                {wine.map((elem, index) => (
                  <Grid item xs={index === 2 ? 12 : 6} key={index}>
                    <Title sx={{fontSize: '25px'}}>{elem.title}</Title>
                    {elem.position.map((position) => (
                      <PositionBox sx={{ flexDirection: "column", py: 2 }}>
                        <PositionName sx={{fontWeight: 700, letterSpacing: '2px' }}>{position.name}</PositionName>
                        <PositionDesc>{position.desc}</PositionDesc>
                        <PositionPrice>{position.price}</PositionPrice>
                      </PositionBox>
                    ))}
                  </Grid>
                ))}
              </Grid>

              {whiskey.map((elem, index) => (
                <React.Fragment key={index}>
                  <Title id="#Виски" ref={whiskeyRef} sx={{ fontSize: '30px'}}>
                    {elem.title}
                  </Title>
                  {elem.position.map((position) => (
                    <PositionBox sx={{ flexDirection: "column", py: 2 }}>
                      <PositionName sx={{fontWeight: 700, letterSpacing: '2px' }}>{position.name}</PositionName>
                      <PositionPrice>{position.desc}</PositionPrice>
                      <PositionPrice>{position.price}</PositionPrice>
                    </PositionBox>
                  ))}
                </React.Fragment>
              ))}

              <ImageList
                variant="quilted"
                cols={2}
                gap={14}
                id="#Крепкие напитки"
                ref={alcoRef}
              >
                {alco.map((elem, index) => (
                  <ImageListItem cols={1} rows={index === 0 ? 2 : 1} key={index}>
                    <Title>{elem.title}</Title>
                    {elem.position.map((position) => (
                      <PositionBox sx={{ py: "4px" }}>
                        <PositionName
                          sx={{ textAlign: "left", fontSize: "18px" }}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: position.name }}
                          />
                        </PositionName>
                        <PositionPrice sx={{ fontSize: "18px" }}>
                          {position.price}
                        </PositionPrice>
                      </PositionBox>
                    ))}
                  </ImageListItem>
                ))}
              </ImageList>

              {cocktails.map((elem, index) => (
                <React.Fragment key={index}>
                  <Title
                    sx={{ mt: 4, mb: 1, fontSize: '30px' }}
                    id="#Алкогольные коктейли"
                    ref={cocktailsRef}                   
                  >
                    {elem.title}
                  </Title>
                  {elem.position.map((position, index) => (
                    <PositionBox sx={{ flexDirection: "column", py: 1 }} key={index}>
                      <PositionName sx={{fontWeight: 700, letterSpacing: '2px' }}>{position.name}</PositionName>
                      <PositionPrice sx={{ fontSize: "16px" }}>
                        {position.desc}
                      </PositionPrice>
                      <PositionPrice>{position.price}</PositionPrice>
                    </PositionBox>
                  ))}
                </React.Fragment>
              ))}
            </Box>

            <Background style={{ width: "100%", height: "100%" }}>
              <div style={styles}></div>
            </Background>
          </Parallax>
        </div>
      )}
    </>
  );
}

export default App;
