export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/diverse";
    Constants.UserBehaviorModules = [
        "lights.js", "sound.js", "throb.js", "urlLink.js", "bounce.js", "simpleSpin.js", "text3D.js", "pixel.js", "forklift.js", "platform.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                translation: [0, 0.4, 12],
                spawn: "default",
            }
        },
        {
            card: {
                name: "world model",
                type: "3d",
                dataLocation: "./assets/3D/artgallery_042122.glb.zip",
                dataScale: [1, 1, 1],
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation: [0, -1.7, 0],
                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, -1.7, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/shanghai_riverside_2k.exr",
                dataType: "exr",
            }
        },
        {
            card: {
                name: "mbit display",
                behaviorModules: ["MbitDisplay"],
                layers: ["pointer"],
                type: "object",
                translation: [-5, 0.6, -16.87],
                // rotation: [0, -Math.PI / 2, 0],
                shadow: true,
                scale: [3.1, 3.1, 3.1],
                pixelX: 5,
                pixelY: 5,
            },
        },
        {
            card: {
                name: "bag display",
                behaviorModules: ["BagDisplay"],
                layers: ["pointer"],
                type: "object",
                translation: [5.5, 0.6, -16.87],
                // rotation: [0, -Math.PI / 2, 0],
                shadow: true,
                scale: [1, 1, 1],
                pixelX: 16,
                pixelY: 16,
            },
        },
        {
            card: {
                name: "pixel display",
                behaviorModules: ["PixelDisplay"],
                layers: ["pointer"],
                type: "object",
                translation: [0.2, 0.6, -16.87],
                // rotation: [0, -Math.PI / 2, 0],
                shadow: true,
                scale: [1.75, 1.75, 1.75],
                pixelX: 9,
                pixelY: 9,
            },
        },
        {
            card: {
                name: "strip display",
                behaviorModules: ["StripDisplay"],
                layers: ["pointer"],
                type: "object",
                translation: [-0.05, -1.55, -16.87],
                // rotation: [0, -Math.PI / 2, 0],
                shadow: true,
                scale: [1, 1, 1],
                pixelX: 120,
                pixelY: 1,
                ledWidth: 0.15,
                ledHeight: 0.15,
            },
        },
        {
            card: {
                name: "forklift",
                dataTranslation: [0, -1.65, 0],
                translation: [0, 0, 0],
                dataScale: [1.2, 1.2, 1.2],
                behaviorModules: ["ForkLift"],
                layers: ["pointer"],
                dataLocation: "3UkowQroW_SGvJ0N4hXnZO_pwIEEVlVQNTvj8CJ0CG78PSEhJSZvenozPDkwJnsgJns2JzokIDAhezw6eiB6EjEDNyw5HCYUPgQ2Fw0xZhItNCMsIgAeAgwMZ3o8Ons2JzokIDAhezg8Nic6IzAnJjB6YBAAGSIZES8PHCcNBAVhIhlkbScSITQYHhliDR8SNy0DFz8gFAo7PAcTPnoxNCE0enhkF3gzEjxsDQYaIhwTYDsfGjkHMz84OCMTCjcjPzIfF3gkNzYgEyUtGzI",
                pathIndex: 1,
                modelType: "glb",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
        {
            card: {
                name: "move cuboid",
                translation: [-8, -1.55, 13.5],
                behaviorModules: ["MoveCuboid"],
                type: "object",
            }
        },
    ];
}
