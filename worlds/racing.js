export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/diverse";
    Constants.UserBehaviorModules = [
        "lights.js", "sound.js", "throb.js", "urlLink.js", "simpleSpin.js", "text3D.js", "replaceWorld.js", "crystalball.js", "curve.js", "circle.js", "openPortal.js",
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "world model",
                type: "3d",
                dataScale: [0.01, 0.01, 0.01],
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation: [0, -1.7, 0],
                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, -1.7, 0],
                dataLocation: "3ygbYZ262WY-lI04bTjBGdckDoBbCGqdyjSTD8z_CY_QEQ0NCQpDVlYfEBUcClcMClcaCxYIDBwNVxAWVgxWAywNDik2Az8MNipIMhAeNCMQTEpAAT89PkFJS1YQFlcaCxYIDBwNVxQQGgsWDxwLChxXFRYaGBUdHA8dHB8YDBUNVg8MGjI3KiY8CiEuO01POEoTLg0aSxQAEkgcTRAJAB0oIAgVA0gRKTc6H0lWHRgNGFY9LFQzEzIjGgkJDAlJSSYLCkgjHSBATEwwGDA8PDE8ECs3FwAIECksKDwK",
                fileName: "/racing.glb.zip",
                modelType: "zip",
                // "3DS - Street Pass Mii Plaza - Slot- Car Racing" (https://skfb.ly/oyvVK) by Garu is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
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
                name: "curve box",
                translation: [-1, 0.4, -4],
                behaviorModules: ["Curve"],
                type: "object",
            }
        },
        {
            card: {
                name: "drone",
                translation: [-3, 1, -6],
                rotation: [0, 0, 0, 1],
                layers: ["pointer"],
                animationClipIndex: 0,
                animationStartTime: 27404,
                dataLocation: "3ICiyF6V8TnM0tqBRz8HP_OoiiN-U5UmFMF0kXDejrTEIT09OTpzZmYvICUsOmc8OmcqOyY4PCw9ZyAmZjxmMxw9PhkGMw88Bhp4AiAuBBMgfHpwMQ8NDnF5e2YgJmcqOyY4PCw9ZyQgKjsmPyw7OixnJSYqKCUtLD8tLC8oPCU9Zh4LLjoWLAw5HzscETsaOAsWCHEjBAMHEQ15HB8gEBMjCy16JCYALgQlAnFmLSg9KGYoDX56FgI5GHkrECUdHzh4PgEDDg0KfwsrJnowEwceHjM5AXszeiUsKgN5",
                scale: [0.05, 0.05, 0.05],
                fileName: "/tello.glb.zip",
                modelType: "zip",
                shadow: true,
                singleSided: true,
                type: "3d",
                behaviorModules: ["Circle"],
                // "Dji Tello" (https://skfb.ly/osWOS) by Temoor is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
            }
        },
        {
            card: {
                name: "portal button",
                translation: [-12.471031225946103, 1.05, -5.207379803842383],
                behaviorModules: ["OpenPortalButton"],
                type: "object",
            }
        },
    ];
}
