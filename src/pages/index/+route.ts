// src/pages/index/+route.ts
export default '/'


// src/pages/index/+Page.tsx
export { Page }

// src/pages/index/+Page.tsx
import Page from './+Page'

// src/pages/index/+Page.tsx
import { usePageContext } from '../../renderer/usePageContext'

function Page() {
  const pageContext = usePageContext()
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}

function Counter() {
  let count = 0
  return (
    <>
      <button
        type="button"
        onClick={() => {
          count++
          console.log(`Counter ${count}`)
        }}
      >
        Counter
      </button>
    </>
  )
}