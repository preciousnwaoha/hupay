
import classes from "./Loading.module.css"

const Loading = ({text, className}) => {
    return (
        <div className={`${classes.loading} ${className || ""}`}>
            <div className={classes.anime}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <p className={classes.text}>{text}</p>
        </div>
    )
}

export default Loading;