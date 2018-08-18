import React, { Component } from 'react';
import Menu from './MenuComponent'; // If you write `import { Menu } from PATH;' will complain
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  onDishSelect(dishId) {
    this.setState({ selectedDishID: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.find((dish) => dish.featured)}
              promotion={this.props.promotions.find((promo) => promo.featured)}
              leader={this.props.leaders.find((leader) => leader.featured)}/>
      )
    }

    const DishWithId = ({match}) => {
      console.log(match)
      return(
        <DishDetail dish={this.props.dishes.find((dish) => dish.id === +match.params.dishId)}
          comments={this.props.comments.filter((comment) => comment.dishId === +match.params.dishId)} />
      );
    };

    return (
      <div>
        <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route exact path='/menu/:dishId' component={DishWithId} />} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
