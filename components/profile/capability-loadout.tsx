"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  BrainIcon,
  CodeIcon,
  FilmSlateIcon,
  GameControllerIcon,
  MegaphoneIcon,
  PaintBrushIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import type { CreatorCapability } from "@/data/capabilities";
import styles from "./capability-loadout.module.css";

const iconByCapability = {
  editing: FilmSlateIcon,
  visual: PaintBrushIcon,
  ai: BrainIcon,
  engineering: CodeIcon,
  web: CodeIcon,
  business: MegaphoneIcon,
  interactive: GameControllerIcon,
} as const;

export function CapabilityLoadout({ capabilities }: { capabilities: readonly CreatorCapability[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeCapability = capabilities[activeIndex];

  const moveSelection = (event: KeyboardEvent<HTMLButtonElement>) => {
    const focusedIndex = capabilities.findIndex(
      (capability) => `capability-tab-${capability.id}` === event.currentTarget.id,
    );
    let nextIndex = focusedIndex >= 0 ? focusedIndex : activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (nextIndex + 1) % capabilities.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (nextIndex - 1 + capabilities.length) % capabilities.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = capabilities.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`capability-tab-${capabilities[nextIndex].id}`)?.focus();
  };

  if (!activeCapability) return null;

  return (
    <section className={`${styles.section} section-shell`} aria-labelledby="capabilities-title">
      <div className={styles.heading}>
        <h2 id="capabilities-title">My creator loadout</h2>
        <p>I do more than code. Choose a capability to see what I can do, what I work with, and where the proof currently stands.</p>
      </div>

      <div className={styles.board}>
        <div className={styles.tabs} role="tablist" aria-label="Choose a capability" aria-orientation="vertical">
          {capabilities.map((capability, index) => {
            const Icon = iconByCapability[capability.id];
            const selected = index === activeIndex;
            return (
              <button
                className={styles.tab}
                data-selected={selected}
                id={`capability-tab-${capability.id}`}
                key={capability.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`capability-panel-${capability.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={moveSelection}
              >
                <span className={styles.tabIcon} aria-hidden="true"><Icon size={25} weight={selected ? "fill" : "bold"} /></span>
                <span className={styles.tabCopy}><strong>{capability.name}</strong><small>{capability.shortDescription}</small></span>
                <ArrowRightIcon className={styles.tabArrow} size={19} weight="bold" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className={styles.panelFrame}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              className={styles.panel}
              id={`capability-panel-${activeCapability.id}`}
              key={activeCapability.id}
              role="tabpanel"
              aria-labelledby={`capability-tab-${activeCapability.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.panelLead}>
                <span className={styles.stage}>{activeCapability.stage}</span>
                <h3>{activeCapability.name}</h3>
                <p>{activeCapability.statement}</p>
                <small>{activeCapability.stageDetail}</small>
              </div>

              <div className={styles.detailGrid}>
                <div>
                  <h4>What I do</h4>
                  <ul className={styles.actionList}>{activeCapability.actions.map((action) => <li key={action}>{action}</li>)}</ul>
                </div>
                <div>
                  <h4>Working set</h4>
                  <ul className={styles.toolList}>{activeCapability.workingSet.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>

              <div className={styles.evidence}>
                <div><h4>Proof, not percentages</h4><p>{activeCapability.evidenceNote}</p></div>
                {activeCapability.evidence.length > 0 ? (
                  <div className={styles.evidenceLinks}>
                    {activeCapability.evidence.map((item) => (
                      <Link href={item.route} key={item.route} title={item.detail}>
                        {item.label}<ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className={styles.legend}><strong>Hands-on</strong> means actively practised. <strong>Building</strong> means used in current projects. <strong>Exploring</strong> means learning territory.</p>
    </section>
  );
}
