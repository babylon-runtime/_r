var expect = chai.expect;

before(function(done) {
    this.timeout(10000)
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
});