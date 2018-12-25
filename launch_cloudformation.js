const AWS = require('aws-sdk');
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form
const awsCredentials = (require("./config/config")).getAWS_JSONCredentials();

AWS.config.update(awsCredentials);
// console.log(awsCredentials);

const cloudformation = new AWS.CloudFormation();
const templateString = JSON.stringify(require("./config/createvpc"));
// console.log(templateString);

var params = {
    StackName: 'vpcCreatedFromNodeSDK'
};

const getOutputsCFN = function getStackOutputs(callback) {
    cloudformation.describeStacks(params, function (err, data) {

        if (err) console.log(err, err.stack); // an error occurred
        else {
            // console.log(data);
            // console.log((data['Stacks'][0])['Outputs'][0]);
            // let temp = JSON.parse(data);
            // console.log(temp);
            // noinspection UnnecessaryLocalVariableJS
            let outputs = (data['Stacks'][0])['Outputs'][0];
            callback(outputs);
        }           // successful response
    });
};

module.exports = {getOutputsCFN};

// createSTK();

// function createSTK() {
//
//     const params = {
//         StackName: 'vpcCreatedFromNodeSDK', /* required */
//
//         DisableRollback: false,
//         EnableTerminationProtection: false,
//         // OnFailure: "DO_NOTHING",
//         // RoleARN: 'arn:aws:iam::805746249177:role/Allow_all_resources_to_cloudformation',
//         TemplateBody: (templateString),
//     };
//     // console.log(params);
//     cloudformation.createStack(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else console.log(data);           // successful response
//     });
//     listexp()
// }

// listexp();
//
// function listexp() {
//     const params = {};
//     cloudformation.listExports(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else console.log(data);           // successful response
//     });
// }