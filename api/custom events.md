# on
```js
_r.on("myCustomEvent", function() {
    console.log("myCustomEvent handler")
})
```
Attach an event handler function for one or more events.

# trigger
Any event handlers attached with .on() or one of its shortcut methods are triggered when the corresponding event occurs. They can be fired manually, however, with the .trigger() method.

```js
_r.trigger("myCustomEvent");
```
## extra parameters

```js
_r.on("myCustomEvent", function(data) {
    console.log("myCustomEvent handler with extra parameter");
    console.log(data.hello); // will output "world" in the console
});
_r.trigger("myCustomEvent", { hello : world});
```
# off
Remove all event handler.
```js
_r.off("myCustomEvent"); // stop listening to myCustomEvent
```

Remove a specific handler
```js
var handler1 = function() {
    console.log("myCustomEvent handler1")
}
var handler2 = function() {
    console.log("myCustomEvent handler2")
}
_r.on("myCustomEvent", handler1);
_r.on("myCustomEvent", handler2);
_r.trigger("myCustomEvent");
_r.off("myCustomEvent", handler1);
_r.trigger("myCustomEvent"); // and handler1 won't be called
```

# Events are available by elements
```js
_r.select("mesh1, mesh2).on("refreshEvent", function() {
   console.log("refreshEvent called for " + this.name);
});
_r.select("mesh1").trigger("refreshEvent");
```

