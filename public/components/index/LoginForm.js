import React from 'react';

class LoginForm extends React.Component {
    // 1. Add references to the two input field
    // 2. handle onClick or onSubmit
    // 3. emit a join event from here
    render() {
        return (
            <div className="centered-form__box">
                <h3>Join</h3>
                <form id="loginForm" action="/chat.html" method="post">
                    <label>Display Name</label>
                    <input type="text" name="username" placeholder="Display Name" required autoComplete="off"/>
                    <label>Room Name</label>
                    <input type="text" name="room" placeholder="Room" required autoComplete="off"/>
                    <button type="submit">Join</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;