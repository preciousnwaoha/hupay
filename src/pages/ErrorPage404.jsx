import React from 'react'
import Error404 from '../components/Errors/Error404'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'

const ErrorPage404 = () => {
  return (
    <>
        <Header/>
        <Error404 />
        <Footer />
    </>
  )
}

export default ErrorPage404