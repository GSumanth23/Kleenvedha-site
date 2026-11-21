// Business details — edit here, used everywhere on the site.
export const BUSINESS = {
  name: 'Kleen Vedha Solutions',
  legalName: 'Kleen Vedha Solutions LLP',
  phoneDisplay: '+91 63029 74492',
  phone: '+916302974492',
  whatsapp: '916302974492', // digits only, with country code
  email: 'sales@kleenvedha.com',
  city: 'Hyderabad, Telangana',
  freeDeliveryAbove: 27000,
  upiId: 'yespay.bizsbiz278681@yesbankltd',
  upiName: 'KLEEN VEDHA SOLUTIONS LLP',
  // Exact link encoded in the Yes Bank QR (merchant code included)
  upiLink: 'upi://pay?mc=5812&pa=yespay.bizsbiz278681@yesbankltd&pn=KLEEN%20VEDHA%20SOLUTIONS%20LLP&cu=INR',
}

// MRP from the Sept 2026 price list. `null` = price on request.
// Every product (except where noted) is also available in 50 L cans for bulk buyers.
export const CATEGORIES = [
  { id: 'all', label: 'All products' },
  { id: 'surface', label: 'Bathroom & Surfaces' },
  { id: 'glass', label: 'Glass & Steel' },
  { id: 'kitchen', label: 'Kitchen & Dish' },
  { id: 'laundry', label: 'Laundry & Fabric' },
  { id: 'hygiene', label: 'Hygiene & Fragrance' },
  { id: 'industrial', label: 'Bulk Chemicals' },
]

export const PRODUCTS = [
  {
    id: 'k1', code: 'K1', name: 'Bathroom Cleaner cum Sanitiser', tag: 'Concentrate',
    desc: 'Heavy-duty concentrate that cleans and sanitises tiles, sanitaryware and bathroom fittings.',
    cat: 'surface', color: '#1d8fd1',
    packs: [['1 L', 149], ['5 L', 810]], bulk: true,
  },
  {
    id: 'k2', code: 'K2', name: 'Hygienic & Hard Surface Cleaner',
    desc: 'Daily floor and hard-surface cleaner. Fragrances: Lemon, Floral, Lavender & Citrus.',
    cat: 'surface', color: '#7bb83a',
    packs: [['500 ml', 110], ['1 L', 210], ['5 L', 810]], bulk: true,
  },
  {
    id: 'k3c', code: 'K3', name: 'Glass & Mirror Cleaner', tag: 'Concentrate 1:15',
    desc: 'Dilute 1 part in 15 parts water for streak-free glass, mirrors and glazed surfaces.',
    cat: 'glass', color: '#24b5c9',
    packs: [['5 L', 1499]], bulk: false,
  },
  {
    id: 'k3r', code: 'K3', name: 'Glass & Mirror Cleaner', tag: 'Ready to use',
    desc: 'Spray-and-wipe formula for windows, mirrors, glass tables and display counters.',
    cat: 'glass', color: '#3fc6d6',
    packs: [['500 ml', 105], ['1 L', 149], ['5 L', 810]], bulk: true,
  },
  {
    id: 'k4', code: 'K4', name: 'Stainless Steel Cleaner & Polish',
    desc: 'Cleans and polishes lifts, kitchen steel, railings and fixtures without smears.',
    cat: 'glass', color: '#7d8a99',
    packs: [['5 L', 2499]], bulk: true,
  },
  {
    id: 'k5', code: 'K5', name: 'Air Freshener',
    desc: 'Long-lasting room fragrance for offices, washrooms, lobbies and homes.',
    cat: 'hygiene', color: '#c86fc9',
    packs: [['500 ml', 189], ['1 L', 189], ['5 L', 1050]], bulk: true,
  },
  {
    id: 'k6', code: 'K6', name: 'Toilet Bowl Cleaner',
    desc: 'Thick formula that removes stains, scale and odour from toilet bowls and urinals.',
    cat: 'surface', color: '#2f5fd0',
    packs: [['500 ml', 110], ['1 L', 220], ['5 L', 810]], bulk: true,
  },
  {
    id: 'k7', code: 'K7', name: 'Furniture Maintainer',
    desc: 'Cleans and conditions wooden and laminated furniture. Supplied in bulk cans.',
    cat: 'glass', color: '#a0703c',
    packs: [['50 L', null]], bulk: false,
  },
  {
    id: 'phenyl', name: 'Perfumed Phenyl',
    desc: 'Disinfectant floor phenyl in Rose, Lemon, Sandal and Jasmine fragrances.',
    cat: 'surface', color: '#e2a52b',
    packs: [['1 L', 90], ['5 L', 490]], bulk: true,
  },
  {
    id: 'multi', name: 'Multi Purpose Cleaner', tag: 'Hypo based',
    desc: 'Hypochlorite-based cleaner for bathrooms, floors and tough everyday dirt.',
    cat: 'surface', color: '#16a085',
    packs: [['500 ml', 110], ['1 L', 149], ['5 L', 990]], bulk: false,
  },
  {
    id: 'dish', name: 'Dish Wash Liquid',
    desc: 'Cuts grease fast on utensils, glassware and cookware. Gentle on hands.',
    cat: 'kitchen', color: '#9ccc3d',
    packs: [['250 ml', 99], ['500 ml', 175], ['1 L', 189], ['5 L', 999]], bulk: true,
  },
  {
    id: 'kitchen', name: 'Kitchen Cleaner & Degreaser',
    desc: 'Removes burnt-on oil and grease from stoves, chimneys, tiles and commercial kitchens.',
    cat: 'kitchen', color: '#e0662f',
    packs: [['500 ml', 496]], bulk: false,
  },
  {
    id: 'hand', name: 'Hand Wash',
    desc: 'Liquid hand wash soap for washrooms, kitchens and hospitals.',
    cat: 'hygiene', color: '#ef7fa0',
    packs: [['500 ml', 210], ['1 L', 210], ['5 L', 900]], bulk: true,
  },
  {
    id: 'soapoil', name: 'Soap Oil', tag: 'Liquid soap',
    desc: 'Economical liquid soap for general washing and housekeeping use.',
    cat: 'hygiene', color: '#d9b84a',
    packs: [['5 L', 620]], bulk: true,
  },
  {
    id: 'laundry', name: 'Laundry Wash Liquid',
    desc: 'Liquid detergent for front-load, top-load and hand wash.',
    cat: 'laundry', color: '#3a7bd5',
    packs: [['1 L', 290], ['5 L', 1099]], bulk: true,
  },
  {
    id: 'fabsofty', name: 'FabSofty', tag: 'Fabric conditioner',
    desc: 'Leaves clothes, linen and towels soft and fresh-smelling.',
    cat: 'laundry', color: '#8f7ce0',
    packs: [['500 ml', null], ['5 L', 1299]], bulk: false,
  },
  {
    id: 'fabmazic', name: 'FabMazic', tag: 'Fabric whitener',
    desc: 'Fabric whitener with stain remover for whites, uniforms and hotel linen.',
    cat: 'laundry', color: '#5ab0e6',
    packs: [['5 L', 999]], bulk: false,
  },
  {
    id: 'acid', name: 'Cleaning Acid',
    desc: 'Descaler for hard-water stains and heavy deposits on tiles and sanitaryware.',
    cat: 'industrial', color: '#c0392b',
    packs: [['1 L', 50], ['5 L', 400]], bulk: true,
  },
  {
    id: 'hypo', name: 'Sodium Hypochlorite 10%', tag: 'Hypo',
    desc: 'Disinfectant and bleaching solution for water treatment and sanitation.',
    cat: 'industrial', color: '#2c9d8f',
    packs: [['5 L', 800]], bulk: false,
  },
  {
    id: 'bleach', name: 'Bleaching Powder',
    desc: 'Disinfectant powder for drains, open areas, toilets and sanitation.',
    cat: 'industrial', color: '#95a5a6', powder: true,
    packs: [['25 kg', 1500]], bulk: false,
  },
]

export const ALSO_SUPPLY = [
  { title: 'TASKI products', text: 'Professional cleaning chemicals for hotels, hospitals and facility teams.' },
  { title: 'Crew range', text: 'Trusted household and institutional cleaners in stock.' },
  { title: 'Housekeeping items', text: 'Mops, brooms, wipers, dusters, garbage bags, trolleys and more.' },
  { title: 'Office stationery', text: 'Paper, files, pens and everyday office supplies, delivered with your order.' },
]
