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
                <div className='recipe-list row'>
                {recipes}
                </div>
            </div>
        );
    }
});


var Recipe = React.createClass({
    render: function () {
        return (
            <div className='col-md-4'>
                <a className='recipe' href={Routes.recipe_path(this.props.recipe.id)}>
                    <div className='recipe-name'>
                        {this.props.recipe.name}
                    </div>
                    <div className='recipe-info'>
                        {this.props.recipe.preparation}
                    </div>
                </a>
            </div>
        );
    }
});