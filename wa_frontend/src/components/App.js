import "./App.css";

import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <div id="container">
        <Header />

        <MainContent />

        <Footer />
      </div>
    </div>
  );
}

export default App;
