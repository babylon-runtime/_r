var expect = chai.expect;

before(function() {
    _r.launch({
        scene : function() {
            var scene = new BABYLON.Scene(engine);

            var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);

            //Boxes
            var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);
            box1.position.x = -20;
            var box2 = BABYLON.Mesh.CreateBox("Box2", 10.0, scene);

            var materialBox = new BABYLON.StandardMaterial("texture1", scene);
            materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green
            var materialBox2 = new BABYLON.StandardMaterial("texture2", scene);
            materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green

            //Applying materials
            box1.material = materialBox;
            box2.material = materialBox2;

            //Positioning box
            box2.position.x = 20;
            return scene;
        }
    });
});

describe('animate', function() {
    this.timeout(5000);
    it('simple', function (done) {
        _r.animate('Box1', {
            position : {
                x : 20
            },
            material : {
                diffuseColor : 'red'
            }
        }, 2);

        _r.animate('scene', {
            clearColor : "yellow"
        }, {
            duration : 2,
            complete : function() {
                var yellow = _r.color("yellow");
                expect(_r.scene.clearColor.r === yellow.r).to.be.true;
                expect(_r.scene.clearColor.g === yellow.g).to.be.true;
                expect(_r.scene.clearColor.b === yellow.b).to.be.true;
            }
        });

        _r.animate("Box1, Box2", {
            rotation : {
                y : 10
            }
        },{
            duration : 1,
            complete : function() {
                expect(_r.select("Box2")[0].rotation.y === 10).to.be.true;
            }
        });
        _r.animate('Box1', {
            position : {
                x : 20
            },
            material : {
                diffuseColor : 'red'
            }
        }, {
            duration : 2,
            complete() {
                expect(_r.select("Box1")[0].position.x == 20).to.be.true;
                done();
            }
        })
    });
    it('mesh fadeOut', function(done){
        _r.select("Box1").fadeOut({
            duration : 1,
            complete() {
                expect(_r.select("Box1")[0].visibility == 0).to.be.true;
                done();
            }
        });
    });
    it('material fadeOut', function(done) {
        _r.select("texture2").fadeOut({
            duration : 1,
            complete() {
                expect(_r.select("texture2")[0].alpha == 0).to.be.true;
                done();
            }
        })
    });
    it("fadeIn", function(done) {
        _r.select("Box1, texture2").fadeIn({
            duration : 1,
            complete() {
                expect(_r.select("Box1")[0].visibility == 1).to.be.true;
                expect(_r.select("texture2")[0].alpha == 1).to.be.true;
                done();
            }
        })
    });

});

