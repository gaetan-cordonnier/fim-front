# <p align="center">Food Inventory Management</p>

## Front-End Repository

## Description:

This application allows you to manage the food stock in a household to limit waste and unnecessary expenses.

**Features:**
- Google authentication.
- Recording of food or prepared meals in a database (by scanning barcodes or using the user interface) based on several criteria: categories, weight, quantity, expiration date, storage location...
- Display and management of the stock (nutri-score of food, allergens...).
- Recording and consultation of favorite recipes.
- Organization of a weekly menu based on recorded recipes.
- Verification of the availability (or not) of ingredients necessary to prepare the recipes in the stock.
- Creation of a shopping list based on the registered menu and missing ingredients.
- Receive notifications when the expiration date of food in stock is approaching.

**Future improvements:**
- Historical consumption of food.
- Proposal of menus based on a specific diet.
- Proposal of recipes based on the seasonality.

## Tech Stack:

- [Vue.js](https://vuejs.org/)
- [Quasar](https://quasar.dev/)
    - ESLint
    - Prettier
- [Node.js](https://nodejs.org/)
- [Pinia Store](https://pinia.vuejs.org/)
- [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2?hl=fr)

## Installation:

**Prerequisite:**

- Install Node.js v12.22.1 or more ([Documentation](https://nodejs.org/en/download/)), for check your current version:

```bash
node --version
```

- Install npm v6.13.4 or more (usually included with Node.js), for check your current version:

```bash
npm --version
```

- Installation of the Quasar Client

```bash
$ npm i -g @quasar/cli
```

**File Recovery:**

1. Recovering the project with git:

```bash
git clone git@github.com:gaetan-cordonnier/fim-front.git
```

2. Move to folder retrieved from github:

```bash
cd fim-front
```

3. Moving to the desired branch (example: develop):

```bash
git checkout develop
```

4. Installation of files and generation of a build:

```bash
npm install
```

or

```bash
npm i
```


## Starting:

1. Create an .env file in the root of the project and write the link to the back-end:

```bash
VUE_APP_BACK_END_URL=http://localhost:8080
```

2. Run the application with:

```bash
quasar dev
```

_Enjoy!_


## Author:
#### Gaëtan Cordonnier
- Github: [gaetan-cordonnier](https://github.com/gaetan-cordonnier)
## Contact:
- Linkedin: [gaetancordonnier](https://www.linkedin.com/in/gaetancordonnier/)</groupId>