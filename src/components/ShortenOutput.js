import React, { Component } from 'react';

export default class ShortenOutput extends Component {
    componentDidMount() {
        
        const { id, namespace } = this.props.match.params;
        const fullUrl = namespace ? `${namespace}/${id}` : id;
        console.log('id: ', id, namespace, fullUrl)
        fetch(`http://localhost:5000/${fullUrl}`, {
            method: 'GET',
        })
        .then((data) => {
            window.location = data.url;
            console.log('data: ', data.url)
        })
        .catch(e => console.log('e: ', e))
    }

    render() {
        const { id, namespace } = this.props.match.params;
        console.log('id - namespace: ', id, ' - ', namespace)
        return (
            <div>
                <p>Your shortened URL is http://localhost:3000/{namespace}/{id}</p>
            </div>
        )
    }
}
