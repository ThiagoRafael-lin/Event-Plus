import React from 'react';
import "./ImageIllustrator.css"
import imageDefault from "../../Assets/images/default-image.jpeg"

const ImageIllustrator = ( { alterText, imageRender = imageDefault, additionalClass = ""} ) => {
    return (
            
            <figure className='illustrator-box'>
                <img 
                    src={imageRender}
                    alt={alterText}
                    className={`illustrator-box-image ${additionalClass}`}
                />
            </figure>
        
    );
};

export default ImageIllustrator; 