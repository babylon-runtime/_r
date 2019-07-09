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
                _r.queryString.set("hello", "world");

                var handler = function(e) {
                    console.log(e);
                    _r.off("OnKeyDownTrigger", handler);
                };
                var handler2 = function(e) {
                    console.log("ZZZZ", e);
                }
                _r.on("OnKeyDownTrigger",handler);
                _r.on("OnKeyDownTrigger",handler2);
                return scene;
            }
    });
    _r.ready(done);
});

describe('Query String', function() {
    it("get", function () {
        expect(_r.queryString.get("hello") === "world").to.be.true;
    });
    it("event", function() {
        var hello;
        _r.queryString.on("hello", function(value) {
            hello = value;
        });
        _r.queryString.set("hello", "runtime");
        expect(hello === "runtime").to.be.true;
        window.addEventListener("hashchange", function(e) {
            console.log(e);
        })
    })
});

describe('Router', function() {
    it("on & set", function() {
        let route, route1;
        let countOn1 = 0;
        _r.router.on(function(hash) {
            countOn1 += 1;
            console.log("on1", _r.router.get(), countOn1)
            route = hash;
        });
        _r.router.on("/route1/route2", function() {
            console.log("on2", _r.router.get())
            route1 = _r.router.get();
        });

        _r.router.on("/route3", function() {
            console.log("on3")
        })
        console.log("** set /route1/route2/ **");
        _r.router.set("/route1/route2");
        expect(route1).to.be.equal("/route1/route2");
        expect(route).to.be.equal("/route1/route2");
        console.log("** set /route3 **");
        _r.router.set("/route3");
        expect(route1).to.be.equal("/route1/route2");
        expect(route).to.be.equal("/route3");
        console.log("countOn1", countOn1)
    });
    // TODO
    /**
    it("Parameterized URLs", function() {
        let parameter;
        _r.router.on("/route4/:route", function(params) {
            parameter = params.route;
        });
        _r.router.set("/route4/test1");
        expect(parameter).to.be.equal("test1");
    })**/
});

