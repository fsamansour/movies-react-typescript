import { Category } from "../types";
import React, { Component } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { connect } from "react-redux";
import { addCategory, editCategory } from "../actions";

interface Editable extends Category {
    edit?: boolean;
    touched?: boolean;
}

interface ComponentProps {
    category?: Category;
    addCategory: (category: Category) => any;
    editCategory: (category: Category) => any;
}

interface ComponentState {
    category: Editable,
}

class CategoryForm extends Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = { category: this.props.category || { name: '', description: '' } };
    }

    edit(field: 'name' | 'description' | 'touched', value: string | boolean) {
        this.setState({
            category: { ...this.state.category, [field]: value }
        })
    }

    save() {
        const { category } = this.state;
        !category.id ? this.props.addCategory(category) : this.props.editCategory(category)
    }

    render() {
        const { category } = this.state;
        return (<Row>
                <Col xs={3}>
                    <Input type="text" placeholder="English Name *"
                           value={category.name} className={category.touched && !category.name ? 'is-invalid' : ''}
                           onChange={e => this.edit('name', e.target.value)}
                           onBlur={() => this.edit('touched', true)}
                    />
                    <span className="invalid-feedback">Category name is required</span>
                </Col>
                <Col xs={5}>
                    <Input type="textarea" placeholder="English Description"
                           value={category.description}
                           onChange={e => this.edit('description', e.target.value)}
                    />
                </Col>
                <Col>
                    <Button color="success" disabled={!category.name} onClick={() => this.save()}>{category.id ? 'Save' : 'Create Category'}</Button>
                </Col>
            </Row>
        );
    }
}

const mapDispatchToProps = { addCategory, editCategory };

export default connect(null, mapDispatchToProps)(CategoryForm);
