const React = require('react')

const MyTitle = React.createClass({  // composite component
  render () {

    const style = {color: this.props.color}

    return (
      <div>
        <h1 style={ style }>
          {this.props.title}
        </h1>
      </div>
    )
  }
})

module.exports = MyTitle
