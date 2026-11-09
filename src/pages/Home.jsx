import AllProducts from '../components/AllProducts'
import BigFeaturedSlider from '../components/BigFeaturedSlider'
import Feature from '../components/Feature'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import TrustedByCertifications from '../components/TrustedByCertifications'

const Home = () => {
  return (
    <div>
     <Hero/>
     <Feature/>
     <BigFeaturedSlider/>
     <AllProducts/>
     <TrustedByCertifications/>

     <Footer/>
    </div>
  )
}

export default Home
