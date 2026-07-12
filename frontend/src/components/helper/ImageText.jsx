import React from 'react'
import { Link } from 'react-router-dom';

const ImageText = () => {
    return (
        <section
            className="px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between"
            style={{ borderTop: '1px solid #d5c9bc' }}
        >
            <div className="leading-tight">
                <p className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#0d0b08' }}>
                    <span className="font-black">EVERY</span>{" "}
                    <span className="font-light" style={{ color: '#B8935A' }}>MOMENT.</span>
                </p>
                <p className="text-4xl md:text-5xl font-black tracking-tight mt-1" style={{ color: '#0d0b08' }}>
                    <span className="font-black">EVERY</span>{" "}
                    <span className="font-light" style={{ color: '#B8935A' }}>MEMORY.</span>
                </p>
            </div>
            <Link
                to="/contact"
                className="  font-jost text-[0.82rem] lg:text-[0.88rem] uppercase tracking-wide
              text-[#2c2420] border border-[#2c2420]
              px-3 lg:px-5 py-2 lg:py-2.5
              no-underline transition-all duration-200
              hover:bg-[#2c2420] hover:text-white
              whitespace-nowrap"
                style={{ border: '1px solid #2c2420', color: '#2c2420' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2c2420'; e.currentTarget.style.color = '#f7f3ee'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2c2420'; }}
            >
                Get In Touch           
                </Link>
        </section>

    )
}

export default ImageText

