import React from 'react'
import LightRays from '../Utils/LightRays'
import Footer from '../components/Footer'
import Features from '../components/Features'
import Landing_Hero from '../components/Landing_Hero'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();

    const handleTryNow = () => {
        const isLoggedIn = localStorage.getItem("token"); // Example check
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/dashboard");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
            {/* Rays Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 pointer-events-auto">
                <Landing_Hero onTryNow={handleTryNow} />
                <Features />
                <Footer />
            </div>
        </div>

    )
}

export default LandingPage
