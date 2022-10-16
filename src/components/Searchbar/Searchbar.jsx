import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => (
  <header className="Searchbar">
  <form className="SearchForm" onSubmit={onSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>

      <input
      className="SearchForm-input"
      type="text"
      autoComplete="off"
      autoFocus
        placeholder="Search images and photos"
        name="query"
    />
  </form>
</header>
)

Searchbar.propTypes = {
  onSubmit: PropTypes.func
}

export default Searchbar;