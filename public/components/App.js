import React from 'react';
import Header from './Header'

const titleSite = 'LightChat.com'

class App extends React.Component {
    render() {
        return (
            <Header value={titleSite}/>
        )
    }
}

export default App;