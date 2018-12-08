import React from 'react';
import Loadable from 'react-loadable';

function Loading(props) {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.timedOut) {
        return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}
let path = null;
const LoadableAnotherComponent = Loadable({
    loader: () => import(`${path}`),
    loading: Loading,
    delay: 300,
    timeout: 50000,
});

export default class AsyncLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        console.log(this.props.path);
        path = this.props.path;
        return <LoadableAnotherComponent/>;
    }
}