import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import { Component } from 'react';
import Hero from '../../components/hero/Hero';
import Testimonials from '../../components/testimonials/Testimonials.jsx';
import HowToSection from '../../components/howto/HowToSection.jsx';
import ProductSection from '../../components/product/ProductSection.jsx';
import ScienceSection from '../../components/science/ScienceSection.jsx';

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
      <HowToSection />
      <ProductSection />
      <ScienceSection />
    </div>
  );
}


export default HomeView;