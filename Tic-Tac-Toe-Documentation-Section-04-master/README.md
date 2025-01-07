<h1>Tic tac toe documentation</h1>

<h2>In this project we will learn about topics like </h2>
-Multiple State Values <br>
-Lifting State up <br>
-Derived State <br>
-Nested Lists <br>
-Array & Object States<br>
-Component Functions vs Normal Function <br>

<h2>We will also learn about the</h2>
-Behind the scenes of JSX <br>
-Structuring Components and States <br>
-Patterns & Best Practices <br>

<h2>Not All Content Must Go Into Components</h2>

Not everthing has to go in the components. If we have a static elements like Header that we will never change then those can be added in the index.html

Example: Header tag is added directly in the index.html

![alt text](image.png)


<h2>Closer Look: public/ vs assets/ for Image Storage</h2>

*The public/ Folder*
As shown in the previous lecture you can store images in the public/ folder and then directly reference them from inside your index.html or index.css files.

The reason for that is that images (or, in general: files) stored in public/ are made publicly available by the underlying project development server & build process. Just like index.html, those files can directly be visited from inside the browser and can therefore also be requested by other files.

If you try loading localhost:5173/some-image.jpg, you'll be able to see that image (if it exists in the public/ folder, of course).

*The src/assets/ Folder*
You can also store images in the src/assets/ folder (or, actually, anywhere in the src folder).

*So what's the difference compared to public/?*

Any files (of any format) stored in src (or subfolders like src/assets/) are not made available to the public. They can't be accessed by website visitors. If you try loading localhost:5173/src/assets/some-image.jpg, you'll get an error.

Instead, files stored in src/ (and subfolders) can be used in your code files. Images imported into code files are then picked up by the underlying build process, potentially optimized, and kind of "injected" into the public/ folder right before serving the website. Links to those images are automatically generated and used in the places where you referenced the imported images.

*Which Folder Should You Use?*
You should use the public/ folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the index.html file or favicons.

On the other hand, images that are used inside of components should typically be stored in the src/ folder (e.g., in src/assets/).

<h2>Components instances work in isolation</h2>

![alt text](image-1.png)

Here we have tow instances of the player component. Both will hanve independent function.

<h2> Best Practice: Updating State Based On Old State Correctly</h2>

In react when updating state based on the previous value of that state 
Do not do like this 

```jsx
  function handleEditClick() {
        setIsEditing(!isEditing);
    }
```
The problem with this code is that react behind the scenes is scheduling those state updates <br>
This state update is not performed instantly but scheduled by react to perform in future <br>

<h3>For example</h3> 

```jsx
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(!isEditing);
        setIsEditing(!isEditing);
    }
```
This above code if we see the first setIsEditing() will set isEditing to true then the second function will set the isEditing to false.<br>
This means that there no use of this function. But this is not the case because of scheduling the code will not work as we intend

<h3>For example optimal way for the above code is</h3>

```jsx
  function handleEditClick() {
        setIsEditing((editing)=> !editing);
        setIsEditing((editing)=> !editing);
    }
```
This code will work as we intend 

<h3> This is the way we should update state based on old value</h3>

```jsx
  function handleEditClick() {
        setIsEditing((editing)=> !editing);
    }
```

This is strongly recommended by the react team

This is done because the arrow function we pass in the setIsEditing() will get the current state value 

<h2>User Input 2 way binding</h2>

Here we have used two way binding for the input using state playerName<br>

```jsx
import { useState } from 'react';

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName ] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing)=> !editing);
    }

    function handleOnChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        editablePlayerName = <input onChange={handleOnChange} type='text' required value={playerName}/>
    }

    return <li>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing? "Save": "Edit"}</button>
    </li>
}
```
<h2>Rendering multi-dimentional Lists</h2>

```jsx 
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    return <ol id="game-board">
        {initialGameBoard.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) =>
                        <li key={columnIndex}>
                            <button>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
    </ol>

}
```
<h2>Best Practice: Updating Object State Immutably</h2>
When state is an object or an array (which are reference type) then we should update that state in an imuatable way. <br>
This means we should create a deep copy first then update it.<br>
This practice is recommended by the react team. 
Reason for this is scheduling it can impact our output. 

Here we are mutating the old state itself using setGameBoard() react team advise aganist it. 

```jsx
import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, columnIndex){
        setGameBoard((prevGameBoard)=> {
            prevGameBoard[rowIndex][columnIndex] = 'X';
            return prevGameBoard;
        });
    }

    return <ol id="game-board">
        {initialGameBoard.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) =>
                        <li key={columnIndex}>
                            <button>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
    </ol>

}
```

Instead take a deep copy and then update the state 
```jsx
import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, columnIndex){
        setGameBoard((prevGameBoard)=> {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][columnIndex] = 'X';
            return updatedBoard;
        });
    }

    return <ol id="game-board">
        {initialGameBoard.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) =>
                        <li key={columnIndex}>
                            <button>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
    </ol>

}
```

<h1>Lifting State Up [Core Concept]</h1>

<p>lifting up state refers to the process of moving state from one component to a common parent component so that it can be shared between sibling or child components. This approach is crucial for managing state effectively in scenarios where multiple components need access to the same data.</p>

For Example<br>

GameBoard.jsx
```jsx
import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, columnIndex) {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
            return updatedBoard;
        });
        onSelectSquare();
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) =>
                        <li key={columnIndex}>
                            <button onClick={() => handleSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
    </ol>

}
```

Player.jsx

```jsx
import { useState } from 'react';

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
    }

    function handleOnChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = <input onChange={handleOnChange} type='text' required value={playerName} />
    }

    return <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
}
```

These both Gameboard.jsx and Playeer.jsx require a single state for updation of the content. <br>
So in this case the sate can be lifted to nearest most parent component. The parent Component is App.jsx 

App.jsx 

```jsx 
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from 'react';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X"); // here state upade is done with the use of previous state so using arraw functions 
    console.log(activePlayer);
  }

  return <main>
    <div id="game-container" >
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
    </div>
  </main>
}
export default App

```

<h2>Prefer Computed Values & Avoid Unnecessary State</h2>
go through video once lec no 84 