# Blacktop Coffee - Modern Café Website

A sleek, responsive website for Blacktop Coffee built with React and modern CSS. Features **AI-powered menu suggestions**, interactive filtering, and seamless user experience.

![Blacktop Coffee Website](https://img.shields.io/badge/React-18.x-blue) ![AI-Powered](https://img.shields.io/badge/AI-Powered-green) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Live-success)

## 🚀 Live Demo
[View Live Site](https://blacktopcoffee.netlify.app)

## ✨ Features

- **🤖 AI Order Generator** - Get personalized menu suggestions based on your budget
- **Responsive Design** - Perfect on all devices
- **Interactive Menu** - Category filtering with photo icons
- **Smart Budget Filtering** - AI suggests optimal combinations within your budget
- **Google Maps Integration** - Location with directions
- **Modern UI/UX** - Smooth animations and transitions
- **Contact Form** - Customer inquiries
- **Customer Reviews** - Testimonial showcase

## 🛠️ Tech Stack

- **Frontend:** React 18, CSS3, HTML5
- **AI Integration:** Groq API (Llama 3.1)
- **Icons:** Custom SVG & React Icons
- **Maps:** Google Maps API
- **Deployment:** Netlify

## 🎯 AI Order Generator

The **standout feature** - an intelligent menu assistant that:

### How It Works:
1. **Enter Your Budget** - Set your spending limit in DH
2. **Select Categories** - Choose from Drinks, Desserts, Healthy, or All
3. **Get AI Suggestions** - Receive 2-3 optimal menu combinations
4. **Smart Pairings** - AI considers flavor compatibility and value

### Technical Features:
- **Fuzzy Name Matching** - Handles typos and variations automatically
- **Price Validation** - Ensures accurate total calculations
- **Error Recovery** - Graceful fallbacks when AI is unavailable
- **Real-time Filtering** - Instant results based on selected categories

## 📁 Project Structure
src/
├── components/
│ ├── Header/ # Navigation bar
│ ├── Hero/ # Landing section
│ ├── Menu/ # Product menu with filters
│ ├── OrderGenerator/ # 🆕 AI-powered suggestions
│ │ ├── OrderGenerator.jsx # Main container
│ │ ├── BudgetInput.jsx # Budget input form
│ │ ├── AIResults.jsx # Suggestions display
│ │ ├── ai.js # AI integration service
│ │ └── OrderGenerator.css # Styling
│ ├── About/ # Company story
│ ├── Contact/ # Location & contact info
│ ├── Reviews/ # Customer testimonials
│ └── Footer/ # Site footer with wave design
├── data/
│ └── menuItems.js # Menu data structure
└── styles/
└── globals.css # Global styles & variables

text

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hddgpp/blacktop-coffee.git
   cd blacktop-coffee
Install dependencies

bash
npm install
Set up environment variables

bash
# Create .env.local
VITE_GROQ_API_KEY=your_groq_api_key_here
Run development server

bash
npm run dev
Open your browser

text
http://localhost:5173
🎨 Usage Example
javascript
// The AI Order Generator in action
const suggestions = await generateMenuSuggestions(
  availableItems, 
  80, // budget in DH
  'drinks', // category filter
  false // low budget flag
);
🔧 AI Integration Details
Model: Llama-3.1-8b-instant via Groq API

Response Time: 1-3 seconds

Features: Fuzzy matching, price validation, error recovery

Fallback: Smart algorithm when AI is unavailable

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

👨‍💻 Developer
Youssef (hddgpp)
Full-Stack Developer & AI Enthusiast

GitHub: @hddgpp

Email: youssefhehe3@example.com

🙏 Acknowledgments
Groq API for lightning-fast AI inference

React Icons for beautiful iconography

Google Maps for location services

Netlify for seamless deployment

🌟 Project Journey
This project represents 79 days of intensive learning and development, transitioning from foundational web development to production AI integration. The AI Order Generator demonstrates cutting-edge practical application of machine learning in real-world business scenarios.

⭐ Star this repo if you found the AI integration inspiring!