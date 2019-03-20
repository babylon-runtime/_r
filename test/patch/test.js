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

describe('Patching', function() {
    it("No promise", function () {
       var patch = _r.patch("sphere1", {
           position : {
               x : 5
           },
           visibility : 0.5
       });
       expect(patch.then).to.exist;
       expect(_r.select("sphere1").attr("position").x == 5).to.be.true;
       expect(_r.select("sphere1").attr("visibility") == 0.5).to.be.true;
    });
    it("Promise", function(done) {
        _r.select("ground1")[0].material = new BABYLON.StandardMaterial("material.ground1", _r.scene);
        _r.patch({
            "material.ground1" : {
                diffuseTexture : function() {
                    var defer = Q.defer();
                    var texture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.jpg", _r.scene, null, null, null, function() {
                        defer.resolve(texture);
                    });
                    return defer.promise;
                }
            }
        }).done(function() {
            expect(_r.select("material.ground1")[0].diffuseTexture.isReady() == true).to.be.true;
            done();
        })
    })
});

