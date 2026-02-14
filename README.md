# Image into PDF Converter

A modern, fast, and secure client-side application to convert multiple images into a single PDF document, built with React and Tailwind CSS.

## Features

- **Multiple Image Upload**: Drag & drop support for JPG and PNG images.
- **Client-Side Processing**: All conversions happen in your browser. Your images are never uploaded to any server.
- **Smart Page Sizing**:
  - **Auto**: Creates pages matching the exact dimensions of your images.
  - **A4 & A3**: Automatically scales and centers images to fit standard paper sizes.
- **Intelligent Orientation**: Automatically detects landscape vs portrait images and adjusts page orientation accordingly for A4/A3 modes.
- **Reorder & Edit**: Easily rearrange image order or remove unwanted files before conversion.

## Built With

- **[React](https://reactjs.org/)** - UI Framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF Generation
- **[React Dropzone](https://react-dropzone.js.org/)** - File Uploads
- **[Lucide React](https://lucide.dev/)** - Icons

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/js-developer-codebase/images-to-pdf.git
   cd images-to-pdf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000`.

## Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

The output will be in the `build` directory, ready to be served by any static web host.

## License

This project is licensed under the MIT License.
