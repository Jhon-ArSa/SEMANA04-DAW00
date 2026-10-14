import './NavigationMenu.css';

interface NavigationMenuProps {
  activeSection: number;
  onSectionChange: (section: number) => void;
}

export default function NavigationMenu({ activeSection, onSectionChange }: NavigationMenuProps) {
  const sections = [
    { id: 1, title: 'Ciclo de Render', icon: '1️⃣' },
    { id: 2, title: 'useEffect', icon: '2️⃣' },
    { id: 3, title: 'useContext', icon: '3️⃣' },
    { id: 4, title: 'Optimización', icon: '4️⃣' },
    { id: 5, title: 'Custom Hook', icon: '5️⃣' }
  ];

  return (
    <nav className="navigation-menu">
      <div className="nav-header">
        <h1>🎯 Demo Semana 7 - React Hooks</h1>
        <p>useState, useEffect, useContext, useMemo, useCallback, useRef</p>
      </div>
      
      <div className="nav-buttons">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-title">{section.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
