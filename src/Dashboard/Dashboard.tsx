import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Category, Movie, StoreState } from "../types";
import { Button, Card, CardBody, CardHeader, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { authenticate, deleteMovie } from "../actions";
import "./Dashboard.scss";
import CategoryForm from "./CategoryForm";
import MovieForm from "./MovieForm";

interface ComponentProps {
    authenticate: (login: boolean, isAdmin?: boolean) => {};
    isAdmin: boolean;
    categories: Category[];
    deleteMovie: (catId: number, movie: Movie) => any
}

interface ComponentState {
    isOpen: boolean;
    expandedCatId?: number;
    expandedMovieId?: number;
    editMovieId?: number;
}

class Dashboard extends Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            isOpen: false,
            expandedCatId: this.props.categories.length ? this.props.categories[0].id : 0
        };
    }

    toggleNav() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    expandCat(catId?: number) {
        this.setState({ expandedCatId: this.state.expandedCatId === catId ? 0 : catId });
    }

    expandMovie(movieId?: number) {
        this.setState({ expandedMovieId: this.state.expandedMovieId === movieId ? 0 : movieId });
    }

    editMovie(movieId?: number) {
        this.setState({ expandedMovieId: movieId, editMovieId: movieId });
    }

    deleteMovie(catId: number, movie: Movie) {
        this.props.deleteMovie(catId, movie);
    }

    render() {
        const { isOpen, expandedCatId, expandedMovieId, editMovieId } = this.state;
        const { authenticate, isAdmin, categories } = this.props;
        return (
            <div className="dashboard bg-light">
                <Navbar color={isAdmin ? "warning" : "info"} light expand="md">
                    <NavbarBrand href="/">Movies App ({isAdmin ? 'Admin' : 'User'} View)</NavbarBrand>
                    <NavbarToggler onClick={() => this.toggleNav()}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={() => authenticate(true, true)}>Admin View</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => authenticate(true)}>User View</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => authenticate(false)}>Log out</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className="container content mt-5">
                    {isAdmin &&
                    <Card>
                        <CardHeader>
                            <h2>Add Category</h2>
                        </CardHeader>
                        <CardBody>
                            <CategoryForm/>
                        </CardBody>
                    </Card>}
                    <Card className="mt-4">
                        <CardHeader>
                            <h2>Movies Data</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="accordion">
                                {categories.map(cat =>
                                    <Card key={cat.id}>
                                        <CardHeader>
                                            <h2 className="mb-0">
                                                <button className="btn btn-link" onClick={() => this.expandCat(cat.id)}>
                                                    {cat.name}
                                                </button>
                                            </h2>
                                        </CardHeader>
                                        <Collapse isOpen={cat.id === expandedCatId}>
                                            <CardBody>
                                                <Card color="light">
                                                    {isAdmin ?
                                                        <CardBody>
                                                            <h5>Edit Category</h5>
                                                            <hr/>
                                                            <CategoryForm category={cat}/>
                                                        </CardBody> :
                                                        <CardBody>
                                                            <b className="h6">Description:</b> {cat.description}
                                                        </CardBody>
                                                    }
                                                </Card>
                                                {isAdmin &&
                                                <Card color="light" className="mt-2">
                                                    <CardBody>
                                                        <h5>Add Movie</h5>
                                                        <hr/>
                                                        <MovieForm catId={cat.id!}/>
                                                    </CardBody>
                                                </Card>}
                                                <div className="accordion mt-2">
                                                    {cat.movies && cat.movies.map(movie =>
                                                        <Card key={movie.id}>
                                                            <CardHeader>
                                                                <h6 className="mb-0 d-flex justify-content-between">
                                                                    <button className="btn btn-link" onClick={() => this.expandMovie(movie.id)}>
                                                                        {movie.name}
                                                                    </button>
                                                                    {isAdmin &&
                                                                    <div className="actions">
                                                                        <Button color="info" onClick={() => this.editMovie(movie.id)}>Edit</Button>
                                                                        <Button color="danger" className="ml-2"
                                                                                onClick={() => this.deleteMovie(cat.id!, movie)}>Delete</Button>
                                                                    </div>}
                                                                </h6>
                                                            </CardHeader>
                                                            <Collapse isOpen={movie.id === expandedMovieId}>
                                                                <CardBody>
                                                                    {isAdmin && movie.id === editMovieId ?
                                                                        <MovieForm movie={movie} catId={cat.id!}/> :
                                                                        <Fragment>
                                                                            <h6><b>Description:</b> {movie.description}</h6>
                                                                            <h6><b>Rate:</b> {movie.rate}</h6>
                                                                        </Fragment>}
                                                                </CardBody>
                                                            </Collapse>
                                                        </Card>)}
                                                </div>
                                            </CardBody>
                                        </Collapse>
                                    </Card>)}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => ({
    isAdmin: state.isAdmin,
    categories: state.categories
});

const mapDispatchToProps = { authenticate, deleteMovie };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
