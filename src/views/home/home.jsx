import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import { Component } from 'react';
import Hero from './hero/Hero.jsx';
import Testimonials from './sections/testimonials/Testimonials.jsx';
import HowToSection from './sections/howto/HowToSection.jsx';
import ProductSection from './sections/product/ProductSection.jsx';
import ScienceSection from './sections/science/ScienceSection.jsx';

class ErrorBoundary extends Component {
  state = { error: null };
  componentDidCatch(error) { this.setState({ error }); }
  render() {
    if (this.state.error) return <pre style={{ color: 'red' }}>{this.state.error.message}</pre>;
    return this.props.children;
  }
}

function HomeView() {
  const { user } = useSessionStore();

  return (
    <div className="home-view">
      <Hero />
      <Testimonials />
      <div className='container'>
        <HowToSection />
      </div>
      <ProductSection />
      <div className='container'>
        <ScienceSection />
      </div>
    </div>
  );
}


export default HomeView;