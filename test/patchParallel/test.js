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

describe('Patch Parallel', function() {
   it("should works", function(done) {
       let test = '';
      _r.patch({
          "patchParallel" : [{
              "execute" : function() {
                  return new Promise(function(resolve, reject) {
                      setTimeout(function() {
                          test += '1';
                          resolve();
                      }, 1000);
                  });
              }
          }, {
              "execute" : function() {
                  return new Promise(function(resolve, reject) {
                      setTimeout(function() {
                          test += '2';
                          resolve();
                      }, 500)
                  })
              }
          }],
          "execute" : function() {
              test += '3';
          }
      }).then(function() {
         expect(test === '213').to.be.true;
          done();
      })
   });
   it("parallel in elements", function(done){
       this.timeout(5000);
       _r.patch([{
           "sphere1, ground1" : {
               "material" : function(mesh) {
                   return new BABYLON.StandardMaterial('material.' + mesh.name, _r.scene);
               }
           },
           "material.*" : {
               "patchParallel" : [
                   {
                       "diffuseTexture" : function() {
                           return new Promise(function(resolve) {
                               setTimeout(function() {
                                   _r.load.texture("https://www.babylonjs-playground.com/textures/grass.jpg").then(function(tex) {
                                       resolve(tex)
                                   })
                               }, 500);
                           });
                       }
                   },
                   {
                       "emissiveTexture" : function() {
                           return _r.load.texture("https://www.babylonjs-playground.com/textures/misc.jpg");
                       }
                   }
               ]
           }
       }]).then(function() {
            expect(_r.select("material.sphere1").attr('diffuseTexture').isReady()).to.be.true;
            expect(_r.select("material.sphere1").attr('emissiveTexture').isReady()).to.be.true;
            expect(_r.select("material.ground1").attr('diffuseTexture').isReady()).to.be.true;
            expect(_r.select("material.ground1").attr('emissiveTexture').isReady()).to.be.true;
            done();
       })
   })
});