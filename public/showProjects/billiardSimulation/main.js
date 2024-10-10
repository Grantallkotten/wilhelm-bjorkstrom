// Import list
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { eulerApproximation } from "./euler.js";
import { ballCollision } from "./collision.js";
import { wallDetection } from "./collision.js";

// Camera, camera controls, render, scene and more
let gameDiv;
let camera = new THREE.PerspectiveCamera(
  38,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const controls = new OrbitControls(camera, renderer.domElement);
let windowHalfX = window.innerWidth / 2;
let windowHalfZ = window.innerHeight / 2;
let clock = new THREE.Clock();

// Object3D ("Group") nodes and Mesh nodes
let sceneRoot = new THREE.Group();
let ambLight = new THREE.AmbientLight(0xf1efe5, 0.6);
let angleDisplayMesh;
let angleDisplaySpin = new THREE.Group();
let angleDisplayTrans = new THREE.Group();
let cueMesh = new THREE.Group();

// Constants
const massBall = 0.165;
const radiusBall = 0.0286;
const holeRadius = 2.5 * radiusBall;
const my = 0.027;
const g = 9.82;
const theta = 0.1;
const frictionGround = (5 / 7) * massBall * 9.82 * theta;
const playPlaneL = 2.87;
const playPlaneW = 1.27;
const angleIncreaseValue = Math.PI / 180; // 1 deg per click
const energyLoss = 0.08;
const maxHitForce = 380;

// Ball and hole var
let balls = [];
let holes = [];
let holePositions = [];
let hitAngle = Math.PI;
let materialBallArray = [];
let hitForce = 370;
let billiardsFormation = true; // If ar random formation is needed for testing set to false

class ball {
  constructor(radius, mass, acceleration, velocity, position) {
    this.radius = radius;
    this.mass = mass;
    this.acceleration = acceleration;
    this.velocity = velocity;
    this.position = position;
    this.prevPosition;
    this.spin = new THREE.Group();
    this.trans = new THREE.Group();
    this.mesh;
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
    this.material = new THREE.MeshLambertMaterial();
  }
}

// Creates the cue ball as the first ball
let cueBall = new ball(
  radiusBall,
  massBall,
  new THREE.Vector3(0 / massBall, 0 / massBall, 0 / massBall),
  new THREE.Vector3(0.0, 0.0, 0.0),
  new THREE.Vector3(-1.0, 0.0, 0.0)
);
balls.push(cueBall);

// Creates the balls
let dummyPositionX = 0.7; // Start-position on the X-axis for the balls
let dummyPositionZ = 0.0; // Start-position on the Z-axis for the balls
let nrOfRows = 5;
let dummyCounter = 1;
for (let index = 0; index < nrOfRows; ++index) {
  if (billiardsFormation) {
    for (let index2 = 0; index2 < dummyCounter; ++index2) {
      let aBall = new ball(
        radiusBall,
        massBall,
        new THREE.Vector3(0 / massBall, 0 / massBall, 0 / massBall),
        new THREE.Vector3(0.0, 0.0, 0.0),
        new THREE.Vector3(dummyPositionX, 0.0, dummyPositionZ)
      );
      balls.push(aBall);
      dummyPositionZ -= 2 * radiusBall;
    }
    dummyPositionZ += 3 * radiusBall - (1 - dummyCounter) * 2 * radiusBall;
    dummyPositionX += 2 * radiusBall;
    ++dummyCounter;
  } else {
    let aBall = new ball(
      radiusBall,
      massBall,
      new THREE.Vector3(0 / massBall, 0 / massBall, 0 / massBall),
      new THREE.Vector3(0.0, 0.0, 0.0),
      new THREE.Vector3(dummyPositionX, 0.0, dummyPositionZ)
    );
    balls.push(aBall);
    dummyPositionX += 2 * radiusBall;
    dummyPositionZ = Math.random() * 0.5 - Math.random() * 0.5;
  }
}

// Creates play-board plane
const geometryPlane = new THREE.PlaneGeometry(playPlaneL, playPlaneW);
//const materialPlane = new THREE.MeshBasicMaterial( {color: 0x14960d, side: THREE.DoubleSide} );
const materialPlane = new THREE.ShadowMaterial({}); // A shadow material is invisible
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.receiveShadow = true;
plane.rotation.x = 90 * (3.14 / 180);
plane.position.set(0, -radiusBall, 0.0);
sceneRoot.add(plane);

// Creates holes
const geometryHole = new THREE.CircleGeometry(holeRadius, 32);
const materialHole = new THREE.MeshBasicMaterial({
  color: 0x000000,
  side: THREE.DoubleSide,
});
dummyCounter = 0;
for (let indexA = 0; indexA < 3; ++indexA) {
  for (let indexB = 0; indexB < 3; ++indexB) {
    if (indexB != 1) {
      holes[dummyCounter] = new THREE.Mesh(geometryHole, materialHole);
      holes[dummyCounter].position.set(
        ((indexA - 1) * playPlaneL) / 2,
        -radiusBall + 0.001,
        ((indexB - 1) * playPlaneW) / 2
      );
      holes[dummyCounter].rotation.x = 90 * (3.14 / 180);
      holePositions[dummyCounter] = holes[dummyCounter].position;
      sceneRoot.add(holes[dummyCounter]);
      ++dummyCounter;
    }
  }
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfZ = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createSceneGraph() {
  // Top-level node
  scene.add(sceneRoot);
  sceneRoot.add(ambLight);

  // Light
  const pointLight = new THREE.PointLight(0xfbfff4, 0.7, 0);
  pointLight.position.set(playPlaneW / 2, 4, playPlaneL / 2);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024; // Shadow quality
  pointLight.shadow.mapSize.height = 1024;

  scene.add(pointLight);

  for (let index = 0; index < balls.length; ++index) {
    balls[index].castShadow = true;
    balls[index].receiveShadow = true;
    sceneRoot.add(balls[index].spin);
    balls[index].spin.add(balls[index].trans);
    balls[index].trans.add(balls[index].mesh);

    balls[index].trans.scale.set(radiusBall, radiusBall, radiusBall);
    balls[index].trans.position.set(
      balls[index].position.x,
      balls[index].position.y,
      balls[index].position.z
    );
  }
  // Import pool table
  const loader = new GLTFLoader();
  loader.load("./blend/klartbord.glb", function (gltf) {
    gltf.scene.rotation.y = Math.PI / 2;
    gltf.scene.scale.set(1.25, 1.3, 1.45);
    gltf.scene.position.y = -0.8;

    scene.add(gltf.scene);
  });
  loader.load("./blend/room24.glb", function (gltf) {
    gltf.scene.rotation.y = Math.PI / 2;
    gltf.scene.scale.set(0.5, 0.4, 0.6);
    gltf.scene.position.y = -0.8;

    scene.add(gltf.scene);
  });

  // Adds the pool cue
  balls[0].trans.add(angleDisplaySpin);
  angleDisplaySpin.add(angleDisplayTrans);
  //angleDisplayTrans.add(angleDisplayMesh);
  angleDisplaySpin.position.set(
    (hitForce / 70) * Math.cos(hitAngle),
    0.0,
    (hitForce / 70) * Math.sin(hitAngle)
  );
}

function userInputs() {
  document.onkeydown = function (event) {
    // Alert the key name and key code on keydown
    //alert(`Key pressed: ${event.key} \nKey code value: ${event.code}`);
    angleDisplaySpin.position.set(
      (hitForce / 70) * Math.cos(hitAngle),
      0.0,
      (hitForce / 70) * Math.sin(hitAngle)
    );

    if (event.code == "Space" && breakBOOL) {
      angleDisplaySpin.position.set(0.0, 0.0, 0.0);
      let delayInMilliseconds = 80;
      setTimeout(function () {
        balls[0].acceleration.set(
          -hitForce * Math.cos(hitAngle),
          0.0,
          -hitForce * Math.sin(hitAngle)
        );
        breakBOOL = false;
        cueMesh.visible = false;
        angleDisplaySpin.position.set(
          (hitForce / 100) * Math.cos(hitAngle),
          0.0,
          (hitForce / 100) * Math.sin(hitAngle)
        );
      }, delayInMilliseconds);
    } else if (event.code == "ArrowUp" && hitForce < maxHitForce) {
      hitForce += 10;
      if (hitForce > maxHitForce) {
        hitForce = maxHitForce;
      }
    } else if (event.code == "ArrowDown" && hitForce > 10) {
      hitForce -= 10;
      if (hitForce < 10) {
        hitForce = 10;
      }
    } else if (event.code == "KeyR") {
      // location.reload()
      breakBOOL = false;

      resetBalls();
    } else if (event.code == "ArrowRight") {
      //document.getElementById("displayAngle").innerHTML = Math.round(hitAngle*180/Math.PI * 100) / 100;
      hitAngle += angleIncreaseValue;
      angleDisplayTrans.rotation.y = Math.PI - hitAngle;
    } else if (event.code == "ArrowLeft") {
      hitAngle -= angleIncreaseValue;
      angleDisplayTrans.rotation.y = Math.PI - hitAngle;
    }
    if (event.code == "KeyQ") {
      //confirm("Press a button!")
      for (let index = 0; index < balls.length; ++index) {
        balls[index].acceleration = new THREE.Vector3(
          (Math.random() * 2 - 1) * 40.0,
          0.0,
          (Math.random() * 2 - 1) * 41.0
        );
      }
    }
    if (event.code == "KeyB") {
      if (billiardsFormation) {
        billiardsFormation = false;
      } else {
        billiardsFormation = true;
      }
    }
    if (event.code == "KeyL") {
      for (let index = 0; index < balls.length; ++index) {
        balls[index].position.y += -1.0;
      }
    }
    if (event.code == "KeyP") {
      balls[0].velocity = new THREE.Vector3(
        (Math.random() * 2 - 1) * 10.0,
        0.0,
        (Math.random() * 2 - 1) * 11.0
      );
    }
    if (event.code == "KeyW") {
      for (let index = 1; index < balls.length; ++index) {
        balls[index].velocity = new THREE.Vector3(
          Math.random() * 0.2 + 0.1,
          0.0,
          Math.random() * 0.2 + 0.1
        );
      }
    }
    if (event.code == "KeyV") {
      for (let index = 1; index < balls.length; ++index) {
        balls[index].velocity = new THREE.Vector3(
          Math.random() * 0.2 + 0.1,
          0.0,
          Math.random() * 0.2 + 0.1
        );
      }
    }
    if (event.code == "KeyS") {
      balls[0].velocity = new THREE.Vector3(0.0, 0.0, 0.0);
    }
  };
}

let breakBOOL = false;
let eulerReturn = [0, 0, 0];
let ballCollisionReturn;
let delta;
let ballsOfBoard = 0;

function render() {
  // Perform animations
  if (!breakBOOL) {
    // Denna if gör inget för tillfället

    cueMesh.visible = false;
    renderer.setClearColor(0xdff1fc);
    breakBOOL = true;
    ballsOfBoard = 0;

    for (let index = 0; index < balls.length; ++index) {
      // Första loopen som euleraproximerar och ritar
      balls[index].prevPosition = balls[index].position;

      // Euleraproximerar nästa värde
      eulerReturn = eulerApproximation(
        balls[index].acceleration,
        balls[index].velocity,
        balls[index].position,
        1,
        delta
      );
      balls[index].velocity = eulerReturn[0]; // Sparar hastigheten
      balls[index].position = eulerReturn[1]; // Sparar positionen

      // Loopar för att kolla kollision med andra bollar
      for (let index2 = index + 1; index2 < balls.length; ++index2) {
        if (
          balls[index2].position.clone().distanceTo(balls[index].position) <
            2 * radiusBall &&
          balls[index].position.y == 0.0 &&
          balls[index2].position.y == 0.0
        ) {
          ballCollisionReturn = ballCollision(
            balls[index],
            balls[index2],
            g,
            my,
            energyLoss
          );
          balls[index] = ballCollisionReturn[0];
          balls[index2] = ballCollisionReturn[1];
        }
      }

      // Sätter ut värdet för euler
      balls[index].trans.position.set(
        balls[index].position.x,
        balls[index].position.y,
        balls[index].position.z
      );

      // Beräknar friktionen i marken med avsende på hastigheten
      balls[index].acceleration = balls[index].velocity
        .clone()
        .normalize()
        .multiplyScalar(-frictionGround);

      // Roterar bollen (EJ KORREKT JUST NU) OBS! v = r * w
      // w = v / r => angle ~ euler(v/r)
      // rotation.x = rotation.x + delta*velocity.x/ballRadius
      // https://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
      var theAxis = new THREE.Vector3(
        balls[index].velocity.z,
        0,
        -balls[index].velocity.x
      );
      rotateAroundObjectAxis(
        balls[index].mesh,
        theAxis,
        (delta * balls[index].velocity.length()) / radiusBall
      );
      //balls[index].trans.rotation.x += delta*balls[index].velocity.z/radiusBall;
      //balls[index].trans.rotation.z += delta*balls[index].velocity.x/radiusBall;

      // Kollar kollision med väggar
      wallDetection(balls[index], energyLoss);

      // Kollar om en boll är på/i ett hål
      for (let indexHole = 0; indexHole < holePositions.length; ++indexHole) {
        if (
          Math.pow(balls[index].position.x - holePositions[indexHole].x, 2) +
            Math.pow(balls[index].position.z - holePositions[indexHole].z, 2) <
          Math.pow(0.9 * holeRadius, 2)
        ) {
          balls[index].position.x = 0.0;
          balls[index].position.y = -1.0;
          balls[index].position.z = 0.0;

          balls[index].velocity.set(0.0, 0.0, 0.0);
        }
      }

      // Stannar bollen om hastigheten är liten
      if (
        Math.abs(balls[index].velocity.x) < 0.04 &&
        Math.abs(balls[index].velocity.z) < 0.04
      ) {
        balls[index].velocity.set(0.0, 0.0, 0.0);
      } else {
        breakBOOL = false;
      }
      if (balls[index].position.y < 0.0) {
        ballsOfBoard++;
      }
    }
    if (
      ballsOfBoard >= balls.length ||
      (ballsOfBoard >= balls.length - 1 && balls[0].position.y >= 0)
    ) {
      // Show "End of game"
      var endOfGameDivs = document.getElementsByClassName("show-end-of-game");

      // Loop through the elements
      for (var i = 0; i < endOfGameDivs.length; i++) {
        endOfGameDivs[i].style.display = "block";
      }
    }
  } else {
    renderer.setClearColor(0xcce9f9);
    cueMesh.visible = true;
    if (balls[0].position.y < 0.0) {
      balls[0].position.set(-1.0, 0.0, 0.0);
      balls[0].trans.position.set(
        balls[0].position.x,
        balls[0].position.y,
        balls[0].position.z
      );
      balls[0].acceleration.set(0.0, massBall * g, 0.0);
    }
  }
  angleDisplayTrans.position.set(
    6.5 * Math.cos(hitAngle),
    0.2,
    6.5 * Math.sin(hitAngle)
  );

  userInputs(); // Fetch user inputs

  // Render the scene
  renderer.render(scene, camera);
}

function animate() {
  controls.update(); // For orbitControls
  delta = clock.getDelta(); // delta = fps = h
  requestAnimationFrame(animate); // Request to be called again for next frame
  render();
}

// Rotate an object around an arbitrary axis in world space
var rotWorldMatrix;
// Object is the ball.mesh. Axis is the rotational vector. Radians is the euleraproximation of v (delta*balls[index].velocity.z/radiusBall)
// https://stackoverflow.com/questions/11060734/how-to-rotate-a-3d-object-on-axis-three-js
function rotateAroundObjectAxis(object, axis, radians) {
  rotWorldMatrix = new THREE.Matrix4(); // Används som rotationmatris
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians); // Roterar med hjälp av matrisen

  rotWorldMatrix.multiply(object.matrix); // pre-multiply
  object.matrix = rotWorldMatrix; // Sparar matrsen till framtiden i tillhörande mesh
  object.rotation.setFromRotationMatrix(object.matrix); // Roterar meshen
}

function init() {
  gameDiv = document.getElementById("game");

  camera.position.set(0.0, 1.0, 1.0);
  controls.target = new THREE.Vector3(0, 0, 0); // Point camera at center of table
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.maxDistance = 4.5;
  controls.minDistance = 2.5;
  controls.minPolarAngle = 0; // Set to 0
  controls.maxPolarAngle = Math.PI / 2.5;
  controls.saveState();

  let texloader = new THREE.TextureLoader();

  let geometryAngleDisplay = new THREE.BoxGeometry(10, 0.5, 0.5);
  let materialAngleDisplay = new THREE.MeshLambertMaterial();

  //angleDisplayMesh = new THREE.Mesh(geometryAngleDisplay, materialAngleDisplay);

  // Add cueMesh
  const loader = new GLTFLoader();
  loader.load("./blend/biljardkon.glb", function (gltf) {
    cueMesh = gltf.scene;
    cueMesh.rotation.z = 1.036 * Math.PI;
    cueMesh.rotation.y = -Math.PI;

    cueMesh.scale.set(40.0, 40.0, 40.0);
    cueMesh.position.set(5.0, 0.2, 0.0);
    cueMesh.castShadow = true;
    angleDisplayTrans.add(cueMesh);
  });
  let texCounter = 0;
  for (let index = 0; index < balls.length; ++index) {
    ++texCounter;
    materialBallArray.push(new THREE.MeshStandardMaterial({}));
    materialBallArray[index].map = texloader.load(
      "./tex/ballTex/" + texCounter + ".jpg"
    );
    balls[index].mesh = new THREE.Mesh(
      balls[index].geometry,
      materialBallArray[index]
    );
    balls[index].castShadow = true;
    /*
        if (index == 0){
            materialBallArray[index].map = texloader.load('tex/2k_earth_daymap.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
            balls[index].castShadow = true
        }else if (index == 1){
            materialBallArray[index].map = texloader.load('tex/2k_jupiter.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
        }else if (index > 10){
            materialBallArray[index].map = texloader.load('tex/2k_neptune.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
        }else if (index > 6){
            materialBallArray[index].map = texloader.load('tex/2k_moon.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
        }else if (index > 3){
            materialBallArray[index].map = texloader.load('tex/2k_sun.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
        }
        else{
            materialBallArray[index].map = texloader.load('tex/2k_mars.jpg');
            balls[index].mesh = new THREE.Mesh(balls[index].geometry, materialBallArray[index]);
        }*/
  }
  createSceneGraph();
  renderer.setClearColor(0xdff1fc);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.aspect = gameDiv.clientWidth / gameDiv.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(gameDiv.clientWidth, gameDiv.clientHeight);
  gameDiv.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);
}

function resetBalls() {
  var endOfGameDivs = document.getElementsByClassName("show-end-of-game");

  // Loop through the elements
  for (var i = 0; i < endOfGameDivs.length; i++) {
    endOfGameDivs[i].style.display = "none";
  }
  // Creates the balls
  let dummyPositionX = 0.7; // Start-position on the X-axis for the balls
  let dummyPositionZ = 0.0; // Start-position on the Z-axis for the balls
  let nrOfRows = 5;
  let dummyCounter = 1;
  let counterIndex = 0;
  balls[counterIndex].position.set(-1.0, 0.0, 0.0);
  balls[counterIndex].acceleration.set(0.0, 0.0, 0.0);
  balls[counterIndex].velocity.set(0.0, 0.0, 0.0);
  ++counterIndex;

  for (let index = 0; index < nrOfRows; ++index) {
    if (billiardsFormation) {
      for (let index2 = 0; index2 < dummyCounter; ++index2) {
        balls[counterIndex].position.set(dummyPositionX, 0.0, dummyPositionZ);
        balls[counterIndex].acceleration.set(0.0, 0.0, 0.0);
        balls[counterIndex].velocity.set(0.0, 0.0, 0.0);
        dummyPositionZ -= 2 * radiusBall;
        ++counterIndex;
      }
      dummyPositionZ += 3 * radiusBall - (1 - dummyCounter) * 2 * radiusBall;
      dummyPositionX += 2 * radiusBall;
      ++dummyCounter;
    } else {
      for (let index = 0; index < balls.length; ++index) {
        balls[index].position.set(
          Math.random() * 0.5 - Math.random() * 0.5,
          0.0,
          Math.random() * 0.5 - Math.random() * 0.5
        );
        balls[index].acceleration.set(0.0, 0.0, 0.0);
        balls[index].velocity.set(0.0, 0.0, 0.0);
      }
    }
  }
}

init(); // Set up the scene
animate(); // Enter an infinite loop
