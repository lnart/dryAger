# MeatMature

## Introduction

MeatMature is a web API designed to facilitate users in adding and monitoring Physical DryAgers. While the physical setup is under development, this API provides robust control over various metrics critical for producing high-quality cuts of meat. This project allows users to manage DryAger devices, monitor key metrics, and even create recipes based on the data obtained from the DryAgers.
This Repository mainly is about the API and the communicaiton with other resources, for setting up the hardware part that means the actual DryAger please look into this [Repository](https://www.github.com/lnart/dryAgerEdgeDevice)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Dependencies](#dependencies)

## Prerequisites

- Node.js - version 20
  (I would recommend installing nvm (node version manager and then set the node version on 20)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Ensure you have a MongoDB instance running and accessible for the project to connect to it.
5. Create a .env file in the root of your project and populate it with the necessary environment variables:

   PORT=3000
   DB_CONNECTION_STRING=your_mongodb_uri

   BASE_URL=http://localhost:3000

   MQTT_CONNECT_STRING=your_mqtt_broker_address

   MQTT_USERNAME=your_mqtt_username

   MQTT_PASSWORD=your_mqtt_password

   CLOUD_DB_CONNECTION_STRING=your_cloud_db_uri

6. Build the project

## Usage

- Start the server in development mode
  ```bash
  npm run dev
  ```
- Build and Start the server
  ```bash
  npm run start
  ```
- Format your code
  ```bash
  npm run format
  ```
- Check your code for issues
  ```bash
  npm run format:check
  ```
- Run test suite
  ```bash
  npm run test
  ```

## Noticable Technologies

- Typescript
- tRPC
- MongoDB Atlas
- Mongoose
- Docker
- Kubernetes
- Github Actions

## Features

- User Management: Create a user profile to manage different
- DryAger Management: Create and manage multiple DryAger devices for a single user.
- Metrics Monitoring: Keep tabs on key metrics of each
- Control via API: Send commands to DryAger devices through the API.
- Recipe Creation: Generate recipes based on the metrics from DryAgers.

## Dependencies

For a list of Dependencies and Dev Dependencies see package.json file
