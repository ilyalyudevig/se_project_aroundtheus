# Project 3: Around The U.S.

Live demo of the project on GitHub Pages: [Around the U.S.](https://ilyalyudevig.github.io/se_project_aroundtheus/)

Video description of the project: [Video description](https://www.loom.com/share/1b8304d8a2a2484ab2b47a13c2426f46?sid=32d6da26-b11f-445e-b874-6bf916f0a151)

## Description

This project is an interactive page where users can add and remove photos, like photos of other users, and make a few minor adjustments to their own profile.

The webpage is responsive, i.e., the content area's width changes depending on the browser window's width, and there is no horizontal scrolling. The minimum supported screen width is 320px with one card per row. The maximum window width is 1280px, with three cards per row—880px for the content and 200px of empty space on each side.

![Layout demo](src/docs/layout-demo.gif "Layout demo")

## Technologies

The project uses HTML to structure the content of the webpage, and CSS is used to style it.

HTML elements are marked up according to the [BEM methodoogy](https://en.bem.info/methodology/quick-start/):

![BEM markup](src/docs/bem-markup.png "BEM markup")

Each block's styles are contained in a separate CSS file (flat BEM file structure):

![Flat BEM file structure](src/docs/flat-bem-file-structure.png "Flat BEM file structure")

The project uses [Normalize.css](https://nicolasgallagher.com/about-normalize-css/), which provides a consistent base for styling across different browsers.

The project uses Flexbox and Grid for layout. The cards section displays the cards using Flexbox, and the profile section uses Grid layout.

The layout is implemented according to the [project design on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1).
