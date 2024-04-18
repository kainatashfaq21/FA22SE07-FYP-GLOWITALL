const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Define the Recommendation model
const FoundationRecommendation = mongoose.model('FoundationRecommendation', {
  age: String,
  sunBurn: String,
  skinType: String,
  sensitiveSkin: String,
  skinTonePalette: String,
  veinColor: String,
  coverage: String,
  finishPreference: String,
  makeupBrand: String,
  cost: String,
});

// Define the route for submitting the quiz answers


const productRecommendations = {
    // Mapping 1

    '24 or Under|Sometimes|Normal|NO|Medium Skin Tone|Green|Medium coverage|Matte|Maybelline|COST-EFFECTIVE': {
        brand: 'Maybelline',
        name: 'Fit Me Matte + Poreless Foundation',
        description: 'This is a cost-effective foundation for female users under 24 with acne-prone normal skin and no skin sensitivity',
        imageUrl:'https://example.com/product-image1.jpg',
    },
    // Mapping 2
'24 or Under|Sometimes|Oily|NO|Medium Skin Tone|Green|Medium coverage|Matte|Estée Lauder|COST-EFFECTIVE': {
  brand: 'Estée Lauder',
  name: 'Double Wear Stay-in-Place Foundation',
  description: 'This is a premium foundation for female users 25 or over with oily skin, skin sensitivity, green veins, and a preference for more coverage and longer-lasting finish.',
  imageUrl: 'https://example.com/product-image2.jpg',
},

    // Mapping 3
    '25-34|Never|Combination|NO|Light Skin Tone|Blue|Light coverage|Luminous|Huda Beauty|High end': {
        brand: 'Huda Beauty',
        name: '#FauxFilter Foundation',
        description: 'This is a luxury foundation suitable for users aged 25-34 with combination skin, no sunburn, and a light skin tone. It provides light coverage with a luminous finish.',
        imageUrl:' https://example.com/product-image2.jpg',
    },
    // Mapping 4
    '34-44|All the time|Dry|Yes|Dark Skin Tone|Purple|Full coverage|Matte|M Misbah|COST-EFFECTIVE': {
        brand:' M Misbah',
        Name:' HydraMatte Liquid Foundation',
        Description: 'This is an affordable foundation suitable for users aged 34-44 with dry, sensitive skin and a dark skin tone. It provides full coverage with a matte finish, ideal for those who experience frequent sunburn.',
       imageUrl: 'https://example.com/product-image3.jpg',
        
    },


     // Mapping 5
  '24 or Under|Sometimes|Combination|No|Medium Skin Tone|Green|Medium coverage|Luminous|Rivaj|COST-EFFECTIVE':
  {
    brand: 'Rivaj',
    name: 'Stay Fresh Foundation',
    description: 'This is an affordable foundation for users under 24 with combination skin and a medium skin tone. It provides medium coverage with a luminous finish, perfect for occasional sunburn.',
    imageurl:' https://example.com/product-image4.jpg',

  },
   // Mapping 6

  '45-54|Sometimes|Normal|Yes|Medium Skin Tone|Blue|Full coverage|Matte|Clinique|HIGH-END':
  {
  brand:'Clinique',
name: 'Luxe Perfection Foundation',
description: 'This is a high-end foundation for users aged 45-54 with normal skin, sensitive skin, and a medium skin tone. It offers full coverage with a matte finish, suitable for those who occasionally experience sunburn',
imageUrl: 'https://example.com/product-image5.jpg',
  },
  // Mapping 7
'45 or Above|Sometimes|Normal|Yes|Medium Skin Tone|Blue|Full coverage|Luminous|Lancome|HIGH-END':
 {
  brand: 'Lancome',
  name: 'Teint Idole Ultra Longwear Foundation',
  description: 'This is a high-end foundation for users aged 45 or above with normal skin, occasional sunburn, a medium skin tone, and a preference for full coverage with a dewy finish.',
  imageUrl: 'https://example.com/product-image5.jpg',
},
// Mapping 8
'18-24|Sometimes|Combination|Yes|Light Skin Tone|Green|Medium coverage|Natural|NYX|AFFORDABLE': {
  brand: 'NYX',
  name: 'Total Control Drop Foundation',
  description: 'This is an affordable foundation suitable for users aged 18-24 with combination skin, occasional sunburn, a light skin tone, and a preference for medium coverage with a natural finish.',
  imageUrl: 'https://example.com/product-image6.jpg',
},

// Mapping 9
'25-34|Sometimes|Oily|NO|Medium Skin Tone|Green|Full coverage|Matte|Fenty Beauty|HIGH-END': {
  brand: 'Fenty Beauty',
  name: 'Pro Filtr Soft Matte Longwear Foundation',
  description: 'This is a high-end foundation suitable for users aged 25-34 with oily skin, no skin sensitivity, green veins, a medium skin tone, and a preference for full coverage with a matte finish.',
  imageUrl: 'https://example.com/product-image7.jpg',
},

// Mapping 10
'35-44|Always|Dry|Yes|Fair Skin Tone|Blue|Light coverage|Radiant|IT Cosmetics|HIGH-END': {
  brand: 'IT Cosmetics',
  name: 'Your Skin But Better CC+ Cream',
  description: 'This is a high-end CC cream suitable for users aged 35-44 with dry skin, frequent sunburn, a fair skin tone, and a preference for light coverage with a radiant finish.',
  imageUrl: 'https://example.com/product-image8.jpg',
},

// Mapping 11
'45 or Above|Never|Normal|No|Medium Skin Tone|Purple|Medium coverage|Satin|Bobbi Brown|HIGH-END': {
  brand: 'Bobbi Brown',
  name: 'Skin Foundation SPF 15',
  description: 'This is a high-end foundation suitable for users aged 45 or above with normal skin, no sunburn, a medium skin tone, and a preference for medium coverage with a satin finish.',
  imageUrl: 'https://example.com/product-image9.jpg',
},

    // Add more mappings here...
  };
  
// Define the route for fetching the saved recommendation
router.post('/api/foundation/recommendation', (req, res) => {
  const answers = req.body;

  const key = `${answers.age}|${answers.sunBurn}|${answers.skinType}|${answers.sensitiveSkin}|${answers.skinTonePalette}|${answers.veinColor}|${answers.coverage}|${answers.finishPreference}|${answers.makeupBrand}|${answers.cost}`;

  const productRecommendation = productRecommendations[key];

  if (productRecommendation) {
    const recommendation = new FoundationRecommendation(answers);
    recommendation.save()
      .then(() => res.status(200).send('Recommendation saved successfully'))
      .catch(err => res.status(400).send('Failed to save recommendation'));
  } else {
    res.status(400).send('No product recommendation found for the given combination of answers');
    
  }
});

// Define the route for fetching the saved recommendation
router.get('/api/foundation/recommendation', (req, res) => {
    FoundationRecommendation.findOne().sort({ _id: -1 })
    .then(recommendation => {
      if (!recommendation) {
        res.status(404).send('No recommendation found');
      } else {
        const answers = recommendation.toObject();
        const key = `${answers.age}|${answers.sunBurn}|${answers.skinType}|${answers.sensitiveSkin}|${answers.skinTonePalette}|${answers.veinColor}|${answers.coverage}|${answers.finishPreference}|${answers.makeupBrand}|${answers.cost}`;

        const productRecommendation = productRecommendations[key];

        if (productRecommendation) {
          res.status(200).json(productRecommendation);
        } else {
          res.status(400).send('No product recommendation found for the given combination of answers');
        }
      }
    })
    .catch(err => {
      res.status(500).send('Error fetching recommendation');
    });
});


module.exports = router;