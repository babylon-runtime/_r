before(function(done) {
    _r.TRACE = true;
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