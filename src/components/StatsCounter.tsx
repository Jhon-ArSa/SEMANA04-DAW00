import { useState } from 'react';
import './StatsCounter.css';

export default function StatsCounter() {
  const [followers, setFollowers] = useState(12547);
  const [likes, setLikes] = useState(8932);
  const [isLiked, setIsLiked] = useState(false);

  const handleFollow = () => {
    setFollowers(prev => prev + 1);
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <section className="stats-counter">
      <div className="stats-container">
        <h2 className="stats-title">📊 Únete a Nuestra Comunidad</h2>
        <p className="stats-subtitle">Miles de constructores confían en nosotros</p>

        <div className="stats-cards">
          <div className="stat-card" data-reveal="up">
            <div className="stat-icon">
              <i className="ri-user-follow-line"></i>
            </div>
            <div className="stat-number">{followers.toLocaleString()}</div>
            <div className="stat-label">Seguidores</div>
            <button className="stat-btn" onClick={handleFollow}>
              <i className="ri-user-add-line"></i> Seguir
            </button>
          </div>

          <div className="stat-card" data-reveal="up">
            <div className="stat-icon">
              <i className="ri-heart-line"></i>
            </div>
            <div className="stat-number">{likes.toLocaleString()}</div>
            <div className="stat-label">Me Gusta</div>
            <button 
              className={`stat-btn ${isLiked ? 'liked' : ''}`} 
              onClick={handleLike}
            >
              <i className={isLiked ? 'ri-heart-fill' : 'ri-heart-line'}></i> 
              {isLiked ? 'Te Gusta' : 'Me Gusta'}
            </button>
          </div>

          <div className="stat-card" data-reveal="up">
            <div className="stat-icon">
              <i className="ri-star-line"></i>
            </div>
            <div className="stat-number">4.9</div>
            <div className="stat-label">Calificación</div>
            <div className="stat-stars">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
            </div>
          </div>
        </div>

        <div className="stats-info">
          <p>
            💡 <strong>Contador en vivo:</strong> Estos números aumentan en tiempo real 
            cuando los usuarios interactúan. Implementado con <code>useState</code> de React.
          </p>
        </div>
      </div>
    </section>
  );
}
