var expect = chai.expect;

before(function(done) {
    this.timeout(10000);
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
    });
    _r.ready(done);
});

describe('Basic', function() {
    it('_r.select("*:mesh").length === 4', function() {
        expect(_r.select("*:mesh").length === 4).to.be.true;
    });
    it('_r.select("*.cornellBox.*:material").length === 4', function() {
        expect(_r.select("*.cornellBox.*:material").length === 4).to.be.true;
    });
    it('_r.select("cornellBox.*:material").length === 7', function() {
        expect(_r.select("cornellBox.*:material").length === 7).to.be.true;
    });
    it('_r.select("*bloc*:material").length === 1', function() {
        expect(_r.select("*bloc*:material").length === 1).to.be.true;
    });
    it('_r.select("bloc*:material").length === 0', function() {
        expect(_r.select("bloc*:material").length === 0).to.be.true;
    });
    it('_r.select("*:camera").length === 1', function() {
        expect(_r.select("*:camera").length === 1).to.be.true;
    });
    it('_r.select("*:light").length === 1', function() {
        expect(_r.select("*:light").length === 1).to.be.true;
    });
});
describe("Select inside Select", function() {
    it('_r.select("*:material").select("*bloc*").length === 1', function() {
        expect(_r.select("*:material").select("*bloc*").length === 1).to.be.true;
    });
    it('_r.select("scene").select("*bloc*:material").length === 1', function() {
        expect(_r.select("scene").select("*bloc*:material").length === 1).to.be.true;
    });
});

describe("comma separated", function() {
    it('_r.select("cornellBox.*:material, *:mesh").length === 11', function() {
        expect(_r.select("cornellBox.*:material, *:mesh").length === 11).to.be.true;
    });
});
describe("attribute", function() {
    it("*:mesh[isVisible=true]", function() {
        expect(_r.select("*:mesh[isVisible=true]").length === 4).to.be.true;
        _r.select("*:mesh")[0].isVisible = false;
        expect(_r.select("*:mesh[isVisible=true]").length === 3).to.be.true;

    })
});
describe("attribute cascade", function() {
    it("*:mesh[position.x=-1]", function() {
        expect(_r.select("*:mesh[position.x=-1]").length === 1).to.be.true;
        expect(_r.select("*:mesh[position.x!=-1]").length == 3).to.be.true;
        expect(_r.select("*:mesh[position.x =-1]").length === 1).to.be.true;
        expect(_r.select("*:mesh[ position.x = -1 ]").length === 1).to.be.true;
    });
});
describe("multiple attributes", function() {
    it("*:mesh[isVisible=false][visibility=0.5]", function() {
        _r.select("*:mesh")[1].isVisible = false;
        _r.select("*:mesh")[1].visibility = 0.5;
        expect(_r.select("*:mesh[isVisible=false][visibility=0.5]").length == 1).to.be.true;
    })
});
describe("deep attribute", function() {
    this.timeout(10000);
    it("*:mesh[material.diffuseTexture.name=https://www.babylonjs-playground.com/textures/grass.jpg]", function(done) {
        _r.select("suzanne.000").patch({
            isVisible : true,
            material : {
                diffuseTexture : _r.load.texture("https://www.babylonjs-playground.com/textures/grass.jpg")
            }
        }).then(function() {
            var elements = _r.select("*:mesh[material.diffuseTexture.name=https://www.babylonjs-playground.com/textures/grass.jpg]");
            expect(elements.length == 1).to.be.true;
            expect(elements[0].name == "suzanne.000");
            done();
        });
    })
})