import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const palacinke = await prisma.recipe.upsert({
    where: { slug: 'najbolje-palacinke' },
    update: {},
    create: {
      title: 'Najbolje palačinke',
      slug: 'najbolje-palacinke',
      lead: 'Mekane, prozračne i savršene za svako punjenje. Ovo je osnovni recept koji uspijeva svaki put.',
      imagePath: '/recepti/palacinke.jpg',
      prepTime: 30,
      difficulty: 'Jednostavno',
      category: 'Deserti',
      servings: 4,
      ingredients: JSON.stringify([
        '2 jaja',
        '250g brašna',
        '300ml mlijeka',
        '200ml mineralne vode',
        'prstohvat soli',
        'žlica ulja'
      ]),
      steps: JSON.stringify([
        'U zdjeli pjenjačom izmutite jaja sa soli.',
        'Dodajte brašno i mlijeko naizmjence dok ne dobijete gustu smjesu bez grudica.',
        'Razrijedite smjesu mineralnom vodom do željene gustoće.',
        'Pustite smjesu da odstoji 15 minuta.',
        'Pecite na vrućoj tavi s malo ulja dok ne pozlate s obje strane.'
      ]),
    },
  });

  const bolonjez = await prisma.recipe.upsert({
    where: { slug: 'klasican-bolognese-umak' },
    update: {},
    create: {
      title: 'Klasičan Bolognese umak',
      slug: 'klasican-bolognese-umak',
      lead: 'Bogati mesni umak koji se kuha polako. Tajna je u dugom kuhanju i kvalitetnim sastojcima.',
      imagePath: '/recepti/bolognese.jpg',
      prepTime: 120,
      difficulty: 'Srednje zahtjevno',
      category: 'Glavna jela',
      servings: 6,
      ingredients: JSON.stringify([
        '500g mljevene junetine',
        '1 luk',
        '2 mrkve',
        '1 stabljika celera',
        '500ml pasate od rajčice',
        '1dcl crnog vina',
        'sol, papar, origano'
      ]),
      steps: JSON.stringify([
        'Sitno nasjeckajte luk, mrkvu i celer.',
        'Na maslinovom ulju dinstajte povrće dok ne omekša (soffritto).',
        'Dodajte meso i pržite dok ne izgubi ružičastu boju.',
        'Podlijte vinom i pustite da alkohol ispari.',
        'Dodajte rajčicu, začine i kuhajte na laganoj vatri barem sat i pol uz povremeno miješanje.'
      ]),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });