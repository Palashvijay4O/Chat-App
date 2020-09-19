import React from 'react';
import Header from './Header'
import Container from '../components/index/Container'

const titleSite = 'LightChat.com'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header value={titleSite}/>
                <Container />
            </div>
        )
    }
}

export default App;