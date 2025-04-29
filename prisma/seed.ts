import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.feedback.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.atelier.deleteMany();
  await prisma.artisan.deleteMany();
  await prisma.membre.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.visiteur.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.article.deleteMany();

  const utilisateur1 = await prisma.utilisateur.create({
    data: {
      idUser: 'user-1',
      nomUser: 'Mohamed Ben Ali',
      email: 'mohamed@example.com',
      mdp: '$2b$10$examplehashedpassword',
      statuCmx: 'actif',
    },
  });

  const utilisateur2 = await prisma.utilisateur.create({
    data: {
      idUser: 'user-2',
      nomUser: 'Fatma Bouazizi',
      email: 'fatma@example.com',
      mdp: '$2b$10$examplehashedpassword',
      statuCmx: 'actif',
    },
  });

  const utilisateur3 = await prisma.utilisateur.create({
    data: {
      idUser: 'user-3',
      nomUser: 'Admin System',
      email: 'admin@heraffi.com',
      mdp: '$2b$10$examplehashedpassword',
      statuCmx: 'actif',
    },
  });

  await prisma.visiteur.create({
    data: {
      idVisiteur: 'vis-1',
      idUser: 'user-1',
    },
  });

  const membre = await prisma.membre.create({
    data: {
      idMembre: 'membre-1',
      idUser: 'user-2',
      numGSM: 98765432,
      photoProfil: '/profiles/fatma.jpg',
    },
  });

  await prisma.admin.create({
    data: {
      idAdmin: 'admin-1',
      idUser: 'user-3',
    },
  });

  const artisan1 = await prisma.artisan.create({
    data: {
      idArtisan: 'artisan-1',
      idUser: 'user-1',
      specialite: 'Poterie traditionnelle',
      experience: 5,
      tel: 98765432,
      photo: '/artisans/potier.jpg',
      adresse: 'Rue de la Kasbah, Tunis',
      region: 'Tunis',
      ville: 'Tunis',
      workshop: true,
      activite_principal: 'Création de poteries artisanales',
      certificat: 'Certificat de maître artisan',
      marque: 'Artisanat Tunisien',
      instagram: '@poterie_tunis',
      instagram_link: 'https://instagram.com/poterie_tunis',
      decouverte: 'Exposition nationale 2020',
      autre_source: 'Site web personnel',
      is_approved: true,
    },
  });

  

  await prisma.atelier.create({
    data: {
      idAtelier: 1,
      nomAtelier: 'Initiation à la poterie tunisienne',
      description: 'Découvrez les techniques ancestrales de la poterie tunisienne',
      dateDebut: new Date('2023-12-15T10:00:00'),
      lieu: 'Espace Artisanat, Tunis',
      duree: 180,
      places_dispo: 10,
      prix: 50,
      imgAtelier: '/ateliers/poterie.jpg',
      idArtisan: 'artisan-1',
    },
  });


  await prisma.reservation.create({
    data: {
      idReservation: 'res-1',
      dateReservation: new Date(),
      idAtelier: 1,
      idMembre: 'membre-1',
      idArtisan: 'artisan-1',
    },
  });

  await prisma.fAQ.createMany({
    data: [
      {
        idFAQ: 1,
        question: 'Comment réserver un atelier?',
        reponse: 'Connectez-vous à votre compte et sélectionnez l\'atelier souhaité',
        cree_a: new Date(),
        modifiee_a: new Date(),
      },
      {
        idFAQ: 2,
        question: 'Puis-je annuler une réservation?',
        reponse: 'Les annulations sont possibles jusqu\'à 48h avant l\'atelier',
        cree_a: new Date(),
        modifiee_a: new Date(),
      },
    ],
  });

  // 9. Création des articles
  await prisma.article.createMany({
    data: [
      {
        idArticle: 1,
        titre: 'L\'artisanat tunisien, un patrimoine à préserver',
        contenuArticle: 'Découvrez la richesse de notre artisanat traditionnel',
        imageArticle: '/articles/artisanat.jpg',
      },
    ],
  });

  // 10. Création des feedbacks
  await prisma.feedback.create({
    data: {
      idFeedback: 1,
      note: 5,
      commentaire: 'Atelier exceptionnel, artisan très pédagogue!',
      idAtelier: 1,
      idMembre: 'membre-1',
    },
  });

  console.log('Seed terminé avec succès!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });