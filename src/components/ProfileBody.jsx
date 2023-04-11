const ProfileBody = () => {
    return (
        <div className="container myCont py-3">
            <div className="container profile shadow-lg">
                <img className="profile-image" src="logo192.png" />

                <nav className="profile-links">
                    <i class="bi bi-github myIcon"></i><a className="profile-link-item">@santhossunthar</a>
                    <i class="bi bi-twitter myIcon"></i><a className="profile-link-item">santhossunthar</a>
                    <i class="bi bi-linkedin myIcon"></i><a className="profile-link-item">santhossunthar</a>
                </nav>
            </div>
        </div>
    )
}

export default ProfileBody
