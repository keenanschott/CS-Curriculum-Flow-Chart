# CS Curriculum Flowchart

## User Guide

The dropdowns allow the user to select what year they *entered* Mines as well as what track they would like to view. The login system is not affiliated with Mines in any capacity and is connected to a database I set up. Raw passwords are not stored. Each course sits on a card within the body of the page, which will be addressed as *nodes* from this point on, and each node contains important information about itself as well as other nodes. The page looks like this:

![`page.png`](https://i.imgur.com/mVw6eZ5.png "page.png")

First, let's talk about the border of a node. The redish border indicates that the course is part of the *Mines Core*, the blueish border indicates that the course is part of the *CS Core*, and the greenish border indicates that the course is part of a track's *Focus Area*. When hovering over a given node, every node that is a prerequisite will have its border turn black and it will begin to pulsate. Moreover, when hovering over a given node, every node that is a corequisite will have its border turn a dashed blue and it will begin to pulsate.

![`req.gif`](https://i.imgur.com/KZpeOQe.gif "req.gif")

Next, let's talk about course completion. As seen below, a green indicator will appear on a node when it's marked as complete, a blue indicator will appear on a node when it's marked as in-progress, and incomplete nodes will have no special marking. 

![`completion.png`](https://i.imgur.com/sbW20bO.png "completion.png")

Next, when a node is clicked, information will appear on the course associated with it. The course title appears at the top, and, in the body of the modal, credits, completion state, and a description of the course are present. The dropdown on the right allows the user to change the completion state of a node, which will be reflected in the node's appearance and, if the user is logged in, saved to the database. 

![`node.png`](https://i.imgur.com/TZ1E1Xb.png "node.png")

## Closing Remarks

I currently don't have any plans to host the site anywhere, but please feel free to work on any issues or expand on the project.