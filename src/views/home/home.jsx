import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import ScienceSection from '../../components/science/ScienceSection.jsx';
import { Component } from 'react';
import Hero from '../../components/hero/Hero';
import HowToSection from '../../components/howto/HowToSection.jsx';
import Testimonials from '../../components/testimonials/Testimonials.jsx';

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
      <ScienceSection />
      <HowToSection />
      <ErrorBoundary>
        <ScienceSection />
      </ErrorBoundary>

    </div>
  );
}


export default HomeView;