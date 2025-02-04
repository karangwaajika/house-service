import logo from "/images/cock.avif";

export default function HomePageNav() {
  return (
    <nav className="navbar-home">
      <div className="left-info">
        <div className="logo">
          <img src={logo} alt="resto-logo" width={100} height={100} />
        </div>
        
        <ul className="links">
          <li>
            <a href="/service/home">Home</a>
          </li>
          <li>
            <a href="/service/orders">Services</a>
          </li>
          <li>
            <a href="/service/service">About</a>
          </li>
          <li>
            <a href="/service/my-services">Contacts</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
}
