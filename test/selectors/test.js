var expect = chai.expect;

before(function(done) {
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
    });
    _r.ready(done);
});

describe('Selectors', function() {
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
    describe("Select inside Library", function() {
        it('_r.library("https://models.babylonjs.com/CornellBox/cornellBox.babylon").select("*:mesh").length === 4', function() {
            expect(_r.library("https://models.babylonjs.com/CornellBox/cornellBox.babylon").select("*:mesh").length === 4).to.be.true;
        });
    });
    describe("comma separated", function() {
        it('_r.select("cornellBox.*:material, *:mesh").length === 11', function() {
            expect(_r.select("cornellBox.*:material, *:mesh").length === 11).to.be.true;
        });
    })
});