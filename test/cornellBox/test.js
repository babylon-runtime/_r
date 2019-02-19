var expect = chai.expect;

before(function(done) {
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
        patch : [
            {
                "scene" : {
                    clearColor : {
                        r : 1,
                        g : 0,
                        b : 0
                    }
                }
            },
            {
                "light.000" : {
                    emissiveColor : {
                        r : 0,
                        g : 0,
                        b : 0
                    }
                }
            }

        ]
    });
    _r.ready(done);
});

describe('Launch', function() {
    describe('Scene', function() {
        it('should exists', function() {
            expect(_r.scene).to.exist;
            // expect(_r.scene.clearColor.r === 1).to.be.true;
            //expect(_r.select("light.000")[0].emissiveColor.r === 1).to.be.true;
        });
    });
});