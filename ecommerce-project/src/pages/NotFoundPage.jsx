import Header from "../components/Header"

import './NotFoundPage.css'

function NotFoundPage({ cart }) {
  return (
    <div>
      <Header cart={cart} />
      <h1>Page not found</h1>
    </div>
  )
}

export default NotFoundPage
