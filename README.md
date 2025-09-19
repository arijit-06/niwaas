# Niwaas - Real Estate Platform

A modern React-based real estate platform with Firebase authentication.

## Features

- **Multi-User Authentication**: Property Owners, Buyers, and Brokers/Agents
- **Firebase Integration**: Email/password and Google authentication
- **Responsive Design**: Mobile-friendly interface
- **Protected Routes**: Secure access to user-specific pages
- **Property Search**: Advanced filtering capabilities
- **City-based Browsing**: Explore properties by location

## Tech Stack

- React 18
- React Router DOM
- Firebase Authentication & Firestore
- CSS3 (No external frameworks)
- Create React App

## Pages

### Functional Pages (Implemented)
- **Home**: Hero section with city modules
- **Login**: Multi-user type authentication
- **Search**: Property filtering and results
- **Property Details**: Individual property information

### Structure-Only Pages (Ready for Development)
- About, Contact, Profile, Favorites, Dashboard

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/arijit-06/niwaas.git
cd niwaas
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Firebase Configuration

The project is pre-configured with Firebase. Authentication includes:
- Email/password signup and login
- Google Sign-in
- Protected routes for authenticated users
- User state management

## Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth)
├── firebase/           # Firebase configuration
├── pages/              # Page components
└── styles/             # CSS files
```

## Authentication Flow

1. Users select their type (Owner/Buyer/Broker)
2. Sign up or login with email/password or Google
3. Access protected pages (Profile, Favorites, Dashboard)
4. Secure logout functionality

## Contributing

Built by @teamenginuity

## License

All rights reserved.