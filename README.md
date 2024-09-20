# 📦 Shipment Tracker App

This is a simple shipment tracking app developed in React Native using TypeScript. The app allows drivers to manage and track the status of their shipments. It includes a login system with validation, a splash screen animation, and a list of shipments that supports pull-to-refresh functionality.

## 🛠 Features

- **Splash Screen**
  - Implemented using Lottie animation, displaying an engaging animation as defined in the provided Figma file.
  - **Login Screen**
  - A login screen with form validation using **React Hook Form**.
  - Fields for username/email and password.
  - Animation integrated to enhance the user experience as per the Figma design.
  - **Shipment List Screen**
  - Displays a list of shipments with statuses.
  - Utilizes **FlatList** to render the shipment items, and includes pull-to-refresh for better usability.

## 🧰 **Tech Stack I Used**

- **React Native** with **Expo** for a streamlined development process.
- **TypeScript** for type safety and cleaner code.
- **React Hook Form** for form validation on the login screen.
- **Async Storage** for storing login information persistently.
- **Lottie** for smooth and eye-catching splash screen animations.

## **How to Run the App**

### **Prerequisites**

- Ensure you have **Node.js** and **Expo CLI** installed on your machine.
- Make sure you have a mobile emulator set up or Expo Go installed on your physical device.

## 📱 Screenshots

![Screenshot 1](./assets/previews/Screenshot%202024-09-20%20at%2011.42.00 PM.png)
![Screenshot 2](./assets/previews/Screenshot%202024-09-21%20at%2012.26.19 AM.png)

## 🚀 Getting Started

Follow these instructions to set up and run the Shipment Tracker App locally.

### Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or [Expo CLI](https://expo.dev/)
- [Android Studio](https://developer.android.com/studio) (for Android Emulator) or Xcode (for iOS Emulator)
- [Yarn](https://yarnpkg.com/) (Optional, but recommended)

### 🛠 Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:Kaempy/shipment-tracker-app.git
   ```

2. **Navigate inside the project**:

   ```bash
   cd shipment-tracker-app
   ```

3. **Install dependencies:**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   expo start
   ```

5. **To run the app on your device, scan the QR code using the Expo Go app, or select an emulator from the menu.**

## **How to Run the App**

To build the APK for Android:

1. **Run the following command:**:

   ```bash
   expo build:android
   ```

2. **Follow the Expo instructions to generate the APK file, which you can then download.**

## **Folder Structure**

```bash
├── assets/         # All images and Lottie animation files
├── src/            # Source code for all files and components
│   ├── app/        # App configurations and main setup
│   ├── components/ # Reusable components (e.g., Login, Splash, Shipment List)
│   ├── context/    # React context files
│   ├── lib/        # Helper libraries
│   ├── types/      # TypeScript types
│   ├── validation/ # Form validation rules
├── utils/          # Utility functions and helpers
├── README.md       # App documentation
└── package.json    # Dependencies and project metadata

```
