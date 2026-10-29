
import React from 'react';
import { motion } from 'framer-motion';
import { career } from '../../data/career';

const ease = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export const CareerSection = () => {
  const totalEntries = career.length;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#090a0b] text-white">
      {/* Ambient technical background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 80% 10%, rgba(232,112,48,0.07), transparent 38%),
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 44px 44px, 44px 44px',
        }}
      />

      <div className="scanlines pointer-events-none absolute inset-0 z-20" />

      {/* Top camera HUD */}
      <header className="camera-hud-top relative z-30 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">FILE INFO</span>
          <span className="text-white/15">|</span>
          <span className="hud-text-accent">CAREER</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hud-text-dim">
            [{String(totalEntries).padStart(2, '0')}]
          </span>
          <span className="text-white/15">|</span>
          <span className="hud-text-dim">HISTORY LOG</span>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <motion.div
          className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Career summary strip */}
          <motion.section variants={itemVariants} className="mb-10">
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/10 sm:grid-cols-3">
              <div className="border-b border-r border-white/10 p-4 sm:border-b-0 sm:p-5">
                <p className="font-mono text-[9px] tracking-widest text-white/35">
                  CAREER RECORDS
                </p>
                <p className="mt-3 font-hero text-3xl font-semibold text-[#e98b51]">
                  {String(totalEntries).padStart(2, '0')}
                </p>
              </div>

              <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r sm:border-white/10 sm:p-5">
                <p className="font-mono text-[9px] tracking-widest text-white/35">
                  EDUCATION
                </p>
                <p className="mt-3 text-lg font-medium text-white/80">
                  B.S. Computer Science
                </p>
              </div>

              <div className="col-span-2 p-4 sm:col-span-1 sm:p-5">
                <p className="font-mono text-[9px] tracking-widest text-white/35">
                  SPECIALIZATION
                </p>
                <p className="mt-3 text-lg font-medium text-white/80">
                  Software Engineering
                </p>
              </div>
            </div>
          </motion.section>

          {/* Professional timeline */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-mono text-[10px] tracking-[0.22em] text-white/65">
                  <span className="mr-2 text-[#e98b51]">01</span>
                  PROFESSIONAL EXPERIENCE
                </h2>
                <p className="mt-2 text-sm text-white/35">
                  A timeline of roles and responsibilities.
                </p>
              </div>

              <span className="hidden font-mono text-[9px] tracking-widest text-white/25 sm:block">
                CHRONOLOGICAL LOG
              </span>
            </div>

            <div className="relative">
              {/* Timeline rail */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-[7px] top-6 w-px bg-gradient-to-b from-[#e98b51]/70 via-white/15 to-white/[0.03] sm:left-[103px]"
              />

              <div className="space-y-4">
                {career.map((item, index) => (
                  <motion.article
                    key={`${item.period}-${item.company}-${item.role}`}
                    variants={itemVariants}
                    className="group relative grid grid-cols-[16px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_16px_minmax(0,1fr)] sm:gap-4"
                  >
                    {/* Period: shown above the card on mobile */}
                    <div className="col-start-2 row-start-1 mb-1 sm:col-start-1 sm:row-start-1 sm:mb-0 sm:pt-5 sm:text-right">
                      <span className="font-mono text-[10px] leading-5 text-[#e98b51] sm:text-xs">
                        {item.period}
                      </span>
                    </div>

                    {/* Timeline marker */}
                    <div className="col-start-1 row-span-2 row-start-1 flex justify-center sm:col-start-2 sm:row-span-1 sm:row-start-1">
                      <div className="relative mt-[5px] flex h-4 w-4 items-center justify-center rounded-full border border-[#e98b51]/50 bg-[#090a0b] transition-colors group-hover:border-[#e98b51] sm:mt-5">
                        <div
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            index === 0
                              ? 'bg-[#e98b51] shadow-[0_0_8px_rgba(233,139,81,0.65)]'
                              : 'bg-white/35 group-hover:bg-[#e98b51]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Experience card */}
                    <div
                      className={`col-start-2 row-start-2 min-w-0 overflow-hidden rounded-lg border transition-all duration-300 sm:col-start-3 sm:row-start-1 ${
                        index === 0
                          ? 'border-[#e98b51]/25 bg-[#e98b51]/[0.035] hover:border-[#e98b51]/45'
                          : 'border-white/[0.08] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="p-5 sm:p-6">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-[9px] tracking-[0.18em] text-white/30">
                            RECORD {String(index + 1).padStart(2, '0')}
                          </span>

                          <span className="inline-flex items-center gap-2 rounded border border-white/[0.08] bg-black/20 px-2 py-1 font-mono text-[9px] text-white/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e98b51]/80" />
                            {item.type || 'Full-time'}
                          </span>
                        </div>

                        <h3 className="font-hero text-lg font-semibold leading-snug tracking-tight text-white/90 transition-colors group-hover:text-white sm:text-xl">
                          {item.role}
                        </h3>

                        <p className="mt-2 text-sm text-[#e98b51]/85">
                          {item.company}
                        </p>

                        <div className="my-5 h-px w-full bg-white/[0.07]" />

                        <p className="max-w-3xl text-sm leading-7 text-white/50">
                          {item.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-3">
                          <span className="font-mono text-[9px] tracking-[0.15em] text-white/25">
                            CAREER / {String(index + 1).padStart(3, '0')}
                          </span>

                          <span className="text-sm text-white/20 transition-all group-hover:translate-x-1 group-hover:text-[#e98b51]">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants} className="mb-10">
            <div className="mb-5">
              <h2 className="font-mono text-[10px] tracking-[0.22em] text-white/65">
                <span className="mr-2 text-[#e98b51]">02</span>
                EDUCATION & CREDENTIALS
              </h2>
              <p className="mt-2 text-sm text-white/35">
                Academic foundation.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#101112]">
              {/* Decorative degree watermark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-8 select-none font-hero text-[150px] font-bold leading-none text-white/[0.025] sm:right-5 sm:text-[180px]"
              >
                BS
              </div>

              <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-[#e98b51]/30 bg-[#e98b51]/[0.06]">
                  <span className="font-hero text-xl font-bold text-[#e98b51]">
                    BS
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-[#e98b51]">
                    BACHELOR'S DEGREE
                  </p>

                  <h3 className="text-lg font-semibold text-white/90 sm:text-xl">
                    Computer Science
                  </h3>

                  <p className="mt-2 text-sm text-white/50">
                    Lehigh University
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                  <p className="font-mono text-[9px] tracking-widest text-white/30">
                    GRADUATION
                  </p>
                  <p className="mt-2 font-hero text-3xl font-semibold text-[#e98b51]">
                    2024
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Photography metadata */}
          <motion.section
            variants={itemVariants}
            className="mb-2 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.015]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3">
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/45">
                FIELD NOTES
              </span>
              <span className="font-mono text-[9px] text-white/25">
                CREATIVE ARCHIVE
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className="mb-2 font-mono text-[9px] tracking-widest text-white/30">
                  SHUTTER COUNT
                </p>
                <p className="text-sm text-white/70">~15K shots</p>
              </div>

              <div>
                <p className="mb-2 font-mono text-[9px] tracking-widest text-white/30">
                  LENS COLLECTION
                </p>
                <p className="text-sm leading-6 text-white/70">
                  24–70mm · 70–200mm · 35mm f/1.4
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* Bottom camera HUD */}
      <footer className="camera-hud-bottom relative z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">HISTORY</span>
          <span className="text-white/15">|</span>
          <span className="hud-text-dim">EDUCATION</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hud-text-dim">
            RECORDS: {String(totalEntries).padStart(2, '0')}
          </span>
          <span className="text-white/15">|</span>
          <span className="hud-text-dim">ARCHIVE: OK</span>
        </div>
      </footer>
    </div>
  );
};
