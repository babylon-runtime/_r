* _r.patch( elements, patch )  
    * elements : String 
        ```js
        _r.patch("mesh1, mesh2", {
            isVisible : false
        });
        ```
    * elements : Object
        ```js
        _r.patch(material1, {
            diffuseColor : "red"
        });
        ```
* _r.patch( patch )
```js
_r.patch([{
    "mesh1" :  {
        isVisible : false
    },
    "material01" : {
        diffuseColor : "red"
    }
}]);
```
* _r.patch( patchFile )
```js
_r.patch("test.patch").then(function() {
    console.log("done");
});
```

** _r.select( )
