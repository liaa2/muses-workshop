
// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
var app = app || {};

// This is the entry point to our application
app.init = () => {

  console.log('Hello!');

  // The scene stores and keeps track of all the objects we are creating, including
  // the lights and the camera
  app.scene = new THREE.Scene();

  // The camera defines our view into the scene, as originating from a
  // particular perspective
  app.camera = new THREE.PerspectiveCamera(
    60, // field of view
    window.innerWidth / window.innerHeight,  // screen ratio
    0.1,  // near field (how close to the camera should we still see things)
    1000  // far field (how far away from the camera should we still see things)
  );

  // Where exactly is the camera in the scene?
  app.camera.position.x = -100;
  app.camera.position.y = 200;
  app.camera.position.z = 50;
  // app.camera.position.set(-30, 40, 30);

  app.camera.lookAt(app.scene.position)  // Look at the origin: (x=0, y=0, z=0)


  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective, and renders
  // it all down to a 2D image to show in a <canvas> browser element
  app.renderer = new THREE.WebGLRenderer(); // use hardware acceleration!
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.renderer.setClearColor(0x000000);  // background colour

  // shadows are computationally expensive, and thus disabled by default
 
  // Put the canvas element that the renderer has created into the actual DOM
  document.getElementById('output').appendChild(app.renderer.domElement);

  // Add some reference lines for the x,y,z axes (just for debugging)
  app.axes = new THREE.AxesHelper( 100 );
  app.scene.add( app.axes );

  app.cube = app.createCube(-50, 100, 80);
  app.scene.add(app.cube);

  app.cubes = [];
  for (let i = 0; i < 30; i++) {
    const range = 60;
    const cube = app.createCube(
      THREE.Math.randInt(-range, range), // x
      // 20,
      THREE.Math.randInt(-range, range), // y
      THREE.Math.randInt(-range, range), // z
    );
    app.scene.add(cube);
    app.cubes.push(cube);
  }

  app.sphere = app.createSphere();
  app.scene.add(app.sphere);


  app.particleSystem = app.createParticleSystem();
  app.scene.add(app.particleSystem);


  app.spotlight = app.createSpotlight();
  app.scene.add(app.spotlight);

  app.ambient = new THREE.AmbientLight(0x666666);
  app.scene.add(app.ambient);

  // Finally, actually render everything once:
  // app.renderer.render( app.scene, app.camera );

  // Control camera position with mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera,
    app.renderer.domElement
  );

  app.animate();  // start the animation loop

}; // init()

// Like jQuery $(document).ready()
window.onload = app.init;


app.resize = () => {
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(window.innerWidth, window.innerHeight);
};

// window.onresize = app.init;  // overwrites any previous onresize handler
window.addEventListener('resize', app.resize);
