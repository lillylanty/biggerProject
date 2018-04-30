function Counter({increment,decrement,counter}){
    return (
        <p>
            <img src={require('./Counter.png')}
                className={require('./Counter.css').counter}
            />
        </p>
    )
}