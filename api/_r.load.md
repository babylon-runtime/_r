- \_r.load(file, patch)

```javascript
_r.load(
    "file.gltf",
    [
        "/patches/patch1.patch",
        "/patches/patch2.patch",
    ]
).then(function (newAssets) {
    _r.select(newAssets).addToScene();
});
```

`newAssets` is a [BABYLON.AssetContainer](https://doc.babylonjs.com/api/classes/babylon.assetcontainer)

- _r.load.texture(file, patch)

```js
_r.patch([{
    "materialName": {
        "lightmapTexture": function () {
            return _r.load.texture("lightmapName.jpg",{
                "vScale": -1,
                "coordinatesIndex": 1
            });
        }
    }
}]);
```

