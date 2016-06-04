import React from 'react';
import { assert} from 'chai';
import { shallow } from 'enzyme';

import {Activity} from '../../main/js/components/Activity.jsx';

const
  data = [
    {
      "changeSet": [],
      "durationInMillis": 64617,
      "enQueueTime": "2016-03-04T13:59:53.272+0100",
      "endTime": "2016-03-04T14:00:57.991+0100",
      "id": "3",
      "organization": "jenkins",
      "pipeline": "master",
      "result": "FAILURE",
      "runSummary": "broken since build #2",
      "startTime": "2016-03-04T13:59:53.374+0100",
      "state": "FINISHED",
      "type": "WorkflowRun",
      "commitId": "444196ac6afbd3e417f1d46ebfb3c4f0aac0c165"
    },
    {
      "changeSet": [],
      "durationInMillis": 664124,
      "enQueueTime": "2016-03-04T13:59:54.132+0100",
      "endTime": "2016-03-04T14:10:58.262+0100",
      "id": "1",
      "organization": "jenkins",
      "pipeline": "patch-1",
      "result": "SUCCESS",
      "runSummary": "stable",
      "startTime": "2016-03-04T13:59:54.138+0100",
      "state": "FINISHED",
      "type": "WorkflowRun",
      "commitId": "f8eeb35c03e52c17c27824fa77fa6b0f03a93625"
    },
    {
      "changeSet": [
        {
          "author": {
            "email": "tscherler@cloudbees.com",
            "fullName": "tscherler",
            "id": "tscherler"
          },
          "affectedPaths": [
            "Jenkinsfile"
          ],
          "commitId": "746cf27525b7b1d615de408ca86786613ccf7548",
          "comment": "Update Jenkinsfile\n",
          "date": "2016-03-04 14:14:48 +0100",
          "id": "746cf27525b7b1d615de408ca86786613ccf7548",
          "msg": "Update Jenkinsfile",
          "paths": [
            {
              "editType": "edit",
              "file": "Jenkinsfile"
            }
          ],
          "timestamp": "2016-03-04T14:14:48.000+0100"
        }
      ],
      "durationInMillis": 69102,
      "enQueueTime": "2016-03-04T14:18:55.455+0100",
      "endTime": "2016-03-04T14:20:04.592+0100",
      "id": "4",
      "organization": "jenkins",
      "pipeline": "master",
      "result": "SUCCESS",
      "runSummary": "back to normal",
      "startTime": "2016-03-04T14:18:55.490+0100",
      "state": "FINISHED",
      "type": "WorkflowRun",
      "commitId": "746cf27525b7b1d615de408ca86786613ccf7548"
    },
    {
      "changeSet": [
        {
          "author": {
            "email": "scherler@gmail.com",
            "fullName": "scherler",
            "id": "scherler"
          },
          "affectedPaths": [
            "Jenkinsfile"
          ],
          "commitId": "7d2ad24151dcd4be26d13b6116794691e8bb004f",
          "comment": "Update Jenkinsfile\n",
          "date": "2016-03-04 14:24:01 +0100",
          "id": "7d2ad24151dcd4be26d13b6116794691e8bb004f",
          "msg": "Update Jenkinsfile",
          "paths": [
            {
              "editType": "edit",
              "file": "Jenkinsfile"
            }
          ],
          "timestamp": "2016-03-04T14:24:01.000+0100"
        }
      ],
      "durationInMillis": 48626,
      "enQueueTime": "2016-03-04T14:28:09.321+0100",
      "endTime": "2016-03-04T14:28:57.948+0100",
      "id": "5",
      "organization": "jenkins",
      "pipeline": "master",
      "result": "FAILURE",
      "runSummary": "broken since this build",
      "startTime": "2016-03-04T14:28:09.322+0100",
      "state": "FINISHED",
      "type": "WorkflowRun",
      "commitId": "a2f0801fec8bad98663f0df5e9110261820e8c4e"
    },
    {
      "changeSet": [],
      "durationInMillis": 111377,
      "enQueueTime": "2016-03-09T16:01:23.707+0100",
      "endTime": "2016-03-09T16:03:15.144+0100",
      "id": "6",
      "organization": "jenkins",
      "pipeline": "master",
      "result": "FAILURE",
      "runSummary": "broken since build #5",
      "startTime": "2016-03-09T16:01:23.767+0100",
      "state": "FINISHED",
      "type": "WorkflowRun",
      "commitId": "a2f0801fec8bad98663f0df5e9110261820e8c4e"
    }
  ];

describe("Activity should render", () => {

  it("does renders the Activity with data", () => {
    const wrapper =  shallow(<Activity runs={data} />);
    // does data renders?
    assert.isNotNull(wrapper)
    assert.equal(wrapper.find('Runs').length, data.length)
  });

});

describe("Activity should not render", () => {
  it("does not renders the Activity without data", () => {
    const wrapper =  shallow(<Activity />).node;
    assert.isNull(wrapper);
  });

});
