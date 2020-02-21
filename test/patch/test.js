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
    it("Patch current scene", function() {
        _r.patch({
            "scene" : {
                clearColor : {
                    r: 1,
                    g: 1,
                    b: 0
                }
            }
        });
        expect(_r.scene.clearColor.r === 1 && _r.scene.clearColor.g === 1 && _r.scene.clearColor.b === 0).to.be.true;
    });
    it("No promise", function (done) {
       var patch = _r.select("sphere1").patch({
           position : {
               x : 5
           },
           visibility : 0.5
        }).then(function() {
           expect(_r.select("sphere1").attr("position").x === 5).to.be.true;
           expect(_r.select("sphere1").attr("visibility") === 0.5).to.be.true;
           done();
       });
        expect(_r.select("sphere1").attr("position").x === 5).to.be.true;
        expect(_r.select("sphere1").attr("visibility") === 0.5).to.be.true;

    });
    it("Promise", function(done) {
        this.timeout(10000);
        _r.select("ground1")[0].material = new BABYLON.StandardMaterial("material.ground1", _r.scene);
        _r.patch([{
            "material.ground1" : {
                diffuseTexture : function() {
                    return new Promise((resolve, reject) => {
                        var texture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.jpg", _r.scene, null, null, null, function() {
                            resolve(texture);
                        });
                        return texture;
                    })
                }
            }
        }]).then(function() {
            expect(_r.select("material.ground1")[0].diffuseTexture.isReady() === true).to.be.true;
            done();
        })
    });
    it('global patch', function(done) {
        let patch = _r.select("*:mesh").globalPatch([
            {
                "sphere1" : {
                    position : {
                        x : 10
                    },
                    "visibility" : 1
                }
            },
            {
                "ground1" : {
                    visibility : 0.5
                }
            }
        ]).then(() => {
            expect(patch.then).to.exist;
            expect(_r.select("sphere1").attr("position").x === 10).to.be.true;
            expect(_r.select("sphere1").attr("visibility") === 1).to.be.true;
            expect(_r.select("ground1").attr("visibility") === 0.5).to.be.true;
            done();
        })

    });
    it("plugins", function() {
        _r.patch.registerPlugin({
            test : function(element, source, property) {
                return property === "pluginTest"
            },
            resolve : function(element, source, property) {
                if(!element.material) {
                    element.material = new BABYLON.StandardMaterial('sphere1.material', _r.scene);
                }
                return _r.select(element.material).patch(source[property]);
            }
        });
        _r.select("sphere1").patch({
            "pluginTest" : {
                diffuseColor : 'red'
            }
        });
        expect(_r.select("sphere1").attr("material").diffuseColor.r === 1).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.g === 0).to.be.true
        expect(_r.select("sphere1").attr("material").diffuseColor.b === 0).to.be.true
    });
    it("should provide contexts", function() {
        var mesh, material;
        _r.select("sphere1").patch({
            material : {
                diffuseColor : function(_mesh, _material) {
                    mesh = _mesh;
                    material = _material;
                    return _r.color("blue");
                }
            }
        });
        expect(mesh.name === "sphere1").to.be.true;
        expect(material.name === 'sphere1.material').to.be.true;
    });

    it("should execute inside patches", function() {
        var scene, mesh, material;
        _r.patch([{
            "execute" : function() {
                scene = this;
            }
        }, {
            "sphere1" : {
                material : {
                    execute : function(_mesh, _material) {
                        mesh = _mesh;
                        material = _material;
                    }
                }
            }
        }]);
        expect(_r.is.Scene(scene)).to.be.true;
        expect(mesh.name === "sphere1" && material.name === "sphere1.material").to.be.true;
    });
    it("should patch data", function() {
        _r.patch({
            "sphere1" : {
                data : {
                    key1 : "value1",
                    key2 : {
                        hello : "world"
                    }
                }
            },
            "ground1" : {
                "material" : {
                    data : {
                        func1 : function(mesh, material) {
                           return {
                               meshName : mesh.name,
                               materialName : material.name
                           }
                        }
                    }
                }
            }
        });
        expect(_r.select("sphere1").data("key1") === "value1").to.be.true;
        expect(_r.select("sphere1").data("key2").hello === "world").to.be.true;
        var func = _r.select("material.ground1").data("func1");
        var res = func();
        expect(res.meshName === "ground1").to.be.true;
        expect(res.materialName === "material.ground1").to.be.true;
    });
    it('should patch events', function() {
        _r.patch([{
            "sphere1" : {
                "on" : {
                    "event1" : {
                        "material" : {
                            diffuseColor : "red"
                        }
                    }
                }
            }
        }]);
        _r.select("sphere1").trigger('event1');
        expect(_r.select("sphere1").attr("material").diffuseColor.r === 1).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.g === 0).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.b === 0).to.be.true;
        _r.select("sphere1").attr("material").diffuseColor = _r.color("blue");
        _r.patch([{
            "sphere1" : {
                "off" : "event1"
            }
        }]);
        _r.select("sphere1").trigger('event1');
        expect(_r.select("sphere1").attr("material").diffuseColor.r === 0).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.g === 0).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.b === 1).to.be.true;
        _r.patch([{
            "sphere1" : {
                "on" : {
                    "event1" : {
                        "material" : {
                            diffuseColor : "green"
                        }
                    }
                },
                "trigger" : "event1"
            }
        }]);
        expect(_r.select("sphere1").attr("material").diffuseColor.r === 0).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.g === 1).to.be.true;
        expect(_r.select("sphere1").attr("material").diffuseColor.b === 0).to.be.true;
    })
});

