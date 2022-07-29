// import React, {useEffect} from 'react'
import Landing from '../components/Landing/Landing'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'

const Home = () => {

    // useEffect(() => {
       
    //     const getData = async () => {
    //         const url =  `https://api-goerli.etherscan.io/api?module=account
    //         &action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`

    //         fetch(
    //             `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_MAIN_TOKEN}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    //           )
    //             .then((res) => {
    //               return res.json();
    //             })
    //             .then((jsonResponse) => {
    //               return jsonResponse;
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [])

  return (
    <>
        <Header />
        <Landing />
        <Footer />
    </>
  )
}

export default Home