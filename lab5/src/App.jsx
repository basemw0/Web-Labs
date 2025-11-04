import React, { useEffect, useState } from 'react'
import './App.css'

function Star({ filled }) {
  return <span className={filled ? 'star filled' : 'star'}>★</span>
}

function App() {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [movies, setMovies] = useState([])

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('movies')
      if (raw) setMovies(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load movies', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('movies', JSON.stringify(movies))
    } catch (e) {
      console.error('Failed to save movies', e)
    }
  }, [movies])

  function addMovie(e) {
    e && e.preventDefault()
    const t = title.trim()
    if (!t) return
    const item = {
      id: Date.now(),
      title: t,
      rating: Number(rating) || 0,
      review: review.trim(),
      addedAt: new Date().toISOString(),
    }
    setMovies((m) => [item, ...m])
    setTitle('')
    setRating(5)
    setReview('')
  }

  function removeMovie(id) {
    setMovies((m) => m.filter((it) => it.id !== id))
  }

  return (
    <div id="root">
      <h1>Movie Reviews</h1>
      <div className="card">
        <form className="movie-form" onSubmit={addMovie}>
          <input
            aria-label="movie title"
            placeholder="Movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Very good</option>
            <option value={3}>3 - Good</option>
            <option value={2}>2 - Fair</option>
            <option value={1}>1 - Poor</option>
          </select>

          <textarea
            placeholder="Short review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={3}
          />

          <div className="form-actions">
            <button type="submit" className="add">Add Movie</button>
            <button
              type="button"
              className="clear"
              onClick={() => {
                setTitle('')
                setRating(5)
                setReview('')
              }}
            >
              Clear
            </button>
          </div>
        </form>

        <hr />

        <div className="movies">
          {movies.length === 0 && <p className="muted">No movies yet — add one above.</p>}
          {movies.map((m) => (
            <div className="movie" key={m.id}>
              <div className="movie-head">
                <h3 className="movie-title">{m.title}</h3>
                <div className="movie-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < m.rating} />
                  ))}
                </div>
              </div>
              {m.review && <p className="movie-review">{m.review}</p>}
              <div className="movie-actions">
                <button className="delete" onClick={() => removeMovie(m.id)}>Delete</button>
                <small className="date">{new Date(m.addedAt).toLocaleString()}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
