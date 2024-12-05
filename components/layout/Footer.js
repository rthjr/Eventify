import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="flex flex-col items-center py-6 bg-gray-100 w-full h-full">
            <div className="flex flex-col md:flex-row flex-wrap justify-between w-10/12 text-center md:text-left">
                {/* Logo Section */}
                <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0 w-full md:w-auto">
                    <Image
                        src="/assets/logo/eventifyLogo.png"
                        alt="Eventify logo"
                        width={120}
                        height={50}
                    />
                </div>

                {/* Contact Us Section */}
                <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
                    <h2 className="text-lg font-semibold">Contact Us</h2>
                    <Link href="https://www.facebook.com" aria-label="Visit Facebook">
                        Facebook
                    </Link>
                    <Link href="https://www.twitter.com" aria-label="Visit Twitter">
                        Twitter
                    </Link>
                    <Link href="https://www.instagram.com" aria-label="Visit Instagram">
                        Instagram
                    </Link>
                    <Link href="https://www.linkedin.com" aria-label="Visit LinkedIn">
                        LinkedIn
                    </Link>
                </div>

                {/* Explore Section */}
                <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
                    <h2 className="text-lg font-semibold">Explore</h2>
                    <Link href="/about" aria-label="About Us">
                        About Us
                    </Link>
                    <Link href="/events" aria-label="Browse Events">
                        Events
                    </Link>
                    <Link href="/contact" aria-label="Contact Us">
                        Contact Us
                    </Link>
                </div>

                {/* Legal Section */}
                <div className="flex flex-col mb-4 md:mb-0 w-full md:w-auto">
                    <h2 className="text-lg font-semibold">Legal</h2>
                    <Link href="/privacy" aria-label="Privacy Policy">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" aria-label="Terms of Service">
                        Terms of Service
                    </Link>
                </div>
            </div>
            <p className="text-center text-gray-500 mt-6">© 2024 Eventify.</p>
        </footer>
    );
};

export default Footer;
