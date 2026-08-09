'use client'

import type { Business, Resource } from '@/types'

interface ResourcesClientProps {
  businesses: Business[]
  resources: Resource[]
}

export function ResourcesClient({ businesses, resources }: ResourcesClientProps) {
  return (
    <div className="w-full h-full">
      <div className="px-lg py-lg md:py-xl max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-md border-b border-white/5">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Enterprise Resources</h2>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">Access centralized documentation, brand assets, and technical repositories for the KeystoneOS ecosystem.</p>
        </div>

        <div className="flex items-center gap-sm w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input className="w-full bg-surface-container-low border border-white/10 text-on-surface text-body-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/50" placeholder="Search resources..." type="text" />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-body-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <span className="material-symbols-outlined text-sm">upload</span>
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>
      <div className="p-lg md:p-xl max-w-container-max mx-auto space-y-xl">

        <section>
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-primary">palette</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Brand Assets</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

            <div className="glass-panel rounded-xl p-md md:col-span-2 resource-card flex flex-col justify-between group cursor-pointer min-h-[200px]">
              <div className="flex justify-between items-start mb-md">
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full font-label-md text-label-sm border border-primary/30 w-max">OFFICIAL KIT</div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">download</span>
              </div>
              <div>
                <h4 className="font-headline-md text-[20px] text-on-surface font-semibold mb-1">Q3 2024 Brand Guidelines</h4>
                <p className="font-body-md text-on-surface-variant text-sm mb-4">Comprehensive guide including logo usage, typography hierarchy, and core color palettes. Includes Sketch and Figma libraries.</p>
                <div className="flex items-center gap-sm text-xs text-on-surface-variant/70 font-label-md">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">insert_drive_file</span> PDF, FIG</span>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
                  <span>•</span>
                  <span>45 MB</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-md resource-card flex flex-col justify-between group cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 mb-md group-hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-2xl text-on-surface">image</span>
              </div>
              <div>
                <h4 className="font-body-md text-on-surface font-semibold">High-Res Logos</h4>
                <p className="font-body-md text-on-surface-variant text-xs mt-1 mb-3">SVG and PNG formats for light/dark modes.</p>
                <div className="font-label-md text-[10px] text-on-surface-variant/50">12 FILES • ZIP</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-secondary">gavel</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Legal Documents</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-md py-3 border-b border-white/5 bg-white/[0.02] font-label-md text-label-sm text-on-surface-variant uppercase">
              <div className="col-span-6 md:col-span-5">Document Name</div>
              <div className="col-span-3 hidden md:block">Category</div>
              <div className="col-span-4 md:col-span-3">Last Modified</div>
              <div className="col-span-2 md:col-span-1 text-right">Size</div>
            </div>

            <a className="grid grid-cols-12 gap-4 px-md py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group" href="#">
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">description</span>
                <span className="font-body-md text-on-surface font-medium truncate">Master Service Agreement (MSA) - v3.1</span>
              </div>
              <div className="col-span-3 hidden md:block">
                <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant border border-white/10">Contracts</span>
              </div>
              <div className="col-span-4 md:col-span-3 font-body-md text-sm text-on-surface-variant">Oct 12, 2024</div>
              <div className="col-span-2 md:col-span-1 text-right font-label-md text-xs text-on-surface-variant/70">2.4 MB</div>
            </a>

            <a className="grid grid-cols-12 gap-4 px-md py-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center group" href="#">
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">verified_user</span>
                <span className="font-body-md text-on-surface font-medium truncate">Data Processing Addendum (DPA)</span>
              </div>
              <div className="col-span-3 hidden md:block">
                <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant border border-white/10">Compliance</span>
              </div>
              <div className="col-span-4 md:col-span-3 font-body-md text-sm text-on-surface-variant">Sep 28, 2024</div>
              <div className="col-span-2 md:col-span-1 text-right font-label-md text-xs text-on-surface-variant/70">1.1 MB</div>
            </a>

            <a className="grid grid-cols-12 gap-4 px-md py-4 hover:bg-white/5 transition-colors items-center group" href="#">
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">policy</span>
                <span className="font-body-md text-on-surface font-medium truncate">Employee Handbook 2024</span>
              </div>
              <div className="col-span-3 hidden md:block">
                <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant border border-white/10">Internal HR</span>
              </div>
              <div className="col-span-4 md:col-span-3 font-body-md text-sm text-on-surface-variant">Jan 15, 2024</div>
              <div className="col-span-2 md:col-span-1 text-right font-label-md text-xs text-on-surface-variant/70">5.6 MB</div>
            </a>
          </div>
        </section>

        <section className="pb-xl">
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-tertiary">code</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Tech Stack & APIs</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">

            <div className="glass-panel rounded-xl p-md resource-card cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-surface-container border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">api</span>
                </div>
                <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] font-label-md border border-green-500/20">STABLE</span>
              </div>
              <h4 className="font-body-md text-on-surface font-semibold text-lg mb-2">Core API v2 Documentation</h4>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">RESTful endpoints for integration with the KeystoneOS central database. Includes authentication flows.</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="font-label-md text-xs text-on-surface-variant/60">Swagger UI</span>
                <span className="material-symbols-outlined text-sm text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">arrow_forward</span>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-md resource-card cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-surface-container border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">terminal</span>
                </div>
                <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] font-label-md border border-blue-500/20">BETA</span>
              </div>
              <h4 className="font-body-md text-on-surface font-semibold text-lg mb-2">CLI Tooling</h4>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">Command-line interface for managing deployments and automated scripting within the environment.</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="font-label-md text-xs text-on-surface-variant/60">NPM Package</span>
                <span className="material-symbols-outlined text-sm text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
