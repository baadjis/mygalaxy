import React from 'react'
export default class Asidenav extends React.Component {
    render() {
        return (
            <div id="asidenav" className="asidenav">
                <div id="userprofile" className="useravatar">
                    <div className="useravatarimage"></div>
                    <h3>{this.props.currentUser}</h3>
                </div>
                <div id="editprofile" className="editprofile">
                    <span><i class="fa fa-edit" title="edit profile"></i></span>
                </div>
                <div id="asidenavlist" className="asidenavlist">
                    <div><a href="#"><i class="fa fa-calendar" aria-hidden="true" title="Events"></i>Events</a></div>
                    <div><a href="#">Accounts</a></div>
                    <div><a href="#">Settings</a></div>
                    <div><a href="#">
                        <i class="fa fa-users" title="groups"></i>Groups
                    </a>
                    </div>
                    <div><a href="#"><i class="fa fa-shopping-cart"></i>Marketplace</a></div>
                    <div>
                        <a href="#" onClick={this.props.renderDatastorage}>
                            <i class="fa fa-upload"></i>Data-storage
                    </a>
                    </div>
                    <div><a href="#">Dashbord</a></div>

                    <div>
                        <a href="#">Payement chanels</a>
                    </div>
                </div>

            </div>
        )

    }
}