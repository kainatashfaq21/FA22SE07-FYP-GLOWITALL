const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define the Recommendation model
const Recommendation = mongoose.model('Recommendation', {
  gender: String,
  age: String,
  skinConcern: String,
  skinType: String,
  sensitiveSkin: String,
  skinSensitivity: String,
  pimplesFrequency: String,
  makeupUsage: String,
  waterIntake: String,
  sunExposure: String,
  productType: String,
  priceRange: String,
});


const productRecommendations = {
  // Mapping 1
  'FEMALE|24 or Under|Acne|Normal|No|Rarely|Rarely|Normal|2-3 liters|Low|Moisturizer|COST-EFFECTIVE': {
    brand: 'ISINTREE',
    name: 'Hydrating Serum',
    description: 'This is product A for female users under 24 with acne-prone normal skin and no skin sensitivity.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0605/2313/products/1.-Bottle-Front_5c89754d-98b9-40a4-8034-525d5714a827.jpg?v=1664789492&width=600',
  },
 // Mapping 2
'FEMALE|25-32|Dullness|Oily|YES|Sometimes|Occasionally|A little|Less than 1 liter|High|Cleanser|HIGHEND': {
  brand: 'Caudalie',
  name: 'Vinopure Purifying Gel Cleanser',
  description: 'This is a purifying gel cleanser by Caudalie for female users aged 25-34 with dull skin, oily skin type, occasional skin sensitivity, and moderate water intake.',
  imageUrl: 'https://www.sephora.com/productimages/sku/s2603827-main-zoom.jpg',
},

// Mapping 3
'MALE|55 or above|Signs of Aging|Combination|NO|Rarely|Always|Normal|2-3 liters|Medium|Serum|COST-EFFECTIVE': {
  brand: 'The Ordinary',
  name: 'Buffet Multi-Technology Peptide Serum',
  description: 'This is a multi-technology peptide serum by The Ordinary for male users aged 55 or above with signs of aging, combination skin type, and no skin sensitivity.',
  imageUrl: 'https://m.media-amazon.com/images/I/616mfs6PXiL.jpg',
},

// Mapping 4
'MALE|45-54|Darkcircles|Dry|NO|All the time|Rarely|A little|Less than 1 liter|High|Moisturizer|COST-EFFECTIVE': {
  brand: 'Kiehls',
  name: 'Ultra Facial Cream',
  description: 'This is an ultra facial cream by Kiehl\'s for male users aged 35-44 with dry skin, no skin sensitivity, and no pimples.',
  imageUrl: 'https://aodour.oss-ap-southeast-1.aliyuncs.com/product/1606106657881-deddc015-d188-4a6d-a3fb-48d2022052f6',
},

// Mapping 5
'FEMALE|45-54|Dark Spots|Combination|YES|Sometimes|Rarely|A decent amount|1-2 liters|Medium|Serum|HIGHEND': {
  brand: 'Estée Lauder',
  name: 'Advanced Night Repair Synchronized Recovery Complex II',
  description: 'This is the Advanced Night Repair serum by Estée Lauder for female users aged 45-54 with dark spots, combination skin type, occasional skin sensitivity, and moderate water intake.',
  imageUrl: 'https://www.esteelauder.com/media/export/cms/products/640x640/el_sku_PG5001_640x640_0.jpg',
},

// Mapping 6
'FEMALE|55 or above|Wrinkles|Normal|YES|Often|Monthly|A little|8+ glasses|7 or more|Moisturizer|COST-EFFECTIVE': {
  brand: 'CeraVe',
  name: 'Skin Renewing Night Cream',
  description: 'This is a skin renewing night cream by CeraVe for female users aged 55 or above with wrinkles, normal skin type, frequent skin sensitivity, and high water intake.',
  imageUrl: 'https://www.sanwarna.pk/wp-content/uploads/2021/06/skinrenewingnightcream700x700_01.jpg',
},

// Mapping 7
'MALE|24 or Under|Acne|Oily|YES|Often|Daily|A lot|2-3 liters|2-3 hours|Cleanser|HIGH-END': {
  brand: 'La Roche-Posay',
  name: 'Effaclar Medicated Gel Cleanser',
  description: 'This is a medicated gel cleanser by La Roche-Posay for male users under 24 with acne-prone oily skin, frequent skin sensitivity, daily makeup usage, and high water intake.',
  imageUrl: 'https://m.media-amazon.com/images/I/51QxY+2MRTL._SL1200_.jpg',
},

// Mapping 8
'MALE|35-44|Dryness|Normal|NO|Rarely|Rarely|None|4-6 glasses|4-6 hours|Sunscreen|LOW': {
  brand: 'Neutrogena',
  name: 'Ultra Sheer Dry-Touch Sunscreen',
  description: 'This is an ultra sheer dry-touch sunscreen by Neutrogena for male users aged 35-44 with dryness, normal skin type, no skin sensitivity, and moderate water intake.',
  imageUrl: 'https://m.media-amazon.com/images/I/51QxY+2MRTL._SL1200_.jpg',
},

// Mapping 9
'FEMALE|45-54|Dark Spots|Combination|NO|Never|Rarely|Normal|6-8 glasses|2-3 hours|Moisturizer|COST-EFFECTIVE': {
  brand: 'Cetaphil',
  name: 'Daily Facial Moisturizer with SPF 15',
  description: 'This is a daily facial moisturizer with SPF 15 by Cetaphil for female users aged 45-54 with dark spots, combination skin type, no skin sensitivity, and moderate water intake.',
  imageUrl: 'https://cdn.shopify.com/s/files/1/0509/9107/1390/products/Ceta-DHMSS_370x480.webp?v=1652274302',
},

// Mapping 10
'MALE|25-34|Acne|Oily|NO|Never|Daily|A little|4-6 glasses|2-3 hours|Cleanser|MID-RANGE': {
  brand: 'Garnier',
  name: 'SkinActive Micellar Foaming Gel Cleanser',
  description: 'This is a micellar foaming gel cleanser by Garnier for male users aged 25-34 with acne-prone oily skin, no skin sensitivity, daily makeup usage, and moderate water intake.',
  imageUrl: 'https://static.chemistwarehouse.com.au/ams/media/pi/85241/2DF_800.jpg',
},

 
};

// Define the route for submitting the quiz answers
router.post('/', (req, res) => {
  const answers = req.body;

  const key = `${answers.gender}|${answers.age}|${answers.skinConcern}|${answers.skinType}|${answers.sensitiveSkin}|${answers.skinSensitivity}|${answers.pimplesFrequency}|${answers.makeupUsage}|${answers.waterIntake}|${answers.sunExposure}|${answers.productType}|${answers.priceRange}`;

  const productRecommendation = productRecommendations[key];

  if (productRecommendation) {
    const recommendation = new Recommendation(answers);
    recommendation.save()
      .then(() => res.status(200).send('Recommendation saved successfully'))
      .catch(err => res.status(400).send('Failed to save recommendation'));
  } else {
    res.status(400).send('No product recommendation found for the given combination of answers');
  }
});

// Define the route for fetching the saved recommendation
router.get('/', (req, res) => {
  Recommendation.findOne().sort({ _id: -1 })
    .then(recommendation => {
      if (!recommendation) {
        res.status(404).send('No recommendation found');
      } else {
        const answers = recommendation.toObject();
        const key = `${answers.gender}|${answers.age}|${answers.skinConcern}|${answers.skinType}|${answers.sensitiveSkin}|${answers.skinSensitivity}|${answers.pimplesFrequency}|${answers.makeupUsage}|${answers.waterIntake}|${answers.sunExposure}|${answers.productType}|${answers.priceRange}`;

        const productRecommendation = productRecommendations[key];

        if (productRecommendation) {
          res.status(200).json(productRecommendation);
        } else {
          res.status(400).send('No product recommendation found for the given combination of answers');
        }
      }
    })
    .catch(err => {
      res.status(500).send('Error fetching recommendation: ' + err.message);
    });
});

module.exports = router;