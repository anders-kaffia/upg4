var React = require('react');

var JoinSpeakerForm = React.createClass({

    render: function() {

        return (
            <form action="javascript:void(0)" onSubmit={this.nameEntered}>
            	<label> Namn: </label>
                <input type="text"
                        placeholder="Ange ditt namn här"
                        ref="nameInput"
                        required
                        className="form-control"
                        />
                <label> Presentation: </label>
                <input type="text"
                        placeholder="Ange namn på presentationen"
                        ref="titleInput"
                        required
                        className="form-control"
                        />
                <button className="btn btn-primary">Anslut</button>
            </form>
        )

    },
    nameEntered:function() {
        var name = this.refs.nameInput.value;
        var title = this.refs.titleInput.value;
        
        sessionStorage.title = title;
        
        this.props.emit('start', { speaker: { name:name }, title: title });
    }
})
module.exports = JoinSpeakerForm;