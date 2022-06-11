import logo from './assets/logo.svg';
import Timer from './components/Timer';
import './global.css';

function App() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Pomo" />
      <Timer />
      {/* <h2 style={{ color: 'red' }}> Pomodoro </h2> */}
      {/* <h2 style={{ color: '#57E2EB' }}> Short Break </h2> */}
      {/* <h2 style={{ color: '#E8EB57' }}> Long break </h2> */}
    </div>
  );
}

export default App;
