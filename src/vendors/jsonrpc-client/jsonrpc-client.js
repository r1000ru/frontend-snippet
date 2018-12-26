(function(){
    var JsonRPCClient = function(url) {
        this._url = url;
        this._default = {};
    }
    
    JsonRPCClient.prototype.setDefaultParams = function(parmas) {
        this._default = params;
    }

    JsonRPCClient.prototype.req = function(method, params, callback) {
        if (typeof(params) === 'function') {
            callback = params;
            params = {};
        }

        var request = {
            jsonrpc: '2.0',
            method: method,
            params: params || {},
            id: Math.floor(Math.random() * 1000)
        }

        if (!Array.isArray(params)) {
            request.params = Object.assign(this._default, request.params);
        }

        var xhr = new XMLHttpRequest();

        xhr.open("POST", this._url);

        xhr.onload = function() {
            callback(xhr.response.error, xhr.response.result, xhr.response.id);
        };

        xhr.onerror = function(e) {
            callback({
                code: -32000,
                message: 'Server error',
                data: 'XHR Error ' + e.message
            })
        };

        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(JSON.stringify(request));

        return xhr;
    }

    window.JsonRPCClient = JsonRPCClient;
})();
