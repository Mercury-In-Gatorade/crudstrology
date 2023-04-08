import React from 'react';
import { motion } from 'framer-motion';

const loadingContainer = {
  //   width: '4rem',
  //height: '20rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '3rem',
};
const loadingCircle = {
  display: 'block',
  width: '5rem',
  height: '5rem',
  backgroundColor: '#3A36DB',
  borderRadius: '50%',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};
const loadingCircleTransition = {
  duration: 0.6,
  repeat: Infinity,
  repeatType: 'yoyo',
  ease: 'easeInOut',
};

const Loader = () => {
  return (
    <div>
      <div className='fixed  w-full min-h-screen z-50 bg-black opacity-30' />
      <div className='flex fixed w-full justify-center items-center h-screen'>
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial='start'
          animate='end'
        >
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
