
import { ContainerScroll } from "./ui/container-scroll-animation";
import Web3Model from "./ui/web3-model";

const FeaturedShowcase = () => {
  return (
    <section className="flex flex-col overflow-hidden bg-black py-20 w-full max-w-[100vw]">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-2xl md:text-5xl font-semibold text-white mb-4">
              Exploring the Frontiers of <br />
              <span className="text-[clamp(2rem,10vw,6rem)] md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent block overflow-hidden text-ellipsis whitespace-nowrap">
                Intelligence & Web3
              </span>
            </h2>
          </>
        }
      >
        <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black object-cover object-left-top">
          <Web3Model />
        </div>
      </ContainerScroll>
    </section>
  );
};

export default FeaturedShowcase;
