```js
_r.select("*:mesh").on("OnPickTrigger", function() {
    console.log(this.name + ' has be picked');
}
```

## Available events
* OnDoublePickTrigger
* OnPickTrigger
* OnLeftPickTrigger
* OnRightPickTrigger
* OnCenterPickTrigger
* OnPickDownTrigger
* OnPickUpTrigger
* OnPickOutTrigger
* OnLongPressTrigger
* OnPointerOverTrigger
* OnPointerOutTrigger

## Stop listening to an event

All handlers
```js
_r.select("*:mesh").on("OnPickTrigger")
```

Specific handler
```js
function handler(e) {
    console.log(this.name + ' has be picked');
}
_r.select("*:mesh").on("OnPickTrigger", handler);
```
Stop listening with this **handler** function :
```js
_r.select("*:mesh").off("OnPickTrigger", handler);
```