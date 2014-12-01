var RecipeList = React.createClass({
    getInitialState: function () {
      return {
          query: '',
          recipes: []
      }  
    },
    loadFromServer: function (value) {
        this.setState({query: value});
        $.get(this.props.url, {q: this.state.query}).done(function (data) {
            console.log('awdwa: ' + data)
            this.setState({recipes: data})
        }.bind(this));
    },
    componentDidMount: function () {
        this.loadFromServer('');
    },
    onInputChange: function (e) {
        console.log('awddw')
        this.loadFromServer(e.target.value);
    },
     renderRecipes: function (recipes) {
        var recipes_splits = [[], [], []];
        eachSlice(recipes, 3, function (slice) {
            for (var i in slice) {

                recipes_splits[i].push(slice[i]);
            }
        });
        return recipes_splits.map(function (x) {
            return (
                <div className='col-md-4'>
                    {x}
                </div>
            )
        });
    },
    render: function () {
       var recipes = this.state.recipes.map(function (x) {
            return (
                <Recipe recipe={x}/>
            )
        });
        
        if (recipes.length == 0) {
                recipes = (
                    <div>
                        <h4> No recipes match this query! </h4>
                    </div>
                )
        } else {
            recipes = this.renderRecipes(recipes);
        }
        return (
            <div>
                <div>
                    <input className='form-control' placeholder='Search for recipes...' value={this.state.query} onChange={this.onInputChange}/>
                </div>
                <div className='recipe-list row'>
                {recipes}
                </div>
            </div>
        );
    }
});