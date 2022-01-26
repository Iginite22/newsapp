import React from 'react';
const NewsItem = (props)=>{
      let {title,description,imageUrl,newsUrl,author,time}=props;
    return (
      <div>
        <div className="card" style={{width: "18rem",borderRadius:"10px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
          <img style={{borderRadius:"10px",width:"98%",height:"150px",marginLeft:"3px",marginTop:"3px"}} src={!imageUrl?"https://www.techexplorist.com/wp-content/uploads/2022/01/Young-stellar-jet-MHO-2147.jpeg":imageUrl} alt="..."/>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            99+
            <span className="visually-hidden">unread messages</span>
          </span>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...
            </p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}
export default NewsItem