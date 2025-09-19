// src/data/cities.js
import chennaiImage from '../assests/chennai.jpg';
import delhiImage from '../assests/delhi.jpg';
import kolkataImage from '../assests/kolkata.jpg';
import bengaluruImage from '../assests/banglore.jpg';
import mumbaiImage from '../assests/mumbai.jpg';

export const cities = [
  {
    id: 'chennai',
    name: 'Chennai',
    tagline: 'Gateway to South India',
    imageUrl: chennaiImage,
  },
  {
    id: 'delhi',
    name: 'Delhi',
    tagline: 'Heart of India',
    imageUrl: delhiImage,
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    tagline: 'The Cultural Capital of India',
    imageUrl: kolkataImage,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    tagline: "India's Silicon Valley",
    imageUrl: bengaluruImage,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    tagline: 'City of Dreams',
    imageUrl: mumbaiImage,
  },
];