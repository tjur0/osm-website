import { generateFeatureUUID } from 'src/lib/uuid';
import { Feature } from '../entities/feature.entity';
import { parse, formatHex } from 'culori';

const featuresWithoutColor: Feature[] = [
  {
    id: generateFeatureUUID('office', 'lawyer'),
    key: 'office',
    value: 'lawyer',
    name: 'Advocaat',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'isolated_dwelling'),
    key: 'place',
    value: 'isolated_dwelling',
    name: 'Afgelegen woning',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'agrarian'),
    key: 'shop',
    value: 'agrarian',
    name: 'Agrarisch',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'general'),
    key: 'shop',
    value: 'general',
    name: 'Algemene winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'handicraft'),
    key: 'craft',
    value: 'handicraft',
    name: 'Ambachtwerkplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'antiques'),
    key: 'shop',
    value: 'antiques',
    name: 'Antiek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'pharmacy'),
    key: 'amenity',
    value: 'pharmacy',
    name: 'Apotheek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'apartment'),
    key: 'tourism',
    value: 'apartment',
    name: 'Appartement',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'archaeological_site'),
    key: 'historic',
    value: 'archaeological_site',
    name: 'Archeologische site',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'archive'),
    key: 'amenity',
    value: 'archive',
    name: 'Archief',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'architect'),
    key: 'office',
    value: 'architect',
    name: 'Architectenbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'attraction'),
    key: 'tourism',
    value: 'attraction',
    name: 'Attractie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'theme_park'),
    key: 'tourism',
    value: 'theme_park',
    name: 'Attractiepark',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'hifi'),
    key: 'shop',
    value: 'hifi',
    name: 'Audiospeciaalzaak',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'car_parts'),
    key: 'shop',
    value: 'car_parts',
    name: 'Auto-onderdelen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'car'),
    key: 'shop',
    value: 'car',
    name: 'Autogarage',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'vending_machine'),
    key: 'amenity',
    value: 'vending_machine',
    name: 'Automaat',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'car_repair'),
    key: 'shop',
    value: 'car_repair',
    name: 'Autoreparatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'car_rental'),
    key: 'amenity',
    value: 'car_rental',
    name: 'Autoverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'car_wash'),
    key: 'amenity',
    value: 'car_wash',
    name: 'Autowas',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'waste_disposal'),
    key: 'amenity',
    value: 'waste_disposal',
    name: 'Aval container',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'waste_transfer_station'),
    key: 'amenity',
    value: 'waste_transfer_station',
    name: 'Avalverwerking',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'baby_goods'),
    key: 'shop',
    value: 'baby_goods',
    name: 'Baby artikelen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'bathroom_furnishing'),
    key: 'shop',
    value: 'bathroom_furnishing',
    name: 'Badkamerinrichting',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'bakery'),
    key: 'shop',
    value: 'bakery',
    name: 'Bakker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tyres'),
    key: 'shop',
    value: 'tyres',
    name: 'Bandenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bank'),
    key: 'amenity',
    value: 'bank',
    name: 'Bank',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'pastry'),
    key: 'shop',
    value: 'pastry',
    name: 'Banketbakkerij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bench'),
    key: 'amenity',
    value: 'bench',
    name: 'Bankje',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bbq'),
    key: 'amenity',
    value: 'bbq',
    name: 'Barbecue',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'bed'),
    key: 'shop',
    value: 'bed',
    name: 'Beddenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'company'),
    key: 'office',
    value: 'company',
    name: 'Bedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'tax_advisor'),
    key: 'office',
    value: 'tax_advisor',
    name: 'Belastingadviseur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'nature_reserve'),
    key: 'leisure',
    value: 'nature_reserve',
    name: 'Beschermd natuurgebied',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'library'),
    key: 'amenity',
    value: 'library',
    name: 'Bibliotheek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'biergarten'),
    key: 'amenity',
    value: 'biergarten',
    name: 'Biergarten',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'cinema'),
    key: 'amenity',
    value: 'cinema',
    name: 'Bioscoop',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'blood_bank'),
    key: 'amenity',
    value: 'blood_bank',
    name: 'Bloedbank',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'florist'),
    key: 'shop',
    value: 'florist',
    name: 'Bloemist',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'accountant'),
    key: 'office',
    value: 'accountant',
    name: 'Boekhouder',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'books'),
    key: 'shop',
    value: 'books',
    name: 'Boekwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'farm'),
    key: 'shop',
    value: 'farm',
    name: 'Boerderijwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'boat_storage'),
    key: 'amenity',
    value: 'boat_storage',
    name: 'Bootopslag',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'boat_rental'),
    key: 'amenity',
    value: 'boat_rental',
    name: 'Bootverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'brothel'),
    key: 'amenity',
    value: 'brothel',
    name: 'Bordeel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'boat'),
    key: 'shop',
    value: 'boat',
    name: 'Botenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'builder'),
    key: 'craft',
    value: 'builder',
    name: 'Bouwbedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'construction_company'),
    key: 'office',
    value: 'construction_company',
    name: 'Bouwbedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'hardware'),
    key: 'shop',
    value: 'hardware',
    name: 'Bouwmarkt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'bowling_alley'),
    key: 'leisure',
    value: 'bowling_alley',
    name: 'Bowlingbaan',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'fire_station'),
    key: 'amenity',
    value: 'fire_station',
    name: 'Brandweerkazerne',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'letter_box'),
    key: 'amenity',
    value: 'letter_box',
    name: 'Brievenbus',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'brewery'),
    key: 'craft',
    value: 'brewery',
    name: 'Brouwerij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'outdoor'),
    key: 'shop',
    value: 'outdoor',
    name: 'Buitensportwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bus_station'),
    key: 'amenity',
    value: 'bus_station',
    name: 'Busstation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'neighbourhood'),
    key: 'place',
    value: 'neighbourhood',
    name: 'Buurt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'convenience'),
    key: 'shop',
    value: 'convenience',
    name: 'Buurtwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'gift'),
    key: 'shop',
    value: 'gift',
    name: 'Cadeauwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'cafe'),
    key: 'amenity',
    value: 'cafe',
    name: 'Café',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'camp_site'),
    key: 'tourism',
    value: 'camp_site',
    name: 'Camping',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'caravan'),
    key: 'shop',
    value: 'caravan',
    name: 'Caravan',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'caravan_site'),
    key: 'tourism',
    value: 'caravan_site',
    name: 'Caravanplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'car_pooling'),
    key: 'amenity',
    value: 'car_pooling',
    name: 'Carpoolen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'casino'),
    key: 'amenity',
    value: 'casino',
    name: 'Casino',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'caterer'),
    key: 'craft',
    value: 'caterer',
    name: 'Cateraar',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'chalet'),
    key: 'tourism',
    value: 'chalet',
    name: 'Chalet',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'chocolate'),
    key: 'shop',
    value: 'chocolate',
    name: 'Chocolaterie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bar'),
    key: 'amenity',
    value: 'bar',
    name: 'Club',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'cannabis'),
    key: 'shop',
    value: 'cannabis',
    name: 'Coffeeshop',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'computer'),
    key: 'shop',
    value: 'computer',
    name: 'Computerwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'conference_centre'),
    key: 'amenity',
    value: 'conference_centre',
    name: 'Congrescentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'consulting'),
    key: 'office',
    value: 'consulting',
    name: 'Consultancybureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'cosmetics'),
    key: 'shop',
    value: 'cosmetics',
    name: 'Cosmetica',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'coworking'),
    key: 'office',
    value: 'coworking',
    name: 'Coworking',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'crematorium'),
    key: 'amenity',
    value: 'crematorium',
    name: 'Crematorium',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'arts_centre'),
    key: 'amenity',
    value: 'arts_centre',
    name: 'Cultuurcentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'dance'),
    key: 'leisure',
    value: 'dance',
    name: 'Dans',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'car_sharing'),
    key: 'amenity',
    value: 'car_sharing',
    name: 'Deelauto',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'deli'),
    key: 'shop',
    value: 'deli',
    name: 'Delicatessen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'veterinary'),
    key: 'amenity',
    value: 'veterinary',
    name: 'Dierenarts',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'animal_boarding'),
    key: 'amenity',
    value: 'animal_boarding',
    name: 'Dierenpension',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'animal_training'),
    key: 'amenity',
    value: 'animal_training',
    name: 'Dierentraining',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'zoo'),
    key: 'tourism',
    value: 'zoo',
    name: 'Dierentuin',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'pet_grooming'),
    key: 'shop',
    value: 'pet_grooming',
    name: 'Dierenverzorging',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'pet'),
    key: 'shop',
    value: 'pet',
    name: 'Dierenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'diplomatic'),
    key: 'office',
    value: 'diplomatic',
    name: 'Diplomatiek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'doityourself'),
    key: 'shop',
    value: 'doityourself',
    name: 'Doe-het-zelf winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'doctors'),
    key: 'amenity',
    value: 'doctors',
    name: 'Dokterspraktijk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'village'),
    key: 'place',
    value: 'village',
    name: 'Dorp',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'shower'),
    key: 'amenity',
    value: 'shower',
    name: 'Douches',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'beverages'),
    key: 'shop',
    value: 'beverages',
    name: 'Dranken',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'drinking_water'),
    key: 'amenity',
    value: 'drinking_water',
    name: 'Drinkwaterpunt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'chemist'),
    key: 'shop',
    value: 'chemist',
    name: 'Drogist',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'island'),
    key: 'place',
    value: 'island',
    name: 'Eiland',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'islet'),
    key: 'place',
    value: 'islet',
    name: 'Eilandje',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'electronics'),
    key: 'shop',
    value: 'electronics',
    name: 'Elektronica winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'electronics_repair'),
    key: 'craft',
    value: 'electronics_repair',
    name: 'Electronicareparatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'electrician'),
    key: 'craft',
    value: 'electrician',
    name: 'Elektricien',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'heritage'),
    key: 'historic',
    value: 'heritage',
    name: 'Erfgoed',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'erotic'),
    key: 'shop',
    value: 'erotic',
    name: 'Erotische winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'escape_game'),
    key: 'leisure',
    value: 'escape_game',
    name: 'Escape room',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'events_venue'),
    key: 'amenity',
    value: 'events_venue',
    name: 'Evenementenlocatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'fast_food'),
    key: 'amenity',
    value: 'fast_food',
    name: 'Fastfood',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'party'),
    key: 'shop',
    value: 'party',
    name: 'Feestwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bicycle_parking'),
    key: 'amenity',
    value: 'bicycle_parking',
    name: 'Fietsenstalling',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'bicycle'),
    key: 'shop',
    value: 'bicycle',
    name: 'Fietsenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bicycle_repair_station'),
    key: 'amenity',
    value: 'bicycle_repair_station',
    name: 'Fietsreparatiestation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bicycle_rental'),
    key: 'amenity',
    value: 'bicycle_rental',
    name: 'Fietsverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'financial_advisor'),
    key: 'office',
    value: 'financial_advisor',
    name: 'Financieel adviseur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'financial'),
    key: 'office',
    value: 'financial',
    name: 'Financieele diensten',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'fitness_centre'),
    key: 'leisure',
    value: 'fitness_centre',
    name: 'Fitnesscentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'fitness_station'),
    key: 'leisure',
    value: 'fitness_station',
    name: 'Fitnessstation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'fountain'),
    key: 'amenity',
    value: 'fountain',
    name: 'Fontein',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'photographer'),
    key: 'craft',
    value: 'photographer',
    name: 'Fotograaf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'frame'),
    key: 'shop',
    value: 'frame',
    name: 'Fotolijstwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'photo'),
    key: 'shop',
    value: 'photo',
    name: 'Fotowinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'gallery'),
    key: 'tourism',
    value: 'gallery',
    name: 'Galerij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'memorial'),
    key: 'historic',
    value: 'memorial',
    name: 'Gedenkteken',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'give_box'),
    key: 'amenity',
    value: 'give_box',
    name: 'Geefdoos',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'hamlet'),
    key: 'place',
    value: 'hamlet',
    name: 'Gehucht',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'atm'),
    key: 'amenity',
    value: 'atm',
    name: 'Geldautomaat',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'common'),
    key: 'leisure',
    value: 'common',
    name: 'Gemeenschappelijk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'community_centre'),
    key: 'amenity',
    value: 'community_centre',
    name: 'Gemeenschapscentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'townhall'),
    key: 'amenity',
    value: 'townhall',
    name: 'Gemeentehuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tool_hire'),
    key: 'shop',
    value: 'tool_hire',
    name: 'Gereedschapverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'recycling'),
    key: 'amenity',
    value: 'recycling',
    name: 'Gescheiden afval inzameling',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'prison'),
    key: 'amenity',
    value: 'prison',
    name: 'Gevangenis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'health_food'),
    key: 'shop',
    value: 'health_food',
    name: 'Gezondheidsvoeding',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'healthcare'),
    key: 'office',
    value: 'healthcare',
    name: 'Gezondheidszorg',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'healthcare'),
    key: 'amenity',
    value: 'healthcare',
    name: 'Gezondheidszorg',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'glaziery'),
    key: 'craft',
    value: 'glaziery',
    name: 'Glaszetter',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'golf_course'),
    key: 'leisure',
    value: 'golf_course',
    name: 'Golfbaan',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'curtain'),
    key: 'shop',
    value: 'curtain',
    name: 'Gordijnenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'greengrocer'),
    key: 'shop',
    value: 'greengrocer',
    name: 'Groentewinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'wholesale'),
    key: 'shop',
    value: 'wholesale',
    name: 'Groothandel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'hvac'),
    key: 'craft',
    value: 'hvac',
    name: 'HVAC',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'hackerspace'),
    key: 'leisure',
    value: 'hackerspace',
    name: 'Hackerspace',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'trade'),
    key: 'shop',
    value: 'trade',
    name: 'Handel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'harbour_master'),
    key: 'office',
    value: 'harbour_master',
    name: 'Havenmeester',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'fishing'),
    key: 'shop',
    value: 'fishing',
    name: 'Hengelsportwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'fort'),
    key: 'historic',
    value: 'fort',
    name: 'Historich fort',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'building'),
    key: 'historic',
    value: 'building',
    name: 'Historich gebouw',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'house'),
    key: 'historic',
    value: 'house',
    name: 'Historich huis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'cannon'),
    key: 'historic',
    value: 'cannon',
    name: 'Historich kanon',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'castle'),
    key: 'historic',
    value: 'castle',
    name: 'Historich kasteel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'manor'),
    key: 'historic',
    value: 'manor',
    name: 'Historich landhuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'ship'),
    key: 'historic',
    value: 'ship',
    name: 'Historich schip',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'aircraft'),
    key: 'historic',
    value: 'aircraft',
    name: 'Historich vliegtuig',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'wayside_cross'),
    key: 'historic',
    value: 'wayside_cross',
    name: 'Historich wegkruis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'bridge'),
    key: 'historic',
    value: 'bridge',
    name: 'Historische Brug',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'farm'),
    key: 'historic',
    value: 'farm',
    name: 'Historische boerderij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'bomb_crater'),
    key: 'historic',
    value: 'bomb_crater',
    name: 'Historische bomkrater',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'boundary_stone'),
    key: 'historic',
    value: 'boundary_stone',
    name: 'Historische grenssteen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'church'),
    key: 'historic',
    value: 'church',
    name: 'Historische kerk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'warehouse'),
    key: 'historic',
    value: 'warehouse',
    name: 'Historische magazijn',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'ruins'),
    key: 'historic',
    value: 'ruins',
    name: 'Historische ruïne',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'citywalls'),
    key: 'historic',
    value: 'citywalls',
    name: 'Historische stadsmuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'city_gate'),
    key: 'historic',
    value: 'city_gate',
    name: 'Historische stadspoort',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'tomb'),
    key: 'historic',
    value: 'tomb',
    name: 'Historische tombe',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'water_pump'),
    key: 'historic',
    value: 'water_pump',
    name: 'Historische waterpomp',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'wayside_shrine'),
    key: 'historic',
    value: 'wayside_shrine',
    name: 'Historische wegkapel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'tower'),
    key: 'historic',
    value: 'tower',
    name: 'Historische toren',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'college'),
    key: 'amenity',
    value: 'college',
    name: 'Hogeschool',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'dog_toilet'),
    key: 'amenity',
    value: 'dog_toilet',
    name: 'Hondentoilet',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'dog_park'),
    key: 'leisure',
    value: 'dog_park',
    name: 'Hondenuitlaatplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'hearing_aids'),
    key: 'shop',
    value: 'hearing_aids',
    name: 'Hoorwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'watches'),
    key: 'shop',
    value: 'watches',
    name: 'Horlogewinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'hostel'),
    key: 'tourism',
    value: 'hostel',
    name: 'Hostel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'hotel'),
    key: 'tourism',
    value: 'hotel',
    name: 'Hotel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'gardener'),
    key: 'craft',
    value: 'gardener',
    name: 'Hoveniers',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'houseware'),
    key: 'shop',
    value: 'houseware',
    name: 'Huishoudwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'ice_cream'),
    key: 'amenity',
    value: 'ice_cream',
    name: 'IJssalon',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'ice_cream'),
    key: 'shop',
    value: 'ice_cream',
    name: 'IJssalon',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'beekeeper'),
    key: 'craft',
    value: 'beekeeper',
    name: 'Imker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'information'),
    key: 'tourism',
    value: 'information',
    name: 'Informatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'engineer'),
    key: 'office',
    value: 'engineer',
    name: 'Ingenieurbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'marina'),
    key: 'leisure',
    value: 'marina',
    name: 'Jachthaven',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'hunting_stand'),
    key: 'amenity',
    value: 'hunting_stand',
    name: 'Jachtstand',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'jewelry'),
    key: 'shop',
    value: 'jewelry',
    name: 'Juwelier',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'ticket_validator'),
    key: 'amenity',
    value: 'ticket_validator',
    name: 'Kaartjesautomaat',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'ticket'),
    key: 'shop',
    value: 'ticket',
    name: 'Kaartverkoop',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'cheese'),
    key: 'shop',
    value: 'cheese',
    name: 'Kaaswinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'camp_pitch'),
    key: 'tourism',
    value: 'camp_pitch',
    name: 'Kampeerplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'stationery'),
    key: 'shop',
    value: 'stationery',
    name: 'Kantoorartikelen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'hairdresser'),
    key: 'shop',
    value: 'hairdresser',
    name: 'Kapper',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'hairdresser_supply'),
    key: 'shop',
    value: 'hairdresser_supply',
    name: 'Kappersbenodigdheden',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'grave_yard'),
    key: 'amenity',
    value: 'grave_yard',
    name: 'Kerkhof',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'childcare'),
    key: 'amenity',
    value: 'childcare',
    name: 'Kindcentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'newsagent'),
    key: 'shop',
    value: 'newsagent',
    name: 'Kiosk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'kiosk'),
    key: 'shop',
    value: 'kiosk',
    name: 'Kiosk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tailor'),
    key: 'shop',
    value: 'tailor',
    name: 'Kledingmaker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'tailor'),
    key: 'craft',
    value: 'tailor',
    name: 'Kledingmaker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'clothes'),
    key: 'shop',
    value: 'clothes',
    name: 'Kledingwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'dressing_room'),
    key: 'amenity',
    value: 'dressing_room',
    name: 'Kleedkamer',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'kindergarten'),
    key: 'amenity',
    value: 'kindergarten',
    name: 'Kleuterschool',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'clinic'),
    key: 'amenity',
    value: 'clinic',
    name: 'Kliniek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'clock'),
    key: 'amenity',
    value: 'clock',
    name: 'Klok',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'monastery'),
    key: 'amenity',
    value: 'monastery',
    name: 'Klooster',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'coffee'),
    key: 'shop',
    value: 'coffee',
    name: 'Koffiehuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'kitchen'),
    key: 'shop',
    value: 'kitchen',
    name: 'Kookwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'copyshop'),
    key: 'shop',
    value: 'copyshop',
    name: 'Kopieerwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'second_hand'),
    key: 'shop',
    value: 'second_hand',
    name: 'Kringloopwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'pub'),
    key: 'amenity',
    value: 'pub',
    name: 'Kroeg',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'craft'),
    key: 'shop',
    value: 'craft',
    name: 'Kunstbenodigheden winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'artwork'),
    key: 'tourism',
    value: 'artwork',
    name: 'Kunstwerk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'art'),
    key: 'shop',
    value: 'art',
    name: 'Kunstwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'loading_dock'),
    key: 'amenity',
    value: 'loading_dock',
    name: 'Laadkade',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'leather'),
    key: 'shop',
    value: 'leather',
    name: 'Lederwaren',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'logistics'),
    key: 'office',
    value: 'logistics',
    name: 'Logistiek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'plumber'),
    key: 'craft',
    value: 'plumber',
    name: 'Loodgieter',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'plant_hire'),
    key: 'shop',
    value: 'plant_hire',
    name: 'Machnieverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'estate_agent'),
    key: 'office',
    value: 'estate_agent',
    name: 'Makelaardij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'horse_riding'),
    key: 'leisure',
    value: 'horse_riding',
    name: 'Manage',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'marketplace'),
    key: 'amenity',
    value: 'marketplace',
    name: 'Markt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'massage'),
    key: 'shop',
    value: 'massage',
    name: 'Massage',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'medical_supply'),
    key: 'shop',
    value: 'medical_supply',
    name: 'Medische benodigdheden',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'metal_construction'),
    key: 'craft',
    value: 'metal_construction',
    name: 'Metaalconstructie bedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'furniture'),
    key: 'shop',
    value: 'furniture',
    name: 'Meubelwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'miniature_golf'),
    key: 'leisure',
    value: 'miniature_golf',
    name: 'Midgetgolf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'mobile_phone'),
    key: 'shop',
    value: 'mobile_phone',
    name: 'Mobiele telefoon winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'fashion_accessories'),
    key: 'shop',
    value: 'fashion_accessories',
    name: 'Modeaccessoires',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'model'),
    key: 'shop',
    value: 'model',
    name: 'Modelbouwwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'monument'),
    key: 'historic',
    value: 'monument',
    name: 'Monumentaal gedenkteken',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'motorcycle_parking'),
    key: 'amenity',
    value: 'motorcycle_parking',
    name: 'Motorfiets parkeren',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'motorcycle'),
    key: 'shop',
    value: 'motorcycle',
    name: 'Motorfiets winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'museum'),
    key: 'tourism',
    value: 'museum',
    name: 'Museum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'musical_instrument'),
    key: 'shop',
    value: 'musical_instrument',
    name: 'Muziek instrumenten winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'bandstand'),
    key: 'leisure',
    value: 'bandstand',
    name: 'Muziekkoepel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'music_school'),
    key: 'amenity',
    value: 'music_school',
    name: 'Muziekschool',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'music'),
    key: 'shop',
    value: 'music',
    name: 'Muziekwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'sewing'),
    key: 'shop',
    value: 'sewing',
    name: 'Naaiwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'nightclub'),
    key: 'amenity',
    value: 'nightclub',
    name: 'Nachtclub',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'ngo'),
    key: 'office',
    value: 'ngo',
    name: 'Niet-gouvernementele organisatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'notary'),
    key: 'office',
    value: 'notary',
    name: 'Notaris',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'educational_institution'),
    key: 'office',
    value: 'educational_institution',
    name: 'Onderwijsinstelling',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'research'),
    key: 'office',
    value: 'research',
    name: 'Onderzoek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'public_bookcase'),
    key: 'amenity',
    value: 'public_bookcase',
    name: 'Open boekenkast',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'charging_station'),
    key: 'amenity',
    value: 'charging_station',
    name: 'Oplaadpunt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'storage_rental'),
    key: 'shop',
    value: 'storage_rental',
    name: 'Opslagverhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'optician'),
    key: 'shop',
    value: 'optician',
    name: 'Opticien',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'indoor_play'),
    key: 'leisure',
    value: 'indoor_play',
    name: 'Overdekt speelparadijs',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'government'),
    key: 'office',
    value: 'government',
    name: 'Overheidsinstelling',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'parcel_locker'),
    key: 'amenity',
    value: 'parcel_locker',
    name: 'Pakketkluis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'perfumery'),
    key: 'shop',
    value: 'perfumery',
    name: 'Parfumerie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'park'),
    key: 'leisure',
    value: 'park',
    name: 'Park',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'parking'),
    key: 'amenity',
    value: 'parking',
    name: 'Parkeerplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'parking_entrance'),
    key: 'amenity',
    value: 'parking_entrance',
    name: 'Parkeerplaats ingang',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'guest_house'),
    key: 'tourism',
    value: 'guest_house',
    name: 'Pension',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'compressed_air'),
    key: 'amenity',
    value: 'compressed_air',
    name: 'Perslucht',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'picnic_site'),
    key: 'tourism',
    value: 'picnic_site',
    name: 'Picknickplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'picnic_table'),
    key: 'leisure',
    value: 'picnic_table',
    name: 'Picknicktafel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'square'),
    key: 'place',
    value: 'square',
    name: 'Plein',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'polder'),
    key: 'place',
    value: 'polder',
    name: 'Polder',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'police'),
    key: 'amenity',
    value: 'police',
    name: 'Politie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'post_box'),
    key: 'amenity',
    value: 'post_box',
    name: 'Postbus',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'post_depot'),
    key: 'amenity',
    value: 'post_depot',
    name: 'Postdepot',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'post_office'),
    key: 'amenity',
    value: 'post_office',
    name: 'Postkantoor',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'pottery'),
    key: 'craft',
    value: 'pottery',
    name: 'Pottenbakkerij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'waste_basket'),
    key: 'amenity',
    value: 'waste_basket',
    name: 'Prullenbak',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'window_construction'),
    key: 'craft',
    value: 'window_construction',
    name: 'Raamconstructie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'window_blind'),
    key: 'shop',
    value: 'window_blind',
    name: 'Raamdecoratie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'courthouse'),
    key: 'amenity',
    value: 'courthouse',
    name: 'Rechtbank',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'advertising_agency'),
    key: 'office',
    value: 'advertising_agency',
    name: 'Reclamebureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'recreation_ground'),
    key: 'leisure',
    value: 'recreation_ground',
    name: 'Recreatiegebied',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'travel_agency'),
    key: 'shop',
    value: 'travel_agency',
    name: 'Reisbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'travel_agent'),
    key: 'office',
    value: 'travel_agent',
    name: 'Reisbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'place_of_worship'),
    key: 'amenity',
    value: 'place_of_worship',
    name: 'Religieuze faciliteit',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'repair'),
    key: 'shop',
    value: 'repair',
    name: 'Reparatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'resort'),
    key: 'leisure',
    value: 'resort',
    name: 'Resort',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'restaurant'),
    key: 'amenity',
    value: 'restaurant',
    name: 'Restaurant',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'driving_school'),
    key: 'amenity',
    value: 'driving_school',
    name: 'Rijschool',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'smoking_area'),
    key: 'amenity',
    value: 'smoking_area',
    name: 'Rookerszone',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'sanitary_dump_station'),
    key: 'amenity',
    value: 'sanitary_dump_station',
    name: 'Sanitaire dumpstation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'sauna'),
    key: 'leisure',
    value: 'sauna',
    name: 'Sauna',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'ice_rink'),
    key: 'leisure',
    value: 'ice_rink',
    name: 'Schaatsbaan',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'slipway'),
    key: 'leisure',
    value: 'slipway',
    name: 'Scheepshelling',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'painter'),
    key: 'craft',
    value: 'painter',
    name: 'Schilder',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'shoes'),
    key: 'shop',
    value: 'shoes',
    name: 'Schoenenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'shoemaker'),
    key: 'craft',
    value: 'shoemaker',
    name: 'Schoenmaker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'shoe_repair'),
    key: 'shop',
    value: 'shoe_repair',
    name: 'Schoenreparatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'school'),
    key: 'amenity',
    value: 'school',
    name: 'School',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'schoolyard'),
    key: 'leisure',
    value: 'schoolyard',
    name: 'Schoolplein',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'beauty'),
    key: 'shop',
    value: 'beauty',
    name: 'Schoonheidssalon',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'shelter'),
    key: 'amenity',
    value: 'shelter',
    name: 'Schuilplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'scooter'),
    key: 'shop',
    value: 'scooter',
    name: 'Scooter',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'butcher'),
    key: 'shop',
    value: 'butcher',
    name: 'Slager',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'alcohol'),
    key: 'shop',
    value: 'alcohol',
    name: 'Slijterij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'locksmith'),
    key: 'shop',
    value: 'locksmith',
    name: 'Slotenmaker',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'smartshop'),
    key: 'shop',
    value: 'smartshop',
    name: 'Smartshop',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'confectionery'),
    key: 'shop',
    value: 'confectionery',
    name: 'Snoepwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'social_facility'),
    key: 'amenity',
    value: 'social_facility',
    name: 'Sociale faciliteit',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'it'),
    key: 'office',
    value: 'it',
    name: 'Softwarebedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'toys'),
    key: 'shop',
    value: 'toys',
    name: 'Speelgoedwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'amusement_arcade'),
    key: 'leisure',
    value: 'amusement_arcade',
    name: 'Speelhal',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'playground'),
    key: 'leisure',
    value: 'playground',
    name: 'Speeltuin',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'games'),
    key: 'shop',
    value: 'games',
    name: 'Spelletjeswinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'sports_centre'),
    key: 'leisure',
    value: 'sports_centre',
    name: 'Sportcentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'sports_hall'),
    key: 'leisure',
    value: 'sports_hall',
    name: 'Sporthal',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'sports'),
    key: 'shop',
    value: 'sports',
    name: 'Sportwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'town'),
    key: 'place',
    value: 'town',
    name: 'Plaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'city'),
    key: 'place',
    value: 'city',
    name: 'Stad',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'stadium'),
    key: 'leisure',
    value: 'stadium',
    name: 'Stadion',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('historic', 'stone'),
    key: 'historic',
    value: 'stone',
    name: 'Steen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'foundation'),
    key: 'office',
    value: 'foundation',
    name: 'Stichting',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'upholsterer'),
    key: 'craft',
    value: 'upholsterer',
    name: 'Stoffeerder',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'fabric'),
    key: 'shop',
    value: 'fabric',
    name: 'Stoffenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'vacuum_cleaner'),
    key: 'amenity',
    value: 'vacuum_cleaner',
    name: 'Stofzuiger',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'dry_cleaning'),
    key: 'shop',
    value: 'dry_cleaning',
    name: 'Stomerij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'studio'),
    key: 'amenity',
    value: 'studio',
    name: 'Studio',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'supermarket'),
    key: 'shop',
    value: 'supermarket',
    name: 'Supermarkt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tobacco'),
    key: 'shop',
    value: 'tobacco',
    name: 'Tabakswinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'dentist'),
    key: 'amenity',
    value: 'dentist',
    name: 'Tandartspraktijk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'fuel'),
    key: 'amenity',
    value: 'fuel',
    name: 'Tankstation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'carpet'),
    key: 'shop',
    value: 'carpet',
    name: 'Tapijtwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'bag'),
    key: 'shop',
    value: 'bag',
    name: 'Tassenwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tattoo'),
    key: 'shop',
    value: 'tattoo',
    name: 'Tatoeagestudio',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'taxi'),
    key: 'amenity',
    value: 'taxi',
    name: 'Taxistandplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tiles'),
    key: 'shop',
    value: 'tiles',
    name: 'Tegelwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'telecommunication'),
    key: 'shop',
    value: 'telecommunication',
    name: 'Telecommunicatie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'telecommunication'),
    key: 'office',
    value: 'telecommunication',
    name: 'Telecommunicatiebedrijf',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'outdoor_seating'),
    key: 'leisure',
    value: 'outdoor_seating',
    name: 'Terras',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'theatre'),
    key: 'amenity',
    value: 'theatre',
    name: 'Theater',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'tea'),
    key: 'shop',
    value: 'tea',
    name: 'Theewinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'therapist'),
    key: 'office',
    value: 'therapist',
    name: 'Therapeut',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('craft', 'carpenter'),
    key: 'craft',
    value: 'carpenter',
    name: 'Timmerman',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'toilets'),
    key: 'amenity',
    value: 'toilets',
    name: 'Toiletten',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('railway', 'station'),
    key: 'railway',
    value: 'station',
    name: 'Treinstation',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'bleachers'),
    key: 'leisure',
    value: 'bleachers',
    name: 'Tribune',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'garden_centre'),
    key: 'shop',
    value: 'garden_centre',
    name: 'Tuincentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'charity'),
    key: 'shop',
    value: 'charity',
    name: 'Kringloopwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'funeral_hall'),
    key: 'amenity',
    value: 'funeral_hall',
    name: 'Uitvaartcentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'funeral_directors'),
    key: 'shop',
    value: 'funeral_directors',
    name: 'Uitvaartverzorging',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'employment_agency'),
    key: 'office',
    value: 'employment_agency',
    name: 'Uitzendbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'viewpoint'),
    key: 'tourism',
    value: 'viewpoint',
    name: 'Uitzichtpunt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'university'),
    key: 'amenity',
    value: 'university',
    name: 'Universiteit',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('tourism', 'holiday_village'),
    key: 'tourism',
    value: 'holiday_village',
    name: 'Vakantiedorp',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'ferry_terminal'),
    key: 'amenity',
    value: 'ferry_terminal',
    name: 'Veerboot terminal',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'association'),
    key: 'office',
    value: 'association',
    name: 'Vereniging',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'paint'),
    key: 'shop',
    value: 'paint',
    name: 'Verfwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'rental'),
    key: 'shop',
    value: 'rental',
    name: 'Verhuur',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'traffic_engineering'),
    key: 'office',
    value: 'traffic_engineering',
    name: 'Verkeersadviesbureau',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'lighting'),
    key: 'shop',
    value: 'lighting',
    name: 'Verlichting',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'nursing_home'),
    key: 'amenity',
    value: 'nursing_home',
    name: 'Verpleeghuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'binoculars'),
    key: 'amenity',
    value: 'binoculars',
    name: 'Verrekijkerwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'insurance'),
    key: 'office',
    value: 'insurance',
    name: 'Verzekeringsmaatschappij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'seafood'),
    key: 'shop',
    value: 'seafood',
    name: 'Vishandel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'fishing'),
    key: 'leisure',
    value: 'fishing',
    name: 'Visplek',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('aeroway', 'aerodrome'),
    key: 'aeroway',
    value: 'aerodrome',
    name: 'Vliegveld',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'flooring'),
    key: 'shop',
    value: 'flooring',
    name: 'Vloeren',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'nutrition_supplements'),
    key: 'shop',
    value: 'nutrition_supplements',
    name: 'Voedingssupplementen',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'food_court'),
    key: 'amenity',
    value: 'food_court',
    name: 'Voedselhal',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'bird_hide'),
    key: 'leisure',
    value: 'bird_hide',
    name: 'Vogelhut',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'variety_store'),
    key: 'shop',
    value: 'variety_store',
    name: 'Voordeelwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'suburb'),
    key: 'place',
    value: 'suburb',
    name: 'Voorstad',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'firepit'),
    key: 'leisure',
    value: 'firepit',
    name: 'Vuurplaats',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'department_store'),
    key: 'shop',
    value: 'department_store',
    name: 'Warenhuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'laundry'),
    key: 'shop',
    value: 'laundry',
    name: 'Wasserette',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'water_park'),
    key: 'leisure',
    value: 'water_park',
    name: 'Waterpark',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'water_point'),
    key: 'amenity',
    value: 'water_point',
    name: 'Waterpunt',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'water_sports'),
    key: 'shop',
    value: 'water_sports',
    name: 'Watersportwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'weighbridge'),
    key: 'amenity',
    value: 'weighbridge',
    name: 'Weegbrug',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('place', 'quarter'),
    key: 'place',
    value: 'quarter',
    name: 'Wijk',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'wine'),
    key: 'shop',
    value: 'wine',
    name: 'Wijnwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'mall'),
    key: 'shop',
    value: 'mall',
    name: 'Winkelcentrum',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'trolley_bay'),
    key: 'amenity',
    value: 'trolley_bay',
    name: 'Winkelwagentjes',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'bureau_de_change'),
    key: 'amenity',
    value: 'bureau_de_change',
    name: 'Wisselkantoor',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'interior_decoration'),
    key: 'shop',
    value: 'interior_decoration',
    name: 'Woondecoratie winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'hospital'),
    key: 'amenity',
    value: 'hospital',
    name: 'Ziekenhuis',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'tanning_salon'),
    key: 'leisure',
    value: 'tanning_salon',
    name: 'Zonnebank',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'grit_bin'),
    key: 'amenity',
    value: 'grit_bin',
    name: 'Zoutcontainer',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'dairy'),
    key: 'shop',
    value: 'dairy',
    name: 'Zuivelwinkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('leisure', 'swimming_area'),
    key: 'leisure',
    value: 'swimming_area',
    name: 'Zwemgebied',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'animal_shelter'),
    key: 'amenity',
    value: 'animal_shelter',
    name: 'Dierenasiel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'estate_agent'),
    key: 'shop',
    value: 'estate_agent',
    name: 'Makelaardij',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'reception_desk'),
    key: 'amenity',
    value: 'reception_desk',
    name: 'Receptie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'lounger'),
    key: 'amenity',
    value: 'lounger',
    name: 'Ligstoel',
    color: '',

    pois: [],
  },

  {
    id: generateFeatureUUID('shop', 'gold_buyer'),
    key: 'shop',
    value: 'gold_buyer',
    name: 'Goudwisselkantoor',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('office', 'newspaper'),
    key: 'office',
    value: 'newspaper',
    name: 'Krantenredactie',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('amenity', 'telephone'),
    key: 'amenity',
    value: 'telephone',
    name: 'Telefooncel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('shop', 'appliance'),
    key: 'shop',
    value: 'appliance',
    name: 'Grote huishoudelijke apparaten winkel',
    color: '',

    pois: [],
  },
  {
    id: generateFeatureUUID('emergency', 'defibrillator'),
    key: 'emergency',
    value: 'defibrillator',
    name: 'Defibrillator',
    color: '',

    pois: [],
  },
];

const colorMapOklch = {
  shop: 'oklch(49.6% 0.265 301.924)', // purple 700
  amenity: 'oklch(66.6% 0.179 58.318)', // amber 600
  emergency: 'oklch(79.5% 0.184 86.047)', // yellow 500
  leisure: 'oklch(64.8% 0.2 131.684)', // lime 600
  craft: 'oklch(43.2% 0.095 166.913)', // emerald 800
  club: 'oklch(50% 0.134 242.749)', // sky 700
  tourism: 'oklch(54.6% 0.245 262.881)', // blue 600
  historic: 'oklch(37.4% 0.01 67.558)', // stone 700
  place: 'oklch(58.6% 0.253 17.585)', // rose 600
  office: 'oklch(27.9% 0.041 260.031)', // slate 800
};

const defaultColorHex = formatHex(parse('oklch(37.1% 0 0)')); // neutral 700

const colorMapHex = Object.fromEntries(
  Object.entries(colorMapOklch).map(([key, oklch]) => {
    const color = parse(oklch);
    if (!color) {
      return [key, defaultColorHex];
    }
    return [key, formatHex(color)];
  }),
);

const getColorForKey = (key: string): string => {
  return colorMapHex[key] || defaultColorHex;
};

export const features = featuresWithoutColor.map((feature) => ({
  ...feature,
  color: getColorForKey(feature.key),
}));
