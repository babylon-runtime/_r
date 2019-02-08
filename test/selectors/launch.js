before(function(done) {
    _r.TRACE = true;
    _r.launch({
        scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon"
    });
    _r.ready(done);
});