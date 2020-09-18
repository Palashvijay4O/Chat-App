import React from 'react';


class Header extends React.Component {
    render() {
        return (
        <em><h2 className='text-center'>{this.props.value}</h2></em>
        )
    }
}

export default Header;