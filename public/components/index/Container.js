import React from 'react' 


class Container extends React.Component {
    render() {
        return (
            <div className="main-container">
                <div className="centered-form">
                    <div className="centered-form__box">
                        <h3>Join</h3>
                        <form id="loginForm" action="/chat.html" method="post">
                            <label>Display Name</label>
                            <input type="text" name="username" placeholder="Display Name" required autoComplete="off"/>
                            <label>Room Name</label>
                            <input type="text" name="room" placeholder="Room" required autoComplete="off"/>
                            <button>Join</button>
                        </form>
                    </div>
                </div>
                <div id="room-list" className='text-center'>

                </div>
            </div>
        );
    }
}

export default Container;