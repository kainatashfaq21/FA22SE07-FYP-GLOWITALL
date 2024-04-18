import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {FiInstagram} from 'react-icons/fi';
import {SiFacebook} from 'react-icons/si';
import {ImWhatsapp} from 'react-icons/im';
 


const AboutUs = () => {

  return (
    <>
      <Meta title={"About Us"} />
      <BreadCrumb title="About Us" />

      <Container class1="store-wrapper home-wrapper-2 py-3">
          <div className="row">
            <div className="col-12">
            <div className="mb-2">
              <img style={{"width":"100%"}} src="https://cdn.shopify.com/s/files/1/0619/8948/6798/files/her-story-banner.jpg?v=1675933642&width=1500" alt="Face"/>
            </div>
            </div>
            
            <div className="col-12 py-4"> 
            <h3 style={{"fontSize":"32px","textAlign":"center"}}> Welcome to <span style={{"color":"#f8b8af"}}>GLOWITALL </span></h3>
            </div>
            
      </div>
    <div className="container">
       <div className="row">
       <div className="col-12"> 
    <div>
      <h3> OUR VALUES</h3>
      <p>Welcome to GLOWITALL, your ultimate destination for all things skincare and makeup. We are passionate about helping you achieve your beauty goals while providing top-notch products, expert advice, and a delightful shopping experience. Here at GLOWITALL, we believe that beauty is for everyone, and we strive to empower individuals to feel confident and express their unique selves through skincare and makeup.</p>
    </div>
    <div>
      <h3> OUR MISSION</h3>
      <p>At GLOWITALL, our mission is to revolutionize the way you approach skincare and makeup. We are dedicated to delivering high-quality products that are not only effective but also safe for your skin. We understand that every individual has unique needs, and our goal is to offer a diverse range of products that cater to different skin types, tones, and concerns. Whether you're a skincare enthusiast, a makeup lover, or a beauty beginner, we aim to be your trusted companion on your beauty journey.</p>
      <br/>
      <br/>
      <p>Thank you for choosing GLOWITALL as your beauty destination. We are excited to embark on this beauty journey with you and help you unleash your inner glow. Discover our curated collection, explore our resources, and let us be your trusted companion in your pursuit of beauty and self-care.</p>
      <h4>Your Beauty, Our Passion.</h4>
    </div>
   
   
    
    </div>
        </div>
    </div>
    <div className="py-2" style={{"backgroundColor":"#f8b8af","width":"100%","height":"200px"}}>
    <p style={{"textAlign":"center","fontSize":"30px","color":"white"}}>JOIN US IN </p>
    <h2 style={{"textAlign":"center","fontSize":"30px","color":"white"}}>celebrating YOU</h2>
    <p style={{"textAlign":"center","fontSize":"30px","color":"white"}}>Say Hello to Better Ingredients, Better Representation, Better Feel</p>
    </div>
    <div className='connect-us'>
      <h4> LET'S CONNECT ON SOCIAL MEDIA</h4>
      <div className='social-icons gap-30'>
                    <a href='https://www.facebook.com/profile.php?id=100094534204093&mibextid=ZbWKwL'> 
                      <SiFacebook className='fs-4' style={{ color: 'black' }}/>
                    </a>
                    <a href='https://chat.whatsapp.com/Bjo6Fuhajx9A8qjxTIlzKo'>
                      <ImWhatsapp className='fs-4' style={{ color: 'black' }}/>
                    </a>
                    <a href='https://instagram.com/glo_witall?igshid=MzNlNGNkZWQ4Mg=='>
                      <FiInstagram className='fs-4' style={{ color: 'black' }} />
                    </a>
                   </div>
              </div>
   
  </Container>
    </>
  );
};

export default AboutUs;
