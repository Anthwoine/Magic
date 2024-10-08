CREATE DATABASE magicDB;

USE magicDB;

-- Création de la table cards
CREATE TABLE cartes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    rarity VARCHAR(50),
    set_name VARCHAR(255),
    set_uri VARCHAR(255),
    price_eur DECIMAL(10, 2),
    mana_cost VARCHAR(50),
    power VARCHAR(10),
    toughness VARCHAR(10),
    loyalty VARCHAR(10),
    type VARCHAR(255),
    oracle_text TEXT,
    image_uri VARCHAR(255),
    colors VARCHAR(50),
    favoris BOOLEAN DEFAULT FALSE
);

-- Insertion des données
INSERT INTO cartes (name, rarity, set_name, set_uri, price_eur, mana_cost, power, toughness, loyalty, type, oracle_text, image_uri, colors)
VALUES
('Affectionate Indrik', 'uncommon', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 0.05, '{5}{G}', '4', '4', NULL, 'Creature — Beast', 'When Affectionate Indrik enters, you may have it fight target creature you don''t control. (Each deals damage equal to its power to the other.)', 'https://cards.scryfall.io/normal/front/b/4/b4c8ddc1-d95c-499f-b1d1-f608f8f07b02.jpg?1572893293', 'G'),
('Arboretum Elemental', 'uncommon', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 0.10, '{7}{G}{G}', '7', '5', NULL, 'Creature — Elemental', 'Convoke (Your creatures can help cast this spell. Each creature you tap while casting this spell pays for {1} or one mana of that creature''s color.)\nHexproof (This creature can''t be the target of spells or abilities your opponents control.)', 'https://cards.scryfall.io/normal/front/6/f/6f4400bf-134b-4011-985d-eed4e5ba1de8.jpg?1572893300', 'G'),
('Arclight Phoenix', 'mythic', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 2.23, '{3}{R}', '3', '2', NULL, 'Creature — Phoenix', 'Flying, haste\nAt the beginning of combat on your turn, if you''ve cast three or more instant and sorcery spells this turn, return Arclight Phoenix from your graveyard to the battlefield.', 'https://cards.scryfall.io/normal/front/7/8/787de9ce-02c5-4a17-a88b-d38e83dbeb0b.jpg?1572893092', 'R'),
('Artful Takedown', 'common', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 0.09, '{2}{U}{B}', NULL, NULL, NULL, 'Instant', 'Choose one or both —\n• Tap target creature.\n• Target creature gets -2/-4 until end of turn.', 'https://cards.scryfall.io/normal/front/4/c/4c9e8f24-af62-4d13-bfed-a8b3294b64c3.jpg?1572893491', 'B,U'),
('Assassin''s Trophy', 'rare', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 1.90, '{B}{G}', NULL, NULL, NULL, 'Instant', 'Destroy target permanent an opponent controls. Its controller may search their library for a basic land card, put it onto the battlefield, then shuffle.', 'https://cards.scryfall.io/normal/front/9/0/906b6e99-128f-4c11-8daf-16099d35b0d4.jpg?1572893498', 'B,G'),
('Assure // Assemble', 'rare', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 0.14, '{G/W}{G/W} // {4}{G}{W}', NULL, NULL, NULL, 'Instant // Instant', NULL, 'https://cards.scryfall.io/normal/front/a/d/ad454e7a-06c9-4694-ae68-7b1431e00077.jpg?1572893958', 'G,W'),
('Attendant of Vraska', 'uncommon', 'Guilds of Ravnica', 'https://api.scryfall.com/sets/597c6d4a-8212-4903-a6af-12c4ae9e13f0', 0.22, '{1}{B}{G}', '3', '3', NULL, 'Creature — Zombie Soldier', 'When Attendant of Vraska dies, if you control a Vraska planeswalker, you gain life equal to Attendant of Vraska''s power.', 'https://cards.scryfall.io/normal/front/7/f/7f4840f1-3db3-4ba6-b75b-bbd87251a3af.jpg?1572894298', 'B,G');
