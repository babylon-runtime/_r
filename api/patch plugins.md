There's build in plugins available in patches

# Hex Colors
```js
_r.select("*material").patch({
    material : {
        diffuseColor : "#dd00dd"
    }       
})
```
# All childs from a property that is an Array or a MultiMaterial

```js
_r.patch([
{
    "*:multiMaterial" : {
        "*" : {
            "diffuseColor" : "#dd00dd"
        }          
    }
}
]);
```

# You can create your own plugin for patches.

For example let create a PBR patch plugin :
```js
_r.patch.registerPlugin({
    test(element, source, property) {
        return property === "pbr";
    },
    resolve(element, source, property) {
        element.material = new BABYLON.PBRMaterial("", _r.scene);
        return _r.select(element.material).patch(source[property]);
    }
});
```
Then you have the pbr property available in patches :
```js
_r.select("sphere1, ground1").patch({
    pbr : {
        microSurface : 0.96,
        albedoColor : {
            r : 0.206,
            g : 0.94,
            b : 1
        },
        reflectivityColor : {
            r : 0.003,
            g : 0.003,
            b : 0.003
        }
    }
});
```
PBR material is automatically created and assigned to sphere1 and ground1.