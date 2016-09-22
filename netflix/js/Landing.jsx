const React = require('react')
const { Link, hashHistory } = require('react-router')
const { connector } = require('./Store')

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.handleSearchTermEvent = this.handleSearchTermEvent.bind(this)
    this.goToSearch = this.goToSearch.bind(this)
  }

  handleSearchTermEvent (e) {
    this.props.setSearchTerm(e.target.value)
  }

  goToSearch (e) {
    hashHistory.push('search')
    e.preventDefault() // preveting from moving to another page
  }

  render () {
    return (
      <div className='home-info'>
        <h1 className='title'>svideo</h1>
        <form action="" onSubmit={this.goToSearch}>
          <input
            className='search'
            type='text'
            placeholder='Search'
            value={this.props.searchTerm}
            onChange={this.handleSearchTermEvent}
          />
        </form>
        <Link to='/search' className='browse-all'>or Browse All</Link>
      </div>
    )
  }
}

const { func, string } = React.PropTypes

Landing.propTypes = {
  setSearchTerm: func,
  searchTerm: string
}

module.exports = connector(Landing)
