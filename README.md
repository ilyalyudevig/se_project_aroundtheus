# Project 3: Around The U.S.

Live demo of the project on GitHub Pages: [Around the U.S.](https://ilyalyudevig.github.io/se_project_aroundtheus/)

## Description

This project is an interactive page where users can add and remove photos, like photos of other users, and make a few minor adjustments to their own profile.

The webpage is responsive, i.e., the content area's width changes depending on the browser window's width, and there is no horizontal scrolling. The minimum supported screen width is 320px with one card per row. The maximum window width is 1280px, with three cards per row—880px for the content and 200px of empty space on each side.

![Layout demo](/docs/layout-demo.gif "Layout demo")

The project uses HTML to structure the content of the webpage and CSS is used to style it.

HTML elements are marked up according to the [BEM methodoogy](https://en.bem.info/methodology/quick-start/):

![BEM markup](/docs/bem-markup.png "BEM markup")

Each block's styles are contained in a separate CSS file (flat BEM file structure):

![Flat BEM file structure](/docs/flat-bem-file-structure.png "Flat BEM file structure")

The project uses [Normalize.css](https://nicolasgallagher.com/about-normalize-css/) that provides a consistent base for styling across different browsers.

The project uses Flexbox and Grid for layout. The cards section uses Flexbox to display the cards, and Grid layout is used in the profile section.

The layout is implemented according to the [design project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1).
