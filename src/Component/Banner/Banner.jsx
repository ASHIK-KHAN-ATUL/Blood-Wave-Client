import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import banner3 from '../../assets/banner3.png'
import banner4 from '../../assets/banner4.png'

const Banner = () => {
    return (
        <div className="">
            <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={true}
                showStatus={false}
                interval={4000}
            >
                <div>
                    <img src={banner3} className="  lg:max-h-[550px] object-cover  "  alt="Banner 2" />
                </div>
                <div>
                    <img src={banner4} className="  lg:max-h-[550px] object-cover    "  alt="Banner 2" />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;