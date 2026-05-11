import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import ScienceSection from '../../components/science/ScienceSection.jsx';
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: null };
  componentDidCatch(error) { this.setState({ error }); }
  render() {
    if (this.state.error) return <pre style={{color:'red'}}>{this.state.error.message}</pre>;
    return this.props.children;
  }
}

function HomeView() {
  return (
    <div className="home-view">
      <h1>HOME</h1>
      <ErrorBoundary>
        <ScienceSection />
      </ErrorBoundary>
    </div>
  );
}


export default HomeView;