var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var App = React.createClass({

  render: function() {
    return (
      <div className="main-app">
        <ul className="nav-bar">
          <li className="nav-item"><Link to="/">See Budget example</Link></li>
          <li className="nav-item"><Link to="/map">See Map</Link></li>
          <li className="nav-item"><Link to="/tsp">See TSP example</Link></li>
          <li className="nav-item"><Link to="/edit">See Map Edit example</Link></li>
          <li className="nav-item"><Link to="/allocaid">See Allocating Aid example</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
