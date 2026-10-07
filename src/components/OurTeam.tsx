// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { fadeInUp, staggerContainer, card3D } from "@/lib/motion";

// const teamMembers = [
//   {
//     name: "Marley Gouse",
//     role: "Lead Designer",
//     image: "/ourteam/team1.png",
//     background: "#FBA315",
//     accent: "#F1A313",
//   },
//   {
//     name: "Marley Gouse",
//     role: "Lead Designer",
//     image: "/ourteam/team2.png",
//     background: "#64A7C8",
//     accent: "#168AF4",
//   },
//   {
//     name: "Marley Gouse",
//     role: "Lead Designer",
//     image: "/ourteam/team3.png",
//     background: "#73C690",
//     accent: "#73C690",
//   },
//   {
//     name: "Marley Gouse",
//     role: "Lead Designer",
//     image: "/ourteam/team4.png",
//     background: "#C5C2D4",
//     accent: "#168AF4",
//   },
// ];

// export default function OurTeam() {
//   return (
//     <section className="flex min-h-[100svh] items-center bg-white px-5 py-14 text-[#172D56] sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-16 overflow-hidden">
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         variants={staggerContainer}
//         className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 lg:gap-[40px]"
//       >
//         <div className="flex w-full max-w-[1212px] flex-col items-center text-center">
//           <motion.p
//             variants={fadeInUp}
//             className="text-[18px] font-normal leading-[63px] tracking-[0.1em] text-[#172D56]"
//           >
//             Experts
//           </motion.p>
//           <motion.h2
//             variants={fadeInUp}
//             className="-mt-3 text-[30px] font-bold uppercase leading-[1.1475] tracking-[-0.02em] text-[#172D56] sm:text-[34px] lg:text-[40px] lg:leading-[45.9px]"
//           >
//             MEAT OUR TEAM
//           </motion.h2>
//           <motion.p
//             variants={fadeInUp}
//             className="mt-5 max-w-[1212px] text-[16px] font-normal leading-[24px] tracking-[0] text-[#172D56]"
//           >
//             Devsinn Technologies, your gateway to cutting-edge IT services for
//             businesses and brands. We are your strategic partner in navigating the
//             ever-evolving digital landscape. With a relentless commitment to
//             innovation and excellence, we provide tailored IT solutions that empower
//             your organization to thrive in the modern world.
//           </motion.p>

//           <motion.div variants={fadeInUp}>
//             <Link
//               href="#"
//               className="mt-10 inline-flex h-[53px] items-center justify-center rounded-[64px] bg-[#172D56] px-[42px] py-[20px] text-[16px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] sm:min-w-[199px]"
//             >
//               Our Services
//             </Link>
//           </motion.div>
//         </div>

//         <motion.div
//           variants={staggerContainer}
//           className="grid w-full justify-center gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5"
//           style={{ perspective: "1500px" }}
//         >
//           {teamMembers.map((member, index) => (
//             <motion.article
//               key={`${member.name}-${index}`}
//               variants={card3D}
//               whileHover="hover"
//               className="relative mx-auto flex h-[395px] w-full max-w-[301px] items-end overflow-hidden rounded-[24px] border border-transparent transition-all duration-300 hover:border-[#8ecbff] hover:shadow-[0_22px_44px_rgba(18,45,86,0.18)] sm:h-[410px] lg:h-[430px]"
//               style={{ backgroundColor: member.background }}
//             >
//               <div
//                 className="absolute inset-0 opacity-100"
//                 style={{
//                   background:
//                     "radial-gradient(circle at 50% 22%, rgba(255,255,255,0.22), rgba(255,255,255,0) 36%)",
//                 }}
//               />

//               <div
//                 className="absolute left-1/2 top-[32px] h-[321px] w-[241px] -translate-x-1/2 overflow-hidden rounded-[8px]"
//                 style={{
//                   backgroundColor: member.background,
//                 }}
//               >
//                 <Image
//                   src={member.image}
//                   alt={member.name}
//                   fill
//                   sizes="(max-width: 639px) 241px, (max-width: 1279px) 241px, 241px"
//                   className="object-contain object-bottom transition-transform duration-300 hover:scale-105"
//                 />
//               </div>

//               <div className="relative z-10 mx-auto mb-0 w-[260px] rounded-t-[14px] bg-white px-4 pb-[11px] pt-[12px] text-center shadow-[0_0_0_1px_rgba(23,45,86,0.02)]">
//                 <h3 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#172D56]">
//                   {member.name}
//                 </h3>
//                 <p className="mt-[6px] text-[16px] font-normal leading-[24px] tracking-[0] text-[#172D56]">
//                   {member.role}
//                 </p>
//               </div>
//             </motion.article>
//           ))}
//         </motion.div>

//         <motion.div
//           variants={fadeInUp}
//           className="flex items-center justify-center gap-[10px]"
//         >
//           <button
//             type="button"
//             aria-label="Previous team member"
//             className="flex h-[56px] w-[56px] items-center justify-center rounded-lg border border-[#98A4BA] text-[#7E8BA8] transition-colors duration-200 hover:border-[#172D56] hover:text-[#172D56]"
//           >
//             <svg
//               width="27"
//               height="18"
//               viewBox="0 0 27 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               aria-hidden="true"
//             >
//               <path
//                 d="M26 9H2M9 1L1 9L9 17"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>

//           <button
//             type="button"
//             aria-label="Next team member"
//             className="flex h-[56px] w-[56px] items-center justify-center rounded-lg border border-[#172D56] text-[#172D56] transition-transform duration-200 hover:scale-[1.03]"
//           >
//             <svg
//               width="27"
//               height="18"
//               viewBox="0 0 27 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               aria-hidden="true"
//             >
//               <path
//                 d="M1 9H25M18 1L26 9L18 17"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

