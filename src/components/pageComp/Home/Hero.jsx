function Hero() {
  return (
    <div className="-mt-[10vh]">
      <div className="carousel w-full h-screen">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="absolute h-full w-full text-center left-[50%] top-[50%] bg-black/50 -translate-x-[50%] -translate-y-[50%]"></div>
          <div className="absolute text-center left-[50%] top-[50%] text-white -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-3xl lg:text-5xl font-black">
              Antikythera Mechanism
            </h1>
            <p className="font-semibold max-w-md mt-8">
              The Antikythera Mechanism is an ancient Greek analog computer used
              for astronomical predictions, discovered in a shipwreck
            </p>
          </div>
          <img
            src="https://www.researchgate.net/publication/335802437/figure/fig1/AS:802842411532288@1568423955413/The-main-fragments-of-the-Antikythera-Mechanism-as-displayed-at-the-National.ppm"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="absolute h-full w-full text-center left-[50%] top-[50%] bg-black/50 -translate-x-[50%] -translate-y-[50%]"></div>
          <div className="absolute text-center left-[50%] top-[50%] text-white -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-3xl lg:text-5xl font-black">
              Lindisfarne Gospels
            </h1>
            <p className="font-semibold max-w-md mt-8">
              The Lindisfarne Gospels is an illuminated manuscript from
              8th-century England, blending Christian art with Celtic and
              Anglo-Saxon influences.
            </p>
          </div>
          <img
            src="https://digital.collections.slsa.sa.gov.au/assets/display/12131-max?u=35ce736adeaa0a635fef8f1206177b97"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="absolute h-full w-full text-center left-[50%] top-[50%] bg-black/50 -translate-x-[50%] -translate-y-[50%]"></div>
          <div className="absolute text-center left-[50%] top-[50%] text-white -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-3xl lg:text-5xl font-black">
              The Codex Sinaiticus
            </h1>
            <p className="font-semibold max-w-md mt-8">
              The Codex Sinaiticus is a 4th-century manuscript of the Christian
              Bible, one of the oldest and most complete
            </p>
          </div>
          <img
            src="https://allenvandermeulen.org/wp-content/uploads/2016/02/codex-sinaiticus-st-catherines.jpg"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div className="absolute h-full w-full text-center left-[50%] top-[50%] bg-black/50 -translate-x-[50%] -translate-y-[50%]"></div>
          <div className="absolute text-center left-[50%] top-[50%] text-white -translate-x-[50%] -translate-y-[50%]">
            <h1 className="text-3xl lg:text-5xl font-black">
              The Elgin Marbles
            </h1>
            <p className="font-semibold max-w-md mt-8">
              The Elgin Marbles are ancient Greek sculptures from the Parthenon,
              originally taken to Britain in the early 19th century
            </p>
          </div>
          <img
            src="https://www.historyhit.com/app/uploads/2021/11/elgin-marbles.jpg"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
