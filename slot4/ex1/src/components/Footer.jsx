import React from 'react';

function Footer({myProfile = { 
  name: "Default User", 
  email: "user@example.com", 
  avatar: "/images/avt.jpg" 
}}) {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        <img 
          src={myProfile.avatar} 
          alt="Avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50';
          }}
        />
        <h5>{myProfile.name}</h5>
        <p>{myProfile.email}</p>
      </div>
    </footer>
  );
}

export default Footer;