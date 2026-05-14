import './notfound.css'

function NotFoundView() {
  return (
    <div className="notfound-view">
      <div className="notfound-card">
        <img src="/img/apple-touch-icon.png" alt="Logo" />
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Hoppsan, nu har du sladdat fel.</h2>
        <p className="notfound-text">Sidan du letar efter verkar inte existera eller har flyttats.</p>
      </div>
    </div>
  )
}

export default NotFoundView