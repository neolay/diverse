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
        {
            card: {
                name: "magic crystal ball",
                type: "object",
                behaviorModules: ["Crystalball", "SpriteSound"],
                layers: ["pointer"],
                translation: [1.0461403218736771, -1.0203506245253555, -0.8025336339532938],
                sound: "./assets/sounds/Mystery.aac",
                loop: true,
            },
        },
        {
            card: {
                name: "dynalab",
                translation: [0.4361869090117716, 3.294493636513068, -4.2972487458982185],
                scale: [1.5536426028547754, 1.5536426028547754, 1.5536426028547754],
                rotation: [0, 0, 0, 1],
                layers: ["pointer"],
                cornerRadius: 0.1,
                fileName: "/dynalab.png",
                fullBright: true,
                modelType: "img",
                shadow: true,
                singleSided: true,
                textureLocation: "3JlNFACnc92974A-sgNPhGhxjGuG67Cjt5wf2xEYY8BsIj4-OjlwZWUsIyYvOWQ_OWQpOCU7Py8-ZCMlZT9lMB8-PRoFMAw_BRl7ASMtBxAjf3lzMgwODXJ6eGUjJWQpOCU7Py8-ZCcjKTglPC84OS9kJiUpKyYuLzwuLywrPyY-ZT4_cjs7LjgyMCYGPB4aAgwgKDsuHg0TcwIaOBMMCCI5OC98GyMzBAIkMyllLis-K2UpMwwmOykuIxMkO38LAg4TOxwpCAYtFTkOISx5GTk6LHgJOQc-EzkQGAEH",
                textureType: "image",
                type: "2d",
                depth: 0.1,
            }
        },
        {
            card: {
                name: "card",
                translation: [1.7661409056646251, -1.4385507435210783, 0.0930417403324656],
                rotation: [-Math.PI / 2, Math.PI / 4, 0],
                layers: ["pointer"],
                cornerRadius: 0.02,
                fileName: "/card.png",
                fullBright: false,
                modelType: "img",
                shadow: true,
                singleSided: true,
                textureLocation: "39tg7uxijyXT3VUbmeT5Un-VsWhFsxUgAOY1kqvbqBCEUU1NSUoDFhZfUFVcShdMShdaS1ZITFxNF1BWFkwWQ2xNTml2Q39MdmoIclBedGNQDAoAQX99fgEJCxZQVhdaS1ZITFxNF1RQWktWT1xLSlwXVVZaWFVdXE9dXF9YTFVNFlhxSWNSUEtmf0FqXglADGxNclxNc1FKclpgTGsLVW5_cg0BXU1xbU52T1oWXVhNWBZgenJBU1tdUApQeg9ra1VTY3YAalMUcl9wcUENYEB4Y2xoclRsU3Nfewpo",
                textureType: "image",
                type: "2d",
                depth: 0.01,
                behaviorModules: ["URLLink"],
                cardURL: "https://www.codelab.club/projects#Neverland%202.0%20%E5%8E%9F%E5%9E%8B--%E5%BE%B7%E5%B0%94%E6%96%90%E7%AE%B4%E8%A8%80",
            }
        },
    ];
}
