import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
  Button, Row, Col, Label,
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderDish({dish, isLoading, errMess}) {
  if (isLoading) {
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  if (errMess) {
    return(
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  }

  if (dish != null) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  } else {
    return (
      <div></div>
    )
  }
}

function RenderComments({comments, addComment, dish}) {
  if (comments != null && !!comments.length) {
    const feedback = comments.map(comment => {
      const date = new Intl
        .DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
        .format(new Date(Date.parse(comment.date)))

      return (
          <div key={comment.id}>
            <ol className="list-unstyled">
              <li>{comment.comment}</li>
              <li>-- {comment.author}, {date}</li>
            </ol>
          </div>
      )
    })

    return (
      <React.Fragment>
        <h4>Comments</h4>
          {feedback}
        <CommentForm
          addComment={addComment}
          dish={dish} />
      </React.Fragment>
    )
  } else {
    return <div></div>
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isModalOpen: false
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    const { dish, addComment } = this.props;
    const { author, rating, comment } = values;
    addComment(dish.id, rating, author, comment)
    // event.preventDefault();
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    return (
      <React.Fragment>
        <Button onClick={this.toggleModal} color="primary">Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" xs={12}>Rating</Label>
                <Col>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control" defaultValue={5}>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="author" xs={12}>Your Name</Label>
                <Col>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" xs={12}>Comment</Label>
                <Col>
                  <Control.textarea model=".comment" id="comment" name="comment"
                     rows="6"
                    className="form-control"/>
                </Col>
              </Row>

              <Row className="form-group">
                <Col>
                  <Control.button type="submit"
                    model="local"
                    className="btn btn-primary"
                    disabled={{ valid: false }}>
                    Submit
                  </Control.button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish ? props.dish.name : ''}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish ? props.dish.name : ''}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish
            dish={props.dish}
            isLoading={props.isLoading}
            errMess={props.errMess} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments}
            addComment={props.addComment}
            dish={props.dish} />
        </div>
      </div>
    </div>
  )
}

export default DishDetail;
