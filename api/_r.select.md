```js
_r.select("*:mesh")
_r.select("*.cornellBox.*:material")
_r.select("*:camera")
_r.select("*:light")
_r.select("*:transformNode")
_r.select("cornellBox.*:material, *:mesh")
_r.select("*:mesh[isVisible=true]")
_r.select("*:mesh[position.x=-1]")
_r.select("*:mesh[position.x!=-1]")
_r.select("*:mesh[isVisible=true][visibility=0.5]")
_r.select("*:mesh[material.diffuseTexture.name=https://www.babylonjs-playground.com/textures/grass.jpg]")
_r.select("*:material").select("*bloc*")
_r.select("scene").select("*bloc*:material")
```
Same selectors are available in patches.