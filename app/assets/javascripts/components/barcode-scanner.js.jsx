var BarcodeScanner = React.createClass({
    getInitialState: function () {
        return {
            enabled: true
        }
    },
    enable: function () {
        this.setState({enabled: true});
    },
    componentDidMount: function () {
        var App = {
            init: function () {
                Quagga.init({
                    inputStream : {
                        name : "Live",
                        type : "LiveStream"
                    },
                    debug: true,
                    controls: true,
                    decoder: {
                        showPattern: true,
                        readers: ["ean_reader"]
                    },
                    readyFunc: function () {
                        Quagga.start();
                    }
                });
            },
            lastResult: null
        };

        App.init();

        Quagga.onDetected(function (result) {
            console.log('Detected:');
            if (App.lastResult !== result) {
                App.lastResult = result;
                console.log('NEw result:');
                console.log(result);
                var $node = null, canvas = Quagga.canvas.dom.image;
                $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                $node.find("img").attr("src", canvas.toDataURL());
                $node.find("h4.code").html(result);
                $("#result_strip ul.thumbnails").prepend($node);
            }
        });

    },
    render: function () {
        var content;
        if (this.state.enabled) {
            content = (
                <div id="interactive" className="viewport"></div>
            );
        } else {
            content = (
                <div className='shadow-box' onClick={this.enable}>
                Scan barcode
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
});