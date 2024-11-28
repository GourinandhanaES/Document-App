import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/docs'); 
    };

    return (
      <div className="landing-page">
            <div className="left-section">
                <img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/32/39/c8/3239c895-8e43-b309-8a74-88bce17ec799/AppIcon-0-1x-5-85-220.png/1200x600wa.png"
                    alt="Landing Background"
                    className="background-image"
                />
            </div>
            <div className="right-section">
                <div className="content">
                    <h1 className="title animate__animated animate__fadeInRight">
                        Welcome to <span className="highlight"> DocuFlow</span>
                    </h1>
                    <p className="subtitle animate__animated animate__fadeInRight animate__delay-1s">
                    Elevate Your Document Management Experience <br />
                     Stay Organized, Stay Focused, and Stay Ahead!
                    </p>
                    <button
                        className="get-started-btn animate__animated animate__bounceInUp animate__delay-2s"
                        onClick={handleGetStarted}
                    >
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
