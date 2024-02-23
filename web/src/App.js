import './App.css';
import CharacterCard from './components/characterCards/CharacterCard'

function App() {
  return (
    <div className="App">
      <div className="content">
        <ul>
            <CharacterCard/>
            <CharacterCard/>
            <CharacterCard/>
            <CharacterCard/>
            <CharacterCard/>
            <CharacterCard/>
        </ul>
      </div>
    </div>
  );
}

export default App;
