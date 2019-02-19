var expect = chai.expect;

before(function(done) {
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
    });
    _r.ready(done);
});

describe('one, on, trigger, off', function() {
    it('one is called once', function() {
        var count = 0;
        _r.select("bloc.000").one("customEvent", function() {
            count += 1;
        });
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 1).to.be.true;
    });
    it('off worked', function() {
        var count = 0;
        var callback = function() {
            count += 1;
        };
        _r.select("bloc.000").on("customEvent", callback);
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").off("customEvent", callback);
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 1).to.be.true;

    });
    it("global off", function() {
        var count = 0;

        var callback1 = function() {
            count += 1;
        };

        var callback2 = function() {
            count += 1;
        };
        _r.select("bloc.000").on("customEvent", callback1);
        _r.select("bloc.000").on("customEvent", callback2);
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 2).to.be.true;
        _r.select("bloc.000").off("customEvent");
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 2).to.be.true;
    });
    it("custom data", function() {
        var _data = null;
        _r.select("bloc.000").on("customEvent", function(data) {
            _data = data;
        });
        _r.select("bloc.000").trigger("customEvent", {
            hello : "world"
        });
        expect(_data.hello === "world").to.be.true;
    })
});
