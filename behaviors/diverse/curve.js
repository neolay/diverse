class CurveActor {
    setup() {
        const path = [
            {x: -5.6, y: -1.1, z: -9.6},
            {x: -5.6, y: -1.1, z: -8.3},
            {x: 2, y: -1.1, z: -8},
            {x: 2.9, y: -1.1, z: -9.2},
            {x: 3.4, y: -1.1, z: -12.3},
            {x: 2.5, y: -1.1, z: -12.7},
            {x: -1.9, y: -1.1, z: -11.1},
        ];

        // for (const handlePos of path) {
        //     this.createCard({
        //         name: "handle",
        //         translation: [handlePos.x, handlePos.y, handlePos.z],
        //         type: "object",
        //         layers: ["pointer"],
        //         behaviorModules: ["CurveHandle"],
        //     });
        // }

        this.createCard({
            name: "car",
            type: "object",
            layers: ["pointer"],
            path: path,
            behaviorModules: ["ObjectToCurve"],
        });
    }
}

class ObjectToCurveActor {
    setup() {
        this.step();
    }

    step() {
        this.future(20).step();
        this.say("updateCar", this.now());
    }
}

class ObjectToCurvePawn {
    setup() {
        this.loopTime = 5 * 1000;

        const gltfLoader = new THREE.GLTFLoader().setPath("../assets/3D/");
        gltfLoader.load("car1.glb", (gltf) => {
            this.car = gltf.scene;
            this.car.scale.set(0.1, 0.1, 0.1);
            this.shape.add(this.car);
            this.listen("updateCar", this.update);
        });

        this.curve = new THREE.CatmullRomCurve3(
            this.actor._cardData.path.map(
                handle => new THREE.Vector3(handle.x, handle.y, handle.z)
            )
        );
        this.curve.curveType = 'centripetal';
        this.curve.closed = true;

        // const points = this.curve.getPoints(50);
        // const line = new THREE.LineLoop(
        //     new THREE.BufferGeometry().setFromPoints(points),
        //     new THREE.LineBasicMaterial({color: 0x00ff00})
        // );
        // this.shape.add(line);
    }

    forwardBy(progress) {
        const position = this.curve.getPointAt(progress);
        this.car.position.copy(position);
    }

    lookAt(progress) {
        const tangent = this.curve.getTangentAt(progress);
        const position = this.curve.getPointAt(progress);
        this.car.lookAt(tangent.add(position));
    }

    update(now) {
        const progress = (now % this.loopTime) / this.loopTime;
        this.forwardBy(progress);
        this.lookAt(progress);
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
            name: "ObjectToCurve",
            actorBehaviors: [ObjectToCurveActor],
            pawnBehaviors: [ObjectToCurvePawn],
        },
        {
            name: "CurveHandle",
            pawnBehaviors: [CurveHandlePawn],
        },
    ]
}
