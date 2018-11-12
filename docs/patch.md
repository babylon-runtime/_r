# Patch

* [Features](#features)
* [Selectors](#selector)
* Examples
    * [Lightmaps assignation](#example-lightmaps)
    * [FresnelParameters](#)
    * [Reflection & Refraction](#)
    * [From the babylon playground in a more readable way](#)
    

From a 3D designers point of view there are always a lot of parameters - colors, channels intensities, reflection, refraction, etc - which needs to be customised by code. 
Code is great but it’s hard to understand and maintain for a 3D designers team.

With _r you can use patch file to customise the scene. Patch are very easy to read/write text files that don't required any programming skills.

```
[
    {
        "scene":
        {
            "ambientColor": "#ffffff",
            "clearColor": "#9CC1CE"
        }
    },
    {
        "cameraFree.000":
        {
            "speed": 0.05,
            "fov": 1.1,
            "position":
            {
                "x": 2.72
            },
            "rotation":
            {
                "x": 0.11
            }
        }
    }
]
```

## Features


## Selector
Patches use [selector syntax](selector.md).

## Examples 

### Lightmaps assignation

### FresnelParameters
