_r.router is a helper for (hashchange)[https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event] events.

For example if you have a home url : 
https://example.com/index.html

And a hyperlink like :
```html
<a href="#/route-1">Route 1</a>
```
When the user click the hyperlink the url become https://example.com/index.html#/route-1 (the page is not refresh).

You can listen to this changed with _r :
```js
_r.router.on("/route-1", function() {
    console.log("user clicked on the hyperlink")
})
```

You an also set the URL by code
```js
_r.router.set("/route-2");
```
## Page reload
When a page is reloaded, for example when user refresh the browser https://example.com/index.html#/route-1.
Router won't trigger event since it's only triggered when hash changed.

But you can do something like :
```js
if(_r.router.get() !== "/") {
    _r.router.trigger(_r.router.get());
}
```

For example in a ready function after scene is loaded :
```js
 _r.launch({
    scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
});
_r.ready(function() {
   if(_r.router.get() !== "/") {
       _r.router.trigger(_r.router.get());
   }
})
```
