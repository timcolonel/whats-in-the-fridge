var RecipeSearcher = React.createClass({
    getInitialState: function () {
        return {recipes: []};
    },
    onChange: function (value) {
        this.loadFromServer(value);
    },
    loadFromServer: function (value) {
        $.get(Routes.recipes_search_by_ingredients_path({ingredients: value})).done(function (data) {
            this.setState({recipes: data})
        }.bind(this));
    },
    render: function () {
        var recipes = this.state.recipes.map(function (x) {
            return (
                <Recipe recipe={x}/>
            )
        });
        return (
            <div>
                <div>
                    <ReactSelectize selectId='search-recipes' url={Routes.list_ingredients_path()} onChange={this.onChange}/>
                </div>
                <div>
                {recipes}
                </div>
            </div>
        );
    }
});


var Recipe = React.createClass({
    render: function () {
        return (
            <div>
            {this.props.recipe.name}
            </div>
        );
    }
});