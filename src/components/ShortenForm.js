import React, { Component } from 'react';
// import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            namespace: '',
            customUrl: '',
            namespaces: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:5000/namespaces', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const content = await response.json();
        let namespaces = []
        content.namespaceArray.forEach(item => {
            const value = {
                value: item,
                label: item
            }
            namespaces.push(value)
        })
        this.setState({namespaces}, () => console.log('nmsp: ', this.state.namespaces))

    }
    
    async handleSubmit(event) {
        const { url, selectedOption, customUrl } = this.state;
        const namespace = JSON.parse(JSON.stringify(selectedOption))['value'];
        const withHttp = !/^https?:\/\//i.test(url) ? `http://${url}` : url;
        event.preventDefault();
        const response = await fetch('http://localhost:5000/shorten', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url:withHttp, namespace, customUrl})
        })
        const content = await response.json();
        console.log('c: ', content)
        if (content['message']) {
            console.log('message', content['message'])
        } else {
            let urlPath = customUrl ? customUrl : content.id;
            let fullUrl = (namespace === '') ? `${urlPath}` : `${namespace}/${urlPath}`;
            console.log(`Your shortened Url is : http://localhost:3000/${fullUrl}`);
        
        }
        
    }

    render() {
        
        const { selectedOption } = this.state;
        // console.log('s: ', selectedOption)
        if(selectedOption !== undefined) {
            // console.log('sO: ',  )
        } 
        
        return (
            <div>
                <h1>AEXP Shortener</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="url">Url:</label>
                    <input type="text" id="url" name="url" value={this.state.url} onChange={this.handleChange} />
                    <label htmlFor="namespace">Namespace:</label>
                    <CreatableSelect
                        value={selectedOption || ''}
                        onChange={this.handleSelectChange}
                        options={this.state.namespaces}
                        placeholder="Filter/Create Namespace..."
                    />
                    <label htmlFor="customUrl">Custom Url Path (Optional):</label>
                    <input type="text" id="customUrl" name="customUrl" value={this.state.customUrl} onChange={this.handleChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
