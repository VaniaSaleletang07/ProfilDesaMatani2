import { useEffect } from 'react'

export default function usePageMeta(title, description, robots = 'index, follow') {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = description
    let robotsTag = document.querySelector('meta[name="robots"]')
    if (!robotsTag) {
      robotsTag = document.createElement('meta')
      robotsTag.name = 'robots'
      document.head.appendChild(robotsTag)
    }
    robotsTag.content = robots
  }, [title, description, robots])
}
