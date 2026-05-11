import './home.css'
import useSessionStore from '../../stores/useSessionStore.js'
import ScienceSection from '../../components/science/ScienceSection.jsx';
import { Component } from 'react';

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
      {user && (
        <h2>Välkommen, {user.user_metadata?.first_name}!</h2>
      )}
      <p>Vad vill du gasa på med idag?</p>
      <h1>HOME</h1>
      <ErrorBoundary>
        <ScienceSection />
      </ErrorBoundary>
    </div>
  );
}


export default HomeView;