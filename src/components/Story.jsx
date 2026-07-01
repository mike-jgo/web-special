import Game2 from './story/Game2'

// The narrative "Story" — a sequence of full-screen beats. Carries the #story
// anchor (nav + hero scroll cue target). More beats slot in below Game2.
export default function Story() {
  return (
    <div id="story">
      <Game2 />
    </div>
  )
}
