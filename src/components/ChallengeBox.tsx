import { useContext } from 'react'

import ChallengesContext from '../contexts/ChallengesContext'
import CountdownContext from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)

    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown
    } = useContext(CountdownContext)

    const handleChallangeSucceed = () => {
        completeChallenge()
        resetCountdown()
    }

    const handleChallangeFailed = () => {
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {
                activeChallenge? (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} XP</header>
                        
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`}/>
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <button
                                type="button"
                                className={styles.challengeFailedButton}
                                onClick={handleChallangeFailed}
                            >
                                falhei
                            </button>
                            <button
                                type="button"
                                className={styles.challengeSucceededButton}
                                onClick={handleChallangeSucceed}
                            >
                                completei
                            </button>
                        </footer>
                    </div>
                ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level up"/>
                            <h3>Avance de level completando desafios</h3>
                        </p>
                    </div>
                )
            }

        </div>
    )
}