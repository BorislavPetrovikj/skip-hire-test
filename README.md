# Skip Size Page Redesign – WeWantWaste Coding Challenge

## Overview

This project is a complete redesign of the "Choose Your Skip Size" page for [WeWantWaste](https://wewantwaste.co.uk/), as part of a front-end coding challenge. The goal was to create a visually distinct, modern, and responsive page while maintaining all original functionality.

## Features

- **Fully redesigned UI**: The page looks and feels completely different from the original.
- **Responsive design**: Works seamlessly on both desktop and mobile browsers.
- **Accessible**: Improved contrast, keyboard navigation, and alt text for images.
- **Dynamic data**: Skip options are fetched from the provided API endpoint.
- **Modern stack**: Built with React, TypeScript, Vite, and Tailwind CSS.

## How to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BorislavPetrovikj/skip-hire-test.git
   cd skip-hire-test
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Data Source

Skip options are dynamically loaded from:
[https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft](https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)

## Design & Approach

- **UI/UX**: The design is intentionally different from the original, focusing on clarity, ease of use, and modern aesthetics.
- **Responsiveness**: Layouts adapt to all screen sizes using Tailwind CSS utilities.
- **Accessibility**: All interactive elements are keyboard accessible, and images have descriptive alt text.
- **Component structure**: The codebase is organized into reusable React components for maintainability.

## Functionality

- Users can view all available skip sizes, prices, and hire periods.
- Each skip card displays relevant details (size, price, hire period, and special attributes).
- Users can select a skip size, which is visually highlighted.
- The "Continue" button proceeds to the next step, preserving the selected skip.

## Submission

- **GitHub repository**: [Your public repo link here]
- **Live demo / sandbox**: [Your deployed or sandbox link here]

## Contact

For any questions, please contact me via [your email or LinkedIn].

---

**Thank you for reviewing my submission!**
