/** @jsx React.DOM */

var IngredientList = React.createClass({
    getInitialState: function () {
        return {servings: this.props.servings}
    },
    onServingsChange: function (e) {
        this.setState({servings: e.target.value});
    },
    render: function () {
        var ingredients = this.props.ingredients.map(function (x) {
            return (
                <Ingredient key={x.id} ingredient={x} initalServings={this.props.servings} servings={this.state.servings}/>
            );
        }.bind(this));
        return (
            <div>
                <h3>Ingredients:</h3>
                <div className='row'>
                    <div className='col-md-4'>
                        <b> Servings: </b>
                    </div>
                    <div className='col-md-1'>
                    {this.state.servings}
                    </div>
                    <div className='col-md-7'>
                        <input type='range' min='1' max='20' value={this.state.servings} onChange={this.onServingsChange}/>
                    </div>
                </div>
                <div className="ingredients-list">
                    {ingredients}
                </div>
            </div>
        )
    }
});

var Ingredient = React.createClass({
    render: function () {
        return (
            <div className="shadow-box ingredient">
                <div className="ingredient-name ">
                    <b>{this.props.ingredient.name}</b>
                </div>
                <div className="ingredient-quantity">
                    {this.props.ingredient.quantity * this.props.servings / this.props.initalServings + ' ' + this.props.ingredient.unit}
                </div>
            </div>
        )
    }
});