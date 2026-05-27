// Plan. — Top-level App: design canvas + tweaks

import React from 'react';
import { DesignCanvas, DCSection, DCArtboard } from './components/DesignCanvas';
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakColor, TweakRadio, TweakSlider,
} from './components/TweaksPanel';
import { DesktopShell } from './desktop';
import { MobileShell } from './mobile';
import { SystemArtboard } from './system';
import {
  ExploreDragState, ExploreBlockDetail,
  ExploreFocusMobile, ExploreFocusDesktop, ExploreCalendarDrag,
} from './explorations';
import {
  BScreenHome, BScreenExpanded, BScreenDrillIn,
  BScreenCalendar, BScreenGantt, BDesktopShell,
} from './planb';

const TWEAK_DEFAULTS = {
  accent: '#FF5C2B',
  morphMs: 580,
  density: 'comfy',
  canvasBg: 'warm',
};

const ACCENT_OPTIONS = ['#FF5C2B', '#3D5AFE', '#0FB280', '#1A1A19'];

function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-2', t.accent);
  root.style.setProperty('--accent-tint', t.accent + '14');
  root.style.setProperty('--accent-tint-strong', t.accent + '29');
  root.style.setProperty('--dur', t.morphMs + 'ms');
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <>
      <DesignCanvas minScale={0.15} maxScale={2.5}
        style={{ background: t.canvasBg === 'warm' ? '#f0eee9' : '#1a1a19' }}>
        <DCSection id="prototypes" title="Plan. — A" subtitle="Warm canvas · Geist · Plan Orange · geometric alphabet. Switch any view to see the same blocks slide into their new geometry.">
          <DCArtboard id="desktop" label="Desktop · PWA" width={1280} height={860}>
            <DesktopShell />
          </DCArtboard>
          <DCArtboard id="mobile" label="Mobile · iOS PWA" width={390} height={844}>
            <MobileShell />
          </DCArtboard>
          <DCArtboard id="explore-drag" label="Desktop · Drag state" width={1280} height={740}>
            <ExploreDragState />
          </DCArtboard>
          <DCArtboard id="explore-detail" label="Mobile · Block detail" width={390} height={844}>
            <ExploreBlockDetail />
          </DCArtboard>
          <DCArtboard id="explore-focus-mobile" label="Mobile · Focus / Pomodoro" width={390} height={844}>
            <ExploreFocusMobile />
          </DCArtboard>
          <DCArtboard id="explore-focus-desktop" label="Desktop · Focus / Pomodoro" width={1280} height={740}>
            <ExploreFocusDesktop />
          </DCArtboard>
          <DCArtboard id="explore-cal-drag" label="Mobile · Drag to reschedule" width={390} height={844}>
            <ExploreCalendarDrag />
          </DCArtboard>
        </DCSection>

        <DCSection id="prototypes-b" title="Plan. — B" subtitle="Bright blue · Helvetica · row-as-block · the view-type icon is the block. Closer to your original sketch.">
          <DCArtboard id="b-mobile-home" label="Mobile · Home" width={290} height={680}>
            <BScreenHome />
          </DCArtboard>
          <DCArtboard id="b-mobile-expanded" label="Mobile · Expanded" width={290} height={680}>
            <BScreenExpanded />
          </DCArtboard>
          <DCArtboard id="b-mobile-drill" label="Mobile · Drill-in" width={290} height={680}>
            <BScreenDrillIn />
          </DCArtboard>
          <DCArtboard id="b-mobile-calendar" label="Mobile · Calendar" width={290} height={680}>
            <BScreenCalendar />
          </DCArtboard>
          <DCArtboard id="b-mobile-gantt" label="Mobile · Gantt" width={290} height={680}>
            <BScreenGantt />
          </DCArtboard>
          <DCArtboard id="b-desktop" label="Desktop · B" width={1280} height={860}>
            <BDesktopShell />
          </DCArtboard>
        </DCSection>

        <DCSection id="system" title="The Geometric Alphabet" subtitle="The visual language for Version A.">
          <DCArtboard id="alphabet" label="Design language · A" width={1200} height={900}>
            <SystemArtboard />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Canvas" value={t.canvasBg}
          options={['warm', 'dark']}
          onChange={(v) => setTweak('canvasBg', v)} />

        <TweakSection label="Motion" />
        <TweakSlider label="Morph duration" value={t.morphMs}
          min={120} max={1400} step={20} unit="ms"
          onChange={(v) => setTweak('morphMs', v)} />

        <TweakSection label="Density" />
        <TweakRadio label="Layout" value={t.density}
          options={['compact', 'comfy']}
          onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </>
  );
}
