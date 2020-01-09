var expect = chai.expect;

describe('Launch with patch', function() {
    it("Should wait patch before running the loop", function (done) {
        _r.launch({
            scene : function() {
                // No activeCamera
                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), _r.scene);
                light.intensity = 0.7;
                var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, _r.scene);
                // sphere.position.y = 1;
                var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, _r.scene);
            },
            patch : [
                "activeCamera.patch",
                "camera.settings.patch",
                "sphere.patch"
            ]
        });

        _r.ready(function() {

            expect(_r.scene.activeCamera).to.exist;
            expect(_r.select('sphere1')[0].material.diffuseColor.r === 1).to.be.true;
            expect(_r.select('sphere1')[0].material.diffuseColor.g === 0).to.be.true;
            expect(_r.select('sphere1')[0].material.diffuseColor.b === 1).to.be.true;

            _r.patch([{
                "scene": {
                    "fogMode": BABYLON.Scene.FOGMODE_LINEAR,
                    "fogStart": 1,
                    "fogEnd": 5,
                    "fogColor": "red",
                    "imageProcessingConfiguration":{
                        "isEnabled": true,
                        "vignetteEnabled": true,
                        "vignetteWeight": 100,
                        "vignetteColor": BABYLON.Color4.FromHexString("#FF000000"),
                        "vignetteCameraFov": 1
                    }
                }
            }]);
            expect(_r.scene.fogMode === BABYLON.Scene.FOGMODE_LINEAR).to.be.true;
            expect(_r.scene.fogStart === 1).to.be.true;
            expect(_r.scene.fogEnd === 5).to.be.true;
            expect(_r.scene.fogColor.equals(BABYLON.Color3.Red())).to.be.true;
            expect(_r.scene.imageProcessingConfiguration.isEnabled).to.be.true;
            expect(_r.scene.imageProcessingConfiguration.vignetteEnabled).to.be.true;
            done();
        })
    });
});

