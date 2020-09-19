import React from 'react';
import Header from './Header'
import Container from '../components/index/Container'

const titleSite = 'LightChat.com'

class App extends React.Component {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                <div>
                    <Header value={titleSite}/>
                </div>
                <div>
                    <Container />
                </div>
            </div>
        )
    }
}

export default App;