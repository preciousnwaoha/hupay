import React, { useEffect, useState } from "react"

const TrxHistoryContext = React.createContext({
    trxs: [],
})


export const TrxHistoryContextProvider = ({children}) => {
    const [trxs, setTrxs] = useState([]);

    useEffect(() => {
        console.log(typeof setTrxs);
    }, [])

    return <TrxHistoryContext.Provider value={{
        trxs: trxs,
    }} >
        {children }
    </TrxHistoryContext.Provider>
}

export default TrxHistoryContext;