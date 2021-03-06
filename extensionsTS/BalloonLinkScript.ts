"use strict";
/*
*  Copyright (C) 1998-2017 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from "../release/go";
import { BalloonLink } from "./BalloonLink";

export function init() {
	if (typeof (<any>window)["goSamples"] === 'function') (<any>window)["goSamples"]();  // init for these samples -- you don't need to call this

	const $ = go.GraphObject.make;  // for conciseness in defining templates

	let myDiagram = $(go.Diagram, "myDiagramDiv",  // create a Diagram for the DIV HTML element
    {
      initialContentAlignment: go.Spot.Center,
			"undoManager.isEnabled": true  // enable undo & redo
		});

	// define a simple Node template
	myDiagram.nodeTemplate =
		$(go.Node, "Auto",  // the Shape will go around the TextBlock
			$(go.Shape, "Rectangle", { strokeWidth: 0 },
				// Shape.fill is bound to Node.data.color
				new go.Binding("fill", "color")),
			$(go.TextBlock,
				{ margin: 8 },  // some room around the text
				// TextBlock.text is bound to Node.data.key
				new go.Binding("text", "key"))
		);

	myDiagram.linkTemplate =
		$(BalloonLink,
			$(go.Shape,
				{ stroke: "limegreen", strokeWidth: 3, fill: "limegreen" })
		);
	// create the model data that will be represented by Nodes and Links
	myDiagram.model = new go.GraphLinksModel(
		[
			{ key: "Alpha", color: "lightblue" },
			{ key: "Beta", color: "orange" }
		],
		[
			{ from: "Alpha", to: "Beta" }
		]);
}