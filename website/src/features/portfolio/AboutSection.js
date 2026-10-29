
import React from 'react';
import { motion } from 'framer-motion';
import { skills, about } from '../../data/about';
import { sectionContainerVariants as containerVariants, sectionItemVariants as itemVariants } from '../../animations/portfolioVariants';

const contacts = [
  {
    label: 'EMAIL',
    value: 'yousunny3@gmail.com',
    href: 'mailto:yousunny3@gmail.com',
    icon: '@',
  },
  {
    label: 'GITHUB',
    value: 'sunnyyou3',
    href: 'https://github.com/sunnyyou3',
    icon: 'GH',
  },
  {
    label: 'LINKEDIN',
    value: 'yousunny',
    href: 'https://linkedin.com/in/yousunny',
    icon: 'in',
  },
  {
    label: 'US PHONE',
    value: '+1 (732) 875-8588',
    href: 'tel:+17328758588',
    icon: '↗',
  },
  {
    label: 'JAPAN PHONE',
    value: '+81 70-8469-3284',
    href: 'tel:+817084693284',
    icon: '↗',
  },
];

const SectionHeading = ({ number, children }) => (
  <div className="mb-7 flex items-baseline gap-3 sm:gap-4">
    <span className="font-mono text-lg font-light tracking-tight text-white/20 sm:text-xl">
      {number}.
    </span>
    <h2 className="font-hero text-3xl font-light uppercase tracking-tight text-[#e8e5e2] sm:text-4xl lg:text-[42px]">
      {children}
    </h2>
  </div>
);

export const AboutSection = () => {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080808] text-[#e8e5e2]">
      {/* Subtle stone-like atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 12% 10%, rgba(255,255,255,0.045), transparent 45%),
            radial-gradient(ellipse at 85% 80%, rgba(255,255,255,0.025), transparent 45%),
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
        }}
      />

      <div className="scanlines pointer-events-none absolute inset-0 z-20" />

      {/* Camera HUD */}
      <header className="camera-hud-top relative z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">FILE INFO</span>
          <span className="text-white/20">|</span>
          <span className="hud-text-accent">ABOUT</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hud-text-dim">PROFILE / 001</span>
          <span className="text-white/20">|</span>
          <span className="hud-text-dim">EOS R5</span>
        </div>
      </header>

      {/* Scrollable editorial layout */}
      <main className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[1600px] px-4 py-6 sm:px-7 sm:py-9 lg:px-10 lg:py-12"
        >
          {/* Top editorial label */}
          <motion.div
            variants={itemVariants}
            className="mb-8 border-b border-white/10 pb-5 sm:mb-10"
          >
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/35 sm:text-[10px]">
              CREATIVE PORTFOLIO — PERSONAL ARCHIVE
            </p>
          </motion.div>

          {/* Three-column editorial composition */}
          <div className="grid items-start gap-5 lg:grid-cols-[0.92fr_1fr_0.92fr] lg:gap-6 xl:gap-8">

            {/* LEFT COLUMN — PROFILE */}
            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden border border-white/[0.06] bg-[#151313]/95 p-5 sm:p-7 lg:min-h-[650px] lg:p-8"
            >
              {/* Portrait */}
              <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-[#222020]">
                <img
                  src={about.profileImage}
                  alt={about.name}
                  className="h-full w-full object-cover grayscale-[45%] transition-all duration-700 hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/[0.03]" />

                <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest text-white/75">
                  SUBJECT / 001
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e8e5e2]" />
                  <span className="font-mono text-[9px] tracking-widest text-white/75">
                    PROFILE
                  </span>
                </div>
              </div>

              {/* Large name typography */}
              <h2 className="break-words font-hero text-4xl font-light uppercase leading-[0.98] tracking-tight text-[#d6d2cf] sm:text-5xl xl:text-[3.4rem]">
                {about.name}
              </h2>

              <p className="mt-7 max-w-sm text-lg font-semibold uppercase leading-snug tracking-tight text-white/85 sm:text-xl">
                {about.tagline}
              </p>

              <div className="my-5 h-px w-12 bg-white/30" />

              <p className="text-xs leading-[1.9] text-white/55 sm:text-sm">
                {about.bio}
              </p>
            </motion.section>

            {/* CENTER COLUMN — SKILLS */}
            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden border border-white/[0.06] bg-[#151313]/95 p-5 sm:p-7 lg:min-h-[650px] lg:p-8"
            >
              <SectionHeading number="01">Skills</SectionHeading>

              <p className="mb-8 text-xs leading-[1.9] text-white/55 sm:text-sm">
                Technologies and tools I use to build software, solve
                problems, and bring ideas to life.
              </p>

              {/* Skill groups */}
              <div className="space-y-7">
                {skills.map((group, index) => (
                  <div key={group.category}>
                    <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-2">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-white/75">
                        {group.category}
                      </h3>
                      <span className="font-mono text-[9px] text-white/25">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {group.items.map((skill) => (
                        <div
                          key={skill}
                          className="group flex min-w-0 items-baseline gap-2 text-xs text-white/50 transition-colors hover:text-white/90"
                        >
                          <span className="text-[9px] text-white/20 transition-colors group-hover:text-white/60">
                            /
                          </span>
                          <span className="break-words">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical signature */}
              <div className="mt-10 border-t border-white/[0.08] pt-4">
                <p className="font-mono text-[9px] tracking-[0.2em] text-white/25">
                  TECHNICAL INDEX / COMPLETE
                </p>
              </div>
            </motion.section>

            {/* RIGHT COLUMN — CONTACT */}
            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden border border-white/[0.06] bg-[#151313]/95 p-5 sm:p-7 lg:min-h-[650px] lg:p-8"
            >
              <SectionHeading number="02">Contact</SectionHeading>

              <p className="mb-8 text-xs leading-[1.9] text-white/55 sm:text-sm">
                Interested in collaborating, discussing software, or
                connecting over photography? Get in touch.
              </p>

              {/* Contact list */}
              <div className="space-y-1">
                {contacts.map((contact) => {
                  const external = contact.href.startsWith('https://');

                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="group flex min-w-0 items-center gap-4 border-b border-white/[0.06] py-4 transition-colors hover:border-white/20"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-lg font-semibold text-white/80 transition-colors group-hover:text-white">
                        {contact.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="mb-1 block font-mono text-[9px] tracking-widest text-white/30">
                          {contact.label}
                        </span>
                        <span className="block break-all text-xs text-white/65 transition-colors group-hover:text-white">
                          {contact.value}
                        </span>
                      </span>

                      <span className="text-xs text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/80">
                        ↗
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Location and languages */}
              <div className="mt-10 space-y-5 border-t border-white/[0.08] pt-6">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
                    REGION
                  </p>
                  <p className="mt-2 text-xs text-white/65">
                    Philadelphia, PA
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
                    HOBBIES
                  </p>
                  <p className="mt-2 text-xs text-white/65">
                    Photography / Bowling / Video Games
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Bottom editorial signature */}
          <motion.footer
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5"
          >
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/30">
              DESIGNED TO BUILD. BUILT TO CREATE.
            </p>

            <p className="font-mono text-[9px] tracking-widest text-white/25">
              PORTFOLIO / ABOUT / END
            </p>
          </motion.footer>
        </motion.div>
      </main>

      {/* Camera HUD */}
      <footer className="camera-hud-bottom relative z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">FILE INFO</span>
          <span className="text-white/20">|</span>
          <span className="hud-text-dim">ABOUT</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hud-text-dim">PROFILE: 001</span>
          <span className="text-white/20">|</span>
          <span className="hud-text-dim">END OF FILE</span>
        </div>
      </footer>
    </div>
  );
};
