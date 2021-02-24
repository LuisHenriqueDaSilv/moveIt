import styles from '../styles/components/Profile.module.css'

export default function Profile(){
    


    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/LuisHenriqueDaSilv.png" alt="Foto de perfil"/>
            <div>
                <strong>Luis Silva</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    level 1
                </p>
            </div>
        </div>
    )
}