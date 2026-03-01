import { projects } from "@/app/constants/data";
import PageTransition from "@/components/PageTransition";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-black text-white">
      <ScrollToTopOnMount />
      {/* ✅ FIXED INFO LAYER */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="flex justify-between items-end h-screen  pt-20">
          <div className="w-screen h-fit flex flex-col md:flex-row justify-between items-start bg-black/0 px-6 md:px-16 p-4 relative max-md:gap-4">
            {/* BLUR GRADIENT LAYER */}
            <div
              className="absolute inset-0 backdrop-blur-lg bg-black/50 
                  [mask:linear-gradient(to_top,black,transparent)] 
                  [-webkit-mask-image:linear-gradient(to_top,black,transparent)]
                  pointer-events-none -z-10"
            />
            {/* LEFT */}
            <div className="flex flex-col justify-end max-w-xs">
              <div>
                <h1 className="text-xl md:text-2xl mb-4">{project.name}</h1>
                <p className="text-sm text-white/60">{project.category}</p>
              </div>

              <div className="text-sm text-white/50">
                Tags / description (max 2 lines)
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-end md:text-right max-w-xs gap-2">
              <div className="">
                <p className="text-sm text-white/60">Director</p>
                <h2 className="text-lg">{project.director}</h2>
              </div>

              <div className="">
                <p className="text-sm text-white/60">Director</p>
                <h2 className="text-lg">{project.director}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageTransition>
        {/* ✅ SCROLLING IMAGES */}
        <div className="w-[90%] md:w-[75%] flex items-center mx-auto py-24 relative">
          <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
            [replace with video later]
          </p>
          <img
            src="/apple-security/1.jpg"
            alt=""
            className="w-full h-auto aspect-video object-cover"
          />
        </div>
        {/* v1 - personal */}
        <div className="flex flex-col items-center gap-10 py-10 md:pb-40 pb-80">
          {project.images?.map((img, i) => (
            <div key={i} className="w-[90%] md:w-[65%]">
              <img
                src={img}
                alt=""
                className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        {/* v2 */}

        {/* <div className="flex flex-col">
          {project.images?.map((img, i) => (
            <div key={i} className="h-[150vh] flex items-center justify-center">
              <div className="sticky top-1/2 -translate-y-1/2 w-[90%] md:w-[65%] border border-white/20">
                <img src={img} alt="" className="w-full h-auto object-cover" />
              </div>
            </div>
          ))}
        </div> */}
      </PageTransition>
    </div>
  );
}
