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

function simulate(target, options) {
    var event = target.ownerDocument.createEvent('MouseEvents'),
        options = options || {},
        opts = { // These are the default values, set up for un-modified left clicks
            type: 'mousedown',
            canBubble: true,
            cancelable: true,
            view: target.ownerDocument.defaultView,
            detail: 1,
            screenX: 0, //The coordinates within the entire page
            screenY: 0,
            clientX: 0, //The coordinates within the viewport
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false, //I *think* 'meta' is 'Cmd/Apple' on Mac, and 'Windows key' on Win. Not sure, though!
            button: 0, //0 = left, 1 = middle, 2 = right
            relatedTarget: null,
        };

    //Merge the options with the defaults
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            opts[key] = options[key];
        }
    }

    //Pass in the options
    event.initMouseEvent(
        opts.type,
        opts.canBubble,
        opts.cancelable,
        opts.view,
        opts.detail,
        opts.screenX,
        opts.screenY,
        opts.clientX,
        opts.clientY,
        opts.ctrlKey,
        opts.altKey,
        opts.shiftKey,
        opts.metaKey,
        opts.button,
        opts.relatedTarget
    );

    //Fire the event
    console.log("dispatching", event);
    target.dispatchEvent(event);
}

describe('plugin', function() {
    it("OnPickTrigger", function () {
        _r.canvas.addEventListener('mousedown', function(e) {
            console.log(e);
        });
        _r.canvas.focus();

        var handler1 = 0;
        _r.select("sphere1").on("OnPickDownTrigger", function (e) {
            console.log("OnPIckTrigger1", e)
            handler1 += 1;
        });
        var handler2 = 0;
        _r.select("sphere1").on("OnPickDownTrigger", function (e) {
            console.log("OnPIckTrigger2", e)
            handler2 += 1;
        });
        simulate(_r.canvas, {
            clientX : 1188,
            clientY : 253
        })
        //_r.canvas.focus();
        //_r.canvas.dispatchEvent(new PointerEvent('pointerdown', { clientX : 947, clientY: 209 }));
        expect(handler1 === 1).to.be.true;
        expect(handler2 === 1).to.be.true;

    });
});

