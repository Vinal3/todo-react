import { useEffect, useState } from "react"
import { BASE_URL } from "../../shared/constants"

const getCurrentPath = () => {
  const pathname = window.location.pathname

  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || '/'
    : pathname
}

const matchPath = (path, route) => {
  const pathParts = path.split("/")
  const routePaths = route.split("/")

  if (pathParts.length !== routePaths.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(":")) {
      const paramName = routePaths[i].slice(1)

      params[paramName] = pathParts[i]
    } else if (routePaths[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath())
    }

    window.addEventListener("popstate", onLocationChange)

    return () => {
      window.removeEventListener("popstate", onLocationChange)
    }
  }, [])

  return path
}

const Router = (props) => {
  const { routes } = props
  const path = useRoute()

  for (const route in routes) {
    const params = matchPath(path, route)

    if (params) {
      const Page = routes[route]

      return <Page params={params} />
    }
  }

  const NotFound = routes["*"]

  return <NotFound />
}

export default Router
