var expect = chai.expect;

describe('Launch', function() {
    describe('Scene', function() {
        it('should exists', function() {
            expect(_r.scene).to.exist;
            expect(_r.scene.clearColor.r === 1).to.be.true;
            //expect(_r.select("light.000")[0].emissiveColor.r === 1).to.be.true;
        });
    });
});