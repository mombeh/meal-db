function Footer() {
    return (
        <div className="footer">
            <div className="nav">
                <img src="https://images.squarespace-cdn.com/content/v1/6792991879aa0a268e72bfbc/49c8b43b-5000-49a0-9c31-c7684ad3f7e4/Nadine%27s+Main+web+logo.png"
                    alt="" />
                <div className="logo">
                    <img src="/images/facebook.png" alt="" />
                    <img src="/images/instagram (1).png" alt="" style={{ height: '40px', width: '40px', marginTop: "98px" }} />
                    <img src="/images/linkedin (1).png" alt="" />
                    <img src="/images/twitter (1).png" alt="" style={{ height: '40px', width: '40px', marginTop: "98px" }} />
                </div>
            </div>

            <hr />
            <div className="foot">
                <nav>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </nav>
            </div>
        </div>
    )
}

export default Footer