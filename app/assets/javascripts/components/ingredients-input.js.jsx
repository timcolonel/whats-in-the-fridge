/** @jsx React.DOM */

var IngredientListInput = React.createClass({
    getInitialState: function () {
        return {
            ingredients: this.props.ingredients
        }
    },
    getDefaultProps: function () {
        return {
            ingredients: []
        }
    },
    onItemAdded: function (value, label) {
        var newIngredients = this.state.ingredients.concat({id: value, name: label});
        this.setState({ingredients: newIngredients})
    },
    onItemRemoved: function (value) {
        var newIngredients = this.state.ingredients.filter(function (x) {
            return (x.id != value);
        });
        this.setState({ingredients: newIngredients})
    },
    onIngredientQuantityChange: function (id, value) {
        var newIngredients = this.state.ingredients;
        for (var i in newIngredients) {
            if (newIngredients[i].id == id) {
                newIngredients[i].quantity = value;
            }
        }
        this.setState({ingredients: newIngredients})

    },
    onIngredientUnitChange: function (id, value) {
        var newIngredients = this.state.ingredients;
        for (var i in newIngredients) {
            if (newIngredients[i].id == id) {
                newIngredients[i].unit = value;
            }
        }
        this.setState({ingredients: newIngredients})

    },
    render: function () {
        var value = JSON.stringify(this.state.ingredients);
        var ingredients = this.state.ingredients.map(function (x) {
            return (
                <IngredientInput key={x.id} ingredient={x}
                    onQuantityChange={this.onIngredientQuantityChange.bind(this, x.id)}
                    onUnitChange={this.onIngredientUnitChange.bind(this, x.id)}
                />
            );
        }.bind(this));

        var ingredient_header;
        if (ingredients.length > 0) {
            ingredient_header = (
                <div className='ingredient-list-header row'>
                    <div className='col-md-6'>
                    </div>
                    <div className='col-md-3'>
                        <i> Quantity(e.g. 200)</i>
                    </div>
                    <div className='col-md-3'>
                        <i> Unit(e.g. g)</i>
                    </div>

                </div>
            )
        }
        return (
            <div className='ingredient-list'>
                <input type='hidden' value={value} name={this.props.name}/>
                    {ingredient_header}
                <div className="list">
                    {ingredients}
                </div>
                <div className="input">
                    <ReactSelectize multiple={false} selectId='select-ingredients'
                        url={Routes.list_ingredients_path()}
                        placeholder='Add ingredients...'
                        onItemAdded={this.onItemAdded}
                        onItemRemoved={this.onItemRemoved}
                        values={this.state.ingredients}/>
                </div>
            </div>
        );
    }
});

var IngredientInput = React.createClass({
    onQuantityChange: function (e) {
        this.props.onQuantityChange(e.target.value);
    },
    onUnitChange: function (e) {
        this.props.onUnitChange(e.target.value);
    },
    render: function () {
        return (
            <div className='item row'>
                <div className='col-md-6'>
                    {this.props.ingredient.name}
                </div>
                <div className='col-md-3'>
                    <input className='form-control' value={this.props.ingredient.quantity} onChange={this.onQuantityChange}/>
                </div>
                <div className='col-md-3'>
                    <input className='form-control' value={this.props.ingredient.unit} onChange={this.onUnitChange}/>
                </div>
            </div>
        )
    }
});