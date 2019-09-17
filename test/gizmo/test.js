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

describe('gizmo types', function() {
    it("show default", function () {
        _r.show.gizmo('sphere1');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.BoundingBoxGizmo);
    });
    it("show position", function () {
        _r.show.gizmo('sphere1', 'position');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.PositionGizmo);
    });
    it("show rotation", function () {
        _r.show.gizmo('sphere1', 'rotation');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.RotationGizmo);
    });
    it("show scale", function () {
        _r.show.gizmo('sphere1', 'scale');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.ScaleGizmo);
    });
    it("show boundingbox", function () {
        _r.show.gizmo('sphere1', 'boundingbox');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.BoundingBoxGizmo);
    });
    it("hide", function () {
        _r.hide.gizmo('sphere1');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.null;
    });
});

describe('gizmo axis', function() {
    /* TODO :: tests to uncomment when BJS > 4.0.3 */
    /*it("show position x", function () {
        _r.show.gizmo('sphere1', 'position', 'x');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.PositionGizmo);
        expect(gizmo.xGizmo.enabled).to.be.true;
        expect(gizmo.yGizmo.enabled).to.be.false;
        expect(gizmo.zGizmo.enabled).to.be.false;
    });
    it("show rotation yz", function () {
        _r.show.gizmo('sphere1', 'rotation', 'yz');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.RotationGizmo);
        expect(gizmo.xGizmo.enabled).to.be.false;
        expect(gizmo.yGizmo.enabled).to.be.true;
        expect(gizmo.zGizmo.enabled).to.be.true;
    });*/
    it("show boundingbox y", function () {
        _r.show.gizmo('sphere1', 'boundingbox', 'yz');
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.BoundingBoxGizmo);
        // axis are not compatible with BoundingBoxGizmo, but have not to throw error
    });
});

describe('gizmo color', function() {
    it("show position red", function () {
        _r.show.gizmo('sphere1', 'position', 'x', BABYLON.Color3.Red());
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.PositionGizmo);
        // axis are compatible only with BoundingBoxGizmo, but have not to throw error
    });
    it("show boundingbox red", function () {
        _r.show.gizmo('sphere1', undefined, undefined, BABYLON.Color3.Red());
        let gizmo = _r.select('sphere1').data('runtime-gizmo');
        expect(gizmo).to.be.instanceOf(BABYLON.Gizmo);
        expect(gizmo).to.be.instanceOf(BABYLON.BoundingBoxGizmo);
    });
});

