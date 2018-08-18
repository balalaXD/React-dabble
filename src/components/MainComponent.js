import React, { Component } from 'react';
import Menu from './MenuComponent'; // If you write `import { Menu } from PATH;' will complain
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDishID: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDishID: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.find((dish) => dish.featured)}
              promotion={this.state.promotions.find((promo) => promo.featured)}
              leader={this.state.leaders.find((leader) => leader.featured)}/>
      )
    }

    const DishWithId = ({match}) => {
      console.log(match)
      return(
        <DishDetail dish={this.state.dishes.find((dish) => dish.id === +match.params.dishId)}
          comments={this.state.comments.filter((comment) => comment.dishId === +match.params.dishId)} />
      );
    };

    return (
      <div>
        <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Route exact path='/menu/:dishId' component={DishWithId} />} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
