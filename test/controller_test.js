<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
                    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <script src="../public/js/jquery-1.4.4.min.js"></script>
  <link rel="stylesheet" href="qunit.css" type="text/css" media="screen" />
  <script type="text/javascript" src="qunit.js"></script>
  <script type="text/javascript" src="../public/js/calculator.js"></script>
  <script type="text/javascript" src="../public/js/controller.js"></script>

  <script>
    $(document).ready(function(){
    
      test("passing test", function(){
        equals(1,1, "We expect 1" );
      });

    });
  </script> 
</head>

<body>
  <h1 id="qunit-header">Controller Test</h1>
  <h2 id="qunit-banner"></h2>
  <div id="qunit-testrunner-toolbar"></div>
  <h2 id="qunit-userAgent"></h2>
  <ol id="qunit-tests"></ol>
  <div id="qunit-fixture">
    <span id="flour-size">250</span>
    <span id="water-size">250</span>
    <span id="starter-size">250</span>
    <span id="starter-hydration">100</span>
    <span id="result">0</span>
  </div>
</body>
</html>
