[DEMO LINK](https://daniilbarilotti.github.io/2048_game/)

This code implements a basic version of the popular 2048 game, where players combine numbered tiles on a 4x4 grid to reach the 2048 tile. The game dynamically updates based on user keyboard inputs (arrow keys), and it includes game logic for starting, moving tiles, and checking for a win or loss condition.

1. HTML Structure
div class="container": Holds the game's elements, including the header, score, controls, and grid.
table class="game-field": Represents the 4x4 grid with rows and cells, where each tile will appear.
Messages: There are messages to indicate the game state (start, win, lose).
Button: The button allows the user to start or restart the game.

2. CSS (Styles)
Grid Styles: The .field-cell class is used to style each tile, and there are different styles for each tile value (e.g., &--2, &--4, &--8, etc.).
Game Layout: The game field is displayed in the center of the screen with flexbox, and the game elements (header, score, grid) are styled to provide a visually appealing experience.
Messages and Buttons: The start, win, and lose messages are styled to provide feedback to the player. The button changes style between starting and restarting.

3. JavaScript (Game Logic)
Starting the Game: The game is initialized when the "Start" button is clicked. It resets the board, initializes the score to zero, and places two initial blocks on the grid.
Placing Blocks: New blocks (either 2 or 4) are randomly placed on empty cells after each move.
Movement Logic: The game responds to the arrow keys (left, right, up, down). When a key is pressed, it checks if the board state changes. If tiles are moved or combined, a new block is placed.
Move Functions: These include moveLeft(), moveRight(), moveUp(), and moveDown(), which shift the tiles in the specified direction and handle tile merging.
Game Over Condition: The game ends when no moves are possible (i.e., the board is full, and no adjacent tiles can be combined).
Winning Condition: If a tile with the value 2048 appears, the player wins.

Project Setup and Running Locally

Prerequisites

Before you can run the project locally, ensure you have the following tools installed:

Node.js: You can download and install Node.js from here. npm: This comes bundled with Node.js, but you can also install it separately if needed.

Steps to Set Up the Project Locally 

Clone the Repository 
Open your terminal and run the following command to clone the project: 
git clone https://github.com/DaniilBarilotti/2048_game.git

Run npm install

Run npm start to run the project locally

Open the Project in a Browser After starting the server, the project will be accessible via a local URL like http://localhost:3000 or http://localhost:8080 (depending on your setup).
