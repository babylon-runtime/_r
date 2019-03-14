var expect = chai.expect;

before(function(done) {
    this.timeout(10000)
    _r.patch([
        {
            "scene" : function() {
                _r.activeCamera(new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene));

                [1, 2, 3, 4, 5].forEach(function(i) {
                    BABYLON.Mesh.CreateSphere("Sphere"+i, 32, 3, scene);
                });
                new BABYLON.PointLight("Omni0", new BABYLON.Vector3(-17.6, 18.8, -49.9), scene);
                var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
                var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
                skybox.material = skyboxMaterial;
            }
        },
        {
            'Camera' : {
                position : new BABYLON.Vector3(-15, 3, 0)
            }
        },
        {
            'Sphere*' : {
                material : function(mesh) {
                    return new BABYLON.StandardMaterial('material.' + mesh.name);
                }
            }
        },
        {
            'material.Sphere*, skyBoxMaterial' : {
                reflectionTexture : function() {
                    return new BABYLON.CubeTexture("https://www.babylonjs-playground.com/textures/TropicalSunnyDay", _r.scene);
                },
            }
        },
        {
            'Sphere1' : {
                material : {
                    diffuseColor : "black",
                    emissiveColor : new BABYLON.Color3(0.5,0.5,0.5),
                    alpha : 0.2,
                    specularPower : 16,
                    // created by patch automatically
                    reflectionFresnelParameters : {
                        bias : 0.1
                    },
                    emissiveFresnelParameters : {
                        bias : 0.6,
                        power : 4,
                        leftColor : "white",
                        rightColor : "black"
                    },
                    opacityFresnelParameters : {
                        leftColor : "white",
                        rightColor : "black"
                    }
                }
            }
        },
        {
            'Sphere2' : {
                position : {
                    z : function() {
                        return this.z - 5;
                    }
                },
                material : {
                    diffuseColor : "black",
                    emissiveColor : new BABYLON.Color3(0.5,0.5,0.5),
                    specularPower : 32,
                    reflectionFresnelParameters : {
                        bias : 0.1
                    },
                    emissiveFresnelParameters : {
                        bias : 0.5,
                        power : 4,
                        leftColor : "white",
                        rightColor : "black",

                    }
                }
            }
        },
        {
            "Sphere3" : {
                position : {
                    z : function() {
                        return this.z + 5;
                    }
                },
                material : {
                    diffuseColor : "black",
                    emissiveColor : "white",
                    specularPower : 64,
                    alpha : 0.2,
                    emissiveFresnelParameters : {
                        bias : 0.2,
                        leftColor : "white",
                        rightColor : "black"
                    },
                    opacityFresnelParameters:  {
                        power : 4,
                        leftColor : "white",
                        rightColor : "black"
                    }
                }
            }
        },
        {
           "Sphere4" : {
               position : {
                   x : function() {
                       return this.x + 5;
                   }
               },
               material : {
                   diffuseColor : "black",
                   emissiveColor : "white",
                   specularPower : 64,
                   emissiveFresnelParameters : {
                       power : 4,
                       bias : 0.5,
                       leftColor : "white",
                       rightColor : "black"
                   }
               }
           }
        },
        {
            "Sphere5" : {
                position : {
                    x : function() {
                        return this.x - 5
                    }
                },
                material : {
                    specularPower : 64,
                    emissiveColor : new BABYLON.Color3(0.2, 0.2, 0.2),
                    diffuseColor : "black",
                    power : 2,
                    leftColor : "black",
                    rightColor : "white",
                    reflectionTexture : {
                        level : 0.5
                    },
                    emissiveFresnelParameters : {
                        bias : 0.4,
                        power : 2,
                        leftColor : "white",
                        rightColor : "black"
                    }
                }
            }
        },
        {
            "skyBoxMaterial" : {
                backFaceCulling : false,
                diffuseColor : "black",
                specularColor : "black",
                disableLighting : true,
                reflectionTexture : {
                    coordinatesMode : BABYLON.Texture.SKYBOX_MODE
                }
            }
        }
    ]).then(function() {
        // console.log("done call", _r.scene.activeCamera.name);
        done();
    });
});

describe('plane', function() {
    it("work", function() {
        expect(_r.select("Sphere1")[0].material.alpha === 0.2).to.be.true;
    })

});