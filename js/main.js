
// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
var app = app || {};

app.controls = {
  step: 0,  // for controlling the sphere position
  bouncingSpeed: 0.05,  // how much to move by, each draw
  rotationSpeed: 0.01,

  numParticles: 4000, //1000000,
  particleDistributionRange: 200,
  particleVelocityScale: 1.0
};

// This is the entry point to our application
app.init = () => {

  console.log('Hello!');

  // Control panel
  app.gui = new dat.GUI();
  app.gui.add(app.controls, 'bouncingSpeed', -2, 2);
  app.gui.add(app.controls, 'rotationSpeed', 0, 1);
  app.gui.add(app.controls, 'particleVelocityScale', -1, 1);

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

  app.cube = app.createCube();
  app.scene.add(app.cube);

  app.cone = app.createCone(0, 0, 0);
  app.scene.add(app.cone);


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

  app.stats = app.addStats();

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


app.addStats = () => {

  const stats = new Stats();

  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById('stats').appendChild(stats.domElement);

  return stats;
};