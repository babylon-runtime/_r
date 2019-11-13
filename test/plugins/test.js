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
    this.timeout(10000);
    it("select plugin", function () {
        _r.fn.standardMaterial = function(options) {
            this.each(function(element){
               element.material = new BABYLON.StandardMaterial('material.' + element.name, _r.scene);
               _r.select(element.material).patch(options);
            });

        };
        _r.select('sphere1, ground1').standardMaterial({
            diffuseColor : "red",
            emissiveColor : {
                r : 0,
                g : 1,
                b : 0
            }
        });
        expect(_r.select('sphere1')[0].material.diffuseColor.r == 1).to.be.true;
        expect(_r.select('sphere1')[0].material.diffuseColor.g == 0).to.be.true;
        expect(_r.select('ground1')[0].material.diffuseColor.r == 1).to.be.true;
        expect(_r.select('sphere1')[0].material.emissiveColor.g == 1).to.be.true;
        expect(_r.select('sphere1')[0].material.emissiveColor.r == 0).to.be.true;
    });
    it("patch plugin", function() {
        _r.patch.registerPlugin({
            test(element, source, property) {
                return property === "pbr";
            },
            resolve(element, source, property) {
                element.material = new BABYLON.PBRMaterial("", _r.scene);
                 return _r.select(element.material).patch(source[property], false);
            }
        });
        _r.patch({
            "sphere1, ground1" : {
                pbr : {
                    microSurface : 0.96,
                    albedoColor : {
                        r : 0.206,
                        g : 0.94,
                        b : 1
                    },
                    reflectivityColor : {
                        r : 0.003,
                        g : 0.003,
                        b : 0.003
                    }
                }
            }
        });
        var material = _r.select("ground1")[0].material
        expect(material instanceof BABYLON.PBRMaterial).to.be.true;
        expect(material.microSurface == 0.96).to.be.true;
        expect(material.albedoColor.r == 0.206).to.be.true;
        expect(material.reflectivityColor.r == 0.003).to.be.true;
    });
    it('patch plugin with promise', function(done) {
        _r.patch.registerPlugin({
            test(element, source, property) {
                return property === "pbr2";
            },
            resolve(element, source, property) {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        element.material = new BABYLON.PBRMaterial("", _r.scene);
                        _r.select(element.material).patch(source[property]).then(function() {
                            resolve()
                        });
                    }, 1000);
                })
            }
        });
        _r.select("sphere1").patch({
            pbr2 : {
                microSurface : 0.96,
                reflectionTexture : function() {
                  return new Promise(function(resolve) {
                      var texture = new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/environment.dds", _r.scene, null, false, null, function(){
                          return resolve(texture);
                      }, null, null, true, null, true);
                  })
                },
                albedoColor : {
                    r : 0.01,
                    g : 0.01,
                    b : 0.01
                },
                reflectivityColor : {
                    r : 0.085,
                    g : 0.085,
                    b : 0.085
                }
            }
        }).then(function() {
            var material = _r.select("sphere1")[0].material;
            expect(material.albedoColor.r == 0.01).to.be.true;
            expect(material.reflectivityColor.r == 0.085).to.be.true;
            expect(material.reflectionTexture.isReady() == true).to.be.true;
            done();
        });
    })
});

