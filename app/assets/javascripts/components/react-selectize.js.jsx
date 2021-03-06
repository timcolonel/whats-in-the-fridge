/** @jsx React.DOM */

/* React selectize wrapper */
var ReactSelectize = React.createClass({
    displayName: 'ReactSelectize',

    getInitialState: function () {
        return {
            items: this.props.items
        }
    },
    getDefaultProps: function () {
        return {
            values: [],
            valueField: "id",
            labelField: "name",
            searchField: "name",
            create: false,
            items: [],
            url: '',
            onItemAdded: function () {

            },
            onItemRemoved: function () {

            },
            onChange: function () {

            }
        };
    },
    isMultiple: function (props) {
        // Selectize becomes 'multiple' when 'maxItems' is passed via settings
        return props.multiple || props.maxItems != undefined;
    },
    buildOptions: function () {
        var o = {};

        o.delimiter = ',';
        o.valueField = this.props.valueField;
        o.labelField = this.props.labelField;
        o.searchField = this.props.searchField;
        if (this.isMultiple(this.props)) {
            o.maxItems = this.props.maxItems || null;
        }
        o.options = this.props.values.concat(this.state.items);
        o.create = this.props.create;
        o.load = function (query, callback) {
            $.get(this.props.url, {q: query}).done(function (data) {
                this.setState({items: data});
            }.bind(this));
        }.bind(this);
        return o;
    },
    getSelectizeControl: function () {
        var selectId = "#" + this.props.selectId,
            $select = $(selectId);

        return $select[0] && $select[0].selectize;
    },
    handleChange: function (e) {

        // IF Selectize is not multiple
        if (!this.isMultiple(this.props)) {
            // THEN blur it before calling onChange to prevent dropdown reopening
            this.getSelectizeControl().blur();
        }

        this.props.onChange(e);
    },
    rebuildSelectize: function () {
        var $select = null,
            selectControl = this.getSelectizeControl(),
            items = this.state.items;
        if (selectControl) {
            // rebuild
            selectControl.off();
            selectControl.load(function (cb) {
                cb(items)
            });
        } else {
            // build new
            $select = $("#" + this.props.selectId).selectize(this.buildOptions());
            selectControl = $select[0].selectize;
            for (var i in this.props.values) {
                selectControl.addItem(this.props.values[i].id);
            }
        }

        selectControl.on('change', this.handleChange);
        selectControl.on('item_add', function (value, item) {
            this.props.onItemAdded(value, item.text())

        }.bind(this));
        selectControl.on('item_remove', function (value) {
            this.props.onItemRemoved(value)
        }.bind(this));
    },

    componentDidMount: function () {
        this.rebuildSelectize();
    },
    componentDidUpdate: function () {
        this.rebuildSelectize();
    },

    render: function () {
        var classes = this.props.classes;
        return React.DOM.div({className: classes && classes.length > 0 ? classes.join(' ') : ''},
            <input type='text' id={this.props.selectId} placeholder={this.props.placeholder} name={this.props.name}/>
        )
    }
});