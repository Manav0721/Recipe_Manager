<div align="center">

# 🍽️ Recipe Manager

**A modern, dark-themed recipe management app built with vanilla JavaScript**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![localStorage](https://img.shields.io/badge/Storage-localStorage-green?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

*Store, organize, and manage your favorite recipes with a sleek interface*

[View Demo](https://manav0721.github.io/Recipe_Manager/)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Data Structure](#-data-structure)
- [Usage](#-usage)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Browser Support](#-browser-support)
- [Assumptions & Limitations](#-assumptions--limitations)
- [Known Issues](#-known-issues)
- [Technical Details](#-technical-details)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [Roadmap](#-roadmap)

---

## 🎯 About

**Recipe Manager** is a lightweight, client-side web application for managing your recipe collection. Built with vanilla JavaScript and modern CSS, it offers a beautiful dark-themed interface with zero dependencies and instant performance.

### Why Recipe Manager?

- ✅ **Zero Setup** – Just open and use
- 🚀 **Lightning Fast** – No backend, no loading times
- 🎨 **Beautiful UI** – Modern dark theme with smooth animations
- 📱 **Fully Responsive** – Works on desktop, tablet, and mobile
- ⭐ **Favorites System** – Star your go-to recipes
- 🔒 **Private** – All data stays on your device
- 🏠 **Home Navigation** – Click **“Recipe Manager”** in the header to instantly return to the recipe list

---

## ✨ Features

### Core Functionality

- ➕ **Add / Edit / Delete** recipes with rich details
- 🔍 **Instant Search** by title
- 🎚️ **Smart Filters** by difficulty (Easy / Medium / Hard)
- 🌿 **Type Toggle Slider** for Veg / Non-Veg / Both
- 📸 **Image Support** via external URLs
- 💾 **Auto-Save** to localStorage (no backend)
- ⭐ **Favorites per Recipe**
  - Star icon on each card
  - Favorite button in recipe detail view
- 🧲 **Favorites Filter**
  - “Favorites only” toggle in toolbar to quickly see starred recipes
- 📄 **Pagination**
  - Recipes listed with pagination (9 per page by default)
  - “Previous / Next” controls + counter (e.g. *Showing 1–6 of 6 recipe(s)*)

### User Experience

- ⌨️ **Keyboard Shortcuts** for power users
- 🎨 **Smooth Animations** and transitions on cards and UI elements
- 📊 **Result Counter** showing how many recipes match current filters
- 🍞 **Toast Notifications** for add/update/delete, validation, etc.
- 📱 **Mobile-Optimized** layout and spacing
- ➕ **Floating Add Button (FAB)** on mobile/desktop to quickly add a new recipe
- 📋 **Copy Ingredients** button in detail view (copies ingredients to clipboard)
- 🖨️ **Print / Export to PDF**
  - Dedicated print stylesheet
  - Use browser “Print → Save as PDF” to export a clean recipe view

### Pre-loaded Recipes

Comes with **6 delicious sample recipes**:

- 🥘 Paneer Tikka Masala  
- ☕ Masala Chai  
- 🥪 Veg Sandwich  
- 🍚 Veg Pulao  
- 🍗 Chicken Biryani  
- 🍛 Butter Chicken  

---

## 🚀 Quick Start

### Installation

1. **Download** or clone this repository:

git clone https://github.com/yourusername/recipe-manager.git
cd recipe-manager

text

2. Open `index.html` in your browser:

- On macOS

  ```
  open index.html
  ```

- On Linux

  ```
  xdg-open index.html
  ```

- On Windows

  ```
  start index.html
  ```

That's it! No build process, no npm install, no configuration needed.

### File Structure

recipe-manager/
│
├── index.html               # Main HTML structure
├── main.css                 # Styling, dark theme, responsive layout, print view
│
├── js/                      # JavaScript folder
│   ├── app.js               # Main application controller (state, events, pagination, favorites)
│   ├── ui.js                # UI rendering, DOM manipulation, pagination, favorites
│   ├── storage.js           # localStorage management + seed data
│   └── validation.js        # Form validation logic



text

---

## 💾 Data Structure

All recipes are stored in localStorage under the key:

`recipes_dark_app_v3_slider`

## 🎮 Usage

### Adding a Recipe

Click the **+ Add Recipe** button in the header, or tap the green floating + button at the bottom right, or press the `^` shortcut.

Fill in all required fields:

- Title and Description
- Ingredients (one per line)
- Steps (one per line)
- Prep & Cook Time (in minutes)
- Difficulty level
- Veg / Non-Veg type
- Optionally add an image URL

Click **Save Recipe** to save.

### Searching & Filtering

- Search Bar: filter recipes by title
- Difficulty Dropdown: filter by cooking difficulty
- Type Slider: toggle Veg / Non-Veg / Both
- Favorites Only: toggle to show only starred recipes

The toolbar bar shows the count of visible recipes.

### Favorites

Click the star icon on a recipe card or use the favorite button inside recipe details.

### Recipe Details

Click any recipe card for full details (ingredients, steps, time, badges, image).

### Edit / Delete

Edit or delete recipes from detail view. No undo for delete.

### Copy Ingredients

Click **Copy Ingredients** in detail view to copy ingredients to clipboard.

### Print / Export PDF

Click **Print / Export PDF** in detail to open print-friendly view and export via browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action                        |
|----------|-------------------------------|
| ^        | Open “Add Recipe” form       |
| `        | Focus on the search input    |

Note: OS-level shortcut conflicts may require button use instead.

---

## ⚙️ Assumptions & Limitations

- Modern browser with ES6 support
- JavaScript enabled
- Recipe images via external URLs only
- Ingredients and steps entered one per line
- Time in minutes
- Single user per device
- No cloud sync or multi-user support
- Local storage limit ~5-10MB
- No JSON/CSV export or syncing yet

---

## 🐛 Known Issues

- Data loss if browser cache cleared
- Broken image URLs show missing pictures
- Long titles can overflow on small screens
- Shortcut ^ may conflict with OS shortcuts
- No undo after recipe deletion
- Background requires internet for Unsplash image
- Clipboard permissions may block copy

---

## 🔧 Technical Details

- Modular JavaScript architecture
- Custom dark theme CSS with responsive design and print styles
- localStorage API for data persistence
- Accessible markup and ARIA labels
- Keyboard shortcuts for usability

---

## 🤝 Contributing

- Fork & clone the repo
- Create feature branches
- Commit and push changes
- Open pull requests

Follow coding style, test on multiple browsers, update README, and keep backward compatibility.

---

## 🙏 Acknowledgments

- Icons are native emojis
- Inspired by apps like Paprika, Notion, Whisk
- Built with ❤️ and vanilla JavaScript

---

## 📈 Roadmap

- JSON/CSV export & import
- Recipe categories and tags
- Rating system and notes
- Light/dark theme toggle
- PWA support
- Advanced search features
- Nutritional info and portion scaling
- Cloud backup and recipe sharing

Made with ❤️ and vanilla JavaScript  
⭐ Star this repo if you find it useful!

[⬆ Back to Top](#-recipe-manager)