var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var App = React.createClass({

  render: function() {
    return (
      <div className="main-app">
        <ul className="nav-bar">
          <li className="nav-item"><Link to="/">See Map</Link></li>
          <li className="nav-item"><Link to="/budget">See Budget Table</Link></li>
          <li className="nav-item"><Link to="/tsp">See TSP example</Link></li>

        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
