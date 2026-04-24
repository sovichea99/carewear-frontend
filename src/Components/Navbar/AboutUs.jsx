import Footer from '../Home/Footer'
import { motion } from 'framer-motion'
import Aboutusimg from '../../assets/2751001.jpg'
import { FadeLeft, FadeRight } from '../../ultility/animation'
import mission from "../../assets/Mission.png";

const AboutUs = () => {
  return (
    <> 
      <div className="flex flex-col items-center max-w-screen-xl mt-10 mx-auto px-4 py-8">
        <div className="sm:flex items-center w-full mb-8">
          <motion.div
            variants={FadeRight(0.6)}
            initial="hidden"
            animate="visible"
            className="sm:w-1/2 flex justify-center p-6"
          >
            <img src={Aboutusimg} className="lg:w-[500px] w-full max-w-md" alt="About Us" />
          </motion.div>
          <div className="sm:w-1/2 p-5 flex justify-center sm:justify-start text-center sm:text-left">
            <motion.div
              variants={FadeLeft(0.5)}
              initial="hidden"
              animate="visible"
              className="max-w-lg"
            >
              <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                <span className="text-pink-600">About</span> <span className="text-purple-800">Our Company</span>
              </h2>
              <motion.p
                variants={FadeLeft(0.6)}
                initial="hidden"
                animate="visible"
                className="text-gray-700"
              >
                Welcome to Care Wear! Founded with healthcare professionals in mind, we began with a simple yet powerful mission: to create medical scrubs that truly understand and support the demanding work you do every day. Our journey started when we saw the need for scrubs that blend professional functionality with modern comfort and style. What began as a passion project has grown into a trusted brand, providing healthcare heroes across the country with uniforms that work as hard as they do.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="sm:flex items-center w-full mb-8">
          <div className="sm:w-1/2 p-5 flex justify-center sm:justify-start text-center sm:text-left">
            <motion.div
              variants={FadeRight(0.5)}
              initial="hidden"
              animate="visible"
              className="max-w-lg"
            >
              <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                <span className="text-pink-600">Our</span> <span className="text-purple-800">Mission</span>
              </h2>
              <motion.p
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-gray-700"
              >
                At Care Wear, we believe your uniform should be more than just clothing—it should be your reliable partner through long shifts and critical moments. Our mission is to design medical scrubs that combine exceptional comfort, durable quality, and professional style, all while maintaining accessibility for healthcare workers. We`re committed to creating garments that move with you, support your work, and help you feel confident and comfortable while you provide exceptional patient care.
              </motion.p>
            </motion.div>
          </div>
          <motion.div
            variants={FadeLeft(0.6)}
            initial="hidden"
            animate="visible"
            className="sm:w-1/2 flex justify-center p-6"
          >
            <img src={mission} className="lg:w-[500px] w-full max-w-md" alt="Mission" />
          </motion.div>
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </>
  )
}

export default AboutUs;
