var expect = chai.expect;

before(function(done) {
    this.timeout(10000);
    _r.launch({
        scene : function() {
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
        },
        patch : [
            {
                "sphere1": {
                    material : function() {
                        return new BABYLON.StandardMaterial("material.sphere1", _r.scene)
                    }
                }
            },
            {
                "material.sphere1" : {
                    diffuseTexture : function() {
                        //return new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.jpg", _r.scene);
                    }
                }
            }
        ]
    });
    _r.ready(done);
});

describe('Download without add to the scene', function() {
    this.timeout(10000);
    it('preload', function(done) {
        _r.load("https://www.babylonjs-playground.com/textures/grass.jpg").then(function (img) {
            expect(_r.is.DOM.image(img)).to.be.true;
            _r.load("https://models.babylonjs.com/CornellBox/cornellBox.babylon").then(function (assets) {
                expect(_r.is.AssetContainer(assets)).to.be.true;
                done();
            });
        });
    });
    it('array of resources', function(done) {
        _r.load(["https://www.babylonjs-playground.com/textures/grass.jpg", "https://models.babylonjs.com/CornellBox/cornellBox.babylon"]).then(function(result) {
            expect(_r.is.DOM.image(result[0])).to.be.true;
            expect(_r.is.AssetContainer(result[1])).to.be.true;
            done();
        })
    });
    it('load css', function(done){
        _r.load('style.css').then(function() {
            expect(getComputedStyle(document.body).getPropertyValue('background-color') === 'rgb(128, 128, 128)').to.be.true;
            done();
        });
    });
    it('load json', function(done) {
        _r.load("data.json").then(function(data) {
            expect(data.hello === "world").to.be.true;
            done();
        })
    });
    it('load js', function(done) {
        _r.load("app.js").then(function() {
            expect(_r.select("ground1").attr('material')).to.be.instanceOf(BABYLON.StandardMaterial);
            done();
        });
    });
});