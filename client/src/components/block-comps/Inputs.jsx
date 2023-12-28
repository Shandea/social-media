

const Inputs = (props) => {
    return (
        <input
            className={props.className}

            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
            maxLength={props.maxLength}
            minLength={props.minLength}
            min={props.min}
            max={props.max}
            step={props.step}
            checked={props.checked}
            pattern={props.pattern}
        />
    )
}

export default Inputs