import Hero from './components/Hero'
import Story from './components/Story'
import LegacyTimeline from './components/LegacyTimeline'
import ScrollRail from './components/ScrollRail'

export default function App() {
  return (
    <main>
      <ScrollRail />
      <Hero />
      <Story />
      <LegacyTimeline />
    </main>
  )
}
