import {assert} from 'chai';
import fs from 'fs';
import path from 'path';

import {convertJenkinsNodeGraph} from '../../main/js/components/PipelineRunGraph.jsx';

import { pipelineStageState } from '@jenkins-cd/design-language/dist/js/components/PipelineGraph';

describe("pipeline graph data converter", () => {

    let jsonDir = null;

    before(() => {
        jsonDir = path.resolve(__dirname, "../json/pipeline-graph-converter/");
    });

    describe("for empty input of", () => {

        function expectEmptyArrayFor(label, input) {
            describe(label, () => {
                it("returns an empty array", () => {
                    let result = convertJenkinsNodeGraph(input);
                    assert(Array.isArray(result), "result should be array");
                    assert.equal(result.length, 0, "result should be empty");
                });
            });
        }

        expectEmptyArrayFor("null", null);
        expectEmptyArrayFor("undefined", undefined);
        expectEmptyArrayFor("[]", []);
    });

    describe("for single-node.json", () => {

        let testDataJSON = null;
        let testData = null;

        before(() => {
            testDataJSON = fs.readFileSync(path.resolve(jsonDir, "single-node.json"));
        });

        beforeEach(()=> {
            testData = JSON.parse(testDataJSON);
            assert(Array.isArray(testData), "testData should be array");
            assert.isAtLeast(testData.length, 1, "testData should not be empty");
        });

        it("produces the correct result", () => {
            let result = convertJenkinsNodeGraph(testData);
            assert(Array.isArray(result), "result should be array");
            assert.equal(result.length, 1, "result.length");

            assert.equal(result[0].name, "Deploy", "result[0].name");
            assert.equal(result[0].id, "27", "result[0].id");
            assert.equal(result[0].state, pipelineStageState.success, "result[0].state");
            assert.equal(result[0].completePercent, 100, "result[0].completePercent");
            assert(Array.isArray(result[0].children), "result[0].children should be array");
            assert.equal(result[0].children.length, 0, "result[0] should have no children");
        });
    });

    describe("for three-nodes.json", () => {

        let testDataJSON = null;
        let testData = null;

        before(() => {
            testDataJSON = fs.readFileSync(path.resolve(jsonDir, "three-nodes.json"));
        });

        beforeEach(()=> {
            testData = JSON.parse(testDataJSON);
            assert(Array.isArray(testData), "testData should be array");
            assert.isAtLeast(testData.length, 1, "testData should not be empty");
        });

        it("produces the correct result", () => {
            let result = convertJenkinsNodeGraph(testData);
            assert(Array.isArray(result), "result should be array");
            assert.equal(result.length, 3, "result.length");

            assert.equal(result[0].name, "First", "result[0].name");
            assert.equal(result[0].id, "3", "result[0].id");
            assert.equal(result[0].state, pipelineStageState.success, "result[0].state");
            assert.equal(result[0].completePercent, 100, "result[0].completePercent");
            assert(Array.isArray(result[0].children), "result[0].children should be array");
            assert.equal(result[0].children.length, 0, "result[0] should have no children");

            assert.equal(result[1].name, "Second", "result[1].name");
            assert.equal(result[1].id, "13", "result[1].id");
            assert.equal(result[1].state, pipelineStageState.running, "result[1].state");
            assert.equal(result[1].completePercent, 50, "result[1].completePercent");
            assert(Array.isArray(result[1].children), "result[1].children should be array");
            assert.equal(result[1].children.length, 0, "result[1] should have no children");

            assert.equal(result[2].name, "Third", "result[2].name");
            assert.equal(result[2].id, "27", "result[2].id");
            assert.equal(result[2].state, pipelineStageState.queued, "result[2].state");
            assert.equal(result[2].completePercent, 0, "result[2].completePercent");
            assert(Array.isArray(result[1].children), "result[2].children should be array");
            assert.equal(result[2].children.length, 0, "result[2] should have no children");
        });
    });

    describe("for pipeline-nodes-example.json", () => {

        let testDataJSON = null;
        let testData = null;

        before(() => {
            testDataJSON = fs.readFileSync(path.resolve(jsonDir, "pipeline-nodes-example.json"));
        });

        beforeEach(()=> {
            testData = JSON.parse(testDataJSON);
            assert(Array.isArray(testData), "testData should be array");
            assert.isAtLeast(testData.length, 1, "testData should not be empty");
        });

        it("produces the correct result", () => {
            // Or it gets the hose again
            let result = convertJenkinsNodeGraph(testData);
            assert(Array.isArray(result), "result should be array");
            assert.equal(result.length, 3, "result.length");

            assert.equal(result[0].name, "Build", "result[0].name");
            assert.equal(result[0].id, "3", "result[0].id");
            assert.equal(result[0].state, pipelineStageState.success, "result[0].state");
            assert.equal(result[0].completePercent, 100, "result[0].completePercent");
            assert(Array.isArray(result[0].children), "result[0].children should be array");
            assert.equal(result[0].children.length, 0, "result[0] should have no children");

            assert.equal(result[1].name, "Test", "result[1].name");
            assert.equal(result[1].id, "9", "result[1].id");
            assert.equal(result[1].state, pipelineStageState.success, "result[1].state");
            assert.equal(result[1].completePercent, 100, "result[1].completePercent");
            assert(Array.isArray(result[1].children), "result[1].children should be array");
            assert.equal(result[1].children.length, 2, "result[1] should have 2 children");

            assert.equal(result[2].name, "Deploy", "result[2].name");
            assert.equal(result[2].id, "27", "result[2].id");
            assert.equal(result[2].state, pipelineStageState.success, "result[2].state");
            assert.equal(result[2].completePercent, 100, "result[2].completePercent");
            assert(Array.isArray(result[2].children), "result[2].children should be array");
            assert.equal(result[2].children.length, 0, "result[2] should have no children");

            let children = result[1].children;

            assert.equal(children[0].name, "Firefox", "children[0].name");
            assert.equal(children[0].id, "12", "children[0].id");
            assert.equal(children[0].state, pipelineStageState.success, "children[0].state");
            assert.equal(children[0].completePercent, 100, "children[0].completePercent");
            assert(Array.isArray(children[0].children), "children[0].children should be array");
            assert.equal(children[0].children.length, 0, "children[0] should have no children");

            assert.equal(children[1].name, "Chrome", "children[1].name");
            assert.equal(children[1].id, "13", "children[1].id");
            assert.equal(children[1].state, pipelineStageState.success, "children[1].state");
            assert.equal(children[1].completePercent, 100, "children[1].completePercent");
            assert(Array.isArray(children[1].children), "children[1].children should be array");
            assert.equal(children[1].children.length, 0, "children[1] should have no children");
        });
    });

    describe("for ends-with-parallel.json", () => {

        let testDataJSON = null;
        let testData = null;

        before(() => {
            testDataJSON = fs.readFileSync(path.resolve(jsonDir, "ends-with-parallel.json"));
        });

        beforeEach(()=> {
            testData = JSON.parse(testDataJSON);
            assert(Array.isArray(testData), "testData should be array");
            assert.isAtLeast(testData.length, 1, "testData should not be empty");
        });

        it("produces the correct result", () => {
            let result = convertJenkinsNodeGraph(testData);
            assert(Array.isArray(result), "result should be array");
            assert.equal(result.length, 2, "result.length");

            assert.equal(result[0].name, "Build", "result[0].name");
            assert.equal(result[0].id, "3", "result[0].id");
            assert.equal(result[0].state, pipelineStageState.success, "result[0].state");
            assert.equal(result[0].completePercent, 100, "result[0].completePercent");
            assert(Array.isArray(result[0].children), "result[0].children should be array");
            assert.equal(result[0].children.length, 0, "result[0] should have no children");

            assert.equal(result[1].name, "Test", "result[1].name");
            assert.equal(result[1].id, "9", "result[1].id");
            assert.equal(result[1].state, pipelineStageState.success, "result[1].state");
            assert.equal(result[1].completePercent, 100, "result[1].completePercent");
            assert(Array.isArray(result[1].children), "result[1].children should be array");
            assert.equal(result[1].children.length, 2, "result[1] should have 2 children");

            let children = result[1].children;

            assert.equal(children[0].name, "Firefox", "children[0].name");
            assert.equal(children[0].id, "12", "children[0].id");
            assert.equal(children[0].state, pipelineStageState.success, "children[0].state");
            assert.equal(children[0].completePercent, 100, "children[0].completePercent");
            assert(Array.isArray(children[0].children), "children[0].children should be array");
            assert.equal(children[0].children.length, 0, "children[0] should have no children");

            assert.equal(children[1].name, "Chrome", "children[1].name");
            assert.equal(children[1].id, "13", "children[1].id");
            assert.equal(children[1].state, pipelineStageState.success, "children[1].state");
            assert.equal(children[1].completePercent, 100, "children[1].completePercent");
            assert(Array.isArray(children[1].children), "children[1].children should be array");
            assert.equal(children[1].children.length, 0, "children[1] should have no children");
        });
    });

    describe("for every-result.json", () => {

        let testDataJSON = null;
        let testData = null;

        before(() => {
            testDataJSON = fs.readFileSync(path.resolve(jsonDir, "every-result.json"));
        });

        beforeEach(()=> {
            testData = JSON.parse(testDataJSON);
            assert(Array.isArray(testData), "testData should be array");
            assert.isAtLeast(testData.length, 1, "testData should not be empty");
        });

        it("produces the correct result", () => {
            let result = convertJenkinsNodeGraph(testData);
            assert(Array.isArray(result), "result should be array");
            assert.equal(result.length, 6, "result.length");

            assert.equal(result[0].name, "First", "result[0].name");
            assert.equal(result[0].id, "3", "result[0].id");
            assert.equal(result[0].state, pipelineStageState.success, "result[0].state");
            assert.equal(result[0].completePercent, 100, "result[0].completePercent");
            assert(Array.isArray(result[0].children), "result[0].children should be array");
            assert.equal(result[0].children.length, 0, "result[0] should have no children");

            assert.equal(result[1].name, "Second", "result[1].name");
            assert.equal(result[1].id, "13", "result[1].id");
            assert.equal(result[1].state, pipelineStageState.running, "result[1].state");
            assert.equal(result[1].completePercent, 50, "result[1].completePercent");
            assert(Array.isArray(result[1].children), "result[1].children should be array");
            assert.equal(result[1].children.length, 0, "result[1] should have no children");

            assert.equal(result[2].name, "Third", "result[2].name");
            assert.equal(result[2].id, "27", "result[2].id");
            assert.equal(result[2].state, pipelineStageState.queued, "result[2].state");
            assert.equal(result[2].completePercent, 0, "result[2].completePercent");
            assert(Array.isArray(result[2].children), "result[2].children should be array");
            assert.equal(result[2].children.length, 0, "result[2] should have no children");

            assert.equal(result[3].name, "Fourth", "result[3].name");
            assert.equal(result[3].id, "28", "result[3].id");
            assert.equal(result[3].state, pipelineStageState.failure, "result[3].state");
            assert.equal(result[3].completePercent, 100, "result[3].completePercent");
            assert(Array.isArray(result[3].children), "result[3].children should be array");
            assert.equal(result[3].children.length, 0, "result[3] should have no children");

            assert.equal(result[4].name, "Steve", "result[4].name");
            assert.equal(result[4].id, "29", "result[4].id");
            assert.equal(result[4].state, pipelineStageState.notBuilt, "result[4].state");
            assert.equal(result[4].completePercent, 0, "result[4].completePercent");
            assert(Array.isArray(result[4].children), "result[4].children should be array");
            assert.equal(result[4].children.length, 0, "result[4] should have no children");

            assert.equal(result[5].name, "Unknown-Null", "result[5].name");
            assert.equal(result[5].id, "33", "result[5].id");
            assert.equal(result[5].state, pipelineStageState.queued, "result[5].state");
            assert.equal(result[5].completePercent, 0, "result[5].completePercent");
            assert(Array.isArray(result[5].children), "result[5].children should be array");
            assert.equal(result[5].children.length, 0, "result[5] should have no children");
        });
    });
});