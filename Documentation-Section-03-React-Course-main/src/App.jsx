import Header from './Components/Header.jsx';
import CoreConceptss from './Components/CoreConceptss.jsx';
import Examples from './Components/Examples.jsx';

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConceptss />
        <Examples />
      </main>
    </>
  );
}

export default App;         