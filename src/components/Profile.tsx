import styles from '../styles/components/Profile.module.css'
import {useContext} from 'react'
import ChallengesContext from '../contexts/ChallengesContext'


export default function Profile(){
    
    const {level} = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/LuisHenriqueDaSilv.png" alt="Foto de perfil"/>
            <div>
                <strong>Luis Silva</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    level {level}
                </p>
            </div>
        </div>
    )
}