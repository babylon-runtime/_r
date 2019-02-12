var expect = chai.expect;

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
});