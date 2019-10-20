import React from 'react';
import { Button } from "reactstrap";
import './Entry.scss';
import { connect } from "react-redux";
import { authenticate } from "../actions";

interface ComponentProps {
    authenticate: (login: boolean, isAdmin?: boolean) => any;
}

const Entry: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { authenticate } = props;
    return (
        <div className="entry">
            <h2>Select your view</h2>
            <div>
                <Button color="success" onClick={()=>authenticate(true,true)}>Admin View</Button>
                <Button color="primary" onClick={()=>authenticate(true)} className="ml-2">User View</Button>
            </div>
        </div>
    );
};
const mapDispatchToProps = { authenticate };

export default connect(null, mapDispatchToProps)(Entry);
