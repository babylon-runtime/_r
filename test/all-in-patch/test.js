var expect = chai.expect;

before(function(done) {
    this.timeout(5000)
    _r.patch("scene.patch").then(function() {
        // console.log("done call", _r.scene.activeCamera.name);
        done();
    });
});

describe('plane', function() {
    it('scene', function() {
        console.log("scene started")
        expect(_r.scene).to.exist;
        expect(_r.scene.activeCamera.name === "Camera").to.be.true;
    });
    it('plane', function () {
        var plane = _r.select("plane")[0];
        expect(plane.position.y === -5).to.be.true;
        expect(plane.rotation.x === Math.PI /2).to.be.true;
        var texture = plane.material.diffuseTexture;
        expect(texture.name === "https://www.babylonjs-playground.com/textures/grass.jpg");
        expect(texture.uScale === 5).to.be.true;
        expect(texture.vScale === 5).to.be.true;
    });
    it('sphere', function () {
        var sphere = _r.select("Sphere4")[0];
        expect(sphere.position.x === -5).to.be.true;
        var texture = sphere.material.diffuseTexture;
        expect(texture.name === "https://www.babylonjs-playground.com/textures/misc.jpg");
        expect(texture.vOffset === 0.1).to.be.true;
        expect(texture.uOffset === 0.4).to.be.true;
    });
    it('should provide context', function() {
        let mesh, material;
        _r.patch({
            "Sphere4" : {
                material : {
                    diffuseTexture : function(_mesh, _material) {
                        console.log(_mesh, _material);
                        mesh = _mesh;
                        material = _material;
                    }
                }
            }
        });
        expect(mesh.name === "Sphere4").to.be.true;
        expect(material.name === "texture4").to.be.true;
    })
});