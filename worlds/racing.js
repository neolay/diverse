export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/diverse";
    Constants.UserBehaviorModules = [
        "lights.js", "sound.js", "throb.js", "urlLink.js", "simpleSpin.js", "text3D.js", "replaceWorld.js", "crystalball.js",
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
        }
    ];
}
