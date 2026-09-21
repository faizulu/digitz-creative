import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react'

/**
 * Site-wide liquid glass field.
 * Web approximation of liquid glass (not Apple's platform material):
 * brand cyan / lime chroma + fluted refraction + soft highlight veil.
 */
export function GlassAgencyBackground() {
  return (
    <div className="site-glass-shader" aria-hidden="true">
      <Shader className="site-glass-shader-canvas">
        <Swirl colorA="#f8fbff" colorB="#e6f3fc" detail={1.7} />
        <ChromaFlow
          baseColor="#f2f8fd"
          downColor="#58b832"
          leftColor="#56c2fc"
          rightColor="#1578b8"
          upColor="#8fd0f4"
          momentum={13}
          radius={3.6}
        />
        <FlutedGlass
          aberration={0.85}
          angle={32}
          frequency={8}
          highlight={0.24}
          highlightSoftness={0.22}
          lightAngle={-72}
          refraction={5.2}
          shape="rounded"
          softness={1}
          speed={0.14}
        />
        <FilmGrain strength={0.035} />
      </Shader>
      <div className="site-liquid-veil" />
    </div>
  )
}
