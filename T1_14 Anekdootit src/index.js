import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }

    asetaArvoon = (arvo) => () => this.setState({ selected: arvo })

    aanesta = () => {
        const kopio = [...this.state.pisteet]
        kopio[this.state.selected] += 1
        return () => {
            this.setState({ pisteet: kopio })
        }
    }

    suosituin = () => {
        let suurin = this.suurinAanimaara()
        let indeksi = this.state.pisteet.indexOf(suurin)
        return indeksi
    }

    suurinAanimaara = () => {
        return (Math.max(...this.state.pisteet))
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <div>has {this.state.pisteet[this.state.selected]} votes</div>
                <div>
                    <Button handleClick={this.aanesta()} text="vote" />
                    <Button handleClick={this.asetaArvoon(Math.floor(Math.random() * this.props.anecdotes.length))}
                        text="next anecdote" />
                </div>
                <h1>andecdote with most votes:</h1>
                {this.props.anecdotes[this.suosituin()]}
                <div>has {this.suurinAanimaara()} votes</div>
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

