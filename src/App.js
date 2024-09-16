import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/nav/Nav.js";
import ScrollToTop from "./assets/util/ScrollToTop .js";
import Home from "./pages/Home.js";
import Projects from "./pages/Projects.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Footer from "./components/footer/Footer.js";

import "./styles/app.css";
import "./styles/root.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <section className="content-wrapper">
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/projects/:project?" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
