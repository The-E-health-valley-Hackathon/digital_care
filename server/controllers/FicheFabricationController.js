const {FicheFabrication} = require('../database/models/fichefabrication');

// Create a new FicheFabrication record
module.exports ={
  createFicheFab :async (req, res) => {
  try {
    const {
      medicament,
      nomPatient,
      service,
      sc,
      dose,
      protocole,
      doseFinal,
      dateFabrication,
      nOrdennacier,
      manipulateur,
      preleve1,
      preleve2,
      inject,
      volume,
      concentration,
      conditionnement,
      stabilite,
      nomEditer,
      nomVerifier,
    } = req.body;

    const newFicheFabrication = await FicheFabrication.create({
      medicament,
      nomPatient,
      service,
      sc,
      dose,
      protocole,
      doseFinal,
      dateFabrication,
      nOrdennacier,
      manipulateur,
      preleve1,
      preleve2,
      inject,
      volume,
      concentration,
      conditionnement,
      stabilite,
      nomEditer,
      nomVerifier,
    });

    res.status(201).json(newFicheFabrication);
  } catch (error) {
    console.error(error.stack); 
    res.status(500).json({ message: 'Server Error' });
  }
  
},
getAllFicheFabrications : async (req, res) => {
  try {
    const ficheFabrications = await FicheFabrication.findAll();
    res.status(200).json(ficheFabrications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'fetch Error' });
  }
}
}

