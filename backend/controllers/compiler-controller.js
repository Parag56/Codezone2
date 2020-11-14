var hackerEarth = require('hackerearth-node'); //require the Library
var hackerEarth = new hackerEarth('cdd266623e88aa2be832f5cbc6e7330110d8c52b', '');
const runhandler=(req,res,next)=>{
    var config={};
	config.time_limit=5;  //your time limit in integer
	config.memory_limit=323244;  //your memory limit in integer
	config.source = req.body.code;  //your source code for which you want to use hackerEarth api
	config.input = req.body.input;  //input against which you have to test your source code
    config.language = req.body.language; //optional choose any one of them or none
    console.log(req.body)
 	hackerEarth.run(config,function(err,response){
      if(err) {
     res.status(500).json({
        	"message": "Unable to process the request",
        	"error": err
        });
      } else {
      	console.log(JSON.parse(response));
      	res.status(200).json({response:JSON.parse(response)});
        //console.log(response.run_status.output);
    //     var obj = JSON.parse(response);
    //     var error = obj.run_status.stderr;
    //     var output = obj.run_status.output;

    //    return res.status(200).json({
    //     	error: error,
    //     	output: output
    //     });
      }
	});
}
module.exports={
    runhandler
}