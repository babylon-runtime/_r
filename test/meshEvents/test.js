var expect = chai.expect;

before(function(done){
    this.timeout(10000);
    _r.launch({
        scene :
            function() {
                // This creates a basic Babylon Scene object (non-mesh)
                // var scene = new BABYLON.Scene(engine);

                // This creates and positions a free camera (non-mesh)
                var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

                // This targets the camera to scene origin
                camera.setTarget(BABYLON.Vector3.Zero());

                // This attaches the camera to the canvas
                camera.attachControl(canvas, true);

                // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

                // Default intensity is 1. Let's dim the light a small amount
                light.intensity = 0.7;

                // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
                var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

                // Move the sphere upward 1/2 its height
                sphere.position.y = 1;

                // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
                var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

                return scene;
            }
    });
    _r.ready(done);
});

describe('plugin', function() {
    it("OnPickTrigger", function () {
        _r.select("*:mesh").on("OnPickDownTrigger", function(e) {
            console.log("OnPickDownTrigger", e);
        });
        _r.select("*:mesh").on("OnPickUpTrigger", function(e) {
            console.log("OnPickUpTrigger", e);
        });
        _r.select("*:mesh").on("OnPickTrigger", function(e) {
            console.log("OnPickTrigger", e);
        });
        _r.select("*:mesh").on("OnLeftPickTrigger", function(e) {
            console.log("OnLeftPickTrigger", e);
        });
        _r.select("*:mesh").on("OnRightPickTrigger", function(e) {
            console.log("OnRightPickTrigger", e);
        });
        _r.select("*:mesh").on("OnDoublePickTrigger", function(e) {
            console.log("OnDoublePickTrigger", e);
        });
        _r.select("*:mesh").on("OnLongPressTrigger", function(e) {
            console.log("OnLongPressTrigger", e);
        });
       expect(true).to.be.true;
    });
});

