class CrystalballPawn {
    setup() {
        const material = new THREE.MeshStandardMaterial({
            roughness: 0.3,
            metalness: 0.2
        });
        this.crystalball = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 16),
            material
        );
        this.shape.add(this.crystalball);
    }
}

export default {
    modules: [
        {
            name: "Crystalball",
            pawnBehaviors: [CrystalballPawn],
        }
    ]
}
