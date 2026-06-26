# Travel Ceylon 🌴 🇱🇰

**Travel Ceylon** is a localized, mobile-first travel companion web application designed as a Single Page Application (SPA) for tourists navigating Sri Lanka. It serves as an intuitive digital guide, offering curated recommendations for historical sites, nature reserves, and premium accommodations across the "Pearl of the Indian Ocean".

Built with **React.js** and **Vite**, this project strictly follows a mobile-first philosophy, utilizing responsive CSS Grid/Flexbox layouts, HTML5 Web APIs, asynchronous state management, and modern Progressive Web App (PWA) standards.

---

## 📱 Key Features

- **Curated Destination Database:** A robust local JSON architecture (`attractions.json`) housing high-fidelity data on iconic Sri Lankan destinations (e.g., Sigiriya, Yala, Heritance Kandalama) complete with high-resolution photography.
- **Smart Category Filtering:** Instantly filter destinations by `Hotels`, `Nature`, and `Historical` categories with smooth, non-blocking UI transitions.
- **Real-time Geolocation & Distance Calculation:** Utilizes the HTML5 Geolocation API and the Haversine mathematical formula to accurately calculate the distance (in km) between the user's current physical location and the attraction.
- **Live Weather Integration:** Seamlessly fetches real-time climate data for each specific attraction via the OpenWeatherMap REST API.
- **Persistent Favorites:** Users can 'Heart' and save locations. The `useLocalStorage` custom hook serializes this data to keep the favorites list persistent even if the browser is closed.
- **Map Deep-linking:** Context-aware action buttons generate dynamic URIs that smoothly hand off coordinates to native map applications (Google Maps or Apple Maps).
- **Progressive Web App (PWA) Ready:** Configured with an integrated `manifest.json`, standard touch-icons, and safe-area viewport configurations to run as a beautiful standalone application on both Android and iOS home screens.

---

## 🛠️ Technology Stack

- **Frontend Core:** React.js (v18), Vite, JavaScript (ES6+)
- **Routing:** React Router v6 (Client-side routing)
- **Data Fetching:** Axios (Asynchronous REST API consumption)
- **Styling:** Pure Vanilla CSS (Mobile-First, CSS Variables, Flexbox/Grid)
- **APIs Used:** 
  - Local Mock REST API for high-reliability location data
  - OpenWeatherMap API for live weather updates

---

## 🏗️ Project Architecture

```text
Travel-Ceylon/
├── public/
│   ├── data/
│   │   └── attractions.json     # Curated local database of Sri Lankan attractions
│   ├── favicon.svg              # Browser favicon
│   ├── icon-192x192.png         # PWA Android/Web icon
│   ├── icon-512x512.png         # PWA High-res icon
│   └── manifest.json            # PWA web app manifest
├── src/
│   ├── api/
│   │   ├── dataApi.js           # Axios logic for fetching local attractions.json
│   │   ├── weather.js           # Axios logic for fetching OpenWeatherMap data
│   ├── components/
│   │   ├── Cards/               # Reusable attraction grid cards
│   │   ├── Filters/             # Sticky category filter bar
│   │   ├── Header/              # Main application header & navigation
│   │   ├── UI/                  # Skeletons, Error boundaries, Loaders
│   │   └── Weather/             # Real-time weather widget
│   ├── hooks/
│   │   ├── useFavorites.js      # Custom hook managing favorite state logic
│   │   ├── useGeolocation.js    # Custom hook wrapping the HTML5 Geolocation API
│   │   └── useLocalStorage.js   # Custom hook for JSON persistence
│   ├── pages/
│   │   ├── HomePage.jsx         # Discover & Grid Screen
│   │   └── PlaceDetailPage.jsx  # Detailed attraction view
│   ├── utils/
│   │   ├── distance.js          # Haversine distance formula algorithm
│   │   └── mapLinks.js          # Deep-link URI generator
│   ├── App.jsx                  # Root layout & routing wrapper
│   ├── index.css                # Global CSS variables and typography
│   └── main.jsx                 # React DOM initialization
├── .env.example                 # Environment variable templates
├── index.html                   # HTML Entry point with PWA meta tags
├── package.json                 # Project metadata and dependencies
└── vite.config.js               # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.x or higher)
- NPM or Yarn

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd Travel-Ceylon
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy the `.env.example` file to `.env` in the root directory.
   - You must obtain an **OpenWeatherMap API Key** to enable live weather fetching.
   - Add your key to the `.env` file:
     ```env
     VITE_OPENWEATHERMAP_API_KEY=your_actual_api_key_here
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will boot up (usually accessible at `http://localhost:5173`).

5. **Build for Production:**
   ```bash
   npm run build
   ```
   The optimized production bundle will be outputted to the `dist/` directory.

---

## 🎨 Design & UX Guidelines

- **Typography:** Features the sleek, modern *Google Sans* font family.
- **Color Palette:** A vibrant, nature-inspired green schema (`#1B5E20`, `#2E7D32`) paired with clean white surfaces and subtle box-shadows.
- **Touch Targets:** All interactive elements maintain a minimum size of 48x48px complying with modern mobile accessibility standards.
- **Safe-Areas:** The application fully utilizes `viewport-fit=cover` and CSS `env(safe-area-inset-top)` variables to gracefully avoid notches and system status bars on modern smartphones.

---

## 📝 License

This project was developed for a university evaluation focusing on Mobile Web App Development, emphasizing raw DOM manipulation, state management, and modern Web APIs.
