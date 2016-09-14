const React = require('react')
const ShowCard = require('./ShowCard')
const Header = require('./Header')
const { connector } = require('./Store')

class Search extends React.Component {
  render () {
    return (
      <div className="container">
        <Header showSearch />
        <div className="shows">
          {this.props.shows
            .filter((show) => `${show.title} ${show.description}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
            .map((show) => (<ShowCard {...show} key={show.imdbID} />)
          )}
        </div>
      </div>
    )
  }
}
const { arrayOf, object, string } = React.PropTypes

Search.propTypes = {
  shows: arrayOf(object),
  searchTerm: string
}

module.exports = connector(Search)
