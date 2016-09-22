let React    = require('react');
let ReactDOM = require('react-dom');
let Relay    = require('react-relay');

const secondMultiplier = 1000;
const minuteMultiplier = 60 * secondMultiplier;
const hourMultiplier = 60 * minuteMultiplier;
const dayMultiplier = 24 * hourMultiplier;

class Item extends React.Component {
  render() {
    let item = this.props.store;

    let postDate = new Date(item.timeISO).getTime();
    let currentDate = new Date().getTime();
    let diff = currentDate - postDate;
    let elapsedTime = Math.floor(diff/hourMultiplier);

    console.debug('item', item);

    return (
      <div>
        <h1><a href={item.url}>{item.title}</a></h1>
        <h2>{item.score} points by {item.by.id} {elapsedTime} hours ago</h2>
      </div>
    );
  }
};


Item = Relay.createContainer(Item, {
  fragments: {
    store: () => Relay.QL`
      fragment on HackerNewsItem {
        id
        title,
        score,
        url,
        timeISO,
        by {
          id
        }
      }
    `,
  },
});

class TopItems extends React.Component {

  _onChange(ev) {
    let storyType = ev.target.value;
    this.setState({ storyType });
    this.props.relay.setVariables({
      storyType
    });
  }

  render() {
    let items = this.props.store.stories.map(
      (store, idx) => <Item store={store} key={idx} />
    );
    let variables = this.props.relay.variables;

    // To reduce the perceived lag
    // There are less crude ways of doing this, but this works for now
    let currentStoryType = (this.state && this.state.storyType) || variables.storyType;
    return (
      <div>
        <select onChange={this._onChange.bind(this)} value={currentStoryType}>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="ask">Ask</option>
          <option value="show">Show</option>
          <option value="job">Jobs</option>
        </select>
        { items }
      </div>
    );
  }
}


TopItems = Relay.createContainer(TopItems, {
  initialVariables: {
    storyType: "top" // graphql variable
  },
  fragments: {
    store: () => Relay.QL`
      fragment on HackerNewsAPI {
        stories(storyType: $storyType) { ${Item.getFragment('store')} },
      }
    `,
  },
});


/**
* Hey Relay, I’m going to re-define my Item component as a new component which
* wraps the original in a container.
*
* For the component’s “store” prop, I need the data described in this GraphQL
* fragment.
*
* I know I need it on a “HackerNewsAPI” object because I explored the API via
* http://GraphQLHub.com/playground/hn.
*/


// Relay Route
class HackerNewsRoute extends Relay.Route {
  static routeName = 'HackerNewsRoute';
  static queries = {
    store: ((Component) => {
      // Component is our Item
      return Relay.QL`
      query root {
        hn { ${Component.getFragment('store')} },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://www.GraphQLHub.com/graphql')
);

let mountNode = document.getElementById('container');

let rootComponent = <Relay.RootContainer
  Component={TopItems}
  route={new HackerNewsRoute()} />;

ReactDOM.render(rootComponent, mountNode);
