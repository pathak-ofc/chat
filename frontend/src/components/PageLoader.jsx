import { LoaderIcon } from "lucide-react";
function PageLoader() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02030a] text-white">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,30,60,0.35),transparent_35%),linear-gradient(to_bottom_right,#02030a,#040816,#02030a)]" />

      {/* Ambient color wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.10),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_40%)]" />

      {/* Soft big blobs */}
      <div className="absolute -left-40 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="absolute right-[-8rem] top-[25%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-[-10rem] left-[30%] h-[20rem] w-[20rem] rounded-full bg-blue-500/10 blur-[120px]" />


      {/* Mesh grid */}
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.72)_100%)]" />
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="size-10 animate-spin" />
      </div>
    </div>
  );
}
export default PageLoader;