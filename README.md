# Dog Search App

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Dog Search App is a web application built with Next.js, React, TypeScript, and Redux. The app allows users to login by providing their name and email. Once authenticated, they can browse available dogs, filter by breed, and paginate through the results. Users can also select their favorite dogs and generate a match using the /dogs/match endpoint. This app showcases your creativity and strengths while utilizing a component library.

## Demo

Link to the live demo or a video showcasing the Dog Search App.

## Features

- **Login Screen:** Users can enter their name and email on the login screen.

- **Authentication:** The provided information is used to authenticate with the backend service's login endpoint.

- **Dog Search Page:** Authenticated users are directed to a search page where they can browse available dogs.

  - **Filtering:** Users can filter dogs by breed.

  - **Pagination:** Results are paginated for easy navigation.

  - **Sorting:** Results are sorted alphabetically by breed by default. Users can modify the sort order to be ascending or descending.

  - **Dog Details:** All fields of the Dog object (except for id) are presented.

  - **Favorite Dogs:** Users can select their favorite dogs from the search results.

- **Generate Match:** Users can generate a match by using the /dogs/match endpoint. The match will be a single dog, and the app displays it creatively.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your local machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dog-search-app.git
cd dog-search-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the required environment variables:

```plaintext
NEXT_PUBLIC_API_BASE_URL=https://api.example.com   # Replace with your backend API base URL
```

### Usage

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to access the app.

## Built With

- Next.js - The React framework for server-side rendering and static site generation.
- React - JavaScript library for building user interfaces.
- TypeScript - Typed superset of JavaScript.
- Redux - State management library for managing application state.
- [Component Library Name] - Component library used for UI elements (if applicable). Replace with the name of the component library you are using.

## API Reference

If your project uses APIs, provide documentation or examples on how to interact with them.

## Contributing

Explain how others can contribute to your project. Include guidelines for code formatting, pull requests, etc.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it as per the terms of the license.

## Acknowledgments

Mention any contributors, third-party libraries, or resources that inspired or helped you during the development of this project.
```

Remember to replace the placeholders `[Your Name]`, `[Your Username]`, `[Your Project URL]`, and other sections with the appropriate information specific to your Dog Search App project. Customize the headings and content according to your project's needs. Once you've filled in the details, your README.md file will be ready to provide valuable information about your Dog Search App to others.
