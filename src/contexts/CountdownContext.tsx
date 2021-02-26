import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ChallengesContext from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean, 
    isActive: boolean,
    resetCountdown: () => void,
    startCountdown: () => void,
}
interface CountdownProviderprops{
    children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)
export default CountdownContext

export  function CountdownProvider({children} :CountdownProviderprops){
    
    const {startNewChallenge} = useContext(ChallengesContext)

    const [isActive, setIsActive] = useState(false)
    const [time, setTime] = useState(25 * 60)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time/60)
    const seconds = time % 60

    const startCountdown = () => {
        setIsActive(true)
    }
    const resetCountdown = () => {
        setIsActive(false)
        clearTimeout(countdownTimeout)
        setTime( 25* 60)
        setHasFinished(false)
    }

    useEffect(() => {

        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time -1)
            }, 1000)
        } else if(isActive && time ==0){
            setIsActive(false)
            setHasFinished(true)
            startNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished, 
                isActive,
                resetCountdown,
                startCountdown,
            }}    
        >
            {children}
        </CountdownContext.Provider>

    )
} 