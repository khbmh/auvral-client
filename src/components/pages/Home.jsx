import Faq from '../pageComp/Home/Faq';
import Hero from '../pageComp/Home/Hero';
import Review from '../pageComp/Home/Review';
import Newsletter from '../pageComp/Home/Newsletter';
import Art from '../pageComp/Home/Art';
function Home() {
  return (
    <>
      <Hero />
      <Art />
      <Review />
      <Faq />
      <Newsletter />
    </>
  );
}

export default Home;
