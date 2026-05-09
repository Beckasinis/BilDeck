import './home.css'
import useSessionStore from '../../stores/useSessionStore'

function HomeView() {
  //get curertn user from session store
  const user = useSessionStore((s) => s.user)


  return (
    <div className="home-view">
      {user && (
        <h2>Välkommen, {user.user_metadata?.first_name}!</h2>
      )}
      <h1>HOME</h1>
      <p>Här kommer info om sidan</p>

    </div>
  );
}

export default HomeView;