import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg top src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          {this.renderComments(dish.comments)}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderComments(comments) {
    if (comments != null && !!comments.length) { 
      const feedback = comments.map(comment => {
        const date = (new Date(comment.date)).toLocaleString()

        return (
          <ol className="list-unstyled" key={comment.id}>
            <li>{comment.comment}</li>
            <li>-- {comment.author}, {date}</li>
          </ol>
        )
      })

      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
            {feedback}
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      this.renderDish(this.props.selectedDish)
    )
  }
}

export default DishDetail;
