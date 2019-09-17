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

describe('Data', function() {
    it("set / get string", function () {
        let testValue = 'Hello, this is test.';
        _r.select('sphere1').data('test-string', testValue);
        expect(typeof _r.select('sphere1').data('test-string')).to.be.equal('string');
        expect(_r.select('sphere1').data('test-string')).to.be.equal(testValue);
    });
    it("set / get number", function () {
        let testValue = 42.42;
        _r.select('sphere1').data('test-number', testValue);
        expect(typeof _r.select('sphere1').data('test-number')).to.be.equal('number');
        expect(_r.select('sphere1').data('test-number')).to.be.equal(testValue);
    });
    it("set / get array", function () {
        let testValue = ['123', 456, [123, 456], {test: 'test'}];
        _r.select('sphere1').data('test-array', testValue);
        expect(typeof _r.select('sphere1').data('test-array')).to.be.equal('object');
        expect(_r.select('sphere1').data('test-array')).to.be.equal(testValue);
        expect(_r.select('sphere1').data('test-array').length).to.be.equal(4);
    });
    it("set / get object", function () {
        let testValue = {test: 'test', hey: 54, array: [1, 2, 3]};
        _r.select('sphere1').data('test-object', testValue);
        expect(typeof _r.select('sphere1').data('test-object')).to.be.equal('object');
        expect(_r.select('sphere1').data('test-object')).to.be.equal(testValue);
    });
    it("set / get self mesh instance", function () {
        let testValue = _r.select('sphere1')[0];
        _r.select('sphere1').data('test-self', testValue);
        expect(_r.select('sphere1').data('test-self')).to.be.instanceOf(BABYLON.Mesh);
        expect(_r.select('sphere1').data('test-self').name).to.be.equal('sphere1');
        expect(_r.select('sphere1').data('test-self')).to.be.equal(testValue);
    });
    it("remove (set to null)", function () {
        _r.select('sphere1').data('test-self', null);
        expect(_r.select('sphere1').data('test-self')).to.be.null;
    });
});

