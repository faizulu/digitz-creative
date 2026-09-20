import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react'

/**
 * Site-wide Glass Agency shader (fixed viewport).
 * Swirl → ChromaFlow → FlutedGlass → FilmGrain.
 * Cursor bloom is built into ChromaFlow.
 */
export function GlassAgencyBackground() {
  return (
    <div className="site-glass-shader" aria-hidden="true">
      <Shader className="site-glass-shader-canvas">
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
        <ChromaFlow
          baseColor="#ffffff"
          downColor="#4642ff"
          leftColor="#56c2fc"
          rightColor="#5b4fff"
          upColor="#7f66ff"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}
