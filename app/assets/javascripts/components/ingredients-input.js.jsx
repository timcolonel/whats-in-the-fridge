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
    onIngredientValueChange: function (id, value) {
        var newIngredients = this.state.ingredients;
        for (var i in newIngredients) {
            if (newIngredients[i].id == id) {
                newIngredients[i].value = value;
            }
        }
        this.setState({ingredients: newIngredients})

    },
    render: function () {
        var value = JSON.stringify(this.state.ingredients);
        var ingredients = this.state.ingredients.map(function (x) {
            return (
                <IngredientInput key={x.id} ingredient={x} onChange={this.onIngredientValueChange.bind(this, x.id)}/>
            );
        }.bind(this));

        var ingredient_header;
        if (ingredients.length > 0) {
            ingredient_header = (
                <div className='ingredient-list-header row'>
                    <div className='col-md-6'>
                    </div>
                    <div className='col-md-6'>
                        <i> Quantity(e.g. 200g)</i>
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
    onChange: function (e) {
        this.props.onChange(e.target.value);
    },
    render: function () {
        return (
            <div className='item row'>
                <div className='col-md-6'>
                    {this.props.ingredient.name}
                </div>
                <div className='col-md-3'>
                    <input className='form-control' value={this.props.ingredient.value} onChange={this.onChange}/>
                </div>
            </div>
        )
    }
});