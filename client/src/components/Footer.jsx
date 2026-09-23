import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'
        >

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'
            >

                {/* LEFT SECTION */}
                <div>

                    {/* Logo */}
                    <motion.img
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        src={assets.logo}
                        alt="logo"
                        className='h-8 md:h-9'
                    />

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className='max-w-80 mt-3'
                    >
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className='flex items-center gap-3 mt-6'
                    >

                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://www.facebook.com/share/1BQUsLTJRb/"
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img
                                src={assets.facebook_logo}
                                className='w-5 h-5'
                                alt="facebook_logo"
                            />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://www.instagram.com/deepanshu.26_?igsh=dDl0bWE0a3AycHU3"
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img
                                src={assets.instagram_logo}
                                className='w-5 h-5'
                                alt="instagram_logo"
                            />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href="mailto:deepanshudhakad381@gmail.com"
                        >
                            <img
                                src={assets.gmail_logo}
                                className='w-5 h-5'
                                alt="gmail_logo"
                            />
                        </motion.a>

                    </motion.div>
                </div>

                {/* RIGHT SECTION */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className='flex flex-wrap justify-between w-1/2 gap-8'
                >

                    {/* QUICK LINKS */}
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className='text-base font-medium text-gray-800 uppercase'>
                            QUICK LINKS
                        </h2>

                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Browse Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="#">About us</a></li>
                        </ul>
                    </motion.div>

                    {/* RESOURCES */}
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2 className='text-base font-medium text-gray-800 uppercase'>
                            Resources
                        </h2>

                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </motion.div>

                    {/* CONTACT */}
                    <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className='text-base font-medium text-gray-800 uppercase'>
                            Contact
                        </h2>

                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li>Jaipur</li>
                            <li>Rajasthan, India</li>

                            <li>
                                <a href="tel:+918000739606">
                                    +91 8000739606
                                </a>
                            </li>

                            <li>
                                <a href="mailto:deepanshudhakad381@gmail.com">
                                    deepanshudhakad381@gmail.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                </motion.div>

            </motion.div>

            {/* BOTTOM SECTION */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'
            >

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                >
                    © {new Date().getFullYear()} Deepanshu Dhakad. All rights reserved.
                </motion.p>

                <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className='flex items-center gap-4'
                >
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Cookies</a></li>
                </motion.ul>

            </motion.div>

        </motion.div>
    )
}

export default Footer