function Logo(){
    return(
        <div>
            <a href='/'>
                <img
                style={{maxWidth: "174px",
                        maxHeight: "174px",
                        margin: "30px auto",
                        backgroundColor:"transparent"}}
                src="/motocross.png"
                alt="logo not found"/>
            </a>
            <h2>MX-DashBoard</h2>
        </div>
    );
}

export default Logo;