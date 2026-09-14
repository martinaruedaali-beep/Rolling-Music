import './error404.css'

export default function Error404() {
  return (
    <div className="error404-root">
      <div className="error404-layout">
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="error404-sidebar">
          <div className="error404-sidebar-nav-section">
            {/* Logo */}
            <a className="error404-logo" href="#">
              <div className="error404-logo-badge">
                <span className="error404-logo-badge-text">
                  &lt;<span className="pipe">|</span>&gt;
                </span>
              </div>
              <div className="error404-logo-text">
                <span className="error404-logo-brand">Rolling</span>
                <span className="error404-logo-sub">ROCK</span>
              </div>
            </a>

            {/* Primary Navigation */}
            <nav className="error404-main-nav">
              <a className="error404-nav-item error404-nav-item--active" href="#">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span>Inicio</span>
              </a>
              <a className="error404-nav-item error404-nav-item--inactive" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Explorar</span>
              </a>
              <a className="error404-nav-item error404-nav-item--inactive" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Mi Playlist</span>
              </a>
              <a className="error404-nav-item error404-nav-item--inactive" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Favoritos</span>
              </a>
              <a className="error404-nav-item error404-nav-item--inactive" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span>Playlists</span>
              </a>
            </nav>

            <hr className="error404-divider" />

            {/* Genres */}
            <div>
              <h3 className="error404-genres-header">Géneros</h3>
              <ul className="error404-genres-list">
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19a3 3 0 01-6 0 3 3 0 013-3c.5 0 1 .1 1.4.3l7.6-7.6-1.4-1.4 1.4-1.4 3.5 3.5-1.4 1.4-1.4-1.4-7.6 7.6c.2.4.3.9.3 1.4z" />
                    </svg>
                    <span>Rock Clásico</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v7a5 5 0 0010 0V3m-8 7v4a3 3 0 006 0v-4M4 7l3 1m13-1l-3 1" />
                    </svg>
                    <span>Metal</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Hard Rock</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M9 10h.01M15 10h.01M9 16s1.5-2 3-2 3 2 3 2" />
                    </svg>
                    <span>Grunge</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Alternativo</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-7 7m0 0l-3-3m3 3l-6 6a2.828 2.828 0 11-4-4l6-6m4 4l3-3" />
                    </svg>
                    <span>Punk</span>
                  </a>
                </li>
                <li className="error404-genre-item">
                  <a href="#">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 8v8m-4-4h8" />
                    </svg>
                    <span>Progresivo</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Bottom Badge */}
          <div className="error404-sidebar-badge">
            <div className="error404-sidebar-badge-icon">
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-2 8 11-12h-9l3-8z" />
              </svg>
            </div>
            <div className="error404-sidebar-badge-text">
              <p>La música nunca se detiene.</p>
              <p>Rolling Rock</p>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="error404-main">
          {/* Concert Stage Background */}
          <div className="error404-concert-bg" />

          {/* Top Header */}
          <header className="error404-header">
            <div className="error404-search-container">
              <span className="error404-search-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                className="error404-search-input"
                type="text"
                placeholder="Buscar canciones, artistas, álbumes..."
              />
            </div>
            <div className="error404-header-controls">
              <button className="error404-header-btn" aria-label="Notificaciones">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="error404-user-btn" aria-label="Perfil de usuario">
                <div className="error404-user-avatar">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="error404-user-name">Invitado</span>
                <svg className="error404-user-chevron" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </header>

          {/* Stage Silhouettes & Atmosphere */}
          <div className="error404-stage-silhouettes">
            <div className="error404-spotlight-1" />
            <div className="error404-spotlight-2" />

            {/* Guitarist & Crowd SVG */}
            <svg
              style={{ position: 'absolute', bottom: 0, right: 0, width: '62%', height: '90%', opacity: 0.9 }}
              fill="none"
              preserveAspectRatio="xMaxYMax meet"
              viewBox="0 0 800 700"
            >
              <defs>
                <radialGradient cx="60%" cy="40%" id="guitarist-glow" r="60%">
                  <stop offset="0%" stopColor="#ff1a1a" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#700000" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="580" cy="320" fill="url(#guitarist-glow)" r="300" />
              <circle cx="480" cy="220" fill="#fff" filter="blur(2px)" opacity="0.8" r="10" />
              <circle cx="700" cy="150" fill="#fff" filter="blur(2px)" opacity="0.6" r="8" />

              {/* Guitarist Silhouette */}
              <g fill="#070304">
                <path d="M570,140 C550,130 520,150 515,180 C500,200 510,240 525,260 C535,245 540,235 550,230 C565,230 575,220 595,210 C610,190 605,150 570,140 Z" />
                <path d="M510,175 C495,190 490,225 505,245 C512,235 520,230 525,230 Z" />
                <path d="M590,165 C615,180 625,215 615,245 C605,230 595,225 590,220 Z" />
                <path d="M495,240 C450,260 440,320 445,380 C455,440 470,520 480,680 L650,680 C665,580 680,480 685,400 C690,320 670,250 620,235 C580,225 530,225 495,240 Z" />
                <path d="M460,265 C410,290 380,350 400,420 C420,440 450,440 465,400 Z" />
                <path d="M640,260 C680,300 705,370 690,440 C670,470 645,460 635,420 Z" />
                <polygon points="350,390 470,410 465,435 345,415" />
                <rect height="35" rx="5" transform="rotate(-8 320 395)" width="55" x="300" y="385" />
                <circle cx="310" cy="380" r="4" />
                <circle cx="325" cy="378" r="4" />
                <circle cx="340" cy="376" r="4" />
                <circle cx="310" cy="425" r="4" />
                <circle cx="325" cy="423" r="4" />
                <circle cx="340" cy="421" r="4" />
                <path d="M460,400 C470,360 520,360 550,400 C580,440 600,530 550,570 C510,600 450,580 435,530 C420,480 430,420 460,400 Z" />
                <path d="M495,250 L640,450 L615,465 L480,265 Z" fill="#0b0507" />
                <path d="M480,600 L460,700 L540,700 L550,600 Z" />
                <path d="M570,600 L590,700 L660,700 L630,600 Z" />
              </g>

              {/* Crowd Silhouettes */}
              <g fill="#040203">
                <path d="M0,700 L0,630 C30,620 50,640 80,625 C110,610 130,635 170,615 C200,600 230,620 270,605 C310,590 340,620 380,600 C420,585 460,610 500,590 C550,610 600,595 650,620 C700,600 750,625 800,610 L800,700 Z" />
                <path d="M210,620 C205,580 200,550 205,540 C208,535 215,535 218,545 C220,555 225,575 225,615 Z" />
                <path d="M225,550 C230,540 238,540 240,552 C242,565 240,610 240,610 Z" />
                <path d="M295,570 C290,520 295,500 302,495 C308,495 312,505 310,525 L310,555 L320,555 L320,525 C320,505 328,495 334,495 C340,495 342,520 338,570 Z" />
                <circle cx="150" cy="560" r="14" />
                <path d="M142,565 L142,630 L158,630 L158,565 Z" />
                <path d="M390,610 L385,550 C385,540 395,535 400,545 L405,610 Z" />
                <path d="M420,605 L425,540 C430,530 440,535 438,548 L430,605 Z" />
                <circle cx="50" cy="640" r="25" />
                <circle cx="110" cy="635" r="28" />
                <circle cx="175" cy="625" r="30" />
                <circle cx="250" cy="620" r="26" />
                <circle cx="340" cy="615" r="29" />
                <circle cx="430" cy="620" r="32" />
                <circle cx="720" cy="630" r="30" />
                <circle cx="780" cy="625" r="32" />
              </g>
            </svg>

            <div className="error404-red-mist" />
          </div>

          {/* 404 Hero Content */}
          <div className="error404-content">
            {/* Big 404 Numbers */}
            <div className="error404-numbers">
              <span className="error404-number">4</span>
              <div className="error404-zero-wrapper">
                <span className="error404-number error404-zero">0</span>
                <div className="error404-emblem">
                  <div className="error404-emblem-circle">
                    <span className="error404-emblem-text">
                      &lt;<span className="pipe">|</span>&gt;
                    </span>
                  </div>
                </div>
              </div>
              <span className="error404-number">4</span>
            </div>

            {/* Subtitle */}
            <h1 className="error404-subtitle">PÁGINA NO ENCONTRADA</h1>

            {/* Description */}
            <div className="error404-description">
              <p>Parece que esta canción no existe...</p>
              <p className="muted">pero la música siempre encuentra el camino.</p>
            </div>

            {/* Action Buttons */}
            <div className="error404-actions">
              <a className="error404-btn-primary" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al inicio</span>
              </a>
              <a className="error404-link-secondary" href="#">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>O <span className="underline-text">explorar nuestro catálogo</span></span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="error404-footer">
            <p className="error404-footer-copyright">© 2025 Rolling Rock. Todos los derechos reservados.</p>
            <div className="error404-social-links">
              <a className="error404-social-link" href="#" aria-label="Spotify">
                <svg viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
              <a className="error404-social-link" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a className="error404-social-link" href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a className="error404-social-link error404-social-link--x" href="#" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
