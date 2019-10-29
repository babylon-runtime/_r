var expect = chai.expect;

before(function(done) {
    this.timeout(10000);
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
    });
    _r.ready(done);
});

describe('one, on, trigger, off', function() {
    it('one is called once', function () {
        var count = 0;
        _r.select("bloc.000").one("customEvent", function () {
            count += 1;
        });
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 1).to.be.true;
    });
    it('off worked', function () {
        var count = 0;
        var callback = function () {
            count += 1;
        };
        _r.select("bloc.000").on("customEvent", callback);
        _r.select("bloc.000").trigger("customEvent");
        _r.select("bloc.000").off("customEvent", callback);
        _r.select("bloc.000").trigger("customEvent");
        expect(count === 1).to.be.true;

    });
    it("global off", function () {
        var count = 0;

        var callback1 = function () {
            count += 1;
        };

        var callback2 = function () {
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
    it("custom data", function () {
        var _data = null;
        _r.select("bloc.000").on("customEvent", function (data) {
            _data = data;
        });
        _r.select("bloc.000").trigger("customEvent", {
            hello: "world"
        });
        expect(_data.hello === "world").to.be.true;
    })
});

describe('global e', function() {
    it("should work without select", function() {
        var count = 0;
        _r.one("customEvent", function() {
            count += 1;
        });
        _r.trigger("customEvent");
        _r.trigger("customEvent");
        expect(count === 1).to.be.true;
    });
    it('off worked', function() {
        var count = 0;
        var callback = function() {
            count += 1;
        };
        _r.on("customEvent", callback);
        _r.trigger("customEvent");
        _r.off("customEvent", callback);
        _r.trigger("customEvent");
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
        _r.on("customEvent", callback1);
        _r.on("customEvent", callback2);
        _r.trigger("customEvent");
        expect(count === 2).to.be.true;
        _r.off("customEvent");
        _r.trigger("customEvent");
        _r.trigger("customEvent");
        _r.trigger("customEvent");
        expect(count === 2).to.be.true;
    });
    it("custom data", function() {
        var _data = null;
        _r.on("customEvent", function(data) {
            _data = data;
        });
        _r.trigger("customEvent", {
            hello : "world"
        });
        expect(_data.hello === "world").to.be.true;
    })
});

describe("extra params", function() {
    it("test extra parameters", function() {
        let param1, param2, param3;
        _r.select("bloc.000, suzanne.000").on("event2", (_param1, _param2, _param3) => {
            param1 = _param1;
            param2 = _param2;
            param3 = _param3;
        });

        _r.select("suzanne.000").trigger("event2","hello", true, { hello : "world"});
        expect(param1 === "hello").to.be.true;
        expect(param2 === true).to.be.true;
        expect(param3.hello === "world").to.be.true;

        let param4, param5, param6;
        _r.on("event2", (_param4, _param5, _param6) => {
            param4 = _param4;
            param5 = _param5;
            param6 = _param6;
        });

        _r.trigger("event2", "yo", false, { hello : "runtime"})
        expect(param1 === "hello").to.be.true;
        expect(param2 === true).to.be.true;
        expect(param3.hello === "world").to.be.true;
        expect(param4 === "yo").to.be.true;
        expect(param5 === false).to.be.true;
        expect(param6.hello === "runtime").to.be.true;

    });

});

describe("misc. ", function() {
    it("multiple on, trigger once", function() {
        var handler1 = 0;
        _r.select('bloc.000').on("event2", function() {
            handler1 += 1;
        });
        var handler2 = 0;
        _r.select('bloc.000').on("event2", function() {
            handler2 += 1;
        });
        _r.select("bloc.000").trigger("event2");
        expect(handler1 === 1).to.be.true;
        expect(handler2 === 1).to.be.true;
    });
})
