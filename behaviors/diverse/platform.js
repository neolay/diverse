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
            if (!this.running) {
                this.running = true;
                this.movePlatform();
            }
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
