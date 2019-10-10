```js
_r.on("OnKeyDownTrigger", function(e) {
    console.log("OnKeyDownTrigger", e.sourceEvent.key, e.sourceEvent.code)
});

_r.on("OnKeyUpTrigger", function(e) {
     console.log("OnKeyUpTrigger", e.sourceEvent.key, e.sourceEvent.code)
});
```

e is 

e.sourceEvent is a [Keyboard Event](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent)

e.sourceEvent.code contains the current key see [https://www.w3.org/TR/uievents-key/#key-attribute-value]([https://www.w3.org/TR/uievents-key/#key-attribute-value)