# 🖼️ AI Multimodal Product Description Generator

This is a modern, web-based tool that leverages the power of Google's Gemini multimodal AI to automatically generate compelling e-commerce product descriptions. Simply upload a product image, provide a few key features, define your target audience, and let the AI craft persuasive, SEO-friendly copy for you in seconds.

The user interface is designed to be sleek, intuitive, and responsive, featuring a dynamic "glassmorphism" style with a beautiful abstract background and a configurable dark/light mode.

## ✨ Features

-   **🤖 AI-Powered Content:** Utilizes the `gemini-2.5-flash` model for fast and high-quality text generation.
-   **🖼️ Multimodal Input:** Analyzes both a product image and text features to create contextually rich descriptions.
-   **🎯 Audience Targeting:** Tailors the tone and style of the description to a specific target audience.
-   **🚀 Fast & Efficient:** Go from product details to a full description in a single click.
-   **🎨 Stunning UI:** A modern, responsive interface with a "glassmorphism" design, abstract background, and seamless dark/light theme switching.
-   **📋 Easy Copy-Paste:** A dedicated "Copy" button to get your generated content with one click.
-   **💾 Session Persistence:** Your input text and theme settings are automatically saved in your browser for your next visit.
-   **📁 Drag & Drop:** Easily upload images by dragging them onto the upload area.

## 🛠️ Tech Stack

-   **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI:** [Google Gemini API](https://ai.google.dev/gemini-api) (`@google/genai`)

## 🚀 Getting Started

To run this project locally, you'll need to have Node.js and npm installed.

### 1. Clone the Repository

```bash
git clone https://github.com/hsinidev/ai-product-description-generator.git
cd ai-product-description-generator
```

### 2. Install Dependencies

This project is set up to use CDN links for its main dependencies (`React`, `@google/genai`), so there are no `node_modules` to install. You just need a local server to serve the `index.html` file.

### 3. Set Up Environment Variables

You must provide your Google Gemini API key. The application is configured to read this key from an environment variable injected by its hosting environment. When running locally, you can simulate this.

-   It's assumed the `process.env.API_KEY` is made available to the browser's JavaScript context by the deployment platform. You will need to configure this on your hosting service (e.g., Vercel, Netlify).

### 4. Run the Application

You can use a simple local server to run the `index.html` file. A great, simple option is the `serve` package:

```bash
# Install serve globally if you don't have it
npm install -g serve

# Run the server from the project's root directory
serve .
```

Now, open your browser and navigate to the URL provided by `serve` (usually `http://localhost:3000`).

##  usage

1.  **Upload Image:** Drag and drop or click to upload a clear image of your product.
2.  **Add Features:** In the "Key Product Features" text area, list the main selling points, materials, dimensions, etc. (one per line is best).
3.  **Define Audience:** In the "Target Audience & Tone" field, describe who the product is for (e.g., "Tech-savvy students," "Luxury car enthusiasts," "Eco-conscious families").
4.  **Generate:** Click the "Generate Description" button.
5.  **Review & Copy:** The AI-generated description will appear on the right. Review it, and if you're happy, click the "Copy" button.

## ✍️ Author

Developed by **hsini mohamed**. You can find more of my work on [my GitHub profile](https://github.com/hsinidev/).

https://ai-multimodal-product-description-gen.netlify.app/
