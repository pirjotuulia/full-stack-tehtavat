import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: 0,
            summa: 0
        }
    }

    palauteHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            kaikki: this.state.kaikki + 1,
            summa: this.state.summa + 1
        })
    }

    palauteNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            kaikki: this.state.kaikki + 1
        })
    }

    palauteHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            kaikki: this.state.kaikki + 1,
            summa: this.state.summa - 1
        })
    }

    render() {
        const palaute = (nappi) => () => {
            if (nappi === 1) {
                this.palauteHyva()
            }
            if (nappi === 0) {
                this.palauteNeutraali()
            }
            if (nappi === -1) {
                this.palauteHuono()
            }
        }
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button
                        handleClick={palaute(1)}
                        text="hyvä"
                    />
                    <Button
                        handleClick={palaute(0)}
                        text="neutraali"
                    />
                    <Button
                        handleClick={palaute(-1)}
                        text="huono"
                    />
                </div>
                <h1>statistiikka</h1>
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} kaikki={this.state.kaikki} summa={this.state.summa} />
            </div >
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ hyva, neutraali, huono, kaikki, summa }) => {
    if (kaikki > 0) {
        return (
            <table>
                <tbody>
                    <Statistic text='hyvä' number={hyva} />
                    <Statistic text='neutraali' number={neutraali} />
                    <Statistic text='huono' number={huono} />
                    <Statistic text='keskiarvo' number={summa / kaikki} />
                    <Statistic text='positiivisia' number={hyva / kaikki * 100} merkki={'%'} />
                </tbody>
            </table>
        )
    } else {
        return (
            <div>ei yhtään palautetta annettu</div>
        )
    }
}

const Statistic = ({ text, number, merkki }) => (
    <tr><td width="72px">{text}</td><td>{number} {merkki}</td></tr>
)

ReactDOM.render(<App />, document.getElementById('root'))
