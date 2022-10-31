export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.UserBehaviorDirectory = "behaviors/diverse";
    Constants.UserBehaviorModules = [
        "lights.js", "sound.js", "throb.js", "urlLink.js", "simpleSpin.js", "text3D.js", "replaceWorld.js"
    ];

    Constants.DefaultCards = [
        {
            card: {
                name: "entrance",
                type: "object",
                translation: [0, 0.4, 4],
                spawn: "default",
            }
        },
        {
            card: {
                name: "world model",
                type: "3d",
                dataScale: [1, 1, 1],
                singleSided: true,
                shadow: true,
                layers: ["walk"],
                translation: [0, -1.7, 0],
                placeholder: true,
                placeholderSize: [100, 0.01, 100],
                placeholderColor: 0xcccccc,
                placeholderOffset: [0, -1.7, 0],
                dataLocation: "3XN43cwX2Pl6M8r7SqiDbWDT_G7pOsc9NTga9fml2dBMMCwsKCtid3c-MTQ9K3YtK3Y7KjcpLT0sdjE3dy13Ig0sLwgXIh4tFwtpEzE_FQIxbWthIB4cH2BoancxN3Y7KjcpLT0sdjUxOyo3Lj0qKz12NDc7OTQ8PS48PT45LTQsd2ASFwk1YQswIh8VNiwhMCIyMRMoKC5pajtsPQkCKC9rLnUaDW8rCggTCyt3PDksOXcgLGsNCRU-Nho-LRM6KClvbA89NB0LO3U2MRtvC3UgPmAOLjk9DTcMEz8z",
                fileName: "/castle.glb.zip",
                modelType: "zip",
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
                name: "stone table",
                translation: [1.0461403218736771, -3.0903544044831435, -0.8025336339532938],
                rotation: [0, -0.07516284803521586, 0, 0.9971712722873814],
                layers: ["pointer"],
                dataLocation: "3UYFpIOhiHh1sXiUCsUTJ9nRCHlUF5UFsUJYmy3NYE9gPSEhJSZvenozPDkwJnsgJns2JzokIDAhezw6eiB6LwAhIgUaLxMgGgZkHjwyGA88YGZsLRMREm1lZ3o8Ons2JzokIDAhezg8Nic6IzAnJjB7OTo2NDkxMCMxMDM0IDkheh06Bg0vZAM7YmE7YWEAZgU9LxE6JyNhMQYlAR8wAx0HEhwWMGUKYRE-eGV6MTQhNHoWJCBkIjkBLQMRJyI-IR88BRcWYzxsPQECNgQmBhgneAE6AWIwMgU9YBc6",
                dataScale: [2.14731460339547, 2.14731460339547, 2.14731460339547],
                fileName: "/stone table.glb.zip",
                modelType: "zip",
                shadow: true,
                singleSided: true,
                type: "3d",
            }
        },
    ];
}
