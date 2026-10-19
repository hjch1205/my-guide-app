import { categories, type Address, type Product } from '../types.ts'

function asset(file: string) {
  return `${import.meta.env.BASE_URL}${file}`
}

export { categories }

export const FREE_SHIPPING_AT = 150
export const SHIPPING_FEE = 12

export const addresses: Address[] = [
  {
    id: 'brooklyn',
    name: 'Jordan Hale',
    line1: '184 Bergen Street',
    city: 'Brooklyn',
    region: 'NY',
    postalCode: '11217',
    country: 'United States',
  },
  {
    id: 'austin',
    name: 'Jordan Hale',
    line1: '908 E 5th Street',
    city: 'Austin',
    region: 'TX',
    postalCode: '78702',
    country: 'United States',
  },
]

export const shopper = {
  name: 'Jordan Hale',
  email: 'jordan.hale@email.com',
}

export const products: Product[] = [
  {
    id: 'graphite-floor-lamp',
    slug: 'graphite-floor-lamp',
    title: 'Graphite Floor Lamp',
    sellingPoint: 'A matte shade you can tilt and aim.',
    description:
      'The arm reaches over a sofa or a reading chair without asking for a side table. Powder-coated steel, with a stem slim enough to disappear against a white wall.',
    category: 'lighting',
    price: 240,
    originalPrice: 310,
    image: asset('products/arc-lamp.jpg'),
    material: 'Powder-coated steel',
    colors: [{ id: 'graphite', name: 'Graphite', hex: '#4d5256' }],
    featured: true,
  },
  {
    id: 'cone-pendant',
    slug: 'cone-pendant',
    title: 'Cone Pendant',
    sellingPoint: 'A single shade for a table of two.',
    description:
      'Spun metal, painted a soft grey, hung on a cloth cord. Wide enough to light a dining table, quiet enough for a hallway.',
    category: 'lighting',
    price: 128,
    originalPrice: 168,
    image: asset('products/pendant.jpg'),
    material: 'Spun steel, cloth cord',
    colors: [{ id: 'grey', name: 'Grey', hex: '#c5c7c4' }],
    featured: false,
  },
  {
    id: 'brass-dome-cluster',
    slug: 'brass-dome-cluster',
    title: 'Brass Dome Cluster',
    sellingPoint: 'Five domes, hung at different heights.',
    description:
      'Brushed brass shades on black cords. Group them over a kitchen island, or let one hang alone above a desk.',
    category: 'lighting',
    price: 420,
    originalPrice: 540,
    image: asset('products/table-lamp.jpg'),
    material: 'Brushed brass',
    colors: [{ id: 'brass', name: 'Brass', hex: '#c6a15b' }],
    featured: true,
  },
  {
    id: 'enamel-pendant',
    slug: 'enamel-pendant',
    title: 'Enamel Pendant',
    sellingPoint: 'Factory shade, softened for a dining room.',
    description:
      'A wide enamel shade that throws light down onto the table and keeps the ceiling calm. Comes with a short canopy and two metres of cord.',
    category: 'lighting',
    price: 96,
    originalPrice: 128,
    image: asset('products/sconce.jpg'),
    material: 'Enamel on steel',
    colors: [{ id: 'white', name: 'White', hex: '#f4f1ea' }],
    featured: false,
  },
  {
    id: 'washed-bed-linen',
    slug: 'washed-bed-linen',
    title: 'Washed Bed Linen',
    sellingPoint: 'Already wrinkled, softer after the first wash.',
    description:
      'A stonewashed cotton duvet cover with a lived-in hand. Queen size, with coconut buttons at the foot. Pillowcases are cut from the same cloth.',
    category: 'textiles',
    price: 168,
    originalPrice: 220,
    image: asset('products/duvet.jpg'),
    material: 'Stonewashed cotton',
    colors: [{ id: 'white', name: 'White', hex: '#f7f4ee' }],
    featured: true,
  },
  {
    id: 'down-pillow',
    slug: 'down-pillow',
    title: 'Down Sleeping Pillow',
    sellingPoint: 'A high loft that still packs flat for travel.',
    description:
      'Filled with a blend that holds its shape through the night. The cover is a tight cotton percale you can wash and refill.',
    category: 'textiles',
    price: 68,
    originalPrice: 88,
    image: asset('products/throw.jpg'),
    material: 'Cotton percale, down blend',
    colors: [{ id: 'white', name: 'White', hex: '#ffffff' }],
    featured: false,
  },
  {
    id: 'knit-throw',
    slug: 'knit-throw',
    title: 'Heirloom Knit Throw',
    sellingPoint: 'Heavy stitch, with tassels that actually stay on.',
    description:
      'A chunky cotton-wool throw for the foot of the bed or the back of a sofa. Large enough for one person, not so heavy it slides off.',
    category: 'textiles',
    price: 98,
    originalPrice: 140,
    image: asset('products/towel.jpg'),
    material: 'Cotton and wool',
    colors: [
      { id: 'ivory', name: 'Ivory', hex: '#f3efe6' },
      { id: 'teal', name: 'Teal', hex: '#2f6f73' },
      { id: 'grey', name: 'Grey', hex: '#b7b1a8' },
    ],
    featured: true,
  },
  {
    id: 'speckled-stoneware',
    slug: 'speckled-stoneware',
    title: 'Speckled Stoneware Set',
    sellingPoint: 'A canister and four cups, fired in one kiln.',
    description:
      'Sand-colored clay with a toasted foot. The canister holds coffee or rice; the cups are straight-sided and steady in the hand.',
    category: 'tableware',
    price: 86,
    originalPrice: 112,
    image: asset('products/bowl.jpg'),
    material: 'Stoneware',
    colors: [
      { id: 'sand', name: 'Sand', hex: '#e6d3b4' },
      { id: 'white', name: 'White', hex: '#f6f4f0' },
    ],
    featured: true,
  },
  {
    id: 'porcelain-mug',
    slug: 'porcelain-mug',
    title: 'Porcelain Mug',
    sellingPoint: 'A full hand around it, and the handle still fits.',
    description:
      'Thin porcelain that stays comfortable when the coffee is hot. Sold individually, so a household can mix them in over time.',
    category: 'tableware',
    price: 24,
    originalPrice: 32,
    image: asset('products/cups.jpg'),
    material: 'Porcelain',
    colors: [{ id: 'white', name: 'White', hex: '#ffffff' }],
    featured: false,
  },
  {
    id: 'patterned-bowls',
    slug: 'patterned-bowls',
    title: 'Patterned Bowls',
    sellingPoint: 'Two small bowls for rice, fruit, or a snack.',
    description:
      'Hand-painted repeats on a white ground. They stack, and the glaze is even enough for a dishwasher on the gentle cycle.',
    category: 'tableware',
    price: 42,
    originalPrice: 56,
    image: asset('products/plates.jpg'),
    material: 'Glazed ceramic',
    colors: [
      { id: 'teal', name: 'Teal star', hex: '#1f7a78' },
      { id: 'saffron', name: 'Saffron wave', hex: '#e2a322' },
    ],
    featured: true,
  },
  {
    id: 'bottle-vases',
    slug: 'bottle-vases',
    title: 'Bottle Vases',
    sellingPoint: 'Three heights for one stem or a dried bunch.',
    description:
      'Speckled white glaze over dark clay, so the rims read almost black. Use one on a desk, or the full set on a shelf.',
    category: 'tableware',
    price: 64,
    originalPrice: 84,
    image: asset('products/carafe.jpg'),
    material: 'Speckled glaze',
    colors: [{ id: 'speckle', name: 'Speckled white', hex: '#e7e4de' }],
    featured: false,
  },
  {
    id: 'ash-stool',
    slug: 'ash-stool',
    title: 'Ash Stool',
    sellingPoint: 'A handle cut into the seat, so it moves easily.',
    description:
      'Solid ash, soap-finished, tall enough for a kitchen counter. The stretcher keeps it steady when you lean.',
    category: 'objects',
    price: 180,
    originalPrice: 230,
    image: asset('products/chair.jpg'),
    material: 'Solid ash',
    colors: [{ id: 'ash', name: 'Ash', hex: '#e4dccd' }],
    featured: false,
  },
  {
    id: 'slipper-chair',
    slug: 'slipper-chair',
    title: 'Tufted Slipper Chair',
    sellingPoint: 'A low seat for a bedroom corner.',
    description:
      'Button-tufted cotton with turned front legs. Light enough to pull up to a window, substantial enough to look finished on its own.',
    category: 'objects',
    price: 540,
    originalPrice: 680,
    image: asset('products/lounge.jpg'),
    material: 'Cotton upholstery, painted wood',
    colors: [{ id: 'ivory', name: 'Ivory', hex: '#f4f0e6' }],
    featured: true,
  },
  {
    id: 'leather-sofa',
    slug: 'leather-sofa',
    title: 'Camel Leather Sofa',
    sellingPoint: 'A deep seat that takes a nap seriously.',
    description:
      'Full-grain leather in a warm camel tone, on a thin black leg. The cushions are loose, so they can be shaken out rather than replaced.',
    category: 'objects',
    price: 1860,
    originalPrice: 2340,
    image: asset('products/vase.jpg'),
    material: 'Full-grain leather',
    colors: [{ id: 'camel', name: 'Camel', hex: '#a67c52' }],
    featured: true,
  },
  {
    id: 'velvet-sofa',
    slug: 'velvet-sofa',
    title: 'Forest Velvet Sofa',
    sellingPoint: 'A low, tailored seat on oak legs.',
    description:
      'Cotton velvet in a deep green, with a single seat cushion and two bolsters. It sits close to the floor and keeps a small room from feeling crowded.',
    category: 'objects',
    price: 1420,
    originalPrice: 1780,
    image: asset('products/cushion.jpg'),
    material: 'Cotton velvet, oak',
    colors: [{ id: 'forest', name: 'Forest', hex: '#1f6a5b' }],
    featured: false,
  },
  {
    id: 'mint-planter',
    slug: 'mint-planter',
    title: 'Mint Planter',
    sellingPoint: 'A drainage hole, and a saucer that hides it.',
    description:
      'Matte ceramic, 14 centimetres across. Sized for a succulent or a small herb, glazed so water does not mark the sill.',
    category: 'objects',
    price: 28,
    originalPrice: 36,
    image: asset('products/planter.jpg'),
    material: 'Matte ceramic',
    colors: [{ id: 'mint', name: 'Mint', hex: '#b7e4dc' }],
    featured: false,
  },
  {
    id: 'oak-wall-clock',
    slug: 'oak-wall-clock',
    title: 'Oak Wall Clock',
    sellingPoint: 'A quiet movement and a pale oak rim.',
    description:
      'Thirty centimetres across, with painted markers instead of numerals shouting across the room. Runs on one battery, hung from a single hook.',
    category: 'objects',
    price: 74,
    originalPrice: 96,
    image: asset('products/side-table.jpg'),
    material: 'Oak veneer, quartz movement',
    colors: [{ id: 'oak', name: 'Oak', hex: '#c4a574' }],
    featured: false,
  },
  {
    id: 'round-mirror',
    slug: 'round-mirror',
    title: 'Round Wall Mirror',
    sellingPoint: 'A slim frame that opens a narrow hall.',
    description:
      'Sixty centimetres of mirror in a pale metal rim. It hangs from a reinforced bracket and arrives with the hardware in the box.',
    category: 'objects',
    price: 160,
    originalPrice: 210,
    image: asset('products/mirror.jpg'),
    material: 'Mirror glass, metal frame',
    colors: [{ id: 'pale', name: 'Pale metal', hex: '#e6e1d6' }],
    featured: false,
  },
]

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getColor(product: Product, colorId: string) {
  return product.colors.find((color) => color.id === colorId) ?? product.colors[0]
}

export function categoryLabel(id: Product['category']) {
  return categories.find((category) => category.id === id)?.label ?? id
}
