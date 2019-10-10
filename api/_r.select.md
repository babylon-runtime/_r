```js
_r.select("*:mesh")
_r.select("*.cornellBox.*:material")
_r.select("*:camera")
_r.select("*:light")
_r.select("*:transformNode")
_r.select("*:material")
_r.select("*:multimaterial")
_r.select("*:texture")
_r.select("cornellBox.*:material, *:mesh")
_r.select("*[isVisible=true]")
_r.select("*[position.x=-1]")
_r.select("*[position.x!=-1]")
_r.select("*:mesh[isVisible=true][visibility=0.5]")
_r.select("*:material[material.diffuseTexture.name=https://www.babylonjs-playground.com/textures/grass.jpg]")
_r.select("*:material").select("*bloc*")
_r.select("scene").select("*bloc*:material")
```
Same selectors are available in patches.

# _r.select returns a special array

You can iterate threw an _r.select(selector) as a basic array :
```js
_r.select('*:mesh').forEach(function(mesh) {
  console.log(mesh.name)
});

var materials = _r.select("*:material")
for (var i = 0; i < materials.length; i++) {
    console.log(materials[i].name)
}
```
But this array as methods to bulk tasks :
```js
_r.select(selector).attr(attribute)

_r.select(selector).attr(attribute, value)

_r.select(selector).removeFromScene()

_r.select(selector).addToScene()

_r.select(selector).dispose()

_r.select(selector1).select(selector2)

_r.select(selector).log()

_r.select(selector).toArray()

_r.select(selector).filter()

_r.select(selector).map()

_r.select(selector).animate()

_r.select(selector).fadeIn()

_r.select(selector).fadeOut()

_r.select(selector).data(key)

_r.select(selector).data(key, value)

_r.select(selector).on(event, callback)
_r.select(selector).one(event, callback)
_r.select(selector).off(event, callback)
_r.select(selector).trigger(event, callback)
```