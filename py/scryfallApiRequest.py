import requests
import json
import os


def download_image(url, filepath):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filepath, 'wb') as file:
            file.write(response.content)

    else:
        print('Failed to download image:', response.status_code)


def get_cards_from_set(set_code):
    url = f"https://api.scryfall.com/cards/search?q=e:{set_code}"
    all_cards = []
    has_more = True
    page = 1

    while has_more:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            cards = data.get('data', [])
            all_cards.extend(cards)
            has_more = data.get('has_more', False)

            if has_more:
                url = data.get('next_page')
                page += 1

        else:
            print('Failed to get cards:', response.status_code)
            has_more = False

    return all_cards


def format_card_name_for_path(card_name):
    return card_name.replace('/', '-').replace(' ', '_')


def create_json_with_prices_and_download_images(set_code, image_size='normal'):
    output_files = f'cards_{set_code}.json'
    output_folder = f'images_{set_code}'

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    else:
        for file in os.listdir(output_folder):
            os.remove(os.path.join(output_folder, file))

    cards = get_cards_from_set(set_code)
    cards_with_prices_and_paths = []

    for card in cards:

        card_name = card['name']
        rarity = card['rarity']
        set_name = card['set_name']
        set_uri = card['set_uri']

        price_eur = card['prices'].get('eur')
        mana_cost = card.get('mana_cost')
        power = card.get('power')
        toughness = card.get('toughness')
        loyalty = card.get('loyalty')
        card_type = card.get('type_line')
        oracle_text = card.get('oracle_text')
        colors = card.get('colors', [])

        formatted_name = format_card_name_for_path(card_name)
        image_path = f"../../assets/{output_folder}/{formatted_name}.jpg"
        image_uris = card.get('image_uris')

        if 'image_uris' in card:
            image_url = card['image_uris'].get(image_size)
            if image_url:
                download_image(image_url, os.path.join(output_folder, f"{formatted_name}.jpg"))

        cards_with_prices_and_paths.append({
            'name': card_name,
            'rarity': rarity,
            'set_name': set_name,
            'set_uri': set_uri,
            'price_eur': price_eur,
            'mana_cost': mana_cost,
            'power': power,
            'toughness': toughness,
            'loyalty': loyalty,
            'type': card_type,
            'oracle_text': oracle_text,
            'path': image_path,
            'image_uris': image_uris,
            'colors': colors if colors else 'Colorless'
        })

    with open(output_files, 'w', encoding='utf-8') as f:
        json.dump(cards_with_prices_and_paths, f, ensure_ascii=False, indent=4)

    print(f'Created {output_files} with {len(cards_with_prices_and_paths)} cards')


extensions = input('Enter the set code: ')
create_json_with_prices_and_download_images(extensions)

