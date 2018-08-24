import React, { Component } from 'react';
import Menu from './MenuComponent'; // If you write `import { Menu } from PATH;' will complain
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionsCreator';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => {
    const action = addComment(dishId, rating, author, comment)
    dispatch(action)
  },
  fetchDishes: () => { dispatch(fetchDishes()) }
})

class Main extends Component {
  onDishSelect(dishId) {
    this.setState({ selectedDishID: dishId });
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const { dishes, promotions, leaders, comments, addComment } = this.props;
    // {
    //  promotions: {...},
    //  dishes: {isLoading: ..., errMess: ..., dishes: ...}
    // }

    const HomePage = () => {
      return (
        <Home
          dish={dishes.dishes.find((dish) => dish.featured)}
          isLoading={dishes.isLoading}
          errMess={dishes.errMess}
          promotion={promotions.find((promo) => promo.featured)}
          leader={leaders.find((leader) => leader.featured)}/>
      )
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
          dish={dishes.dishes.find((dish) => dish.id === +match.params.dishId)}
          isLoading={dishes.isLoading}
          errMess={dishes.errMess}
          comments={comments.filter((comment) => comment.dishId === +match.params.dishId)}
          addComment={addComment} />
      );
    };

    return (
      <div>
        <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={leaders} />} />
            <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
            <Route exact path='/menu/:dishId' component={DishWithId} />} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
