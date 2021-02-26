import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'

import challenges from '../challenges.json'
import LevelUpModal from '../components/LevelUpModal'

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}
interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: {
        type: 'body' | 'eye',
        description: string,
        amount: number
    },
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void
}

const ChallengesContext = createContext({} as ChallengesContextData )

export default  ChallengesContext
export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){

    const [level, setLevel]= useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level+1) *4,2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted])

    const closeLevelUpModal= () => {
        setIsLevelUpModalOpen(false)
    }
    const levelUp = () => {
        setIsLevelUpModalOpen(true)
        setLevel(level + 1)
    }
    const startNewChallenge = () => {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission == 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }
    const resetChallenge = () => {
        setActiveChallenge(null)
    
    }
    const completeChallenge = () => {
        if(!activeChallenge){
            return
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }



    return(
        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}
            {
                isLevelUpModalOpen? <LevelUpModal/>: null 
            }
            
        </ChallengesContext.Provider>
    )
}