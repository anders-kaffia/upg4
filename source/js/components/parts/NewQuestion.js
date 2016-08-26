var React = require( 'react' );

var NewQuestion = React.createClass({
	createQuestion : function(event) {
		// Take the data from the form and create an object
		var newQ = {
			q : this.refs.q.value,
			a : this.refs.a.value,
			b : this.refs.b.value,
			c : this.refs.c.value,
			d : this.refs.d.value
		}
		console.log(newQ);
		// Reset the form after submission
		this.refs.newQForm.reset();
	},
	render: function() {
		// Create a form (only visible to the speaker) that enables the speaker to add new questions.
		return (
			<div className="q-form">
				<form ref="newQForm" action="javascript:void(0)" onSubmit={this.createQuestion}>
					<label htmlFor="q">Ställ en ny fråga:</label>
					<input className="form-control" name="q" ref="q" type="text" placeholder="Skriv din fråga här.." />
					<input className="form-control" ref="a" type="text" placeholder="Svarsalternativ A" />
					<input className="form-control" ref="b" type="text" placeholder="Svarsalternativ B" />
					<input className="form-control" ref="c" type="text" placeholder="Svarsalternativ C" />
					<input className="form-control" ref="d" type="text" placeholder="Svarsalternativ D" />
					<button className="btn btn-info">Lägg till frågan</button>
				</form>
			</div>
		)
	}
})
module.exports = NewQuestion;