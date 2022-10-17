class ElevatedStageActor {
    setup() {
        this.generateTile();
    }

    generateTile() {
        this.X = this._cardData.X || 3;
        this.Y = this._cardData.Y || 3;
        const spacingCol = 0;
        const spacingRow = 0;
        const tileWidth = 4;
        const tileDepth = 4;
        const tileHeight = 0.01;
        const stageWidth = this._cardData.width ||= tileWidth * this.X + spacingCol * (this.X + 1);
        const stageDepth = this._cardData.depth ||= tileDepth * this.Y + spacingRow * (this.Y + 1);
        const stageHeight = this._cardData.height ||= 0.01;

        for (let x = 0; x < this.X; x++) {
            for (let y = 0; y < this.Y; y++) {
                this.createCard({
                    translation: [(2 * x + 1) / 2 * tileWidth + spacingCol * (x + 1) - stageWidth / 2, (stageHeight + tileHeight) / 2,
                        -(2 * y + 1) / 2 * tileDepth - spacingRow * (y + 1) + stageDepth / 2],
                    name: `tile-${x}-${y}`,
                    behaviorModules: ["TileDisplay", "PhysicsDemo"],
                    layers: ["pointer"],
                    type: "object",
                    shadow: true,
                    scale: [1, 1, 1],
                    parent: this,
                    physicsShape: "cuboid",
                    physicsType: "velocityBased",
                    coordinate: [x, y],
                });
            }
        }
    }
}

class ElevatedStagePawn {
    setup() {
        this.generateStage();
    }

    generateStage() {
        const THREE = Microverse.THREE;
        const stageWidth = this.actor._cardData.width;
        const stageHeight = this.actor._cardData.height;
        const stageDepth = this.actor._cardData.depth;

        const stage = new THREE.Mesh(
            new THREE.BoxGeometry(stageWidth, stageHeight, stageDepth),
            new THREE.MeshStandardMaterial({color: 0x000000, toneMapped: false}),
        );

        this.shape.add(stage);
    }
}

class TileDisplayActor {
    setup() {
        this.pixelX = this._cardData.pixelX || 2;
        this.pixelY = this._cardData.pixelY || 2;
        const spacingCol = 0;
        const spacingRow = 0;
        const ledWidth = 2;
        const ledDepth = 2;
        const boardWidth = ledWidth * this.pixelX + spacingCol * (this.pixelX + 1);
        const boardDepth = ledDepth * this.pixelY + spacingRow * (this.pixelY + 1);
        const boardHeight = 0.01;

        this._cardData.physicsSize = [boardWidth, boardHeight, boardDepth];

        this.state = this.initialState(this.pixelX, this.pixelY);

        this.step();
    }

    initialState(x, y) {
        return new Array(x).fill(0).map(() => new Array(y).fill(0));
    }

    setPixel(x, y, color) {
        this.state[x][y] = color;
    }

    show(image) {
        for (let x = 0; x < this.pixelX; x++) {
            for (let y = 0; y < this.pixelY; y++) {
                this.state[x][y] = image[y][x];
            }
        }
        this.say("render");
    }

    randomColor() {
        let h = Math.random();
        let s = 0.8;
        let v = 0.8;
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return Math.round(b * 255) | Math.round(g * 255) << 8 | Math.round(r * 255) << 16;
    }

    step() {
        for (let x = 0; x < this.pixelX; x++) {
            for (let y = 0; y < this.pixelY; y++) {
                this.setPixel(x, y, this.randomColor());
            }
        }
        this.say("render");
        this.future(500).step();
    }
}

class TileDisplayPawn {
    setup() {
        this.generatePixel();

        this.render();
        this.listen("render", "render");
    }

    generatePixel() {
        const THREE = Microverse.THREE;
        this.leds = [];
        this.pixelX = this.actor._cardData.pixelX || 2;
        this.pixelY = this.actor._cardData.pixelY || 2;
        const spacingCol = 0;
        const spacingRow = 0;
        const ledWidth = 2;
        const ledDepth = 2;
        const ledHeight = 0.01;
        const boardWidth = ledWidth * this.pixelX + spacingCol * (this.pixelX + 1);
        const boardDepth = ledDepth * this.pixelY + spacingRow * (this.pixelY + 1);
        const boardHeight = 0.01;

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth),
            new THREE.MeshBasicMaterial({color: 0x000000, toneMapped: false}),
        );

        for (let x = 0; x < this.pixelX; x++) {
            for (let y = 0; y < this.pixelY; y++) {
                const led = new THREE.Mesh(
                    new THREE.BoxGeometry(ledWidth, ledHeight, ledDepth),
                    new THREE.MeshBasicMaterial({color: 0x000000, toneMapped: false}));
                const translation = [(2 * x + 1) / 2 * ledWidth + spacingCol * (x + 1) - boardWidth / 2, (boardHeight + ledHeight) / 2,
                    -(2 * y + 1) / 2 * ledDepth - spacingRow * (y + 1) + boardDepth / 2];
                led.position.set(translation[0], translation[1], translation[2]);
                board.add(led);
                this.leds.push(led);
            }
        }

        this.shape.add(board);
    }

    render() {
        for (let x = 0; x < this.pixelX; x++) {
            for (let y = 0; y < this.pixelY; y++) {
                const on = this.actor.state[x][y];
                const led = this.leds[x * this.pixelY + y];
                if (on) {
                    const color = this.actor.state[x][y];
                    led.material.color.set(color);
                } else {
                    led.material.color.set(0x000000);
                }
            }
        }
    }
}

class MoveCuboidActor {
    setup() {
        if (!this.physicsWorld) {
            let physicsManager = this.service("PhysicsManager");
            // console.log("new global physics world");
            this.setPhysicsWorld(physicsManager.createGlobalWorld({timeStep: 20}, this.id));
        }

        this.removeObjects();

        this.createCard({
            parent: this,
            name: "cuboid1",
            type: "object",
            layers: ["pointer"],
            behaviorModules: ["Physics", "PhysicsDemo"],
            physicsSize: [5, 0.3, 5],
            color: 0x997777,
            physicsShape: "cuboid",
            physicsType: "positionBased",
            shadow: true,
        });

        this.createCard({
            parent: this,
            name: "cuboid2",
            type: "object",
            layers: ["pointer"],
            behaviorModules: ["Physics", "PhysicsDemo"],
            physicsSize: [1.5, 0.3, 1.5],
            color: 0xff0000,
            physicsShape: "cuboid",
            physicsType: "velocityBased",
            shadow: true,
            translation: [0, 0.5, 0],
            running: true,
        });

        this.createCard({
            parent: this,
            name: "cuboid3",
            type: "object",
            layers: ["pointer"],
            behaviorModules: ["Physics", "PhysicsDemo"],
            physicsSize: [1, 0.3, 1],
            color: 0x00ff00,
            physicsShape: "cuboid",
            physicsType: "dynamic",
            shadow: true,
            translation: [0, 1, 0],
        });

        this.createCard({
            parent: this,
            name: "cuboid4",
            type: "object",
            layers: ["pointer"],
            behaviorModules: ["Physics", "PhysicsDemo"],
            physicsSize: [0.8, 0.3, 0.8],
            color: 0xffff00,
            physicsShape: "cuboid",
            physicsType: "dynamic",
            shadow: true,
            translation: [0, 1.5, 0],
        });
    }

    removeObjects() {
        if (this.children) {
            [...this.children].forEach((c) => c.destroy());
        }
    }

    removePhysics() {
        if (this.physicsWorld) {
            this.physicsWorld.destroy();
        }
    }

    teardown() {
        this.removeObjects();
        this.removePhysics();
    }
}

class PhysicsDemoActor {
    setup() {
        if (!this.physicsWorld) {
            const physicsManager = this.service("PhysicsManager");
            // console.log("new global physics world");
            this.setPhysicsWorld(physicsManager.createGlobalWorld({timeStep: 20}, this.id));
        }

        const physicsShape = this._cardData.physicsShape || "cuboid";
        const physicsType = this._cardData.physicsType || "positionBased";

        let kinematic;
        if (physicsType === "positionBased") {
            kinematic = Microverse.Physics.RigidBodyDesc.kinematicPositionBased();
        } else if (physicsType === "velocityBased") {
            kinematic = Microverse.Physics.RigidBodyDesc.kinematicVelocityBased();
        } else if (physicsType === "dynamic") {
            kinematic = Microverse.Physics.RigidBodyDesc.dynamic();
        }
        this.call("Physics$PhysicsActor", "createRigidBody", kinematic);

        let cd;
        if (physicsShape === "ball") {
            let s = this._cardData.physicsSize || 1;
            s = s / 2;
            cd = Microverse.Physics.ColliderDesc.ball(s);
        } else if (physicsShape === "cuboid") {
            let s = this._cardData.physicsSize || [1, 1, 1];
            s = [s[0] / 2, s[1] / 2, s[2] / 2];
            cd = Microverse.Physics.ColliderDesc.cuboid(...s);
        } else if (physicsShape === "cylinder") {
            let s = this._cardData.physicsSize || [1, 1];
            s = [s[1] / 2, s[0]];
            cd = Microverse.Physics.ColliderDesc.cylinder(...s);
        }
        this.collider = this.call("Physics$PhysicsActor", "createCollider", cd);

        if (physicsType === "velocityBased") {
            this.t = 0;
            this.tick();
            this.running = this._cardData.running || false;
            this.movePlatform();
            this.addEventListener("pointerDown", "toggle");
        } else if (physicsType === "dynamic") {
            this.addEventListener("pointerTap", "jolt");
        }

        this.listen("translating", "translated");
    }

    translated() {
        if (this._translation[1] < -10) {
            this.destroy();
        }
    }

    tick() {
        let r = this.rigidBody;
        const t = r.translation();
        const v = [t.x, t.y, t.z];
        this.set({translation: v});
        this.future(20).tick();
    }

    movePlatform() {
        let r = this.rigidBody;
        if (!this.running) {
            r.setLinvel({x: 0, y: 0, z: 0}, true);
            return;
        }
        const dy = Math.sin(this.t);
        r.setLinvel({x: 0, y: dy, z: 0}, true);
        this.t += 0.05;
        if (this.t > 2 * Math.PI) {
            this.t = 0;
        }
        this.future(20).movePlatform();
    }

    toggle() {
        this.running = !this.running;
        if (this.running) {
            this.movePlatform();
        }
    }

    jolt() {
        let r = this.rigidBody;
        r.applyImpulse({x: 0, y: 1, z: 0}, true);
    }
}

class PhysicsDemoPawn {
    setup() {
        // [...this.shape.children].forEach((c) => this.shape.remove(c));
        if (this.shape.children.length === 0) {
            let physicsShape = this.actor._cardData.physicsShape;
            if (physicsShape === "cuboid") {
                let s = this.actor._cardData.physicsSize || [1, 1, 1];
                let geometry = new Microverse.THREE.BoxGeometry(...s);
                let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xff0000});
                this.obj = new Microverse.THREE.Mesh(geometry, material);
                this.obj.castShadow = this.actor._cardData.shadow;
                this.obj.receiveShadow = this.actor._cardData.shadow;
            } else if (physicsShape === "cylinder") {
                let s = this.actor._cardData.physicsSize || [1, 1];
                let geometry = new Microverse.THREE.CylinderGeometry(s[0], s[0], s[1], 20);
                let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xff0000});
                this.obj = new Microverse.THREE.Mesh(geometry, material);
                this.obj.castShadow = this.actor._cardData.shadow;
                this.obj.receiveShadow = this.actor._cardData.shadow;
            } else if (physicsShape === "ball") {
                let s = this.actor._cardData.physicsSize || 1;
                let geometry = new Microverse.THREE.SphereGeometry(s / 2, 32, 16);
                let material = new Microverse.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xff0000});
                this.obj = new Microverse.THREE.Mesh(geometry, material);
                this.obj.castShadow = this.actor._cardData.shadow;
                this.obj.receiveShadow = this.actor._cardData.shadow;
            }
            this.shape.add(this.obj);
        }
    }
}

export default {
    modules: [
        {
            name: "ElevatedStage",
            actorBehaviors: [ElevatedStageActor],
            pawnBehaviors: [ElevatedStagePawn]
        },
        {
            name: "TileDisplay",
            actorBehaviors: [TileDisplayActor],
            pawnBehaviors: [TileDisplayPawn]
        },
        {
            name: "MoveCuboid",
            actorBehaviors: [MoveCuboidActor]
        },
        {
            name: "PhysicsDemo",
            actorBehaviors: [PhysicsDemoActor],
            pawnBehaviors: [PhysicsDemoPawn]
        }
    ]
}

/* globals Microverse */
