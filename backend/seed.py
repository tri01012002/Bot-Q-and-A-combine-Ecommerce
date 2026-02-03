from database import SessionLocal, init_db, Product

def seed_data():
    init_db()
    db = SessionLocal()

    # Check if data exists
    if db.query(Product).count() > 0:
        print("Database already seeded.")
        return

    products = [
        Product(
            name="Paracetamol 500mg",
            description="Effective pain reliever and fever reducer.",
            price=50000,
            image_url="https://example.com/para.jpg",
            category="OTC"
        ),
        Product(
            name="Ginger Tea (Tra Gung)",
            description="Natural remedy for stomach upset and cold.",
            price=35000,
            image_url="https://example.com/ginger.jpg",
            category="Herbal"
        ),
        Product(
            name="Vitamin C 1000mg",
            description="Boosts immune system to fight flu and colds.",
            price=120000,
            image_url="https://example.com/vitc.jpg",
            category="Supplement"
        ),
        Product(
            name="Cooling Patch (Mieng Dan Ha Sot)",
            description="Provides immediate cooling relief for fever.",
            price=25000,
            image_url="https://example.com/patch.jpg",
            category="OTC"
        ),
        Product(
            name="Cough Syrup (Siro Ho)",
            description="Relieves dry and chesty coughs.",
            price=60000,
            image_url="https://example.com/cough.jpg",
            category="OTC"
        ),
    ]

    for p in products:
        db.add(p)
    
    db.commit()
    print("Seeded sample products.")

if __name__ == "__main__":
    seed_data()
