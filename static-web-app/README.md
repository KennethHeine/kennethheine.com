# My Azure Static Web App

This project is an Azure Static Web App that serves a web application with a client-side interface and an API backend using Azure Functions.

## Project Structure

- **src/**: Contains the front-end code.
  - **index.html**: The main HTML document for the web application.
  - **css/**: Contains styles for the web application.
    - **styles.css**: The CSS file defining the visual appearance.
  - **js/**: Contains JavaScript code for client-side logic.
    - **app.js**: The JavaScript file handling interactivity.
  - **assets/**: Directory for image assets.
    - **images/**: Contains image files used in the web application.

- **api/**: Contains the Azure Functions for the backend.
  - **package.json**: Configuration file listing dependencies for the API functions.
  - **host.json**: Global configuration options for the Azure Functions host.
  - **local.settings.json**: Local development settings, including connection strings and application settings.
  - **functions/**: Directory for Azure Functions.
    - **HttpTrigger/**: Contains the HTTP-triggered Azure Function.
      - **function.json**: Configuration for the HTTP-triggered function.
      - **index.js**: Code for the HTTP-triggered Azure Function.

- **.github/**: Contains GitHub Actions workflows for deployment.
  - **workflows/**: Directory for workflow files.
    - **azure-static-web-apps.yml**: Workflow for deploying the static web app to Azure.

- **staticwebapp.config.json**: Configuration settings for the Azure Static Web App, including routing and authentication settings.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the `api` directory and run `npm install` to install the necessary dependencies for the Azure Functions.
3. To run the static web app locally, open the `src/index.html` file in your web browser.
4. For testing the Azure Functions locally, use the Azure Functions Core Tools.

## Usage Information

- The web application can be accessed through the main HTML file.
- The API functions can be triggered via HTTP requests as defined in the `function.json` file.
- Ensure to configure the `local.settings.json` file with the necessary settings for local development.

## Deployment

This project is set up for deployment to Azure using GitHub Actions. Ensure to configure the workflow file in `.github/workflows/azure-static-web-apps.yml` with your Azure credentials and repository settings.