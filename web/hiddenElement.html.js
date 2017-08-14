export default (html = `
<head>
  <meta charset="utf-8">
  <script src="https://js.braintreegateway.com/web/dropin/1.6.0/js/dropin.min.js"></script>
  <script src="./watch.min.js"></script>

  <script>
    alert("****Hello****");
    var button = document.querySelector('#submit-button');
    var state = {
      clientToken: ''
    };

    function init() {
      document.querySelector('#sendMessage-button').addEventListener('click', function () {
        alert(document.querySelector('#clientToken').innerHTML);
        window.postMessage('First');
      });

      watch(state, "clientToken", function () {
        alert("attr1 changed!");
      });
    };

    function alertTest() {
      alert('test');
    }

    function initBraintreeDropin(clientToken) {
      alert('clientToken = ' + clientToken)
      braintree.dropin.create({
        authorization: clientToken,
        container: '#dropin-container'
      }, function (createErr, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
          });
        });
      });
    }
  </script>
</head>

<body onload="init()">
  <div id="dropin-container"></div>
  <button id="submit-button">Request payment method</button>
  <button id="sendMessage-button">Send Message</button>
  <div id="clientToken">
    This is my name
  </div>
</body>

</html>
`
);