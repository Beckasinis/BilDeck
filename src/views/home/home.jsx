import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import { Component } from 'react';
import Hero from './hero/hero.jsx';


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
      
    </div>
  );
}


export default HomeView;