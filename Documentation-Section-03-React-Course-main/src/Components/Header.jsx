import './Header.css';

export default function Header() {
    return (
        <header>
            <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                { Math.floor(Math.random() * 9) + 1} Fundamental React concepts you will need for almost any app you are going to build!
            </p>
        </header>
    );
}