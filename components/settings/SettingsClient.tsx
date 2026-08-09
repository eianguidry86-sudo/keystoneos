'use client'

import type { Business } from '@/types'

interface SettingsClientProps {
  businesses: Business[]
}

export function SettingsClient({ businesses }: SettingsClientProps) {
  return (
    <div className="p-4 md:p-lg lg:p-xl flex flex-col gap-lg min-h-full">
      <header className="hidden md:flex justify-between items-center mb-md">
        <h1 className="font-display-lg text-display-lg text-on-surface">Settings</h1>
        <div className="flex gap-sm">
          <button className="bg-surface-variant text-on-surface px-md py-sm rounded-lg border border-white/5 hover:bg-white/10 transition-colors">Discard</button>
          <button className="bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-semibold hover:opacity-90 transition-opacity" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>Save Changes</button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-lg">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-xs overflow-x-auto lg:overflow-visible pb-sm lg:pb-0">
            <a className="px-md py-sm rounded-lg bg-white/5 text-primary font-semibold flex items-center gap-sm whitespace-nowrap" href="#">
              <span className="material-symbols-outlined">person</span> Profile
            </a>
            <a className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors flex items-center gap-sm whitespace-nowrap" href="#">
              <span className="material-symbols-outlined">security</span> Security
            </a>
            <a className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors flex items-center gap-sm whitespace-nowrap" href="#">
              <span className="material-symbols-outlined">payments</span> Billing
            </a>
            <a className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors flex items-center gap-sm whitespace-nowrap" href="#">
              <span className="material-symbols-outlined">extension</span> Integrations
            </a>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col gap-lg">
          <section className="glass-panel rounded-xl p-lg flex flex-col gap-md glass-panel-focus">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-white/5 pb-sm">Public Profile</h2>
            <div className="flex items-center gap-lg py-sm">
              <div className="relative w-20 h-20 rounded-full bg-surface-variant border-2 border-primary overflow-hidden flex-shrink-0">
                <img alt="Profile Avatar" className="w-full h-full object-cover" data-alt="Large user avatar for KeystoneOS with an indigo background and white initials." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8-yTRn9mA1M-mMjp3bve_CXVUZs0HO9SDgh2sgoNAEQdzIkjw3wLURUVUWyngSdxVBj5MrKAkkHlsIke2FdV-gy1yE94lnOb0ynaMEojldDd8glOmABl5LfS3rcRKldO2ehrOG0IK1w2vGLuy-qzaRKxiFu6w_3J0qzbDIASKDl3Oa0o693_R_gsI4WlCx7HmXhZOl4-tY2wT3JzjgGVX_zffsH-DTOjvGnlDZbEKNp5Qvq9BkHKc" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
              </div>
              <div className="flex flex-col gap-sm">
                <button className="bg-surface-variant text-on-surface px-md py-xs rounded-lg border border-white/10 hover:border-primary transition-colors text-sm">Change Avatar</button>
                <span className="text-xs text-on-surface-variant">JPG, GIF or PNG. Max size of 800K</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">First Name</label>
                <input className="w-full bg-surface-container-low border border-white/5 rounded-lg px-md py-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" type="text" defaultValue="Keystone" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Name</label>
                <input className="w-full bg-surface-container-low border border-white/5 rounded-lg px-md py-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" type="text" defaultValue="Admin" />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email Address</label>
                <input className="w-full bg-surface-container-low border border-white/5 rounded-lg px-md py-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" type="email" defaultValue="admin@keystoneos.dev" />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Bio</label>
                <textarea className="w-full bg-surface-container-low border border-white/5 rounded-lg px-md py-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" rows={3} defaultValue="Enterprise system administrator overseeing global deployments." />
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl p-lg flex flex-col gap-md glass-panel-focus">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-white/5 pb-sm">Preferences</h2>
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex flex-col">
                  <span className="font-body-lg text-body-lg text-on-surface">Email Notifications</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">Receive daily summary emails.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10 translate-x-6 border-primary-container" id="toggle1" name="toggle" type="checkbox" />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-container cursor-pointer" htmlFor="toggle1"></label>
                </div>
              </div>

              <div className="flex items-center justify-between p-sm hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex flex-col">
                  <span className="font-body-lg text-body-lg text-on-surface">Two-Factor Authentication</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">Require 2FA for all sign-ins.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-surface-variant border-4 border-surface-container-low appearance-none cursor-pointer transition-transform duration-200 ease-in-out z-10" id="toggle2" name="toggle" type="checkbox" />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-low border border-white/10 cursor-pointer" htmlFor="toggle2"></label>
                </div>
              </div>

              <div className="flex flex-col gap-xs mt-sm p-sm">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Timezone</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border border-white/5 rounded-lg px-md py-sm text-on-surface appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) London</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-panel rounded-xl p-lg flex flex-col gap-md border-error/20 bg-error-container/5">
            <h2 className="font-headline-md text-headline-md text-error border-b border-error/10 pb-sm">Danger Zone</h2>
            <div className="flex items-center justify-between mt-sm">
              <div className="flex flex-col">
                <span className="font-body-lg text-body-lg text-on-surface">Delete Account</span>
                <span className="font-body-md text-body-md text-on-surface-variant">Permanently remove your account and all data.</span>
              </div>
              <button className="px-md py-sm rounded-lg border border-error/50 text-error hover:bg-error/10 transition-colors font-semibold">Delete Account</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
