import logo from './assets/logo.svg';
import Timer from './components/Timer';
import './global.css';

function App() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Pomo" />
      <Timer />
    </div>
  );
}

export default App;
