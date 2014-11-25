var RecipeSearcher = React.createClass({
    onChange: function (value) {
        window.location = Routes.recipe_path(value)
    },
    render: function () {
        return (
            <ReactSelectize selectId='search-recipes' url={Routes.list_recipes_path()} onChange={this.onChange} multiple={false}/>
        );
    }
});


var RecipeSearcherByIngredient = React.createClass({
    getInitialState: function () {
        return {query: '', recipes: []};
    },
    onChange: function (value) {
        this.loadFromServer(value);
    },
    loadFromServer: function (value) {
        this.setState({query: value});
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
        if (recipes.length == 0) {
            if (this.state.query !== '') {
                recipes = (
                    <div>
                        <h4> No recipe match! </h4>
                    </div>
                )
            }

        }
        return (
            <div>
                <div>
                    <ReactSelectize selectId='search-recipes-by-ingredients' url={Routes.list_ingredients_path()} onChange={this.onChange}/>
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
        console.log(this.props.recipe);
        return (
            <div className='col-md-4'>
                <a className='recipe' href={Routes.recipe_path(this.props.recipe.id)}>
                    <div className='recipe-image'>
                        <img src={this.props.recipe.medium_image}/>
                    </div>
                    <div className='recipe-name'>
                        {this.props.recipe.name}
                    </div>
                </a>
            </div>
        );
    }
});