import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
  Button, Row, Col, Label,
  Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}) {
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

function RenderComments({comments}) {
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
        <CommentForm />
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
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
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
                    className="form-control">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="name" xs={12}>Your Name</Label>
                <Col>
                  <Control.text model=".name" id="name" name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}/>
                  <Errors
                    className="text-danger"
                    model=".name"
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
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  )
}

export default DishDetail;
