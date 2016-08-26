// var React = require('react');
import { React } from 'react'

// Klasser fungerar som mallar
// En klass script körs inte uppifrån och ner.
class QuestionList extends React.Component {

	// Funktionen/kontruktorn som kommer anropas när man ropar på klassen
	// Man kan även skriva constructor = function() {}. OBS, använd ej 'var'
	constructor() {
		// Underliggande klass skall köra igång sin constructor. I detta fallet Reacts Component klass.
		// super används bara om man vill använda grundklassens constructor.
		super();

		// Lägger man till fler funktioner eller egenskaper används inte komma.
		ask( question ) {
			this.props.emit( 'ask', question );
			console.log(question);
		}
		render() {
			var questions = this.props.questions.map((question, i) => {
			return (
				<li key={i}><a href="#" onClick={ this.ask.bind(this, question) }> { question.q } </a></li>
			)
			});
			return (
				<div>
					<h4>Frågor: { this.props.questions.length }</h4>
					<ul>
						{ questions }
					</ul>
				</div>
			)
		}
	}
}
module.exports = QuestionList;

// Man kan exportera flera moduler. module.exports = { modul1:modul1, modul2:modul2 }

// var QuestionList = React.createClass({
// 	ask: function(question) {
// 		this.props.emit( 'ask', question );
// 		console.log(question);
// 	},
// 	render: function() {
// 		var questions = this.props.questions.map((question, i) => {
// 			return (
// 				<li key={i}><a href="#" onClick={ this.ask.bind(this, question) }> { question.q } </a></li>
// 			)
// 		});
// 		return (
// 			<div>
// 				<h4>Frågor: { this.props.questions.length }</h4>
// 				<ul>
// 					{ questions }
// 				</ul>
// 			</div>
// 		)
// 	}
// });
