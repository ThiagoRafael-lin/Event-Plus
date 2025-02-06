import React from 'react';
import "./VisionSection.css"
import Title from '../Title/Title';

const VisionSection = () => {
    return (
        <section className='vision'>
        <div className='vision__box'>
            <Title
                titleText={"Visão"}
                color='white'
                additionalClass='vision__title'
            />
            <p className='vision__text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, excepturi. Vel, commodi deleniti placeat ex inventore molestiae! Laborum, ex repellat ipsa repellendus commodi numquam deserunt quaerat ipsum in, voluptate placeat.
                Maxime consectetur at magni soluta, deserunt asperiores quis cum repellat fugit explicabo doloribus cupiditate delectus itaque ab rem quidem quos rerum. In nemo sed laboriosam dolor repellendus excepturi eius. Corrupti.
            </p>
        </div>

        </section>
    );
};

export default VisionSection;