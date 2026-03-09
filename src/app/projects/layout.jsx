"use client";

import { LayoutGroup } from "framer-motion";

export default function ProjectsLayout({ children }) {
  return <LayoutGroup id="projects">{children}</LayoutGroup>;
}

// {/* ✅ FIXED INFO LAYER */}
//     <div className="fixed inset-0 z-50 pointer-events-none">
//       <div className="flex justify-between items-end h-screen  pt-20">
//         <div className="w-screen h-fit flex flex-col md:flex-row justify-between items-start bg-black/0 md:px-16 px-4 py-6 relative max-md:gap-4">
//           {/* BLUR GRADIENT LAYER */}
//           <div
//             className="absolute inset-0 backdrop-blur-xl bg-black
//                 [mask:linear-gradient(to_top,black,transparent)]
//                 [-webkit-mask-image:linear-gradient(to_top,black,transparent)]
//                 pointer-events-none -z-10"
//           />
//           {/* LEFT */}
//           <div className="flex flex-col justify-end max-w-xs">
//             <div>
//               <h1 className="text-xl md:text-2xl mb-2">{project.name}</h1>
//               <p className="text-sm text-white/60">{project.category}</p>
//             </div>

//             <div className="text-sm text-white/50">
//               Tags / description (max 2 lines)
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="flex flex-col justify-end md:text-right max-w-xs gap-2">
//             <div className="">
//               <p className="text-sm text-white/60">Director</p>
//               <h2 className="text-lg">{project.director}</h2>
//             </div>

//             <div className="">
//               <p className="text-sm text-white/60">Director</p>
//               <h2 className="text-lg">{project.director}</h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//      <div className="w-[90%] md:w-[75%] flex items-center mx-auto py-24 relative">
//         <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 opacity-50">
//           [replace with project video later]
//         </p>
//         <video
//           src="/videos/Apple-Security.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//           alt=""
//           className="w-full h-auto aspect-video object-cover"
//         />
//       </div>
