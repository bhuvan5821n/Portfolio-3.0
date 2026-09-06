import Image from "next/image";

export default function MobileIntro() {
  return (
    <section
      className="intro-sequence"
      aria-label="Portrait introduction"
    >
      <div className="intro-sticky">
        <Image
          src="/media/hero-sequence/frame_001.jpg"
          alt=""
          width={640}
          height={360}
          priority
          className="intro-poster"
          sizes="(max-width: 640px) 100vw, 640px"
        />
        <p className="sr-only">
          A scroll-controlled black-and-white portrait sequence introduces Bhuvan. The supplied frames include baked-in text and a visible Veo watermark.
        </p>
        <div className="intro-cable" aria-hidden="true" />
      </div>
    </section>
  );
}