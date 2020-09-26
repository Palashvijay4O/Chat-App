import React from 'react';
import Header from '../Header'

class Banner extends React.Component {
    render() {
        return (
            <div className="banner">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Header value={this.props.value}/>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary btn-md" data-toggle="modal" data-target="#invitationPopup" id="inviteButton">Invite</button>
                                    <button type="button" className="btn btn-danger btn-md"  data-toggle="modal" data-target="#confirmDeletePopup" id="leaveButton">Exit</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        );
    }
}

export default Banner;

