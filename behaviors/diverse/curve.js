class CurveActor {
    setup() {
        this.path = [
            {x: -5.6, y: -1.1, z: -9.6},
            {x: -5.6, y: -1.1, z: -8.3},
            {x: 2, y: -1.1, z: -8},
            {x: 2.9, y: -1.1, z: -9.2},
            {x: 3.4, y: -1.1, z: -12.3},
            {x: 2.5, y: -1.1, z: -12.7},
            {x: -1.9, y: -1.1, z: -11.1},
        ];

        for (const handlePos of this.path) {
            this.createCard({
                name: "handle",
                translation: [handlePos.x, handlePos.y, handlePos.z],
                type: "object",
                layers: ["pointer"],
                behaviorModules: ["CurveHandle"],
            });
        }
    }
}

class CurveHandlePawn {
    setup() {
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const boxMaterial = new THREE.MeshBasicMaterial();
        const handle = new THREE.Mesh(boxGeometry, boxMaterial);
        this.shape.add(handle);
    }
}

export default {
    modules: [
        {
            name: "Curve",
            actorBehaviors: [CurveActor],
        },
        {
            name: "CurveHandle",
            pawnBehaviors: [CurveHandlePawn],
        },
    ]
}
