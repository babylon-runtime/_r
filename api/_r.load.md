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
