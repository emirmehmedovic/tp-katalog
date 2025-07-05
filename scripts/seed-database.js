const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Categories data (bez id)
const categories = [
  { name: 'Detergenti i šamponi', slug: 'detergenti-i-samponi' },
  { name: 'Sredstva za unutrašnjost', slug: 'sredstva-za-unutrasnjost' },
  { name: 'Sredstva za gume', slug: 'sredstva-za-gume' },
  { name: 'Sredstva za farove', slug: 'sredstva-za-farove' },
  { name: 'Sredstva za kožu', slug: 'sredstva-za-kozu' },
  { name: 'Sredstva za plastiku', slug: 'sredstva-za-plastiku' },
  { name: 'Sredstva za metal', slug: 'sredstva-za-metal' },
  { name: 'Sredstva za staklo', slug: 'sredstva-za-staklo' },
  { name: 'Sredstva za motor', slug: 'sredstva-za-motor' },
  { name: 'Alati i oprema', slug: 'alati-i-oprema' },
  { name: 'Vulkanizerska oprema', slug: 'vulkanizerska-oprema' },
  { name: 'Paste za poliranje', slug: 'paste-za-poliranje' }
]

// Products data - kompletan katalog
const products = [
  // Detergenti i šamponi
  {
    name: 'Self Power',
    slug: 'self-power',
    description: 'Koncentrirani alkalni deterdžent s visokim svojstvima pjene. Idealno za čišćenje svih vrsta vozila.',
    product_code: '25/1-411025',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/self-power.png'
  },
  {
    name: 'Truck Foam',
    slug: 'truck-foam',
    description: 'Deterdžent s aktivnom pjenom, samopolirajući. Sadrži jake omekšavajuće sastojke za teška vozila.',
    product_code: '25/1-411N25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/truck-foam.png'
  },
  {
    name: 'Traclab Prasak',
    slug: 'traclab-prasak',
    description: 'Visoko efikasan mikro prah za uklanjanje organskih i neorganskih tvari. Za teška vozila i radne strojeve.',
    product_code: 'TRACLAB 20/1',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/traclab-prasak.png'
  },
  {
    name: 'Euro VP / 38',
    slug: 'euro-vp-38',
    description: 'Dvokomponentni, superkoncentrirani proizvod za pranje i odmašćivanje teških teretnih vozila.',
    product_code: '25/1-EM38S25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/euro-vp-38.png'
  },
  {
    name: 'Bear Green',
    slug: 'bear-green',
    description: 'Dvostruki deterdžent za super brzo pranje svih vrsta teretnih vozila. Snažno odmašćuje.',
    product_code: '25/1-EBG25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/bear-green.png'
  },
  {
    name: 'Tiger',
    slug: 'tiger',
    description: 'Super koncentrirani deterdžent za intenzivno pranje. Jednako primjenjuje moć čišćenja na svim djelovima.',
    product_code: '25/1-ETG25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/tiger.png'
  },
  {
    name: 'Super Schiuma',
    slug: 'super-schiuma',
    description: 'Šampon s bojom i visokom pjenom. Ugodan miris i pranje izvrsnog izgleda.',
    product_code: '25/1-411S25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/super-schiuma.png'
  },
  {
    name: 'Super Lux',
    slug: 'super-lux',
    description: 'Penušav šampon, parfumiran, specijalni dodatak za automobile. Prikladan za sve samouslužne praonice.',
    product_code: '25/1-432025',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/super-lux.png'
  },
  {
    name: 'Active Foam',
    slug: 'active-foam',
    description: 'Pjenasto sredstvo za čišćenje sa efektom snijega, kombinuje visok efekat pjene sa efikasnim antistatičkim djelovanjem.',
    product_code: '20/1-411AFK',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/active-foam.png'
  },
  {
    name: 'Viper',
    slug: 'viper',
    description: 'Višenamjenski mirisni deterdžent. Idealan za održavanje i čišćenje bilo koje vrste površine.',
    product_code: '20/1-4VP10',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/viper.png'
  },
  {
    name: 'Lava Skay',
    slug: 'lava-skay',
    description: 'Mirisno sredstvo namijenjeno za pranje vozila iznutra i izvana. Omogućava lahko i brzo čišćenje.',
    product_code: 'ELV25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/lava-skay.png'
  },
  {
    name: 'Ecolava',
    slug: 'ecolava',
    description: 'Brzo i dubinski čisti dilimiranje mašina. Koristi se sa strojevima za pranje i visokim pritiskom.',
    product_code: '25/1-EPMN25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/ecolava.png'
  },
  {
    name: 'Tar Glue Remover',
    slug: 'tar-glue-remover',
    description: 'Sredstvo za čišćenje bitumenom. Ne nanosi se na pregrijane površine. Spreman za upotrebu.',
    product_code: '3/1-P025',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/tar-glue-remover.png'
  },
  {
    name: 'Cementil',
    slug: 'cementil',
    description: 'Sredstvo koje uklanja okorjele naslage od betona na teretnim vozilima.',
    product_code: '25/1-ECEM25',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/cementil.png'
  },
  {
    name: 'G028L Luxan Touch',
    slug: 'g028l-luxan-touch',
    description: 'Mirisni deterdžent za završno čišćenje. Primjenjiv na sve vrste vanjskih pranja automobila.',
    product_code: 'G028L',
    category_id: 'detergenti-i-samponi',
    image_url: '/images/products/g028l-luxan-touch.png'
  },
  // Sredstva za unutrašnjost
  {
    name: 'Smacchiatore ES',
    slug: 'smacchiatore-es',
    description: 'Visoko koncentrirani, mirisni deterdžent za ručno unutrašnje & vanjsko pranje vozila.',
    product_code: '25/1-013S25',
    category_id: 'sredstva-za-unutrasnjost',
    image_url: '/images/products/smacchiatore-es.png'
  },
  {
    name: 'Exence',
    slug: 'exence',
    description: 'Mirisno sredstvo za dezinfekciju i čišćenje. Pogodno za dezinfekciju podnica i kabina.',
    product_code: 'EP150',
    category_id: 'sredstva-za-unutrasnjost',
    image_url: '/images/products/exence.png'
  },
  {
    name: 'Clean Foam',
    slug: 'clean-foam',
    description: 'Omogućuje trenutno duboko čišćenje sjedišta od tekstila i tepiha. Prodire duboko, rastvara i uklanja nečistoće.',
    product_code: 'ESPCL00',
    category_id: 'sredstva-za-unutrasnjost',
    image_url: '/images/products/clean-foam.png'
  },
  {
    name: 'Exence EER750',
    slug: 'exence-eer750',
    description: 'Dezodorirajuće dezinfekcijsko sredstvo. Obnavlja osjećaj svježine u unutrašnjosti automobila.',
    product_code: 'EER750',
    category_id: 'sredstva-za-unutrasnjost',
    image_url: '/images/products/exence-eer750.png'
  },
  // Sredstva za gume
  {
    name: 'Black and Wet',
    slug: 'black-and-wet',
    description: 'Vodootporni premaz za čišćenje sa efektom vlažnog izgleda. Dugotrajna formula za vanjske dijelove vozila.',
    product_code: '10/1-EBW10',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/black-and-wet.png'
  },
  {
    name: 'Gomma Gluc',
    slug: 'gomma-gluc',
    description: 'Ultra koncentrirani sjaj za gumu. Formula visokog viskoziteta, nema mrlja po pletenima.',
    product_code: '10/1-EGG10',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/gomma-gluc.png'
  },
  {
    name: 'Cement za gume',
    slug: 'cement-za-gume',
    description: 'Specijalizovani cement za popravku guma. Brzo sušenje, visoka adhezija.',
    product_code: 'CEMENT-100',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/cement-za-gume.png'
  },
  {
    name: 'Zakrpe za gume',
    slug: 'zakrpe-za-gume',
    description: 'Set zakrpa za hitnu popravku guma. Različitih veličina.',
    product_code: 'ZAKRPE-SET',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/zakrpe-za-gume.png'
  },
  {
    name: 'Tegovi za balansiranje',
    slug: 'tegovi-za-balansiranje',
    description: 'Profesionalni tegovi za balansiranje guma. Precizno balansiranje.',
    product_code: 'TEGOVI-SET',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/tegovi-za-balansiranje.png'
  },
  {
    name: 'Ventili set',
    slug: 'ventili-set',
    description: 'Kompletan set ventila za gume. Sa ključevima.',
    product_code: 'VENTILI-SET',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/ventili-set.png'
  },
  {
    name: 'Pasta za montažu',
    slug: 'pasta-za-montazu',
    description: 'Specijalizovana pasta za montažu guma na felne. Visoka adhezija, lako nanošenje.',
    product_code: 'PASTA-MONT',
    category_id: 'sredstva-za-gume',
    image_url: '/images/products/pasta-za-montazu.png'
  },
  // Sredstva za farove
  {
    name: 'Rimuovi Insetti',
    slug: 'rimuovi-insetti',
    description: 'Visoko koncentrirani organski deterdžent za uklanjanje mrlja od insekata i buba.',
    product_code: '25/1-ERM25',
    category_id: 'sredstva-za-farove',
    image_url: '/images/products/rimuovi-insetti.png'
  },
  {
    name: 'Bugs-Off ER750',
    slug: 'bugs-off-er750',
    description: 'Proizvod na bazi enzima za uklanjanje insekata, mušica, smoga, ulja, masti. Bestjelesna i automatska mješavina.',
    product_code: 'ER750',
    category_id: 'sredstva-za-farove',
    image_url: '/images/products/bugs-off-er750.png'
  },
  // Sredstva za kožu
  {
    name: 'New Pelle',
    slug: 'new-pelle',
    description: 'Sredstvo za čišćenje presvlaka od prirodne kože. Pere, čisti, štiti i oživljava.',
    product_code: '10/1-EPPE10',
    category_id: 'sredstva-za-kozu',
    image_url: '/images/products/new-pelle.png'
  },
  // Sredstva za plastiku
  {
    name: 'Plastilux',
    slug: 'plastilux',
    description: 'Sjaj za komandnu tablu za polimere za obnavljanje, poliranje i zaštitu ploča.',
    product_code: '10/1-EPDX25',
    category_id: 'sredstva-za-plastiku',
    image_url: '/images/products/plastilux.png'
  },
  {
    name: 'Lucida Rinnova',
    slug: 'lucida-rinnova',
    description: 'Mirisno sredstvo na temelju polimera za obnavljanje, odmašćuje, polira unutrašnjost automobila.',
    product_code: '10/1-ELR10',
    category_id: 'sredstva-za-plastiku',
    image_url: '/images/products/lucida-rinnova.png'
  },
  {
    name: 'Altur Plast',
    slug: 'altur-plast',
    description: 'Renovator plastike, bogate mješavinom polimera, jako parfumiran. Idealno za obnovu plastike, vinila i gume.',
    product_code: 'ALTUR-750',
    category_id: 'sredstva-za-plastiku',
    image_url: '/images/products/altur-plast.png'
  },
  // Sredstva za metal
  {
    name: 'Power Lega',
    slug: 'power-lega',
    description: 'Koncentrat sa brzim učinkom dubinskog čišćenja masnoća, prašine i drugih prljavština s naplataka od lakih legura.',
    product_code: '25/1',
    category_id: 'sredstva-za-metal',
    image_url: '/images/products/power-lega.png'
  },
  {
    name: 'Lega Extreme',
    slug: 'lega-extreme',
    description: 'Sredstvo za pjenjenje/pranje, neutralan, bez kaustika i fosfata. Vrlo sigurno kada se koristi.',
    product_code: '25/1-ELX25',
    category_id: 'sredstva-za-metal',
    image_url: '/images/products/lega-extreme.png'
  },
  {
    name: 'Lega Extreme 750ml',
    slug: 'lega-extreme-750ml',
    description: 'Dekontaminirajući deterdžent za felge, sa aluminijumom. Temeljito čisti i daje naplatku od lake legure sjaj.',
    product_code: 'ELX750',
    category_id: 'sredstva-za-metal',
    image_url: '/images/products/lega-extreme-750ml.png'
  },
  {
    name: 'Oxybrill',
    slug: 'oxybrill',
    description: 'Specifičan proizvod za učinkovito čišćenje površina od lakih legura, ne ostavlja mrlje.',
    product_code: '20/1-EDB20',
    category_id: 'sredstva-za-metal',
    image_url: '/images/products/oxybrill.png'
  },
  // Sredstva za staklo
  {
    name: 'De Lux',
    slug: 'de-lux',
    description: 'Deterdžent spreman za upotrebu. Idealan za čišćenje stakla, kristala, ogledala, hromiranih dijelova.',
    product_code: '10/1-EDX10',
    category_id: 'sredstva-za-staklo',
    image_url: '/images/products/de-lux.png'
  },
  {
    name: 'Protect Shield',
    slug: 'protect-shield',
    description: 'Zaštitno sredstvo za staklene površine sa hidrofobnim efektom.',
    product_code: 'PROTECT-500',
    category_id: 'sredstva-za-staklo',
    image_url: '/images/products/protect-shield.png'
  },
  // Alati i oprema
  {
    name: 'Foam Gun / Pištolj',
    slug: 'foam-gun-pistolj',
    description: 'Profesionalni pištolj za pjenu za pranje. Za upotrebu s kopijom pod pritiskom.',
    product_code: 'FOAM-GUN',
    category_id: 'alati-i-oprema',
    image_url: '/images/products/foam-gun-pistolj.png'
  },
  {
    name: 'Krpa Microfibra',
    slug: 'krpa-microfibra',
    description: 'Tkanina od mikrovlakana, suptilna tekstura, za čišćenje staklenih i lakiranih površina.',
    product_code: 'MICROFIBRA',
    category_id: 'alati-i-oprema',
    image_url: '/images/products/krpa-microfibra.png'
  },
  {
    name: 'Tornador 2020',
    slug: 'tornador-2020',
    description: 'Pištolj za čišćenje unutrašnjosti vozila na zrak s komprimiranim zrakom. Idealno za čišćenje unutrašnjosti.',
    product_code: 'C0620',
    category_id: 'alati-i-oprema',
    image_url: '/images/products/tornador-2020.png'
  },
  // Vulkanizerska oprema
  {
    name: 'Vulkanizerski alati',
    slug: 'vulkanizerski-alati',
    description: 'Profesionalni alati za vulkanizerske radove. Kompletan set.',
    product_code: 'VULK-ALATI',
    category_id: 'vulkanizerska-oprema',
    image_url: '/images/products/vulkanizerski-alati.png'
  },
  // Paste za poliranje
  {
    name: 'Sonax Polishing Pastes',
    slug: 'sonax-polishing-pastes',
    description: 'Profesionalne paste za poliranje sa različitim granulacijama.',
    product_code: 'SONAX-SET',
    category_id: 'paste-za-poliranje',
    image_url: '/images/products/sonax-polishing-pastes.png'
  }
]

// Mapiranje slug-ova kategorija na UUID-ove iz baze
const categoryMap = {
  'detergenti-i-samponi': 'ciscenje-eksterijera',
  'sredstva-za-unutrasnjost': 'ciscenje-enterijera', 
  'sredstva-za-gume': 'vulkanizerski-materijal',
  'sredstva-za-farove': 'ciscenje-eksterijera',
  'sredstva-za-kozu': 'ciscenje-enterijera',
  'sredstva-za-plastiku': 'ciscenje-enterijera',
  'sredstva-za-metal': 'ciscenje-eksterijera',
  'sredstva-za-staklo': 'ciscenje-eksterijera',
  'alati-i-oprema': 'vulkanizerska-oprema',
  'vulkanizerska-oprema': 'vulkanizerska-oprema',
  'paste-za-poliranje': 'ciscenje-eksterijera'
}

async function seedDatabase() {
  try {
    console.log('Starting database seeding...')

    // Insert categories
    console.log('Inserting categories...')
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'slug' })
      .select()

    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError)
      return
    }

    // Fetch categories to get their UUIDs
    const { data: allCategories, error: fetchCatError } = await supabase
      .from('categories')
      .select('id,slug')

    if (fetchCatError) {
      console.error('Error fetching categories:', fetchCatError)
      return
    }

    // Map slug -> uuid
    const slugToId = {}
    for (const cat of allCategories) {
      slugToId[cat.slug] = cat.id
    }

    // Zameni category_id u products sa pravim uuid-om
    const productsWithUUID = products.map(p => ({
      ...p,
      category_id: slugToId[p.category_id]
    }))

    // Insert products
    console.log('Inserting products...')
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .upsert(productsWithUUID, { onConflict: 'slug' })
      .select()

    if (productsError) {
      console.error('Error inserting products:', productsError)
      return
    }

    console.log(`Inserted ${productsData?.length || 0} products`)
    console.log('Database seeding completed successfully!')

  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedDatabase() 