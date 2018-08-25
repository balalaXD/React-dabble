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
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionsCreator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => {
    const action = postComment(dishId, rating, author, comment)
    dispatch(action)
  },
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
})

class Main extends Component {
  onDishSelect(dishId) {
    this.setState({ selectedDishID: dishId });
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const { dishes, promotions, leaders, comments, postComment } = this.props;
    // {
    //  promotions: {...},
    //  dishes: {isLoading: ..., errMess: ..., dishes: ...}
    // }

    const HomePage = () => {
      return (
        <Home
          dish={dishes.dishes.find((dish) => dish.featured)}
          dishLoading={dishes.isLoading}
          dishErrMess={dishes.errMess}
          promotion={promotions.promotions.find((promo) => promo.featured)}
          promoLoading={promotions.isLoading}
          promoErrMess={promotions.errMess}
          leader={leaders.find((leader) => leader.featured)} />
      )
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
          dish={dishes.dishes.find((dish) => dish.id === +match.params.dishId)}
          dishLoading={dishes.isLoading}
          dishErrMess={dishes.errMess}
          comments={comments.comments.filter((comment) => comment.dishId === +match.params.dishId)}
          commentsLoading={comments.isLoading}
          commentsErrMess={comments.errMess}
          postComment={postComment} />
      );
    };

    return (
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={leaders} />} />
                <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
                <Route exact path='/menu/:dishId' component={DishWithId} />} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
