import { Movie } from "../types";
import React, { Component } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { addMovie, editMovie } from "../actions";
import { connect } from "react-redux";

interface Editable extends Movie {
    edit?: boolean;
    touched?: boolean;
}

interface ComponentProps {
    catId: number;
    movie?: Movie;
    addMovie: (catId: number, movie: Movie) => any;
    editMovie: (catId: number, movie: Movie) => any;
}

interface ComponentState {
    movie: Editable;
}

class MovieForm extends Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = { movie: this.props.movie || { name: '', description: '', rate: '' } };
    }

    edit(field: 'name' | 'description' | 'touched' | 'rate', value: string | boolean) {
        this.setState({
            movie: { ...this.state.movie, [field]: value }
        })
    }

    save() {
        const { movie } = this.state;
        !movie.id ? this.props.addMovie(this.props.catId, movie) : this.props.editMovie(this.props.catId, movie)
    }

    render() {
        const { movie } = this.state;
        return (<Row>
                <Col xs={3}>
                    <Input type="text" placeholder="English Name *"
                           value={movie.name} className={movie.touched && !movie.name ? 'is-invalid' : ''}
                           onChange={e => this.edit('name', e.target.value)}
                           onBlur={() => this.edit('touched', true)}
                    />
                    <span className="invalid-feedback">Category name is required</span>
                </Col>
                <Col xs={4}>
                    <Input type="textarea" placeholder="English Description"
                           value={movie.description}
                           onChange={e => this.edit('description', e.target.value)}
                    />
                </Col>
                <Col xs={2}>
                    <Input type="text" placeholder="Rate"
                           value={movie.rate}
                           onChange={e => this.edit('rate', e.target.value)}
                    />
                </Col>
                <Col>
                    <Button color="success" disabled={!movie.name} onClick={() => this.save()}>{movie.id ? 'Save' : 'Create Movie'}</Button>
                </Col>
            </Row>
        );
    }
}

const mapDispatchToProps = { addMovie, editMovie };

export default connect(null, mapDispatchToProps)(MovieForm);
