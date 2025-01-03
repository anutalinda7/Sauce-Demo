﻿# SauceDemo
Installation

To install Cypress and necessary dependencies, run the following commands:
npm install cypress --save-dev
npm install @faker-js/faker --save-dev

Running Tests

Run Tests in All Browsers

To run tests in all supported browsers (Chrome, Electron, Edge), use the following command:
npm run allBrowsers OR npm run allBrowsersHeaded

Run Tests in Specific Browsers

You can also run tests in individual browsers:
    • Chrome: npm run chrome OR npm run chrome-headed
    • Electron: npm run electron OR npm run electron-headed
    • Edge: npm run edge OR npm run edge-headed


Retry Tests on Failure

Tests are configured to retry if they fail (runMode: 2, openMode: 2). 
This means tests will be retried twice in both run mode and open mode.


Running Tests

Opening Cypress Test Runner

To open Cypress Test Runner interactively:
npm run open

Running Tests in Headless Mode

To run tests in headless mode (useful for CI/CD pipelines):
npm run test


Reporting

Cypress outputs test results to STDOUT by default. JUnit XML files are saved automatically.
Producing Combined Mochawesome JSON File
After running tests, a combined Mochawesome JSON file is generated to consolidate test results in the mochawesome-report.

To run all tests in all supported browsers use the following command:
npm run allTestsWithReport


Viewports Configuration

Tests in this project are designed to run across multiple viewports to ensure responsiveness and compatibility across different devices. The following viewports are configured:

    • Mobile
        ◦ Device: Mobile
        ◦ Dimensions: Width 375px, Height 667px

    • Tablet
        ◦ Device: Tablet
        ◦ Dimensions: Width 768px, Height 1024px

    • Desktop
        ◦ Device: Desktop
        ◦ Dimensions: Width 1440px, Height 900px

Each test scenario is executed sequentially across these three viewports to validate functionality and user experience consistency.


Video Recording

Cypress can record videos of your tests. Videos are saved in the cypress/videos folder by default. To enable video recording, you can adjust the configuration as needed:

    {
    "video": true,
    "videosFolder": "cypress/videos"
    }


Custom Commands

This project includes custom Cypress commands to simplify and streamline the testing process. Below are the custom commands defined:

Visiting SauceDemo
A custom command to visit the SauceDemo website:

    Cypress.Commands.add("visitSauceDemo", () => {
        cy.visit('https://www.saucedemo.com');
    })

Get Element by Data Test Selector
A custom command to get elements by the data-test attribute:

    Cypress.Commands.add('getBySel', (selector, ...args) => {
        return cy.get(`[data-test=${selector}]`, ...args)
    })


Documentation

Test scenarios and test cases documentation can be found in the root directory of this project. The file is named Test Scenarios and Test Cases.docx.
# Sauce-Demo
