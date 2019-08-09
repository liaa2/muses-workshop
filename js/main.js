
// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object

var app = app || {};

// This is the entry point to our application
app.init = () => {
  // console.log("hi");

  // The scene stores and keeps track of all the objects we are creating, including the lights and the camera
  app.scene = new THREE.Scene();

  // The camera defines our view into the scene, as originating from a particular perspective
  app.camera = new THREE.PerspectiveCamera(
    60, // field of view
    window.innerWidth / window.innerHeight, // screen ratio
    0.1, // near field (how close to the camera should we still see things)
    1000, // far field (how far away from the camera should we still see things)
  );
  
  // Where exactly is the camera in the scene?
  app.camera.position.x = -100;
  app.camera.position.y = 250;
  app.camera.position.z = 100;
  // app.camera.position.set(-100, 250, 100);

  app.camera.lookAt(app.scene.position); // Look at the origin: (x=0, y=0, z=0)
  
  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective, and renders
  // it all down to a 2D image to show in a <canvas> browser element
  app.renderer = new THREE.WebGLRenderer(); // use hardware acceleration!
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.renderer.setClearColor(0x000000); // background colour
  // ----show them when the objects are moving -----
  app.renderer.setPixelRatio(window.devicePixelRatio || 1);
  
  // Put the canvas element that the renderer has created into the actual DOM
  document.getElementById('output').appendChild(app.renderer.domElement);
  
  // Add some reference lines for the x,y,z axes (just for debugging)
  // The X axis is red. The Y axis is green. The Z axis is blue.
  app.axes = new THREE.AxesHelper(100);
  app.scene.add(app.axes);

  app.spotlight = app.createSpotlight();
  app.scene.add(app.spotlight);

  app.ambient = new THREE.AmbientLight(0x666666);
  app.scene.add(app.ambient);

  app.sphere = app.createSphere();
  app.scene.add(app.sphere);

  app.cube = app.createCube(50, 50, 0);
  app.scene.add(app.cube);

  app.cubes = [];
  for (let i = 0; i < 30; i++) {
    const range = 100;
    const cube = app.createCube(
      THREE.Math.randInt(-range, range), //x
      // 20
      THREE.Math.randInt(-range, range), //y
      THREE.Math.randInt(-range, range), //z
    );
    app.scene.add(cube);
    app.cubes.push(cube);
    
  }

  app.particleSystem = app.createParticleSystem();
  app.scene.add(app.particleSystem);

  // set initial step to 0
  app.step = 0;
  
  // Control camera position with mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera,
    app.renderer.domElement,
  )
  
  // Finally, actually render everything once:
  // app.renderer.render(app.scene, app.camera);

  // ----- replace renderer by animate() to keep updating the camera perspective ----
  app.animate(); // start the animation loop

} // init()

// Like jQuery $(document).ready()
window.onload = app.init;


app.animate = () => {
  app.animateParticleSystem();

  // Animate the sphere position

  app.step += 0.05;

  // --------- Maths! ----------
  // app.sphere.position.x = Math.cos(app.step) * 20;
  // app.sphere.position.y = 30 + Math.abs(Math.sin(app.step) * 20);
  // app.sphere.position.y += 0.1;

  app.sphere.rotation.y += 0.01; //rotationSpeed

  app.cube.rotation.x += 0.01;
  app.cube.rotation.y += 0.01;
  app.cube.rotation.z += 0.01;

  app.cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  })

  app.renderer.render(app.scene, app.camera);

  // Get this browser animation API to work out
  // when to run the animate() method again
  // (Ideally, 60 times/sec and only when the
  // window/tab is visible)

  requestAnimationFrame(app.animate);
}

app.resize = () => {
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.renderer.setSize(window.innerWidth, window.innerHeight);

  // after making changes to most of the camera's properties you will have to call .updateProjectionMatrix for the changes to take effect.
  app.camera.updateProjectionMatrix();
  // console.log("the window size has changed");
}

// window.onresize = app.init;  // overwrites any previous onresize handler
window.addEventListener('resize', app.resize);

